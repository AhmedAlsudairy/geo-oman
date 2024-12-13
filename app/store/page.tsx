'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Search, Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  arabicName: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = [
    { id: 'all', name: 'الكل', englishName: 'All' },
    { id: 'rocks', name: 'الصخور', englishName: 'Rocks' },
    { id: 'minerals', name: 'المعادن', englishName: 'Minerals' },
    { id: 'crystals', name: 'البلورات', englishName: 'Crystals' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.arabicName.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/25 via-transparent to-brand-brown/25 z-10" />
        <Image
          src="https://www.aspdkw.com/ksag/article_images/259(13).jpg"
          alt="Geology Store"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white text-center drop-shadow-2xl [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]"
            >
              متجر الجيولوجيا
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4 drop-shadow-lg"
            >
              اكتشف مجموعتنا الفريدة من العينات الجيولوجية العمانية
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-brown focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-brand-brown text-white'
                      : 'bg-white text-brand-brown hover:bg-brand-brown/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = `/store/product/${product.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300">
                      <Heart className="w-5 h-5 text-brand-brown" />
                    </button>
                    <Link href={`/store/product/${product.id}`} className="p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300">
                      <Eye className="w-5 h-5 text-brand-brown" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-brand-brown mb-2">{product.arabicName}</h3>
                  <p className="text-lg text-gray-600 mb-3">{product.name}</p>
                  <p className="text-base text-gray-600 mb-6">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-brown">{product.price} OMR</span>
                    <button className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all duration-300 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
