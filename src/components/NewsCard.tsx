
import { useState } from 'react';
import { Heart, Share2, MessageCircle, Pin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface NewsArticle {
  id: string;
  title: string;
  titleNp: string;
  excerpt: string;
  excerptNp: string;
  image: string;
  video?: string;
  author: string;
  publishedAt: string;
  category: string;
  isPinned: boolean;
  likes: number;
  comments: number;
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const { language, t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const title = language === 'en' ? article.title : article.titleNp;
  const excerpt = language === 'en' ? article.excerpt : article.excerptNp;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {article.isPinned && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 flex items-center space-x-2">
          <Pin className="w-4 h-4" />
          <span className="text-sm font-semibold">{t('pinned')}</span>
        </div>
      )}
      
      <div className="relative overflow-hidden">
        {article.video ? (
          <video
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            poster={article.image}
            controls
          >
            <source src={article.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={article.image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-2 left-2">
          <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="font-medium">{article.author}</span>
          <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLike}
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span>{article.comments}</span>
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
