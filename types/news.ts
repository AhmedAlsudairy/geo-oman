export interface NewsItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
}

export interface NewsResponse {
  news: NewsItem[];
  error?: string;
}
