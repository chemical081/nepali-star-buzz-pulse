import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Link, Image, Video, Save, X, Languages,
  Type, Palette, Quote, Code, FileText, Upload, Globe
} from 'lucide-react';
import { Post } from '@/types/post';

interface EnhancedPostEditorProps {
  post?: Post;
  onSave: (postData: Post) => void;
  onCancel: () => void;
}

export const EnhancedPostEditor = ({ post, onSave, onCancel }: EnhancedPostEditorProps) => {
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

  const [content, setContent] = useState(post?.content?.[0]?.content || '');
  const [contentNp, setContentNp] = useState(post?.contentNp?.[0]?.content || '');
  const [images, setImages] = useState<string[]>(post?.images?.map(img => img.url) || []);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const contentNpRef = useRef<HTMLDivElement>(null);

  const categories = [
    'Celebrity', 'Entertainment', 'Trending', 'Sports', 'Bollywood',
    'Hollywood', 'Music', 'Fashion', 'Awards', 'Movies', 'TV Shows',
    'Celebrity Life', 'Breaking News', 'Latest News'
  ];

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setImages([...images, url]);
      formatText('insertImage', url);
    }
  };

  const autoTranslate = async () => {
    if (!content) return;
    
    setIsTranslating(true);
    try {
      // Mock translation - replace with actual translation service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simple mock translation
      const translated = content
        .replace(/hello/gi, 'नमस्ते')
        .replace(/good/gi, 'राम्रो')
        .replace(/news/gi, 'समाचार')
        .replace(/celebrity/gi, 'सेलिब्रिटी');
      
      setContentNp(translated);
      if (contentNpRef.current) {
        contentNpRef.current.innerHTML = translated;
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData: Post = {
      id: post?.id || Date.now().toString(),
      ...formData,
      content: [{
        id: 'content-1',
        type: 'text',
        content: content,
        order: 0
      }],
      contentNp: [{
        id: 'content-np-1',
        type: 'text',
        content: contentNp,
        order: 0
      }],
      images: images.map((url, index) => ({
        id: `img-${index}`,
        url,
        alt: formData.title,
        position: 'content' as const,
        order: index
      })),
      likes: post?.likes || 0,
      comments: post?.comments || 0,
      publishedAt: post?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(postData);
  };

  return (
    <div className="max-w-7xl mx-auto">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title (English)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="text-lg font-semibold"
                />
              </div>
              
              <div>
                <Label htmlFor="titleNp">Title (Nepali)</Label>
                <Input
                  id="titleNp"
                  value={formData.titleNp}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleNp: e.target.value }))}
                  className="text-lg font-semibold"
                  placeholder="Optional - will be auto-filled if left empty"
                />
              </div>
            </div>

            {/* Settings Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>

            {/* Rich Text Editor */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  English Content
                </TabsTrigger>
                <TabsTrigger value="contentNp" className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Nepali Content
                  <Badge variant="secondary" className="ml-2">Auto-translate</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                {/* Toolbar */}
                <div className="border rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('bold')}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('italic')}>
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('underline')}>
                    <Underline className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('justifyLeft')}>
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('justifyCenter')}>
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('justifyRight')}>
                    <AlignRight className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('insertUnorderedList')}>
                    <List className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => formatText('insertOrderedList')}>
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  
                  <Button type="button" variant="outline" size="sm" onClick={insertLink}>
                    <Link className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={insertImage}>
                    <Image className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  
                  <Select onValueChange={(value) => formatText('formatBlock', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Heading" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p">Paragraph</SelectItem>
                      <SelectItem value="h1">Heading 1</SelectItem>
                      <SelectItem value="h2">Heading 2</SelectItem>
                      <SelectItem value="h3">Heading 3</SelectItem>
                      <SelectItem value="blockquote">Quote</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={autoTranslate}
                    disabled={isTranslating}
                    className="ml-auto"
                  >
                    <Languages className="w-4 h-4 mr-1" />
                    {isTranslating ? 'Translating...' : 'Auto Translate'}
                  </Button>
                </div>
                
                {/* Content Editor */}
                <div
                  ref={contentRef}
                  contentEditable
                  className="min-h-96 p-4 border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ minHeight: '400px' }}
                  onInput={() => setContent(contentRef.current?.innerHTML || '')}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </TabsContent>
              
              <TabsContent value="contentNp" className="space-y-4">
                <div className="border rounded-t-lg p-2 bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nepali content (Optional - will be auto-translated)</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={autoTranslate}
                    disabled={isTranslating}
                  >
                    <Languages className="w-4 h-4 mr-1" />
                    {isTranslating ? 'Translating...' : 'Auto Translate from English'}
                  </Button>
                </div>
                
                <div
                  ref={contentNpRef}
                  contentEditable
                  className="min-h-96 p-4 border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ minHeight: '400px' }}
                  onInput={() => setContentNp(contentNpRef.current?.innerHTML || '')}
                  dangerouslySetInnerHTML={{ __html: contentNp }}
                />
              </TabsContent>
            </Tabs>

            {/* Additional Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
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
              
              <div className="flex space-x-2">
                <Button type="button" onClick={onCancel} variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  <Save className="w-4 h-4 mr-2" />
                  {post ? 'Update Post' : 'Publish Post'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};