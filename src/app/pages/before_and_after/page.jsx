"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "../../../context/LanguageContext"
import { useLocalizedDentists } from "../../../hooks/useLocalizedDentists"
import { beforeAfterCases, categories } from "../../lib/before-after-cases"
import { ArrowLeft, ChevronRight, X } from "lucide-react"
import ReactCompareImage from "react-compare-image"
import { motion, AnimatePresence } from "framer-motion"

export default function BeforeAfterPage() {
  const searchParams = useSearchParams()
  const doctorParam = searchParams.get("doctor")

  const { currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredCases, setFilteredCases] = useState([])
  const [activeCase, setActiveCase] = useState(null)
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    if (doctorParam) {
      const doctor = dentists.find((d) => String(d.id) === doctorParam)
      setSelectedDoctor(doctor || null)
    }
  }, [doctorParam, dentists])

  useEffect(() => {
    let filtered = [...beforeAfterCases]

    if (selectedDoctor) {
      filtered = filtered.filter((item) => item.doctorId === selectedDoctor.id)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredCases(filtered)
  }, [selectedCategory, selectedDoctor])

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setActiveCase(null)
      }
    }

    if (activeCase) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [activeCase])

  const texts = {
    ka: {
      title: "შემთხვევები",
      backToList: "ექიმების სია",
      backToDoctor: "ექიმის პროფილი",
      noResults: "შედეგები ვერ მოიძებნა",
      tryDifferent: "სცადეთ სხვა ფილტრი",
      viewCase: "ნახვა",
      allCategories: "ყველა",
      doctor: "ექიმი",
      category: "კატეგორია",
      date: "თარიღი",
      before: "მანამდე",
      after: "შემდეგ",
      close: "დახურვა",
      details: "დეტალები",
    },
    en: {
      title: "Cases",
      backToList: "Doctors List",
      backToDoctor: "Doctor Profile",
      noResults: "No results found",
      tryDifferent: "Try a different filter",
      viewCase: "View",
      allCategories: "All",
      doctor: "Doctor",
      category: "Category",
      date: "Date",
      before: "Before",
      after: "After",
      close: "Close",
      details: "Details",
    },
    ru: {
      title: "Случаи",
      backToList: "Список врачей",
      backToDoctor: "Профиль врача",
      noResults: "Результаты не найдены",
      tryDifferent: "Попробуйте другой фильтр",
      viewCase: "Смотреть",
      allCategories: "Все",
      doctor: "Врач",
      category: "Категория",
      date: "Дата",
      before: "До",
      after: "После",
      close: "Закрыть",
      details: "Детали",
    },
    he: {
      title: "מקרים",
      backToList: "רשימת רופאים",
      backToDoctor: "פרופיל רופא",
      noResults: "לא נמצאו תוצאות",
      tryDifferent: "נסה מסנן אחר",
      viewCase: "צפה",
      allCategories: "הכל",
      doctor: "רופא",
      category: "קטגוריה",
      date: "תאריך",
      before: "לפני",
      after: "אחרי",
      close: "סגור",
      details: "פרטים",
    },
  }

  const t = texts[currentLanguage] || texts.ka

  // Format date based on current language
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === "ka"
        ? "ka-GE"
        : currentLanguage === "ru"
          ? "ru-RU"
          : currentLanguage === "he"
            ? "he-IL"
            : "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    )
  }

  // Custom slider handle component
  const customSliderHandle = (
    <div className="w-1 h-full bg-white">
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
        <div className="w-1 h-5 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  )

  // Handle view button click
  const handleViewCase = (caseItem) => {
    setActiveCase(caseItem)
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  // Close modal
  const closeModal = () => {
    setActiveCase(null)
    // Re-enable body scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <div
      className={`min-h-screen bg-gray-100 py-8 transition-opacity duration-500 ease-in-out ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {selectedDoctor ? (
              <Link
                href={`/doctors_vip/${selectedDoctor.id}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                {t.backToDoctor}
              </Link>
            ) : (
              <Link
                href="/pages/doctorspage"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                {t.backToList}
              </Link>
            )}
            <h1 className="text-2xl font-bold text-gray-900 animate-fadeIn">{t.title}</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white scale-105 shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name[currentLanguage] || category.name.en}
              </button>
            ))}
          </div>
        </div>

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="aspect-[4/3] w-full relative">
                  <ReactCompareImage
                    leftImage={caseItem.beforeImage || "/placeholder.svg"}
                    rightImage={caseItem.afterImage || "/placeholder.svg"}
                    leftLabel={t.before}
                    rightLabel={t.after}
                    sliderLineColor="#ffffff"
                    className="w-full h-full"
                    handle={customSliderHandle}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {caseItem.title[currentLanguage] || caseItem.title.en}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {!selectedDoctor && (
                        <p className="text-sm text-gray-600">
                          {dentists.find((d) => d.id === caseItem.doctorId)?.name || ""}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {categories.find((c) => c.id === caseItem.category)?.name[currentLanguage] || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewCase(caseItem)}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      {t.viewCase}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 text-center rounded-lg shadow-md max-w-md mx-auto animate-fadeIn">
            <h3 className="text-xl font-medium text-gray-900 mb-2">{t.noResults}</h3>
            <p className="text-gray-500">{t.tryDifferent}</p>
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {activeCase.title[currentLanguage] || activeCase.title.en}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={t.close}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto flex-grow">
                <div className="aspect-[16/9] w-full relative">
                  <ReactCompareImage
                    leftImage={activeCase.beforeImage || "/placeholder.svg"}
                    rightImage={activeCase.afterImage || "/placeholder.svg"}
                    leftLabel={t.before}
                    rightLabel={t.after}
                    sliderLineColor="#ffffff"
                    className="w-full h-full"
                    handle={customSliderHandle}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.details}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">{t.doctor}</p>
                      <p className="text-base">{dentists.find((d) => d.id === activeCase.doctorId)?.name || ""}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">{t.category}</p>
                      <p className="text-base">
                        {categories.find((c) => c.id === activeCase.category)?.name[currentLanguage] || ""}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                      <p className="text-sm font-medium text-gray-700">{t.date}</p>
                      <p className="text-base">{formatDate(activeCase.date)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={closeModal}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
