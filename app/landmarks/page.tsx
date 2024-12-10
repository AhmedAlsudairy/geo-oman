import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Landmarks() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">المعالم الجيولوجية</h1>
        <p className="text-xl text-gray-700 mb-8">اكتشف أبرز المعالم الجيولوجية في سلطنة عُمان</p>
        <MediaPlaceholder type="image" width={1200} height={500} className="rounded-xl shadow-lg" />
      </div>

      {/* Featured Landmarks */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-emerald-700">جبل شمس</h2>
          <p className="text-gray-700 mb-4">أعلى قمة جبلية في عُمان، يوفر إطلالات خلابة على الوديان المحيطة.</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>الارتفاع: 3,009 م</span>
            <span>الموقع: محافظة الداخلية</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-emerald-700">وادي شاب</h2>
          <p className="text-gray-700 mb-4">وادٍ طبيعي خلاب يتميز بمياهه العذبة وتكويناته الصخرية الفريدة.</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>الطول: 2.1 كم</span>
            <span>الموقع: محافظة مسقط</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MediaPlaceholder type="image" width={400} height={300} className="rounded-lg mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-emerald-700">كهف الهوتة</h2>
          <p className="text-gray-700 mb-4">كهف طبيعي يضم تشكيلات من الصواعد والهوابط الكلسية.</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>العمق: 200 م</span>
            <span>الموقع: ولاية الحمراء</span>
          </div>
        </div>
      </div>

      {/* Virtual Tour Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">جولة افتراضية</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <MediaPlaceholder type="video" width={1000} height={562} className="rounded-lg" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          استمتع بجولة افتراضية 360 درجة في أهم المعالم الجيولوجية في عُمان.
        </p>
      </div>

      {/* Geological Map */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">خريطة المعالم</h2>
        <MediaPlaceholder type="image" width={1000} height={600} className="rounded-lg mb-6" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">دليل الزيارة</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>أفضل وقت للزيارة: من أكتوبر إلى مارس</li>
              <li>يُنصح بحجز مرشد سياحي للمواقع النائية</li>
              <li>احرص على حمل كمية كافية من المياه</li>
              <li>التزم بإرشادات السلامة في كل موقع</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">معلومات الاتصال</h3>
            <ul className="space-y-2 text-gray-700">
              <li>مركز المعلومات السياحية: 800-77777</li>
              <li>خدمات الطوارئ: 9999</li>
              <li>البريد الإلكتروني: info@geooman.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">معرض الصور</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MediaPlaceholder type="image" width={300} height={300} className="rounded-lg shadow-md" />
          <MediaPlaceholder type="image" width={300} height={300} className="rounded-lg shadow-md" />
          <MediaPlaceholder type="image" width={300} height={300} className="rounded-lg shadow-md" />
          <MediaPlaceholder type="image" width={300} height={300} className="rounded-lg shadow-md" />
        </div>
      </div>
    </main>
  );
}
