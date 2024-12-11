'use client'
import Image from "next/image";
import GeologyMap from "@/components/GeologyMap";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";

export default function Geology() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50/50 font-tajawal">
      {/* Hero Section */}
      <Section fullWidth className="relative h-[70vh] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image 
            src="https://peregrinetreks.com/wp-content/uploads/2024/09/Rocky-Mountain-Landscape-on-the-Road-to-Jebel-Shams-Oman.webp"
            alt="جبال الحجر - طريق جبل شمس" 
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold mb-6 tracking-wider drop-shadow-lg font-tajawal"
          >
            جيولوجيا عُمـان
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md font-tajawal"
          >
            اكتشف التكوينات الجيولوجية الفريدة والمتنوعة في سلطنة عُمان
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <div className="w-16 h-16 mx-auto border-2 border-white/30 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45 -translate-y-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Geological Features Grid */}
      <Section className="py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 font-tajawal">جبال الحجر</h2>
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-4">
              <Image 
                src="https://peregrinetreks.com/wp-content/uploads/2024/09/Rocky-Mountain-Landscape-on-the-Road-to-Jebel-Shams-Oman.webp"
                alt="جبال الحجر - طريق جبل شمس"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-600 leading-relaxed font-tajawal">
              سلسلة جبلية تمتد على طول الساحل الشمالي لعُمان، تشكلت قبل ملايين السنين نتيجة حركة الصفائح التكتونية.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-800 font-tajawal">أوفيولايت عُمان</h2>
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-4">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Section_of_Samail_Ophiolite.jpg/800px-Section_of_Samail_Ophiolite.jpg"
                alt="أوفيولايت عُمان"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-600 leading-relaxed font-tajawal">
              أكبر وأفضل كتلة أوفيولايتية محفوظة في العالم، تقدم نظرة فريدة لقاع المحيط القديم.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Interactive Map Section */}
      <Section 
        className="bg-white py-16"
        fullWidth
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center font-tajawal">
              خريطة المواقع الجيولوجية
            </h2>
            <p className="text-xl text-gray-600 text-center mb-8 font-tajawal">
              استكشف المواقع الجيولوجية الرئيسية في عُمان من خلال خريطتنا التفاعلية
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <GeologyMap />
          </motion.div>
        </div>
      </Section>

      {/* Geological Periods */}
      <Section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center font-tajawal">العصور الجيولوجية</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-700 font-tajawal">العصر الكريتاسي</h3>
            <p className="text-gray-600 font-tajawal">
              تشكلت خلاله معظم الصخور الأوفيولايتية في عُمان، منذ حوالي 95 مليون سنة.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-700 font-tajawal">العصر الجوراسي</h3>
            <p className="text-gray-600 font-tajawal">
              تكونت خلاله العديد من الطبقات الرسوبية في جبال الحجر.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-700 font-tajawal">العصر البرمي</h3>
            <p className="text-gray-600 font-tajawal">
              شهد تشكل بعض أقدم الصخور الرسوبية في عُمان.
            </p>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
