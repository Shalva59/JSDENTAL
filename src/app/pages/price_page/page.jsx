"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { ArrowLeft, Phone, Check, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation"

// cn ფუნქცია კლასების გასაერთიანებლად
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function PackagesPage() {
  const { currentLanguage, translations, direction } = useLanguage()
  const isRtl = direction === "rtl"
  const localizedNavItems = useLocalizedNavigation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // პაკეტების მონაცემები
  const packages = [
    {
      id: "basic",
      name: translations?.packages?.basic?.name || "საბაზისო",
      price: "50₾",
      description: translations?.packages?.basic?.description || "ძირითადი მომსახურება",
      features: translations?.packages?.basic?.features || [
        "2 პროფილაქტიკური ვიზიტი წელიწადში",
        "1 რენტგენის სურათი წელიწადში",
        "10% ფასდაკლება სხვა პროცედურებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: false,
      category: "individual",
    },
    {
      id: "full",
      name: translations?.packages?.full?.name || "სრული",
      price: "80₾",
      description: translations?.packages?.full?.description || "ოპტიმალური არჩევანი",
      features: translations?.packages?.full?.features || [
        "3 პროფილაქტიკური ვიზიტი წელიწადში",
        "2 სრული რენტგენის სურათი წელიწადში",
        "15% ფასდაკლება ესთეტიკურ პროცედურებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: true,
      category: "individual",
    },
    {
      id: "premium",
      name: translations?.packages?.premium?.name || "პრემიუმ",
      price: "120₾",
      description: translations?.packages?.premium?.description || "სრული მომსახურება",
      features: translations?.packages?.premium?.features || [
        "4 პროფილაქტიკური ვიზიტი წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "20% ფასდაკლება იმპლანტებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: false,
      category: "individual",
    },
  ]

  const filteredPackages = activeTab === "all" ? packages : packages.filter((pkg) => pkg.category === activeTab)

  const MotionDiv = motion.div

  // FAQ მონაცემები
  const faqItems = [
    {
      question: translations?.faq?.question1 || "როგორ შემიძლია პაკეტის შეძენა?",
      answer:
        translations?.faq?.answer1 ||
        "პაკეტის შესაძენად შეგიძლიათ დაგვიკავშირდეთ ტელეფონით, ელ-ფოსტით ან მოგვმართოთ კლინიკაში ვიზიტისას. ჩვენი კონსულტანტი დაგეხმარებათ თქვენთვის სასურველი პაკეტის არჩევაში და გაგაცნობთ ყველა პირობას.",
    },
    {
      question: translations?.faq?.question2 || "შეიძლება თუ არა პაკეტის შეცვლა?",
      answer:
        translations?.faq?.answer2 ||
        "დიახ, პაკეტის შეცვლა შესაძლებელია ნებისმიერ დროს. თუ გსურთ უფრო მაღალი ან დაბალი პაკეტის არჩევა, დაგვიკავშირდით და ჩვენ დაგეხმარებით ცვლილების განხორციელებაში.",
    },
    {
      question: translations?.faq?.question3 || "რა ხდება თუ არ გამოვიყენებ ყველა ჩემს ვიზიტს?",
      answer:
        translations?.faq?.answer3 ||
        "გამოუყენებელი ვიზიტები არ გადადის შემდეგ წელს. თუმცა, ჩვენ გირჩევთ გამოიყენოთ ყველა დაგეგმილი ვიზიტი თქვენი პირის ღრუს ჯანმრთელობის შესანარჩუნებლად.",
    },
    {
      question: translations?.faq?.question4 || "რა შედის პროფილაქტიკურ ვიზიტში?",
      answer:
        translations?.faq?.answer4 ||
        "პროფილაქტიკური ვიზიტი მოიცავს პირის ღრუს სრულ შემოწმებას, პროფესიონალურ წმენდას, კბილის ნადების და ქვების მოცილებას, ასევე რეკომენდაციებს პირის ღრუს ჰიგიენის შესახებ.",
    },
    {
      question: translations?.faq?.question5 || "შეიძლება თუ არა პაკეტის გაუქმება?",
      answer:
        translations?.faq?.answer5 ||
        "პაკეტის გაუქმება შესაძლებელია შეძენიდან 14 დღის განმავლობაში სრული თანხის დაბრუნებით, თუ არ გამოგიყენებიათ არცერთი სერვისი. 14 დღის შემდეგ, თანხის დაბრუნება ხდება გამოუყენებელი სერვისების პროპორციულად.",
    },
  ]

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* Mobile Menu Overlay - შეცვლილი ვერსია Sheet-ის გარეშე */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm md:hidden">
          <div
            className={`fixed ${isRtl ? "left-0" : "right-0"} top-0 h-full w-[300px] bg-white shadow-xl p-6 overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-gray-900">
                JC <span className="text-blue-600">Dental</span>
              </span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-4">
              {localizedNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors p-2 rounded-md",
                    item.url === "/packages"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 my-4 pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  <Phone className={`${isRtl ? "ml-2" : "mr-2"} h-4 w-4`} />
                  {translations?.contact?.title || "დაგვიკავშირდით"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/dental-abstraction.png')] bg-cover bg-center"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-1.5 bg-blue-700/50 text-blue-100 rounded-full text-sm font-medium backdrop-blur-sm">
                  {translations?.packagesHero?.label || "სტომატოლოგიური პაკეტები"}
                </span>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {translations?.packagesHero?.title1 || "აირჩიეთ"}{" "}
                  <span className="text-blue-300">{translations?.packagesHero?.title2 || "იდეალური პაკეტი"}</span>{" "}
                  {translations?.packagesHero?.title3 || "თქვენი ღიმილისთვის"}
                </h1>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                  {translations?.packagesHero?.description ||
                    "ჩვენი სტომატოლოგიური პაკეტები შექმნილია თქვენი საჭიროებების გათვალისწინებით, რათა უზრუნველყოს თქვენი კბილების ჯანმრთელობა ხელმისაწვდომ ფასად."}
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-blue-300 flex cursor-pointer text-blue-100 hover:bg-blue-800"
                  >
                    <ArrowLeft className={` ${isRtl ? "ml-2" : "mr-2"} h-5 w-5 ${isRtl ? "rotate-180" : ""}`} />
                    {translations?.buttons?.backToHome || "მთავარ გვერდზე დაბრუნება"}
                  </Button>
                </Link>
              </MotionDiv>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full  h-auto">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Packages Filter - მხოლოდ ინდივიდუალური ფილტრი */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {translations?.packagesSection?.title1 || "აირჩიეთ"}{" "}
                <span className="text-blue-600">{translations?.packagesSection?.title2 || "თქვენთვის შესაფერისი"}</span>{" "}
                {translations?.packagesSection?.title3 || "პაკეტი"}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {translations?.packagesSection?.description ||
                  "ჩვენ გთავაზობთ სხვადასხვა ტიპის ინდივიდუალურ პაკეტებს თქვენი საჭიროებების მიხედვით"}
              </p>
            </MotionDiv>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <MotionDiv
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  whileHover={{ y: -8 }}
                >
                  <div
                    className={`h-full rounded-3xl ${pkg.color} border border-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-2xl overflow-hidden`}
                  >
                    {pkg.popular && (
                      <div className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} z-10`}>
                        <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md">
                          {translations?.popularLabel || "პოპულარული"}
                        </span>
                      </div>
                    )}

                    <div className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl mb-6 ${pkg.accentColor} flex items-center justify-center text-white shadow-lg`}
                      >
                        <span className="text-2xl font-bold">{pkg.name.charAt(0)}</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h3>
                      <p className="text-gray-600 mb-6">{pkg.description}</p>

                      <div className="mb-8">
                        <span className={`text-5xl font-bold ${pkg.textColor}`}>{pkg.price}</span>
                        <span className="text-gray-600 mx-2">{translations?.perMonth || "/ თვეში"}</span>
                      </div>

                      <div className="space-y-4 mb-8">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div
                                className={`w-5 h-5 rounded-full ${pkg.accentColor} flex items-center justify-center text-white shadow-sm`}
                              >
                                <Check className="h-3 w-3" />
                              </div>
                            </div>
                            <p className={`${isRtl ? "mr-3" : "ml-3"} text-gray-600`}>{feature}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button className={`w-full ${pkg.accentColor} rounded-3xl hover:bg-opacity-90 text-white`}>
                          {translations?.choosePackage || "აირჩიე პაკეტი"}
                        </Button>
                        <button className="text-center text-sm text-gray-500 hover:text-blue-600 py-2">
                          {translations?.viewDetails || "დეტალურად ნახვა"}
                        </button>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section - მხოლოდ 3 პაკეტი */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  {translations?.comparison?.label || "შედარება"}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {translations?.comparison?.title || "პაკეტების შედარება"}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {translations?.comparison?.description ||
                    "გაეცანით ჩვენი პაკეტების დეტალურ შედარებას და აირჩიეთ თქვენთვის ყველაზე შესაფერისი ვარიანტი"}
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th
                        scope="col"
                        className="px-6 py-5 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {translations?.comparison?.features || "მახასიათებლები"}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-center text-sm font-medium text-blue-600 uppercase tracking-wider"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-2">B</span>
                          <span>{translations?.packages?.basic?.name || "საბაზისო"}</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-center text-sm font-medium text-blue-600 uppercase tracking-wider"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-2">S</span>
                          <span>{translations?.packages?.full?.name || "სრული"}</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-5 text-center text-sm font-medium text-blue-600 uppercase tracking-wider"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-2">P</span>
                          <span>{translations?.packages?.premium?.name || "პრემიუმ"}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.price || "ფასი"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">50₾</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">80₾</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">120₾</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.preventiveVisits || "პროფილაქტიკური ვიზიტები"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.visits2 || "2 წელიწადში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.visits3 || "3 წელიწადში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.visits4 || "4 წელიწადში"}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.xrays || "რენტგენის სურათები"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.xray1 || "1 წელიწადში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.xray2 || "2 წელიწადში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.xrayAsNeeded || "საჭიროებისამებრ"}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.discount || "ფასდაკლება პროცედურებზე"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">10%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">15%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">20%</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.emergency || "გადაუდებელი დახმარება"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.workingHours || "სამუშაო საათებში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.workingHours || "სამუშაო საათებში"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">24/7</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {translations?.comparison?.validity || "მოქმედების ვადა"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.year1 || "1 წელი"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.year1 || "1 წელი"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {translations?.comparison?.year1 || "1 წელი"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  {translations?.faq?.title || "ხშირად დასმული კითხვები"}
                </h2>
                <p className="text-lg text-gray-600">
                  {translations?.faq?.description ||
                    "გაეცანით პასუხებს ყველაზე ხშირად დასმულ კითხვებზე ჩვენი პაკეტების შესახებ"}
                </p>
              </div>

              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                      <h4 className="text-xl font-semibold mb-4 text-gray-900">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
