<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <div class="table">
          <el-table :data="attrList" border style="height: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="attrName"
              label="属性名称"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column label="属性值名称" align="center">
              <template #default="scope">
                <el-tag
                  v-for="item in scope.row.attrValueList"
                  :key="item.id"
                  style="margin: 10px"
                >
                  {{ item.valueName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template #default="scope">
                <el-button
                  size="large"
                  icon="Edit"
                  type="warning"
                  title="修改"
                  @click="updateAttr(scope.row)"
                />
                <el-popconfirm
                  width="220"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  icon="Delete"
                  placement="top"
                  :title="`确定要删除${scope.row.attrName}吗？`"
                  @confirm="deleteAttr(scope.row.id)"
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
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button size="default" @click="scene = 0">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="scope">
              <el-input
                v-if="scope.row.flag"
                v-model="scope.row.valueName"
                placeholder="请输入属性值"
                clearable
                @blur="handleBlur(scope.row, scope.$index)"
                ref="input"
              />
              <div v-else @click="handleToEdit(scope.row)">
                {{ scope.row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="danger"
                icon="Delete"
                @click="attrParams.attrValueList.splice(scope.$index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item>
          <el-button
            type="primary"
            @click="save"
            :disabled="!attrParams.attrValueList[0]?.valueName"
          >
            保存
          </el-button>
          <el-button @click="scene = 0">取消</el-button>
        </el-form-item>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  fetchAddOrUpdateAttr,
  fetchAttrList,
  fetchDeleteAttr,
} from '@/api/product/attr';
import {
  AttrList,
  AttrResponse,
  Attr,
  AttrValue,
} from '@/api/product/attr/type';
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
import { nextTick, reactive, ref, watch, onBeforeUnmount } from 'vue';

const categoryStore = useCategoryStore();
const attrList = ref<AttrList>([]);
const scene = ref<number>(0);
const attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
});
const input = ref();

watch(
  () => categoryStore.c3Id,
  () => {
    attrList.value = [];
    if (!categoryStore.c3Id) return;
    getAttr();
  },
);

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  const res: AttrResponse = await fetchAttrList(c1Id, c2Id, c3Id);
  attrList.value = res.data;
};

const addAttr = () => {
  //清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
  });
  scene.value = 1;
  attrParams.categoryId = categoryStore.c3Id;
};

const updateAttr = (row: Attr) => {
  scene.value = 1;
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  attrParams.categoryId = categoryStore.c3Id;
};

const deleteAttr = async (id: number) => {
  const res: any = await fetchDeleteAttr(id);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    input.value.focus();
  });
};

const save = async () => {
  const res = await fetchAddOrUpdateAttr(attrParams);
  if (res.code === 200) {
    scene.value = 0;
    ElMessage({
      type: 'success',
      message: '保存成功',
    });
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: '保存失败',
    });
  }
};

const handleBlur = (row: AttrValue, $index: number) => {
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    });
    attrParams.attrValueList.splice($index, 1);
    return;
  }
  if (!row.valueName) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    });
    attrParams.attrValueList.splice($index, 1);
    return;
  }
  row.flag = false;
};

const handleToEdit = (row: AttrValue) => {
  row.flag = true;
  nextTick(() => {
    input.value.focus();
  });
};

onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped lang="scss">
.table {
  height: calc(100vh - 310px);
  overflow: hidden;
  margin: 10px 0;
}
</style>
