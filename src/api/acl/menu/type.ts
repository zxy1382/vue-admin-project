import { Permission } from '../role/type';

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface MenuResponseData extends ResponseData {
  data: Permission[];
}
