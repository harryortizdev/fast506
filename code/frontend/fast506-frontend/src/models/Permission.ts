export interface Permission {
  idPermissions?: number;
  idRole?: number;
  idModule: string;
  createPermission: boolean;
  readPermission: boolean;
  updatePermission: boolean;
  deletePermission: boolean;
  isActive?: boolean;
}

export interface Module {
  id: string;
  name: string;
}
