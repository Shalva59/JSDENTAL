// ნამუშევრების მონაცემები - მარტივი ობიექტების მასივი
export const beforeAfterCases = [
  // ექიმი 1 - გაბრიელ ჯანაშვილი
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
    afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental-treatment.jpg",
    date: "2023-05-15",
  },
 {
   id: 2,
   doctorId: 1,
   category: "crowns",
   title: {
     ka: "რესტავრაცია",
     en: "Restoration",
     ru: "Реставрация",
     he: "שחזור",
   },
   beforeImage: "/JC_namushevrebi/gabi_namushevrebi/client_5/before_bad_teethh.jpeg",
   afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_5/after_good_teethh.jpeg",
   date: "2024-03-15",
 },
  {
    id: 3,
    doctorId: 1,
    category: "veneers",
    title: {
      ka: "ვინირები",
      en: "Veneers",
      ru: "Виниры",
      he: "ציפויי חרסינה",
    },
    beforeImage: "/JC_namushevrebi/gabi_namushevrebi/client_3/before_Bad-Teeth-Heart-Attack.jpg",
    afterImage:  "/JC_namushevrebi/gabi_namushevrebi/client_3/after_good-Teeth.jpg",
    date: "2023-07-10",
  },

  // ექიმი 2 - ანა მაისურაძე
  {
    id: 4,
    doctorId: 2,
    category: "orthodontics",
    title: {
      ka: "ორთოდონტია",
      en: "Orthodontics",
      ru: "Ортодонтия",
      he: "אורתודונטיה",
    },
    beforeImage: "https://i.imgur.com/Yd8mFft.jpg",
    afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
    date: "2023-08-05",
  },
  {
    id: 5,
    doctorId: 2,
    category: "crowns",
    title: {
      ka: "კბილის გვირგვინები",
      en: "Dental Crowns",
      ru: "Зубные коронки",
      he: "כתרים דנטליים",
    },
    beforeImage: "https://i.imgur.com/JQTtQMh.jpg",
    afterImage: "https://i.imgur.com/Ixz9pbR.jpg",
    date: "2023-09-12",
  },
  {
    id: 6,
    doctorId: 2,
    category: "dental-implants",
    title: {
      ka: "მრავლობითი იმპლანტები",
      en: "Multiple Implants",
      ru: "Множественные импланты",
      he: "שתלים מרובים",
    },
    beforeImage: "https://i.imgur.com/8PrDPNY.jpg",
    afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
    date: "2023-10-05",
  },

  // ექიმი 3 - დავით კაპანაძე
  {
    id: 7,
    doctorId: 3,
    category: "teeth-whitening",
    title: {
      ka: "პროფესიონალური გათეთრება",
      en: "Professional Whitening",
      ru: "Профессиональное отбеливание",
      he: "הלבנה מקצועית",
    },
    beforeImage: "https://i.imgur.com/Yd8mFft.jpg",
    afterImage: "https://i.imgur.com/Ixz9pbR.jpg",
    date: "2023-11-15",
  },
  {
    id: 8,
    doctorId: 3,
    category: "veneers",
    title: {
      ka: "სრული ღიმილის ტრანსფორმაცია",
      en: "Full Smile Makeover",
      ru: "Полное преображение улыбки",
      he: "מתיחת פנים מלאה לחיוך",
    },
    beforeImage: "https://i.imgur.com/JQTtQMh.jpg",
    afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
    date: "2023-12-20",
  },

  // ექიმი 4 - ნინო ბერიძე
  {
    id: 9,
    doctorId: 4,
    category: "orthodontics",
    title: {
      ka: "ბრეკეტები",
      en: "Braces",
      ru: "Брекеты",
      he: "גשרים",
    },
    beforeImage: "https://i.imgur.com/8PrDPNY.jpg",
    afterImage: "https://i.imgur.com/Ixz9pbR.jpg",
    date: "2024-01-10",
  },
  {
    id: 10,
    doctorId: 4,
    category: "crowns",
    title: {
      ka: "კერამიკული გვირგვინები",
      en: "Ceramic Crowns",
      ru: "Керамические коронки",
      he: "כתרים קרמיים",
    },
    beforeImage: "https://i.imgur.com/JQTtQMh.jpg",
    afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
    date: "2024-02-05",
  },

  // დამატებითი შემთხვევები ექიმებისთვის
  // {
  //   id: 11,
  //   doctorId: 1,
  //   category: "crowns",
  //   title: {
  //     ka: "რესტავრაცია",
  //     en: "Restoration",
  //     ru: "Реставрация",
  //     he: "שחזור",
  //   },
  //   beforeImage: "https://i.imgur.com/Yd8mFft.jpg",
  //   afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
  //   date: "2024-03-15",
  // },
  // {
  //   id: 12,
  //   doctorId: 2,
  //   category: "teeth-whitening",
  //   title: {
  //     ka: "ლაზერული გათეთრება",
  //     en: "Laser Whitening",
  //     ru: "Лазерное отбеливание",
  //     he: "הלבנה בלייזר",
  //   },
  //   beforeImage: "https://i.imgur.com/8PrDPNY.jpg",
  //   afterImage: "https://i.imgur.com/Ixz9pbR.jpg",
  //   date: "2024-03-22",
  // },
  // {
  //   id: 13,
  //   doctorId: 3,
  //   category: "dental-implants",
  //   title: {
  //     ka: "წინა კბილის იმპლანტი",
  //     en: "Front Tooth Implant",
  //     ru: "Имплант переднего зуба",
  //     he: "שתל שן קדמית",
  //   },
  //   beforeImage: "https://i.imgur.com/JQTtQMh.jpg",
  //   afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
  //   date: "2024-04-05",
  // },
  // {
  //   id: 14,
  //   doctorId: 4,
  //   category: "veneers",
  //   title: {
  //     ka: "ცირკონის ვენირები",
  //     en: "Zirconium Veneers",
  //     ru: "Циркониевые виниры",
  //     he: "ציפויי זירקוניה",
  //   },
  //   beforeImage: "https://i.imgur.com/Yd8mFft.jpg",
  //   afterImage: "https://i.imgur.com/Ixz9pbR.jpg",
  //   date: "2024-04-10",
  // },
  // {
  //   id: 15,
  //   doctorId: 1,
  //   category: "orthodontics",
  //   title: {
  //     ka: "ინვიზალაინ მკურნალობა",
  //     en: "Invisalign Treatment",
  //     ru: "Лечение Invisalign",
  //     he: "טיפול אינוויזליין",
  //   },
  //   beforeImage: "https://i.imgur.com/8PrDPNY.jpg",
  //   afterImage: "https://i.imgur.com/YPJ4TgZ.jpg",
  //   date: "2024-04-15",
  // },
]

// კატეგორიები ფილტრაციისთვის
export const categories = [
  { id: "all", name: { ka: "ყველა", en: "All", ru: "Все", he: "הכל" } },
  { id: "dental-implants", name: { ka: "იმპლანტები", en: "Dental Implants", ru: "Импланты", he: "שתלים דנטליים" } },
  { id: "teeth-whitening", name: { ka: "გათეთრება", en: "Teeth Whitening", ru: "Отбеливание", he: "הלבנת שיניים" } },
  { id: "veneers", name: { ka: "ვინირები", en: "Veneers", ru: "Виниры", he: "ציפויים" } },
  { id: "orthodontics", name: { ka: "ორთოდონტია", en: "Orthodontics", ru: "Ортодонтия", he: "אורתודונטיה" } },
  { id: "crowns", name: { ka: "გვირგვინები", en: "Crowns", ru: "Коронки", he: "כתרים" } },
]
