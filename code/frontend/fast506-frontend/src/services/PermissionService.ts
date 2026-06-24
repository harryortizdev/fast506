import axios from 'axios';
import { Module, Permission } from '../models/Permission';

const API_URL = 'http://localhost:8080/api';

export const getModules = async (): Promise<Module[]> => {
  const response = await axios.get<Module[]>(`${API_URL}/modules`);
  return response.data;
};

export const getPermissionsByRole = async (idRole: number): Promise<Permission[]> => {
  const response = await axios.get<Permission[]>(`${API_URL}/permissions/role/${idRole}`);
  return response.data;
};

export const savePermissions = async (idRole: number, permissions: Permission[]): Promise<void> => {
  await axios.put(`${API_URL}/permissions/role/${idRole}`, permissions);
};
