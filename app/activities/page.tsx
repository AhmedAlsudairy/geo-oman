'use client'
import MediaPlaceholder from "@/components/MediaPlaceholder";
import { Compass, BookOpen, Video, GamepadIcon, Calendar, Mail, MapPin, Users, BookOpenCheck, ChevronRight } from 'lucide-react';
import Image from 'next/image';
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

export default function Activities() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-6">الأنشطة التعليمية</h1>
        <p className="text-xl text-gray-700 mb-8">اكتشف وتعلم من خلال أنشطتنا التفاعلية المتنوعة</p>
        <div className="relative h-[500px] w-full rounded-xl shadow-lg overflow-hidden">
          <Image
            src="https://ik.imagekit.io/d3nlekvyf/wisalfm/media/article/1759/thumbnail_image_16_9.jpg"
            alt="Educational Activities"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        </div>
      </motion.div>

      {/* Featured Activities */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8 mb-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
            <Compass className="h-6 w-6" />
            الرحلات الميدانية
          </h2>
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
            <Image
              src="https://alwatan.om/uploads/important_images/uploads/2020/09/0194.jpg"
              alt="Field Trips"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            رحلات استكشافية مع خبراء الجيولوجيا لاكتشاف المواقع الجيولوجية المميزة في عُمان.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <span>سجل الآن</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
            <Users className="h-6 w-6" />
            ورش العمل التفاعلية
          </h2>
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
            <Image
              src="https://cdn4.premiumread.com/?url=https://omandaily.om/omandaily/uploads/images/2024/10/25/2812641.jpg"
              alt="Interactive Workshops"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            ورش عمل تفاعلية لتعلم أساسيات الجيولوجيا وتحديد أنواع الصخور والمعادن.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <span>احجز مقعدك</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* Educational Resources */}
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          المصادر التعليمية
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative h-[200px] w-[200px] rounded-full mx-auto mb-4 overflow-hidden">
              <Image
                src="https://modo3.com/thumbs/fit630x300/98087/1570625829/أفكار_ورشات_عمل_تربوية.jpg"
                alt="Educational Books"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <BookOpenCheck className="h-5 w-5" />
              الكتب التعليمية
            </h3>
            <p className="text-gray-700">مجموعة من الكتب والمراجع العلمية</p>
          </div>
          <div className="text-center">
            <div className="relative h-[200px] w-[200px] rounded-full mx-auto mb-4 overflow-hidden">
              <Image
                src="https://alwatan.om/uploads/important_images/uploads/2020/09/0194.jpg"
                alt="Educational Videos"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <Video className="h-5 w-5" />
              الفيديوهات التعليمية
            </h3>
            <p className="text-gray-700">سلسلة فيديوهات تعليمية تفاعلية</p>
          </div>
          <div className="text-center">
            <div className="relative h-[200px] w-[200px] rounded-full mx-auto mb-4 overflow-hidden">
              <Image
                src="https://cdn4.premiumread.com/?url=https://omandaily.om/omandaily/uploads/images/2024/10/25/2812641.jpg"
                alt="Educational Games"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <GamepadIcon className="h-5 w-5" />
              الألعاب التعليمية
            </h3>
            <p className="text-gray-700">ألعاب تفاعلية لتعلم الجيولوجيا</p>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700 flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          الفعاليات القادمة
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <div className="bg-emerald-100 p-4 rounded-lg text-center min-w-[100px]">
              <div className="text-emerald-700 font-bold text-2xl">15</div>
              <div className="text-emerald-600">ديسمبر</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                معرض الصخور والمعادن
              </h3>
              <p className="text-gray-700">معرض تفاعلي يضم مجموعة نادرة من الصخور والمعادن العُمانية</p>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
              <span>التفاصيل</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <div className="bg-emerald-100 p-4 rounded-lg text-center min-w-[100px]">
              <div className="text-emerald-700 font-bold text-2xl">20</div>
              <div className="text-emerald-600">ديسمبر</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                ورشة تحديد الصخور
              </h3>
              <p className="text-gray-700">ورشة عملية لتعلم طرق تحديد وتصنيف الصخور المختلفة</p>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
              <span>التفاصيل</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div 
        className="bg-emerald-50 p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-emerald-700 flex items-center gap-2">
          <Mail className="h-6 w-6" />
          اشترك في نشرتنا البريدية
        </h2>
        <p className="text-gray-700 mb-6">احصل على آخر الأخبار والفعاليات مباشرة في بريدك الإلكتروني</p>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
            <span>اشترك</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
