import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">اتصل بنا</h1>
        <p className="text-xl text-gray-700 mb-8">نحن هنا للإجابة على استفساراتك ومساعدتك في رحلتك الجيولوجية</p>
      </div>

      {/* Contact Form & Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-emerald-700">راسلنا</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">الاسم</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">الموضوع</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="موضوع الرسالة"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">الرسالة</label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
                placeholder="اكتب رسالتك هنا"
              />
            </div>
            <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">معلومات الاتصال</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="mr-4">
                  <h3 className="font-semibold">العنوان</h3>
                  <p className="text-gray-700">مسقط، سلطنة عُمان</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="mr-4">
                  <h3 className="font-semibold">الهاتف</h3>
                  <p className="text-gray-700">+968 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div className="mr-4">
                  <h3 className="font-semibold">البريد الإلكتروني</h3>
                  <p className="text-gray-700">info@geooman.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">موقعنا</h2>
            <div className="aspect-w-16 aspect-h-9">
              <MediaPlaceholder type="image" width={600} height={400} className="rounded-lg" />
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">ساعات العمل</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">السبت - الخميس</span>
                <span className="text-gray-700">8:00 ص - 4:00 م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">الجمعة</span>
                <span className="text-gray-700">مغلق</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold mb-2">كيف يمكنني حجز رحلة جيولوجية؟</h3>
            <p className="text-gray-700">يمكنك حجز رحلة من خلال صفحة الأنشطة التعليمية أو الاتصال بنا مباشرة.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold mb-2">هل تقدمون خدمات للمجموعات؟</h3>
            <p className="text-gray-700">نعم، نقدم خدمات وبرامج خاصة للمجموعات والمدارس والجامعات.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold mb-2">كيف يمكنني الانضمام لفريق العمل؟</h3>
            <p className="text-gray-700">يمكنك إرسال سيرتك الذاتية عبر نموذج الاتصال مع ذكر الوظيفة المرغوبة.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
