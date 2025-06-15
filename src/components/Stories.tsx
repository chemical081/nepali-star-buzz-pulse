
// Stories component for homepage (similar to Instagram/Facebook stories)
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  duration?: number;
  isActive: boolean;
  views: number;
}

const mockStories: Story[] = [
  {
    id: '1',
    title: 'Breaking News',
    type: 'video',
    url: '/video1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=600&fit=crop',
    duration: 15,
    isActive: true,
    views: 1250
  },
  {
    id: '2',
    title: 'Celebrity Update',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=400&h=600&fit=crop',
    isActive: true,
    views: 850
  },
  {
    id: '3',
    title: 'Entertainment',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=400&h=600&fit=crop',
    isActive: true,
    views: 650
  },
  {
    id: '4',
    title: 'Sports News',
    type: 'video',
    url: '/video2.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
    duration: 20,
    isActive: true,
    views: 920
  }
];

export const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openStory = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    const nextIndex = (currentIndex + 1) % mockStories.length;
    setCurrentIndex(nextIndex);
    setSelectedStory(mockStories[nextIndex]);
  };

  const prevStory = () => {
    const prevIndex = currentIndex === 0 ? mockStories.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedStory(mockStories[prevIndex]);
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Stories
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {mockStories.map((story, index) => (
            <div
              key={story.id}
              className="cursor-pointer group"
              onClick={() => openStory(story, index)}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-red-500 p-1">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={story.thumbnail || story.url}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                {story.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-2 text-gray-600 truncate">
                {story.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-md w-full h-full max-h-screen">
            {/* Progress bars */}
            <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
              {mockStories.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-30'
                  }`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={closeStory}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Story content */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden">
                <img
                  src={selectedStory.url}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Story title overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{selectedStory.title}</h3>
                  <p className="text-sm opacity-80">{selectedStory.views.toLocaleString()} views</p>
                </div>
              </div>
            </div>

            {/* Navigation areas (tap left/right) */}
            <button
              onClick={prevStory}
              className="absolute left-0 top-0 w-1/3 h-full z-10 bg-transparent"
            />
            <button
              onClick={nextStory}
              className="absolute right-0 top-0 w-1/3 h-full z-10 bg-transparent"
            />
          </div>
        </div>
      )}
    </>
  );
};
