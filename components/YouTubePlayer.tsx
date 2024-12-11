'use client'
import { useState } from 'react';
import { YouTubeVideo } from '@/lib/youtubeData';

interface YouTubePlayerProps {
  video: YouTubeVideo;
  width?: number;
  height?: number;
  className?: string;
  isArabic?: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  video,
  width = 560,
  height = 315,
  className = '',
  isArabic = false
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ height: `${height}px` }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      )}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${video.id}`}
          title={isArabic ? video.arabicTitle : video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold mb-2">
          {isArabic ? video.arabicTitle : video.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {isArabic ? video.arabicDescription : video.description}
        </p>
      </div>
    </div>
  );
};

export default YouTubePlayer;
