
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

  if (article.isPinned) {
    return (
      <div className="bg-white border-l-4 border-red-600 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden mb-4">
        <div className="flex">
          <div className="w-32 h-24 flex-shrink-0">
            {article.video ? (
              <video
                className="w-full h-full object-cover"
                poster={article.image}
                controls
              >
                <source src={article.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={article.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex-1 p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Pin className="w-4 h-4 text-red-600" />
              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                {t('pinned')}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                {article.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{article.author}</span>
                <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleLike}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-1 h-6 px-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{likesCount}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 h-6 px-2">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{article.comments}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="text-gray-500 h-6 px-2">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        <div className="w-24 h-18 flex-shrink-0">
          {article.video ? (
            <video
              className="w-full h-full object-cover"
              poster={article.image}
              controls
            >
              <source src={article.video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={article.image}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="flex-1 p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              {article.category}
            </span>
          </div>
          
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer">
            {title}
          </h3>
          
          <p className="text-gray-600 text-xs mb-2 line-clamp-1">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-xs">{article.author}</span>
              <time className="text-xs">{new Date(article.publishedAt).toLocaleDateString()}</time>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 h-5 px-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
                <span className="text-xs">{likesCount}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 h-5 px-1">
                <MessageCircle className="w-3 h-3" />
                <span className="text-xs">{article.comments}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="text-gray-500 h-5 px-1">
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
