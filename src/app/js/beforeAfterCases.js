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
    beforeImage:
      "/JC_namushevrebi/gabi_namushevrebi/client_1/before-dental-treatment.jpg",
    afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental.jpg",
    date: "2023-05-15",
  },

    {
    id: 2,
    doctorId: 1,
    category: "crowns",
    title: {
      ka: "ცირკონის კერამიკული ხიდი",
      en: "Zirconia ceramic crown",
      ru: "Циркониевая керамическая коронка",
      he: "כתר קרמי מזירקוניה",
    },
    beforeImage:
      "/JC_namushevrebi/gabi_namushevrebi/client_7/before7.jpeg",
    afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_7/after7.jpeg",
    date: "2026-01-18",
  },

//  {
//     id: 1,
//     doctorId: 1,
//     category: "crowns",
//     title: {
//       ka: "ცირკონის კერამიკული ხიდი",
//       en: "Zirconia ceramic crown",
//       ru: "Циркониевая керамическая коронка",
//       he: "כתר קרמי מזירקוניה",
//     },
//     beforeImage:
//       "/JC_namushevrebi/gabi_namushevrebi/client_1/before-dental-treatment.jpg",
//     afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental.jpg",
//     date: "2023-05-15",
//   },




  // Doctor 2 - Tengo Shimshilashvili

  // Doctor 3 - Ana Pachkoria

  {
    id: 3,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/2/before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/2/after.jpg",
    date: "2024-02-05",
  },

  {
    id: 4,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/3/Before22.webp",
    afterImage: "/JC_namushevrebi/ana_patchkoria/3/After22.webp",
    date: "2024-02-05",
  },

  // Additional cases for doctors

  {
    id: 5,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/4/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/4/After.jpg",
    date: "2024-03-22",
  },
  {
    id: 6,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/5/BeforeImage.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/5/AfterImage.jpg",
    date: "2024-04-05",
  },
  {
    id: 7,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/6/BeforeImage2.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/6/AfterImage2.jpg",
    date: "2024-04-10",
  },

  {
    id: 8,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "კარიესის მკურნალობა",
      en: "Caries Treatment",
      ru: "Лечение кариеса",
      he: "טיפול בעששת",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/7/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/7/After.jpg",
    date: "2024-04-10",
  },

  {
    id: 9,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/8/BeforeImage3.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/8/AfterImage3.jpg",
    date: "2024-04-10",
  },

  {
    id: 10,
    doctorId: 3,
    category: "therapeutic",
    title: {
      ka: "მხატვრული რესტავრაცია",
      en: "Aesthetic Restoration",
      ru: "Художественная реставрация",
      he: "שחזור אסתטי",
    },
    beforeImage: "/JC_namushevrebi/ana_patchkoria/9/Before.jpg",
    afterImage: "/JC_namushevrebi/ana_patchkoria/9/After.jpg",
    date: "2024-04-10",
  },

  // Doctor 4 - Mariam Kobiashvili
  {
    id: 11,
    doctorId: 4, // დარწმუნდი რომ doctors სექციაში მარიამის id 4 წერია
    category: "therapeutic",
    title: {
      ka: "თერაპიული მკურნალობა",
      en: "Therapeutic Treatment",
      ru: "Терапевтическое лечение",
      he: "טיפול תרפויטי",
    },
    beforeImage: "/JC_namushevrebi/Mariam_kobiashvili/1/Before.jpg",
    afterImage: "/JC_namushevrebi/Mariam_kobiashvili/1/After.jpg",
    date: "2024-06-20",
  },
  {
    id: 12,
    doctorId: 4, // დარწმუნდი რომ doctors სექციაში მარიამის id 4 წერია
    category: "therapeutic",
    title: {
      ka: "თერაპიული მკურნალობა",
      en: "Therapeutic Treatment",
      ru: "Терапевтическое лечение",
      he: "טיפול תרפויטי",
    },
    beforeImage: "/JC_namushevrebi/Mariam_kobiashvili/2/Before.jpeg",
    afterImage: "/JC_namushevrebi/Mariam_kobiashvili/2/After.jpeg",
    date: "2024-06-20",
  },
  {
    id: 13,
    doctorId: 4, // დარწმუნდი რომ doctors სექციაში მარიამის id 4 წერია
    category: "therapeutic",
    title: {
      ka: "თერაპიული მკურნალობა",
      en: "Therapeutic Treatment",
      ru: "Терапевтическое лечение",
      he: "טיפול תרפויטי",
    },
    beforeImage: "/JC_namushevrebi/Mariam_kobiashvili/3/Before.jpg",
    afterImage: "/JC_namushevrebi/Mariam_kobiashvili/3/After.jpg",
    date: "2024-06-20",
  },
  {
    id: 14,
    doctorId: 4, // დარწმუნდი რომ doctors სექციაში მარიამის id 4 წერია
    category: "therapeutic",
    title: {
      ka: "თერაპიული მკურნალობა",
      en: "Therapeutic Treatment",
      ru: "Терапевтическое лечение",
      he: "טיפול תרפויטי",
    },
    beforeImage: "/JC_namushevrebi/Mariam_kobiashvili/4/Before.jpeg",
    afterImage: "/JC_namushevrebi/Mariam_kobiashvili/4/After.jpeg",
    date: "2024-06-20",
  },

    {
    id: 15,
    doctorId: 4, // დარწმუნდი რომ doctors სექციაში მარიამის id 4 წერია
    category: "therapeutic",
    title: {
      ka: "თერაპიული მკურნალობა",
      en: "Therapeutic Treatment",
      ru: "Терапевтическое лечение",
      he: "טיפול תרפויטי",
    },
    beforeImage: "/JC_namushevrebi/Mariam_kobiashvili/5/Before.jpg",
    afterImage: "/JC_namushevrebi/Mariam_kobiashvili/5/After.jpg",
    date: "2024-06-20",
  },
];

export default beforeAfterCases;
