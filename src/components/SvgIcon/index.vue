<template>
  <!-- svg:图标外层容器节点，内部需要和use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href指定用哪个图标，属性值为#icon-图标名字 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  prefix?: string;
  name: string;
  color?: string;
  width?: string;
  height?: string;
}
withDefaults(defineProps<Props>(), {
  prefix: '#icon-',
  width: '16px',
  height: '16px',
});
</script>

<style scoped></style>
