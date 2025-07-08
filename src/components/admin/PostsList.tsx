
import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/post';

interface PostsListProps {
  posts: Post[];
  onCreatePost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
}

export const PostsList = ({ posts, onCreatePost, onEditPost, onDeletePost }: PostsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Posts Management</h2>
        <Button onClick={onCreatePost} className="bg-red-600 hover:bg-red-700">
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPost(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/post/${post.id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this post?')) {
                        onDeletePost(post.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  {post.isPinned && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                      Pinned
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">5 min read</span>
              </div>
              <p className="text-gray-700 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
