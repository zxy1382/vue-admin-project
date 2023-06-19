<template>
  <el-form label-width="100">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuData.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuData.tmId" placeholder="请选择SPU品牌">
        <el-option
          v-for="item in tradeMarkList"
          :label="item.tmName"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        v-model="spuData.description"
        type="textarea"
        placeholder="请输入SPU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="unSelectSaleAttrValue"
        :placeholder="
          unSelectSaleAttr.length
            ? `还有${unSelectSaleAttr.length}个未选择`
            : '无'
        "
        style="margin: 0 10px 0 0"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :label="item.name"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="unSelectSaleAttrValue ? false : true"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table :data="saleAttrList" border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="100"
        ></el-table-column>
        <el-table-column label="属性值">
          <template #default="scope">
            <el-tag
              v-for="item in scope.row.spuSaleAttrValueList"
              :key="item.id"
              style="margin: 0 10px 0 0"
              closable
              @close="handleCloseTag(scope.row, item)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="scope.row.flag"
              ref="InputRef"
              v-model="tagInputValue"
              style="width: 100px; margin-left: 5px"
              size="small"
              placeholder="请输入属性值"
              @keyup.enter="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            />
            <el-button v-else size="small" @click="showInput(scope.row)">
              +
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              type="danger"
              icon="Delete"
              title="删除"
              @click="saleAttrList.splice(scope.$index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  fetchAddOrUpdateSpu,
  fetchBaseSaleAttrList,
  fetchSaleAttrList,
  fetchSpuImages,
  fetchTrademarkList,
} from '@/api/product/spu';
import {
  BaseSaleAttrResponse,
  Spu,
  SpuImage,
  SpuImageResponse,
  SpuSaleAttrResponse,
  TradeMark,
  TradeMarkResponse,
  SpuSaleAttr,
  BaseSaleAttr,
  SpuSaleAttrValue,
} from '@/api/product/spu/type';
import { ElInput, ElMessage, UploadProps } from 'element-plus';
import { computed, nextTick, reactive, ref } from 'vue';

const $emit = defineEmits(['changeScene']);

const spuData = reactive<Spu>({
  spuName: '',
  description: '',
  tmId: '',
  category3Id: '',
  spuImageList: null,
  spuSaleAttrList: null,
});
const tradeMarkList = ref<TradeMark[]>([]);
const imgList = ref<SpuImage[]>([]);
const dialogImageUrl = ref<string>('');
const dialogVisible = ref<boolean>(false);
const saleAttrList = ref<SpuSaleAttr[]>([]);
const baseSaleAttrList = ref<BaseSaleAttr[]>([]);
const tagInputValue = ref<string>('');
const InputRef = ref();
const unSelectSaleAttrValue = ref<string>('');

//计算出当前spu还未选择的销售属性
const unSelectSaleAttr = computed(() => {
  // if (!baseSaleAttrList.value.length) return [];
  return baseSaleAttrList.value.filter((item) => {
    return saleAttrList.value.every((saleAttr) => {
      return saleAttr.baseSaleAttrId !== item.id;
    });
  });
});

const cancel = () => {
  $emit('changeScene', 0);
};

const initSpuFormData = async (spu: Spu) => {
  Object.assign(spuData, JSON.parse(JSON.stringify(spu)));
  const tradeMarkListRes: TradeMarkResponse = await fetchTrademarkList();
  const spuImageListRes: SpuImageResponse = await fetchSpuImages(
    spu.id as number,
  );
  const saleAttrListRes: SpuSaleAttrResponse = await fetchSaleAttrList(
    spu.id as number,
  );
  const baseSaleAttrListRes: BaseSaleAttrResponse =
    await fetchBaseSaleAttrList();
  tradeMarkList.value = tradeMarkListRes.data;
  imgList.value = spuImageListRes.data.map((item) => {
    return {
      ...item,
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  saleAttrList.value = saleAttrListRes.data;
  baseSaleAttrList.value = baseSaleAttrListRes.data;
};

const initAddSpu = async (c3Id: number) => {
  //清空表单数据
  Object.assign(spuData, {
    spuName: '',
    description: '',
    tmId: '',
    category3Id: '',
    spuImageList: null,
    spuSaleAttrList: null,
  });
  imgList.value = [];
  saleAttrList.value = [];
  const tradeMarkListRes: TradeMarkResponse = await fetchTrademarkList();
  const baseSaleAttrListRes: BaseSaleAttrResponse =
    await fetchBaseSaleAttrList();
  tradeMarkList.value = tradeMarkListRes.data;
  baseSaleAttrList.value = baseSaleAttrListRes.data;
  spuData.category3Id = c3Id;
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleCloseTag = (row: SpuSaleAttr, tag: SpuSaleAttrValue) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
};

const showInput = (row: SpuSaleAttr) => {
  row.flag = true;
  nextTick(() => {
    InputRef.value.focus();
  });
};

const handleInputConfirm = (row: SpuSaleAttr) => {
  //判断属性值是否在当前属性值列表中已存在
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === tagInputValue.value;
  });
  if (repeat) {
    tagInputValue.value = '';
    ElMessage({
      type: 'warning',
      message: '属性值已存在',
    });
    return;
  }
  if (tagInputValue.value) {
    row.spuSaleAttrValueList.push({
      baseSaleAttrId: row.baseSaleAttrId,
      saleAttrValueName: tagInputValue.value,
    });
  }
  row.flag = false;
  tagInputValue.value = '';
};

const addSaleAttr = () => {
  const baseSaleAttrId = Number(unSelectSaleAttrValue.value.split(':')[0]);
  const saleAttrName = unSelectSaleAttrValue.value.split(':')[1];
  // const [baseSaleAttrId, saleAttrName] = unSelectSaleAttrValue.value.split(':');
  const newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttrList.value.push(newSaleAttr);
  unSelectSaleAttrValue.value = '';
};

const save = async () => {
  spuData.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  spuData.spuSaleAttrList = saleAttrList.value;
  const res = await fetchAddOrUpdateSpu(spuData);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '保存成功',
    });
    $emit('changeScene', 0);
  } else {
    ElMessage({
      type: 'error',
      message: '保存失败',
    });
  }
};

defineExpose({
  initSpuFormData,
  initAddSpu,
});
</script>

<style scoped></style>
