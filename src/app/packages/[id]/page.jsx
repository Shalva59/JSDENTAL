"use client"

import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Check,
  Star,
  ChevronRight,
  Phone,
  Calendar,
  Shield,
  Award,
  Users,
  Zap,
  Sparkles,
  Smile,
  SmileIcon as Tooth,
  Globe,
  ArrowLeft,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { useLanguage } from "../../../context/LanguageContext"
import { useState, useEffect } from "react"

// Language Switcher Component
const LanguageSwitcher = ({ currentLanguage, changeLanguage }) => {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "ka", name: "ქართული", flag: "🇬🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs">{currentLanguage.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  currentLanguage === lang.code ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } hover:bg-gray-50`}
                onClick={() => {
                  changeLanguage(lang.code)
                  setIsOpen(false)
                }}
                role="menuitem"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PackageDetailsPage(props) {
  const params = use(props.params)
  const { id } = params
  const { currentLanguage, translations, direction, changeLanguage } = useLanguage()
  const isRtl = direction === "rtl"
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  // WhatsApp contact number
  const whatsappNumber = "995500502062"

  // Function to join class names
  function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  // Complete translations object for all languages
  const allTranslations = {
    ka: {
      buttons: {
        backToPackages: "უკან დაბრუნება",
      },
      contact: {
        phone: "დაგვიკავშირდით",
      },
      choosePackage: "აირჩიე პაკეტი",
      startingFrom: "დაწყებული",
      perMonth: "/ თვეში",
      popularLabel: "პოპულარული",
      reviews: "შეფასება",
      viewDetails: "დეტალურად ნახვა",
      viewAllPackages: "ყველა პაკეტის ნახვა",
      packageDetails: {
        description: "პაკეტის აღწერა",
        whyChoose: "რატომ უნდა აირჩიოთ",
        includedFeatures: "პაკეტში შემავალი სერვისები",
        benefitsLabel: "უპირატესობები",
        benefitsDescription:
          "გაეცანით ამ პაკეტის უპირატესობებს და აღმოაჩინეთ, რატომ არის ის იდეალური არჩევანი თქვენთვის",
        otherPackages: "სხვა პაკეტები",
        readyToStart: "მზად ხართ დაიწყოთ?",
        ctaDescription: "აირჩიეთ ეს პაკეტი დღესვე და ისარგებლეთ მაღალი ხარისხის სტომატოლოგიური მომსახურებით",
        contactUs: "დაგვიკავშირდით",
      },
      packageHighlights: {
        title: "პაკეტის მთავარი უპირატესობები",
        description: "რატომ უნდა აირჩიოთ ეს პაკეტი",
      },
      testimonials: {
        title: "მომხმარებელთა შეფასებები",
        viewAll: "ყველა შეფასების ნახვა",
      },
      comparison: {
        title: "პაკეტების შედარება",
      },
      packages: {
        basic: {
          name: "საბაზისო",
          description: "ძირითადი მომსახურება",
          fullDescription:
            "საბაზისო პაკეტი შექმნილია მათთვის, ვისაც სურს ძირითა��ი სტომატოლოგიური მომსახურების მიღება ხელმისაწვდომ ფასად. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს, რენტგენის სურათებს და ფასდაკლებას სხვა პროცედურებზე.",
          features: [
            "2 პროფილაქტიკური ვიზიტი წელიწადში",
            "1 რენტგენის სურათი წელიწადში",
            "10% ფასდაკლება სხვა პროცედურებზე",
          ],
          extendedFeatures: [
            "პირის ღრუს სრული შემოწმება",
            "პროფესიონალური წმენდა",
            "კბილის ნადების და ქვების მოცილება",
            "ფტორირება",
            "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
            "კბილების მდგომარეობის შეფასება",
            "მკურნალობის გეგმის შედგენა",
          ],
          benefits: {
            scheduling: "მოქნილი განრიგი",
            schedulingDesc: "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
            prevention: "პრევენცია",
            preventionDesc: "რეგულარული შემოწმებები პრობლემების თავიდან ასაცილებლად",
            quality: "მაღალი ხარისხი",
            qualityDesc: "პროფესიონალური მომსახურება თანამედროვე აღჭურვილობით",
          },
        },
        full: {
          name: "სრული",
          description: "ოპტიმალური არჩევანი",
          fullDescription:
            "სრული პაკეტი წარმოადგენს ოპტიმალურ არჩევანს მათთვის, ვისაც სურს უფრო კომპლექსური სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მეტ პროფილაქტიკურ ვიზიტს, რენტგენის სურათებს და უფრო მაღალ ფასდაკლებას ესთეტიკურ პროცედურებზე.",
          features: [
            "3 პროფილაქტიკური ვიზიტი წელიწადში",
            "2 სრული რენტგენის სურათი წელიწადში",
            "15% ფასდაკლება ესთეტიკურ პროცედურებზე",
          ],
          extendedFeatures: [
            "პირის ღრუს სრული შემოწმება",
            "პროფესიონალური წმენდა",
            "კბილის ნადების და ქვების მოცილება",
            "ფტორირება",
            "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
            "კბილების მდგომარეობის შეფასება",
            "მკურნალობის გეგმის შედგენა",
            "პანორამული რენტგენი",
            "პირის ღრუს ფოტოგრაფია",
            "ესთეტიკური კონსულტაცია",
          ],
          benefits: {
            scheduling: "მოქნილი განრიგი",
            schedulingDesc: "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
            prevention: "გაძლიერებული პრევენცია",
            preventionDesc: "უფრო ხშირი შემოწმებები პრობლემების თავიდან ასაცილებლად",
            quality: "პრემიუმ მომსახურება",
            qualityDesc: "გაუმჯობესებული მომსახურება და პრიორიტეტული ჯავშანი",
          },
        },
        premium: {
          name: "პრემიუმ",
          description: "სრული მომსახურება",
          fullDescription:
            "პრემიუმ პაკეტი წარმოადგენს ყველაზე სრულყოფილ არჩევანს მათთვის, ვისაც სურს უმაღლესი ხარისხის სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მაქსიმალურ რაოდენობის პროფილაქტიკურ ვიზიტს, შეუზღუდავ რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას იმპლანტებზე.",
          features: [
            "4 პროფილაქტიკური ვიზიტი წელიწადში",
            "სრული რენტგენის სურათები საჭიროებისამებრ",
            "20% ფასდაკლება იმპლანტებზე",
          ],
          extendedFeatures: [
            "პირის ღრუს სრული შემოწმება",
            "პროფესიონალური წმენდა",
            "კბილის ნადების და ქვების მოცილება",
            "ფტორირება",
            "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
            "კბილების მდგომარეობის შეფასება",
            "მკურნალობის გეგმის შედგენა",
            "პანორამული რენტგენი",
            "პირის ღრუს ფოტოგრაფია",
            "ესთეტიკური კონსულტაცია",
            "3D სკანირება",
            "გადაუდებელი დახმარება 24/7",
            "პერსონალური სტომატოლოგი",
            "VIP მომსახურება",
          ],
          benefits: {
            scheduling: "პრიორიტეტული ჯავშანი",
            schedulingDesc: "უპირატესი წვდომა სასურველ დროს",
            prevention: "სრული პრევენცია",
            preventionDesc: "რეგულარული შემოწმებები და პრევენციული პროცედურები",
            emergency: "24/7 მხარდაჭერა",
            emergencyDesc: "გადაუდებელი დახმარება ნებისმიერ დროს",
          },
        },
        family: {
          name: "ოჯახური",
          description: "ოჯახისთვის (4 წევრამდე)",
          fullDescription:
            "ოჯახური პაკეტი შექმნილია ოჯახებისთვის, რომლებსაც სურთ მიიღონ მაღალი ხარისხის სტომატოლოგიური მომსახურება ყველა წევრისთვის. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს ოჯახის თითოეული წევრისთვის, რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას ყველა პროცედურაზე.",
          features: [
            "3 პროფილაქტიკური ვიზიტი წევრზე წელიწადში",
            "სრული რენტგენის სურათები საჭიროებისამებრ",
            "25% ფასდაკლება ყველა პროცედურაზე",
          ],
          extendedFeatures: [
            "პირის ღრუს სრული შემოწმება ყველა წევრისთვის",
            "პროფესიონალური წმენდა",
            "კბილის ნადების და ქვების მოცილება",
            "ფტორირება",
            "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
            "კბილების მდგომარეობის შეფასება",
            "მკურნალობის გეგმის შედგენა",
            "პანორამული რენტგენი",
            "პირის ღრუს ფოტოგრაფია",
            "ესთეტიკური კონსულტაცია",
            "ბავშვებისთვის სპეციალური პროცედურები",
            "ოჯახური ვიზიტები",
          ],
          benefits: {
            familyCare: "ოჯახური მზრუნველობა",
            familyCareDesc: "მომსახურება ოჯახის ყველა წევრისთვის",
            prevention: "პრევენცია ყველასთვის",
            preventionDesc: "რეგულარული შემოწმებები მთელი ოჯახისთვის",
            savings: "მნიშვნელოვანი დანაზოგი",
            savingsDesc: "ეკონომიური გადაწყვეტა ოჯახებისთვის",
          },
        },
      },
    },
    en: {
      buttons: {
        backToPackages: "Back",
      },
      contact: {
        phone: "Contact Us",
      },
      choosePackage: "Choose Package",
      startingFrom: "Starting from",
      perMonth: "/ month",
      popularLabel: "Popular",
      reviews: "reviews",
      viewDetails: "View Details",
      viewAllPackages: "View All Packages",
      packageDetails: {
        description: "Package Description",
        whyChoose: "Why Choose",
        includedFeatures: "Included Services",
        benefitsLabel: "Benefits",
        benefitsDescription: "Discover the benefits of this package and why it's the ideal choice for you",
        otherPackages: "Other Packages",
        readyToStart: "Ready to Start?",
        ctaDescription: "Choose this package today and enjoy high-quality dental services",
        contactUs: "Contact Us",
      },
      packageHighlights: {
        title: "Package Highlights",
        description: "Why you should choose this package",
      },
      testimonials: {
        title: "Customer Reviews",
        viewAll: "View All Reviews",
      },
      comparison: {
        title: "Package Comparison",
      },
      packages: {
        basic: {
          name: "Basic",
          description: "Essential Services",
          fullDescription:
            "The Basic package is designed for those who want to receive basic dental services at an affordable price. This package includes preventive visits, X-rays, and discounts on other procedures.",
          features: ["2 preventive visits per year", "1 X-ray per year", "10% discount on other procedures"],
          extendedFeatures: [
            "Complete oral examination",
            "Professional cleaning",
            "Removal of plaque and tartar",
            "Fluoridation",
            "Oral hygiene consultation",
            "Dental condition assessment",
            "Treatment plan development",
          ],
          benefits: {
            scheduling: "Flexible Scheduling",
            schedulingDesc: "Book appointments at your convenience",
            prevention: "Prevention",
            preventionDesc: "Regular check-ups to prevent problems",
            quality: "High Quality",
            qualityDesc: "Professional service with modern equipment",
          },
        },
        full: {
          name: "Full",
          description: "Optimal Choice",
          fullDescription:
            "The Full package is the optimal choice for those who want to receive more comprehensive dental services. This package includes more preventive visits, X-rays, and higher discounts on aesthetic procedures.",
          features: ["3 preventive visits per year", "2 full X-rays per year", "15% discount on aesthetic procedures"],
          extendedFeatures: [
            "Complete oral examination",
            "Professional cleaning",
            "Removal of plaque and tartar",
            "Fluoridation",
            "Oral hygiene consultation",
            "Dental condition assessment",
            "Treatment plan development",
            "Panoramic X-ray",
            "Oral photography",
            "Aesthetic consultation",
          ],
          benefits: {
            scheduling: "Flexible Scheduling",
            schedulingDesc: "Book appointments at your convenience",
            prevention: "Enhanced Prevention",
            preventionDesc: "More frequent check-ups to prevent problems",
            quality: "Premium Service",
            qualityDesc: "Improved service and priority booking",
          },
        },
        premium: {
          name: "Premium",
          description: "Complete Service",
          fullDescription:
            "The Premium package is the most comprehensive choice for those who want to receive the highest quality dental services. This package includes the maximum number of preventive visits, unlimited X-rays, and significant discounts on implants.",
          features: ["4 preventive visits per year", "Full X-rays as needed", "20% discount on implants"],
          extendedFeatures: [
            "Complete oral examination",
            "Professional cleaning",
            "Removal of plaque and tartar",
            "Fluoridation",
            "Oral hygiene consultation",
            "Dental condition assessment",
            "Treatment plan development",
            "Panoramic X-ray",
            "Oral photography",
            "Aesthetic consultation",
            "3D scanning",
            "Emergency assistance 24/7",
            "Personal dentist",
            "VIP service",
          ],
          benefits: {
            scheduling: "Priority Booking",
            schedulingDesc: "Preferred access to desired times",
            prevention: "Complete Prevention",
            preventionDesc: "Regular check-ups and preventive procedures",
            emergency: "24/7 Support",
            emergencyDesc: "Emergency assistance anytime",
          },
        },
        family: {
          name: "Family",
          description: "For families (up to 4 members)",
          fullDescription:
            "The Family package is designed for families who want to receive high-quality dental services for all members. This package includes preventive visits for each family member, X-rays, and significant discounts on all procedures.",
          features: [
            "3 preventive visits per member per year",
            "Full X-rays as needed",
            "25% discount on all procedures",
          ],
          extendedFeatures: [
            "Complete oral examination for all members",
            "Professional cleaning",
            "Removal of plaque and tartar",
            "Fluoridation",
            "Oral hygiene consultation",
            "Dental condition assessment",
            "Treatment plan development",
            "Panoramic X-ray",
            "Oral photography",
            "Aesthetic consultation",
            "Special procedures for children",
            "Family visits",
          ],
          benefits: {
            familyCare: "Family Care",
            familyCareDesc: "Service for all family members",
            prevention: "Prevention for Everyone",
            preventionDesc: "Regular check-ups for the whole family",
            savings: "Significant Savings",
            savingsDesc: "Economical solution for families",
          },
        },
      },
    },
    ru: {
      buttons: {
        backToPackages: "Назад",
      },
      contact: {
        phone: "Связаться с нами",
      },
      choosePackage: "Выбрать пакет",
      startingFrom: "Начиная с",
      perMonth: "/ месяц",
      popularLabel: "Популярный",
      reviews: "отзывов",
      viewDetails: "Подробнее",
      viewAllPackages: "Посмотреть все пакеты",
      packageDetails: {
        description: "Описание пакета",
        whyChoose: "Почему стоит выбрать",
        includedFeatures: "Включенные услуги",
        benefitsLabel: "Преимущества",
        benefitsDescription: "Узнайте о преимуществах этого пакета и почему он является идеальным выбором для вас",
        otherPackages: "Другие пакеты",
        readyToStart: "Готовы начать?",
        ctaDescription: "Выберите этот пакет сегодня и наслаждайтесь высококачественными стоматологическими услугами",
        contactUs: "Связаться с нами",
      },
      packageHighlights: {
        title: "Основные преимущества пакета",
        description: "Почему стоит выбрать этот пакет",
      },
      testimonials: {
        title: "Отзывы клиентов",
        viewAll: "Посмотреть все отзывы",
      },
      comparison: {
        title: "Сравнение пакетов",
      },
      packages: {
        basic: {
          name: "Базовый",
          description: "Основные услуги",
          fullDescription:
            "Базовый пакет разработан для тех, кто хочет получать основные стоматологические услуги по доступной цене. Этот пакет включает профилактические посещения, рентгеновские снимки и скидки на другие процедуры.",
          features: [
            "2 профилактических посещения в год",
            "1 рентгеновский снимок в год",
            "10% скидка на другие процедуры",
          ],
          extendedFeatures: [
            "Полный осмотр полости рта",
            "Профессиональная чистка",
            "Удаление зубного налета и камня",
            "Фторирование",
            "Консультация по гигиене полости рта",
            "Оценка состояния зубов",
            "Разработка плана лечения",
          ],
          benefits: {
            scheduling: "Гибкий график",
            schedulingDesc: "Записывайтесь на прием в удобное для вас время",
            prevention: "Профилактика",
            preventionDesc: "Регулярные проверки для предотвращения проблем",
            quality: "Высокое качество",
            qualityDesc: "Профессиональное обслуживание с современным оборудованием",
          },
        },
        full: {
          name: "Полный",
          description: "Оптимальный выбор",
          fullDescription:
            "Полный пакет является оптимальным выбором для тех, кто хочет получать более комплексные стоматологические услуги. Этот пакет включает больше профилактических посещений, рентгеновских снимков и более высокие скидки на эстетические процедуры.",
          features: [
            "3 профилактических посещения в год",
            "2 полных рентгеновских снимка в год",
            "15% скидка на эстетические процедуры",
          ],
          extendedFeatures: [
            "Полный осмотр полости рта",
            "Профессиональная чистка",
            "Удаление зубного налета и камня",
            "Фторирование",
            "Консультация по гигиене полости рта",
            "Оценка состояния зубов",
            "Разработка плана лечения",
            "Панорамный рентген",
            "Фотография полости рта",
            "Эстетическая консультация",
          ],
          benefits: {
            scheduling: "Гибкий график",
            schedulingDesc: "Записывайтесь на прием в удобное для вас время",
            prevention: "Усиленная профилактика",
            preventionDesc: "Более частые проверки для предотвращения проблем",
            quality: "Премиум обслуживание",
            qualityDesc: "Улучшенное обслуживание и приоритетная запись",
          },
        },
        premium: {
          name: "Премиум",
          description: "Полное обслуживание",
          fullDescription:
            "Премиум пакет является наиболее комплексным выбором для тех, кто хочет получать стоматологические услуги высочайшего качества. Этот пакет включает максимальное количество профилактических посещений, неограниченные рентгеновские снимки и значительные скидки на имплантаты.",
          features: [
            "4 профилактических посещения в год",
            "Полные рентгеновские снимки по мере необходимости",
            "20% скидка на имплантаты",
          ],
          extendedFeatures: [
            "Полный осмотр полости рта",
            "Профессиональная чистка",
            "Удаление зубного налета и камня",
            "Фторирование",
            "Консультация по гигиене полости рта",
            "Оценка состояния зубов",
            "Разработка плана лечения",
            "Панорамный рентген",
            "Фотография полости рта",
            "Эстетическая консультация",
            "3D сканирование",
            "Экстренная помощь 24/7",
            "Персональный стоматолог",
            "VIP обслуживание",
          ],
          benefits: {
            scheduling: "Приоритетная запись",
            schedulingDesc: "Предпочтительный доступ к желаемому времени",
            prevention: "Полная профилактика",
            preventionDesc: "Регулярные проверки и профилактические процедуры",
            emergency: "Поддержка 24/7",
            emergencyDesc: "Экстренная помощь в любое время",
          },
        },
        family: {
          name: "Семейный",
          description: "Для семей (до 4 человек)",
          fullDescription:
            "Семейный пакет разработан для семей, которые хотят получать высококачественные стоматологические услуги для всех членов. Этот пакет включает профилактические посещения для каждого члена семьи, рентгеновские снимки и значительные скидки на все процедуры.",
          features: [
            "3 профилактических посещения на человека в год",
            "Полные рентгеновские снимки по мере необходимости",
            "25% скидка на все процедуры",
          ],
          extendedFeatures: [
            "Полный осмотр полости рта для всех членов семьи",
            "Профессиональная чистка",
            "Удаление зубного налета и камня",
            "Фторирование",
            "Консультация по гигиене полости рта",
            "Оценка состояния зубов",
            "Разработка плана лечения",
            "Панорамный рентген",
            "Фотография полости рта",
            "Эстетическая консультация",
            "Специальные процедуры для детей",
            "Семейные посещения",
          ],
          benefits: {
            familyCare: "Семейная забота",
            familyCareDesc: "Обслуживание для всех членов семьи",
            prevention: "Профилактика для всех",
            preventionDesc: "Регулярные проверки для всей семьи",
            savings: "Значительная экономия",
            savingsDesc: "Экономичное решение для семей",
          },
        },
      },
    },
    he: {
      buttons: {
        backToPackages: "חזרה לחבילות",
      },
      contact: {
        phone: "צור קשר",
      },
      choosePackage: "בחר חבילה",
      startingFrom: "החל מ",
      perMonth: "/ לחודש",
      popularLabel: "פופולרי",
      reviews: "ביקורות",
      viewDetails: "פרטים נוספים",
      viewAllPackages: "צפה בכל החבילות",
      packageDetails: {
        description: "תיאור החבילה",
        whyChoose: "למה לבחור",
        includedFeatures: "שירותים כלולים",
        benefitsLabel: "יתרונות",
        benefitsDescription: "גלה את היתרונות של חבילה זו ומדוע היא הבחירה האידיאלית עבורך",
        otherPackages: "חבילות אחרות",
        readyToStart: "מוכן להתחיל?",
        ctaDescription: "בחר חבילה זו היום ותיהנה משירותי רפואת שיניים באיכות גבוהה",
        contactUs: "צור קשר",
      },
      packageHighlights: {
        title: "נקודות מרכזיות בחבילה",
        description: "למה כדאי לבחור בחבילה זו",
      },
      testimonials: {
        title: "ביקורות לקוחות",
        viewAll: "צפה בכל הביקורות",
      },
      comparison: {
        title: "השוואת חבילות",
      },
      packages: {
        basic: {
          name: "בסיסי",
          description: "שירותים חיוניים",
          fullDescription:
            "החבילה הבסיסית מיועדת לאלה שרוצים לקבל שירותי רפואת שיניים בסיסיים במחיר סביר. חבילה זו כוללת ביקורים מונעים, צילומי רנטגן והנחות על הליכים אחרים.",
          features: ["2 ביקורים מונעים בשנה", "צילום רנטגן אחד בשנה", "10% הנחה על הליכים אחרים"],
          extendedFeatures: [
            "בדיקה מקיפה של חלל הפה",
            "ניקוי מקצועי",
            "הסרת פלאק ואבנית",
            "פלואורידציה",
            "ייעוץ היגיינת הפה",
            "הערכת מצב השיניים",
            "פיתוח תוכנית טיפול",
          ],
          benefits: {
            scheduling: "לוח זמנים גמיש",
            schedulingDesc: "קבע תורים בזמן הנוח לך",
            prevention: "מניעה",
            preventionDesc: "בדיקות סדירות למניעת בעיות",
            quality: "איכות גבוהה",
            qualityDesc: "שירות מקצועי עם ציוד מודרני",
          },
        },
        full: {
          name: "מלא",
          description: "בחירה אופטימלית",
          fullDescription:
            "החבילה המלאה היא הבחירה האופטימלית עבור אלה שרוצים לקבל שירותי רפואת שיניים מקיפים יותר. חבילה זו כוללת יותר ביקורים מונעים, צילומי רנטגן והנחות גבוהות יותר על הליכים אסתטיים.",
          features: ["3 ביקורים מונעים בשנה", "2 צילומי רנטגן מלאים בשנה", "15% הנחה על הליכים אסתטיים"],
          extendedFeatures: [
            "בדיקה מקיפה של חלל הפה",
            "ניקוי מקצועי",
            "הסרת פלאק ואבנית",
            "פלואורידציה",
            "ייעוץ היגיינת הפה",
            "הערכת מצב השיניים",
            "פיתוח תוכנית טיפול",
            "צילום פנורמי",
            "צילום חלל הפה",
            "ייעוץ אסתטי",
          ],
          benefits: {
            scheduling: "לוח זמנים גמיש",
            schedulingDesc: "קבע תורים בזמן הנוח לך",
            prevention: "מניעה מוגברת",
            preventionDesc: "בדיקות תכופות יותר למניעת בעיות",
            quality: "שירות פרימיום",
            qualityDesc: "שירות משופר והזמנה בעדיפות",
          },
        },
        premium: {
          name: "פרימיום",
          description: "שירות מלא",
          fullDescription:
            "חבילת הפרימיום היא הבחירה המקיפה ביותר עבור אלה שרוצים לקבל שירותי רפואת שיניים באיכות הגבוהה ביותר. חבילה זו כוללת את המספר המרבי של ביקורים מונעים, צילומי רנטגן ללא הגבלה והנחות משמעותיות על שתלים.",
          features: ["4 ביקורים מונעים בשנה", "צילומי רנטגן מלאים לפי הצורך", "20% הנחה על שתלים"],
          extendedFeatures: [
            "בדיקה מקיפה של חלל הפה",
            "ניקוי מקצועי",
            "הסרת פלאק ואבנית",
            "פלואורידציה",
            "ייעוץ היגיינת הפה",
            "הערכת מצב השיניים",
            "פיתוח תוכנית טיפול",
            "צילום פנורמי",
            "צילום חלל הפה",
            "ייעוץ אסתטי",
            "סריקת תלת מימד",
            "סיוע חירום 24/7",
            "רופא שיניים אישי",
            "שירות VIP",
          ],
          benefits: {
            scheduling: "הזמנה בעדיפות",
            schedulingDesc: "גישה מועדפת לזמנים הרצויים",
            prevention: "מניעה מלאה",
            preventionDesc: "בדיקות סדירות והליכים מונעים",
            emergency: "תמיכה 24/7",
            emergencyDesc: "סיוע חירום בכל עת",
          },
        },
        family: {
          name: "משפחתי",
          description: "למשפחות (עד 4 חברים)",
          fullDescription:
            "החבילה המשפחתית מיועדת למשפחות שרוצות לקבל שירותי רפואת שיניים באיכות גבוהה לכל החברים. חבילה זו כוללת ביקורים מונעים לכל בן משפחה, צילומי רנטגן והנחות משמעותיות על כל ההליכים.",
          features: ["3 ביקורים מונעים לאדם בשנה", "צילומי רנטגן מלאים לפי הצורך", "25% הנחה על כל ההליכים"],
          extendedFeatures: [
            "בדיקה מקיפה של חלל הפה לכל החברים",
            "ניקוי מקצועי",
            "הסרת פלאק ואבנית",
            "פלואורידציה",
            "ייעוץ היגיינת הפה",
            "הערכת מצב השיניים",
            "פיתוח תוכנית טיפול",
            "צילום פנורמי",
            "צילום חלל הפה",
            "ייעוץ אסתטי",
            "הליכים מיוחדים לילדים",
            "ביקורים משפחתיים",
          ],
          benefits: {
            familyCare: "טיפול משפחתי",
            familyCareDesc: "שירות לכל בני המשפחה",
            prevention: "מניעה לכולם",
            preventionDesc: "בדיקות סדירות לכל המשפחה",
            savings: "חיסכון משמעותי",
            savingsDesc: "פתרון חסכוני למשפחות",
          },
        },
      },
    },
  }

  // Package data
  const packages = [
    {
      id: "basic",
      name: allTranslations[currentLanguage]?.packages?.basic?.name || "საბაზისო",
      price: "50₾",
      description: allTranslations[currentLanguage]?.packages?.basic?.description || "ძირითადი მომსახურება",
      fullDescription:
        allTranslations[currentLanguage]?.packages?.basic?.fullDescription ||
        "საბაზისო პაკეტი შექმნილია მათთვის, ვისაც სურს ძირითადი სტომატოლოგიური მომსახურების მიღება ხელმისაწვდომ ფასად. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს, რენტგენის სურათებს და ფასდაკლებას სხვა პროცედურებზე.",
      features: allTranslations[currentLanguage]?.packages?.basic?.features || [
        "2 პროფილაქტიკური ვიზიტი წელიწადში",
        "1 რენტგენის სურათი წელიწადში",
        "10% ფასდაკლება სხვა პროცედურებზე",
      ],
      extendedFeatures: allTranslations[currentLanguage]?.packages?.basic?.extendedFeatures || [
        "პირის ღრუს სრული შემოწმება",
        "პროფესიონალური წმენდა",
        "კბილის ნადების და ქვების მოცილება",
        "ფტორირება",
        "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
        "კბილების მდგომარეობის შეფასება",
        "მკურნალობის გეგმის შედგენა",
      ],
      benefits: [
        {
          icon: <Calendar className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.basic?.benefits?.scheduling || "მოქნილი განრიგი",
          description:
            allTranslations[currentLanguage]?.packages?.basic?.benefits?.schedulingDesc ||
            "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.basic?.benefits?.prevention || "პრევენცია",
          description:
            allTranslations[currentLanguage]?.packages?.basic?.benefits?.preventionDesc ||
            "რეგულარული შემოწმებები პრობლემების თავიდან ასაცილებლად",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.basic?.benefits?.quality || "მაღალი ხარისხი",
          description:
            allTranslations[currentLanguage]?.packages?.basic?.benefits?.qualityDesc ||
            "პროფესიონალური მომსახურება თანამედროვე აღჭურვილობით",
        },
      ],
      color: "#3B82F6",
      gradient: "from-blue-500 to-blue-600",
      lightGradient: "from-blue-50 to-blue-100",
      bgColor: "#EFF6FF",
      accentColor: "#2563EB",
      textColor: "#1E40AF",
      popular: false,
      icon: <Shield className="h-10 w-10" />,
    },
    {
      id: "full",
      name: allTranslations[currentLanguage]?.packages?.full?.name || "სრული",
      price: "80₾",
      description: allTranslations[currentLanguage]?.packages?.full?.description || "ოპტიმალური არჩევანი",
      fullDescription:
        allTranslations[currentLanguage]?.packages?.full?.fullDescription ||
        "სრული პაკეტი წარმოადგენს ოპტიმალურ არჩევანს მათთვის, ვისაც სურს უფრო კომპლექსური სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მეტ პროფილაქტიკურ ვიზიტს, რენტგენის სურათებს და უფრო მაღალ ფასდაკლებას ესთეტიკურ პროცედურებზე.",
      features: allTranslations[currentLanguage]?.packages?.full?.features || [
        "3 პროფილაქტიკური ვიზიტი წელიწადში",
        "2 სრული რენტგენის სურათი წელიწადში",
        "15% ფასდაკლება ესთეტიკურ პროცედურებზე",
      ],
      extendedFeatures: allTranslations[currentLanguage]?.packages?.full?.extendedFeatures || [
        "პირის ღრუს სრული შემოწმება",
        "პროფესიონალური წმენდა",
        "კბილის ნადების და ქვების მოცილება",
        "ფტორირება",
        "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
        "კბილების მდგომარეობის შეფასება",
        "მკურნალობის გეგმის შედგენა",
        "პანორამული რენტგენი",
        "პირის ღრუს ფოტოგრაფია",
        "ესთეტიკური კონსულტაცია",
      ],
      benefits: [
        {
          icon: <Calendar className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.full?.benefits?.scheduling || "მოქნილი განრიგი",
          description:
            allTranslations[currentLanguage]?.packages?.full?.benefits?.schedulingDesc ||
            "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.full?.benefits?.prevention || "გაძლიერებული პრევენცია",
          description:
            allTranslations[currentLanguage]?.packages?.full?.benefits?.preventionDesc ||
            "უფრო ხშირი შემოწმებები პრობლემების თავიდან ასაცილებლად",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.full?.benefits?.quality || "პრემიუმ მომსახურება",
          description:
            allTranslations[currentLanguage]?.packages?.full?.benefits?.qualityDesc ||
            "გაუმჯობესებული მომსახურება და პრიორიტეტული ჯავშანი",
        },
      ],
      color: "#8B5CF6",
      gradient: "from-violet-500 to-violet-600",
      lightGradient: "from-violet-50 to-violet-100",
      bgColor: "#F5F3FF",
      accentColor: "#7C3AED",
      textColor: "#5B21B6",
      popular: true,
      icon: <Zap className="h-10 w-10" />,
    },
    {
      id: "premium",
      name: allTranslations[currentLanguage]?.packages?.premium?.name || "პრემიუმ",
      price: "120₾",
      description: allTranslations[currentLanguage]?.packages?.premium?.description || "სრული მომსახურება",
      fullDescription:
        allTranslations[currentLanguage]?.packages?.premium?.fullDescription ||
        "პრემიუმ პაკეტი წარმოადგენს ყველაზე სრულყოფილ არჩევანს მათთვის, ვისაც სურს უმაღლესი ხარისხის სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მაქსიმალურ რაოდენობის პროფილაქტიკურ ვიზიტს, შეუზღუდავ რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას იმპლანტებზე.",
      features: allTranslations[currentLanguage]?.packages?.premium?.features || [
        "4 პროფილაქტიკური ვიზიტი წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "20% ფასდაკლება იმპლანტებზე",
      ],
      extendedFeatures: allTranslations[currentLanguage]?.packages?.premium?.extendedFeatures || [
        "პირის ღრუს სრული შემოწმება",
        "პროფესიონალური წმენდა",
        "კბილის ნადების და ქვების მოცილება",
        "ფტორირება",
        "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
        "კბილების მდგომარეობის შეფასება",
        "მკურნალობის გეგმის შედგენა",
        "პანორამული რენტგენი",
        "პირის ღრუს ფოტოგრაფია",
        "ესთეტიკური კონსულტაცია",
        "3D სკანირება",
        "გადაუდებელი დახმარება 24/7",
        "პერსონალური სტომატოლოგი",
        "VIP მომსახურება",
      ],
      benefits: [
        {
          icon: <Calendar className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.premium?.benefits?.scheduling || "პრიორიტეტული ჯავშანი",
          description:
            allTranslations[currentLanguage]?.packages?.premium?.benefits?.schedulingDesc ||
            "უპირატესი წვდომა სასურველ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.premium?.benefits?.prevention || "სრული პრევენცია",
          description:
            allTranslations[currentLanguage]?.packages?.premium?.benefits?.preventionDesc ||
            "რეგულარული შემოწმებები და პრევენციული პროცედურები",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.premium?.benefits?.emergency || "24/7 მხარდაჭერა",
          description:
            allTranslations[currentLanguage]?.packages?.premium?.benefits?.emergencyDesc ||
            "გადაუდებელი დახმარება ნებისმიერ დროს",
        },
      ],
      color: "#06B6D4",
      gradient: "from-cyan-500 to-cyan-600",
      lightGradient: "from-cyan-50 to-cyan-100",
      bgColor: "#ECFEFF",
      accentColor: "#0891B2",
      textColor: "#0E7490",
      popular: false,
      icon: <Sparkles className="h-10 w-10" />,
    },
    {
      id: "family",
      name: allTranslations[currentLanguage]?.packages?.family?.name || "ოჯახური",
      price: "200₾",
      description: allTranslations[currentLanguage]?.packages?.family?.description || "ოჯახისთვის (4 წევრამდე)",
      fullDescription:
        allTranslations[currentLanguage]?.packages?.family?.fullDescription ||
        "ოჯახური პაკეტი შექმნილია ოჯახებისთვის, რომლებსაც სურთ მიიღონ მაღალი ხარისხის სტომატოლოგიური მომსახურება ყველა წევრისთვის. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს ოჯახის თითოეული წევრისთვის, რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას ყველა პროცედურაზე.",
      features: allTranslations[currentLanguage]?.packages?.family?.features || [
        "3 პროფილაქტიკური ვიზიტი წევრზე წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "25% ფასდაკლება ყველა პროცედურაზე",
      ],
      extendedFeatures: allTranslations[currentLanguage]?.packages?.family?.extendedFeatures || [
        "პირის ღრუს სრული შემოწმება ყველა წევრისთვის",
        "პროფესიონალური წმენდა",
        "კბილის ნადების და ქვების მოცილება",
        "ფტორირება",
        "კონსულტაცია პირის ღრუს ჰიგიენის შესახებ",
        "კბილების მდგომარეობის შეფასება",
        "მკურნალობის გეგმის შედგენა",
        "პანორამული რენტგენი",
        "პირის ღრუს ფოტოგრაფია",
        "ესთეტიკური კონსულტაცია",
        "ბავშვებისთვის სპეციალური პროცედურები",
        "ოჯახური ვიზიტები",
      ],
      benefits: [
        {
          icon: <Calendar className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.family?.benefits?.familyCare || "ოჯახური მზრუნველობა",
          description:
            allTranslations[currentLanguage]?.packages?.family?.benefits?.familyCareDesc ||
            "მომსახურება ოჯახის ყველა წევრისთვის",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.family?.benefits?.prevention || "პრევენცია ყველასთვის",
          description:
            allTranslations[currentLanguage]?.packages?.family?.benefits?.preventionDesc ||
            "რეგულარული შემოწმებები მთელი ოჯახისთვის",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: allTranslations[currentLanguage]?.packages?.family?.benefits?.savings || "მნიშვნელოვანი დანაზოგი",
          description:
            allTranslations[currentLanguage]?.packages?.family?.benefits?.savingsDesc ||
            "ეკონომიური გადაწყვეტა ოჯახებისთვის",
        },
      ],
      color: "#10B981",
      gradient: "from-emerald-500 to-emerald-600",
      lightGradient: "from-emerald-50 to-emerald-100",
      bgColor: "#ECFDF5",
      accentColor: "#059669",
      textColor: "#047857",
      popular: false,
      icon: <Users className="h-10 w-10" />,
    },
  ]

  // Find package by ID
  const packageData = packages.find((pkg) => pkg.id === id) || packages[0]

  // Other packages
  const otherPackages = packages.filter((pkg) => pkg.id !== id).slice(0, 3)

  // Animation effects
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Testimonials
  const testimonials = [
    {
      name:
        currentLanguage === "ka"
          ? "ნინო მ."
          : currentLanguage === "en"
            ? "Nina M."
            : currentLanguage === "ru"
              ? "Нина М."
              : "נינה מ.",
      rating: 5,
      text:
        currentLanguage === "ka"
          ? "ძალიან კმაყოფილი ვარ ამ პაკეტით. პროფესიონალური მომსახურება და ყურადღებიანი პერსონალი."
          : currentLanguage === "en"
            ? "I'm very satisfied with this package. Professional service and attentive staff."
            : currentLanguage === "ru"
              ? "Я очень довольна этим пакетом. Профессиональное обслуживание и внимательный персонал."
              : "אני מאוד מרוצה מחבילה זו. שירות מקצועי וצוות קשוב.",
    },
    {
      name:
        currentLanguage === "ka"
          ? "გიორგი კ."
          : currentLanguage === "en"
            ? "George K."
            : currentLanguage === "ru"
              ? "Георгий К."
              : "ג'ורג' ק.",
      rating: 5,
      text:
        currentLanguage === "ka"
          ? "საუკეთესო არჩევანი ჩემთვის. ფასი სრულიად შეესაბამება ხარისხს."
          : currentLanguage === "en"
            ? "The best choice for me. The price fully matches the quality."
            : currentLanguage === "ru"
              ? "Лучший выбор для меня. Цена полностью соответствует качеству."
              : "הבחירה הטובה ביותר עבורי. המחיר תואם לחלוטין את האיכות.",
    },
    {
      name:
        currentLanguage === "ka"
          ? "თამარ დ."
          : currentLanguage === "en"
            ? "Tamar D."
            : currentLanguage === "ru"
              ? "Тамар Д."
              : "תמר ד.",
      rating: 4,
      text:
        currentLanguage === "ka"
          ? "კარგი პაკეტია, განსაკუთრებით მომეწონა პროფილაქტიკური ვიზიტები."
          : currentLanguage === "en"
            ? "Good package, I especially liked the preventive visits."
            : currentLanguage === "ru"
              ? "Хороший пакет, особенно понравились профилактические визиты."
              : "חבילה טובה, במיוחד אהבתי את הביקורים המונעים.",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuOpen) {
        setLanguageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [languageMenuOpen])

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${packageData.gradient} py-16`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className={`h-4 w-4 ${isRtl ? "ml-1 rotate-180" : "mr-1"}`} />
              <span>{allTranslations[currentLanguage]?.buttons?.backToPackages || "უკან დაბრუნება"}</span>
            </Button>
            {/* <LanguageSwitcher currentLanguage={currentLanguage} changeLanguage={changeLanguage} /> */}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: packageData.accentColor }}
                  >
                    {packageData.icon}
                  </div>
                  {packageData.popular && (
                    <span className="px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-sm font-medium">
                      {allTranslations[currentLanguage]?.popularLabel || "პოპულარული"}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{packageData.name}</h1>
                <p className="text-xl text-white/90 mb-6">{packageData.description}</p>
                <div className="flex items-center gap-1 text-amber-300 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-300" />
                  ))}
                  <span className="text-white/80 ml-2">
                    5.0 (120+ {allTranslations[currentLanguage]?.reviews || "შეფასება"})
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 cursor-pointer hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all"
                    style={{ color: "black" }}
                  >
                    {allTranslations[currentLanguage]?.choosePackage || "აირჩიე პაკეტი"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full flex"
                    onClick={() => window.open(`https://wa.me/${whatsappNumber}`, "_blank")}
                  >
                    <Phone className={`h-5 w-5 ${isRtl ? "ml-2 mt-1" : "mt-1 mr-2"}`} />
                    {allTranslations[currentLanguage]?.packageDetails?.contactUs || "დაგვიკავშირდით"}
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30"
              >
                <div className="flex justify-between items-baseline mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-1">
                      {allTranslations[currentLanguage]?.startingFrom || "დაწყებული"}
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-white">{packageData.price}</span>
                      <span className="text-white/80 ml-1">
                        {allTranslations[currentLanguage]?.perMonth || "/ თვეში"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">{packageData.name}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {packageData.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      </div>
                      <p className={`${isRtl ? "mr-3" : "ml-3"} text-white`}>{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-8">
            {/* Package Description */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {allTranslations[currentLanguage]?.packageDetails?.description || "პაკეტის აღწერა"}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{packageData.fullDescription}</p>
              </div>

              {/* Visual Element Below Description */}
              <div
                className={`mt-8 bg-gradient-to-r ${packageData.lightGradient} p-6 rounded-2xl relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: packageData.accentColor }}
                    >
                      <Smile className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: packageData.textColor }}>
                      {allTranslations[currentLanguage]?.packageDetails?.whyChoose || "რატომ უნდა აირჩიოთ"}{" "}
                      {packageData.name}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {allTranslations[currentLanguage]?.packageDetails?.benefitsDescription ||
                      "გაეცანით ამ პაკეტის უპირატესობებს და აღმოაჩინეთ, რატომ არის ის იდეალური არჩევანი თქვენთვის"}
                  </p>
                </div>
              </div>
            </div>

            {/* Included Services */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {allTranslations[currentLanguage]?.packageDetails?.includedFeatures || "პაკეტში შემავალი სერვისები"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageData.extendedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start p-4 rounded-xl transition-all hover:shadow-md"
                    style={{ backgroundColor: packageData.bgColor }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: packageData.accentColor }}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                    </div>
                    <p className={`${isRtl ? "mr-3" : "ml-3"} text-gray-700 font-medium`}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {allTranslations[currentLanguage]?.packageDetails?.benefitsLabel || "უპირატესობები"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packageData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: packageData.accentColor }}
                    ></div>
                    <div className="mb-4 p-3 rounded-xl inline-block" style={{ backgroundColor: packageData.bgColor }}>
                      <div className="text-white" style={{ color: packageData.accentColor }}>
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {allTranslations[currentLanguage]?.testimonials?.title || "მომხმარებელთა შეფასებები"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: packageData.accentColor }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center flex justify-center items-center content-center">
                <Button
                  variant="outline"
                  className="rounded-full flex"
                  style={{ color: packageData.accentColor, borderColor: packageData.accentColor }}
                >
                  {allTranslations[currentLanguage]?.testimonials?.viewAll || "ყველა შეფასების ნახვა"}
                  <ChevronRight className={`h-4 w-4 ${isRtl ? "mr-1 mt-1 rotate-180" : "ml-1 mt-1"}`} />
                </Button>
              </div>
            </div>

            {/* Comparison Table - Card Style */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {allTranslations[currentLanguage]?.comparison?.title || "პაკეტების შედარება"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl shadow-lg border ${pkg.id === id ? "border-2" : "border-gray-100"} p-6`}
                    style={pkg.id === id ? { borderColor: pkg.accentColor } : {}}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: pkg.accentColor }}
                      >
                        {pkg.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: pkg.textColor }}>
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-gray-500">{pkg.description}</p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold" style={{ color: pkg.textColor }}>
                          {pkg.price}
                        </span>
                        <span className="text-gray-500 ml-1 text-sm">
                          {allTranslations[currentLanguage]?.perMonth || "/ თვეში"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: pkg.accentColor }}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                          </div>
                          <p className={`${isRtl ? "mr-3" : "ml-3"} text-gray-600 text-sm`}>{feature}</p>
                        </div>
                      ))}
                    </div>

                    {pkg.id !== id && (
                      <div className="mt-6">
                        <Link href={`/packages/${pkg.id}`}>
                          <Button
                            variant="outline"
                            className="w-full"
                            style={{ borderColor: pkg.accentColor, color: pkg.textColor }}
                          >
                            {allTranslations[currentLanguage]?.viewDetails || "დეტალურად ნახვა"}
                          </Button>
                        </Link>
                      </div>
                    )}

                    {pkg.id === id && (
                      <div className="mt-6">
                        <Button
                          className="w-full text-white font-medium"
                          style={{ backgroundColor: pkg.accentColor, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        >
                          {allTranslations[currentLanguage]?.choosePackage || "აირჩიე პაკეტი"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking and Other Packages */}
          <div className="lg:col-span-4">
            {/* Package Main Benefits */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                <div className="p-1">
                  <div className={`p-6 rounded-xl bg-gradient-to-r ${packageData.lightGradient}`}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: packageData.textColor }}>
                      {allTranslations[currentLanguage]?.packageHighlights?.title || "პაკეტის მთავარი უპირატესობები"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {allTranslations[currentLanguage]?.packageHighlights?.description ||
                        "რატომ უნდა აირჩიოთ ეს პაკეტი"}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {packageData.extendedFeatures.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: packageData.accentColor }}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                        <p className={`${isRtl ? "mr-3" : "ml-3"} text-gray-700`}>{feature}</p>
                      </div>
                    ))}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold" style={{ color: packageData.textColor }}>
                            {packageData.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            {allTranslations[currentLanguage]?.perMonth || "/ თვეში"}
                          </p>
                        </div>
                        <Button
                          className="text-white font-medium"
                          style={{ backgroundColor: packageData.accentColor, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        >
                          {allTranslations[currentLanguage]?.choosePackage || "აირჩიე პაკეტი"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Packages */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">
                    {allTranslations[currentLanguage]?.packageDetails?.otherPackages || "სხვა პაკეტები"}
                  </h3>
                  <div className="space-y-4">
                    {otherPackages.map((pkg, index) => (
                      <Link key={index} href={`/packages/${pkg.id}`}>
                        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: pkg.accentColor }}
                          >
                            {pkg.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                            <p className="text-sm text-gray-500">
                              {pkg.price} {allTranslations[currentLanguage]?.perMonth || "/ თვეში"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/pages/price_page"
                      className="text-sm font-medium hover:underline"
                      style={{ color: packageData.textColor }}
                    >
                      {allTranslations[currentLanguage]?.viewAllPackages || "ყველა პაკეტის ნახვა"} →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-8">
                <div
                  className={`bg-gradient-to-br ${packageData.lightGradient} p-6 rounded-2xl relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/30 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/30 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: packageData.accentColor }}
                    >
                      <Tooth className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg" style={{ color: packageData.textColor }}>
                        {allTranslations[currentLanguage]?.packageDetails?.readyToStart || "მზად ხართ დაიწყოთ?"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {allTranslations[currentLanguage]?.packageDetails?.ctaDescription ||
                          "აირჩიეთ ეს პაკეტი დღესვე და ისარგებლეთ მაღალი ხარისხის სტომატოლოგიური მომსახურებით"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
