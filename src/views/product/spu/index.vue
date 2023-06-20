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
                  @click="addSku(scope.row)"
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
                  @click="viewSkuList(scope.row)"
                ></el-button>
                <el-popconfirm
                  :title="`确定删除${scope.row.spuName}?`"
                  @confirm="delSpu(scope.row)"
                  width="200"
                  placement="top"
                >
                  <template #reference>
                    <el-button type="danger" icon="Delete"></el-button>
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
          @current-change="getSpuList"
          @size-change="getSpuList"
        />
      </div>
      <SpuForm ref="spuForm" v-show="scene === 1" @changeScene="changeScene" />
      <SkuForm ref="skuForm" v-show="scene === 2" @changeScene="changeScene" />
      <el-dialog v-model="show" title="SKU列表">
        <el-table :data="skuList" border style="margin: 10px 0">
          <el-table-column prop="skuName" label="SKU名称"></el-table-column>
          <el-table-column prop="price" label="SKU价格"></el-table-column>
          <el-table-column prop="weight" label="SKU重量(g)"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="scope">
              <img
                :src="scope.row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { fetchDeleteSpu, fetchSkuInfo, fetchSpuList } from '@/api/product/spu';
import { SkuResponse, Spu, SpuResponse } from '@/api/product/spu/type';
import useCategoryStore from '@/store/modules/category';
import { ref, watch, onBeforeUnmount } from 'vue';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';

const pageNow = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const spuListData = ref<SpuResponse['data']['records']>([]);
const scene = ref<number>(0);
//获取SpuForm组件实例
const spuForm = ref<InstanceType<typeof SpuForm>>();
//获取SkuForm组件实例
const skuForm = ref<InstanceType<typeof SkuForm>>();
//存储sku列表
const skuList = ref<SkuResponse['data']>([]);
const show = ref<boolean>(false);

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
  getSpuList();
};

const addSpu = () => {
  scene.value = 1;
  spuForm.value?.initAddSpu(categoryStore.c3Id as number);
};

const updateSpu = async (row: Spu) => {
  // const res = await fetchSpuList(row.id);
  scene.value = 1;
  spuForm.value?.initSpuFormData(row);
};

const addSku = (row: Spu) => {
  scene.value = 2;
  skuForm.value?.initAddSku(categoryStore.c1Id, categoryStore.c2Id, row);
};

const viewSkuList = async (row: Spu) => {
  const res: SkuResponse = await fetchSkuInfo(row.id as number);
  if (res.code === 200) {
    skuList.value = res.data;
    show.value = true;
  }
};

const delSpu = async (row: Spu) => {
  const res = await fetchDeleteSpu(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getSpuList();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped lang="scss">
.table {
  height: calc(100vh - 340px);
}
</style>
