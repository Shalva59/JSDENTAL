"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { en } from "../../../languages/en"
import { ka } from "../../../languages/ka"
import { ru } from "../../../languages/ru"
import { he } from "../../../languages/he"

// Gallery data with image sources
const GALLERY_DATA = {
  clinic: [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/implantis_skamis_ukana_xedi-Zef9DamSzbn2erB0eKK1zdecy43sPR.jpeg",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terapevtis_skamis_ukana_xedi-BAERsoRFjEEalOHBb9D4LgaQIN1JUT.jpeg",
    },
    // {
    //   src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/terapevtis_skami_wina_xedi-gszcN6jm9e7KsSWOyF6YWTkiW60EZu.jpeg",
    // },
    // {
    //   src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/implantis_skamis_sinaxedi-3E7fNY4itTTrQyAHWllXW1ImO9VafG.jpeg",
    // },
  ],
  reception: [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hall-kLLiuFH0qkIP80yVbcdzIRPzWGE2JM.jpeg",
    },
  ],
  sterilization: [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/399b7ce1-0805-4ddc-93f0-6325c24fc51b-P2aZ4qAcdEZrKeGEpVq7obgtqxyL7M.jpeg",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/63f071d5-8660-4cb0-92d6-8f64c24405f9-elyMdYa0y9Lxmqi5G5bk8AcKPA4QaY.jpeg",
    },
    // {
    //   src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac2b6672-637a-4b71-b631-46e2d1600c97-Cj44x6cxncjMJs1o60A3VV7hRuvjMN.jpeg",
    // },
    // {
    //   src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3939f448-add2-4e1a-9757-1e74ae78ec4f-EFY7TcWxuDfJDztxpPoZ1draHyo1y2.jpeg",
    // },
  ],
}

