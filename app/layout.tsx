import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen bg-white">
        <Navigation />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
