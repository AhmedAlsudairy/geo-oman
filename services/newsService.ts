import { NewsItem, NewsResponse } from '../types/news';

export const getLatestNews = async (): Promise<NewsResponse> => {
  const news: NewsItem[] = [
    {
      id: '1',
      title: 'Rare Mineral Discovery in Al Hajar Mountains',
      titleAr: 'اكتشاف معدن نادر في جبال الحجر',
      description: 'Scientists from Sultan Qaboos University have discovered a rare mineral formation in the Al Hajar Mountains, opening new possibilities for geological research.',
      descriptionAr: 'اكتشف علماء من جامعة السلطان قابوس تشكيلاً معدنياً نادراً في جبال الحجر، مما يفتح آفاقاً جديدة للبحث الجيولوجي.',
      imageUrl: 'https://images.unsplash.com/photo-1512036666432-2181c1f26420?ixlib=rb-4.0.3',
      source: 'Sultan Qaboos University Research Portal',
      date: '2024-12-10',
      url: 'https://www.squ.edu.om'
    },
    {
      id: '2',
      title: 'New Study on Volcanic Rocks in Oman',
      titleAr: 'دراسة جديدة حول الصخور البركانية في عُمان',
      description: 'A recent study by the Ministry of Energy and Minerals reveals the history of volcanic activity in Oman and its impact on current terrain formation.',
      descriptionAr: 'كشفت دراسة حديثة لوزارة الطاقة والمعادن عن تاريخ النشاط البركاني في عُمان وتأثيره على تشكيل التضاريس الحالية.',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3',
      source: 'Ministry of Energy and Minerals',
      date: '2024-12-08',
      url: 'https://www.mem.gov.om'
    }
  ];

  return { news };
};
