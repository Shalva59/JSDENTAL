"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function BookingPage() {
  const router = useRouter()
  const { currentLanguage, direction } = useLanguage()
  const dentists = useLocalizedDentists()
  const isRTL = direction === "rtl"
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  // Form state
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isNewPatient, setIsNewPatient] = useState("new")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [availableTimes, setAvailableTimes] = useState([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  // Pre-fill user information if authenticated
  useEffect(() => {
    if (isAuthenticated && session.user) {
      const nameParts = session.user.name ? session.user.name.split(" ") : ["", ""]
      const userFirstName = nameParts[0] || ""
      const userLastName = nameParts.slice(1).join(" ") || ""

      setFirstName(userFirstName)
      setLastName(userLastName)
      setEmail(session.user.email || "")
    }
  }, [isAuthenticated, session])

  // Track window resize for responsive adjustments
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Generate available times when date is selected
  useEffect(() => {
    if (selectedDate) {
      const times = []
      const startHour = 10
      const endHour = 21

      for (let hour = startHour; hour < endHour; hour++) {
        const timeString = `${hour.toString().padStart(2, "0")}:00`
        times.push(timeString)
      }

      setAvailableTimes(times)
    } else {
      setAvailableTimes([])
    }

    setSelectedTime("")
  }, [selectedDate])

  // Translations for all supported languages
  const texts = {
    ka: {
      title: "ჯავშანი",
      backToDoctor: "დაბრუნება ექიმის პროფილზე",
      selectDoctor: "აირჩიეთ ექიმი",
      selectService: "აირჩიეთ სერვისი",
      selectDate: "აირჩიეთ თარიღი",
      selectTime: "აირჩიეთ დრო",
      noTimesAvailable: "არჩეულ დღეს არ არის ხელმისაწვდომი დრო",
      personalInfo: "პირადი ინფორმაცია",
      firstName: "სახელი",
      lastName: "გვარი",
      phone: "ტელეფონი",
      email: "ელ-ფოსტა",
      notes: "დამატებითი შენიშვნები",
      notesPlaceholder: "გთხოვთ მიუთითოთ ნებისმიერი დამატებითი ინფორმაცია ან სპეციალური მოთხოვნები",
      isUrgent: "გადაუდებელი შემთხვევა",
      patientType: "პაციენტის ტიპი",
      newPatient: "ახალი პაციენტი",
      returningPatient: "დაბრუნებული პაციენტი",
      agreeToTerms: "ვეთანხმები ",
      termsAndConditionsText: "წესებს და პირობებს",
      bookAppointment: "დაჯავშნა",
      submitting: "მიმდინარეობს...",
      successTitle: "ჯავშანი წარმატებით შეიქმნა!",
      successMessage: "თქვენი ჯავშანი გაიგზავნა ექიმისთვის დასამტკიცებლად. მიიღებთ შეტყობინებას როდესაც ექიმი გაგიპასუხებთ.",
      backToHome: "მთავარ გვერდზე დაბრუნება",
      viewAppointments: "ჯავშნების ნახვა",
      errorMessage: "შეცდომა დაჯავშნისას. გთხოვთ, სცადოთ მოგვიანებით.",
      requiredField: "აუცილებელი ველი",
      invalidEmail: "არასწორი ელ-ფოსტის ფორმატი",
      invalidPhone: "არასწორი ტელეფონის ფორმატი",
      mustAgreeToTerms: "გთხოვთ, დაეთანხმოთ წესებს და პირობებს",
      autofilled: "ავტომატურად შეივსო თქვენი ანგარიშიდან",
      dailyLimitReached: "დღის ლიმიტი (5 ჯავშანი) ამოიწურა",
      loginRequired: "ჯავშნისთვის საჭიროა ავტორიზაცია",
      services: {
        cleaning: "კბილების პროფესიული წმენდა",
        whitening: "კბილების გათეთრება",
        filling: "კბილის დაბჟენა",
        rootCanal: "ფესვის არხის მკურნალობა",
        extraction: "კბილის ამოღება",
        implant: "იმპლანტი",
        crown: "გვირგვინი",
        braces: "ბრეკეტები",
        veneer: "ვინირი",
        consultation: "კონსულტაცია",
      },
      appointmentDetails: "ჯავშნის დეტალები",
      patientInformation: "პაციენტის ინფორმაცია",
    },
    en: {
      title: "Book Appointment",
      backToDoctor: "Back to Doctor Profile",
      selectDoctor: "Select Doctor",
      selectService: "Select Service",
      selectDate: "Select Date",
      selectTime: "Select Time",
      noTimesAvailable: "No times available on selected date",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone",
      email: "Email",
      notes: "Additional Notes",
      notesPlaceholder: "Please provide any additional information or special requirements",
      isUrgent: "Urgent Case",
      patientType: "Patient Type",
      newPatient: "New Patient",
      returningPatient: "Returning Patient",
      agreeToTerms: "I agree to the ",
      termsAndConditionsText: "terms and conditions",
      bookAppointment: "Book Appointment",
      submitting: "Submitting...",
      successTitle: "Appointment Request Sent!",
      successMessage: "Your appointment request has been sent to the doctor for approval. You will receive a notification when the doctor responds.",
      backToHome: "Back to Home",
      viewAppointments: "View Appointments",
      errorMessage: "Error booking appointment. Please try again later.",
      requiredField: "This field is required",
      invalidEmail: "Invalid email format",
      invalidPhone: "Invalid phone format",
      mustAgreeToTerms: "You must agree to the terms and conditions",
      autofilled: "Auto-filled from your account",
      dailyLimitReached: "Daily limit (5 appointments) reached",
      loginRequired: "Please log in to book an appointment",
      services: {
        cleaning: "Professional Teeth Cleaning",
        whitening: "Teeth Whitening",
        filling: "Dental Filling",
        rootCanal: "Root Canal Treatment",
        extraction: "Tooth Extraction",
        implant: "Dental Implant",
        crown: "Dental Crown",
        braces: "Braces",
        veneer: "Dental Veneer",
        consultation: "Consultation",
      },
      appointmentDetails: "Appointment Details",
      patientInformation: "Patient Information",
    },
    ru: {
      title: "Записаться на прием",
      backToDoctor: "Вернуться к профилю врача",
      selectDoctor: "Выберите врача",
      selectService: "Выберите услугу",
      selectDate: "Выберите дату",
      selectTime: "Выберите время",
      noTimesAvailable: "Нет доступного времени на выбранную дату",
      personalInfo: "Личная информация",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Телефон",
      email: "Эл. почта",
      notes: "Дополнительные примечания",
      notesPlaceholder: "Пожалуйста, укажите любую дополнительную информацию или особые требования",
      isUrgent: "Срочный случай",
      patientType: "Тип пациента",
      newPatient: "Новый пациент",
      returningPatient: "Возвращающийся пациент",
      agreeToTerms: "Я согласен с ",
      termsAndConditionsText: "правилами и условиями",
      bookAppointment: "Записаться на прием",
      submitting: "Отправка...",
      successTitle: "Запрос на прием отправлен!",
      successMessage: "Ваш запрос на прием отправлен врачу для утверждения. Вы получите уведомление, когда врач ответит.",
      backToHome: "Вернуться на главную",
      viewAppointments: "Просмотр записей",
      errorMessage: "Ошибка при создании записи. Пожалуйста, попробуйте позже.",
      requiredField: "Обязательное поле",
      invalidEmail: "Неверный формат эл. почты",
      invalidPhone: "Неверный формат телефона",
      mustAgreeToTerms: "Вы должны согласиться с правилами и условиями",
      autofilled: "Автоматически заполнено из вашей учетной записи",
      dailyLimitReached: "Дневной лимит (5 записей) достигнут",
      loginRequired: "Пожалуйста, войдите в систему для записи на прием",
      services: {
        cleaning: "Профессиональная чистка зубов",
        whitening: "Отбеливание зубов",
        filling: "Пломбирование зуба",
        rootCanal: "Лечение корневого канала",
        extraction: "Удаление зуба",
        implant: "Зубной имплант",
        crown: "Зубная коронка",
        braces: "Брекеты",
        veneer: "Зубной винир",
        consultation: "Консультация",
      },
      appointmentDetails: "Детали записи",
      patientInformation: "Информация о пациенте",
    },
    he: {
      title: "קביעת תור",
      backToDoctor: "חזרה לפרופיל הרופא",
      selectDoctor: "בחר רופא",
      selectService: "בחר שירות",
      selectDate: "בחר תאריך",
      selectTime: "בחר שעה",
      noTimesAvailable: "אין זמנים זמינים בתאריך שנבחר",
      personalInfo: "פרטים אישיים",
      firstName: "שם פרטי",
      lastName: "שם משפחה",
      phone: "טלפון",
      email: 'דוא"ל',
      notes: "הערות נוספות",
      notesPlaceholder: "אנא ספק מידע נוסף או דרישות מיוחדות",
      isUrgent: "מקרה דחוף",
      patientType: "סוג מטופל",
      newPatient: "מטופל חדש",
      returningPatient: "מטופל חוזר",
      agreeToTerms: "אני מסכים ",
      termsAndConditionsText: "לתנאים ולהגבלות",
      bookAppointment: "קבע תור",
      submitting: "שולח...",
      successTitle: "בקשת התור נשלחה!",
      successMessage: "בקשת התור שלך נשלחה לרופא לאישור. תקבל הודעה כאשר הרופא יענה.",
      backToHome: "חזרה לדף הבית",
      viewAppointments: "צפה בתורים",
      errorMessage: "שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.",
      requiredField: "שדה חובה",
      invalidEmail: 'פורמט דוא"ל לא חוקי',
      invalidPhone: "פורמט טלפון לא חוקי",
      mustAgreeToTerms: "עליך להסכים לתנאים ולהגבלות",
      autofilled: "מולא אוטומטית מהחשבון שלך",
      dailyLimitReached: "הגעת למגבלה יומית (5 תורים)",
      loginRequired: "אנא התחבר כדי לקבוע תור",
      services: {
        cleaning: "ניקוי שיניים מקצועי",
        whitening: "הלבנת שיניים",
        filling: "סתימת שיניים",
        rootCanal: "טיפול שורש",
        extraction: "עקירת שן",
        implant: "שתל דנטלי",
        crown: "כתר דנטלי",
        braces: "גשר",
        veneer: "ציפוי חרסינה",
        consultation: "ייעוץ",
      },
      appointmentDetails: "פרטי התור",
      patientInformation: "פרטי המטופל",
    },
  }

  const t = texts[currentLanguage] || texts.ka

  // Format date to string based on locale
  const formatDate = (date) => {
    if (!date) return ""

    try {
      const options = { year: "numeric", month: "long", day: "numeric" }

      let localeCode = "ka-GE"
      if (currentLanguage === "en") localeCode = "en-US"
      if (currentLanguage === "ru") localeCode = "ru-RU"
      if (currentLanguage === "he") localeCode = "he-IL"

      return date.toLocaleDateString(localeCode, options)
    } catch (error) {
      return date.toLocaleDateString()
    }
  }

  // Form validation
  const validateForm = () => {
    if (!isAuthenticated) return t.loginRequired
    if (!selectedDoctor) return t.selectDoctor
    if (!selectedService) return t.selectService
    if (!selectedDate) return t.selectDate
    if (!selectedTime) return t.selectTime
    if (!firstName.trim()) return `${t.firstName}: ${t.requiredField}`
    if (!lastName.trim()) return `${t.lastName}: ${t.requiredField}`
    if (!phone.trim()) return `${t.phone}: ${t.requiredField}`
    if (!/^\+?[0-9\s\-$]{8,}$/.test(phone.trim())) return t.invalidPhone
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return t.invalidEmail
    if (!agreedToTerms) return t.mustAgreeToTerms
    return null
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Prepare appointment data
      const appointmentData = {
        doctorId: selectedDoctor,
        doctorName: dentists.find((d) => String(d.id) === String(selectedDoctor))?.name || selectedDoctor,
        service: selectedService,
        serviceName: t.services[selectedService] || selectedService,
        requestedDate: selectedDate ? formatDate(selectedDate) : "",
        requestedTime: selectedTime,
        patientInfo: {
          firstName,
          lastName,
          phone,
          email,
          isNewPatient,
          isUrgent,
          notes,
        },
        notes,
        isUrgent,
      }

      console.log("Sending appointment data:", appointmentData)

      // Call the API route
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      const result = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(t.dailyLimitReached)
        }
        throw new Error(result.error || "Failed to create appointment")
      }

      // Set success state to show confirmation screen
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error.message || t.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form for booking another appointment
  const resetForm = () => {
    setSelectedDate(null)
    setSelectedTime("")
    setSelectedDoctor("")
    setSelectedService("")
    setFirstName("")
    setLastName("")
    setPhone("")
    setEmail("")
    setNotes("")
    setIsUrgent(false)
    setIsNewPatient("new")
    setAgreedToTerms(false)
    setIsSuccess(false)
    setError("")
  }

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

  // Success screen
  if (isSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen py-8" dir={direction}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                variants={slideUp}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              <motion.h1 className="text-2xl font-bold text-gray-800 mb-2" variants={slideUp}>
                {t.successTitle}
              </motion.h1>
              <motion.p className="text-gray-600 mb-8" variants={slideUp}>
                {t.successMessage}
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={slideUp}>
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t.backToHome}
                </button>
                <button
                  onClick={() => router.push("/appointments")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t.viewAppointments}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen py-8" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.loginRequired}</h1>
            <p className="text-gray-600 mb-6">გთხოვთ შეხვიდეთ ანგარიშში ჯავშნის შესაქმნელად</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/pages/authorization/log_in"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                შესვლა
              </Link>
              <Link
                href="/pages/authorization/registration"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                რეგისტრაცია
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {t.backToDoctor}
          </Link>
        </motion.div>

        {/* Main content */}
        <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeIn}>
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.title}
          </motion.h1>

          {/* Booking form */}
          <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden" variants={slideUp}>
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`py-3 px-6 font-medium text-sm flex-1 text-center ${
                    activeTab === "details"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  {t.appointmentDetails}
                </button>
                <button
                  className={`py-3 px-6 font-medium text-sm flex-1 text-center ${
                    activeTab === "patient"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("patient")}
                  id="patient-tab"
                >
                  {t.patientInformation}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="p-6">
                  <motion.div
                    className="grid gap-6 md:grid-cols-2"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Doctor selection */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                        {t.selectDoctor}
                      </label>
                      <select
                        id="doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t.selectDoctor}</option>
                        {dentists.map((dentist) => (
                          <option key={dentist.id} value={dentist.id}>
                            {dentist.name}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Service selection */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                        {t.selectService}
                      </label>
                      <select
                        id="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t.selectService}</option>
                        {Object.entries(t.services).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Date selection */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        {t.selectDate}
                      </label>
                      <input
                        type="date"
                        id="date"
                        onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                        min={new Date().toISOString().split("T")[0]}
                        max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                        className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>

                    {/* Time selection */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        {t.selectTime}
                      </label>
                      <select
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate || availableTimes.length === 0}
                        className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t.selectTime}</option>
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            {t.noTimesAvailable}
                          </option>
                        )}
                      </select>
                    </motion.div>

                    {/* Urgent case checkbox */}
                    <motion.div className="space-y-2 md:col-span-2" variants={slideUp}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="urgent"
                          checked={isUrgent}
                          onChange={(e) => setIsUrgent(e.target.checked)}
                          className="h-4 w-4 text-black text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="urgent" className="font-normal cursor-pointer text-gray-700">
                          {t.isUrgent}
                        </label>
                      </div>
                    </motion.div>

                    {/* Patient type */}
                    <motion.div className="space-y-3 md:col-span-2" variants={slideUp}>
                      <label className="block text-sm font-medium text-gray-700">{t.patientType}</label>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="new-patient"
                            name="patientType"
                            value="new"
                            checked={isNewPatient === "new"}
                            onChange={() => setIsNewPatient("new")}
                            className="h-4 w-4 text-black text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="new-patient" className="font-normal cursor-pointer text-gray-700">
                            {t.newPatient}
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="returning-patient"
                            name="patientType"
                            value="returning"
                            checked={isNewPatient === "returning"}
                            onChange={() => setIsNewPatient("returning")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="returning-patient" className="font-normal cursor-pointer text-gray-700">
                            {t.returningPatient}
                          </label>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div className="md:col-span-2 flex justify-end" variants={slideUp}>
                      <button
                        type="button"
                        onClick={() => setActiveTab("patient")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {t.personalInfo} →
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Patient Tab */}
              {activeTab === "patient" && (
                <div className="p-6">
                  <motion.div
                    className="grid gap-6 md:grid-cols-2"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* First name */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        {t.firstName} *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isAuthenticated}
                        required
                        className={`w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isAuthenticated ? "bg-gray-100" : ""
                        }`}
                      />
                      {isAuthenticated && <p className="text-xs text-gray-500 mt-1">{t.autofilled}</p>}
                    </motion.div>

                    {/* Last name */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        {t.lastName} *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isAuthenticated}
                        required
                        className={`w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isAuthenticated ? "bg-gray-100" : ""
                        }`}
                      />
                      {isAuthenticated && <p className="text-xs text-gray-500 mt-1">{t.autofilled}</p>}
                    </motion.div>

                    {/* Phone */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        {t.phone} *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div className="space-y-2" variants={slideUp}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        {t.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isAuthenticated}
                        className={`w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isAuthenticated ? "bg-gray-100" : ""
                        }`}
                      />
                      {isAuthenticated && <p className="text-xs text-gray-500 mt-1">{t.autofilled}</p>}
                    </motion.div>

                    {/* Notes */}
                    <motion.div className="space-y-2 md:col-span-2" variants={slideUp}>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        {t.notes}
                      </label>
                      <textarea
                        id="notes"
                        placeholder={t.notesPlaceholder}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                      />
                    </motion.div>

                    {/* Terms and conditions */}
                    <motion.div className="space-y-2 md:col-span-2" variants={slideUp}>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          required
                          className="h-4 w-4 text-black text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="font-normal cursor-pointer text-gray-700">
                          {t.agreeToTerms}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            {t.termsAndConditionsText}
                          </Link>
                        </label>
                      </div>
                    </motion.div>

                    {/* Error message */}
                    {error && (
                      <motion.div
                        className="md:col-span-2 text-red-500 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <motion.div className="md:col-span-2 flex justify-end" variants={slideUp}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors min-w-[150px] ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            {t.submitting}
                          </>
                        ) : (
                          t.bookAppointment
                        )}
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}