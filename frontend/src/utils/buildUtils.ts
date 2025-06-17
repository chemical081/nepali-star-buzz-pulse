// Build utilities for production deployment
export const buildUtils = {
  // Remove console logs in production
  cleanLogs: () => {
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }
  },
  
  // Performance optimizations
  optimizeImages: (imageUrl: string) => {
    // Add image optimization logic here
    return imageUrl;
  },
  
  // SEO helpers
  generateMetaTags: (title: string, description: string, image?: string) => {
    return {
      title,
      description,
      'og:title': title,
      'og:description': description,
      'og:image': image || '/default-og-image.jpg',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image || '/default-og-image.jpg'
    };
  }
};

// Initialize production optimizations
buildUtils.cleanLogs();
