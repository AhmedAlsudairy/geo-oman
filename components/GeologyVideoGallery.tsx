'use client'
import { useState } from 'react';
import { geologicalVideos, YouTubeVideo } from '@/lib/youtubeData';
import YouTubePlayer from './YouTubePlayer';

interface GeologyVideoGalleryProps {
  isArabic?: boolean;
  className?: string;
}

const GeologyVideoGallery = ({ isArabic = false, className = '' }: GeologyVideoGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<YouTubeVideo['category'] | 'all'>('all');

  const categories = [
    { id: 'all', name: isArabic ? 'الكل' : 'All' },
    { id: 'mountains', name: isArabic ? 'الجبال' : 'Mountains' },
    { id: 'volcanic', name: isArabic ? 'البركانية' : 'Volcanic' },
    { id: 'minerals', name: isArabic ? 'المعادن' : 'Minerals' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? geologicalVideos 
    : geologicalVideos.filter(video => video.category === selectedCategory);

  return (
    <div className={className}>
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div key={video.id} className="flex flex-col">
            <YouTubePlayer
              video={video}
              width={400}
              height={225}
              isArabic={isArabic}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeologyVideoGallery;
