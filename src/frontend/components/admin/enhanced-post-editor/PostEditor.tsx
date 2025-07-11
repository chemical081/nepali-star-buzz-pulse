
// Enhanced post editor with multiple image support and content blocks
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostContent, PostImage, Post } from '@/types/post';
import { ImageManager } from './ImageManager';
import { ContentBlockEditor } from './ContentBlockEditor';
import { Plus, Save, X, Languages } from 'lucide-react';

interface PostEditorProps {
  post?: Post;
  onSave: (postData: Post) => void;
  onCancel: () => void;
}

export const PostEditor = ({ post, onSave, onCancel }: PostEditorProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    titleNp: post?.titleNp || '',
    excerpt: post?.excerpt || '',
    excerptNp: post?.excerptNp || '',
    category: post?.category || 'Celebrity',
    author: post?.author || 'Admin',
    isPinned: post?.isPinned || false,
    status: post?.status || 'draft' as Post['status']
  });

  const [images, setImages] = useState<PostImage[]>(post?.images || []);
  const [contentBlocks, setContentBlocks] = useState<PostContent[]>(
    post?.content || [{ id: '1', type: 'text', content: '', order: 0 }]
  );
  const [contentBlocksNp, setContentBlocksNp] = useState<PostContent[]>(
    post?.contentNp || [{ id: '1', type: 'text', content: '', order: 0 }]
  );

  const categories = [
    'Celebrity', 'Entertainment', 'Trending', 'Sports', 'Bollywood',
    'Hollywood', 'Music', 'Fashion', 'Awards', 'Movies', 'TV Shows',
    'Celebrity Life', 'Breaking News', 'Latest News'
  ];

  // Mock translation function (replace with actual API call)
  const translateText = async (text: string, fromLang: string, toLang: string): Promise<string> => {
    // This is a mock - replace with actual translation service
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `[Translated from ${fromLang} to ${toLang}] ${text}`;
  };

  const handleTranslateTitle = async (direction: 'np-to-en' | 'en-to-np') => {
    if (direction === 'np-to-en' && formData.titleNp) {
      const translated = await translateText(formData.titleNp, 'Nepali', 'English');
      setFormData(prev => ({ ...prev, title: translated }));
    } else if (direction === 'en-to-np' && formData.title) {
      const translated = await translateText(formData.title, 'English', 'Nepali');
      setFormData(prev => ({ ...prev, titleNp: translated }));
    }
  };

  const handleTranslateExcerpt = async (direction: 'np-to-en' | 'en-to-np') => {
    if (direction === 'np-to-en' && formData.excerptNp) {
      const translated = await translateText(formData.excerptNp, 'Nepali', 'English');
      setFormData(prev => ({ ...prev, excerpt: translated }));
    } else if (direction === 'en-to-np' && formData.excerpt) {
      const translated = await translateText(formData.excerpt, 'English', 'Nepali');
      setFormData(prev => ({ ...prev, excerptNp: translated }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: Post = {
      id: post?.id || Date.now().toString(),
      ...formData,
      content: contentBlocks,
      contentNp: contentBlocksNp,
      images,
      likes: post?.likes || 0,
      comments: post?.comments || 0,
      publishedAt: post?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(postData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{post ? 'Edit Post' : 'Create New Post'}</span>
            <div className="flex items-center space-x-2">
              <Button onClick={onCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Content (Nepali - Primary)</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="titleNp">Title (Nepali)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleTranslateTitle('np-to-en')}
                      className="text-xs"
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Translate to English
                    </Button>
                  </div>
                  <Input
                    id="titleNp"
                    value={formData.titleNp}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleNp: e.target.value }))}
                    placeholder="नेपालीमा शीर्षक लेख्नुहोस्..."
                    required
                    className="font-nepali"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="excerptNp">Excerpt (Nepali)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleTranslateExcerpt('np-to-en')}
                      className="text-xs"
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Translate to English
                    </Button>
                  </div>
                  <Textarea
                    id="excerptNp"
                    value={formData.excerptNp}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerptNp: e.target.value }))}
                    rows={3}
                    placeholder="नेपालीमा संक्षिप्त विवरण लेख्नुहोस्..."
                    required
                    className="font-nepali"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Content (English - Secondary)</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="title">Title (English)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleTranslateTitle('en-to-np')}
                      className="text-xs"
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Translate to Nepali
                    </Button>
                  </div>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Write title in English..."
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="excerpt">Excerpt (English)</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleTranslateExcerpt('en-to-np')}
                      className="text-xs"
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Translate to Nepali
                    </Button>
                  </div>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    placeholder="Write excerpt in English..."
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                
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
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Post['status']) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="isPinned">Pin this post (Breaking News)</Label>
                </div>
              </div>
            </div>

            {/* Image Management */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
              <ImageManager images={images} onImagesChange={setImages} />
            </div>

            {/* Content Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content (English)</h3>
                <ContentBlockEditor
                  blocks={contentBlocks}
                  onBlocksChange={setContentBlocks}
                  images={images}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content (Nepali)</h3>
                <ContentBlockEditor
                  blocks={contentBlocksNp}
                  onBlocksChange={setContentBlocksNp}
                  images={images}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" onClick={onCancel} variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                <Save className="w-4 h-4 mr-2" />
                {post ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
