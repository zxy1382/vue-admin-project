<template>
  <div class="layout_container">
    <el-container>
      <el-aside
        class="layout_slider"
        :class="{ collapse: layoutStore.collapsed ? true : false }"
      >
        <Logo />
        <el-scrollbar height="calc(100vh - 80px)">
          <el-menu
            :default-active="route.path"
            class="layout_menu"
            router
            :collapse="layoutStore.collapsed"
            active-text-color="yellowgreen"
          >
            <Menu :menuList="userStore.menuList" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="layout_header">
          <Tabbar />
        </el-header>
        <el-main class="layout_main">
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Logo from './Logo/index.vue';
import Menu from './Menu/index.vue';
import Tabbar from './Tabbar/index.vue';
import Main from './Main/index.vue';
//获取用户相关的仓库
import useUserStore from '@/store/modules/user';
import useLayoutStore from '@/store/modules/setting';

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const route = useRoute();
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
    transition: all 0.3s;
    .layout_menu {
      --el-menu-bg-color: '#001529';
      --el-menu-text-color: '#fff';
      --el-menu-hover-bg-color: none;
      border-right: none;
    }
    &.collapse {
      width: 60px;
    }
  }
  .layout_header {
    color: #000;
  }
  .layout_main {
    color: #000;
    //路由过渡动效
    .fade-enter-from {
      transform: scale(0);
    }
    .fade-enter-active {
      transition: all 0.3s;
    }
    .fade-enter-to {
      transform: scale(1);
    }
  }
}
</style>
