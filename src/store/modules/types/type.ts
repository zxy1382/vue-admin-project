import { Category } from '@/api/product/attr/type';
import { RouteRecordRaw } from 'vue-router';

export interface userState {
  token: string;
  menuList: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
}

export interface CategoryState {
  c1Id: number | string;
  c2Id: number | string;
  c3Id: number | string;
  c1List: Category[];
  c2List: Category[];
  c3List: Category[];
}
