import { RouteRecordRaw } from 'vue-router';

export interface userState {
  token: string;
  menuList: RouteRecordRaw[];
  username: string;
  avatar: string;
}
