
// Content block editor for rich post content
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { PostContent, PostImage } from '@/types/post';
import { Plus, Trash2, Move, Type, Image, Video, Quote, Heading } from 'lucide-react';

interface ContentBlockEditorProps {
  blocks: PostContent[];
  onBlocksChange: (blocks: PostContent[]) => void;
  images: PostImage[];
}

export const ContentBlockEditor = ({ blocks, onBlocksChange, images }: ContentBlockEditorProps) => {
  const addBlock = (type: PostContent['type']) => {
    const newBlock: PostContent = {
      id: Date.now().toString(),
      type,
      content: '',
      order: blocks.length,
      metadata: type === 'image' ? { alignment: 'center', size: 'medium' } : undefined
    };
    
    onBlocksChange([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, updates: Partial<PostContent>) => {
    onBlocksChange(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const removeBlock = (blockId: string) => {
    onBlocksChange(blocks.filter(block => block.id !== blockId));
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(block => block.id === blockId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    const newBlocks = [...blocks];
    [newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]];
    
    // Update order values
    newBlocks.forEach((block, index) => {
      block.order = index;
    });
    
    onBlocksChange(newBlocks);
  };

  const getBlockIcon = (type: PostContent['type']) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'quote': return <Quote className="w-4 h-4" />;
      case 'heading': return <Heading className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  const renderBlockEditor = (block: PostContent) => {
    switch (block.type) {
      case 'text':
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Enter your text content..."
            rows={4}
          />
        );
      
      case 'heading':
        return (
          <Input
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Enter heading text..."
            className="text-lg font-semibold"
          />
        );
      
      case 'quote':
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Enter quote text..."
            rows={3}
            className="italic border-l-4 border-red-300 pl-4"
          />
        );
      
      case 'image':
        return (
          <div className="space-y-3">
            <Select
              value={block.metadata?.imageId || ''}
              onValueChange={(imageId) => updateBlock(block.id, { 
                metadata: { ...block.metadata, imageId } 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an image" />
              </SelectTrigger>
              <SelectContent>
                {images.map(image => (
                  <SelectItem key={image.id} value={image.id}>
                    {image.alt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={block.metadata?.alignment || 'center'}
                onValueChange={(alignment: 'left' | 'center' | 'right') => 
                  updateBlock(block.id, { 
                    metadata: { ...block.metadata, alignment } 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={block.metadata?.size || 'medium'}
                onValueChange={(size: 'small' | 'medium' | 'large' | 'full') => 
                  updateBlock(block.id, { 
                    metadata: { ...block.metadata, size } 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <Input
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Enter video URL..."
            type="url"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Block Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => addBlock('text')} variant="outline">
          <Type className="w-3 h-3 mr-1" />
          Text
        </Button>
        <Button size="sm" onClick={() => addBlock('heading')} variant="outline">
          <Heading className="w-3 h-3 mr-1" />
          Heading
        </Button>
        <Button size="sm" onClick={() => addBlock('image')} variant="outline">
          <Image className="w-3 h-3 mr-1" />
          Image
        </Button>
        <Button size="sm" onClick={() => addBlock('quote')} variant="outline">
          <Quote className="w-3 h-3 mr-1" />
          Quote
        </Button>
        <Button size="sm" onClick={() => addBlock('video')} variant="outline">
          <Video className="w-3 h-3 mr-1" />
          Video
        </Button>
      </div>

      {/* Content Blocks */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <Card key={block.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getBlockIcon(block.type)}
                  <span className="text-sm font-medium capitalize">{block.type}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <Move className="w-3 h-3 rotate-180" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={index === blocks.length - 1}
                    className="h-6 w-6 p-0"
                  >
                    <Move className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeBlock(block.id)}
                    className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {renderBlockEditor(block)}
            </CardContent>
          </Card>
        ))}
        
        {blocks.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-2">No content blocks yet</p>
            <p className="text-sm text-gray-500">Add content blocks above to build your post</p>
          </div>
        )}
      </div>
    </div>
  );
};
