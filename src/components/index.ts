import SvgIcon from './SvgIcon/index.vue';

const allComponents: any = { SvgIcon };
export default {
  install(app: any) {
    Object.keys(allComponents).forEach((key) => {
      app.component(key, allComponents[key]);
    });
  },
};
