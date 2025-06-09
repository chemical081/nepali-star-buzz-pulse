
import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostForm } from '@/components/admin/PostForm';
import { PostsList } from '@/components/admin/PostsList';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { mockNews } from '@/data/mockNews';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState(mockNews);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In a real app, this would validate against your backend
    if (credentials.username === 'admin' && credentials.password === 'nepalistar2024') {
      localStorage.setItem('adminToken', 'authenticated');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleSavePost = (postData: any) => {
    if (editingPost) {
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id ? { ...postData, id: editingPost.id } : post
      ));
    } else {
      setPosts(prev => [{ ...postData, id: Date.now().toString() }, ...prev]);
    }
    setShowForm(false);
    setEditingPost(null);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
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

  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <AdminLogin onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminHeader 
          onLogout={handleLogout}
          onNewPost={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
        />
        
        <main className="container mx-auto px-4 py-8">
          {showForm ? (
            <PostForm
              post={editingPost}
              onSave={handleSavePost}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(null);
              }}
            />
          ) : (
            <PostsList
              posts={posts}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onTogglePin={handleTogglePin}
            />
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default AdminDashboard;
