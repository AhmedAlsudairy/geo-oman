'use client';

import { motion } from 'framer-motion';
import { Users, Camera, Code, Mountain, GraduationCap, Heart } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const teamMembers = [
    {
      role: 'علماء الجيولوجيا',
      icon: Mountain,
      description: 'خبراء في دراسة تضاريس وجيولوجيا عُمان'
    },
    {
      role: 'المصورون المحترفون',
      icon: Camera,
      description: 'يوثقون جمال الطبيعة العُمانية'
    },
    {
      role: 'الخبراء التقنيون',
      icon: Code,
      description: 'يطورون منصتنا الرقمية'
    },
    {
      role: 'الباحثون الأكاديميون',
      icon: GraduationCap,
      description: 'يقدمون أحدث الأبحاث والدراسات'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] overflow-hidden"
      >
        {/* Multiple gradient overlays for depth and brand colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-brown/25 via-transparent to-brand-brown/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/25 via-transparent to-brand-olive/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent z-10" />
        
        <Image
          src="https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8"
          alt="Oman Geological Formation"
          fill
          className="object-cover object-center"
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
              من نحن
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4 drop-shadow-lg"
            >
              نكتشف ونوثق جمال وتنوع التضاريس الجيولوجية في سلطنة عُمان
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-4">الفريق</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              يتألف فريقنا من مختصين في علوم الأرض، مصورين محترفين، وخبراء تقنيين يعملون معًا لجعل "جيو عُمان" منصة شاملة وملهمة لكل المهتمين.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <member.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{member.role}</h3>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/638a651ad5f9324e20972bf2/1670014559338-0PQ97WKETECR0ADZRIWW/Wadi+Tiwi+in+the+Al+Sharqiyah+region+is+named+after+the+nearby+Tiwi+Village.jpeg?format=2500w"
                alt="Wadi Tiwi Landscape"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-brand-brown/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <Image
                src="https://nawafir-tours.com/wp-content/uploads/2024/01/Wadi-Tiwi-01.jpg"
                alt="Wadi Tiwi Waters"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-brand-brown/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <Image
                src="https://salalahsafari.com/wp-content/uploads/2024/03/Untitled-design-2024-03-23T153111.682.jpg"
                alt="Wadi Tiwi Cliffs"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-brand-brown/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden group"
            >
              <Image
                src="https://salalahsafari.com/wp-content/uploads/2024/03/Untitled-design-2024-03-23T152104.964.jpg"
                alt="Wadi Tiwi Valley"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-brand-brown/20 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">مهمتنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              نسعى لتوثيق وتقديم الثروات الجيولوجية العُمانية بطريقة علمية وجذابة، مع الحفاظ على تراثنا الطبيعي للأجيال القادمة.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
