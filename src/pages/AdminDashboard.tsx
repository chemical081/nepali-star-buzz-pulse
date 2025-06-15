
import { useState } from 'react';
import { AdminSidebar } from '@/frontend/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostsList } from '@/components/admin/PostsList';
import { PostForm } from '@/components/admin/PostForm';
import { AdminManagement } from '@/frontend/components/admin/AdminManagement';
import { StoriesManagement } from '@/frontend/components/admin/StoriesManagement';
import { AdminUser } from '@/types/admin';
import { Post } from '@/types/post';
import { transformMockDataToPost } from '@/utils/postHelpers';
import { mockNews } from '@/data/mockNews';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Mock admin user
  const currentAdmin: AdminUser = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'super_admin',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isActive: true
  };

  // Transform mock data to posts
  const posts = mockNews.map(transformMockDataToPost);

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout logic
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleClosePostForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const renderContent = () => {
    if (showPostForm) {
      return (
        <PostForm
          post={editingPost}
          onSubmit={(postData) => {
            console.log('Post submitted:', postData);
            handleClosePostForm();
          }}
          onCancel={handleClosePostForm}
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
        return <StoriesManagement />;
      case 'admins':
        return <AdminManagement />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600">Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader currentAdmin={currentAdmin} onLogout={handleLogout} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
