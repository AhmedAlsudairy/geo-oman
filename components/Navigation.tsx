'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'الصفحة الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/geology', label: 'جيولوجيا عُمـان' },
    { href: '/landmarks', label: 'المعالم الجيولوجية' },
    { href: '/activities', label: 'الأنشطة التعليمية' },
    { href: '/media', label: 'الوسائط المتعددة' },
    { href: '/experience', label: 'تجربتي في جيو عُمان' },
    { href: '/contact', label: 'اتصل بنا' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-brand-brown/10"
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-brand-brown"
          >
            <Image 
              src="/images/logo.svg" 
              alt="Geo Oman Logo" 
              width={60} 
              height={60}
              className="h-16 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-brand-brown">جيو عُمان</span>
              <span className="text-sm text-brand-brown/80 font-tejwal">اكتشف هندسة الارض مجانا</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
       
          </motion.div>
        </div>
        <motion.ul 
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item) => (
            <motion.li key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={item.href} 
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  pathname === item.href 
                    ? 'bg-gradient-to-r from-brand-brown to-brand-brown/80 text-white shadow-md' 
                    : 'text-brand-brown hover:bg-brand-brown/10 hover:shadow-sm'
                }`}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.header>
  )
}

export default Navigation
