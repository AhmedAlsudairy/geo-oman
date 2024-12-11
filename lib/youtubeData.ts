export interface YouTubeVideo {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  arabicDescription: string;
  category: 'mountains' | 'volcanic' | 'minerals' | 'general';
  thumbnailUrl: string;
}

export const geologicalVideos: YouTubeVideo[] = [
  {
    id: '2XrcFn6Uruc',
    title: 'Mountains in Oman',
    arabicTitle: 'الجبال في عمان',
    description: 'Explore the magnificent mountain ranges of Oman and their geological significance.',
    arabicDescription: 'استكشف سلاسل الجبال الرائعة في عمان وأهميتها الجيولوجية.',
    category: 'mountains',
    thumbnailUrl: `https://img.youtube.com/vi/2XrcFn6Uruc/maxresdefault.jpg`
  },
  {
    id: 'Yvgj6MfS00w',
    title: 'Volcanic Rocks in Oman',
    arabicTitle: 'الصخور البركانية في عمان',
    description: 'Discover the volcanic rock formations and their history in Oman.',
    arabicDescription: 'اكتشف تشكيلات الصخور البركانية وتاريخها في عمان.',
    category: 'volcanic',
    thumbnailUrl: `https://img.youtube.com/vi/Yvgj6MfS00w/maxresdefault.jpg`
  },
  {
    id: 'nKaX1_q-_i0',
    title: 'Minerals in Oman',
    arabicTitle: 'المعادن في عمان',
    description: 'Learn about the rich mineral resources found in Oman.',
    arabicDescription: 'تعرف على الموارد المعدنية الغنية الموجودة في عمان.',
    category: 'minerals',
    thumbnailUrl: `https://img.youtube.com/vi/nKaX1_q-_i0/maxresdefault.jpg`
  }
];
