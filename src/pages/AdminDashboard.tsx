
// Updated admin dashboard with role-based access and enhanced features
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/frontend/components/admin/AdminSidebar';
import { AdminManagement } from '@/frontend/components/admin/AdminManagement';
import { PostEditor } from '@/frontend/components/admin/enhanced-post-editor/PostEditor';
import { PostsList } from '@/components/admin/PostsList';
import { StoriesManagement } from '@/frontend/components/admin/StoriesManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/post';
import { mockNews } from '@/data/mockNews';
import { transformLegacyPosts } from '@/utils/postHelpers';
import { FileText, Users, Video } from 'lucide-react';

const AdminDashboardContent = () => {
  const { currentAdmin, logout, hasPermission, isLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>(transformLegacyPosts(mockNews));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!currentAdmin) {
    return <AdminLogin />;
  }

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostEditor(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostEditor(true);
  };

  const handleSavePost = (postData: Partial<Post>) => {
    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...postData } : p));
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        ...postData,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published'
      } as Post;
      setPosts(prev => [newPost, ...prev]);
    }
    setShowPostEditor(false);
    setEditingPost(null);
  };

  const renderContent = () => {
    if (showPostEditor) {
      return (
        <PostEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setShowPostEditor(false);
            setEditingPost(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case 'posts':
        return (
          <PostsList
            posts={posts}
            onCreatePost={handleCreatePost}
            onEditPost={handleEditPost}
          />
        );
      case 'stories':
        return hasPermission('manage_stories') ? <StoriesManagement /> : <div>Access denied</div>;
      case 'admins':
        return hasPermission('manage_admins') ? <AdminManagement /> : <div>Access denied</div>;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
                  <p className="text-xs text-gray-500">Published articles</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Stories</CardTitle>
                  <Video className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <p className="text-xs text-gray-500">Active stories</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Admin Users</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <p className="text-xs text-gray-500">Active admins</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <FileText className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">New post published</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Video className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Story uploaded</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader currentAdmin={currentAdmin} onLogout={logout} />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
};

export default AdminDashboard;
