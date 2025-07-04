
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Title (English)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="titleNp">Title (Nepali)</Label>
            <Input
              id="titleNp"
              value={formData.titleNp}
              onChange={(e) => setFormData(prev => ({ ...prev, titleNp: e.target.value }))}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="excerpt">Excerpt (English)</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="excerptNp">Excerpt (Nepali)</Label>
            <Textarea
              id="excerptNp"
              value={formData.excerptNp}
              onChange={(e) => setFormData(prev => ({ ...prev, excerptNp: e.target.value }))}
              rows={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="content">Content (English)</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={5}
              placeholder="Write the full article content here..."
            />
          </div>
          
          <div>
            <Label htmlFor="contentNp">Content (Nepali)</Label>
            <Textarea
              id="contentNp"
              value={formData.contentNp}
              onChange={(e) => setFormData(prev => ({ ...prev, contentNp: e.target.value }))}
              rows={5}
              placeholder="पूरा लेखको सामग्री यहाँ लेख्नुहोस्..."
            />
          </div>
        </div>
        
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
