import { createApp } from 'vue';
import App from './App.vue';
import './permission';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
//svg插件的配置代码
import 'virtual:svg-icons-register';
//引入自定义插件对象
import globalComponent from '@/components';
//引入全局样式
import '@/styles/index.scss';
import router from './router';
import pinia from './store';
import { isHasButton } from '@/directive/hasBtn';

const app = createApp(App);
//安装自定义插件
app.use(globalComponent);
app.use(router);
app.use(pinia);
//全局指令
app.directive('hasBtn', isHasButton);
app.mount('#app');
