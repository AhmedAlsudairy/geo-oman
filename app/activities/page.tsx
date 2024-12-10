import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Activities() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">الأنشطة التعليمية</h1>
        <p className="text-xl text-gray-700 mb-8">اكتشف وتعلم من خلال أنشطتنا التفاعلية المتنوعة</p>
        <MediaPlaceholder type="image" width={1200} height={500} className="rounded-xl shadow-lg" />
      </div>

      {/* Featured Activities */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">الرحلات الميدانية</h2>
          <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
          <p className="text-gray-700 leading-relaxed mb-4">
            رحلات استكشافية مع خبراء الجيولوجيا لاكتشاف المواقع الجيولوجية المميزة في عُمان.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
            سجل الآن
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">ورش العمل التفاعلية</h2>
          <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
          <p className="text-gray-700 leading-relaxed mb-4">
            ورش عمل تفاعلية لتعلم أساسيات الجيولوجيا وتحديد أنواع الصخور والمعادن.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
            احجز مقعدك
          </button>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">المصادر التعليمية</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <MediaPlaceholder type="image" width={200} height={200} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">الكتب التعليمية</h3>
            <p className="text-gray-700">مجموعة من الكتب والمراجع العلمية</p>
          </div>
          <div className="text-center">
            <MediaPlaceholder type="image" width={200} height={200} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">الفيديوهات التعليمية</h3>
            <p className="text-gray-700">سلسلة فيديوهات تعليمية تفاعلية</p>
          </div>
          <div className="text-center">
            <MediaPlaceholder type="image" width={200} height={200} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">الألعاب التعليمية</h3>
            <p className="text-gray-700">ألعاب تفاعلية لتعلم الجيولوجيا</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">الفعاليات القادمة</h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <div className="bg-emerald-100 p-4 rounded-lg text-center min-w-[100px]">
              <div className="text-emerald-700 font-bold text-2xl">15</div>
              <div className="text-emerald-600">ديسمبر</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2">معرض الصخور والمعادن</h3>
              <p className="text-gray-700">معرض تفاعلي يضم مجموعة نادرة من الصخور والمعادن العُمانية</p>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
              التفاصيل
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <div className="bg-emerald-100 p-4 rounded-lg text-center min-w-[100px]">
              <div className="text-emerald-700 font-bold text-2xl">20</div>
              <div className="text-emerald-600">ديسمبر</div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2">ورشة تحديد الصخور</h3>
              <p className="text-gray-700">ورشة عملية لتعلم طرق تحديد وتصنيف الصخور المختلفة</p>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
              التفاصيل
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-emerald-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">اشترك في نشرتنا البريدية</h2>
        <p className="text-gray-700 mb-6">احصل على آخر الأخبار والفعاليات مباشرة في بريدك الإلكتروني</p>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700">
            اشترك
          </button>
        </div>
      </div>
    </main>
  );
}
