<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin-right: 20px; cursor: pointer" @click="changeIcon">
        <component :is="layoutStore.collapsed ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in route.matched"
          :key="item.path"
          v-show="item.path !== '/'"
          :to="item.path"
        >
          <div style="display: flex; align-items: center">
            <el-icon style="margin-right: 4px">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>
              {{ item.meta.title }}
            </span>
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button icon="Refresh" circle @click="refreshHandle" />
      <el-button icon="FullScreen" circle />
      <el-button icon="Setting" circle />
      <img
        src="../../../public/logo.png"
        alt=""
        style="width: 24px; height: 24px; margin-left: 20px"
      />
      <el-dropdown style="margin-left: 10px">
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';

//定义响应式数据来控制图标的切换
const layoutStore = useLayoutStore();
const changeIcon = () => {
  layoutStore.collapsed = !layoutStore.collapsed;
};
const route = useRoute();
const refreshHandle = () => {
  layoutStore.refresh = !layoutStore.refresh;
};
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabbar_left,
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
