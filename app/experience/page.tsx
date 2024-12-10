import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Experience() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">تجربتي في جيو عُمان</h1>
        <p className="text-xl text-gray-700 mb-8">شارك تجربتك وانطباعاتك عن رحلاتك الجيولوجية في عُمان</p>
        <MediaPlaceholder type="image" width={1200} height={500} className="rounded-xl shadow-lg" />
      </div>

      {/* Share Experience Form */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">شارك تجربتك</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">عنوان التجربة</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="أدخل عنواناً لتجربتك"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">المواقع التي زرتها</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="مثال: جبل شمس، وادي شاب"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">تفاصيل التجربة</label>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
              placeholder="شارك تفاصيل رحلتك وانطباعاتك"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">أضف صوراً</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
              <MediaPlaceholder type="image" width={200} height={200} className="rounded-lg" />
            </div>
            <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200">
              إضافة المزيد من الصور
            </button>
          </div>
          <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            نشر التجربة
          </button>
        </form>
      </div>

      {/* Featured Experiences */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">تجارب مميزة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-bold">أ.م</span>
              </div>
              <div className="mr-4">
                <h3 className="font-semibold">أحمد محمد</h3>
                <p className="text-gray-600 text-sm">15 نوفمبر 2023</p>
              </div>
            </div>
            <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">رحلة استكشافية في جبل شمس</h3>
            <p className="text-gray-700 mb-4">تجربة رائعة في استكشاف التضاريس الجيولوجية لجبل شمس...</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              اقرأ المزيد
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 font-bold">س.ع</span>
              </div>
              <div className="mr-4">
                <h3 className="font-semibold">سارة علي</h3>
                <p className="text-gray-600 text-sm">10 نوفمبر 2023</p>
              </div>
            </div>
            <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">اكتشاف كهف الهوتة</h3>
            <p className="text-gray-700 mb-4">زيارة مميزة لكهف الهوتة وتجربة فريدة في استكشاف...</p>
            <button className="text-emerald-600 font-semibold hover:text-emerald-700">
              اقرأ المزيد
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-emerald-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">نصائح للمشاركة</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">📸</span>
            </div>
            <h3 className="font-semibold mb-2">الصور</h3>
            <p className="text-gray-700">شارك صوراً واضحة وعالية الجودة</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">📝</span>
            </div>
            <h3 className="font-semibold mb-2">التفاصيل</h3>
            <p className="text-gray-700">اذكر تفاصيل دقيقة عن تجربتك</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-700">🗺️</span>
            </div>
            <h3 className="font-semibold mb-2">الموقع</h3>
            <p className="text-gray-700">حدد المواقع التي زرتها بدقة</p>
          </div>
        </div>
      </div>
    </main>
  );
}
