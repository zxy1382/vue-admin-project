import { Sku } from '../spu/type';

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SkuResponse extends ResponseData {
  data: {
    records: Sku[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: any;
    maxLimit: any;
    searchCount: boolean;
    pages: number;
  };
}

export interface SkuInfoResponse extends ResponseData {
  data: Sku;
}