// Add gallery translations to each language object
const galleryTranslations = {
  en: {
    pageTitle: "JC Dental Gallery",
    pageSubtitle: "Explore our modern clinic, equipment, and workspace",
    categories: {
      clinic: "Treatment Rooms",
      reception: "Reception",
      sterilization: "Sterilization",
    },
    loading: "Loading...",
    noPhotos: "No photos found",
    noPhotosInCategory: "No photos in this category",
    ctaTitle: "Like what you see?",
    ctaSubtitle: "Contact us today and book an appointment at our modern clinic",
    bookAppointment: "Book Appointment",
    gallery: {
      clinic: [
        // {
        //   alt: "JC Dental - Treatment Room",
        //   title: "Treatment Room",
        //   description: "Modern dental chair and equipment",
        // },
        // {
        //   alt: "JC Dental - Therapist's Chair",
        //   title: "Therapist's Chair",
        //   description: "Rear view of therapist's chair",
        // },

        {
          alt: "JC Dental - Implant Chair",
          title: "Implant Chair",
          description: "Full view of implant chair",
        },
        {
          alt: "JC Dental - Therapist's Chair",
          title: "Therapist's Chair",
          description: "Front view of therapist's chair",
        },

      ],
      reception: [
        {
          alt: "JC Dental - Reception",
          title: "Reception",
          description: "Clinic reception and waiting area",
        },
      ],
      sterilization: [
        {
          alt: "JC Dental - Sterilization Room",
          title: "Sterilization Room",
          description: "Modern sterilization equipment",
        },
        {
          alt: "JC Dental - Sterilization Zone",
          title: "Sterilization Zone",
          description: "Sterilization zone with sinks",
        },
        {
          alt: "JC Dental - Sterilization Zone",
          title: "Sterilization Zone",
          description: "Sterilization zone with equipment",
        },
        {
          alt: "JC Dental - Sterilization Devices",
          title: "Sterilization Devices",
          description: "Autoclave and other sterilization devices",
        },
      ],
    },
  },
  ka: {
    pageTitle: "JC Dental გალერეა",
    pageSubtitle: "გაეცანით ჩვენს თანამედროვე კლინიკას, აღჭურვილობას და სამუშაო სივრცეს",
    categories: {
      clinic: "სამკურნალო ოთახები",
      reception: "მისაღები",
      sterilization: "სტერილიზაცია",
    },
    loading: "იტვირთება...",
    noPhotos: "ფოტოები ვერ მოიძებნა",
    noPhotosInCategory: "ამ კატეგორიაში ფოტოები არ არის",
    ctaTitle: "მოგწონთ რასაც ხედავთ?",
    ctaSubtitle: "დაგვიკავშირდით დღესვე და დაჯავშნეთ ვიზიტი ჩვენს თანამედროვე კლინიკაში",
    bookAppointment: "დაჯავშნეთ ვიზიტი",
    gallery: {
      clinic: [
        // {
        //   alt: "JC Dental - სამკურნალო ოთახი",
        //   title: "სამკურნალო ოთახი",
        //   description: "თანამედროვე სტომატოლოგიური სავარძელი და აღჭურვილობა",
        // },
        // {
        //   alt: "JC Dental - თერაპევტის სავარძელი",
        //   title: "თერაპევტის სავარძელი",
        //   description: "უკანა ხედი თერაპევტის სავარძლის",
        // },

        {
          alt: "JC Dental - იმპლანტის სავარძელი",
          title: "იმპლანტის სავარძელი",
          description: "სრული ხედი იმპლანტის სავარძლის",
        },

        {
          alt: "JC Dental - თერაპევტის სავარძელი",
          title: "თერაპევტის სავარძელი",
          description: "წინა ხედი თერაპევტის სავარძლის",
        },

      ],
      reception: [
        {
          alt: "JC Dental - მისაღები",
          title: "მისაღები",
          description: "კლინიკის მისაღები და მოსაცდელი სივრცე",
        },
      ],
      sterilization: [
        {
          alt: "JC Dental - სტერილიზაციის ოთახი",
          title: "სტერილიზაციის ოთახი",
          description: "თანამედროვე სტერილიზაციის აღჭურვილობა",
        },
        {
          alt: "JC Dental - სტერილიზაციის ზონა",
          title: "სტერილიზაციის ზონა",
          description: "სტერილიზაციის ზონა ნიჟარებით",
        },
        {
          alt: "JC Dental - სტერილიზაციის ზონა",
          title: "სტერილიზაციის ზონა",
          description: "სტერილიზაციის ზონა აღჭურვილობით",
        },
        {
          alt: "JC Dental - სტერილიზაციის აპარატები",
          title: "სტერილიზაციის აპარატები",
          description: "ავტოკლავი და სხვა სტერილიზაციის აპარატები",
        },
      ],
    },
  },
  ru: {
    pageTitle: "JC Dental Галерея",
    pageSubtitle: "Ознакомьтесь с нашей современной клиникой, оборудованием и рабочим пространством",
    categories: {
      clinic: "Лечебные кабинеты",
      reception: "Приёмная",
      sterilization: "Стерилизация",
    },
    loading: "Загрузка...",
    noPhotos: "Фотографии не найдены",
    noPhotosInCategory: "В этой категории нет фотографий",
    ctaTitle: "Нравится то, что вы видите?",
    ctaSubtitle: "Свяжитесь с нами сегодня и запишитесь на приём в нашу современную клинику",
    bookAppointment: "Записаться на приём",
    gallery: {
      clinic: [
        // {
        //   alt: "JC Dental - Лечебный кабинет",
        //   title: "Лечебный кабинет",
        //   description: "Современное стоматологическое кресло и оборудование",
        // },
        // {
        //   alt: "JC Dental - Кресло терапевта",
        //   title: "Кресло терапевта",
        //   description: "Вид сзади кресла терапевта",
        // },

        {
          alt: "JC Dental - Кресло для имплантации",
          title: "Кресло для имплантации",
          description: "Полный вид кресла для имплантации",
        },
        {
          alt: "JC Dental - Кресло терапевта",
          title: "Кресло терапевта",
          description: "Вид спереди кресла терапевта",
        },

      ],
      reception: [
        {
          alt: "JC Dental - Приёмная",
          title: "Приёмная",
          description: "Приёмная клиники и зона ожидания",
        },
      ],
      sterilization: [
        {
          alt: "JC Dental - Комната стерилизации",
          title: "Комната стерилизации",
          description: "Современное оборудование для стерилизации",
        },
        {
          alt: "JC Dental - Зона стерилизации",
          title: "Зона стерилизации",
          description: "Зона стерилизации с раковинами",
        },
        {
          alt: "JC Dental - Зона стерилизации",
          title: "Зона стерилизации",
          description: "Зона стерилизации с оборудованием",
        },
        {
          alt: "JC Dental - Аппараты для стерилизации",
          title: "Аппараты для стерилизации",
          description: "Автоклав и другие аппараты для стерилизации",
        },
      ],
    },
  },
  he: {
    pageTitle: "גלריית JC Dental",
    pageSubtitle: "גלו את המרפאה המודרנית שלנו, הציוד ומרחב העבודה",
    categories: {
      clinic: "חדרי טיפול",
      reception: "קבלה",
      sterilization: "סטריליזציה",
    },
    loading: "טוען...",
    noPhotos: "לא נמצאו תמונות",
    noPhotosInCategory: "אין תמונות בקטגוריה זו",
    ctaTitle: "אוהבים את מה שאתם רואים?",
    ctaSubtitle: "צרו איתנו קשר היום וקבעו תור במרפאה המודרנית שלנו",
    bookAppointment: "קביעת תור",
    gallery: {
      clinic: [
        // {
        //   alt: "JC Dental - חדר טיפול",
        //   title: "חדר טיפול",
        //   description: "כיסא וציוד דנטלי מודרני",
        // },
        // {
        //   alt: "JC Dental - כיסא המטפל",
        //   title: "כיסא המטפל",
        //   description: "מבט אחורי של כיסא המטפל",
        // },

        {
          alt: "JC Dental - כיסא השתלות",
          title: "כיסא השתלות",
          description: "מבט מלא של כיסא השתלות",
        },

        {
          alt: "JC Dental - כיסא המטפל",
          title: "כיסא המטפל",
          description: "מבט קדמי של כיסא המטפל",
        },

      ],
      reception: [
        {
          alt: "JC Dental - קבלה",
          title: "קבלה",
          description: "אזור הקבלה והמתנה של המרפאה",
        },
      ],
      sterilization: [
        {
          alt: "JC Dental - חדר סטריליזציה",
          title: "חדר סטריליזציה",
          description: "ציוד סטריליזציה מודרני",
        },
        {
          alt: "JC Dental - אזור סטריליזציה",
          title: "אזור סטריליזציה",
          description: "אזור סטריליזציה עם כיורים",
        },
        {
          alt: "JC Dental - אזור סטריליזציה",
          title: "אזור סטריליזציה",
          description: "אזור סטריליזציה עם ציוד",
        },
        {
          alt: "JC Dental - מכשירי סטריליזציה",
          title: "מכשירי סטריליזציה",
          description: "אוטוקלב ומכשירי סטריליזציה אחרים",
        },
      ],
    },
  },
}

