import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Geology() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">جيولوجيا عُمـان</h1>
        <p className="text-xl text-gray-700 mb-8">اكتشف التكوينات الجيولوجية الفريدة والمتنوعة في سلطنة عُمان</p>
        <MediaPlaceholder type="image" width={1200} height={500} className="rounded-xl shadow-lg" />
      </div>

      {/* Geological Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">جبال الحجر</h2>
          <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
          <p className="text-gray-700 leading-relaxed">
            سلسلة جبلية تمتد على طول الساحل الشمالي لعُمان، تشكلت قبل ملايين السنين نتيجة حركة الصفائح التكتونية.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">أوفيولايت عُمان</h2>
          <MediaPlaceholder type="image" width={500} height={300} className="rounded-lg mb-4" />
          <p className="text-gray-700 leading-relaxed">
            أكبر وأفضل كتلة أوفيولايتية محفوظة في العالم، تقدم نظرة فريدة لقاع المحيط القديم.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">استكشف جيولوجيا عُمان</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <MediaPlaceholder type="video" width={1000} height={562} className="rounded-lg" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          شاهد رحلة مذهلة عبر التاريخ الجيولوجي لعُمان، من الجبال الشاهقة إلى الوديان العميقة.
        </p>
      </div>

      {/* Geological Periods */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">العصور الجيولوجية</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">العصر القديم</h3>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-gray-700">تشكل الصخور الأساسية وبداية تكوين القارات.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">العصر الوسيط</h3>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-gray-700">تشكل الجبال وترسب الصخور الرسوبية.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">العصر الحديث</h3>
            <MediaPlaceholder type="image" width={300} height={200} className="rounded-lg mb-4" />
            <p className="text-gray-700">تشكل المناظر الطبيعية الحالية والوديان.</p>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">خريطة المواقع الجيولوجية</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <MediaPlaceholder type="image" width={1000} height={562} className="rounded-lg" />
        </div>
        <p className="text-gray-700 leading-relaxed">
          استكشف المواقع الجيولوجية الرئيسية في عُمان من خلال خريطتنا التفاعلية.
        </p>
      </div>
    </main>
  );
}
