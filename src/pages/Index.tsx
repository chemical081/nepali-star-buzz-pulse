
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { NewsCard } from '@/components/NewsCard';
import { Stories } from '@/components/Stories';
import { ContactUs } from '@/components/ContactUs';
import { Horoscope } from '@/components/Horoscope';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((article, index) => (
          <NewsCard key={`${title.toLowerCase()}-${article.id}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
};

const IndexContent = () => {
  const [news, setNews] = useState(mockNews);
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredNews(news);
      return;
    }

    const filtered = news.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase()) ||
      (article.titleNp && article.titleNp.toLowerCase().includes(query.toLowerCase())) ||
      (article.excerptNp && article.excerptNp.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredNews(filtered);
  };

  useEffect(() => {
    setFilteredNews(news);
  }, [news]);

  // Use filtered news for display
  const displayNews = searchQuery ? filteredNews : news;

  // Categorize news
  const pinnedNews = displayNews.filter(article => article.isPinned);
  const celebrityNews = displayNews.filter(article => article.category === 'Celebrity' && !article.isPinned).slice(0, 6);
  const entertainmentNews = displayNews.filter(article => article.category === 'Entertainment' && !article.isPinned).slice(0, 6);
  const trendingNews = displayNews.filter(article => article.category === 'Trending' && !article.isPinned).slice(0, 4);
  const sportsNews = displayNews.filter(article => article.category === 'Sports' && !article.isPinned).slice(0, 4);
  const otherNews = displayNews.filter(article => !['Celebrity', 'Entertainment', 'Trending', 'Sports'].includes(article.category) && !article.isPinned);

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Stories Section */}
      <div id="stories">
        <Stories />
      </div>

      {/* Horoscope Section */}
      <div id="horoscope" className="mb-8">
        <Horoscope />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Search results for: <strong>"{searchQuery}"</strong> ({filteredNews.length} results)
          </p>
          {filteredNews.length === 0 && (
            <p className="text-blue-600 mt-2">No articles found matching your search.</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Breaking/Pinned News - Enhanced Display */}
          {pinnedNews.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase rounded-l-lg">
                  {t('breaking')}
                </div>
                <div className="flex-1 h-px bg-red-200 ml-4"></div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {pinnedNews.slice(0, 1).map((article, index) => (
                  <div key={`featured-${article.id}-${index}`} className="relative group cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="inline-block bg-red-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                          {article.category}
                        </span>
                        <h2 className="text-2xl font-bold mb-2 leading-tight">
                          {article.title}
                        </h2>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center mt-3 text-sm text-gray-300">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {pinnedNews.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedNews.slice(1).map((article, index) => (
                      <NewsCard key={`breaking-secondary-${article.id}-${index}`} article={article} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Celebrity News */}
          <div id="celebrities">
            <NewsSection title={t('celebrities')} news={celebrityNews} />
          </div>

          {/* Entertainment News */}
          <div id="entertainment">
            <NewsSection title={t('entertainment')} news={entertainmentNews} />
          </div>

          {/* Other News */}
          {otherNews.length > 0 && (
            <NewsSection title={t('latestNews')} news={otherNews} />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Trending Section */}
          {trendingNews.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t('trending')}
              </h3>
              <div className="space-y-4">
                {trendingNews.map((article, index) => (
                  <div key={`trending-${article.id}-${index}`} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sports Section */}
          {sportsNews.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {t('sports')}
              </h3>
              <div className="space-y-3">
                {sportsNews.map((article, index) => (
                  <div key={`sports-${article.id}-${index}`} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
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
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Bollywood', 'Hollywood', 'Music', 'Fashion', 'Awards', 'Movies', 'TV Shows', 'Celebrity Life'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-red-100 hover:text-red-700 cursor-pointer transition-colors border shadow-sm hover:shadow-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Us Section */}
          <ContactUs />
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
        <Header onSearch={(query) => {
          // This will be handled by IndexContent component
          const event = new CustomEvent('search', { detail: query });
          window.dispatchEvent(event);
        }} />
        <IndexContent />
      </div>
    </LanguageProvider>
  );
};

export default Index;