// Add gallery translations to each language object
en.gallery = galleryTranslations.en
ka.gallery = galleryTranslations.ka
ru.gallery = galleryTranslations.ru
he.gallery = galleryTranslations.he

// Create a translations object with all languages
const translations = { en, ka, ru, he }

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

// Header animation variants
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut",
    },
  },
}

const dividerVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "6rem",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeOut",
    },
  },
}

// Gallery Item Component
const GalleryItem = ({ image, index, onClick, t }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-all"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Add the black gradient overlay that appears on hover */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#00A0B0] transition-colors duration-300">
          {image.title}
        </h3>
        <p className="mt-2 text-gray-600">{image.description}</p>
      </div>
    </motion.div>
  )
}

// Main Gallery Component
export default function GalleryPage() {
  const { currentLanguage, direction } = useLanguage()
  const t = translations[currentLanguage] || translations.ka

  // State
  const [currentCategory, setCurrentCategory] = useState("clinic")
  const [selectedImage, setSelectedImage] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Set client-side rendering flag and loading state
  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Create localized gallery data by combining image sources with translations
  const getLocalizedGalleryData = () => {
    const result = {}

    Object.keys(GALLERY_DATA).forEach((category) => {
      result[category] = GALLERY_DATA[category].map((item, index) => {
        const translatedData = t.gallery.gallery[category][index] || {}
        return {
          ...item,
          alt: translatedData.alt || "",
          title: translatedData.title || "",
          description: translatedData.description || "",
        }
      })
    })

    return result
  }

  const localizedGalleryData = getLocalizedGalleryData()

  // Get current images based on selected category
  const currentImages = localizedGalleryData[currentCategory] || []

  // Create category data with translations
  const categories = [
    { id: "clinic", label: t.gallery.categories.clinic, icon: "🦷" },
    { id: "reception", label: t.gallery.categories.reception, icon: "🏥" },
    { id: "sterilization", label: t.gallery.categories.sterilization, icon: "🧪" },
  ]

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setIsLoading(true)
    setCurrentCategory(categoryId)

    // Reset loading state after animation
    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }

  // Open lightbox with selected image
  const openLightbox = (image, index) => {
    setSelectedImage({ ...image, index, total: currentImages.length })
    document.body.style.overflow = "hidden"
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  // Navigate to previous image in lightbox
  const prevImage = () => {
    if (!selectedImage) return
    const newIndex = selectedImage.index === 0 ? currentImages.length - 1 : selectedImage.index - 1
    setSelectedImage({ ...currentImages[newIndex], index: newIndex, total: currentImages.length })
  }

  // Navigate to next image in lightbox
  const nextImage = () => {
    if (!selectedImage) return
    const newIndex = selectedImage.index === currentImages.length - 1 ? 0 : selectedImage.index + 1
    setSelectedImage({ ...currentImages[newIndex], index: newIndex, total: currentImages.length })
  }

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return
      if (e.key === "ArrowLeft") prevImage()
      else if (e.key === "ArrowRight") nextImage()
      else if (e.key === "Escape") closeLightbox()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, currentImages])

  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7FCDDB] border-t-[#00A0B0]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      {/* Header styled like the screenshot */}
      <div className="relative">
        {/* Main header with pattern background */}
        <div className="relative bg-[#00A0B0] pb-24 pt-16 header-pattern">
          <div className="container relative z-10 mx-auto px-4 text-center">
            {/* Title */}
            <motion.h1
              className="text-4xl font-bold text-white md:text-5xl"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {t.gallery.pageTitle}
            </motion.h1>

            {/* Divider line */}
            <motion.div
              className="mx-auto my-4 h-0.5 bg-white"
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: "6rem" }}
            />

            {/* Subtitle */}
            <motion.p
              className="mx-auto max-w-2xl text-sm text-white md:text-base"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              {t.gallery.pageSubtitle}
            </motion.p>
          </div>
        </div>

        {/* Slanted bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 rounded-xl bg-white p-3 shadow-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 cursor-pointer rounded-lg px-6 py-3 font-medium transition-all duration-300 ${currentCategory === category.id
                  ? "bg-[#00A0B0] text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[400px] items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#00A0B0]" />
                <p className="mt-4 text-[#00A0B0]">{t.gallery.loading}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentImages.map((image, index) => (
                <GalleryItem key={index} image={image} index={index} onClick={() => openLightbox(image, index)} t={t} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!isLoading && currentImages.length === 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex h-[300px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8 text-center"
          >
            <div className="text-4xl">🔍</div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">{t.gallery.noPhotos}</h3>
            <p className="mt-2 text-gray-500">{t.gallery.noPhotosInCategory}</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir="ltr" // Force LTR for lightbox
            >
              {/* Close button */}
              <motion.button
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white"
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Image container */}
              <div className="relative h-[70vh] w-full bg-gray-100">
                <motion.img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="h-full w-full object-contain"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Navigation buttons */}
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Image info */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h2>
                <p className="mt-2 text-gray-600">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {selectedImage.index + 1} / {selectedImage.total}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="overflow-hidden rounded-2xl bg-[#00A0B0] p-8 text-center shadow-xl">
          <motion.h3
            className="text-2xl font-bold text-white md:text-3xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.gallery.ctaTitle}
          </motion.h3>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-blue-50"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.gallery.ctaSubtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/pages/booking">
              <motion.button
                className="mt-6 rounded-full bg-white px-8 py-3 font-medium text-[#00A0B0] shadow-md transition-all hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.gallery.bookAppointment}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
