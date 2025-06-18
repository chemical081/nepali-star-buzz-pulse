
// Enhanced authentication context with admin roles
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, ROLE_PERMISSIONS } from '@/types/admin';

interface AuthContextType {
  currentAdmin: AdminUser | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permissionId: string) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin data - in real app this would come from your backend
const MOCK_ADMINS: AdminUser[] = [
  {
    id: '1',
    username: 'Dipesh',
    email: 'super@nepalistar.com',
    role: 'super_admin',
    permissions: ROLE_PERMISSIONS.super_admin,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: '2',
    username: 'Sagar',
    email: 'admin@nepalistar.com',
    role: 'admin',
    permissions: ROLE_PERMISSIONS.admin,
    createdAt: new Date().toISOString(),
    isActive: true,
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setCurrentAdmin(JSON.parse(adminData));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    // Mock authentication - replace with real API call
    const validCredentials = [
      { username: 'superadmin', password: 'Dipesh12345' },
      { username: 'admin', password: 'Sagar12345' }
    ];

    const isValid = validCredentials.some(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (isValid) {
      const admin = MOCK_ADMINS.find(a => a.username === credentials.username);
      if (admin) {
        setCurrentAdmin(admin);
        localStorage.setItem('adminData', JSON.stringify(admin));
        localStorage.setItem('adminToken', 'authenticated');
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
  };

  const hasPermission = (permissionId: string): boolean => {
    if (!currentAdmin) return false;
    return currentAdmin.permissions.some(p => p.id === permissionId);
  };

  return (
    <AuthContext.Provider value={{
      currentAdmin,
      login,
      logout,
      hasPermission,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
