<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        icon="Plus"
        @click="addTradeMark"
        v-hasBtn="'btn.Trademark.add'"
      >
        添加品牌
      </el-button>
      <div class="table">
        <el-table
          border
          style="width: 100%; margin: 10px 0"
          height="100%"
          max-height="100%"
          size="large"
          :data="trademarkListData"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="tmName" label="品牌名称" align="center" />
          <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.logoUrl"
                :preview-src-list="imgArr"
                :initial-index="scope.$index"
                :zoom-rate="1.2"
                fit="contain"
                hide-on-click-modal
                preview-teleported
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                @click="editTradeMark(scope.row)"
                size="large"
                icon="Edit"
                type="warning"
                title="修改"
              />
              <el-popconfirm
                width="220"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="Delete"
                placement="top"
                :title="`确定要删除${scope.row.tmName}吗？`"
                @confirm="removeTradeMark(scope.row.id)"
              >
                <template #reference>
                  <el-button
                    size="large"
                    icon="Delete"
                    type="danger"
                    title="删除"
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="pageNow"
        v-model:page-size="limit"
        :page-sizes="[10, 15, 20, 30, 50, 100]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="form.id ? '修改品牌' : '添加品牌'"
    >
      <el-form :model="form" style="width: 80%" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="form.tmName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  fetchAddOrUpdateTrademark,
  fetchDeleteTrademark,
  fetchTrademarkList,
} from '@/api/product/brand';
import { tradeMark, tradeMarkListRes } from '@/api/product/brand/type';
import { ElMessage, UploadProps } from 'element-plus';
import { onMounted, ref, reactive, nextTick } from 'vue';
//当前页码
const pageNow = ref<number>(1);
//每一页显示的条数
const limit = ref<number>(10);
const total = ref<number>(0);
const imgArr = ref<string[]>([]);

const dialogFormVisible = ref<boolean>(false);
const form = reactive<tradeMark>({
  tmName: '',
  logoUrl: '',
});
const formRef = ref<any>();

const trademarkListData = ref<tradeMark[]>([]);

const handleUploadSuccess: UploadProps['onSuccess'] = (response) => {
  form.logoUrl = response.data;
  //清除图片校验信息
  formRef.value.clearValidate('logoUrl');
};

const getTrademarkList = async (pageNow: number, limit: number) => {
  const res: tradeMarkListRes = await fetchTrademarkList(pageNow, limit);
  if (res.code === 200) {
    trademarkListData.value = res.data.records;
    total.value = res.data.total;
    imgArr.value.splice(0, imgArr.value.length);
    res.data.records.forEach((item: any) => {
      imgArr.value.push(item.logoUrl);
    });
  }
};

onMounted(() => {
  getTrademarkList(pageNow.value, limit.value);
});

const handleCurrentChange = (val: number) => {
  getTrademarkList(val, limit.value);
};

const handleSizeChange = (val: number) => {
  getTrademarkList(pageNow.value, val);
};

const validatorTmName = (_: any, value: string, callback: any) => {
  if (value.trim().length <= 2) {
    callback(new Error('品牌名称长度不能小于2'));
  } else {
    callback();
  }
};

const validatorLogoUrl = (_: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('品牌LOGO不能为空'));
  } else {
    callback();
  }
};

/**
 * 表单校验规则
 */
const rules = {
  tmName: [
    {
      required: true,
      validator: validatorTmName,
      trigger: 'change',
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl,
    },
  ],
};

//添加
const addTradeMark = () => {
  dialogFormVisible.value = true;
  form.tmName = '';
  form.logoUrl = '';
  form.id = 0;
  // formRef.value?.clearValidate();
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

const editTradeMark = (row: tradeMark) => {
  dialogFormVisible.value = true;
  //语法合并
  Object.assign(form, row);
  // form.id = row.id;
  // form.tmName = row.tmName;
  // form.logoUrl = row.logoUrl;
  nextTick(() => {
    formRef.value.clearValidate();
  });
};

//删除
const removeTradeMark = (id: number) => {
  fetchDeleteTrademark(id).then((res) => {
    if (res.code === 200) {
      getTrademarkList(pageNow.value, limit.value);
      ElMessage.success('删除成功');
    } else {
      ElMessage.error('删除失败');
    }
  });
};

//确定添加或修改
const submit = async () => {
  await formRef.value.validate();
  const res = await fetchAddOrUpdateTrademark(form);
  if (res.code === 200) {
    getTrademarkList(pageNow.value, limit.value);
    ElMessage.success(form.id ? '修改成功' : '添加成功');
    dialogFormVisible.value = false;
  } else {
    ElMessage.error(form.id ? '修改失败' : '添加失败');
  }
};
</script>

<style lang="scss">
.table {
  height: calc(100vh - 230px);
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
