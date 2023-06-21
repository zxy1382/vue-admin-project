import request from '@/utils/request';
import { SkuInfoResponse, SkuResponse } from './type';

enum API {
  SKU_URL = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/',
}

export function fetchSkuList(page: number, limit: number) {
  return request.get<any, SkuResponse>(API.SKU_URL + `${page}/${limit}`);
}

export function fetchOnSale(skuId: number) {
  return request.get<any, any>(API.SALE_URL + skuId);
}

export function fetchCancelSale(skuId: number) {
  return request.get<any, any>(API.CANCELSALE_URL + skuId);
}

export function fetchSkuInfo(skuId: number) {
  return request.get<any, SkuInfoResponse>(API.SKUINFO_URL + skuId);
}

export function fetchDeleteSku(skuId: number) {
  return request.delete<any, any>(API.DELETESKU_URL + skuId);
}
