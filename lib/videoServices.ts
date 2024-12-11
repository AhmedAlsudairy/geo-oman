export interface VideoResult {
  id: number;
  url: string;
  image: string;
  duration: number;
  title: string;
  width: number;
  height: number;
}

export async function searchPexelsVideos(query: string): Promise<VideoResult[]> {
  const PEXELS_API_KEY = 'RsxJ8JFZC0WGmvhDXpDtVCPbDHFKxNWxLsWFmXVpJbVLlxqvZSxdBVjz';
  
  try {
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error('Pexels Video API error');

    const data = await response.json();
    return data.videos.map((video: any) => {
      // Get the highest quality video file that's not too large
      const videoFile = video.video_files.reduce((prev: any, curr: any) => {
        if (curr.quality === 'hd' || curr.quality === 'sd') {
          if (!prev || curr.width > prev.width) return curr;
        }
        return prev;
      });

      return {
        id: video.id,
        url: videoFile.link,
        image: video.image,
        duration: video.duration,
        title: video.title || 'Oman Mountains Video',
        width: videoFile.width,
        height: videoFile.height
      };
    });
  } catch (error) {
    console.error('Pexels video error:', error);
    return [];
  }
}

export function getVideoSearchQuery(topic: string, isArabic: boolean = false): string {
  const keywords = {
    mountains: {
      en: ['mountains', 'peaks', 'cliffs', 'hiking', 'nature', 'landscape', 'aerial'],
      ar: ['جبال', 'قمم', 'منحدرات', 'مشي', 'طبيعة', 'مناظر طبيعية', 'تصوير جوي']
    },
    geology: {
      en: ['geological', 'rocks', 'formations', 'caves', 'canyons', 'valleys'],
      ar: ['جيولوجيا', 'صخور', 'تكوينات', 'كهوف', 'وديان', 'أخاديد']
    },
    oman: {
      en: ['Oman', 'Arabian', 'Middle East', 'desert mountains'],
      ar: ['عمان', 'عربي', 'الشرق الأوسط', 'جبال صحراوية']
    }
  };

  const lang = isArabic ? 'ar' : 'en';
  const allKeywords = [
    ...keywords.oman[lang],
    ...keywords.mountains[lang],
    ...keywords.geology[lang]
  ];

  // Combine some random keywords to create a varied search
  const selectedKeywords = allKeywords
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .join(' ');

  return `${topic} ${selectedKeywords}`;
}
