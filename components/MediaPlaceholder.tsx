'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchAllSources, CommonImage } from '@/lib/imageServices';
import { searchPexelsVideos, VideoResult, getVideoSearchQuery } from '@/lib/videoServices';

interface MediaPlaceholderProps {
  type: 'image' | 'video';
  width: number;
  height: number;
  className?: string;
  topic?: string;
  category?: 'geology' | 'landscape' | 'culture' | 'nature';
  location?: string;
  isArabic?: boolean;
}

const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({ 
  type, 
  width, 
  height, 
  className, 
  topic = 'landscape',
  category = 'landscape',
  location,
  isArabic = false
}) => {
  const [image, setImage] = useState<CommonImage | null>(null);
  const [video, setVideo] = useState<VideoResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getGeologyKeywords = (topic: string) => {
    const geologyKeywords: Record<string, string> = {
      'ophiolite': 'Oman ophiolite mountains oceanic crust geological formation',
      'wadis': 'Oman wadi canyon limestone erosion geological',
      'caves': 'Oman cave system limestone formations stalactites',
      'mountains': 'Oman Hajar mountains geological formations rock',
      'desert': 'Oman desert geological formations sand dunes',
      'rocks': 'Oman rock formations geological structures minerals',
      'minerals': 'Oman mineral deposits geological resources crystals',
      'fossils': 'Oman fossil deposits ancient marine life geological',
      'default': 'Oman geological formations natural landscape'
    };

    for (const [key, value] of Object.entries(geologyKeywords)) {
      if (topic.toLowerCase().includes(key)) {
        return value;
      }
    }
    return geologyKeywords.default;
  };

  const getSearchQuery = (topic: string, category: string) => {
    const topicMap: Record<string, string> = {
      'geology': getGeologyKeywords(topic),
      'landscape': 'scenic mountains wadis desert natural formations',
      'culture': 'traditional heritage historical sites architecture',
      'nature': 'natural wonders wildlife ecosystem biodiversity'
    };

    const baseQuery = topicMap[category] || category;
    const locationQuery = location ? `${location} Oman` : 'Oman';
    return `${locationQuery} ${topic} ${baseQuery}`.trim();
  };

  useEffect(() => {
    if (type === 'image') {
      loadImage();
    } else if (type === 'video') {
      loadVideo();
    }
  }, [type, topic, category, location]);

  const loadImage = async () => {
    if (type !== 'image') return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchQuery = getSearchQuery(topic, category);
      const images = await searchAllSources(searchQuery);
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        setImage(images[randomIndex]);
      } else {
        setError(isArabic ? 'لم يتم العثور على صور لهذا الموضوع' : 'No images found for this topic');
      }
    } catch (err) {
      setError(isArabic ? 'فشل في تحميل الصورة' : 'Failed to load image');
    } finally {
      setLoading(false);
    }
  };

  const loadVideo = async () => {
    if (type !== 'video') return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchQuery = getVideoSearchQuery(topic, isArabic);
      const videos = await searchPexelsVideos(searchQuery);
      if (videos.length > 0) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        setVideo(videos[randomIndex]);
      } else {
        setError(isArabic ? 'لم يتم العثور على فيديو لهذا الموضوع' : 'No videos found for this topic');
      }
    } catch (err) {
      setError(isArabic ? 'فشل في تحميل الفيديو' : 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-blue-100 rounded-lg shadow-md ${className}`}
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-blue-100 rounded-lg shadow-md ${className}`}
        style={{ width, height }}
      >
        <div className="text-red-500 text-sm text-center p-4">{error}</div>
      </div>
    );
  }

  if (type === 'video' && video) {
    return (
      <div className={`relative group ${className}`} style={{ width, height }}>
        <video
          src={video.url}
          poster={video.image}
          controls
          className="w-full h-full rounded-lg object-cover"
          playsInline
        >
          <source src={video.url} type="video/mp4" />
          {isArabic ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support the video tag.'}
        </video>
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {isArabic ? 'من بيكسلز' : 'From Pexels'}
        </div>
      </div>
    );
  }

  if (type === 'image' && image) {
    return (
      <div className={`relative group ${className}`} style={{ width, height }}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {isArabic ? (
            image.source === 'pexels' ? 'بيكسلز' : image.source === 'pixabay' ? 'بيكسباي' : 'انسبلاش'
          ) : (
            `From ${image.source}`
          )}
        </div>
        <button 
          onClick={loadImage}
          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title={isArabic ? 'تحميل صورة جديدة' : 'Load new image'}
        >
          <RefreshIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return null;
};

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

export default MediaPlaceholder;
