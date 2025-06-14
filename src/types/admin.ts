
// Admin user types and permissions
export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  permissions: Permission[];
  createdAt: string;
  isActive: boolean;
  lastLogin?: string;
  createdBy?: string;
}

export const DEFAULT_PERMISSIONS: Permission[] = [
  { id: 'view_dashboard', name: 'View Dashboard', description: 'Access to admin dashboard' },
  { id: 'create_posts', name: 'Create Posts', description: 'Create and edit posts' },
  { id: 'delete_posts', name: 'Delete Posts', description: 'Delete posts' },
  { id: 'manage_categories', name: 'Manage Categories', description: 'Create and manage post categories' },
  { id: 'manage_users', name: 'Manage Users', description: 'View and manage user accounts' },
  { id: 'manage_admins', name: 'Manage Admins', description: 'Create and manage admin users' },
  { id: 'manage_stories', name: 'Manage Stories', description: 'Create and manage stories' },
  { id: 'view_analytics', name: 'View Analytics', description: 'Access to site analytics' },
  { id: 'manage_settings', name: 'Manage Settings', description: 'Modify site settings' }
];

export const ROLE_PERMISSIONS = {
  super_admin: DEFAULT_PERMISSIONS,
  admin: DEFAULT_PERMISSIONS.filter(p => 
    !['manage_admins', 'manage_settings'].includes(p.id)
  ),
  editor: DEFAULT_PERMISSIONS.filter(p => 
    ['view_dashboard', 'create_posts', 'manage_categories', 'manage_stories'].includes(p.id)
  )
};
