
// Utility functions for transforming post data
import { Post, PostContent, PostImage } from '@/types/post';

// Transform legacy post data to new Post interface
export const transformLegacyPost = (legacyPost: any): Post => {
  // Create default content blocks from legacy content
  const content: PostContent[] = legacyPost.content ? [
    {
      id: `content-${legacyPost.id}`,
      type: 'text' as const,
      content: legacyPost.content,
      order: 0
    }
  ] : [];

  const contentNp: PostContent[] = legacyPost.contentNp ? [
    {
      id: `content-np-${legacyPost.id}`,
      type: 'text' as const,
      content: legacyPost.contentNp,
      order: 0
    }
  ] : [];

  // Create image array from legacy image field
  const images: PostImage[] = legacyPost.image ? [
    {
      id: `img-${legacyPost.id}`,
      url: legacyPost.image,
      alt: legacyPost.title,
      position: 'header' as const,
      order: 0
    }
  ] : [];

  return {
    id: legacyPost.id,
    title: legacyPost.title,
    titleNp: legacyPost.titleNp,
    excerpt: legacyPost.excerpt,
    excerptNp: legacyPost.excerptNp,
    content,
    contentNp,
    category: legacyPost.category,
    images,
    video: legacyPost.video,
    author: legacyPost.author,
    isPinned: legacyPost.isPinned,
    likes: legacyPost.likes,
    comments: legacyPost.comments,
    publishedAt: legacyPost.publishedAt,
    updatedAt: legacyPost.updatedAt || legacyPost.publishedAt,
    status: 'published' as const
  };
};

// Transform array of legacy posts
export const transformLegacyPosts = (legacyPosts: any[]): Post[] => {
  return legacyPosts.map(transformLegacyPost);
};
