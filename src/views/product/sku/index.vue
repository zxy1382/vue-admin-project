<template>
  <div>
    <el-card>
      <el-table class="table" border :data="skuList">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column prop="skuDesc" label="描述"></el-table-column>
        <el-table-column prop="skuDefaultImg" label="图片">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(g)"></el-table-column>
        <el-table-column prop="price" label="价格(元)"></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              @click="changeSaleStatus(row)"
            ></el-button>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="viewSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.skuName}?`"
              @confirm="delSku(row)"
              width="200"
              placement="top"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="pageNow"
        v-model:page-size="limit"
        :page-sizes="[10, 15, 20, 30, 50, 100]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getSkuList"
        @size-change="getSkuList"
      />
    </el-card>
    <el-drawer v-model="drawer" title="查看商品">
      <template #default>
        <el-row style="margin: 15px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">价格(元)</el-col>
          <el-col :span="18">{{ skuInfo?.price }}</el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuAttrValueList"
              :key="item.id"
              style="margin: 0 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 0 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 15px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              :interval="4000"
              type="card"
              height="200px"
              indicator-position="outside"
            >
              <el-carousel-item
                v-for="item in skuInfo?.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  fetchCancelSale,
  fetchSkuList,
  fetchOnSale,
  fetchSkuInfo,
  fetchDeleteSku,
} from '@/api/product/sku';
import { SkuInfoResponse, SkuResponse } from '@/api/product/sku/type';
import { Sku } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const pageNow = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const skuList = ref<SkuResponse['data']['records']>([]);
const drawer = ref<boolean>(false);
const skuInfo = ref<SkuInfoResponse['data']>();

onMounted(() => {
  getSkuList();
});

const getSkuList = async () => {
  const res: SkuResponse = await fetchSkuList(pageNow.value, limit.value);
  if (res.code === 200) {
    total.value = res.data.total;
    skuList.value = res.data.records;
  }
};

const changeSaleStatus = async (row: Sku) => {
  if (row.isSale === 1) {
    const res = await fetchCancelSale(row.id as number);
    if (res.code === 200) {
      ElMessage({
        type: 'info',
        message: '下架成功',
      });
      getSkuList();
    }
  } else {
    const res = await fetchOnSale(row.id as number);
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      });
      getSkuList();
    }
  }
};

const viewSku = async (row: Sku) => {
  drawer.value = true;
  const res: SkuInfoResponse = await fetchSkuInfo(row.id as number);
  skuInfo.value = res.data;
};

const delSku = async (row: Sku) => {
  const res = await fetchDeleteSku(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getSkuList();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};
</script>

<style scoped lang="scss">
.table {
  height: calc(100vh - 200px);
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
