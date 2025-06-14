
// Enhanced post type definitions with multiple images support
export interface PostImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  position: 'header' | 'content' | 'gallery';
  order: number;
}

export interface PostContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'quote' | 'heading';
  content: string;
  order: number;
  metadata?: {
    imageId?: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large' | 'full';
  };
}

export interface Post {
  id: string;
  title: string;
  titleNp: string;
  excerpt: string;
  excerptNp: string;
  content: PostContent[];
  contentNp: PostContent[];
  category: string;
  images: PostImage[];
  video?: string;
  author: string;
  isPinned: boolean;
  likes: number;
  comments: number;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}
