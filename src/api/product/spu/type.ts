export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

/**
 * spu数据类型
 */
export interface Spu {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: SpuSaleAttr[] | null;
  spuImageList: SpuImage[] | null;
}

export type Records = Spu[];

export interface SpuResponse extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export interface TradeMark {
  id: number;
  logoUrl: string;
  tmName: string;
}

export interface TradeMarkResponse extends ResponseData {
  data: TradeMark[];
}

export interface SpuImage {
  id?: number;
  imgName: string;
  imgUrl: string;
  spuId?: number;
  createTime?: string;
  updateTime?: string;
  name?: string;
  url?: string;
}

export interface SpuImageResponse extends ResponseData {
  data: SpuImage[];
}

export interface SpuSaleAttrValue {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  flag?: boolean;
}

export interface SpuSaleAttr {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValue[];
  flag?: boolean;
}

export interface SpuSaleAttrResponse extends ResponseData {
  data: SpuSaleAttr[];
}

export interface BaseSaleAttr {
  id: number;
  name: string;
}

export interface BaseSaleAttrResponse extends ResponseData {
  data: BaseSaleAttr[];
}

export interface skuAttr {
  attrId: number | string;
  valueId: number | string;
}

export interface skuSaleAttr {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
}
export interface Sku {
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  skuDesc: string;
  weight: number | string;
  price: number | string;
  skuDefaultImg: string;
  skuAttrValueList?: skuAttr[];
  skuSaleAttrValueList?: skuSaleAttr[];
}

export interface SkuResponse extends ResponseData {
  data: Sku[];
}
