import request from '@/utils/request';
import { MenuResponseData } from './type';
import { Permission } from '../role/type';

enum API {
  ALLMENU_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATEMENU_URL = '/admin/acl/permission/update',
  DELETEMENU_URL = '/admin/acl/permission/remove',
}

export function fetchAllMenu() {
  return request.get<any, MenuResponseData>(API.ALLMENU_URL);
}

export function fetchAddOruUpdateMenu(data: Permission) {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
}

export function fetchDeleteMenu(id: number) {
  return request.delete<any, any>(`${API.DELETEMENU_URL}/${id}`);
}
