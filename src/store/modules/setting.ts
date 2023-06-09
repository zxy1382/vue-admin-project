//layout组件相关的配置仓库
import { defineStore } from 'pinia';

const useLayoutStore = defineStore('SettingStore', {
  state: () => {
    return {
      //侧边栏是否折叠
      collapsed: false,
      refresh: false, //是否刷新
    };
  },
});

export default useLayoutStore;
