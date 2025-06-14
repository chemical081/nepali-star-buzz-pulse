
// Image management component for posts
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PostImage } from '@/types/post';
import { Plus, Upload, Trash2, Move, Image as ImageIcon } from 'lucide-react';

interface ImageManagerProps {
  images: PostImage[];
  onImagesChange: (images: PostImage[]) => void;
}

export const ImageManager = ({ images, onImagesChange }: ImageManagerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState({
    url: '',
    alt: '',
    caption: '',
    position: 'content' as PostImage['position']
  });

  const handleAddImage = () => {
    const image: PostImage = {
      id: Date.now().toString(),
      ...newImage,
      order: images.length
    };
    
    onImagesChange([...images, image]);
    setNewImage({ url: '', alt: '', caption: '', position: 'content' });
    setIsAddDialogOpen(false);
  };

  const handleRemoveImage = (imageId: string) => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  const handleMoveImage = (imageId: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === imageId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    
    const newImages = [...images];
    [newImages[currentIndex], newImages[newIndex]] = [newImages[newIndex], newImages[currentIndex]];
    
    // Update order values
    newImages.forEach((img, index) => {
      img.order = index;
    });
    
    onImagesChange(newImages);
  };

  const getPositionBadgeColor = (position: string) => {
    switch (position) {
      case 'header': return 'bg-blue-100 text-blue-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'gallery': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {images.length} image(s) added
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-1" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={newImage.url}
                  onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageAlt">Alt Text</Label>
                <Input
                  id="imageAlt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                  placeholder="Describe the image"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageCaption">Caption (Optional)</Label>
                <Input
                  id="imageCaption"
                  value={newImage.caption}
                  onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Image caption"
                />
              </div>
              
              <div>
                <Label htmlFor="imagePosition">Position</Label>
                <Select 
                  value={newImage.position} 
                  onValueChange={(value: PostImage['position']) => setNewImage(prev => ({ ...prev, position: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header Image</SelectItem>
                    <SelectItem value="content">Content Image</SelectItem>
                    <SelectItem value="gallery">Gallery Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAddDialogOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleAddImage} className="bg-red-600 hover:bg-red-700">
                  Add Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative h-32 bg-gray-100">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getPositionBadgeColor(image.position)}`}>
                    {image.position}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm line-clamp-1">{image.alt}</h4>
                  {image.caption && (
                    <p className="text-xs text-gray-600 line-clamp-2">{image.caption}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveImage(image.id, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <Move className="w-3 h-3 rotate-180" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMoveImage(image.id, 'down')}
                        disabled={index === images.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <Move className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveImage(image.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">No images added yet</p>
          <p className="text-sm text-gray-500">Add images to enhance your post content</p>
        </div>
      )}
    </div>
  );
};
