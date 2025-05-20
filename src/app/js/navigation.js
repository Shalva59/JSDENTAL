// export const products = [
//   { name: 'მთავარი', url: '/' },
//   { name: 'ჩვენს შესახებ', url: '/pages/about' },
//   { name: 'სერვისები', url: '/pages/dentalservise' },
//   { name: 'ექიმები', url: '/pages/doctorspage' },
//   { name: 'გალერეა', url: '/pages/gallery' },
//   { name: 'კონტაქტი', url: '/pages/contact' }
// ];

// ენების იმპორტი
import { en } from "../../languages/en"
import { ka } from "../../languages/ka"
import { ru } from "../../languages/ru"
import { he } from "../../languages/he"

// ძირითადი ნავიგაცია (ქართულად)
export const products = [
  { name: "მთავარი", url: "/" },
  { name: "ჩვენს შესახებ", url: "/pages/about" },
  { name: "სერვისები", url: "/pages/dentalservise" },
  { name: "ექიმები", url: "/pages/doctorspage" },
  { name: "ჯავშნები", url: "/appointments" }, // Add this line
  { name: "გალერეა", url: "/pages/gallery" },
  { name: "კონტაქტი", url: "/pages/contact" },
]

// ინგლისური ნავიგაცია
export const enProducts = [
  { name: en.nav.home, url: "/" },
  { name: en.nav.about, url: "/pages/about" },
  { name: en.nav.services, url: "/pages/dentalservise" },
  { name: en.nav.doctors || "Doctors", url: "/pages/doctorspage" },
  { name: "Appointments", url: "/appointments" }, // Add this line
  { name: en.nav.gallery || "Gallery", url: "/pages/gallery" },
  { name: en.nav.contact, url: "/pages/contact" },
]

// რუსული ნავიგაცია
export const ruProducts = [
  { name: ru.nav.home, url: "/" },
  { name: ru.nav.about, url: "/pages/about" },
  { name: ru.nav.services, url: "/pages/dentalservise" },
  { name: ru.nav.doctors || "Врачи", url: "/pages/doctorspage" },
  { name: "Записи", url: "/appointments" }, // Add this line
  { name: ru.nav.gallery || "Галерея", url: "/pages/gallery" },
  { name: ru.nav.contact, url: "/pages/contact" },
]

// ებრაული ნავიგაცია
export const heProducts = [
  { name: he.nav.home, url: "/" },
  { name: he.nav.about, url: "/pages/about" },
  { name: he.nav.services, url: "/pages/dentalservise" },
  { name: he.nav.doctors || "רופאים", url: "/pages/doctorspage" },
  { name: "תורים", url: "/appointments" }, // Add this line
  { name: he.nav.gallery || "גלריה", url: "/pages/gallery" },
  { name: he.nav.contact, url: "/pages/contact" },
]

// ყველა ენის ნავიგაცია ერთ ობიექტში
export const navigationByLanguage = {
  ka: products,
  en: enProducts,
  ru: ruProducts,
  he: heProducts,
}

