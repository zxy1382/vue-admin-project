<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
// import { ElMessage } from 'element-plus';

defineProps<{ msg: string }>();

const xxx = () => {
  // ElMessage({
  //   type: 'error',
  //   message: 'xxxx',
  // });
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary" :icon="Plus" @click="xxx">按钮</el-button>
  <svg-icon name="phone" width="200px" height="200px"></svg-icon>
</template>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>
