
import { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo placeholder - you can add your image here */}
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">NS</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('siteTitle')}
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm">
              {t('home')}
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm">
              {t('celebrities')}
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm">
              {t('entertainment')}
            </a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium text-sm">
              {t('trending')}
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>
            
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-red-200 hover:bg-red-50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'en' ? 'नेपाली' : 'English'}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
