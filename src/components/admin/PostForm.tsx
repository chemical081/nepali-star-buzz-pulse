
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Languages, Type, Sparkles } from 'lucide-react';

interface PostFormProps {
  post?: any;
  onSave: (postData: any) => void;
  onCancel: () => void;
}

export const PostForm = ({ post, onSave, onCancel }: PostFormProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    titleNp: post?.titleNp || '',
    excerpt: post?.excerpt || '',
    excerptNp: post?.excerptNp || '',
    content: post?.content || '',
    contentNp: post?.contentNp || '',
    category: post?.category || 'Celebrity',
    image: post?.image || '',
    video: post?.video || '',
    author: post?.author || 'Admin',
    isPinned: post?.isPinned || false,
    likes: post?.likes || 0,
    comments: post?.comments || 0,
    publishedAt: post?.publishedAt || new Date().toISOString()
  });

  const [englishFont, setEnglishFont] = useState('font-sans');
  const [isTranslating, setIsTranslating] = useState(false);

  const englishFonts = [
    { value: 'font-sans', label: 'Default Sans' },
    { value: 'font-serif', label: 'Serif' },
    { value: 'font-mono', label: 'Monospace' },
    { value: 'font-bold', label: 'Bold Sans' },
    { value: 'font-light', label: 'Light Sans' }
  ];

  const autoTranslate = async (fromNepali = true) => {
    setIsTranslating(true);
    try {
      // Mock translation - in real app, integrate with Google Translate API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (fromNepali) {
        // Translate Nepali to English
        const translatedTitle = formData.titleNp ? `[Auto] ${formData.titleNp}` : '';
        const translatedExcerpt = formData.excerptNp ? `[Auto] ${formData.excerptNp}` : '';
        const translatedContent = formData.contentNp ? `[Auto] ${formData.contentNp}` : '';
        
        setFormData(prev => ({
          ...prev,
          title: translatedTitle,
          excerpt: translatedExcerpt,
          content: translatedContent
        }));
      } else {
        // Translate English to Nepali
        const translatedTitle = formData.title ? `[स्वचालित] ${formData.title}` : '';
        const translatedExcerpt = formData.excerpt ? `[स्वचालित] ${formData.excerpt}` : '';
        const translatedContent = formData.content ? `[स्वचालित] ${formData.content}` : '';
        
        setFormData(prev => ({
          ...prev,
          titleNp: translatedTitle,
          excerptNp: translatedExcerpt,
          contentNp: translatedContent
        }));
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = [
    'Celebrity',
    'Entertainment', 
    'Trending',
    'Sports',
    'Bollywood',
    'Hollywood',
    'Music',
    'Fashion',
    'Awards',
    'Movies',
    'TV Shows',
    'Celebrity Life',
    'Breaking News',
    'Latest News'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Priority: Nepali Content First */}
        <Tabs defaultValue="nepali" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nepali" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              नेपाली सामग्री (मुख्य)
              <Badge variant="default" className="ml-2">प्राथमिकता</Badge>
            </TabsTrigger>
            <TabsTrigger value="english" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              English Content
              <Badge variant="secondary" className="ml-2">Optional</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nepali" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">नेपाली सामग्री (मुख्य भाषा)</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => autoTranslate(true)}
                  disabled={isTranslating}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {isTranslating ? 'अनुवाद गर्दै...' : 'अंग्रेजीमा अनुवाद गर्नुहोस्'}
                </Button>
              </div>
              
              <div>
                <Label htmlFor="titleNp">शीर्षक (नेपाली) *</Label>
                <Input
                  id="titleNp"
                  value={formData.titleNp}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleNp: e.target.value }))}
                  placeholder="यहाँ समाचारको शीर्षक लेख्नुहोस्..."
                  className="text-lg font-semibold"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="excerptNp">सारांश (नेपाली) *</Label>
                <Textarea
                  id="excerptNp"
                  value={formData.excerptNp}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerptNp: e.target.value }))}
                  rows={3}
                  placeholder="समाचारको छोटो सारांश यहाँ लेख्नुहोस्..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contentNp">पूरा सामग्री (नेपाली) *</Label>
                <Textarea
                  id="contentNp"
                  value={formData.contentNp}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentNp: e.target.value }))}
                  rows={8}
                  placeholder="पूरा लेखको सामग्री यहाँ लेख्नुहोस्..."
                  className="min-h-[200px]"
                  required
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="english" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">English Content (Optional)</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="englishFont" className="text-sm">Font:</Label>
                    <Select value={englishFont} onValueChange={setEnglishFont}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {englishFonts.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            <span className={font.value}>{font.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => autoTranslate(false)}
                    disabled={isTranslating}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isTranslating ? 'Translating...' : 'Translate to Nepali'}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title in English..."
                  className={`text-lg font-semibold ${englishFont}`}
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt (English)</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  placeholder="Brief summary of the article..."
                  className={englishFont}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Full Content (English)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  placeholder="Write the full article content here..."
                  className={`min-h-[200px] ${englishFont}`}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="video">Video URL (Optional)</Label>
            <Input
              id="video"
              type="url"
              value={formData.video}
              onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
              placeholder="https://example.com/video.mp4"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPinned"
            checked={formData.isPinned}
            onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
            className="rounded"
          />
          <Label htmlFor="isPinned">Pin this post (will appear in Breaking News section)</Label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};
