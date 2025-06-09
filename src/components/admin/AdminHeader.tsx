
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Globe } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
  onNewPost: () => void;
}

export const AdminHeader = ({ onLogout, onNewPost }: AdminHeaderProps) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('siteTitle')} - {t('admin')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={onNewPost} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              <span>{t('createPost')}</span>
            </Button>
            
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
            </Button>
            
            <Button onClick={onLogout} variant="outline" className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
