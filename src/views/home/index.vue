<template>
  <div style="height: 100%">
    <el-card>
      <div class="card">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好，{{ userStore.username }}</h3>
          <p class="subtitle">某方甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="image">
      <svg-icon name="welcome" width="100%" height="100%"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.card {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 30px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .subtitle {
      font-size: 20px;
      font-style: italic;
      color: #999;
    }
  }
}
.image {
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 300px);
  display: flex;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
