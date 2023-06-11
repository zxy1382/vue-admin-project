export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

/**
 * 已有品牌数据的类型
 */
export interface tradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

/**
 * 品牌列表数据类型
 */
export type tradeMarkList = tradeMark[];

/**
 * 获取已有全部品牌数据的类型
 */
export interface tradeMarkListRes extends ResponseData {
  data: {
    records: tradeMarkList;
    total: number;
    size: number;
    current: number;
    seachCount: boolean;
    pages: number;
  };
}
