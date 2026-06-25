import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Permission } from '../models/Permission';
import { getPermissionsByRole } from '../services/PermissionService';

const API = 'http://localhost:8080/api/auth';

// Configurar axios globalmente para enviar cookies en cada petición
axios.defaults.withCredentials = true;

export interface AuthUser {
  userId: number;
  name: string;
  email: string;
  roleId: number | null;
  roleName: string | null;
  profileImage: string | null;
  permissions: Permission[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (module: string, action?: 'read' | 'create' | 'update' | 'delete') => boolean;
  updateUser: (partial: Partial<Pick<AuthUser, 'name' | 'email' | 'profileImage'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loadUserWithPermissions = async (userData: Omit<AuthUser, 'permissions'>): Promise<AuthUser> => {
  let permissions: Permission[] = [];
  if (userData.roleId != null) {
    try {
      permissions = await getPermissionsByRole(userData.roleId);
    } catch {
      permissions = [];
    }
  }
  return { ...userData, permissions };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar, verificar si ya hay sesión activa (cookie enviada automáticamente)
  useEffect(() => {
    axios
      .get(`${API}/me`)
      .then((res) => loadUserWithPermissions(res.data))
      .then((userWithPerms) => setUser(userWithPerms))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API}/login`, { email, password });
    const userWithPerms = await loadUserWithPermissions(res.data);
    setUser(userWithPerms);
  };

  const logout = async () => {
    await axios.post(`${API}/logout`);
    setUser(null);
  };

  const updateUser = (partial: Partial<Pick<AuthUser, 'name' | 'email' | 'profileImage'>>) => {
    setUser(prev => prev ? { ...prev, ...partial } : prev);
  };

  const hasPermission = (module: string, action: 'read' | 'create' | 'update' | 'delete' = 'read'): boolean => {
    if (!user?.permissions) return false;
    const perm = user.permissions.find(p => p.idModule === module);
    if (!perm) return false;
    switch (action) {
      case 'read': return perm.readPermission;
      case 'create': return perm.createPermission;
      case 'update': return perm.updatePermission;
      case 'delete': return perm.deletePermission;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
