'use client'
import MediaPlaceholder from "@/components/MediaPlaceholder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { Mountain, History, Gem, Map, BookOpen, Newspaper, ChevronRight, Microscope, ArrowDown, Camera } from 'lucide-react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getLatestNews } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import { useRef } from 'react';

export default async function Home() {
  const { news } = await getLatestNews();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Section id="features" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Mountain}
            title="تنوع جيولوجي فريد"
            description="تتميز عُمان بتنوع جيولوجي استثنائي، من الجبال الشاهقة إلى الصحاري الشاسعة."
            topic="mountains oman"
          />
          <FeatureCard
            icon={History}
            title="تاريخ جيولوجي غني"
            description="يمتد التاريخ الجيولوجي لعُمان لملايين السنين، مما يوفر نافذة فريدة على تطور الأرض."
            topic="geology oman"
          />
          <FeatureCard
            icon={Gem}
            title="كنوز معدنية"
            description="تحتوي أراضي عُمان على العديد من المعادن القيمة، بما في ذلك النحاس والذهب والكروم."
            topic="minerals oman"
          />
        </div>
      </Section>

      {/* Explore Section */}
      <Section 
        title="استكشف معنا"
        icon={Map}
        className="bg-gradient-to-br from-blue-50 to-purple-50 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExploreCard
            icon={Camera}
            title="رحلات ميدانية"
            description="انضم إلينا في رحلات استكشافية لمواقع جيولوجية مذهلة في جميع أنحاء عُمان."
            topic="landscape oman"
          />
          <ExploreCard
            icon={BookOpen}
            title="ورش عمل تعليمية"
            description="شارك في ورش عملنا التفاعلية لتعلم المزيد عن علم الجيولوجيا وأهميته."
            topic="education geology"
          />
        </div>
      </Section>

      {/* Latest News Section */}
      <Section 
        title="آخر الأخبار والاكتشافات"
        icon={Newspaper}
        className="py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </Section>
    </div>
  )
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleExploreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:contact@omangeology.com';
  };

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[85vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/30 via-transparent to-brand-brown/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/30 via-transparent to-brand-brown/30 z-10" />
      
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1451186242394-2b461812025b?w=1200&auto=format&fit=crop&q=80"
          alt="Oman Geology Landscape"
          fill
          className="object-cover"
          priority
        />
        <motion.div style={{ opacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="max-w-4xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]"
            >
              مرحباً بكم في موقع جيولوجيا عُمان
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl text-white/90 text-center drop-shadow-lg mb-6 font-tejwal"
            >
              اكتشف هندسة الارض مجانا
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl text-white/90 text-center drop-shadow-lg mb-12 font-light"
            >
              اكتشف الثروات الجيولوجية الرائعة لسلطنة عُمان
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-brown text-white px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center gap-2 hover:bg-brand-brown/90"
              >
                <span>اكتشف المزيد</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 font-medium"
              >
                تواصل معنا
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

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
            className="cursor-pointer"
            onClick={handleExploreClick}
          >
            <ArrowDown className="w-6 h-6 text-white/80" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function FeatureCard({ icon: Icon, title, description, topic }: { 
  icon: any, 
  title: string, 
  description: string,
  topic: string 
}) {
  const imageMap: { [key: string]: string } = {
    "تنوع جيولوجي فريد": "https://cdn4.premiumread.com/?url=https://omandaily.om/omandaily/uploads/images/2024/10/25/2812641.jpg&w=1000&q=72&f=jpg&t=1",
    "تاريخ جيولوجي غني": "https://alwatan.om/uploads/important_images/uploads/2020/09/0194.jpg",
    "كنوز معدنية": "https://ik.imagekit.io/d3nlekvyf/wisalfm/media/article/1759/thumbnail_image_16_9.jpg?format=auto&ar=16-9&fit=crop&tr=ar-16-9%2Cw-1000&v=030723083904"
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-800">
          <Icon className="h-6 w-6 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[250px] w-full">
          <Image
            src={imageMap[title] || ""}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="mt-4 leading-relaxed text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function ExploreCard({ icon: Icon, title, description, topic }: {
  icon: any,
  title: string,
  description: string,
  topic: string
}) {
  const imageMap: { [key: string]: string } = {
    "رحلات ميدانية": "https://shabiba.eu-central-1.linodeobjects.com/2019/01/29/997216.jpg",
    "ورش عمل تعليمية": "https://modo3.com/thumbs/fit630x300/98087/1570625829/%D8%A3%D9%81%D9%83%D8%A7%D8%B1_%D9%88%D8%B1%D8%B4%D8%A7%D8%AA_%D8%B9%D9%85%D9%84_%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9.jpg"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
        <Icon className="h-6 w-6 text-blue-600" />
        {title}
      </h3>
      <div className="relative h-[300px] w-full">
        <Image
          src={imageMap[title] || ""}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function NewsHighlight({ icon: Icon, title, description, topic }: {
  icon: any,
  title: string,
  description: string,
  topic: string
}) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
