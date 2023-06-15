<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <div class="table">
          <el-table
            :data="spuListData"
            border
            style="margin: 10px 0"
            height="100%"
            size="large"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column prop="spuName" label="SPU名称"></el-table-column>
            <el-table-column
              prop="description"
              label="SPU描述"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="primary"
                  icon="Plus"
                  title="添加SKU"
                ></el-button>
                <el-button
                  type="primary"
                  icon="Edit"
                  title="修改SPU"
                  @click="updateSpu(scope.row)"
                ></el-button>
                <el-button
                  type="primary"
                  icon="View"
                  title="查看SKU列表"
                ></el-button>
                <el-button type="danger" icon="Delete"></el-button>
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
          @current-change="getSpuList"
          @size-change="getSpuList"
        />
      </div>
      <SpuForm ref="spuForm" v-show="scene === 1" @changeScene="changeScene" />
      <SkuForm v-show="scene === 2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { fetchSpuList } from '@/api/product/spu';
import { Spu, SpuResponse } from '@/api/product/spu/type';
import useCategoryStore from '@/store/modules/category';
import { ref, watch } from 'vue';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';

const pageNow = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const spuListData = ref<SpuResponse['data']['records']>([]);
const scene = ref<number>(0);
//获取SpuForm组件实例
const spuForm = ref<InstanceType<typeof SpuForm>>();

const categoryStore = useCategoryStore();

watch(
  () => categoryStore.c3Id,
  () => getSpuList(),
);

const getSpuList = async () => {
  const res: SpuResponse = await fetchSpuList(
    pageNow.value,
    limit.value,
    categoryStore.c3Id,
  );
  if (res.code === 200) {
    spuListData.value = res.data.records;
    total.value = res.data.total;
  }
};

//切换场景的自定义事件
const changeScene = (val: number) => {
  scene.value = val;
};

const addSpu = () => {
  scene.value = 1;
};

const updateSpu = async (row: Spu) => {
  // const res = await fetchSpuList(row.id);
  scene.value = 1;
  spuForm.value?.initSpuFormData(row);
};
</script>

<style scoped lang="scss">
.table {
  height: calc(100vh - 340px);
}
</style>
