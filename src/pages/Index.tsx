
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { NewsCard } from '@/components/NewsCard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { mockNews } from '@/data/mockNews';

const Index = () => {
  const [news, setNews] = useState(mockNews);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
    // Simulate API call
    setTimeout(() => {
      setNews(prev => [...prev, ...mockNews.slice(0, 3)]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const pinnedNews = news.filter(article => article.isPinned);
  const regularNews = news.filter(article => !article.isPinned);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          {/* Pinned Articles Section */}
          {pinnedNews.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-red-600 pb-2">
                Featured News
              </h2>
              <div className="space-y-4">
                {pinnedNews.map((article, index) => (
                  <NewsCard key={`pinned-${article.id}-${index}`} article={article} />
                ))}
              </div>
            </div>
          )}
          
          {/* Regular Articles Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularNews.map((article, index) => (
              <NewsCard key={`regular-${article.id}-${index}`} article={article} />
            ))}
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
