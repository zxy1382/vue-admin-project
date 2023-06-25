//创建用户相关的仓库
import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user';
import {
  loginResponseData,
  loginFormType,
  userResponseData,
} from '@/api/user/type';
import { userState } from './types/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
//引入路由
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes';
import router from '@/router';
//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';

//过滤当前用户需要展示的路由
export const filterRoutes = (asyncRoute: any, routes: string[]) => {
  const res = asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoutes(item.children, routes);
      }
      return true;
    }
  });
  return res;
};

const useUserStore = defineStore('User', {
  //存储数据
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuList: [...constantRoutes, ...asyncRoutes, ...anyRoutes], //仓库存储生成菜单的数据
      username: '',
      avatar: '',
      buttons: [], //按钮权限
    };
  },
  //异步|逻辑
  actions: {
    //登录方法
    async userLogin(data: loginFormType) {
      const res: loginResponseData = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data as string;
        //本地存储
        SET_TOKEN(res.data as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data as string));
      }
    },
    //获取用户信息方法
    async getUserInfo() {
      const res: userResponseData = await reqUserInfo();
      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        this.buttons = res.data.buttons;
        //过滤菜单
        const userAsyncRoute = filterRoutes(
          cloneDeep(asyncRoutes),
          res.data.routes,
        );
        this.menuList = [...constantRoutes, ...userAsyncRoute, ...anyRoutes];
        [...userAsyncRoute, ...anyRoutes].forEach((item: any) => {
          router.addRoute(item);
        });
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    //退出登录方法
    async logOut() {
      const res = await reqLogOut();
      if (res.code === 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
