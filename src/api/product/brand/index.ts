import request from '@/utils/request';
import { tradeMark, tradeMarkListRes } from './type';

enum API {
  BRAND_URL = '/admin/product/baseTrademark/',
  ADDBRAND_URL = '/admin/product/baseTrademark/save',
  UPDATEBRAND_URL = '/admin/product/baseTrademark/update',
  DELETEBRAND_URL = '/admin/product/baseTrademark/remove/',
}

/**
 *获取品牌列表
 * @param page 当前页数
 * @param limit 每页显示条数
 * @returns
 */
export function fetchTrademarkList(page: number, limit: number) {
  return request.get<any, tradeMarkListRes>(API.BRAND_URL + `${page}/${limit}`);
}

/**
 * 添加或修改品牌
 * @param data
 * @returns
 */
export function fetchAddOrUpdateTrademark(data: tradeMark) {
  if (data.id) {
    return request.put<any, any>(API.UPDATEBRAND_URL, data);
  } else {
    return request.post<any, any>(API.ADDBRAND_URL, data);
  }
}

/**
 * 删除品牌
 * @param id
 * @returns
 */
export function fetchDeleteTrademark(id: number) {
  return request.delete<any, any>(API.DELETEBRAND_URL + id);
}
