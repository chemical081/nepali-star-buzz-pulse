
import { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('siteTitle')}
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              {t('home')}
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              {t('celebrities')}
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              {t('entertainment')}
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              {t('trending')}
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
