
// Stories management component for admin dashboard
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Play, Image, Video } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  duration?: number;
  isActive: boolean;
  createdAt: string;
  views: number;
}

export const StoriesManagement = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'Breaking News Update',
      type: 'video',
      url: '/video1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400',
      duration: 15,
      isActive: true,
      createdAt: new Date().toISOString(),
      views: 1250
    },
    {
      id: '2',
      title: 'Celebrity Spotlight',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=400',
      isActive: true,
      createdAt: new Date().toISOString(),
      views: 850
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    url: '',
    thumbnail: '',
    duration: 15
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStory: Story = {
      id: editingStory ? editingStory.id : Date.now().toString(),
      title: formData.title,
      type: formData.type,
      url: formData.url,
      thumbnail: formData.thumbnail,
      duration: formData.type === 'video' ? formData.duration : undefined,
      isActive: true,
      createdAt: editingStory ? editingStory.createdAt : new Date().toISOString(),
      views: editingStory ? editingStory.views : 0
    };

    if (editingStory) {
      setStories(prev => prev.map(story => 
        story.id === editingStory.id ? newStory : story
      ));
    } else {
      setStories(prev => [newStory, ...prev]);
    }

    // Reset form
    setFormData({
      title: '',
      type: 'image',
      url: '',
      thumbnail: '',
      duration: 15
    });
    setIsAddDialogOpen(false);
    setEditingStory(null);
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      type: story.type,
      url: story.url,
      thumbnail: story.thumbnail || '',
      duration: story.duration || 15
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
  };

  const toggleActive = (id: string) => {
    setStories(prev => prev.map(story => 
      story.id === id ? { ...story, isActive: !story.isActive } : story
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Stories Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingStory ? 'Edit Story' : 'Add New Story'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'image' | 'video' }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="url">Media URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/media.jpg"
                  required
                />
              </div>
              
              {formData.type === 'video' && (
                <>
                  <div>
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      min="1"
                      max="60"
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  {editingStory ? 'Update' : 'Create'} Story
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {story.type === 'video' ? (
                    <Video className="w-5 h-5 text-red-600" />
                  ) : (
                    <Image className="w-5 h-5 text-blue-600" />
                  )}
                  <span className="text-lg truncate">{story.title}</span>
                </div>
                <Badge variant={story.isActive ? "default" : "secondary"}>
                  {story.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={story.thumbnail || story.url}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{story.views.toLocaleString()} views</span>
                  {story.duration && <span>{story.duration}s</span>}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(story.id)}
                    className={story.isActive ? "text-red-600 hover:bg-red-50" : ""}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {story.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(story)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(story.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {stories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No stories yet</p>
            <p className="text-sm">Create your first story to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
