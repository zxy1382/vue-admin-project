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
      <el-button icon="FullScreen" circle @click="fullScreenHandle" />
      <el-popover
        placement="bottom"
        title="主题设置"
        :width="260"
        trigger="hover"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" show-alpha @change="setColor" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="dark"
              active-icon="Moon"
              inactive-icon="Sunny"
              @change="changeDark"
            ></el-switch>
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button icon="Setting" circle />
        </template>
      </el-popover>
      <img
        :src="userStore.avatar"
        alt=""
        style="width: 24px; height: 24px; margin-left: 20px; border-radius: 50%"
      />
      <el-dropdown style="margin-left: 10px">
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayoutStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
//定义响应式数据来控制图标的切换
const layoutStore = useLayoutStore();
const changeIcon = () => {
  layoutStore.collapsed = !layoutStore.collapsed;
};
const route = useRoute();
const router = useRouter();
const dark = ref<boolean>(false);
const color = ref<string>('#409EFF');
//刷新
const refreshHandle = () => {
  layoutStore.refresh = !layoutStore.refresh;
};
//全屏
const fullScreenHandle = () => {
  layoutStore.fullScreen = !layoutStore.fullScreen;
  if (layoutStore.fullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
//退出登录
const logout = async () => {
  await userStore.logOut();
  router.push({
    path: '/login',
    query: { redirect: route.path },
  });
};

const changeDark = (val: any) => {
  const html = document.documentElement;
  if (val) {
    html.className = 'dark';
  } else {
    html.className = '';
  }
};

const setColor = () => {
  const html = document.documentElement;
  localStorage.setItem('color', color.value);
  html.style.setProperty('--el-color-primary', color.value);
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
