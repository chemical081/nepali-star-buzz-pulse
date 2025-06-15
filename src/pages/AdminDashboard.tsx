
import { useState } from 'react';
import { AdminSidebar } from '@/frontend/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostsList } from '@/components/admin/PostsList';
import { PostForm } from '@/components/admin/PostForm';
import { AdminManagement } from '@/frontend/components/admin/AdminManagement';
import { StoriesManagement } from '@/frontend/components/admin/StoriesManagement';
import { AdminUser } from '@/types/admin';
import { Post, PostContent, PostImage } from '@/types/post';
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
    isActive: true,
    permissions: [
      { id: 'read', name: 'Read', description: 'Read access' },
      { id: 'write', name: 'Write', description: 'Write access' },
      { id: 'delete', name: 'Delete', description: 'Delete access' },
      { id: 'admin', name: 'Admin', description: 'Admin access' }
    ]
  };

  // Transform mock data to posts with proper type structure
  const posts: Post[] = mockNews.map((news, index) => {
    // Create content blocks from simple content
    const content: PostContent[] = news.excerpt ? [
      {
        id: `content-${news.id}`,
        type: 'text',
        content: news.excerpt,
        order: 0
      }
    ] : [];

    const contentNp: PostContent[] = news.excerptNp ? [
      {
        id: `content-np-${news.id}`,
        type: 'text',
        content: news.excerptNp,
        order: 0
      }
    ] : [];

    // Create images array from single image
    const images: PostImage[] = news.image ? [
      {
        id: `img-${news.id}`,
        url: news.image,
        alt: news.title,
        position: 'header',
        order: 0
      }
    ] : [];

    return {
      id: news.id || String(index),
      title: news.title,
      titleNp: news.titleNp || '',
      excerpt: news.excerpt,
      excerptNp: news.excerptNp || '',
      content,
      contentNp,
      category: news.category,
      images,
      author: news.author,
      publishedAt: news.publishedAt,
      updatedAt: news.publishedAt,
      status: 'published' as const,
      isPinned: news.isPinned || false,
      likes: news.likes || 0,
      comments: news.comments || 0
    };
  });

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
          onSave={(postData) => {
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
