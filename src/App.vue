<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <HelloWorld msg="xxx"></HelloWorld>
  </el-config-provider>
</template>

<style scoped></style>
