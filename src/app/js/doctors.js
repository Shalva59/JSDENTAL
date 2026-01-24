// ქართული ექიმები (ძირითადი)
export const doctors = [
  {
    name: "გაბრიელ ჯანაშვილი",
    specialty: "ორთოპედი, ქირურგი",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    name: "თენგო შიმშილაშვილი",
    specialty: "ორთოპედი, ქირურგი, თერაპევტი",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    name: "ანა პაჭკორია",
    specialty: "თერაპევტი, ქირურგი, პაროდონტოლოგი",
    image: "/JC_Dental_Doctors/Ana_patchkoria1.jpg",
  },
  {
    name: "მარიამ კობიაშვილი",
    specialty: "თერაპევტი, პაროდონტოლოგი",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili.jpeg",
  },
];

// ინგლისური ექიმები
export const enDoctors = [
  {
    name: "Gabriel Janashvili",
    specialty: "Orthopedist, Surgeon",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    name: "Tengo Shimshilashvili",
    specialty: "Orthopedist, Surgeon, Therapist",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    name: "Ana Patchkoria",
    specialty: "Therapist, Surgeon, Periodontist",
    image: "/JC_Dental_Doctors/Ana_patchkoria1.jpg",
  },
  {
    name: "Mariam Kobiashvili",
    specialty: "Therapist, Periodontist",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili.jpeg",
  },
];

// რუსული ექიმები
export const ruDoctors = [
  {
    name: "Габриэль Джанашвили",
    specialty: "Ортопед, Хирург",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    name: "Тенго Шимшилашвили",
    specialty: "Ортопед, Хирург, Терапевт",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    name: "Ана Пачкория",
    specialty: "Терапевт, Хирург, Пародонтолог",
    image: "/JC_Dental_Doctors/Ana_patchkoria1.jpg",
  },
  {
    name: "Мариам Кобиашвили",
    specialty: "Терапевт, Пародонтолог",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili.jpeg",
  },
];

// ებრაული ექიმები
export const heDoctors = [
  {
    name: "גבריאל ג'נשווילי",
    specialty: "אורתופד, מנתח",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    name: "טנגו שימשילשווילי",
    specialty: "אורתופד, מנתח, מטפל",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    name: "אנה פצ'קוריה",
    specialty: "מטפלת, מנתחת, פריודונטולוגית",
    image: "/JC_Dental_Doctors/Ana_patchkoria1.jpg",
  },
  {
    name: "מריאם קוביאשווילי",
    specialty: "מטפלת, פריודונטולוגית",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili.jpeg",
  },
];

// ყველა ენის ექიმები ერთ ობიექტში
export const doctorsByLanguage = {
  ka: doctors,
  en: enDoctors,
  ru: ruDoctors,
  he: heDoctors,
};

// ===============================
// სტომატოლოგების მონაცემები (გამოცდილება/დღეები) — სრული და გასწორებული

