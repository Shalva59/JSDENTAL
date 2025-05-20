"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import Link from "next/link"
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MessageSquare
} from "lucide-react"

export default function AppointmentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { currentLanguage, direction } = useLanguage()
  const isRTL = direction === "rtl"

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [actionReason, setActionReason] = useState("")
  const [counterOfferDate, setCounterOfferDate] = useState("")
  const [counterOfferTime, setCounterOfferTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userIsDoctor, setUserIsDoctor] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Translations
  const texts = {
    ka: {
      title: "ჩემი ჯავშნები",
      doctorTitle: "მიმართული ჯავშნები",
      noAppointments: "ჯავშნები არ არის",
      loading: "იტვირთება...",
      refreshing: "განახლება...",
      patient: "პაციენტი",
      doctor: "ექიმი",
      service: "სერვისი",
      date: "თარიღი",
      time: "დრო",
      status: "სტატუსი",
      notes: "შენიშვნები",
      urgent: "გადაუდებელი",
      newPatient: "ახალი პაციენტი",
      returningPatient: "დაბრუნებული პაციენტი",
      contactInfo: "საკონტაქტო ინფორმაცია",
      actions: "მოქმედებები",
      approve: "დამტკიცება",
      decline: "უარყოფა",
      counterOffer: "ალტერნატივა",
      cancel: "გაუქმება",
      accept: "მიღება",
      viewDetails: "დეტალები",
      reason: "მიზეზი",
      reasonPlaceholder: "მიუთითეთ მიზეზი...",
      newDateTime: "ახალი თარიღი და დრო",
      selectDate: "აირჩიეთ თარიღი",
      selectTime: "აირჩიეთ დრო",
      submit: "გაგზავნა",
      close: "დახურვა",
      confirmAction: "მოქმედების დადასტურება",
      actionSuccess: "მოქმედება წარმატებით შესრულდა",
      actionError: "შეცდომა მოქმედების შესრულებისას",
      refresh: "განახლება",
      backToHome: "მთავარზე დაბრუნება",
      loginRequired: "საჭიროა ავტორიზაცია",
      doctorSubtitle: "მართეთ თქვენთვის მიმართული ჯავშნები",
      userSubtitle: "ნახეთ თქვენი ჯავშნების სია და სტატუსი",
      noAppointmentsDoctor: "თქვენთვის ჯერ არ არის მიმართული ჯავშნები",
      noAppointmentsUser: "თქვენ ჯერ არ გაქვთ ჯავშნები",
      createNewAppointment: "ახალი ჯავშნის შექმნა",
      login: "შესვლა",
      statuses: {
        pending: "მოლოდინში",
        approved: "დამტკიცებული",
        declined: "უარყოფილი",
        cancelled: "გაუქმებული",
        counter_offer: "ალტერნატივა"
      }
    },
    en: {
      title: "My Appointments",
      doctorTitle: "Patient Appointments",
      noAppointments: "No appointments found",
      loading: "Loading...",
      refreshing: "Refreshing...",
      patient: "Patient",
      doctor: "Doctor",
      service: "Service",
      date: "Date",
      time: "Time",
      status: "Status",
      notes: "Notes",
      urgent: "Urgent",
      newPatient: "New Patient",
      returningPatient: "Returning Patient",
      contactInfo: "Contact Information",
      actions: "Actions",
      approve: "Approve",
      decline: "Decline",
      counterOffer: "Counter Offer",
      cancel: "Cancel",
      accept: "Accept",
      viewDetails: "View Details",
      reason: "Reason",
      reasonPlaceholder: "Enter reason...",
      newDateTime: "New Date & Time",
      selectDate: "Select Date",
      selectTime: "Select Time",
      submit: "Submit",
      close: "Close",
      confirmAction: "Confirm Action",
      actionSuccess: "Action completed successfully",
      actionError: "Error performing action",
      refresh: "Refresh",
      backToHome: "Back to Home",
      loginRequired: "Login Required",
      doctorSubtitle: "Manage appointments assigned to you",
      userSubtitle: "View your appointments list and status",
      noAppointmentsDoctor: "No appointments have been assigned to you yet",
      noAppointmentsUser: "You don't have any appointments yet",
      createNewAppointment: "Create New Appointment",
      login: "Login",
      statuses: {
        pending: "Pending",
        approved: "Approved",
        declined: "Declined",
        cancelled: "Cancelled",
        counter_offer: "Counter Offer"
      }
    },
    ru: {
      title: "Мои записи",
      doctorTitle: "Записи пациентов",
      noAppointments: "Записи не найдены",
      loading: "Загрузка...",
      refreshing: "Обновление...",
      patient: "Пациент",
      doctor: "Врач",
      service: "Услуга",
      date: "Дата",
      time: "Время",
      status: "Статус",
      notes: "Примечания",
      urgent: "Срочно",
      newPatient: "Новый пациент",
      returningPatient: "Возвращающийся пациент",
      contactInfo: "Контактная информация",
      actions: "Действия",
      approve: "Одобрить",
      decline: "Отклонить",
      counterOffer: "Контрпредложение",
      cancel: "Отменить",
      accept: "Принять",
      viewDetails: "Подробности",
      reason: "Причина",
      reasonPlaceholder: "Укажите причину...",
      newDateTime: "Новая дата и время",
      selectDate: "Выберите дату",
      selectTime: "Выберите время",
      submit: "Отправить",
      close: "Закрыть",
      confirmAction: "Подтвердить действие",
      actionSuccess: "Действие выполнено успешно",
      actionError: "Ошибка выполнения действия",
      refresh: "Обновить",
      backToHome: "На главную",
      loginRequired: "Необходима авторизация",
      doctorSubtitle: "Управляйте записями, назначенными вам",
      userSubtitle: "Просмотрите список ваших записей и их статус",
      noAppointmentsDoctor: "Вам еще не назначены записи",
      noAppointmentsUser: "У вас пока нет записей",
      createNewAppointment: "Создать новую запись",
      login: "Войти",
      statuses: {
        pending: "В ожидании",
        approved: "Одобрено",
        declined: "Отклонено",
        cancelled: "Отменено",
        counter_offer: "Контрпредложение"
      }
    },
    he: {
      title: "התורים שלי",
      doctorTitle: "תורי מטופלים",
      noAppointments: "לא נמצאו תורים",
      loading: "טוען...",
      refreshing: "מרענן...",
      patient: "מטופל",
      doctor: "רופא",
      service: "שירות",
      date: "תאריך",
      time: "שעה",
      status: "סטטוס",
      notes: "הערות",
      urgent: "דחוף",
      newPatient: "מטופל חדש",
      returningPatient: "מטופל חוזר",
      contactInfo: "פרטי קשר",
      actions: "פעולות",
      approve: "אישור",
      decline: "דחייה",
      counterOffer: "הצעה נגדית",
      cancel: "ביטול",
      accept: "קבלה",
      viewDetails: "פרטים",
      reason: "סיבה",
      reasonPlaceholder: "הזן סיבה...",
      newDateTime: "תאריך ושעה חדשים",
      selectDate: "בחר תאריך",
      selectTime: "בחר שעה",
      submit: "שלח",
      close: "סגור",
      confirmAction: "אישור פעולה",
      actionSuccess: "הפעולה הושלמה בהצלחה",
      actionError: "שגיאה בביצוע הפעולה",
      refresh: "רענן",
      backToHome: "חזרה לעמוד הראשי",
      loginRequired: "נדרשת התחברות",
      doctorSubtitle: "נהל תורים שהוקצו לך",
      userSubtitle: "צפה ברשימת התורים שלך ובסטטוס",
      noAppointmentsDoctor: "עדיין לא הוקצו לך תורים",
      noAppointmentsUser: "אין לך תורים עדיין",
      createNewAppointment: "צור תור חדש",
      login: "התחבר",
      statuses: {
        pending: "ממתין",
        approved: "מאושר",
        declined: "נדחה",
        cancelled: "בוטל",
        counter_offer: "הצעה נגדית"
      }
    }
  }

  const t = texts[currentLanguage] || texts.ka

  // Check authentication
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/pages/authorization/log_in")
      return
    }
    fetchAppointments()
  }, [session, status])

  // Fetch appointments
  const fetchAppointments = async () => {
    if (!session) return
    
    setLoading(true)
    try {
      const response = await fetch("/api/appointments")
      if (!response.ok) {
        throw new Error("Failed to fetch appointments")
      }
      
      const data = await response.json()
      setAppointments(data.appointments || [])
      setUserIsDoctor(data.isDoctor || false)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Refresh appointments
  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAppointments()
    setRefreshing(false)
  }

  // Handle appointment action
  const handleAction = async () => {
    if (!selectedAppointment) return

    setIsSubmitting(true)
    try {
      const payload = {
        action: actionType,
        reason: actionReason || undefined,
        counterOfferDate: counterOfferDate || undefined,
        counterOfferTime: counterOfferTime || undefined
      }

      const response = await fetch(`/api/appointments/${selectedAppointment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error("Failed to perform action")
      }

      // Refresh appointments
      await fetchAppointments()
      
      // Close modal and reset state
      setShowActionModal(false)
      setSelectedAppointment(null)
      setActionType("")
      setActionReason("")
      setCounterOfferDate("")
      setCounterOfferTime("")
      
    } catch (error) {
      console.error("Error performing action:", error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open action modal
  const openActionModal = (appointment, action) => {
    setSelectedAppointment(appointment)
    setActionType(action)
    setShowActionModal(true)
  }

  // Close action modal
  const closeActionModal = () => {
    setShowActionModal(false)
    setSelectedAppointment(null)
    setActionType("")
    setActionReason("")
    setCounterOfferDate("")
    setCounterOfferTime("")
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      case "counter_offer":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "declined":
        return <XCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "counter_offer":
        return <RefreshCw className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === "ka" ? "ka-GE" : "en-US")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={direction}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.loginRequired}</h1>
          <Link
            href="/pages/authorization/log_in"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t.login}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={direction}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userIsDoctor ? t.doctorTitle : t.title}
            </h1>
            <p className="text-gray-600 mt-2">
              {userIsDoctor 
                ? t.doctorSubtitle
                : t.userSubtitle
              }
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? t.refreshing : t.refresh}
            </button>
            
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : appointments.length === 0 ? (
          /* No appointments */
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noAppointments}</h3>
            <p className="text-gray-600 mb-6">
              {userIsDoctor 
                ? t.noAppointmentsDoctor
                : t.noAppointmentsUser
              }
            </p>
            {!userIsDoctor && (
              <Link
                href="/pages/booking"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t.createNewAppointment}
              </Link>
            )}
          </div>
        ) : (
          /* Appointments list */
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        {t.statuses[appointment.status]}
                      </div>
                      
                      {appointment.isUrgent && (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          <AlertCircle className="w-3 h-3" />
                          {t.urgent}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      {formatDate(appointment.createdAt)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left column */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {userIsDoctor ? t.patient : t.doctor}
                        </h3>
                        <p className="text-gray-600">
                          {userIsDoctor 
                            ? `${appointment.patientInfo.firstName} ${appointment.patientInfo.lastName}`
                            : appointment.doctorName
                          }
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">{t.service}</h4>
                        <p className="text-gray-600">{appointment.serviceName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">{t.date}</h4>
                          <p className="text-gray-600">{appointment.requestedDate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">{t.time}</h4>
                          <p className="text-gray-600">{appointment.requestedTime}</p>
                        </div>
                      </div>

                      {/* Counter offer info */}
                      {appointment.status === "counter_offer" && appointment.counterOfferDate && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <h4 className="font-medium text-blue-900 mb-2">{t.counterOffer}</h4>
                          <p className="text-blue-800 text-sm">
                            {appointment.counterOfferDate} at {appointment.counterOfferTime}
                          </p>
                          {appointment.doctorResponse && (
                            <p className="text-blue-700 text-sm mt-1">{appointment.doctorResponse}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                      {userIsDoctor && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">{t.contactInfo}</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{appointment.patientInfo.phone}</span>
                            </div>
                            {appointment.patientInfo.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{appointment.patientInfo.email}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span>
                                {appointment.patientInfo.isNewPatient === "new" ? t.newPatient : t.returningPatient}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {appointment.notes && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">{t.notes}</h4>
                          <p className="text-gray-600 text-sm">{appointment.notes}</p>
                        </div>
                      )}

                      {appointment.doctorResponse && appointment.status === "declined" && (
                        <div className="bg-red-50 p-3 rounded-md">
                          <h4 className="font-medium text-red-900 mb-1">{t.reason}</h4>
                          <p className="text-red-800 text-sm">{appointment.doctorResponse}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {userIsDoctor && appointment.status === "pending" && (
                        <>
                          <button
                            onClick={() => openActionModal(appointment, "approve")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {t.approve}
                          </button>
                          <button
                            onClick={() => openActionModal(appointment, "decline")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            {t.decline}
                          </button>
                          <button
                            onClick={() => openActionModal(appointment, "counter_offer")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                          >
                            <RefreshCw className="w-4 h-4" />
                            {t.counterOffer}
                          </button>
                        </>
                      )}

                      {!userIsDoctor && appointment.status === "counter_offer" && (
                        <>
                          <button
                            onClick={() => openActionModal(appointment, "accept_counter")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {t.accept}
                          </button>
                          <button
                            onClick={() => openActionModal(appointment, "decline_counter")}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            {t.decline}
                          </button>
                        </>
                      )}

                      {(appointment.status === "pending" || appointment.status === "approved") && (
                        <button
                          onClick={() => openActionModal(appointment, "cancel")}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.cancel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Modal */}
        <AnimatePresence>
          {showActionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeActionModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.confirmAction}</h3>
                  
                  {actionType === "counter_offer" && (
                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.selectDate}</label>
                        <input
                          type="date"
                          value={counterOfferDate}
                          onChange={(e) => setCounterOfferDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t.selectTime}</label>
                        <select
                          value={counterOfferTime}
                          onChange={(e) => setCounterOfferTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md text-black"
                        >
                          <option value="">{t.selectTime}</option>
                          {Array.from({ length: 11 }, (_, i) => {
                            const hour = 10 + i
                            const time = `${hour.toString().padStart(2, '0')}:00`
                            return (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  )}

                  {(actionType === "decline" || actionType === "cancel" || actionType === "counter_offer") && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">{t.reason}</label>
                      <textarea
                        value={actionReason}
                        onChange={(e) => setActionReason(e.target.value)}
                        placeholder={t.reasonPlaceholder}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                        rows="3"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={closeActionModal}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      {t.close}
                    </button>
                    <button
                      onClick={handleAction}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "..." : t.submit}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}