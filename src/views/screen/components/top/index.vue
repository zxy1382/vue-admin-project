<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="middle">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <div class="rbtn">统计报告</div>
      <div class="time">当前时间：{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const time = ref<string>(dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
const timer = ref<number>(0);

const goHome = () => {
  router.push('/');
};

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss');
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
    .lbtn {
      width: 130px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }
  .middle {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 130px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
    .time {
      color: #29fcff;
      margin-right: 10px;
      font-size: 15px;
    }
  }
}
</style>
