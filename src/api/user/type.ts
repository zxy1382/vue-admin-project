/**
 * 用户登录携带的参数数据类型
 */
export interface loginFormType {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface loginResponseData extends ResponseData {
  data: string | null;
}

//用户信息数据类型
interface userInfo {
  routes: string[];
  buttons: string[];
  roles: string[];
  name: string;
  avatar: string;
}

export interface userResponseData extends ResponseData {
  data: userInfo;
}
