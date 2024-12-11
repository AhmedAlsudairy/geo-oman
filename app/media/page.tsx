'use client'
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { geologicalVideos } from "@/lib/youtubeData";
import YouTubePlayer from "@/components/YouTubePlayer";
import GeologyVideoGallery from "@/components/GeologyVideoGallery";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Media() {
  // Get the mountains video for the featured section
  const featuredVideo = geologicalVideos.find(v => v.category === 'mountains');
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">الوسائط المتعددة</h1>
        <p className="text-xl text-gray-700 mb-8">استكشف مجموعتنا الغنية من الصور والفيديوهات الجيولوجية</p>
      </motion.div>

      {/* Featured Video */}
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">الفيديو المميز</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {featuredVideo && (
            <YouTubePlayer
              video={featuredVideo}
              width={1000}
              height={562}
              isArabic={true}
              className="rounded-lg"
            />
          )}
        </div>
      </motion.div>

      {/* Photo Gallery */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">معرض الصور</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
          >
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" topic="mountains" category="geology" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" topic="wadis" category="geology" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" topic="caves" category="geology" />
          </motion.div>
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
          >
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" topic="rocks" category="geology" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" topic="minerals" category="geology" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" topic="desert" category="geology" />
          </motion.div>
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
          >
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" topic="ophiolite" category="geology" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" topic="fossils" category="geology" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" topic="landscape" category="geology" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Video Series */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">سلسلة الفيديوهات التعليمية</h2>
        <GeologyVideoGallery isArabic={true} className="bg-white p-6 rounded-lg shadow-md" />
      </motion.div>

      {/* Download Section */}
      <motion.div 
        className="bg-emerald-50 p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">تحميل المواد التعليمية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">دليل الجيولوجيا العماني</h3>
            <p className="text-gray-700 mb-4">دليل شامل عن الجيولوجيا في عمان مع خرائط وصور توضيحية</p>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              تحميل PDF
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">مجموعة الخرائط الجيولوجية</h3>
            <p className="text-gray-700 mb-4">خرائط تفصيلية للتكوينات الجيولوجية في عمان</p>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              تحميل الخرائط
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
