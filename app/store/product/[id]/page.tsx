'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  arabicName: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Ophiolite Rock',
    arabicName: 'صخر الأفيوليت',
    price: 25,
    image: 'https://www.aspdkw.com/ksag/article_images/259(13).jpg',
    category: 'rocks',
    description: 'نموذج نادر من صخور الأفيوليت العمانية، يعكس التاريخ الجيولوجي العميق لعمان'
  },
  {
    id: 2,
    name: 'Desert Rose Crystal',
    arabicName: 'بلورة وردة الصحراء',
    price: 35,
    image: 'https://alroya.om/thumb/w730/uploads//images/7dba38aa7dd7ee9b569e01e6eb98216d.jpg',
    category: 'crystals',
    description: 'بلورات جميلة تشكلت في الصحراء العمانية، تشبه الوردة في شكلها الفريد'
  },
  {
    id: 3,
    name: 'Marble Stone',
    arabicName: 'حجر الرخام',
    price: 45,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/MarbleUSGOV.jpg',
    category: 'rocks',
    description: 'رخام عماني عالي الجودة، يتميز بنقاوته وجماله الطبيعي'
  },
  {
    id: 4,
    name: 'Sandstone Formation',
    arabicName: 'تكوين الحجر الرملي',
    price: 28,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Millet-Seed_Sandstone_Macro.JPG/220px-Millet-Seed_Sandstone_Macro.JPG',
    category: 'rocks',
    description: 'عينة من الحجر الرملي العماني المميز، يظهر طبقات الترسبات القديمة'
  },
  {
    id: 5,
    name: 'Crystal Formation',
    arabicName: 'تكوين البلورات',
    price: 50,
    image: 'https://s3.eu-1.blufs.ir/aradbranding-ar-uploads/topics/16764479121305.jpg',
    category: 'crystals',
    description: 'تشكيلة بلورية نادرة من المعادن العمانية، تعكس جمال الطبيعة'
  }
];

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-brown mb-4">المنتج غير موجود</h1>
          <Link href="/store" className="text-brand-brown hover:underline">
            العودة إلى المتجر
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/store" 
          className="inline-flex items-center text-brand-brown hover:underline mb-8"
        >
          <ArrowRight className="ml-2" />
          العودة إلى المتجر
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h1 className="text-4xl font-bold text-brand-brown mb-2">
                {product.arabicName}
              </h1>
              <h2 className="text-2xl text-gray-600 mb-6">{product.name}</h2>
              
              <div className="bg-brand-brown/5 rounded-lg p-4 mb-6">
                <p className="text-lg text-gray-700">{product.description}</p>
              </div>

              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-bold text-brand-brown">
                  {product.price} OMR
                </span>
                <span className="px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-lg">
                  {product.category}
                </span>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-4 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  إضافة للسلة
                </button>
                <button className="px-6 py-4 bg-white border-2 border-brand-brown text-brand-brown rounded-lg hover:bg-brand-brown/10 transition-all duration-300">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
