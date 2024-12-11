export interface CommonImage {
  id: string | number;
  url: string;
  alt: string;
  source: 'pexels' | 'pixabay' | 'unsplash';
}

// Pexels API
async function searchPexels(query: string): Promise<CommonImage[]> {
  const PEXELS_API_KEY = 'RsxJ8JFZC0WGmvhDXpDtVCPbDHFKxNWxLsWFmXVpJbVLlxqvZSxdBVjz';
  
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=Oman ${query}&per_page=5`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error('Pexels API error');

    const data = await response.json();
    return data.photos.map((photo: any) => ({
      id: photo.id,
      url: photo.src.large2x,
      alt: photo.alt || 'Oman landscape from Pexels',
      source: 'pexels' as const
    }));
  } catch (error) {
    console.error('Pexels error:', error);
    return [];
  }
}

// Pixabay API
async function searchPixabay(query: string): Promise<CommonImage[]> {
  const PIXABAY_API_KEY = '41477903-c53e7b5aa7d8c34f1d0e9e21c';
  
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=Oman+${query}&image_type=photo&per_page=5`
    );

    if (!response.ok) throw new Error('Pixabay API error');

    const data = await response.json();
    return data.hits.map((photo: any) => ({
      id: photo.id,
      url: photo.largeImageURL,
      alt: photo.tags || 'Oman landscape from Pixabay',
      source: 'pixabay' as const
    }));
  } catch (error) {
    console.error('Pixabay error:', error);
    return [];
  }
}

// Unsplash API
async function searchUnsplash(query: string): Promise<CommonImage[]> {
  const UNSPLASH_ACCESS_KEY = 'vWYmb97qfOecztAnqxtPLyfg31HkEkzdoWdNVmockeo';
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=Oman ${query}&per_page=5`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error('Unsplash API error');

    const data = await response.json();
    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      alt: photo.alt_description || 'Oman landscape from Unsplash',
      source: 'unsplash' as const
    }));
  } catch (error) {
    console.error('Unsplash error:', error);
    return [];
  }
}

export async function searchAllSources(query: string): Promise<CommonImage[]> {
  try {
    const [pexelsResults, pixabayResults, unsplashResults] = await Promise.all([
      searchPexels(query),
      searchPixabay(query),
      searchUnsplash(query)
    ]);

    // Combine and shuffle results
    const allResults = [...pexelsResults, ...pixabayResults, ...unsplashResults];
    return allResults.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error searching all sources:', error);
    return [];
  }
}
