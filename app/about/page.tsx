import MediaPlaceholder from "@/components/MediaPlaceholder";

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">من نحن</h1>
        <MediaPlaceholder type="image" width={800} height={400} className="rounded-lg shadow-lg mb-8" />
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">مهمتنا</h2>
          <p className="text-gray-700 leading-relaxed">
            في &ldquo;جيو عُمان&rdquo;، نسعى إلى تسليط الضوء على الثروة الجيولوجية الفريدة لسلطنة عمان، من خلال تقديم محتوى علمي وتعليمي متميز يلبي احتياجات الباحثين، الطلاب، وعشاق الجيولوجيا.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-emerald-700">رؤيتنا</h2>
          <p className="text-gray-700 leading-relaxed">
            أن نصبح المرجع الأول للمعلومات الجيولوجية في عمان، وتعزيز الوعي العام بقيمة المعالم الجيولوجية في دعم السياحة المستدامة والحفاظ على البيئة الطبيعية.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">من نحن؟</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          &ldquo;جيو عُمان&rdquo; هو فريق من العلماء، الباحثين، والمختصين في مجال الجيولوجيا، اجتمعوا لابتكار منصة تعليمية متكاملة تعكس التنوع الجيولوجي لعمان. نعمل على تبسيط العلوم الجيولوجية وجعلها متاحة للجميع، مع التركيز على تقديم محتوى تفاعلي ومرجع علمي غني.
        </p>
        <MediaPlaceholder type="image" width={600} height={300} className="rounded-lg shadow-md" />
      </div>

      {/* Values Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">قيمنا</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">التعليم</h3>
            <p className="text-gray-700">نشر المعرفة العلمية بطريقة سهلة ومبتكرة.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">المحافظة</h3>
            <p className="text-gray-700">تعزيز استدامة الموارد الطبيعية والمعالم الجيولوجية.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">التعاون</h3>
            <p className="text-gray-700">بناء شراكات مع المؤسسات العلمية والسياحية لتوسيع الأثر.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-emerald-700">الفريق</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          يتألف فريقنا من مختصين في علوم الأرض، مصورين محترفين، وخبراء تقنيين يعملون معًا لجعل &ldquo;جيو عُمان&rdquo; منصة شاملة وملهمة لكل المهتمين.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <MediaPlaceholder type="image" width={200} height={200} className="rounded-full shadow-md mx-auto" />
          <MediaPlaceholder type="image" width={200} height={200} className="rounded-full shadow-md mx-auto" />
          <MediaPlaceholder type="image" width={200} height={200} className="rounded-full shadow-md mx-auto" />
        </div>
      </div>
    </main>
  );
}
