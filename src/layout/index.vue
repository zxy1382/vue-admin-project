<template>
  <!-- <div class="layout_container">
    <div class="layout_slider"></div>
    <div class="layout_tabbar"></div>
    <div class="layout_main">
      <p style="height: 1000px">段落</p>
    </div>
  </div> -->
  <div class="common-layout">
    <el-container>
      <el-aside width="260px" style="background: red">Aside</el-aside>
      <el-container>
        <el-header style="background: greenyellow">Header</el-header>
        <el-main style="background: cyan">
          <p style="height: 1000px">Main</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }
  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    background: cadetblue;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    background: yellowgreen;
    left: $base-menu-width;
    top: $base-tabber-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
