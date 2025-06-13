import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { NewsCard } from '@/components/NewsCard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { mockNews } from '@/data/mockNews';
import { useLanguage } from '@/contexts/LanguageContext';

const NewsSection = ({ title, news, className = "" }: { title: string; news: any[]; className?: string }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 border-b-3 border-red-600 pb-1 pr-4">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gray-200 ml-4"></div>
      </div>
      <div className="space-y-3">
        {news.map((article, index) => (
          <NewsCard key={`${title.toLowerCase()}-${article.id}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
};

const IndexContent = () => {
  const [news, setNews] = useState(mockNews);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
        return;
      }
      loadMoreNews();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const loadMoreNews = () => {
    setLoading(true);
    setTimeout(() => {
      setNews(prev => [...prev, ...mockNews.slice(0, 3)]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  // Categorize news
  const pinnedNews = news.filter(article => article.isPinned);
  const celebrityNews = news.filter(article => article.category === 'Celebrity' && !article.isPinned).slice(0, 6);
  const entertainmentNews = news.filter(article => article.category === 'Entertainment' && !article.isPinned).slice(0, 6);
  const trendingNews = news.filter(article => article.category === 'Trending' && !article.isPinned).slice(0, 4);
  const sportsNews = news.filter(article => article.category === 'Sports' && !article.isPinned).slice(0, 4);
  const otherNews = news.filter(article => !['Celebrity', 'Entertainment', 'Trending', 'Sports'].includes(article.category) && !article.isPinned);

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Breaking/Pinned News */}
          {pinnedNews.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase">
                  {t('breaking')}
                </div>
                <div className="flex-1 h-px bg-red-200 ml-4"></div>
              </div>
              <div className="space-y-3">
                {pinnedNews.map((article, index) => (
                  <NewsCard key={`breaking-${article.id}-${index}`} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Celebrity News */}
          <NewsSection title={t('celebrities')} news={celebrityNews} />

          {/* Entertainment News */}
          <NewsSection title={t('entertainment')} news={entertainmentNews} />

          {/* Other News */}
          {otherNews.length > 0 && (
            <NewsSection title={t('latestNews')} news={otherNews} />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Trending Section */}
          {trendingNews.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t('trending')}
              </h3>
              <div className="space-y-3">
                {trendingNews.map((article, index) => (
                  <div key={`trending-${article.id}-${index}`} className="flex items-start space-x-3 group cursor-pointer">
                    <div className="w-16 h-12 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sports Section */}
          {sportsNews.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Sports
              </h3>
              <div className="space-y-3">
                {sportsNews.map((article, index) => (
                  <div key={`sports-${article.id}-${index}`} className="group cursor-pointer">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Bollywood', 'Hollywood', 'Music', 'Fashion', 'Awards', 'Movies', 'TV Shows', 'Celebrity Life'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
    </main>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <IndexContent />
      </div>
    </LanguageProvider>
  );
};

export default Index;
