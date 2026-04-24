import { useState } from 'react';
import Image from 'next/image';
import { searchAllSources, CommonImage } from '@/lib/imageServices';

interface ImagePlaceholderProps {
  topic: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImagePlaceholder({ topic, width = 400, height = 300, className = '' }: ImagePlaceholderProps) {
  const [image, setImage] = useState<CommonImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadImage = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const images = await searchAllSources(topic);
      if (images.length > 0) {
        setImage(images[0]);
      } else {
        setError('No images found for this topic');
      }
    } catch (err) {
      setError('Failed to load image');
    } finally {
      setLoading(false);
    }
  };

  if (image) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image
          src={image.url}
          alt={image.alt || topic}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors ${className}`}
      style={{ width, height }}
      onClick={loadImage}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      ) : error ? (
        <div className="text-red-500 text-sm text-center p-4">{error}</div>
      ) : (
        <div className="text-gray-500 text-sm text-center p-4">
          Click to load {topic} image
        </div>
      )}
    </div>
  );
}
