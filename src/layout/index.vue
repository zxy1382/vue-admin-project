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
        <el-scrollbar height="calc(100vh - 80px)">
          <el-menu default-active="2" class="layout_menu">
            <Menu :menuList="userStore.menuList" />
          </el-menu>
        </el-scrollbar>
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
import Menu from './Menu/index.vue';
//获取用户相关的仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  color: #fff;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    overflow: hidden;
    .layout_menu {
      --el-menu-bg-color: '#001529';
      --el-menu-text-color: '#fff';
      --el-menu-active-color: 'red';
      --el-menu-hover-bg-color: none;
      border-right: none;
    }
  }
  .layout_header {
    background: cadetblue;
  }
  .layout_main {
    background: yellowgreen;
  }
}
</style>
