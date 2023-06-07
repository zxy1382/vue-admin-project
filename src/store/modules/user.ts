//创建用户相关的仓库
import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import { loginType } from '@/api/user/type';

const useUserStore = defineStore('User', {
  //存储数据
  state: () => {
    return {
      token: localStorage.getItem('TOKEN') || '',
    };
  },
  //异步|逻辑
  actions: {
    //登录方法
    async userLogin(data: loginType) {
      const res = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data.token;
        //本地存储
        localStorage.setItem('TOKEN', res.data.token);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
