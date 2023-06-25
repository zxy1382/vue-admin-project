<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Top from './components/top/index.vue';

const screen = ref<HTMLElement | null>(null);

onMounted(() => {
  const screenDom = screen.value;
  if (screenDom) {
    const { width, height } = screenDom.getBoundingClientRect();
    console.log(width, height);
    const scale = Math.min(
      window.innerWidth / width,
      window.innerHeight / height,
    );
    screenDom.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }
});

window.onresize = () => {
  const screenDom = screen.value;
  if (screenDom) {
    const { width, height } = screenDom.getBoundingClientRect();
    const scale = Math.min(
      window.innerWidth / width,
      window.innerHeight / height,
    );
    screenDom.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 1;
        height: calc(100% - 40px);
        background: red;
      }
      .right {
        flex: 1;
      }
      .middle {
        flex: 2;
      }
    }
  }
}
</style>
