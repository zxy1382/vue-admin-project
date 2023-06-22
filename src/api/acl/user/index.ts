import request from '@/utils/request';
import { RoleResponseData, SetRoleData, User, UserResponseData } from './type';

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  //分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEUSERS_URL = '/admin/acl/user/batchRemove/',
}

export function fetchAllUser(page: number, limit: number, username: string) {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + page + '/' + limit + '?username=' + username,
  );
}

export function fetchAddOrUpdateUser(data: User) {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
}

export function fetchAllRole(userId: number) {
  return request.get<any, RoleResponseData>(API.ALLROLE_URL + userId);
}

export function fetchSetRole(data: SetRoleData) {
  return request.post<any, any>(API.SETROLE_URL, data);
}

export function fetchDeleteUser(userId: number) {
  return request.delete<any, any>(API.DELETEUSER_URL + userId);
}

export function fetchDeleteUsers(idList: number[]) {
  return request.delete<any, any>(API.DELETEUSERS_URL, {
    data: idList,
  });
}
