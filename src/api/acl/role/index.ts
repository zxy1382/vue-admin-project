import request from '@/utils/request';
import { PermissionResponseData, Role, RoleResponseData } from './type';

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

export function fetchAllRole(page: number, limit: number, roleName: string) {
  return request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  );
}

export function fetchAddOrUpdateRole(data: Role) {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
}

export function fetchAllPermissionList(roleId: number) {
  return request.get<any, PermissionResponseData>(
    API.ALLPERMISSION_URL + roleId,
  );
}

export function fetchSetPermission(roleId: number, permissionId: number[]) {
  return request.post<any, any>(
    API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`,
  );
}

export function fetchDeleteRole(roleId: number) {
  return request.delete<any, any>(API.DELETEROLE_URL + roleId);
}
