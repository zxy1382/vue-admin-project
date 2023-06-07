<template>
  <!-- <div class="layout_container">
    <div class="layout_slider"></div>
    <div class="layout_tabbar"></div>
    <div class="layout_main">
      <p style="height: 1000px">段落</p>
    </div>
  </div> -->
  <div class="layout_container">
    <el-container>
      <el-aside class="layout_slider">
        <Logo />
      </el-aside>
      <el-container>
        <el-header class="layout_header">Header</el-header>
        <el-main class="layout_main">
          <p style="height: 1000px">Main</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue';
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }
  .layout_header {
    background: cadetblue;
  }
  .layout_main {
    background: yellowgreen;
  }
}
</style>
