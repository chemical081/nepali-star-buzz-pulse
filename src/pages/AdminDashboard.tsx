
import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/frontend/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostsList } from '@/components/admin/PostsList';
import { EnhancedPostEditor } from '@/components/admin/EnhancedPostEditor';
import { AdminManagement } from '@/frontend/components/admin/AdminManagement';
import { StoriesManagement } from '@/frontend/components/admin/StoriesManagement';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Post, PostContent, PostImage } from '@/types/post';
import { mockNews } from '@/data/mockNews';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { currentAdmin, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!currentAdmin) {
    return <AdminLogin />;
  }

  // Initialize posts from mock data on first load
  useEffect(() => {
    const transformedPosts: Post[] = mockNews.map((news, index) => {
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
    setPosts(transformedPosts);
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel.",
    });
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

  const handleSavePost = (postData: Post) => {
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(p => p.id === editingPost.id ? postData : p));
    } else {
      // Add new post
      setPosts(prev => [postData, ...prev]);
    }
    
    console.log('Post saved:', postData);
    toast({
      title: editingPost ? "Post updated" : "Post created",
      description: editingPost 
        ? "The post has been updated successfully." 
        : "The new post has been created successfully.",
    });
    handleClosePostForm();
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    toast({
      title: "Post deleted",
      description: "The post has been deleted successfully.",
    });
  };

  const renderContent = () => {
    if (showPostForm) {
      return (
        <EnhancedPostEditor
          post={editingPost}
          onSave={handleSavePost}
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
            onDeletePost={handleDeletePost}
          />
        );
      case 'stories':
        return <StoriesManagement />;
      case 'admins':
        return <AdminManagement />;
      case 'dashboard':
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600">Select a section from the sidebar to get started.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Posts</h3>
                <p className="text-3xl font-bold text-red-600">{posts.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Published</h3>
                <p className="text-3xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pinned Posts</h3>
                <p className="text-3xl font-bold text-blue-600">{posts.filter(p => p.isPinned).length}</p>
              </div>
            </div>
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
