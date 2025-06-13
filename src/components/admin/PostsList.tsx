
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Pin, Heart, MessageCircle } from 'lucide-react';

interface PostsListProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (postId: string) => void;
  onTogglePin: (postId: string) => void;
}

export const PostsList = ({ posts, onEdit, onDelete, onTogglePin }: PostsListProps) => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">All Posts</h2>
        <div className="text-sm text-gray-500">
          {posts.length} total posts
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200">
            {post.image && (
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.isPinned && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                      <Pin className="w-3 h-3" />
                      <span>PINNED</span>
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
                {!post.image && post.isPinned && (
                  <Pin className="w-4 h-4 text-red-600 fill-current" />
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {language === 'en' ? post.title : post.titleNp}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {language === 'en' ? post.excerpt : post.excerptNp}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="space-y-1">
                  <div className="font-medium">{post.author}</div>
                  <div>{new Date(post.publishedAt).toLocaleDateString()}</div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Button
                  onClick={() => onTogglePin(post.id)}
                  variant="ghost"
                  size="sm"
                  className={`${post.isPinned ? 'text-red-600 bg-red-50' : 'text-gray-500'} hover:bg-red-50 hover:text-red-600`}
                >
                  <Pin className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  <Button
                    onClick={() => onEdit(post)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => onDelete(post.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No posts found</div>
          <div className="text-gray-500 text-sm">Create your first post to get started</div>
        </div>
      )}
    </div>
  );
};
