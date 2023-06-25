//路由鉴权
import router from '@/router';
//@ts-ignore
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import pinia from './store';
import useUserStore from './store/modules/user';
import setting from './setting';

//取消进度条的圈
nprogress.configure({ showSpinner: false });

const userStore = useUserStore(pinia);
//全局前置守卫
router.beforeEach(async (to, _, next) => {
  //to: 即将要进入的目标 路由对象
  //from: 当前导航正要离开的路由
  //next: 调用该方法后，才能进入下一个钩子
  nprogress.start();
  //获取token，判断用户是否登录
  const token = userStore.token;
  const username = userStore.username;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.getUserInfo();
          //获取用户信息成功后，根据用户信息生成可访问异步路由
          next({ ...to });
        } catch (error) {
          await userStore.logOut();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});

//全局后置守卫
router.afterEach((to) => {
  nprogress.done();
  document.title = `${setting.title} - ${to.meta.title}`;
});

//用户未登录，可以访问login，但是不能访问其他页面
//登录成功后，不可以访问login，可以访问其他页面
