
// Admin user management component
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AdminUser, DEFAULT_PERMISSIONS, ROLE_PERMISSIONS } from '@/types/admin';
import { Plus, Edit, Trash2, Crown, Shield, User } from 'lucide-react';

export const AdminManagement = () => {
  const { currentAdmin } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'editor' as AdminUser['role'],
    permissions: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAdmin: AdminUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      role: formData.role,
      permissions: ROLE_PERMISSIONS[formData.role],
      createdAt: new Date().toISOString(),
      isActive: true,
      createdBy: currentAdmin?.id
    };

    if (editingAdmin) {
      setAdmins(prev => prev.map(admin => 
        admin.id === editingAdmin.id ? { ...newAdmin, id: editingAdmin.id } : admin
      ));
    } else {
      setAdmins(prev => [...prev, newAdmin]);
    }

    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'editor',
      permissions: []
    });
    setIsAddDialogOpen(false);
    setEditingAdmin(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-yellow-100 text-yellow-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Admin Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingAdmin ? 'Edit Admin' : 'Add New Admin'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value: AdminUser['role']) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentAdmin?.role === 'super_admin' && (
                      <SelectItem value="admin">Admin</SelectItem>
                    )}
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingAdmin ? 'Update' : 'Create'} Admin
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <Card key={admin.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getRoleIcon(admin.role)}
                  <span className="text-lg">{admin.username}</span>
                </div>
                <Badge className={getRoleBadgeColor(admin.role)}>
                  {admin.role.replace('_', ' ')}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{admin.email}</p>
                <p>Created: {new Date(admin.createdAt).toLocaleDateString()}</p>
                <p>Permissions: {admin.permissions.length}</p>
                <div className="flex items-center space-x-2 pt-3">
                  <Button size="sm" variant="outline" onClick={() => {
                    setEditingAdmin(admin);
                    setFormData({
                      username: admin.username,
                      email: admin.email,
                      password: '',
                      role: admin.role,
                      permissions: admin.permissions.map(p => p.id)
                    });
                    setIsAddDialogOpen(true);
                  }}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {admins.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No admin users yet</p>
            <p className="text-sm">Add your first admin user to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
