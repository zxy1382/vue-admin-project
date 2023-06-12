<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';

const categoryStore = useCategoryStore();
</script>

<style scoped></style>
