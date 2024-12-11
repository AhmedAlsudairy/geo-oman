import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '../types/news';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronRight } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={news.url} target="_blank">
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={news.imageUrl}
            alt={news.titleAr}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardHeader className="relative z-10 -mt-20 space-y-1 text-white">
          <CardTitle className="text-lg font-tajawal">{news.titleAr}</CardTitle>
          <p className="text-sm opacity-90">{news.title}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 font-tajawal text-right leading-relaxed">
            {news.descriptionAr}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{news.source}</span>
            <span dir="rtl">{new Date(news.date).toLocaleDateString('ar-OM')}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-blue-600 group-hover:text-blue-800 transition-colors font-tajawal">
            <span>اقرأ المزيد</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
