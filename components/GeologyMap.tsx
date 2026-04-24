'use client'
import dynamic from 'next/dynamic'
import type { Site } from './LeafletMapInner'

type LeafletMapProps = { sites: Site[]; center: [number, number]; zoom: number }

const LeafletMap = dynamic<LeafletMapProps>(() => import('./LeafletMapInner'), { ssr: false })

const geologicalSites: Site[] = [
  {
    id: 1,
    title: 'جبل شمس',
    description: 'أعلى قمة جبلية في عُمان بارتفاع 3009 م، يعرض تكوينات جيولوجية مذهلة من الصخور الجيرية والدولوميت التي تعود لملايين السنين.',
    category: 'جبال',
    color: '#f59e0b',
    emoji: '🏔️',
    imageUrl: 'https://peregrinetreks.com/wp-content/uploads/2024/09/Rocky-Mountain-Landscape-on-the-Road-to-Jebel-Shams-Oman.webp',
    position: { lat: 23.2367, lng: 57.2598 }
  },
  {
    id: 2,
    title: 'وادي شاب',
    description: 'وادي طبيعي خلاب يظهر التآكل المائي والتكوينات الصخرية الجيرية المتعاقبة عبر العصور الجيولوجية.',
    category: 'أودية',
    color: '#06b6d4',
    emoji: '🏞️',
    imageUrl: 'https://wejhatt.com/wp-content/uploads/2016/06/%D9%A4%D9%A4%D9%A1%D9%A1%D9%A1%D9%A1-620x330.jpg',
    position: { lat: 22.8368, lng: 59.2394 }
  },
  {
    id: 3,
    title: 'كهف الهوتة',
    description: 'نظام كهفي طبيعي فريد يعرض التكوينات الكلسية كالصواعد والنوازل، تشكّل على مدى آلاف السنين.',
    category: 'كهوف',
    color: '#8b5cf6',
    emoji: '🦇',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRANl5eVzK9SEKkdGh03ldkdDJAiY0YpIwZ5g&s',
    position: { lat: 23.0833, lng: 57.3500 }
  },
  {
    id: 4,
    title: 'أفيوليت سمائل',
    description: 'أكبر وأحسن كتلة أفيوليت مكشوفة في العالم، تمثل قطعة من قاع المحيط القديم رُفعت فوق مستوى الأرض.',
    category: 'صخور',
    color: '#ef4444',
    emoji: '🪨',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Section_of_Samail_Ophiolite.jpg/250px-Section_of_Samail_Ophiolite.jpg',
    position: { lat: 23.2000, lng: 57.5000 }
  },
  {
    id: 5,
    title: 'رمال الوهيبة',
    description: 'بحر رملي شاسع يغطي أكثر من 12,500 كم²، تظهر فيه العمليات الجيولوجية الريحية وتكوّن الكثبان.',
    category: 'صحراء',
    color: '#f97316',
    emoji: '🏜️',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Wahiba_Sands_%2812%29.jpg/250px-Wahiba_Sands_%2812%29.jpg',
    position: { lat: 21.9835, lng: 58.4217 }
  },
  {
    id: 6,
    title: 'بئر بهلاء',
    description: 'موقع أثري وجيولوجي فريد يكشف طبقات الصخور الرسوبية والتراث العماني العريق في منطقة الداخلية.',
    category: 'تراث',
    color: '#10b981',
    emoji: '🏛️',
    imageUrl: 'https://www.alayyam.info/uploads/content/0703/2WB56O00-TIKP72/Shibam.jpg',
    position: { lat: 22.9667, lng: 57.3000 }
  },
  {
    id: 7,
    title: 'جبل قمر - ظفار',
    description: 'سلسلة جبلية ساحرة في محافظة ظفار تتميز بتنوعها الجيولوجي وظاهرة الخريف الفريدة.',
    category: 'جبال',
    color: '#f59e0b',
    emoji: '⛰️',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Salalah_Oman.jpg/330px-Salalah_Oman.jpg',
    position: { lat: 17.0500, lng: 54.1000 }
  },
]

const mapCenter: [number, number] = [21.5, 57.5]

export default function GeologyMap() {
  return (
    <div className="relative">
      <LeafletMap sites={geologicalSites} center={mapCenter} zoom={6} />
    </div>
  )
}
