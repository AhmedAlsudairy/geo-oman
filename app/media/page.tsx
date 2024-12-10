import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Media() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">الوسائط المتعددة</h1>
        <p className="text-xl text-gray-700 mb-8">استكشف مجموعتنا الغنية من الصور والفيديوهات الجيولوجية</p>
      </div>

      {/* Featured Video */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">الفيديو المميز</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <MediaPlaceholder type="video" width={1000} height={562} className="rounded-lg" />
        </div>
        <h3 className="text-xl font-semibold mb-2">رحلة في أعماق جبال عُمان</h3>
        <p className="text-gray-700">استكشف الطبيعة الجيولوجية المذهلة لجبال عُمان في هذا الفيديو الوثائقي المميز.</p>
      </div>

      {/* Photo Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">معرض الصور</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" />
          </div>
          <div className="space-y-6">
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" />
          </div>
          <div className="space-y-6">
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={500} className="rounded-lg shadow-md" />
            <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg shadow-md" />
          </div>
        </div>
      </div>

      {/* Video Series */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">سلسلة الفيديوهات التعليمية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MediaPlaceholder type="video" width={400} height={225} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">تشكل الجبال في عُمان</h3>
            <p className="text-gray-700">الحلقة الأولى: رحلة عبر الزمن الجيولوجي</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MediaPlaceholder type="video" width={400} height={225} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">الصخور البركانية</h3>
            <p className="text-gray-700">الحلقة الثانية: أنواع الصخور وتصنيفها</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <MediaPlaceholder type="video" width={400} height={225} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">المعادن في عُمان</h3>
            <p className="text-gray-700">الحلقة الثالثة: اكتشاف الثروات المعدنية</p>
          </div>
        </div>
      </div>

      {/* Interactive 360° Tours */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">جولات افتراضية 360°</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">كهف الهوتة</h3>
            <p className="text-gray-700">استكشف كهف الهوتة في جولة افتراضية شاملة</p>
          </div>
          <div>
            <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">جبل شمس</h3>
            <p className="text-gray-700">شاهد المناظر الخلابة لجبل شمس بتقنية 360 درجة</p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-emerald-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">تحميل الوسائط</h2>
        <p className="text-gray-700 mb-6">قم بتحميل الصور عالية الدقة والفيديوهات التعليمية</p>
        <div className="flex gap-4">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            تحميل الصور
          </button>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            تحميل الفيديوهات
          </button>
        </div>
      </div>
    </main>
  );
}
