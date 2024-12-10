'use client'
import MediaPlaceholder from "@/components/MediaPlaceholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain, History, Gem, Map, BookOpen, Newspaper, ChevronRight, Microscope, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="space-y-12 py-8">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center relative h-[85vh] overflow-hidden rounded-3xl group"
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-blue-900/30 z-10" />
        
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1451186242394-2b461812025b?w=1200&auto=format&fit=crop&q=80"
            alt="Oman Geology Landscape"
            fill
            className="object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[2s]"
            priority
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <div className="max-w-4xl px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative mb-8"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -top-6 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent w-full"
                />
                <h1 className="text-7xl font-bold mb-4 text-white drop-shadow-2xl [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]">
                  مرحباً بكم في موقع جيولوجيا عُمان
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-6 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent w-full"
                />
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl text-white/90 drop-shadow-lg mb-12 font-light [text-shadow:_1px_1px_8px_rgb(0_0_0_/_30%)]"
              >
                اكتشف الثروات الجيولوجية الرائعة لسلطنة عُمان
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 font-medium flex items-center gap-2 hover:gap-3"
                >
                  <span>اكتشف المزيد</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
                >
                  تواصل معنا
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          >
            <span className="text-white/80 text-sm">اكتشف المزيد</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <ArrowDown className="w-6 h-6 text-white/80" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-800">
              <Mountain className="h-6 w-6 text-blue-600" />
              تنوع جيولوجي فريد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg" />
            <p className="mt-4 leading-relaxed">تتميز عُمان بتنوع جيولوجي استثنائي، من الجبال الشاهقة إلى الصحاري الشاسعة والسواحل الخلابة.</p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-800">
              <History className="h-6 w-6 text-blue-600" />
              تاريخ جيولوجي غني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg" />
            <p className="mt-4 leading-relaxed">يمتد التاريخ الجيولوجي لعُمان لملايين السنين، مما يوفر نافذة فريدة على تطور الأرض.</p>
          </CardContent>
        </Card>
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-800">
              <Gem className="h-6 w-6 text-blue-600" />
              كنوز معدنية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg" />
            <p className="mt-4 leading-relaxed">تحتوي أراضي عُمان على العديد من المعادن القيمة، بما في ذلك النحاس والذهب والكروم.</p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-3">
          <Map className="h-8 w-8 text-blue-600" />
          استكشف معنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <Map className="h-6 w-6 text-blue-600" />
              رحلات ميدانية
            </h3>
            <MediaPlaceholder type="image" width={400} height={250} className="rounded-xl" />
            <p className="mt-4 text-blue-700 leading-relaxed">انضم إلينا في رحلات استكشافية لمواقع جيولوجية مذهلة في جميع أنحاء عُمان.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              ورش عمل تعليمية
            </h3>
            <MediaPlaceholder type="image" width={400} height={250} className="rounded-xl" />
            <p className="mt-4 text-blue-700 leading-relaxed">شارك في ورش عملنا التفاعلية لتعلم المزيد عن علم الجيولوجيا وأهميته.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-3">
          <Newspaper className="h-8 w-8 text-blue-600" />
          آخر الأخبار والاكتشافات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <Gem className="h-6 w-6 text-blue-600" />
                اكتشاف معدن نادر في جبال الحجر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MediaPlaceholder type="image" width={400} height={250} className="rounded-xl" />
              <p className="mt-4 leading-relaxed">تم مؤخرًا اكتشاف معدن نادر في سلسلة جبال الحجر، مما يفتح آفاقًا جديدة للبحث العلمي.</p>
              <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                اقرأ المزيد
                <ChevronRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-800">
                <Microscope className="h-6 w-6 text-blue-600" />
                دراسة جديدة حول تشكل الكهوف العمانية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MediaPlaceholder type="image" width={400} height={250} className="rounded-xl" />
              <p className="mt-4 leading-relaxed">كشفت دراسة حديثة عن آليات فريدة لتشكل الكهوف في عُمان، مما يسلط الضوء على تاريخها الجيولوجي.</p>
              <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                اقرأ المزيد
                <ChevronRight className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
