"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"
import { Calendar, ArrowLeft, GraduationCap, Phone, Mail, Camera, Award, MessageCircle, X  } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"

export default function DoctorDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { translations, direction, currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()
  const isRTL = direction === "rtl"
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(doctor?.id === 2 ? "services" : "education") // Set default tab based on doctor ID
  const [countStarted, setCountStarted] = useState(false)
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const countObserver = useRef(null)
  const { data: session, status: authStatus } = useSession()
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [hasExistingConversation, setHasExistingConversation] = useState(false)
  const [checkingConversation, setCheckingConversation] = useState(false)

  // Track window resize for responsive adjustments
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Find the doctor with the matching ID
    const foundDoctor = dentists.find((dentist) => String(dentist.id) === String(id))

    if (foundDoctor) {
      setDoctor(foundDoctor)

      // Extract years of experience immediately when doctor is found
      const experienceYears = foundDoctor.experience ? foundDoctor.experience.match(/\d+/) : null
      const years = experienceYears ? experienceYears[0] : "10"
      const yearsNum = Number.parseInt(years, 10)

      // Set count directly without animation for initial render
      setCount(yearsNum)
      setCountStarted(true)
    }

    // Simulate loading for animation
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id, dentists])

  // Extract years of experience from the experience string
  const experienceYears = doctor?.experience ? doctor.experience.match(/\d+/) : null
  const years = experienceYears ? experienceYears[0] : "10"
  const yearsNum = Number.parseInt(years, 10)

  // Set up intersection observer for counting animation only for subsequent views
  useEffect(() => {
    // Skip setting up observer if count is already started
    if (!countRef.current || countStarted) return

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const handleIntersect = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !countStarted) {
        setCountStarted(true)
        animateCount(0, yearsNum, 1500)
      }
    }

    countObserver.current = new IntersectionObserver(handleIntersect, options)
    countObserver.current.observe(countRef.current)

    return () => {
      if (countObserver.current) {
        countObserver.current.disconnect()
      }
    }
  }, [countStarted, yearsNum, doctor])

  // Function to animate count
  const animateCount = (start, end, duration) => {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  // Service descriptions for each language and specialty
  const serviceDescriptions = {
    ka: {
      ორთოპედი: "პროფესიონალური ორთოპედიული სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      იმპლანტოლოგი: "პროფესიონალური იმპლანტოლოგიური სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      პროთეზისტი: "პროფესიონალური პროთეზირების სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      თერაპევტი: "პროფესიონალური თერაპიული სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      "ბავშვთა სტომატოლოგი": "პროფესიონალური ბავშვთა სტომატოლოგიური სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      ქირურგი: "პროფესიონალური ქირურგიული სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      პაროდონტოლოგი: "პროფესიონალური პაროდონტოლოგიური სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
      ორთოდონტი: "პროფესიონალური ორთოდონტიული სერვისები უახლესი ტექნიკითა და აღჭურვილობით.",
    },
    en: {
      Orthopedist: "Professional orthopedic services with the latest techniques and equipment.",
      Implantologist: "Professional implantology services with the latest techniques and equipment.",
      Prosthetist: "Professional prosthetic services with the latest techniques and equipment.",
      Therapist: "Professional therapy services with the latest techniques and equipment.",
      "Pediatric Dentist": "Professional pediatric dental services with the latest techniques and equipment.",
      Surgeon: "Professional surgical services with the latest techniques and equipment.",
      Periodontologist: "Professional periodontal services with the latest techniques and equipment.",
      Orthodontist: "Professional orthodontic services with the latest techniques and equipment.",
    },
    ru: {
      Ортопед: "Профессиональные ортопедические услуги с использованием новейших техник и оборудования.",
      Имплантолог: "Профессиональные имплантологические услуги с использованием новейших техник и оборудования.",
      Протезист: "Профессиональные протезные услуги с использованием новейших техник и оборудования.",
      Терапевт: "Профессиональные терапевтические услуги с использованием новейших техник и оборудования.",
      "Детский стоматолог":
        "Профессиональные услуги детской стоматологии с использованием новейших техник и оборудования.",
      Хирург: "Профессиональные Хирургические услуги с использованием новейших техник и оборудования.",
      Пародонтолог: "Профессиональные пародонтологические услуги с использованием новейших техник и оборудования.",
      Ортодонт: "Профессиональные ортодонтические услуги с использованием новейших техник и оборудования.",
    },
    he: {
      אורתופד: "שירותי אורתופדיה מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      שתלים: "שירותי שתלים מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      תותבות: "שירותי תותבות מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      מטפל: "שירותי טיפול מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      "רופא שיניים לילדים": "שירותי רפואת שיניים לילדים מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      מנתח: "שירותים כירורגיים מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      פריודונטולוג: "שירותי פריודונטיה מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
      אורתודונט: "שירותי אורתודונטיה מקצועיים עם הטכניקות והציוד המתקדמים ביותר.",
    },
  }

  // Function to get localized service description
  const getServiceDescription = (specialty) => {
    const descriptions = serviceDescriptions[currentLanguage] || serviceDescriptions.en
    return (
      descriptions[specialty] ||
      `Professional ${specialty.toLowerCase()} services with the latest techniques and equipment.`
    )
  }

  // Translations for all supported languages
  const texts = {
    ka: {
      title: "ექიმის პროფილი",
      notFound: "ექიმი ვერ მოიძებნა",
      backToList: "დაბრუნება ექიმების სიაში",
      specialties: "სპეციალობები",
      experience: "გამოცდილება",
      education: "განათლება",
      certifications: "სერტიფიკატები",
      workingDays: "სამუშაო დღეები",
      workingHours: "სამუშაო საათები",
      contactInfo: "საკონტაქტო ინფორმაცია",
      phone: "ტელეფონი",
      email: "ელ-ფოსტა",
      portfolio: "ნამუშევრები",
      viewPortfolio: "ნახეთ ნამუშევრები",
      bookAppointment: "ჯავშანი",
      about: "ექიმის შესახებ",
      services: "სერვისები",
      reviews: "შეფასებები",
      years: "წელი გამოცდილება",
      loading: "იტვირთება...",
      beforeAfter: "მკურნალობამდე და შემდეგ",
      specialtyServices: "სპეციალიზებული სერვისები",
      // commonServices: "ძირითადი სერვისები",
      // price: "ფასი",
      // Education institutions
      tbilisiMedicalUniversity: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტი",
      dentiveri: "დენტივერი",
      unident: "Unident",
      // Certification types
      implantology: "იმპლანტოლოგია",
      orthodontics: "ორთოდონტია",
      aestheticDentistry: "ესთეტიკური სტომატოლოგია",
      pediatricDentistry: "ბავშვთა სტომატოლოგია",
      endodontics: "ენდოდონტია",
      dentalSurgery: "დენტალური ქირურგია",
      infoComingSoon: "ინფორმაცია ვერ მოიძებნა",
    },
    en: {
      title: "Doctor Profile",
      notFound: "Doctor not found",
      backToList: "Back to doctors list",
      specialties: "Specialties",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      workingDays: "Working Days",
      workingHours: "Working Hours",
      contactInfo: "Contact Information",
      phone: "Phone",
      email: "Email",
      portfolio: "Portfolio",
      viewPortfolio: "View Portfolio",
      bookAppointment: "Book Appointment",
      about: "About Doctor",
      services: "Services",
      reviews: "Reviews",
      years: "years experience",
      loading: "Loading...",
      beforeAfter: "Before & After",
      specialtyServices: "Specialty Services",
      // commonServices: "Common Services",
      // price: "Price",
      // Education institutions
      tbilisiMedicalUniversity: "Tbilisi State Medical University",
      dentiveri: "Dentiveri",
      unident: "Unident",
      // Certification types
      implantology: "Implantology",
      orthodontics: "Orthodontics",
      aestheticDentistry: "Aesthetic Dentistry",
      pediatricDentistry: "Pediatric Dentistry",
      endodontics: "Endodontics",
      dentalSurgery: "Dental Surgery",
      infoComingSoon: "Information not found",
    },
    ru: {
      title: "Профиль врача",
      notFound: "Врач не найден",
      backToList: "Вернуться к списку врачей",
      specialties: "Специальности",
      experience: "Опыт работы",
      education: "Образование",
      certifications: "Сертификаты",
      workingDays: "Рабочие дни",
      workingHours: "Рабочие часы",
      contactInfo: "Контактная информация",
      phone: "Телефон",
      email: "Эл. почта",
      portfolio: "Портфолио",
      viewPortfolio: "Смотреть портфолио",
      bookAppointment: "Записаться на прием",
      about: "О враче",
      services: "Услуги",
      reviews: "Отзывы",
      years: "лет опыта",
      loading: "Загрузка...",
      beforeAfter: "До и После",
      specialtyServices: "Специализированные услуги",
      // commonServices: "Основные услуги",
      // price: "Цена",
      // Education institutions
      tbilisiMedicalUniversity: "Тбилисский государственный медицинский университет",
      dentiveri: "Дентивери",
      unident: "Юнидент",
      // Certification types
      implantology: "Имплантология",
      orthodontics: "Ортодонтия",
      aestheticDentistry: "Эстетическая стоматология",
      pediatricDentistry: "Детская стоматология",
      endodontics: "Эндодонтия",
      dentalSurgery: "Дентальная хирургия",
      infoComingSoon: "Информация не найдена",
    },
    he: {
      title: "פרופיל רופא",
      notFound: "הרופא לא נמצא",
      backToList: "חזרה לרשימת הרופאים",
      specialties: "התמחויות",
      experience: "ניסיון",
      education: "השכלה",
      certifications: "תעודות",
      workingDays: "ימי עבודה",
      workingHours: "שעות עבודה",
      contactInfo: "פרטי התקשרות",
      phone: "טלפון",
      email: "אימייל",
      portfolio: "תיק עבודות",
      viewPortfolio: "צפה בתיק העבודות",
      bookAppointment: "קביעת תור",
      about: "אודות הרופא",
      services: "שירותים",
      reviews: "ביקורות",
      years: "שנות ניסיון",
      loading: "טוען...",
      beforeAfter: "לפני ואחרי",
      specialtyServices: "שירותים מתמחים",
      // commonServices: "שירותים נפוצים",
      // price: "מחיר",
      // Education institutions
      tbilisiMedicalUniversity: "האוניברסיטה הרפואית של טביליסי",
      dentiveri: "דנטיברי",
      unident: "יונידנט",
      // Certification types
      implantology: "שתלים",
      orthodontics: "יישור שיניים",
      aestheticDentistry: "רפואת שיניים אסתטית",
      pediatricDentistry: "רפואת שיניים לילדים",
      endodontics: "טיפולי שורש",
      dentalSurgery: "כירורגיית פה ולסת",
      infoComingSoon: "המידע לא נמצא",
    },
  }

  // Get translations for current language
  const t = texts[currentLanguage] || texts.ka

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
  }

  // Tab content animation variants - adjusted for RTL support
  const tabContentVariants = {
    hidden: {
      opacity: 0,
      x: isRTL ? 10 : -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: isRTL ? -10 : 10,
      transition: { duration: 0.2 },
    },
  }

  // Define tabs based on screen size
  const getTabs = () => {
    // Default tabs for all screen sizes
    const tabs = [
      // { id: "about", label: t.about },
      { id: "education", label: t.education },
      { id: "certifications", label: t.certifications },
      { id: "services", label: t.services },
      // კონტაქტების ტაბი
      // { id: "contact", label: t.contactInfo },
    ]

    // For very small screens, limit to fewer tabs
    if (windowWidth < 360) {
      return [
        { id: "education", label: t.education },
        { id: "certifications", label: t.certifications },
        { id: "services", label: t.services },
      ]
    }

    return tabs
  }

  // Navigate to the before-after page with doctor ID
  const handleViewPortfolio = () => {
    router.push(`/pages/before_and_after?doctor=${id}`)
  }

  const MessageModal = ({ isOpen, onClose, onSend, loading, doctorName }) => {
    const [message, setMessage] = useState("")
    const { currentLanguage } = useLanguage()
    
    // Translations
    const modalTexts = {
      ka: {
        title: "შეტყობინების გაგზავნა",
        titleTo: "გაგზავნა",
        placeholder: "დაწერეთ შეტყობინება...",
        send: "გაგზავნა",
        cancel: "გაუქმება",
        sending: "იგზავნება...",
        messageRequired: "შეტყობინება აუცილებელია"
      },
      en: {
        title: "Send a Message",
        titleTo: "to",
        placeholder: "Type your message...",
        send: "Send",
        cancel: "Cancel",
        sending: "Sending...",
        messageRequired: "Message is required"
      },
      ru: {
        title: "Отправить сообщение",
        titleTo: "для",
        placeholder: "Введите сообщение...",
        send: "Отправить",
        cancel: "Отмена",
        sending: "Отправка...",
        messageRequired: "Сообщение обязательно"
      },
      he: {
        title: "שלח הודעה",
        titleTo: "אל",
        placeholder: "הקלד את ההודעה שלך...",
        send: "שלח",
        cancel: "ביטול",
        sending: "שולח...",
        messageRequired: "הודעה נדרשת"
      }
    }
    
    const t = modalTexts[currentLanguage] || modalTexts.ka
    
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!message.trim()) {
        return // Don't send empty messages
      }
      onSend(message)
    }
    
    if (!isOpen) return null
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800">
              {t.title} {t.titleTo} Dr. {doctorName}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? t.sending : t.send}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const checkExistingConversation = async () => {
    if (!session || !doctor) return
    
    setCheckingConversation(true)
    try {
      const response = await fetch("/api/conversations")
      if (response.ok) {
        const data = await response.json()
        // Check if there's already a conversation with this doctor
        const existing = data.conversations?.find(
          conv => conv.doctorId === doctor.id
        )
        setHasExistingConversation(!!existing)
      }
    } catch (error) {
      console.error("Error checking conversations:", error)
    } finally {
      setCheckingConversation(false)
    }
  }
  
  // Call it when component mounts or doctor changes
  useEffect(() => {
    if (session && doctor) {
      checkExistingConversation()
    }
  }, [session, doctor])

  const handleSendMessage = async (message) => {
    if (!session) {
      router.push("/pages/authorization/log_in")
      return
    }
    
    setSendingMessage(true)
    setMessageError("")
    
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          initialMessage: message,
          isPatientInitiated: true
        }),
      })
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to start conversation");
      }
      
      const data = await response.json();
      
      // Update the state to reflect that a conversation now exists
      setHasExistingConversation(true);
      
      // Close modal and navigate to messages page
      setShowMessageModal(false);
      router.push("/messages");
    } catch (error) {
      console.error("Error sending message:", error);
      setMessageError(error.message);
    } finally {
      setSendingMessage(false);
    }
  }
  
  // Get doctor's specialty institution based on ID
  const getSpecialtyInstitution = () => {
    if (id === 1) {
      return t.dentiveri
    } else if (id === 2 || id === 3 || id === 4) {
      return t.unident
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.p
            className="mt-4 text-blue-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {t.loading}
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="bg-gray-50 min-h-screen py-8" dir={direction}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-2xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t.notFound}
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Link
                href="/pages/doctorspage"
                className="text-blue-600 hover:text-blue-700 inline-flex items-center justify-center gap-2 font-medium"
              >
                <ArrowLeft size={16} />
                {t.backToList}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  const specialtyInstitution = getSpecialtyInstitution()

  return (
    <div className="bg-gray-50 min-h-screen py-8" dir={direction}>
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/pages/doctorspage"
            className={`inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 transition-colors font-medium ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <ArrowLeft size={16} />
            {t.backToList}
          </Link>
        </motion.div>

        {/* Doctor header card */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="md:flex">
            <motion.div className="md:w-1/3 p-6" variants={slideUp}>
              <motion.div
                className="rounded-xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative w-full aspect-[3/4]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img
                    src={doctor.image || "/placeholder.svg?height=400&width=300"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className="md:w-2/3 p-6" variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" variants={slideUp}>
                {doctor.name}
              </motion.h1>

              {/* Specialties */}
              <motion.div className="mb-6" variants={slideUp}>
                <h2 className="text-lg font-medium text-gray-700 mb-2">{t.specialties}</h2>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {doctor.specialties.map((specialty, index) => (
                    <motion.span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      variants={slideUp}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
                    >
                      {specialty}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Experience */}
              <motion.div className="mb-6" variants={slideUp}>
                <h2 className="text-lg font-medium text-gray-700 mb-2">{t.experience}</h2>
                <p className="text-gray-600" ref={countRef}>
                  <span className="font-medium">{count}</span> {t.years}
                </p>
              </motion.div>

              {/* Working schedule */}
              <motion.div className="grid md:grid-cols-2 gap-6" variants={slideUp}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div whileHover={{ rotate: 15 }}>
                      <Calendar size={18} className="text-blue-600" />
                    </motion.div>
                    <h2 className="text-lg font-medium text-gray-700">{t.workingDays}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctor.workingDays.map((day, index) => (
                      <motion.span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {day}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Portfolio button */}
              <motion.div className="mt-6 flex flex-col sm:flex-row gap-4" variants={slideUp}>
                <motion.button
                  onClick={handleViewPortfolio}
                  className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Camera size={18} />
                  {t.viewPortfolio}
                </motion.button>

                {/* Book appointment button */}
                <motion.button
                  onClick={() => router.push("/pages/booking")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={pulseAnimation}
                >
                  {t.bookAppointment}
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (hasExistingConversation) {
                      // If conversation exists, go directly to messages
                      router.push("/messages")
                    } else {
                      // Otherwise, show the modal to create new conversation
                      setShowMessageModal(true)
                    }
                  }}
                  disabled={checkingConversation}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={18} />
                  {checkingConversation 
                    ? "..." 
                    : hasExistingConversation 
                      ? (translations?.buttons?.viewConversation || "View Conversation")
                      : (translations?.buttons?.sendMessage || "Send Message")
                  }
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Tab navigation - improved for responsive design */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex whitespace-nowrap min-w-full">
              {getTabs().map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 sm:px-6 font-medium text-sm flex-1 text-center ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Tab content - with RTL-aware animations and styling */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* About tab */}
              {activeTab === "about" && (
                <motion.div key="about" initial="hidden" animate="visible" exit="exit" variants={tabContentVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.about}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {doctor.bio ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."}
                  </p>
                </motion.div>
              )}

              {/* Education tab - styled to match the screenshot with RTL support */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div whileHover={{ rotate: 15 }}>
                        <GraduationCap size={22} className="text-blue-600" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-800">{t.education}</h2>
                    </div>
                    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
                      {/* Base education for all doctors */}
                      <motion.div
                        className={`border-blue-500 py-2 ${isRTL ? "border-r-4 pr-4" : "border-l-4 pl-4"}`}
                        variants={slideUp}
                        whileHover={{ x: isRTL ? -5 : 5, transition: { duration: 0.2 } }}
                      >
                        <h3 className="font-bold text-gray-800">{t.tbilisiMedicalUniversity}</h3>
                        <p className="text-gray-600">{doctor.id === 2 ? "2002" : "2016-2021"}</p>
                      </motion.div>

                      {/* Additional education based on doctor ID */}
                      {doctor.id === 1 && (
                        <motion.div
                          className={`border-blue-500 py-2 ${isRTL ? "border-r-4 pr-4" : "border-l-4 pl-4"}`}
                          variants={slideUp}
                          whileHover={{ x: isRTL ? -5 : 5, transition: { duration: 0.2 } }}
                        >
                          <h3 className="font-bold text-gray-800">{t.dentiveri}</h3>
                          <p className="text-gray-600">2021-2022</p>
                        </motion.div>
                      )}

                      {/* Unident for doctor ID 2 with year 2002 */}
                      {doctor.id === 2 && (
                        <motion.div
                          className={`border-blue-500 py-2 ${isRTL ? "border-r-4 pr-4" : "border-l-4 pl-4"}`}
                          variants={slideUp}
                          whileHover={{ x: isRTL ? -5 : 5, transition: { duration: 0.2 } }}
                        >
                          <h3 className="font-bold text-gray-800">{t.unident}</h3>
                          <p className="text-gray-600">2002</p>
                        </motion.div>
                      )}

                      {/* Unident for doctors 3 and 4 with years 2021-2022 */}
                      {(doctor.id === 3 || doctor.id === 4) && (
                        <motion.div
                          className={`border-blue-500 py-2 ${isRTL ? "border-r-4 pr-4" : "border-l-4 pl-4"}`}
                          variants={slideUp}
                          whileHover={{ x: isRTL ? -5 : 5, transition: { duration: 0.2 } }}
                        >
                          <h3 className="font-bold text-gray-800">{t.unident}</h3>
                          <p className="text-gray-600">2021-2022</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Certifications tab */}
              {activeTab === "certifications" && (
                <motion.div
                  key="certifications"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div whileHover={{ rotate: 15 }}>
                        <Award size={22} className="text-blue-600" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-800">{t.certifications}</h2>
                    </div>
                    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
                      {/* TSSU Certification for all doctors */}
                      <motion.div
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow border-t-4 border-t-blue-500"
                        variants={slideUp}
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800 mb-1">{t.tbilisiMedicalUniversity}</h3>
                          </div>
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {doctor.id === 2 ? "2002" : "2021"}
                          </span>
                        </div>
                      </motion.div>

                      {/* Dentiveri certification for doctor 1 */}
                      {doctor.id === 1 && (
                        <motion.div
                          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                          variants={slideUp}
                          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">{t.dentiveri}</h3>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              2022
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Unident certification for doctor 2 with year 2002 */}
                      {doctor.id === 2 && (
                        <motion.div
                          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                          variants={slideUp}
                          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">{t.unident}</h3>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              2002
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Unident certification for doctors 3, 4 */}
                      {(doctor.id === 3 || doctor.id === 4) && (
                        <motion.div
                          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                          variants={slideUp}
                          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">{t.unident}</h3>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              2022
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Services tab */}
              {activeTab === "services" && (
                <motion.div key="services" initial="hidden" animate="visible" exit="exit" variants={tabContentVariants}>
                  <div className="space-y-8">
                    {/* Specialty Services */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{t.specialtyServices}</h3>
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.15,
                              delayChildren: 0.1,
                            },
                          },
                        }}
                      >
                        {doctor.specialties.map((specialty, index) => (
                          <motion.div
                            key={index}
                            className="border border-gray-200 rounded-lg p-5 bg-white hover:border-blue-400 transition-all"
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.6,
                                  ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for a more natural motion
                                },
                              },
                            }}
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                              transition: { duration: 0.3, ease: "easeOut" },
                            }}
                          >
                            <motion.h3
                              className="font-bold text-gray-800 mb-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                            >
                              {specialty}
                            </motion.h3>
                            <motion.p
                              className="text-gray-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                              {getServiceDescription(specialty)}
                            </motion.p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Contact tab */}
              {activeTab === "contact" && (
                <motion.div key="contact" initial="hidden" animate="visible" exit="exit" variants={tabContentVariants}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.contactInfo}</h2>
                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      className={`flex items-center gap-4 ${isRTL ? "flex-row" : ""}`}
                      variants={slideUp}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="bg-blue-50 p-3 rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                      >
                        <Phone size={20} className="text-blue-600" />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-gray-700">{t.phone}</h4>
                        <p className="text-gray-600">+995 32 222 33 44</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className={`flex items-center gap-4 ${isRTL ? "flex-row" : ""}`}
                      variants={slideUp}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="bg-blue-50 p-3 rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                      >
                        <Mail size={20} className="text-blue-600" />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-gray-700">{t.email}</h4>
                        <p className="text-gray-600">doctor@jcdental.ge</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        {/* Message Modal */}
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          onSend={handleSendMessage}
          loading={sendingMessage}
          doctorName={doctor.name}
        />
      </div>
    </div>
  )
}
