// Before-after cases data
const beforeAfterCases = [
  // Doctor 1 - Gabriel Janashvili
  {
    id: 1,
    doctorId: 1,
    category: "crowns",
    title: {
      ka: "ცირკონის კერამიკული ხიდი",
      en: "Zirconia ceramic crown",
      ru: "Циркониевая керамическая коронка",
      he: "כתר קרמי מזירקוניה",
    },
    beforeImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/before-dental-treatment.jpg",
    afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental.jpg",
    date: "2023-05-15",
  },

  // Doctor 2 - Tengo Shimshilashvili



  // Doctor 3 - Eli Kasrelishvili
  {
    id: 2,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_1/before1.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_1/after1.jpg",
    date: "2023-11-15",
  },
  {
    id: 3,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_2/before2.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_2/after2.jpg",
    date: "2023-12-20",
  },

  {
    id: 4,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_3/before3.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_3/after3.jpg",
    date: "2023-12-20",
  },

  {
    id: 5,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_4/before4.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_4/after4.jpg",
    date: "2023-12-20",
  },

  {
    id: 6,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_5/before5.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_5/after5.jpg",
    date: "2023-12-20",
  },


  {
    id: 7,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "ენდოდონტიური მკურნალობა",
      en: "Endodontic Treatment",
      ru: "Эндодонтическое лечение",
      he: "טיפול אנדודונטי"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_6/before6.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_6/after6.jpg",
    date: "2023-12-20",
  },


  {
    id: 8,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_7/before7.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_7/after7.jpg",
    date: "2023-12-20",
  },


  {
    id: 9,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "ენდოდონტიური მკურნალობა",
      en: "Endodontic Treatment",
      ru: "Эндодонтическое лечение",
      he: "טיפול אנדודונטי"
    },
    beforeImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_8/before8.jpg",
    afterImage: "/JC_namushevrebi/Eli_Kasrelishvili/client_8/after8.jpg",
    date: "2023-12-20",
  },




  // Doctor 4 - Ana Pachkoria

  {
    id: 12,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/2/before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/2/after.jpg",
    date: "2024-02-05",
  },

  {
    id: 13,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/3/Before22.webp",
    afterImage: "/JC_namushevrebi/ana_patchkoria/3/After22.webp",
    date: "2024-02-05",
  },

  // Additional cases for doctors

  {
    id: 14,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/4/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/4/After.jpg",
    date: "2024-03-22",
  },
  {
    id: 15,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/5/BeforeImage.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/5/AfterImage.jpg",
    date: "2024-04-05",
  },
  {
    id: 16,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/6/BeforeImage2.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/6/AfterImage2.jpg",
    date: "2024-04-10",
  },

  {
    id: 17,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/7/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/7/After.jpg",
    date: "2024-04-10",
  },

  {
    id: 18,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/8/BeforeImage3.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/8/AfterImage3.jpg",
    date: "2024-04-10",
  },

  {
    id: 19,
    doctorId: 4,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי"
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/9/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/9/After.jpg",
    date: "2024-04-10",
  },
]

export default beforeAfterCases
