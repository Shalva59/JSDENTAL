"use client"

import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
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
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { useLanguage } from "../../../context/LanguageContext"
import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

// ენის გადამრთველის კომპონენტი
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

  // cn ფუნქცია კლასების გასაერთიანებლად
  function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  // პაკეტების მონაცემები
  const packages = [
    {
      id: "basic",
      name: translations?.packages?.basic?.name || "საბაზისო",
      price: "50₾",
      description: translations?.packages?.basic?.description || "ძირითადი მომსახურება",
      fullDescription:
        translations?.packages?.basic?.fullDescription ||
        "საბაზისო პაკეტი შექმნილია მათთვის, ვისაც სურს ძირითადი სტომატოლოგიური მომსახურების მიღება ხელმისაწვდომ ფასად. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს, რენტგენის სურათებს და ფასდაკლებას სხვა პროცედურებზე.",
      features: translations?.packages?.basic?.features || [
        "2 პროფილაქტიკური ვიზიტი წელიწადში",
        "1 რენტგენის სურათი წელიწადში",
        "10% ფასდაკლება სხვა პროცედურებზე",
      ],
      extendedFeatures: translations?.packages?.basic?.extendedFeatures || [
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
          title: translations?.packages?.basic?.benefits?.scheduling || "მოქნილი განრიგი",
          description:
            translations?.packages?.basic?.benefits?.schedulingDesc || "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: translations?.packages?.basic?.benefits?.prevention || "პრევენცია",
          description:
            translations?.packages?.basic?.benefits?.preventionDesc ||
            "რეგულარული შემოწმებები პრობლემების თავიდან ასაცილებლად",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: translations?.packages?.basic?.benefits?.quality || "მაღალი ხარისხი",
          description:
            translations?.packages?.basic?.benefits?.qualityDesc ||
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
      name: translations?.packages?.full?.name || "სრული",
      price: "80₾",
      description: translations?.packages?.full?.description || "ოპტიმალური არჩევანი",
      fullDescription:
        translations?.packages?.full?.fullDescription ||
        "სრული პაკეტი წარმოადგენს ოპტიმალურ არჩევანს მათთვის, ვისაც სურს უფრო კომპლექსური სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მეტ პროფილაქტიკურ ვიზიტს, რენტგენის სურათებს და უფრო მაღალ ფასდაკლებას ესთეტიკურ პროცედურებზე.",
      features: translations?.packages?.full?.features || [
        "3 პროფილაქტიკური ვიზიტი წელიწადში",
        "2 სრული რენტგენის სურათი წელიწადში",
        "15% ფასდაკლება ესთეტიკურ პროცედურებზე",
      ],
      extendedFeatures: translations?.packages?.full?.extendedFeatures || [
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
          title: translations?.packages?.full?.benefits?.scheduling || "მოქნილი განრიგი",
          description:
            translations?.packages?.full?.benefits?.schedulingDesc || "დაჯავშნეთ ვიზიტი თქვენთვის მოსახერხებელ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: translations?.packages?.full?.benefits?.prevention || "გაძლიერებული პრევენცია",
          description:
            translations?.packages?.full?.benefits?.preventionDesc ||
            "უფრო ხშირი შემოწმებები პრობლემების თავიდან ასაცილებლად",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: translations?.packages?.full?.benefits?.quality || "პრემიუმ მომსახურება",
          description:
            translations?.packages?.full?.benefits?.qualityDesc || "გაუმჯობესებული მომსახურება და პრიორიტეტული ჯავშანი",
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
      name: translations?.packages?.premium?.name || "პრემიუმ",
      price: "120₾",
      description: translations?.packages?.premium?.description || "სრული მომსახურება",
      fullDescription:
        translations?.packages?.premium?.fullDescription ||
        "პრემიუმ პაკეტი წარმოადგენს ყველაზე სრულყოფილ არჩევანს მათთვის, ვისაც სურს უმაღლესი ხარისხის სტომატოლოგიური მომსახურების მიღება. ეს პაკეტი მოიცავს მაქსიმალურ რაოდენობის პროფილაქტიკურ ვიზიტს, შეუზღუდავ რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას იმპლანტებზე.",
      features: translations?.packages?.premium?.features || [
        "4 პროფილაქტიკური ვიზიტი წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "20% ფასდაკლება იმპლანტებზე",
      ],
      extendedFeatures: translations?.packages?.premium?.extendedFeatures || [
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
          title: translations?.packages?.premium?.benefits?.scheduling || "პრიორიტეტული ჯავშანი",
          description: translations?.packages?.premium?.benefits?.schedulingDesc || "უპირატესი წვდომა სასურველ დროს",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: translations?.packages?.premium?.benefits?.prevention || "სრული პრევენცია",
          description:
            translations?.packages?.premium?.benefits?.preventionDesc ||
            "რეგულარული შემოწმებები და პრევენციული პროცედურები",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: translations?.packages?.premium?.benefits?.emergency || "24/7 მხარდაჭერა",
          description:
            translations?.packages?.premium?.benefits?.emergencyDesc || "გადაუდებელი დახმარება ნებისმიერ დროს",
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
      name: translations?.packages?.family?.name || "ოჯახური",
      price: "200₾",
      description: translations?.packages?.family?.description || "ოჯახისთვის (4 წევრამდე)",
      fullDescription:
        translations?.packages?.family?.fullDescription ||
        "ოჯახური პაკეტი შექმნილია ოჯახებისთვის, რომლებსაც სურთ მიიღონ მაღალი ხარისხის სტომატოლოგიური მომსახურება ყველა წევრისთვის. ეს პაკეტი მოიცავს პროფილაქტიკურ ვიზიტებს ოჯახის თითოეული წევრისთვის, რენტგენის სურათებს და მნიშვნელოვან ფასდაკლებას ყველა პროცედურაზე.",
      features: translations?.packages?.family?.features || [
        "3 პროფილაქტიკური ვიზიტი წევრზე წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "25% ფასდაკლება ყველა პროცედურაზე",
      ],
      extendedFeatures: translations?.packages?.family?.extendedFeatures || [
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
          title: translations?.packages?.family?.benefits?.familyCare || "ოჯახური მზრუნველობა",
          description:
            translations?.packages?.family?.benefits?.familyCareDesc || "მომსახურება ოჯახის ყველა წევრისთვის",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: translations?.packages?.family?.benefits?.prevention || "პრევენცია ყველასთვის",
          description:
            translations?.packages?.family?.benefits?.preventionDesc || "რეგულარული შემოწმებები მთელი ოჯახისთვის",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: translations?.packages?.family?.benefits?.savings || "მნიშვნელოვანი დანაზოგი",
          description: translations?.packages?.family?.benefits?.savingsDesc || "ეკონომიური გადაწყვეტა ოჯახებისთვის",
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

  // მოცემული ID-ის მიხედვით პაკეტის მოძებნა
  const packageData = packages.find((pkg) => pkg.id === id) || packages[0]

  // სხვა პაკეტები
  const otherPackages = packages.filter((pkg) => pkg.id !== id).slice(0, 3)

  // ანიმაციის ეფექტები
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

  // მოკლე შეფასებები
  const testimonials = [
    {
      name: "ნინო მ.",
      rating: 5,
      text: "ძალიან კმაყოფილი ვარ ამ პაკეტით. პროფესიონალური მომსახურება და ყურადღებიანი პერსონალი.",
    },
    {
      name: "გიორგი კ.",
      rating: 5,
      text: "საუკეთესო არჩევანი ჩემთვის. ფასი სრულიად შეესაბამება ხარისხს.",
    },
    {
      name: "თამარ დ.",
      rating: 4,
      text: "კარგი პაკეტია, განსაკუთრებით მომეწონა პროფილაქტიკური ვიზიტები.",
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
      {/* ნავიგაცია */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/packages"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${isRtl ? "ml-2 rotate-180" : "mr-2"}`} />
            <span>{translations?.buttons?.backToPackages || "პაკეტებზე დაბრუნება"}</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full flex">
              <Phone className={`h-4 w-4 ${isRtl ? "ml-2 mt-1" : "mt-1 mr-2"}`} />
              {translations?.contact?.phone || "დაგვიკავშირდით"}
            </Button>
            <Button
              size="sm"
              className="rounded-full text-white font-medium"
              style={{ backgroundColor: packageData.accentColor, boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            >
              {translations?.choosePackage || "აირჩიე პაკეტი"}
            </Button>
            <LanguageSwitcher currentLanguage={currentLanguage} changeLanguage={changeLanguage} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${packageData.gradient} py-16`}>
        <div className="container mx-auto px-4">
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
                      {translations?.popularLabel || "პოპულარული"}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{packageData.name}</h1>
                <p className="text-xl text-white/90 mb-6">{packageData.description}</p>
                <div className="flex items-center gap-1 text-amber-300 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-300" />
                  ))}
                  <span className="text-white/80 ml-2">5.0 (120+ {translations?.reviews || "შეფასება"})</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 cursor-pointer hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all"
                    style={{ color: "black" }}
                  >
                    {translations?.choosePackage || "აირჩიე პაკეტი"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full flex"
                  >
                    <Phone className={`h-5 w-5 ${isRtl ? "ml-2 mt-1" : "mt-1 mr-2"}`} />
                    {translations?.packageDetails?.contactUs || "დაგვიკავშირდით"}
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
                    <p className="text-white/80 text-sm mb-1">{translations?.startingFrom || "დაწყებული"}</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-white">{packageData.price}</span>
                      <span className="text-white/80 ml-1">{translations?.perMonth || "/ თვეში"}</span>
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

      {/* მთავარი კონტენტი */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* მარცხენა სვეტი - პაკეტის დეტალები */}
          <div className="lg:col-span-8">
            {/* პაკეტის აღწერა */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {translations?.packageDetails?.description || "პაკეტის აღწერა"}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{packageData.fullDescription}</p>
              </div>

              {/* ვიზუალური ელემენტი აღწერის ქვემოთ */}
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
                      {translations?.packageDetails?.whyChoose || "რატომ უნდა აირჩიოთ"} {packageData.name}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {translations?.packageDetails?.benefitsDescription ||
                      "გაეცანით ამ პაკეტის უპირატესობებს და აღმოაჩინეთ, რატომ არის ის იდეალური არჩევანი თქვენთვის"}
                  </p>
                </div>
              </div>
            </div>

            {/* პაკეტში შემავალი სერვისები */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {translations?.packageDetails?.includedFeatures || "პაკეტში შემავალი სერვისები"}
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

            {/* უპირატესობები */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {translations?.packageDetails?.benefitsLabel || "უპირატესობები"}
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

            {/* მომხმარებელთა შეფასებები */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {translations?.testimonials?.title || "მომხმარებელთა შეფასებები"}
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
                  {translations?.testimonials?.viewAll || "ყველა შეფასების ნახვა"}
                  <ChevronRight className={`h-4 w-4 ${isRtl ? "mr-1 mt-1 rotate-180" : "ml-1 mt-1"}`} />
                </Button>
              </div>
            </div>

            {/* შედარების ცხრილი - ბარათების სახით */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: packageData.accentColor }}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {translations?.comparison?.title || "პაკეტების შედარება"}
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
                        <span className="text-gray-500 ml-1 text-sm">{translations?.perMonth || "/ თვეში"}</span>
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
                            {translations?.viewDetails || "დეტალურად ნახვა"}
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
                          {translations?.choosePackage || "აირჩიე პაკეტი"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* მარჯვენა სვეტი - ჯავშანი და სხვა პაკეტები */}
          <div className="lg:col-span-4">
            {/* პაკეტის მთავარი უპირატესობები */}
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                <div className="p-1">
                  <div className={`p-6 rounded-xl bg-gradient-to-r ${packageData.lightGradient}`}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: packageData.textColor }}>
                      {translations?.packageHighlights?.title || "პაკეტის მთავარი უპირატესობები"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {translations?.packageHighlights?.description || "რატომ უნდა აირჩიოთ ეს პაკეტი"}
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
                          <p className="text-sm text-gray-500">{translations?.perMonth || "/ თვეში"}</p>
                        </div>
                        <Button
                          className="text-white font-medium"
                          style={{ backgroundColor: packageData.accentColor, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                        >
                          {translations?.choosePackage || "აირჩიე პაკეტი"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* სხვა პაკეტები */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">
                    {translations?.packageDetails?.otherPackages || "სხვა პაკეტები"}
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
                              {pkg.price} {translations?.perMonth || "/ თვეში"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/packages"
                      className="text-sm font-medium hover:underline"
                      style={{ color: packageData.textColor }}
                    >
                      {translations?.viewAllPackages || "ყველა პაკეტის ნახვა"} →
                    </Link>
                  </div>
                </div>
              </div>

              {/* დეკორატიული ელემენტი */}
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
                        {translations?.packageDetails?.readyToStart || "მზად ხართ დაიწყოთ?"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {translations?.packageDetails?.ctaDescription ||
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
