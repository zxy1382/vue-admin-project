export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Role {
  id?: number | string;
  roleName: string;
  createTime?: string;
  updateTime?: string;
}

export type Records = Role[];

export interface RoleResponseData extends ResponseData {
  data: {
    total: number;
    size: number;
    pages: number;
    current: number;
    records: Records;
  };
}

export interface Permission {
  id?: number;
  type?: number;
  pid: number;
  name: string;
  code: string;
  toCode?: string;
  status?: null;
  level: number;
  select?: boolean;
  children?: Permission[];
}

export interface PermissionResponseData extends ResponseData {
  data: Permission[];
}