// ქართული კბილის ექიმები (ძირითადი)
export const dentists = [
  {
    id: 1,
    name: "გაბრიელ ჯანაშვილი",
    specialties: ["ორთოპედი", "ქირურგი"],
    experience: "5 წელი გამოცდილება",
    workingDays: ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "კვირა"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    id: 2,
    name: "თენგო შიმშილაშვილი",
    specialties: ["ორთოპედი", "ქირურგი", "თერაპევტი"],
    experience: "28 წელი გამოცდილება",
    workingDays: ["სამშაბათი", "ხუთშაბათი"],
    workingHours: "11:00 - 19:00",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    id: 3,
    name: "ანა პაჭკორია",
    specialties: ["თერაპევტი", "ქირურგი", "პაროდონტოლოგი"],
    experience: "5 წელი გამოცდილება",
    workingDays: ["ხუთშაბათი", "კვირა"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/Ana_patchkoria_3.jpg",
  },
  {
    id: 4,
    name: "მარიამ კობიაშვილი",
    specialties: ["თერაპევტი", "პაროდონტოლოგი"],
    experience: "5 წელი გამოცდილება",
    workingDays: ["ორშაბათი", "ოთხშაბათი", "პარასკევი"],
    workingHours: "10:00 - 20:00",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili2.jpeg",
  },
];

// ინგლისური კბილის ექიმები
export const enDentists = [
  {
    id: 1,
    name: "Dr. Gabriel Janashvili",
    specialties: ["Orthopedist", "Surgeon"],
    experience: "5 years of experience",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    id: 2,
    name: "Dr. Tengo Shimshilashvili",
    specialties: ["Orthopedist", "Surgeon", "Therapist"],
    experience: "28 years of experience",
    workingDays: ["Tuesday", "Thursday"],
    workingHours: "11:00 - 19:00",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    id: 3,
    name: "Dr. Ana Patchkoria",
    specialties: ["Therapist", "Surgeon", "Periodontist"],
    experience: "5 years of experience",
    workingDays: ["Thursday", "Sunday"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/Ana_patchkoria_3.jpg",
  },
  {
    id: 4,
    name: "Dr. Mariam Kobiashvili",
    specialties: ["Therapist", "Periodontist"],
    experience: "5 years of experience",
    workingDays: ["Monday", "Wednesday", "Friday"],
    workingHours: "10:00 - 20:00",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili2.jpeg",
  },
];

// რუსული კბილის ექიმები (გრამატიკა გასწორებულია)
export const ruDentists = [
  {
    id: 1,
    name: "Др. Габриэль Джанашвили",
    specialties: ["Ортопед", "Хирург"],
    experience: "5 года опыта",
    workingDays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Воскресенье"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    id: 2,
    name: "Др. Тенго Шимшилашвили",
    specialties: ["Ортопед", "Хирург", "Терапевт"],
    experience: "28 лет опыта",
    workingDays: ["Вторник", "Четверг"],
    workingHours: "11:00 - 19:00",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    id: 3,
    name: "Др. Ана Пачкория",
    specialties: ["Терапевт", "Хирург", "Пародонтолог"],
    experience: "5 года опыта",
    workingDays: ["Четверг", "Воскресенье"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/Ana_patchkoria_3.jpg",
  },
  {
    id: 4,
    name: "Др. Мариам Кобиашвили",
    specialties: ["Терапевт", "Пародонтолог"],
    experience: "3 лет опыта",
    workingDays: ["Понедельник", "Среда", "Пятница"],
    workingHours: "10:00 - 20:00",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili2.jpeg",
  },
];

// ებრაული კბილის ექიმები (ქალის ფორმები სადაც საჭიროა)
export const heDentists = [
  {
    id: 1,
    name: "ד״ר גבריאל ג'נשווילי",
    specialties: ["אורתופד", "מנתח"],
    experience: "5 שנות ניסיון",
    workingDays: ["יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום ראשון"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/gabis_surati2.jpg",
  },
  {
    id: 2,
    name: "ד״ר טנגו שימשילשווילי",
    specialties: ["אורתופד", "מנתח", "מטפל"],
    experience: "28 שנות ניסיון",
    workingDays: ["יום שלישי", "יום חמישי"],
    workingHours: "11:00 - 19:00",
    image: "/JC_Dental_Doctors/Tengo_shimshilashvili.jpeg",
  },
  {
    id: 3,
    name: "ד״ר אנה פצ'קוריה",
    specialties: ["מטפלת", "מנתחת", "פריודונטולוגית"],
    experience: "5 שנות ניסיון",
    workingDays: ["יום חמישי", "יום ראשון"],
    workingHours: "09:00 - 17:00",
    image: "/JC_Dental_Doctors/Ana_patchkoria_3.jpg",
  },
  {
    id: 4,
    name: "ד״ר מריאם קוביאשווילי",
    specialties: ["מטפלת", "פריודונטולוגית"],
    experience: "5 שנות ניסיון",
    workingDays: ["יום שני", "יום רביעי", "יום שישי"],
    workingHours: "10:00 - 20:00",
    image: "/JC_Dental_Doctors/Mariam_kobiashvili2.jpeg",
  },
];

// ყველა ენის კბილის ექიმები ერთ ობიექტში
export const dentistsByLanguage = {
  ka: dentists,
  en: enDentists,
  ru: ruDentists,
  he: heDentists,
};
