"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Head from "next/head"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import {
  ArrowLeft,
  Search,
  X,
  Sparkles,
  ArrowRight,
  Grid,
  Rows,
  Smile,
  MousePointer,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  ArrowUp,
  ChevronLeft,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"
import AOS from "aos"
import "aos/dist/aos.css"

// AOS (Animate On Scroll) configuration
const initAOS = () => {
  if (typeof window !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      offset: 100,
      anchorPlacement: "top-bottom",
      disable: false,
    })
  }
}

// AOS additional styles
const aosStyles = `
  [data-aos] {
    pointer-events: none;
  }

  [data-aos].aos-animate {
    pointer-events: auto;
  }
  
  /* Add a new class that will fix elements */
  .aos-fixed {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
    transition: none !important;
  }

  [data-aos="fade-up"] {
    transform: translate3d(0, 50px, 0);
    opacity: 0;
    transition-property: transform, opacity;
  }

  [data-aos="fade-up"].aos-animate {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  [data-aos="zoom-in"] {
    transform: scale(0.6);
    opacity: 0;
    transition-property: transform, opacity;
  }

  [data-aos="zoom-in"].aos-animate {
    transform: scale(1);
    opacity: 1;
  }

  [data-aos="slide-right"] {
    transform: translate3d(-100px, 0, 0);
    opacity: 0;
    transition-property: transform, opacity;
  }

  [data-aos="slide-right"].aos-animate {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  [data-aos="slide-left"] {
    transform: translate3d(100px, 0, 0);
    opacity: 0;
    transition-property: transform, opacity;
  }

  [data-aos="slide-left"].aos-animate {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`

