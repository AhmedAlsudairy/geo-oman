export interface GeologicalFeature {
  id: string;
  name: string;
  arabicName: string;
  type: 'ophiolite' | 'wadi' | 'mountain' | 'cave' | 'desert' | 'fossil' | 'mineral';
  description: string;
  arabicDescription: string;
  location: {
    lat: number;
    lng: number;
  };
}

export const geologicalFeatures: GeologicalFeature[] = [
  {
    id: 'samail-ophiolite',
    name: 'Samail Ophiolite',
    arabicName: 'أفيوليت سمائل',
    type: 'ophiolite',
    description: 'The world\'s largest and best-preserved ophiolite complex, representing ancient oceanic crust thrust onto the continental margin. It provides unique insights into Earth\'s geological processes.',
    arabicDescription: 'أكبر وأفضل مجمع أفيوليت محفوظ في العالم، يمثل قشرة محيطية قديمة مدفوعة على الهامش القاري. يوفر رؤى فريدة في العمليات الجيولوجية للأرض.',
    location: { lat: 23.2, lng: 57.5 }
  },
  {
    id: 'wadi-shab',
    name: 'Wadi Shab',
    arabicName: 'وادي شاب',
    type: 'wadi',
    description: 'A spectacular wadi featuring dramatic limestone cliffs, crystal-clear pools, and waterfalls. Shows excellent examples of water erosion and geological formations.',
    arabicDescription: 'وادي مذهل يتميز بجروف حجر جيري درامية، وبرك صافية كالكريستال، وشلالات. يظهر أمثلة ممتازة على التآكل المائي والتكوينات الجيولوجية.',
    location: { lat: 22.8368, lng: 59.2394 }
  },
  {
    id: 'jebel-shams',
    name: 'Jebel Shams',
    arabicName: 'جبل شمس',
    type: 'mountain',
    description: 'Oman\'s highest peak, showcasing spectacular limestone cliffs and deep canyons. The area reveals millions of years of geological history through its exposed rock layers.',
    arabicDescription: 'أعلى قمة في عمان، تعرض جروف الحجر الجيري المذهلة والوديان العميقة. تكشف المنطقة عن ملايين السنين من التاريخ الجيولوجي من خلال طبقات الصخور المكشوفة.',
    location: { lat: 23.2367, lng: 57.2598 }
  },
  {
    id: 'majlis-al-jinn',
    name: 'Majlis Al Jinn Cave',
    arabicName: 'كهف مجلس الجن',
    type: 'cave',
    description: 'One of the largest cave chambers in the world, formed through extensive limestone dissolution. Features impressive stalactites and geological formations.',
    arabicDescription: 'واحدة من أكبر الغرف الكهفية في العالم، تشكلت من خلال ذوبان الحجر الجيري الواسع. يتميز بالصواعد المثيرة للإعجاب والتكوينات الجيولوجية.',
    location: { lat: 22.9, lng: 59.3 }
  },
  {
    id: 'wahiba-sands',
    name: 'Wahiba Sands',
    arabicName: 'رمال الوهيبة',
    type: 'desert',
    description: 'A desert region showcasing remarkable sand dune formations and providing evidence of ancient climatic changes. The dunes contain various mineral compositions.',
    arabicDescription: 'منطقة صحراوية تعرض تشكيلات كثبان رملية رائعة وتقدم دليلاً على التغيرات المناخية القديمة. تحتوي الكثبان على تركيبات معدنية متنوعة.',
    location: { lat: 21.9835, lng: 58.4217 }
  }
];

export const geologicalPeriods = [
  {
    era: 'Precambrian',
    arabicEra: 'ما قبل الكامبري',
    events: [
      'Formation of the Arabian Shield',
      'Deposition of oldest rocks in Oman'
    ],
    arabicEvents: [
      'تشكيل الدرع العربي',
      'ترسيب أقدم الصخور في عمان'
    ]
  },
  {
    era: 'Paleozoic',
    arabicEra: 'العصر القديم',
    events: [
      'Formation of sedimentary basins',
      'Deposition of marine sediments'
    ],
    arabicEvents: [
      'تشكيل الأحواض الرسوبية',
      'ترسيب الرواسب البحرية'
    ]
  },
  {
    era: 'Mesozoic',
    arabicEra: 'العصر الوسيط',
    events: [
      'Formation of the Samail Ophiolite',
      'Major tectonic events'
    ],
    arabicEvents: [
      'تشكيل أفيوليت سمائل',
      'أحداث تكتونية رئيسية'
    ]
  },
  {
    era: 'Cenozoic',
    arabicEra: 'العصر الحديث',
    events: [
      'Formation of current mountain ranges',
      'Development of current landscape'
    ],
    arabicEvents: [
      'تشكيل سلاسل الجبال الحالية',
      'تطور المشهد الطبيعي الحالي'
    ]
  }
];
