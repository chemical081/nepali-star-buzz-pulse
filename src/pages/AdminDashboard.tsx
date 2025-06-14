
// Updated admin dashboard with role-based access and enhanced features
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminSidebar } from '@/frontend/components/admin/AdminSidebar';
import { AdminManagement } from '@/frontend/components/admin/AdminManagement';
import { PostEditor } from '@/frontend/components/admin/enhanced-post-editor/PostEditor';
import { PostsList } from '@/components/admin/PostsList';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/post';
import { mockNews } from '@/data/mockNews';
import { BarChart3, FileText, Users, TrendingUp } from 'lucide-react';

const AdminDashboardContent = () => {
  const { currentAdmin, logout, hasPermission, isLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockNews);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPostEditor, setShowPostEditor] = useState(false);

  // Dashboard statistics
  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    draftPosts: posts.filter(p => p.status === 'draft').length,
    pinnedPosts: posts.filter(p => p.isPinned).length,
  };

  const handleSavePost = (postData: Post) => {
    if (editingPost) {
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id ? postData : post
      ));
    } else {
      setPosts(prev => [postData, ...prev]);
    }
    setShowPostEditor(false);
    setEditingPost(null);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostEditor(true);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleTogglePin = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isPinned: !post.isPinned } : post
    ));
  };

  const renderContent = () => {
    if (showPostEditor) {
      return (
        <PostEditor
          post={editingPost || undefined}
          onSave={handleSavePost}
          onCancel={() => {
            setShowPostEditor(false);
            setEditingPost(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <FileText className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.publishedPosts}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                  <FileText className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.draftPosts}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pinned</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pinnedPosts}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.slice(0, 5).map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{post.title}</h4>
                        <p className="text-sm text-gray-600">{post.category}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'posts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
              {hasPermission('create_posts') && (
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setShowPostEditor(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              )}
            </div>
            
            <PostsList
              posts={posts}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onTogglePin={handleTogglePin}
            />
          </div>
        );
      
      case 'admins':
        return <AdminManagement />;
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">Site settings coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={logout}
      />
      
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    // This will be handled by the AuthProvider now
    setIsAuthenticated(true);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <AdminDashboardWrapper onLogin={handleLogin} />
      </AuthProvider>
    </LanguageProvider>    
  );
};

const AdminDashboardWrapper = ({ onLogin }: { onLogin: (credentials: any) => void }) => {
  const { currentAdmin } = useAuth();

  if (!currentAdmin) {
    return <AdminLogin onLogin={onLogin} />;
  }

  return <AdminDashboardContent />;
};

export default AdminDashboard;
