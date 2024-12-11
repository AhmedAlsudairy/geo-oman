'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface SectionProps {
  title?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  id?: string
}

export function Section({ title, icon: Icon, children, className, fullWidth, id }: SectionProps) {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative',
        fullWidth ? '' : 'container mx-auto px-4',
        className
      )}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-8">
          {Icon && <Icon className="h-8 w-8 text-blue-600" />}
          {title && (
            <h2 className="text-3xl font-bold text-blue-900">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </motion.section>
  )
}
