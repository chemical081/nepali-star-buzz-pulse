// Deployment configuration
export const deployConfig = {
  // Base URL for production
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com' 
    : 'http://localhost:5173',
    
  // API endpoints (when you add backend)
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://api.your-domain.com'
    : 'http://localhost:3000',
    
  // Admin route (keep it secret in production)
  adminRoute: '/secret-admin-dashboard-2024',
  
  // Feature flags
  features: {
    analytics: false, // Disabled as requested
    stories: true,
    search: true,
    contactForm: true,
    newsletter: true
  },
  
  // Social media links (update with real URLs)
  socialMedia: {
    facebook: 'https://facebook.com/yournewssite',
    twitter: 'https://twitter.com/yournewssite',
    instagram: 'https://instagram.com/yournewssite',
    youtube: 'https://youtube.com/yournewssite'
  }
};
