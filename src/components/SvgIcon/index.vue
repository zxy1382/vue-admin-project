<template>
  <!-- svg:图标外层容器节点，内部需要和use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href指定用哪个图标，属性值为#icon-图标名字 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  //前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  //接收父传递的颜色
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
});
</script>

<style scoped></style>
