import request from '@/utils/request';
import { AttrResponse, CategoryResponse, Attr } from './type';

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
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

/**
 * 获取属性列表
 * @param category1Id
 * @param category2Id
 * @param category3Id
 * @returns
 */
export function fetchAttrList(
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) {
  return request.get<any, AttrResponse>(
    API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id,
  );
}

export function fetchAddOrUpdateAttr(data: Attr) {
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data);
}

export function fetchDeleteAttr(attrId: number | string) {
  return request.delete<any, any>(API.DELETEATTR_URL + attrId);
}
