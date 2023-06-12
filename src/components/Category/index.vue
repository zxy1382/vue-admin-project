<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            placeholder="请选择"
            @change="handleChangeCategor1"
          >
            <el-option
              v-for="c1 in categoryStore.c1List"
              :label="c1.name"
              :value="c1.id"
              :key="c1.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            placeholder="请选择"
            @change="handleChangeCategor2"
          >
            <el-option
              v-for="c2 in categoryStore.c2List"
              :label="c2.name"
              :value="c2.id"
              :key="c2.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" placeholder="请选择">
            <el-option
              v-for="c3 in categoryStore.c3List"
              :label="c3.name"
              :value="c3.id"
              :key="c3.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategory1();
});

const handleChangeCategor1 = () => {
  categoryStore.getCategory2();
  categoryStore.c3List = [];
  categoryStore.c3Id = '';
  categoryStore.c2Id = '';
  categoryStore.c2List = [];
};

const handleChangeCategor2 = () => {
  categoryStore.getCategory3();
  categoryStore.c3List = [];
  categoryStore.c3Id = '';
};
</script>

<style scoped></style>
