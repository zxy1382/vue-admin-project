//创建用户相关的仓库
import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import { loginResponseData, loginType } from '@/api/user/type';
import { userState } from './types/type';
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';

const useUserStore = defineStore('User', {
  //存储数据
  state: (): userState => {
    return {
      token: GET_TOKEN(),
    };
  },
  //异步|逻辑
  actions: {
    //登录方法
    async userLogin(data: loginType) {
      const res: loginResponseData = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data.token as string;
        //本地存储
        SET_TOKEN(res.data.token as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
