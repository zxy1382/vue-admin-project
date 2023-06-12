import request from '@/utils/request';
import { CategoryResponse } from './type';

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

export function fetchCategory1() {
  return request.get<any, CategoryResponse>(API.C1_URL);
}

export function fetchCategory2(category1Id: number | string) {
  return request.get<any, CategoryResponse>(API.C2_URL + category1Id);
}

export function fetchCategory3(category2Id: number | string) {
  return request.get<any, CategoryResponse>(API.C3_URL + category2Id);
}
