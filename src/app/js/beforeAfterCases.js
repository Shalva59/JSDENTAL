// Before-after cases data
const beforeAfterCases = [
    // Doctor 1 - Gabriel Janashvili
    {
      id: 1,
      doctorId: 1,
      category: "dental-implants",
      title: {
        ka: "იმპლანტაცია",
        en: "Dental Implantation",
        ru: "Имплантация зубов",
        he: "השתלת שיניים",
      },
      beforeImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/before-dental-treatment.jpg",
      afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental.jpg",
      date: "2023-05-15",
    },
  
    // Doctor 2 - Tengo Shimshilashvili
    {
      id: 2,
      doctorId: 2,
      category: "orthodontics",
      title: {
        ka: "ორთოდონტია",
        en: "Orthodontics",
        ru: "Ортодонтия",
        he: "אורתודונטיה",
      },
      beforeImage: "/dental-checkup-preparation.png",
      afterImage: "/fresh-smile-feeling.png",
      date: "2023-08-05",
    },
    {
      id: 3,
      doctorId: 2,
      category: "crowns",
      title: {
        ka: "კბილის გვირგვინები",
        en: "Dental Crowns",
        ru: "Зубные коронки",
        he: "כתרים דנטליים",
      },
      beforeImage: "/dental-checkup-preparation.png",
      afterImage: "/fresh-smile-feeling.png",
      date: "2023-09-12",
    },
    {
      id: 4,
      doctorId: 2,
      category: "dental-implants",
      title: {
        ka: "მრავლობითი იმპლანტები",
        en: "Multiple Implants",
        ru: "Множественные импланты",
        he: "שתלים מרובים",
      },
      beforeImage: "/dental-checkup-preparation.png",
      afterImage: "/fresh-smile-feeling.png",
      date: "2023-10-05",
    },
  
    // Doctor 3 - Eli Kasrelishvili
    {
      id: 5,
      doctorId: 3,
      category: "teeth-whitening",
      title: {
        ka: "პროფესიონალური გათეთრება",
        en: "Professional Whitening",
        ru: "Профессиональное отбеливание",
        he: "הלבנה מקצועית",
      },
      beforeImage: "/dental-checkup-preparation.png",
      afterImage: "/fresh-smile-feeling.png",
      date: "2023-11-15",
    },
    {
      id: 6,
      doctorId: 3,
      category: "veneers",
      title: {
        ka: "სრული ღიმილის ტრანსფორმაცია",
        en: "Full Smile Makeover",
        ru: "Полное преображение улыбки",
        he: "מתיחת פנים מלאה לחיוך",
      },
      beforeImage: "/dental-checkup-preparation.png",
      afterImage: "/fresh-smile-feeling.png",
      date: "2023-12-20",
    },
  
    // Doctor 4 - Ana Pachkoria
    {
      id: 7,
      doctorId: 4,
      category: "orthodontics",
      title: {
        ka: "ბრეკეტები",
        en: "Braces",
        ru: "Брекеты",
        he: "גשרים",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/1/before.webp",
      afterImage: "/JC_namushevrebi/ana_patchkoria/1/After.webp",
      date: "2024-01-10",
    },
    {
      id: 8,
      doctorId: 4,
      category: "crowns",
      title: {
        ka: "კერამიკული გვირგვინები",
        en: "Ceramic Crowns",
        ru: "Керамические коронки",
        he: "כתרים קרמיים",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/2/before.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/2/after.jpg",
      date: "2024-02-05",
    },
  
    {
      id: 9,
      doctorId: 4,
      category: "crowns",
      title: {
        ka: "კერამიკული გვირგვინები",
        en: "Ceramic Crowns",
        ru: "Керамические коронки",
        he: "כתרים קרמיים",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/3/Before22.webp",
      afterImage: "/JC_namushevrebi/ana_patchkoria/3/After22.webp",
      date: "2024-02-05",
    },
  
    // Additional cases for doctors
  
    {
      id: 10,
      doctorId: 4,
      category: "teeth-whitening",
      title: {
        ka: "ლაზერული გათეთრება",
        en: "Laser Whitening",
        ru: "Лазерное отбеливание",
        he: "הלבנה בלייזר",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/4/Before.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/4/After.jpg",
      date: "2024-03-22",
    },
    {
      id: 11,
      doctorId: 4,
      category: "dental-implants",
      title: {
        ka: "წინა კბილის იმპლანტი",
        en: "Front Tooth Implant",
        ru: "Имплант переднего зуба",
        he: "שתל שן קדמית",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/5/BeforeImage.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/5/AfterImage.jpg",
      date: "2024-04-05",
    },
    {
      id: 12,
      doctorId: 4,
      category: "veneers",
      title: {
        ka: "ცირკონის ვენირები",
        en: "Zirconium Veneers",
        ru: "Циркониевые виниры",
        he: "ציפויי זירקוניה",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/6/BeforeImage2.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/6/AfterImage2.jpg",
      date: "2024-04-10",
    },
  
    {
      id: 13,
      doctorId: 4,
      category: "veneers",
      title: {
        ka: "ცირკონის ვენირები",
        en: "Zirconium Veneers",
        ru: "Циркониевые виниры",
        he: "ציפויי זירקוניה",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/7/Before.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/7/After.jpg",
      date: "2024-04-10",
    },
  
    {
      id: 14,
      doctorId: 4,
      category: "veneers",
      title: {
        ka: "ცირკონის ვენირები",
        en: "Zirconium Veneers",
        ru: "Циркониевые виниры",
        he: "ציפויי זירקוניה",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/8/BeforeImage3.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/8/AfterImage3.jpg",
      date: "2024-04-10",
    },
  
    {
      id: 15,
      doctorId: 4,
      category: "veneers",
      title: {
        ka: "ცირკონის ვენირები",
        en: "Zirconium Veneers",
        ru: "Циркониевые виниры",
        he: "ציפויי זירקוניה",
      },
      beforeImage: "/JC_namushevrebi/ana_patchkoria/9/Before.jpg",
      afterImage: "/JC_namushevrebi/ana_patchkoria/9/After.jpg",
      date: "2024-04-10",
    },
  ]
  
  export default beforeAfterCases
  