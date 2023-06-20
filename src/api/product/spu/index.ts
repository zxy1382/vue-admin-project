import request from '@/utils/request';
import {
  BaseSaleAttrResponse,
  Sku,
  SkuResponse,
  Spu,
  SpuImageResponse,
  SpuResponse,
  SpuSaleAttrResponse,
  TradeMarkResponse,
} from './type';

enum API {
  SPUList = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个spu下的所有图片列表
  IMAGES_URL = '/admin/product/spuImageList/',
  //获取某个spu下的所有销售属性
  SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部销售属性
  BASE_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  //添加sku
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  //查看某个spu下的所有sku列表
  SKUINFO_URL = '/admin/product/findBySpuId/',
  DELETESPU_URL = '/admin/product/deleteSpu/',
}

export function fetchSpuList(
  page: number,
  limit: number,
  c3Id: number | string,
) {
  return request.get<any, SpuResponse>(
    API.SPUList + `${page}/${limit}?category3Id=${c3Id}`,
  );
}

/**
 * 所有品牌列表
 * @returns
 */
export function fetchTrademarkList() {
  return request.get<any, TradeMarkResponse>(API.ALLTRADEMARK_URL);
}

export function fetchSpuImages(spuId: number | string) {
  return request.get<any, SpuImageResponse>(API.IMAGES_URL + spuId);
}

export function fetchSaleAttrList(spuId: number | string) {
  return request.get<any, SpuSaleAttrResponse>(API.SALE_ATTR_URL + spuId);
}

export function fetchBaseSaleAttrList() {
  return request.get<any, BaseSaleAttrResponse>(API.BASE_SALE_ATTR_URL);
}

export function fetchAddOrUpdateSpu(data: Spu) {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
}

export function fetchAddSku(data: Sku) {
  return request.post<any, any>(API.ADDSKU_URL, data);
}

export function fetchSkuInfo(spuId: number | string) {
  return request.get<any, SkuResponse>(API.SKUINFO_URL + spuId);
}

export function fetchDeleteSpu(spuId: number | string) {
  return request.delete<any, any>(API.DELETESPU_URL + spuId);
}
