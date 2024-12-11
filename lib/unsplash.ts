import { createApi } from 'unsplash-js';

// Initialize the Unsplash API client
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
}

export async function searchImages(query: string, page: number = 1, perPage: number = 10): Promise<UnsplashImage[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
    });

    if (result.errors) {
      console.error('Error fetching images:', result.errors);
      return [];
    }

    return result.response?.results.map(photo => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        small: photo.urls.small,
      },
      alt_description: photo.alt_description || '',
      description: photo.description || '',
    })) || [];
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
}
