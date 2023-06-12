//分类数据的ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

//返回数据类型
export interface CategoryResponse extends ResponseData {
  data: Category[];
}
