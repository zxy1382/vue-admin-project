import { App, Component } from 'vue';
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const allComponents: { [name: string]: Component } = { SvgIcon, Category };
export default {
  install(app: App) {
    Object.keys(allComponents).forEach((key) => {
      app.component(key, allComponents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
