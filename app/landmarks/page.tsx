'use client';

import GeologyMap from "@/components/GeologyMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Clock, Phone, Mail, AlertTriangle, Sun, Map, User } from 'lucide-react';
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

export default function Landmarks() {
  const visitingGuide = [
    {
      icon: Clock,
      title: 'أفضل وقت للزيارة',
      description: 'من أكتوبر إلى مارس'
    },
    {
      icon: User,
      title: 'المرشد السياحي',
      description: 'يُنصح بحجز مرشد سياحي للمواقع النائية'
    },
    {
      icon: AlertTriangle,
      title: 'احتياطات السلامة',
      description: 'احرص على حمل كمية كافية من المياه'
    },
    {
      icon: Sun,
      title: 'إرشادات عامة',
      description: 'التزم بإرشادات السلامة في كل موقع'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'مركز المعلومات السياحية',
      info: '800-77777'
    },
    {
      icon: Phone,
      title: 'خدمات الطوارئ',
      info: '9999'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      info: 'info@geo-oman.com'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[40vh] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0"
          alt="Oman Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">
            خريطة المعالم
          </h1>
        </div>
      </motion.div>

      {/* Map Section */}
      <Section className="py-12">
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">المواقع الجيولوجية</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            اكتشف أبرز المواقع الجيولوجية في عُمان من خلال خريطتنا التفاعلية
          </p>
        </motion.div>
        <GeologyMap />
      </Section>

      {/* Visiting Guide */}
      <Section className="py-12 bg-white">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">دليل الزيارة</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {visitingGuide.map((item, index) => (
            <motion.div 
              key={index} 
              className="hover:shadow-lg transition-shadow"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contact Information */}
      <Section className="py-12">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">معلومات الاتصال</h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {contactInfo.map((item, index) => (
            <motion.div 
              key={index} 
              className="hover:shadow-lg transition-shadow"
              variants={fadeInUp}
            >
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-semibold text-lg text-center">{item.info}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </main>
  );
}
