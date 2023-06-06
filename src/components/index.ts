import { App, Component } from 'vue';
import SvgIcon from './SvgIcon/index.vue';

const allComponents: { [name: string]: Component } = { SvgIcon };
export default {
  install(app: App) {
    Object.keys(allComponents).forEach((key) => {
      app.component(key, allComponents[key]);
    });
  },
};
