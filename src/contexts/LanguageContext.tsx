
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'np';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    siteTitle: 'Nepali Star Buzz',
    home: 'Home',
    celebrities: 'Celebrities',
    entertainment: 'Entertainment',
    trending: 'Trending',
    sports: 'Sports',
    searchPlaceholder: 'Search news...',
    pinned: 'PINNED',
    breaking: 'BREAKING',
    latestNews: 'Latest News',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Admin Dashboard',
    createPost: 'Create New Post',
    editPost: 'Edit Post',
    deletePost: 'Delete Post',
    published: 'Published',
    draft: 'Draft',
    category: 'Category',
    author: 'Author',
    publishedAt: 'Published At'
  },
  np: {
    siteTitle: 'नेपाली स्टार बज',
    home: 'होम',
    celebrities: 'सेलिब्रिटी',
    entertainment: 'मनोरञ्जन',
    trending: 'ट्रेन्डिङ',
    sports: 'खेलकुद',
    searchPlaceholder: 'समाचार खोज्नुहोस्...',
    pinned: 'पिन गरिएको',
    breaking: 'ब्रेकिङ',
    latestNews: 'ताजा समाचार',
    login: 'लगिन',
    logout: 'लगआउट',
    dashboard: 'एडमिन ड्यासबोर्ड',
    createPost: 'नयाँ पोस्ट सिर्जना गर्नुहोस्',
    editPost: 'पोस्ट सम्पादन गर्नुहोस्',
    deletePost: 'पोस्ट मेटाउनुहोस्',
    published: 'प्रकाशित',
    draft: 'ड्राफ्ट',
    category: 'श्रेणी',
    author: 'लेखक',
    publishedAt: 'प्रकाशित मिति'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'np' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
