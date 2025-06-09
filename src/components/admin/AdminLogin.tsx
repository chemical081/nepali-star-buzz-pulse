
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const { t } = useLanguage();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('siteTitle')}
          </h1>
          <p className="text-gray-600 mt-2">{t('admin')} {t('login')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              required
              className="mt-1"
            />
          </div>
          
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            {t('login')}
          </Button>
        </form>
        
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Demo credentials:</p>
          <p>Username: admin</p>
          <p>Password: nepalistar2024</p>
        </div>
      </div>
    </div>
  );
};
