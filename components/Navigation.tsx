'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'الصفحة الرئيسية' },
    { href: '/about', label: 'من نحن' },
    { href: '/store', label: 'المتجر' },
    { href: '/geology', label: 'جيولوجيا عُمـان' },
    { href: '/landmarks', label: 'المعالم الجيولوجية' },
    { href: '/activities', label: 'الأنشطة التعليمية' },
    { href: '/media', label: 'الوسائط المتعددة' },
    { href: '/experience', label: 'تجربتي في جيو عُمان' },
    { href: '/contact', label: 'اتصل بنا' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-brand-brown/10"
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
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
              className="h-12 w-auto sm:h-16"
            />
            <span className="text-xl sm:text-3xl font-bold text-brand-brown">جيو عُمان</span>
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-brand-brown p-2 hover:bg-brand-brown/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <motion.ul 
            className="hidden lg:flex flex-wrap justify-center gap-2"
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
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <motion.ul 
                className="flex flex-col gap-2 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item) => (
                  <motion.li 
                    key={item.href}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-lg text-base transition-all duration-300 ${
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navigation
