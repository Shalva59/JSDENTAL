"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  User,
  X,
  Check
} from "lucide-react"

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
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
      notifications: "შეტყობინებები",
      noNotifications: "შეტყობინებები არ არის",
      markAllRead: "ყველის წაკითხული მონიშვნა",
      refresh: "განახლება",
      viewAll: "ყველას ნახვა",
      new: "ახალი",
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
      notifications: "Notifications",
      noNotifications: "No notifications",
      markAllRead: "Mark all as read",
      refresh: "Refresh",
      viewAll: "View all",
      new: "New",
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
      notifications: "Уведомления",
      noNotifications: "Нет уведомлений",
      markAllRead: "Отметить все как прочитанные",
      refresh: "Обновить",
      viewAll: "Посмотреть все",
      new: "Новое",
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
      notifications: "התראות",
      noNotifications: "אין התראות",
      markAllRead: "סמן הכל כנקרא",
      refresh: "רענן",
      viewAll: "צפה בהכל",
      new: "חדש",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "appointment_declined":
      case "appointment_cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "appointment_counter_offer":
      case "counter_offer_accepted":
      case "counter_offer_declined":
        return <RefreshCw className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  // Handle notification click
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id)
    }
    
    // Close dropdown
    setIsOpen(false)
    
    // Navigate based on notification type
    if (notification.type.includes("appointment")) {
      window.location.href = "/appointments"
    } else if (notification.type.includes("message") || notification.type.includes("conversation")) {
      window.location.href = "/messages"
    }
  }

  // Recent notifications (last 10)
  const recentNotifications = notifications.slice(0, 10)

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${isRTL ? "left-0" : "right-0"} mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden`}
            dir={direction}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t.notifications}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={refresh}
                    disabled={loading}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    title={t.refresh}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                >
                  {t.markAllRead}
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : recentNotifications.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{t.noNotifications}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentNotifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}>
                              {notification.title}
                            </h4>
                            
                            {!notification.isRead && (
                              <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                          
                          <p className={`text-sm mt-1 ${
                            !notification.isRead ? "text-gray-700" : "text-gray-500"
                          }`}>
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>

                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification._id)
                          }}
                          className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                        >
                          <Check className="w-3 h-3 inline mr-1" />
                          Mark as read
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {recentNotifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <Link
                  href="/notifications"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t.viewAll}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}