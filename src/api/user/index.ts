import request from '@/utils/request';
import type {
  loginFormType,
  loginResponseData,
  userResponseData,
} from './type';

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: loginFormType) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
