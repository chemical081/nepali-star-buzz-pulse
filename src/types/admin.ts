
// Admin and permission type definitions
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  permissions: AdminPermission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  createdBy?: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'posts' | 'users' | 'settings' | 'analytics';
}

export const DEFAULT_PERMISSIONS: AdminPermission[] = [
  { id: 'create_posts', name: 'Create Posts', description: 'Can create new posts', category: 'posts' },
  { id: 'edit_posts', name: 'Edit Posts', description: 'Can edit existing posts', category: 'posts' },
  { id: 'delete_posts', name: 'Delete Posts', description: 'Can delete posts', category: 'posts' },
  { id: 'manage_categories', name: 'Manage Categories', description: 'Can manage post categories', category: 'posts' },
  { id: 'manage_admins', name: 'Manage Admins', description: 'Can add/remove admin users', category: 'users' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Can view site analytics', category: 'analytics' },
  { id: 'site_settings', name: 'Site Settings', description: 'Can modify site settings', category: 'settings' },
];

// Role-based default permissions
export const ROLE_PERMISSIONS = {
  super_admin: DEFAULT_PERMISSIONS,
  admin: DEFAULT_PERMISSIONS.filter(p => p.id !== 'manage_admins'),
  editor: DEFAULT_PERMISSIONS.filter(p => p.category === 'posts' && p.id !== 'delete_posts'),
};
