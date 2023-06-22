export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username: string;
  password?: string;
  name: string;
  phone?: null;
  roleName?: string;
}

export type Records = User[];

export interface UserResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export interface Role {
  id?: number;
  roleName: string;
  createTime?: string;
  updateTime?: string;
}

export type Roles = Role[];

export interface RoleResponseData extends ResponseData {
  data: {
    assignRoles: Roles;
    allRolesList: Roles;
  };
}

export interface SetRoleData {
  userId: number;
  roleIdList: number[];
}
