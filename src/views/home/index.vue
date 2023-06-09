<template>
  <div>
    <h1>{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { onMounted } from 'vue';

const userStore = useUserStore();
//发送请求获取用户信息
onMounted(() => {
  userStore.getUserInfo();
});
</script>

<style scoped></style>
