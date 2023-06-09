<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue';
import useLayoutStore from '@/store/modules/setting';

const layoutStore = useLayoutStore();
const flag = ref(true);

watchEffect(() => {
  layoutStore.refresh;
  //点击刷新按钮后，路由组件会被销毁，此时flag为false，等到路由组件被销毁后，再将flag置为true，这样就可以重新加载路由组件了
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  });
});
</script>

<style scoped></style>
