
import { createContext, useContext, useState, ReactNode } from 'react';

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
    searchPlaceholder: 'Search news...',
    pinned: 'Pinned',
    readMore: 'Read More',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    createPost: 'Create Post',
    editPost: 'Edit Post',
    deletePost: 'Delete Post',
    pinPost: 'Pin Post',
    unpinPost: 'Unpin Post',
    title: 'Title',
    content: 'Content',
    category: 'Category',
    image: 'Image',
    video: 'Video',
    save: 'Save',
    cancel: 'Cancel',
    publish: 'Publish',
    draft: 'Draft'
  },
  np: {
    siteTitle: 'नेपाली स्टार बज',
    home: 'होम',
    celebrities: 'सेलिब्रिटी',
    entertainment: 'मनोरञ्जन',
    trending: 'ट्रेन्डिङ',
    searchPlaceholder: 'समाचार खोज्नुहोस्...',
    pinned: 'पिन गरिएको',
    readMore: 'थप पढ्नुहोस्',
    admin: 'एडमिन',
    login: 'लगइन',
    logout: 'लगआउट',
    createPost: 'पोस्ट सिर्जना गर्नुहोस्',
    editPost: 'पोस्ट सम्पादन गर्नुहोस्',
    deletePost: 'पोस्ट मेटाउनुहोस्',
    pinPost: 'पोस्ट पिन गर्नुहोस्',
    unpinPost: 'पोस्ट अनपिन गर्नुहोस्',
    title: 'शीर्षक',
    content: 'सामग्री',
    category: 'श्रेणी',
    image: 'तस्बिर',
    video: 'भिडियो',
    save: 'सेभ गर्नुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    publish: 'प्रकाशित गर्नुहोस्',
    draft: 'ड्राफ्ट'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
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