// Before-after cases data
const beforeAfterCases = [
  // Doctor 1 - Gabriel Janashvili
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
    afterImage: "/JC_namushevrebi/gabi_namushevrebi/client_1/after-dental.jpg",
    date: "2023-05-15",
  },

  // Doctor 2 - Tengo Shimshilashvili
  {
    id: 2,
    doctorId: 2,
    category: "orthodontics",
    title: {
      ka: "ორთოდონტია",
      en: "Orthodontics",
      ru: "Ортодонтия",
      he: "אורתודונטיה",
    },
    beforeImage: "/dental-checkup-preparation.png",
    afterImage: "/fresh-smile-feeling.png",
    date: "2023-08-05",
  },
  {
    id: 3,
    doctorId: 2,
    category: "crowns",
    title: {
      ka: "კბილის გვირგვინები",
      en: "Dental Crowns",
      ru: "Зубные коронки",
      he: "כתרים דנטליים",
    },
    beforeImage: "/dental-checkup-preparation.png",
    afterImage: "/fresh-smile-feeling.png",
    date: "2023-09-12",
  },
  {
    id: 4,
    doctorId: 2,
    category: "dental-implants",
    title: {
      ka: "მრავლობითი იმპლანტები",
      en: "Multiple Implants",
      ru: "Множественные импланты",
      he: "שתלים מרובים",
    },
    beforeImage: "/dental-checkup-preparation.png",
    afterImage: "/fresh-smile-feeling.png",
    date: "2023-10-05",
  },

  // Doctor 3 - Eli Kasrelishvili
  {
    id: 5,
    doctorId: 3,
    category: "teeth-whitening",
    title: {
      ka: "პროფესიონალური გათეთრება",
      en: "Professional Whitening",
      ru: "Профессиональное отбеливание",
      he: "הלבנה מקצועית",
    },
    beforeImage: "/dental-checkup-preparation.png",
    afterImage: "/fresh-smile-feeling.png",
    date: "2023-11-15",
  },
  {
    id: 6,
    doctorId: 3,
    category: "veneers",
    title: {
      ka: "სრული ღიმილის ტრანსფორმაცია",
      en: "Full Smile Makeover",
      ru: "Полное преображение улыбки",
      he: "מתיחת פנים מלאה לחיוך",
    },
    beforeImage: "/dental-checkup-preparation.png",
    afterImage: "/fresh-smile-feeling.png",
    date: "2023-12-20",
  },

  // Doctor 4 - Ana Pachkoria
  {
    id: 7,
    doctorId: 4,
    category: "orthodontics",
    title: {
      ka: "ბრეკეტები",
      en: "Braces",
      ru: "Брекеты",
      he: "גשרים",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/1/before.webp",
    afterImage: "/JC_namushevrebi/ana_pachkoria/1/After.webp",
    date: "2024-01-10",
  },
  {
    id: 8,
    doctorId: 4,
    category: "crowns",
    title: {
      ka: "კერამიკული გვირგვინები",
      en: "Ceramic Crowns",
      ru: "Керамические коронки",
      he: "כתרים קרמיים",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/2/before.jpg",
    afterImage: "/JC_namushevrebi/ana_pachkoria/2/after.jpg",
    date: "2024-02-05",
  },

  {
    id: 9,
    doctorId: 4,
    category: "crowns",
    title: {
      ka: "კერამიკული გვირგვინები",
      en: "Ceramic Crowns",
      ru: "Керамические коронки",
      he: "כתרים קרמיים",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/3/before.jpg",
    afterImage: "/JC_namushevrebi/ana_pachkoria/3/after.jpg",
    date: "2024-02-05",
  },

  // Additional cases for doctors

  
  {
    id: 10,
    doctorId: 4,
    category: "teeth-whitening",
    title: {
      ka: "ლაზერული გათეთრება",
      en: "Laser Whitening",
      ru: "Лазерное отбеливание",
      he: "הלבנה בלייזר",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/4/Before.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/4/After.jpg",
    date: "2024-03-22",
  },
  {
    id: 11,
    doctorId: 4,
    category: "dental-implants",
    title: {
      ka: "წინა კბილის იმპლანტი",
      en: "Front Tooth Implant",
      ru: "Имплант переднего зуба",
      he: "שתל שן קדמית",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/5/BeforeImage.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/5/AfterImage.jpg",
    date: "2024-04-05",
  },
  {
    id: 12,
    doctorId: 4,
    category: "veneers",
    title: {
      ka: "ცირკონის ვენირები",
      en: "Zirconium Veneers",
      ru: "Циркониевые виниры",
      he: "ציפויי זירקוניה",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/6/BeforeImage2.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/6/AfterImage2.jpg",
    date: "2024-04-10",
  },
 

  {
    id: 13,
    doctorId: 4,
    category: "veneers",
    title: {
      ka: "ცირკონის ვენირები",
      en: "Zirconium Veneers",
      ru: "Циркониевые виниры",
      he: "ציפויי זירקוניה",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/7/Before.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/7/After.jpg",
    date: "2024-04-10",
  },

  
  {
    id: 14,
    doctorId: 4,
    category: "veneers",
    title: {
      ka: "ცირკონის ვენირები",
      en: "Zirconium Veneers",
      ru: "Циркониевые виниры",
      he: "ציפויי זירקוניה",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/8/BeforeImage3.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/8/AfterImage3.jpg",
    date: "2024-04-10",
  },

  {
    id: 15,
    doctorId: 4,
    category: "veneers",
    title: {
      ka: "ცირკონის ვენირები",
      en: "Zirconium Veneers",
      ru: "Циркониевые виниры",
      he: "ציפויי זירקוניה",
    },
    beforeImage: "/JC_namushevrebi/ana_pachkoria/9/Before.jpg",
    afterImage:  "/JC_namushevrebi/ana_pachkoria/9/After.jpg",
    date: "2024-04-10",
  },


]

// Categories for filtering
const categories = [
  { id: "all", name: { ka: "ყველა", en: "All", ru: "Все", he: "הכל" } },
  { id: "dental-implants", name: { ka: "იმპლანტები", en: "Dental Implants", ru: "Импланты", he: "שתלים דנטליים" } },
  { id: "teeth-whitening", name: { ka: "გათეთრება", en: "Teeth Whitening", ru: "Отбеливание", he: "הלבנת שיניים" } },
  { id: "veneers", name: { ka: "ვინირები", en: "Veneers", ru: "Виниры", he: "ציפויים" } },
  { id: "orthodontics", name: { ka: "ორთოდონტია", en: "Orthodontics", ru: "Ортодонтия", he: "אורתודונטיה" } },
  { id: "crowns", name: { ka: "გვირგვინები", en: "Crowns", ru: "Коронки", he: "כתרים" } },
]

// Custom Before-After Slider Component
const CustomCompareSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  labelPosition = "bottom",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images
  useEffect(() => {
    const beforeImg = new Image()
    const afterImg = new Image()
    let loadedCount = 0

    const checkLoaded = () => {
      loadedCount++
      if (loadedCount === 2) {
        setImagesLoaded(true)
      }
    }

    beforeImg.onload = checkLoaded
    afterImg.onload = checkLoaded

    beforeImg.src = beforeImage
    afterImg.src = afterImage

    // Handle errors
    beforeImg.onerror = () => checkLoaded()
    afterImg.onerror = () => checkLoaded()

    return () => {
      beforeImg.onload = null
      afterImg.onload = null
      beforeImg.onerror = null
      afterImg.onerror = null
    }
  }, [beforeImage, afterImage])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    updateSliderPosition(e)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    updateSliderPosition(e.touches[0])
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    updateSliderPosition(e)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    updateSliderPosition(e.touches[0])
  }

  const updateSliderPosition = (clientPosition) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientPosition.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(Math.max(x, 0), 100))
  }

  // Add and remove event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    document.addEventListener("mouseup", handleMouseUpGlobal)
    document.addEventListener("touchend", handleMouseUpGlobal)

    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal)
      document.removeEventListener("touchend", handleMouseUpGlobal)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ touchAction: "none" }} // Prevent scrolling while dragging on mobile
    >
      {/* Loading state */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Before image (full width) */}
      <div className="absolute inset-0">
        <img
          src={beforeImage || "/placeholder.svg"}
          alt="Before"
          className="w-full h-full object-cover"
          onDragStart={(e) => e.preventDefault()}
        />
        <div
          className={`absolute ${labelPosition === "bottom" ? "bottom-3 left-3" : "top-3 left-3"} bg-black/70 text-white text-xs px-2 py-1 rounded`}
        >
          {beforeLabel}
        </div>
      </div>

      {/* After image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <img
          src={afterImage || "/placeholder.svg"}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%`, minWidth: "100%" }}
          onDragStart={(e) => e.preventDefault()}
        />
        <div
          className={`absolute ${labelPosition === "bottom" ? "bottom-3 right-3" : "top-3 right-3"} bg-blue-600/90 text-white text-xs px-2 py-1 rounded`}
        >
          {afterLabel}
        </div>
      </div>

      {/* Slider handle */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex items-center justify-center">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// CaseCard Component
const CaseCard = ({ caseItem, onView, currentLanguage, getDisplayTitle, getCategoryName, formatDate, t, dentists }) => {
  // Before and After labels as separate components to avoid re-renders
  const BeforeLabel = () => (
    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
      {currentLanguage === "ka"
        ? "მანამდე"
        : currentLanguage === "ru"
          ? "До"
          : currentLanguage === "he"
            ? "לפני"
            : "Before"}
    </div>
  )

  const AfterLabel = () => (
    <div className="absolute top-2 right-2 bg-[#1E6FB0]/90 text-white text-xs px-2 py-1 rounded-full z-10">
      {currentLanguage === "ka"
        ? "შემდეგ"
        : currentLanguage === "ru"
          ? "После"
          : currentLanguage === "he"
            ? "אחרי"
            : "After"}
    </div>
  )

  // Get doctor name
  const doctorName = dentists.find((d) => d.id === caseItem.doctorId)?.name || ""

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500/100 dark:group-hover:text-blue-600/75 transition-colors">
          {getDisplayTitle(caseItem)}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{getCategoryName(caseItem.category)}</p>
          <div className="flex items-center gap-1">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-xs text-[#1E6FB0] dark:text-[#3a8bc9] font-medium">{t.amazingResults}</span>
          </div>
        </div>
        <p className="text-sm text-[#1E6FB0] dark:text-[#3a8bc9] font-medium">{doctorName}</p>
      </div>

      {/* Before & After Images Side by Side */}
      <div className="grid grid-cols-2 gap-1 p-1">
        {/* Before Image */}
        <div className="relative aspect-square overflow-hidden">
          <BeforeLabel />
          <motion.img
            src={caseItem.beforeImage || "/placeholder.svg"}
            alt={`${t.before} - ${getDisplayTitle(caseItem)}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* After Image */}
        <div className="relative aspect-square overflow-hidden">
          <AfterLabel />
          <motion.img
            src={caseItem.afterImage || "/placeholder.svg"}
            alt={`${t.after} - ${getDisplayTitle(caseItem)}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <motion.button
          onClick={() => onView(caseItem)}
          className="w-full bg-[#1E6FB0] hover:bg-[#1a5f96] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.viewCase} <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  )
}

// Main Component
export default function BeforeAfterPage() {
  const { currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredCases, setFilteredCases] = useState([])
  const [activeCase, setActiveCase] = useState(null)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or rows
  const [showInfo, setShowInfo] = useState(false)
  const [doctorParam, setDoctorParam] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Change zoomedImage state to an object that will store both images' states
  const [zoomedImages, setZoomedImages] = useState({ before: false, after: false })
  const [zoomLevels, setZoomLevels] = useState({ before: 1, after: 1 })

  // Animation controllers
  const headerControls = useAnimation()
  const beforeImageRef = useRef(null)
  const afterImageRef = useRef(null)

  // Initialize AOS
  useEffect(() => {
    initAOS()

    // Get doctor parameter from URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const doctor = urlParams.get("doctor")
      setDoctorParam(doctor)
    }

    // Refresh AOS when window is loaded
    window.addEventListener("load", () => {
      if (typeof AOS !== "undefined") {
        AOS.refresh()
      }
    })

    // Add scroll event listener for scroll-to-top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("load", () => {
        if (typeof AOS !== "undefined") {
          AOS.refresh()
        }
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => {
        const titleMatch = Object.values(item.title || {}).some((title) => title && title.toLowerCase().includes(query))
        const categoryMatch = categories
          .find((c) => c.id === item.category)
          ?.name[currentLanguage]?.toLowerCase()
          .includes(query)
        const doctorMatch = dentists
          .find((d) => d.id === item.doctorId)
          ?.name?.toLowerCase()
          .includes(query)

        return titleMatch || categoryMatch || doctorMatch
      })
    }

    setFilteredCases(filtered)
  }, [selectedCategory, selectedDoctor, searchQuery, currentLanguage, dentists])

  useEffect(() => {
    setPageLoaded(true)

    // Animation on page load
    headerControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    })
  }, [headerControls])

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    if (activeCase) {
      document.addEventListener("keydown", handleEscKey)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable body scrolling
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [activeCase])

  // Handle image click for zoom - change function to support zooming both images simultaneously
  const handleImageClick = (type) => {
    setZoomedImages((prev) => {
      // If image is already zoomed, turn off zoom
      if (prev[type]) {
        return { ...prev, [type]: false }
      }
      // If not zoomed, turn on zoom
      return { ...prev, [type]: true }
    })

    setZoomLevels((prev) => {
      // If image is already zoomed, return to original size
      if (zoomedImages[type]) {
        return { ...prev, [type]: 1 }
      }
      // If not zoomed, zoom in
      return { ...prev, [type]: 1.5 }
    })
  }

  // Zoom controls - change zoom functions to support both images
  const handleZoomIn = (type) => {
    // If image is not zoomed, first turn on zoom mode
    if (!zoomedImages[type]) {
      setZoomedImages((prev) => ({
        ...prev,
        [type]: true,
      }))
    }

    // Then increase zoom level
    if (zoomLevels[type] < 3) {
      setZoomLevels((prev) => ({
        ...prev,
        [type]: Math.min(prev[type] + 0.5, 3),
      }))
    }
  }

  // Change handleZoomOut function to work without clicking on the image
  const handleZoomOut = (type) => {
    // If image is not zoomed, first turn on zoom mode
    if (!zoomedImages[type]) {
      setZoomedImages((prev) => ({
        ...prev,
        [type]: true,
      }))
    }

    // Then decrease zoom level
    if (zoomLevels[type] > 1) {
      setZoomLevels((prev) => ({
        ...prev,
        [type]: Math.max(prev[type] - 0.5, 1),
      }))
    }

    // If zoom level reaches 1, turn off zoom mode
    if (zoomLevels[type] <= 1.5) {
      setZoomLevels((prev) => ({
        ...prev,
        [type]: 1,
      }))
      setZoomedImages((prev) => ({
        ...prev,
        [type]: false,
      }))
    }
  }

  const handleZoomReset = (type) => {
    setZoomLevels((prev) => ({
      ...prev,
      [type]: 1,
    }))
    setZoomedImages((prev) => ({
      ...prev,
      [type]: false,
    }))
  }

  // Image download function
  const handleDownloadImage = async (imageUrl, type) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${getDisplayTitle(activeCase)}-${type}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  // Add touch support for mobile devices
  useEffect(() => {
    // If on mobile device, increase drag constraints
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768

    // Cancel pinch-zoom gesture when modal is open
    if (activeCase) {
      document.body.style.touchAction = "none"
    } else {
      document.body.style.touchAction = ""
    }

    return () => {
      document.body.style.touchAction = ""
    }
  }, [activeCase])

  // Adjust dragConstraints based on zoom level
  const getDragConstraints = (type) => {
    if (!activeCase) return { left: 0, right: 0, top: 0, bottom: 0 }

    // Increase movement area based on zoom level
    const constraintFactor = (zoomLevels[type] - 1) * 500
    return {
      left: -constraintFactor,
      right: constraintFactor,
      top: -constraintFactor,
      bottom: constraintFactor,
    }
  }

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
      searchPlaceholder: "ძიება...",
      filterBy: "ფილტრი",
      transformation: "ტრანსფორმაცია",
      clickToZoom: "დააკლიკეთ სურათს გასადიდებლად",
      procedureDescription: "პროცედურის აღწერა",
      procedureText:
        "ეს პროცედურა ჩატარდა უახლესი ტექნოლოგიების გამოყენებით, რაც უზრუნველყოფს მაქსიმალურ კომფორტს და შედეგს პაციენტისთვის.",
      similarCases: "მსგავსი შემთხვევები",
      zoomIn: "გადიდება",
      zoomOut: "დაპატარავება",
      resetZoom: "საწყისი ზომა",
      beforeAfter: "მანამდე და შემდეგ",
      dragToMove: "და გადააადგილეთ მაუსით",
      compareImages: "შეადარეთ სურათები",
      downloadImage: "გადმოწერა",
      scrollToTop: "ზემოთ დაბრუნება",
      amazingResults: "შესანიშნავი შედეგები",
      transformationStory: "ტრანსფორმაციის ისტორია",
      shareCase: "გაზიარება",
      favorite: "რჩეული",
      nextCase: "შემდეგი",
      prevCase: "წინა",
      showMore: "მეტის ნახვა",
      showLess: "ნაკლების ნახვა",
      gridView: "ბადის ხედი",
      rowsView: "რიგების ხედი",
      howToUse: "როგორ გამოვიყენოთ",
      howToUseText:
        "დააკლიკეთ სურათს გასადიდებლად და გადააადგილეთ მაუსით. გამოიყენეთ ზუმის ღილაკები მასშტაბის შესაცვლელად.",
      smileTransformation: "ღიმილის ტრანსფორმაცია",
      exploreTransformations: "აღმოაჩინეთ ტრანსფორმაციები",
      viewAll: "ყველას ნახვა",
      ourResults: "ჩვენი შედეგები",
      transformationGallery: "ტრანსფორმაციის გალერეა",
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
      searchPlaceholder: "Search...",
      filterBy: "Filter by",
      transformation: "Transformation",
      clickToZoom: "Click on image to zoom",
      procedureDescription: "Procedure Description",
      procedureText:
        "This procedure was performed using the latest technologies, ensuring maximum comfort and results for the patient.",
      similarCases: "Similar Cases",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      resetZoom: "Reset zoom",
      beforeAfter: "Before & After",
      dragToMove: "and drag to move",
      compareImages: "Compare images",
      downloadImage: "Download",
      scrollToTop: "Back to top",
      amazingResults: "Amazing Results",
      transformationStory: "Transformation Story",
      shareCase: "Share",
      favorite: "Favorite",
      nextCase: "Next",
      prevCase: "Previous",
      showMore: "Show more",
      showLess: "Show less",
      gridView: "Grid view",
      rowsView: "Rows view",
      howToUse: "How to use",
      howToUseText:
        "Click on an image to zoom in and drag to move around. Use the zoom controls to adjust magnification.",
      smileTransformation: "Smile Transformation",
      exploreTransformations: "Explore Transformations",
      viewAll: "View All",
      ourResults: "Our Results",
      transformationGallery: "Transformation Gallery",
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
      searchPlaceholder: "Поиск...",
      filterBy: "Фильтровать по",
      transformation: "Трансформация",
      clickToZoom: "Нажмите на изображение для увеличения",
      procedureDescription: "Описание процедуры",
      procedureText:
        "Эта процедура была проведена с использованием новейших технологий, обеспечивающих максимальный комфорт и результат для пациента.",
      similarCases: "Похожие случаи",
      zoomIn: "Увеличить",
      zoomOut: "Уменьшить",
      resetZoom: "Сбросить масштаб",
      beforeAfter: "До и После",
      dragToMove: "и перетаскивайте для перемещения",
      compareImages: "Сравните изображения",
      downloadImage: "Скачать",
      scrollToTop: "Наверх",
      amazingResults: "Удивительные результаты",
      transformationStory: "История трансформации",
      shareCase: "Поделиться",
      favorite: "Избранное",
      nextCase: "Следующий",
      prevCase: "Предыдущий",
      showMore: "Показать больше",
      showLess: "Показать меньше",
      gridView: "Вид сеткой",
      rowsView: "Вид списком",
      howToUse: "Как использовать",
      howToUseText:
        "Нажмите на изображение для увеличения и перетаскивайте для перемещения. Используйте кнопки масштабирования для настройки увеличения.",
      smileTransformation: "Трансформация улыбки",
      exploreTransformations: "Исследуйте трансформации",
      viewAll: "Смотреть все",
      ourResults: "Наши результаты",
      transformationGallery: "Галерея трансформаций",
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
      searchPlaceholder: "חיפוש...",
      filterBy: "סנן לפי",
      transformation: "טרנספורמציה",
      clickToZoom: "לחץ על התמונה להגדלה",
      procedureDescription: "תיאור הליך",
      procedureText: "הליך זה בוצע באמצעות הטכנולוגיות המתקדמות ביותר, המבטיחות נוחות מרבית ותוצאה למטופל.",
      similarCases: "מקרים דומים",
      zoomIn: "הגדל",
      zoomOut: "הקטן",
      resetZoom: "איפוס זום",
      beforeAfter: "לפני ואחרי",
      dragToMove: "וגרור כדי להזיז",
      compareImages: "השווה תמונות",
      downloadImage: "הורדה",
      scrollToTop: "חזרה למעלה",
      amazingResults: "תוצאות מדהימות",
      transformationStory: "סיפור הטרנספורמציה",
      shareCase: "שיתוף",
      favorite: "מועדף",
      nextCase: "הבא",
      prevCase: "הקודם",
      showMore: "הצג עוד",
      showLess: "הצג פחות",
      gridView: "תצוגת רשת",
      rowsView: "תצוגת שורות",
      howToUse: "איך להשתמש",
      howToUseText: "לחץ על תמונה כדי להגדיל וגרור כדי לזוז. השתמש בכפתורי הזום כדי להתאים את ההגדלה.",
      smileTransformation: "טרנספורמציית חיוך",
      exploreTransformations: "חקור טרנספורמציות",
      viewAll: "צפה בהכל",
      ourResults: "התוצאות שלנו",
      transformationGallery: "גלריית טרנספורמציות",
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

  // Handle view button click
  const handleViewCase = (caseItem) => {
    setActiveCase(caseItem)
    // Clear zoom state when opening a new case
    setZoomedImages({ before: false, after: false })
    setZoomLevels({ before: 1, after: 1 })
  }

  // Navigate between cases
  const navigateToCase = (direction) => {
    if (!activeCase) return

    const currentIndex = filteredCases.findIndex((c) => c.id === activeCase.id)
    if (currentIndex === -1) return

    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredCases.length
    } else {
      newIndex = (currentIndex - 1 + filteredCases.length) % filteredCases.length
    }

    setActiveCase(filteredCases[newIndex])
    setZoomedImages({ before: false, after: false })
    setZoomLevels({ before: 1, after: 1 })
  }

  // Close modal
  const closeModal = () => {
    setActiveCase(null)
    setZoomedImages({ before: false, after: false })
    setZoomLevels({ before: 1, after: 1 })
  }

  // Function to get a consistent title for display
  const getDisplayTitle = (caseItem) => {
    // If the case has a title in the current language, use it
    if (caseItem.title && caseItem.title[currentLanguage]) {
      return caseItem.title[currentLanguage]
    }

    // Fallback to English title
    if (caseItem.title && caseItem.title.en) {
      return caseItem.title.en
    }

    // If no title is available, use the category name
    const category = categories.find((c) => c.id === caseItem.category)
    if (category && category.name[currentLanguage]) {
      return category.name[currentLanguage]
    }

    // Final fallback
    return category?.name.en || "Case"
  }

  // Function to get category name
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name[currentLanguage] || category?.name.en || ""
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Add useEffect to fix AOS elements after they appear
  useEffect(() => {
    // Function to fix AOS elements
    const fixAOSElements = () => {
      // All elements with aos-animate class
      const animatedElements = document.querySelectorAll(".aos-animate")

      // Add class that will fix elements
      animatedElements.forEach((el) => {
        el.classList.add("aos-fixed")
        // Remove data-aos attribute so AOS doesn't reset animation
        el.removeAttribute("data-aos-delay")
      })
    }

    // Add scroll event listener
    window.addEventListener("scroll", fixAOSElements)

    return () => {
      window.removeEventListener("scroll", fixAOSElements)
    }
  }, [])

  return (
    <>
      <Head>
        <style>{aosStyles}</style>
      </Head>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 font-sans">
        {/* Hero Section - remove parallax effect */}
        <div className="relative bg-[#007A87] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{backgroundColor:"blue"}}>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/dental-abstraction.png')] bg-repeat opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                {selectedDoctor ? (
                  <Link
                    href={`/doctors_vip/${selectedDoctor.id}`}
                    className="inline-flex items-center gap-2 text-teal-100 hover:text-white font-medium transition-colors duration-200"
                  >
                    <ArrowLeft size={16} />
                    {t.backToDoctor}
                  </Link>
                ) : (
                  <Link
                    href="/pages/doctorspage"
                    className="inline-flex items-center gap-2 text-teal-100 hover:text-white font-medium transition-colors duration-200"
                  >
                    <ArrowLeft size={16} />
                    {t.backToList}
                  </Link>
                )}
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t.transformationGallery}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-teal-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t.smileTransformation}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative flex-grow max-w-md mx-auto sm:mx-0">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full pl-12 pr-4 py-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-teal-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 ${
                      isSearchFocused ? "bg-white/30" : ""
                    }`}
                  />
                  <Search className="absolute left-4 top-4 h-5 w-5 text-teal-100" />
                </div>

                <div className="flex gap-2 justify-center">
                  <motion.button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-full ${
                      viewMode === "grid" ? "bg-white text-[#007A87]" : "bg-white/20 text-white hover:bg-white/30"
                    } transition-all duration-200`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode("rows")}
                    className={`p-3 rounded-full ${
                      viewMode === "rows" ? "bg-white text-[#007A87]" : "bg-white/20 text-white hover:bg-white/30"
                    } transition-all duration-200`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Rows size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-3 rounded-full ${
                      showInfo ? "bg-white text-[#007A87]" : "bg-white/20 text-white hover:bg-white/30"
                    } transition-all duration-200`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info size={20} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Category filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                      selectedCategory === category.id
                        ? "bg-white text-[#007A87] shadow-lg shadow-[#007A87]/20"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 50}
                  >
                    {category.name[currentLanguage] || category.name.en}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-12 md:h-16"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-[#f8fafc] dark:fill-gray-900"
              ></path>
            </svg>
          </div>
        </div>

        {/* How to use info panel */}
        <AnimatePresence>
          {showInfo && (
            <div className="container mx-auto px-4 py-4" data-aos="fade-down">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-start gap-4 border border-teal-100 dark:border-gray-700">
                <div className="bg-[#e6f3f5] dark:bg-[#007A87]/30 p-3 rounded-full">
                  <MousePointer className="h-6 w-6 text-[#007A87] dark:text-[#80bdc4]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.howToUse}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t.howToUseText}</p>
                </div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="ml-auto p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {filteredCases.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCases.map((caseItem, index) => (
                    <CaseCard
                      key={caseItem.id}
                      caseItem={caseItem}
                      onView={handleViewCase}
                      currentLanguage={currentLanguage}
                      getDisplayTitle={getDisplayTitle}
                      getCategoryName={getCategoryName}
                      formatDate={formatDate}
                      t={t}
                      dentists={dentists}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredCases.map((caseItem, index) => (
                    <div
                      key={caseItem.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="md:flex">
                        {/* Images */}
                        <div className="md:w-1/2 grid grid-cols-2 gap-1 p-1">
                          {/* Before Image */}
                          <div className="relative aspect-video overflow-hidden">
                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
                              {t.before}
                            </div>
                            <motion.img
                              src={caseItem.beforeImage || "/placeholder.svg"}
                              alt={`${t.before} - ${getDisplayTitle(caseItem)}`}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          {/* After Image */}
                          <div className="relative aspect-video overflow-hidden">
                            <div className="absolute top-2 right-2 bg-[#1E6FB0]/90 text-white text-xs px-2 py-1 rounded-full z-10">
                              {t.after}
                            </div>
                            <motion.img
                              src={caseItem.afterImage || "/placeholder.svg"}
                              alt={`${t.after} - ${getDisplayTitle(caseItem)}`}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-1/2 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {getDisplayTitle(caseItem)}
                              </h3>
                              <div className="flex items-center gap-1">
                                <Sparkles size={16} className="text-yellow-500" />
                                <span className="text-sm text-[#1E6FB0] dark:text-[#3a8bc9] font-medium">
                                  {t.amazingResults}
                                </span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {getCategoryName(caseItem.category)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t.doctor}: {dentists.find((d) => d.id === caseItem.doctorId)?.name || ""}
                              </p>
                            </div>
                          </div>

                          <motion.button
                            onClick={() => handleViewCase(caseItem)}
                            className="w-full bg-[#1E6FB0] hover:bg-[#1a5f96] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors shadow-md"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {t.viewCase} <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              data-aos="fade-up"
              className="bg-white dark:bg-gray-800 p-8 text-center rounded-xl shadow-md max-w-md mx-auto"
            >
              <motion.div
                className="mb-4 text-teal-500"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              >
                <Search size={48} className="mx-auto opacity-50" />
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{t.noResults}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t.tryDifferent}</p>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700 bg-[#e6f3f5] dark:from-gray-800 dark:to-gray-700">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="bg-[#e6f3f5] dark:bg-[#007A87]/30 p-2 rounded-full"
                    >
                      <Smile size={20} className="text-[#007A87] dark:text-[#80bdc4]" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{getDisplayTitle(activeCase)}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => navigateToCase("prev")}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      onClick={() => navigateToCase("next")}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      onClick={closeModal}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </div>

                <div className="overflow-y-auto flex-grow">
                  {/* Before and After images side by side */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.transformation}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Before Image */}
                      <motion.div
                        className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer ${zoomedImages.before ? "z-10" : ""}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleImageClick("before")}
                        layout
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <motion.img
                            ref={beforeImageRef}
                            src={activeCase.beforeImage || "/placeholder.svg"}
                            alt={`${t.before} - ${getDisplayTitle(activeCase)}`}
                            className="w-full h-full object-cover"
                            style={{
                              scale: zoomedImages.before ? zoomLevels.before : 1,
                              transition: "scale 0.3s ease",
                            }}
                            animate={{ scale: zoomedImages.before ? zoomLevels.before : 1 }}
                            drag={zoomedImages.before}
                            dragConstraints={getDragConstraints("before")}
                          />
                          <div className="absolute top-0 left-0 bg-black/70 text-white text-sm px-3 py-1 m-3 rounded">
                            {t.before}
                          </div>

                          {zoomedImages.before && (
                            <div className="absolute bottom-3 right-3 flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomIn("before")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.zoomIn}
                              >
                                <ZoomIn size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomOut("before")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.zoomOut}
                              >
                                <ZoomOut size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomReset("before")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.resetZoom}
                              >
                                <RotateCcw size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* After Image */}
                      <motion.div
                        className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer ${zoomedImages.after ? "z-10" : ""}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleImageClick("after")}
                        layout
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <motion.img
                            ref={afterImageRef}
                            src={activeCase.afterImage || "/placeholder.svg"}
                            alt={`${t.after} - ${getDisplayTitle(activeCase)}`}
                            className="w-full h-full object-cover"
                            style={{
                              scale: zoomedImages.after ? zoomLevels.after : 1,
                              transition: "scale 0.3s ease",
                            }}
                            animate={{ scale: zoomedImages.after ? zoomLevels.after : 1 }}
                            drag={zoomedImages.after}
                            dragConstraints={getDragConstraints("after")}
                          />
                          <div className="absolute top-0 right-0  bg-teal-600 text-white text-sm px-3 py-1 m-3 rounded" style={{backgroundColor:"#1E6FB0"}}>
                            {t.after}
                          </div>

                          {zoomedImages.after && (
                            <div className="absolute bottom-3 right-3 flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomIn("after")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.zoomIn}
                              >
                                <ZoomIn size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomOut("after")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.zoomOut}
                              >
                                <ZoomOut size={20} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleZoomReset("after")
                                }}
                                className="bg-white/80 hover:bg-white p-1 rounded-full"
                                title={t.resetZoom}
                              >
                                <RotateCcw size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Hint for zoom */}
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">{t.clickToZoom}</div>

                    {/* Procedure description */}
                    <div className="mt-6 bg-[#e6f3f5] dark:bg-[#007A87]/20 p-4 rounded-lg">
                      <h4 className="font-medium text-[#007A87] dark:text-[#80bdc4] mb-2">{t.procedureDescription}</h4>
                      <p className="text-[#007A87] dark:text-[#80bdc4]">{t.procedureText}</p>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.details}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.doctor}</p>
                          <p className="text-base text-gray-900 dark:text-white">
                            {dentists.find((d) => d.id === activeCase.doctorId)?.name || ""}
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.category}</p>
                          <p className="text-base text-gray-900 dark:text-white">
                            {getCategoryName(activeCase.category)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Similar cases */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.similarCases}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredCases
                          .filter(
                            (item) =>
                              item.id !== activeCase.id &&
                              (item.category === activeCase.category || item.doctorId === activeCase.doctorId),
                          )
                          .slice(0, 3)
                          .map((item) => (
                            <motion.div
                              key={`similar-${item.id}`}
                              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
                              whileHover={{ y: -5 }}
                              onClick={() => {
                                setActiveCase(item)
                                setZoomedImages({ before: false, after: false })
                                setZoomLevels({ before: 1, after: 1 })
                              }}
                            >
                              <div className="aspect-[4/3] relative">
                                <img
                                  src={item.afterImage || "/placeholder.svg"}
                                  alt={getDisplayTitle(item)}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                                  {getDisplayTitle(item)}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {getCategoryName(item.category)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {dentists.find((d) => d.id === item.doctorId)?.name || ""}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <button
                    onClick={closeModal}
                    className="w-full py-3 bg-[#1E6FB0] hover:bg-[#1a5f96] text-white font-medium rounded-lg transition-colors shadow-md"
                  >
                    {t.close}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-22 right-4 p-3 bg-[#1E6FB0] text-white rounded-full shadow-lg hover:bg-[#1a5f96] transition-colors z-40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
