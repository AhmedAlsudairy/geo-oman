"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import MediaPlaceholder from "@/components/MediaPlaceholder";

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

export default function Experience() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">تجربتي في جيو عُمان</h1>
        <p className="text-xl text-gray-700 mb-8">شارك تجربتك وانطباعاتك عن رحلاتك الجيولوجية في عُمان</p>
        <MediaPlaceholder type="image" width={1200} height={500} className="rounded-xl shadow-lg" />
      </motion.div>

      {/* Share Experience Form */}
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">شارك تجربتك</h2>
        <form className="space-y-6">
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 font-semibold mb-2">عنوان التجربة</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="أدخل عنواناً لتجربتك"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 font-semibold mb-2">المواقع التي زرتها</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="مثال: جبل شمس، وادي شاب"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 font-semibold mb-2">تفاصيل التجربة</label>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
              placeholder="شارك تفاصيل رحلتك وانطباعاتك"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-gray-700 font-semibold mb-2">أضف صوراً</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
            </div>
            <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200">
              إضافة المزيد من الصور
            </button>
          </motion.div>
          <motion.button 
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            نشر التجربة
          </motion.button>
        </form>
      </motion.div>

      {/* Featured Experiences */}
      <motion.div 
        className="mb-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">تجارب مميزة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-bold">أ.م</span>
              </div>
              <div className="mr-4">
                <h3 className="font-semibold">أحمد محمد</h3>
                <p className="text-gray-600 text-sm">15 نوفمبر 2023</p>
              </div>
            </div>
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jebel_Shams.jpg/1280px-Jebel_Shams.jpg"
                alt="جبل شمس"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">رحلة استكشافية في جبل شمس</h3>
            <p className="text-gray-700 mb-4">تجربة رائعة في استكشاف التضاريس الجيولوجية لجبل شمس، أعلى قمة جبلية في عُمان، حيث المناظر الخلابة والتكوينات الصخرية المذهلة...</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              اقرأ المزيد
            </button>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-bold">س.ع</span>
              </div>
              <div className="mr-4">
                <h3 className="font-semibold">سارة علي</h3>
                <p className="text-gray-600 text-sm">10 نوفمبر 2023</p>
              </div>
            </div>
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src="https://wejhatt.com/wp-content/uploads/2023/03/6531C885-90E9-4A80-A5A3-EB23F56CFCD8.jpeg"
                alt="كهف الهوتة"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">اكتشاف كهف الهوتة</h3>
            <p className="text-gray-700 mb-4">رحلة مذهلة في أعماق كهف الهوتة، حيث اكتشفنا عجائب التكوينات الجيولوجية وجمال الطبيعة تحت الأرض...</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              اقرأ المزيد
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div 
        className="bg-emerald-50 p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">نصائح للمشاركة</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div variants={fadeInUp}>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">📸</span>
            </div>
            <h3 className="font-semibold mb-2">الصور</h3>
            <p className="text-gray-700">شارك صوراً واضحة وعالية الجودة</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">📝</span>
            </div>
            <h3 className="font-semibold mb-2">التفاصيل</h3>
            <p className="text-gray-700">اذكر تفاصيل دقيقة عن تجربتك</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">🗺️</span>
            </div>
            <h3 className="font-semibold mb-2">الموقع</h3>
            <p className="text-gray-700">حدد المواقع التي زرتها بدقة</p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
