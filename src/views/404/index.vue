<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <div class="btn">
      <el-button type="primary" @click="router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 800px;
    height: 400px;
    margin-left: 300px;
  }
}
</style>
