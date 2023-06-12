import {
  fetchCategory1,
  fetchCategory2,
  fetchCategory3,
} from '@/api/product/attr';
import { CategoryResponse } from '@/api/product/attr/type';
import { defineStore } from 'pinia';
import { CategoryState } from './types/type';

const useCategoryStore = defineStore({
  id: 'Category',
  state: (): CategoryState => ({
    c1List: [],
    c1Id: '',
    c2Id: '',
    c3Id: '',
    c2List: [],
    c3List: [],
  }),
  actions: {
    async getCategory1() {
      const res: CategoryResponse = await fetchCategory1();
      if (res.code === 200) {
        this.c1List = res.data;
      }
    },
    async getCategory2() {
      // TODO
      const res: CategoryResponse = await fetchCategory2(this.c1Id);
      if (res.code === 200) {
        this.c2List = res.data;
      }
    },
    async getCategory3() {
      // TODO
      const res: CategoryResponse = await fetchCategory3(this.c2Id);
      if (res.code === 200) {
        this.c3List = res.data;
      }
    },
  },
});

export default useCategoryStore;
