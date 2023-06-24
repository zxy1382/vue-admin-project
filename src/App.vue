<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const locale = zhCn;

(() => {
  const html = document.documentElement;
  const val = localStorage.getItem('color');
  if (val) {
    html.style.setProperty('--el-color-primary', val);
  } else {
    html.style.setProperty('--el-color-primary', '#409EFF');
  }
})();
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
