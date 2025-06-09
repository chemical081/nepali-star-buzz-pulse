
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Pin } from 'lucide-react';

interface PostsListProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (postId: string) => void;
  onTogglePin: (postId: string) => void;
}

export const PostsList = ({ posts, onEdit, onDelete, onTogglePin }: PostsListProps) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">All Posts</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? post.title : post.titleNp}
                  </h3>
                  {post.isPinned && (
                    <Pin className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-2">
                  {language === 'en' ? post.excerpt : post.excerptNp}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.category}</span>
                  <span>{post.author}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  onClick={() => onTogglePin(post.id)}
                  variant="outline"
                  size="sm"
                  className={post.isPinned ? 'bg-yellow-50 text-yellow-600' : ''}
                >
                  <Pin className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => onEdit(post)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => onDelete(post.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {post.image && (
              <div className="mt-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
