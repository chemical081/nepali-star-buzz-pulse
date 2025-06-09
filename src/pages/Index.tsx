
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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={`${article.id}-${index}`} article={article} />
            ))}
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default Index;
