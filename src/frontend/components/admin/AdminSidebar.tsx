
// Modern sidebar component with role-based navigation
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  Crown,
  Shield
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const AdminSidebar = ({ activeTab, onTabChange, onLogout }: AdminSidebarProps) => {
  const { currentAdmin, hasPermission } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
    { id: 'posts', label: 'Posts', icon: FileText, permission: 'create_posts' },
    { id: 'admins', label: 'Admin Users', icon: Users, permission: 'manage_admins' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, permission: 'view_analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, permission: 'site_settings' },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-red-600 to-red-700 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-red-500">
        <h1 className="text-xl font-bold">Nepali Star Admin</h1>
        <div className="mt-4 flex items-center space-x-2">
          {getRoleIcon(currentAdmin?.role || '')}
          <div>
            <p className="text-sm font-medium">{currentAdmin?.username}</p>
            <p className="text-xs text-red-200 capitalize">{currentAdmin?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const canAccess = !item.permission || hasPermission(item.permission);
            
            if (!canAccess) return null;

            return (
              <li key={item.id}>
                <Button
                  onClick={() => onTabChange(item.id)}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    activeTab === item.id 
                      ? 'bg-red-500 text-white' 
                      : 'text-red-100 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-red-500">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-red-100 hover:bg-red-500 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
