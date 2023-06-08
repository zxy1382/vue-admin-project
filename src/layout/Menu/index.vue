<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item
      v-if="!item.children && !item.meta?.hidden"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item
      v-if="item.children && !item.meta?.hidden && item.children?.length === 1"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.children[0].meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-if="item.children && item.children.length > 1">
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
      <!-- 递归组件 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList']);
</script>
<script lang="ts">
export default {
  name: 'Menu',
};
</script>

<style scoped></style>
