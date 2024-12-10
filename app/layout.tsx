import Navigation from '@/components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'جيولوجيا عُمان',
  description: 'اكتشف الثروات الجيولوجية الرائعة لسلطنة عُمان',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Navigation />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
