"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useNotifications } from "@/context/NotificationsContext"
import { useLanguage } from "@/context/LanguageContext"
import Link from "next/link"
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  Calendar,
  ArrowLeft,
  Check,
  CheckCheck
} from "lucide-react"

export default function NotificationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    refresh 
  } = useNotifications()
  const { currentLanguage, direction } = useLanguage()
  const isRTL = direction === "rtl"

  // Translations
  const texts = {
    ka: {
      title: "შეტყობინებები",
      backToHome: "მთავარზე დაბრუნება",
      markAllRead: "ყველის წაკითხული მონიშვნა",
      refresh: "განახლება",
      noNotifications: "შეტყობინებები არ არის",
      noNotificationsDesc: "თქვენ ჯერ არ გაქვთ შეტყობინებები",
      unreadCount: "წაუკითხავი",
      allRead: "ყველა წაკითხული",
      markAsRead: "წაკითხული მონიშვნა",
      loading: "იტვირთება...",
      refreshing: "განახლება...",
      loginRequired: "საჭიროა ავტორიზაცია",
      timeAgo: {
        now: "ახლა",
        minute: "წუთის წინ",
        minutes: "წუთის წინ",
        hour: "საათის წინ",
        hours: "საათის წინ",
        day: "დღის წინ",
        days: "დღის წინ",
        week: "კვირის წინ",
        weeks: "კვირის წინ"
      }
    },
    en: {
      title: "Notifications",
      backToHome: "Back to Home",
      markAllRead: "Mark all as read",
      refresh: "Refresh",
      noNotifications: "No notifications",
      noNotificationsDesc: "You don't have any notifications yet",
      unreadCount: "unread",
      allRead: "All read",
      markAsRead: "Mark as read",
      loading: "Loading...",
      refreshing: "Refreshing...",
      loginRequired: "Login Required",
      timeAgo: {
        now: "now",
        minute: "1 minute ago",
        minutes: "minutes ago",
        hour: "1 hour ago",
        hours: "hours ago",
        day: "1 day ago",
        days: "days ago",
        week: "1 week ago",
        weeks: "weeks ago"
      }
    },
    ru: {
      title: "Уведомления",
      backToHome: "На главную",
      markAllRead: "Отметить все как прочитанные",
      refresh: "Обновить",
      noNotifications: "Нет уведомлений",
      noNotificationsDesc: "У вас пока нет уведомлений",
      unreadCount: "непрочитанных",
      allRead: "Все прочитано",
      markAsRead: "Отметить как прочитанное",
      loading: "Загрузка...",
      refreshing: "Обновление...",
      loginRequired: "Необходима авторизация",
      timeAgo: {
        now: "сейчас",
        minute: "1 минуту назад",
        minutes: "минут назад",
        hour: "1 час назад",
        hours: "часов назад",
        day: "1 день назад",
        days: "дней назад",
        week: "1 неделю назад",
        weeks: "недель назад"
      }
    },
    he: {
      title: "התראות",
      backToHome: "חזרה לעמוד הראשי",
      markAllRead: "סמן הכל כנקרא",
      refresh: "רענן",
      noNotifications: "אין התראות",
      noNotificationsDesc: "אין לך התראות עדיין",
      unreadCount: "לא נקראו",
      allRead: "הכל נקרא",
      markAsRead: "סמן כנקרא",
      loading: "טוען...",
      refreshing: "מרענן...",
      loginRequired: "נדרשת התחברות",
      timeAgo: {
        now: "עכשיו",
        minute: "לפני דקה",
        minutes: "דקות אחורה",
        hour: "לפני שעה",
        hours: "שעות אחורה",
        day: "לפני יום",
        days: "ימים אחורה",
        week: "לפני שבוע",
        weeks: "שבועות אחורה"
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
  }, [session, status, router])

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date()
    const diff = now - new Date(date)
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

    if (minutes < 1) return t.timeAgo.now
    if (minutes === 1) return t.timeAgo.minute
    if (minutes < 60) return `${minutes} ${t.timeAgo.minutes}`
    if (hours === 1) return t.timeAgo.hour
    if (hours < 24) return `${hours} ${t.timeAgo.hours}`
    if (days === 1) return t.timeAgo.day
    if (days < 7) return `${days} ${t.timeAgo.days}`
    if (weeks === 1) return t.timeAgo.week
    return `${weeks} ${t.timeAgo.weeks}`
  }

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment_created":
      case "appointment_approved":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "appointment_declined":
      case "appointment_cancelled":
        return <XCircle className="w-6 h-6 text-red-500" />
      case "appointment_counter_offer":
      case "counter_offer_accepted":
      case "counter_offer_declined":
        return <RefreshCw className="w-6 h-6 text-blue-500" />
      default:
        return <Bell className="w-6 h-6 text-gray-500" />
    }
  }

  // Handle notification click
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id)
    }
    
    // Navigate to appointments page if it's an appointment-related notification
    if (notification.type.includes("appointment")) {
      router.push("/appointments")
    }
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
            შესვლა
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir={direction}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                {t.backToHome}
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            
            <div className="flex items-center gap-4 mt-2">
              {unreadCount > 0 ? (
                <span className="text-sm text-gray-600">
                  {unreadCount} {t.unreadCount}
                </span>
              ) : (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCheck className="w-4 h-4" />
                  {t.allRead}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? t.refreshing : t.refresh}
            </button>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                {t.markAllRead}
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noNotifications}</h3>
            <p className="text-gray-600">{t.noNotificationsDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-lg shadow-sm border-l-4 ${
                  !notification.isRead ? "border-l-blue-500 bg-blue-50/30" : "border-l-gray-300"
                } hover:shadow-md transition-all cursor-pointer`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className={`text-lg font-semibold ${
                            !notification.isRead ? "text-gray-900" : "text-gray-700"
                          }`}>
                            {notification.title}
                          </h3>
                          
                          <p className={`mt-2 ${
                            !notification.isRead ? "text-gray-700" : "text-gray-600"
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-4 mt-4">
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification._id)
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                {t.markAsRead}
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {!notification.isRead && (
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}