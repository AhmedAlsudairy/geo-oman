export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
}

export async function searchImages(query: string): Promise<PexelsImage[]> {
  const PEXELS_API_KEY = 'RsxJ8JFZC0WGmvhDXpDtVCPbDHFKxNWxLsWFmXVpJbVLlxqvZSxdBVjz'; // Free API key for demo
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=Oman ${query}&per_page=10`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.photos.map((photo: any) => ({
      id: photo.id,
      width: photo.width,
      height: photo.height,
      url: photo.url,
      src: {
        original: photo.src.original,
        large2x: photo.src.large2x,
        large: photo.src.large,
        medium: photo.src.medium,
        small: photo.src.small,
      },
      alt: photo.alt || 'Oman landscape',
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
