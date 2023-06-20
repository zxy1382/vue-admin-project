<template>
  <div>
    <el-form label-width="80" label-position="left">
      <el-form-item label="SKU名称">
        <el-input v-model="skuParams.skuName" placeholder="请输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuParams.price"
          placeholder="请输入价格"
          type="number"
        />
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input
          v-model="skuParams.weight"
          placeholder="请输入重量"
          type="number"
        />
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          v-model="skuParams.skuDesc"
          placeholder="请输入SKU描述"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in attrList"
            :label="item.attrName"
            :key="item.id"
          >
            <el-select v-model="item.attrIdAndValueId">
              <el-option
                v-for="item1 in item.attrValueList"
                :key="item1.id"
                :value="`${item.id}:${item1.id}`"
                :label="item1.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in saleAttrList"
            :label="item.saleAttrName"
            :key="item.id"
          >
            <el-select v-model="item.saleIdAndValueId">
              <el-option
                v-for="item1 in item.spuSaleAttrValueList"
                :key="item1.id"
                :label="item1.saleAttrValueName"
                :value="`${item.id}:${item1.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imagesList" ref="table">
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column prop="imgUrl" label="图片">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.imgUrl"
                :initial-index="scope.$index"
                :zoom-rate="1.2"
                fit="contain"
                hide-on-click-modal
                preview-teleported
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="warning" @click="handleDefaultImg(scope.row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { fetchAttrList } from '@/api/product/attr';
import {
  fetchAddSku,
  fetchSaleAttrList,
  fetchSpuImages,
} from '@/api/product/spu';
import { Sku, Spu } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const attrList = ref<any[]>([]);
const imagesList = ref<any[]>([]);
const saleAttrList = ref<any[]>([]);
//收集sku数据
const skuParams = reactive<Sku>({
  skuName: '',
  skuDesc: '',
  category3Id: '',
  price: '',
  weight: '',
  tmId: '',
  spuId: '',
  skuDefaultImg: '',
  skuSaleAttrValueList: [],
  skuAttrValueList: [],
});
const table = ref<any>();

const $emit = defineEmits(['changeScene']);

const cancel = () => {
  $emit('changeScene', 0);
};

const initAddSku = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: Spu,
) => {
  //清空数据
  Object.assign(skuParams, {
    skuName: '',
    skuDesc: '',
    category3Id: '',
    price: '',
    weight: '',
    tmId: '',
    spuId: '',
    skuDefaultImg: '',
    skuSaleAttrValueList: [],
    skuAttrValueList: [],
  });
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id as number;
  skuParams.tmId = spu.tmId;
  const resAttr = await fetchAttrList(c1Id, c2Id, spu.category3Id);
  const resImages = await fetchSpuImages(spu.id as number);
  const resSaleAttr = await fetchSaleAttrList(spu.id as number);
  attrList.value = resAttr.data;
  imagesList.value = resImages.data;
  saleAttrList.value = resSaleAttr.data;
};

const handleDefaultImg = (row: any) => {
  imagesList.value.forEach((item) => {
    table.value.toggleRowSelection(item, false);
  });
  table.value.toggleRowSelection(row, true);
  skuParams.skuDefaultImg = row.imgUrl;
};

const save = async () => {
  skuParams.skuAttrValueList = attrList.value.reduce((prev, item) => {
    if (item.attrIdAndValueId) {
      const attrId = Number(item.attrIdAndValueId.split(':')[0]);
      const valueId = Number(item.attrIdAndValueId.split(':')[1]);
      prev.push({ attrId, valueId });
    }
    return prev;
  }, []);
  skuParams.skuSaleAttrValueList = saleAttrList.value.reduce((prev, item) => {
    if (item.saleIdAndValueId) {
      const saleAttrId = Number(item.saleIdAndValueId.split(':')[0]);
      const saleAttrValueId = Number(item.saleIdAndValueId.split(':')[1]);
      prev.push({ saleAttrId, saleAttrValueId });
    }
    return prev;
  }, []);

  const res = await fetchAddSku(skuParams);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    });
    $emit('changeScene', 0);
  } else {
    ElMessage({
      type: 'error',
      message: res.message || '添加失败',
    });
  }
};

defineExpose({
  initAddSku,
});
</script>

<style scoped></style>
