"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import {
  MessageCircle,
  User,
  Check,
  Clock,
  Send,
  ChevronLeft,
  RefreshCw,
  XCircle,
  CheckCircle,
  Paperclip,
  ImageIcon,
  Camera,
  File,
  X,
  AlertTriangle,
  Download,
  MoreHorizontal,
  Phone,
  Video,
  Search,
  Plus,
} from "lucide-react"

export default function MessagesPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const { currentLanguage, direction } = useLanguage()
  const isRTL = direction === "rtl"

  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)
  const messagesEndRef = useRef(null)
  const messageInputRef = useRef(null)
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)
  const [approving, setApproving] = useState(false)
  const [viewingImage, setViewingImage] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(null)
  const [messageReadStatus, setMessageReadStatus] = useState({})
  const [onlineUsers, setOnlineUsers] = useState(new Set()) // Track online users

  // Translations
  const texts = {
    ka: {
      title: "შეტყობინებები",
      noConversations: "შეტყობინებები არ არის",
      startConversation: "დაიწყეთ საუბარი ექიმთან ექიმის გვერდიდან",
      loading: "იტვირთება...",
      typeMessage: "დაწერეთ შეტყობინება...",
      send: "გაგზავნა",
      backToList: "შეტყობინებების სიაში დაბრუნება",
      refresh: "განახლება",
      approveConversation: "საუბრის დამტკიცება",
      pendingApproval: "ელოდება დამტკიცებას",
      approved: "დამტკიცებულია",
      loginRequired: "საჭიროა ავტორიზაცია",
      login: "შესვლა",
      today: "დღეს",
      yesterday: "გუშინ",
      justNow: "ახლახანს",
      minutesAgo: "წუთის წინ",
      hoursAgo: "საათის წინ",
      daysAgo: "დღის წინ",
      approvalMessage: "საუბრის დასაწყებად, გთხოვთ დაელოდოთ ექიმის დამტკიცებას",
      doctorApprovalMessage: "დაამტკიცეთ ეს საუბარი, რომ დაიწყოთ მესიჯების გაცვლა პაციენტთან",
      noMessages: "შეტყობინებები არ არის",
      sendFirstMessage: "გააგზავნეთ პირველი შეტყობინება!",
      conversationApproved: "საუბარი დამტკიცებულია!",
      waitForApproval: "ელოდება ექიმის დამტკიცებას...",
      typingLimit: "პაციენტებს შეუძლიათ გააგზავნონ მხოლოდ ერთი შეტყობინება, სანამ ექიმი დაამტკიცებს საუბარს",
      approving: "მტკიცდება...",
      attachFile: "დაამატეთ ფაილი",
      photoGallery: "ფოტო გალერეა",
      takePhoto: "გადაიღეთ ფოტო",
      document: "დოკუმენტი",
      removeFile: "წაშლა",
      fileTooLarge: "ფაილი ძალიან დიდია (მაქს. 50MB)",
      attachments: "მიმაგრებული ფაილები",
      downloadFile: "ჩამოტვირთვა",
      searchMessages: "შეტყობინებების ძიება",
      online: "ონლაინ",
      offline: "ოფლაინ",
      typing: "წერს...",
      doctorTyping: "ექიმი წერს...",
      patientTyping: "პაციენტი წერს...",
      delivered: "მიწოდებული",
      read: "წაკითხული",
    },
    en: {
      title: "Messages",
      noConversations: "No messages",
      startConversation: "Start a conversation with a doctor from the doctor's page",
      loading: "Loading...",
      typeMessage: "Type a message...",
      send: "Send",
      backToList: "Back to messages list",
      refresh: "Refresh",
      approveConversation: "Approve Conversation",
      pendingApproval: "Pending Approval",
      approved: "Approved",
      loginRequired: "Login Required",
      login: "Login",
      today: "Today",
      yesterday: "Yesterday",
      justNow: "Just now",
      minutesAgo: "minutes ago",
      hoursAgo: "hours ago",
      daysAgo: "days ago",
      approvalMessage: "To start the conversation, please wait for the doctor to approve",
      doctorApprovalMessage: "Approve this conversation to start messaging with the patient",
      noMessages: "No messages",
      sendFirstMessage: "Send your first message!",
      conversationApproved: "Conversation approved!",
      waitForApproval: "Waiting for doctor approval...",
      typingLimit: "Patients can only send one message until the doctor approves the conversation",
      approving: "Approving...",
      attachFile: "Attach File",
      photoGallery: "Photo Gallery",
      takePhoto: "Take Photo",
      document: "Document",
      removeFile: "Remove",
      fileTooLarge: "File too large (max 50MB)",
      attachments: "Attachments",
      downloadFile: "Download",
      searchMessages: "Search messages",
      online: "Online",
      offline: "Offline",
      typing: "typing...",
      doctorTyping: "Doctor is typing...",
      patientTyping: "Patient is typing...",
      delivered: "Delivered",
      read: "Read",
    },
    ru: {
      title: "Сообщения",
      noConversations: "Сообщений нет",
      startConversation: "Начните разговор с врачом со страницы врача",
      loading: "Загрузка...",
      typeMessage: "Введите сообщение...",
      send: "Отправить",
      backToList: "Вернуться к списку сообщений",
      refresh: "Обновить",
      approveConversation: "Подтвердить разговор",
      pendingApproval: "Ожидает подтверждения",
      approved: "Подтверждено",
      loginRequired: "Требуется вход",
      login: "Войти",
      today: "Сегодня",
      yesterday: "Вчера",
      justNow: "Только что",
      minutesAgo: "минут назад",
      hoursAgo: "часов назад",
      daysAgo: "дней назад",
      approvalMessage: "Чтобы начать разговор, дождитесь подтверждения от врача",
      doctorApprovalMessage: "Подтвердите этот разговор, чтобы начать общение с пациентом",
      noMessages: "Сообщений нет",
      sendFirstMessage: "Отправьте первое сообщение!",
      conversationApproved: "Разговор подтвержден!",
      waitForApproval: "Ожидание подтверждения врача...",
      typingLimit: "Пациенты могут отправить только одно сообщение до подтверждения разговора врачом",
      approving: "Подтверждение...",
      attachFile: "Прикрепить файл",
      photoGallery: "Фотогалерея",
      takePhoto: "Сделать фото",
      document: "Документ",
      removeFile: "Удалить",
      fileTooLarge: "Файл слишком большой (макс. 50MB)",
      attachments: "Вложения",
      downloadFile: "Скачать",
      searchMessages: "Поиск сообщений",
      online: "Онлайн",
      offline: "Оффлайн",
      typing: "печатает...",
      doctorTyping: "Врач печатает...",
      patientTyping: "Пациент печатает...",
      delivered: "Доставлено",
      read: "Прочитано",
    },
    he: {
      title: "הודעות",
      noConversations: "אין הודעות",
      startConversation: "התחל שיחה עם רופא מדף הרופא",
      loading: "טוען...",
      typeMessage: "הקלד הודעה...",
      send: "שלח",
      backToList: "חזרה לרשימת ההודעות",
      refresh: "רענן",
      approveConversation: "אשר שיחה",
      pendingApproval: "ממתין לאישור",
      approved: "מאושר",
      loginRequired: "נדרשת התחברות",
      login: "התחברות",
      today: "היום",
      yesterday: "אתמול",
      justNow: "עכשיו",
      minutesAgo: "דקות",
      hoursAgo: "שעות",
      daysAgo: "ימים",
      approvalMessage: "כדי להתחיל את השיחה, אנא המתן לאישור הרופא",
      doctorApprovalMessage: "אשר את השיחה הזו כדי להתחיל להתכתב עם המטופל",
      noMessages: "אין הודעות",
      sendFirstMessage: "שלח את ההודעה הראשונה שלך!",
      conversationApproved: "השיחה אושרה!",
      waitForApproval: "ממתין לאישור רופא...",
      typingLimit: "מטופלים יכולים לשלוח רק הודעה אחת עד שהרופא מאשר את השיחה",
      approving: "מאשר...",
      attachFile: "צרף קובץ",
      photoGallery: "גלריית תמונות",
      takePhoto: "צלם תמונה",
      document: "מסמך",
      removeFile: "הסר",
      fileTooLarge: "קובץ גדול מדי (מקסימום 50MB)",
      attachments: "קבצים מצורפים",
      downloadFile: "הורד",
      searchMessages: "חפש הודעות",
      online: "מקוון",
      offline: "לא מקוון",
      typing: "כותב...",
      doctorTyping: "הרופא כותב...",
      patientTyping: "המטופל כותב...",
      delivered: "נמסר",
      read: "נקרא",
    },
  }

  const t = texts[currentLanguage] || texts.ka

  // Check authentication
  useEffect(() => {
    if (authStatus === "loading") return
    if (!session) {
      router.push("/pages/authorization/log_in")
      return
    }
    fetchConversations()

    // Add current user to online users when component mounts
    if (session?.user?.email) {
      setOnlineUsers((prev) => new Set([...prev, session.user.email]))
    }
  }, [session, authStatus])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Typing indicator functions
  const handleTypingStart = () => {
    if (!isTyping && selectedConversation) {
      setIsTyping(true)
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    const timeout = setTimeout(() => {
      setIsTyping(false)
    }, 2000)

    setTypingTimeout(timeout)
  }

  // Simplified online status check
  const isUserOnline = (conversation) => {
    if (!conversation) return false

    // For now, we'll consider users online if they have recent activity
    // This is a simplified version until we implement real-time presence
    const now = new Date()
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

    if (isDoctor) {
      // Doctor checking if patient is online
      const patientEmail = conversation.patientEmail || conversation.patientName
      return (
        onlineUsers.has(patientEmail) ||
        (conversation.lastMessageTime && new Date(conversation.lastMessageTime) > fiveMinutesAgo)
      )
    } else {
      // Patient checking if doctor is online
      const doctorEmail = conversation.doctorEmail || conversation.doctorName
      return (
        onlineUsers.has(doctorEmail) ||
        (conversation.lastMessageTime && new Date(conversation.lastMessageTime) > fiveMinutesAgo)
      )
    }
  }

  // Simplified unread messages logic
  const hasUnreadMessages = (conversation) => {
    if (!conversation) return false

    // Check if there are unread messages for current user
    if (isDoctor) {
      return (
        conversation.unreadByDoctor > 0 ||
        (conversation.lastMessage && !conversation.seenByDoctor && conversation.lastMessageSender !== "doctor")
      )
    } else {
      return (
        conversation.unreadByPatient > 0 ||
        (conversation.lastMessage && !conversation.seenByPatient && conversation.lastMessageSender !== "user")
      )
    }
  }

  // Fetch conversations
  const fetchConversations = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch("/api/conversations")
      if (!response.ok) {
        throw new Error("Failed to fetch conversations")
      }

      const data = await response.json()
      setConversations(data.conversations || [])
      setIsDoctor(data.isDoctor || false)
    } catch (error) {
      console.error("Error fetching conversations:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Refresh conversations
  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchConversations()
    if (selectedConversation) {
      await fetchMessages(selectedConversation._id)
    }
    setRefreshing(false)
  }

  // Fetch messages
  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages?ts=${Date.now()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
      setError(error.message)
    }
  }

  // Select a conversation and mark messages as read (simplified)
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation)
    setMessages([])
    setSelectedFiles([])
    setAttachmentMenuOpen(false)

    // Simplified mark as read - just update local state
    // Remove unread indicator immediately when conversation is opened
    const updatedConversations = conversations.map((conv) => {
      if (conv._id === conversation._id) {
        return {
          ...conv,
          unreadByDoctor: isDoctor ? 0 : conv.unreadByDoctor,
          unreadByPatient: !isDoctor ? 0 : conv.unreadByPatient,
          seenByDoctor: isDoctor ? true : conv.seenByDoctor,
          seenByPatient: !isDoctor ? true : conv.seenByPatient,
        }
      }
      return conv
    })
    setConversations(updatedConversations)

    await fetchMessages(conversation._id)
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)

    const validFiles = files.filter((file) => {
      if (file.size > 50 * 1024 * 1024) {
        alert(t.fileTooLarge)
        return false
      }
      return true
    })

    setSelectedFiles((prev) => [...prev, ...validFiles])

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    setAttachmentMenuOpen(false)
  }

  // Remove selected file
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Handle approve conversation
  const handleApproveConversation = async () => {
    if (!isDoctor || !selectedConversation) return

    setApproving(true)
    try {
      const response = await fetch(`/api/conversations/${selectedConversation._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: true }),
      })

      if (!response.ok) {
        throw new Error("Failed to approve conversation")
      }

      setSelectedConversation({
        ...selectedConversation,
        approved: true,
      })

      fetchConversations()
    } catch (error) {
      console.error("Error approving conversation:", error)
      setError(error.message)
    } finally {
      setApproving(false)
    }
  }

  // Send message with attachments
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if ((!newMessage.trim() && selectedFiles.length === 0) || !selectedConversation) return

    setSending(true)
    try {
      const formData = new FormData()
      formData.append("content", newMessage)

      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch(`/api/conversations/${selectedConversation._id}/messages`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }

      const data = await response.json()
      const newMessageData = data.message

      setMessages((prev) => [...prev, newMessageData])
      setNewMessage("")
      setSelectedFiles([])

      // Mark own message as delivered initially
      setMessageReadStatus((prev) => ({
        ...prev,
        [newMessageData._id]: {
          read: false,
          deliveredAt: new Date(),
        },
      }))

      // Simulate read receipt after delay
      setTimeout(
        () => {
          setMessageReadStatus((prev) => ({
            ...prev,
            [newMessageData._id]: {
              read: true,
              readAt: new Date(),
            },
          }))
        },
        Math.random() * 2000 + 2000,
      )

      fetchConversations()
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error.message)
    } finally {
      setSending(false)
    }
  }

  // Back to conversation list
  const handleBackToList = () => {
    setSelectedConversation(null)
    setMessages([])
    setSelectedFiles([])
  }

  // Render file attachment preview
  const renderAttachmentPreview = (attachment) => {
    if (attachment.type.startsWith("image/")) {
      const imageUrl = attachment.thumbnailName
        ? `/api/files/${attachment.thumbnailName}?thumbnail=true`
        : `/api/files/${attachment.fileName}`

      return (
        <div
          className="cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl relative bg-gray-100 shadow-sm"
          onClick={() => setViewingImage(`/api/files/${attachment.fileName}`)}
          style={{ maxWidth: "200px" }}
        >
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Attachment"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
            <motion.a
              href={`/api/files/${attachment.fileName}`}
              download={attachment.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/50 backdrop-blur-sm text-white p-1 sm:p-1.5 rounded-full hover:bg-black/70 transition-all duration-200 inline-block"
            >
              <Download className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </motion.a>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-100"
          style={{ maxWidth: "200px" }}
        >
          <div className="flex items-center p-2 sm:p-4">
            <div className="flex-shrink-0 mr-2 sm:mr-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                <File className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{attachment.name || "file"}</p>
              <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">{formatFileSize(attachment.size)}</p>
              <a
                href={`/api/files/${attachment.fileName}`}
                download={attachment.name}
                onClick={(e) => e.stopPropagation()}
                className="text-xs sm:text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                {t.downloadFile}
              </a>
            </div>
          </div>
        </div>
      )
    }
  }

  // Format timestamps
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatConversationTime = (timestamp) => {
    if (!timestamp) return ""

    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMinutes = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMinutes < 1) return t.justNow
    if (diffMinutes < 60) return `${diffMinutes} ${t.minutesAgo}`
    if (diffHours < 24) return `${diffHours} ${t.hoursAgo}`
    if (diffDays < 30) return `${diffDays} ${t.daysAgo}`

    return date.toLocaleDateString()
  }

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conversation) => {
    const name = isDoctor ? conversation.patientName : conversation.doctorName
    return name?.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Loading state
  if (authStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    )
  }

  // Unauthenticated state
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={direction}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.loginRequired}</h1>
          <motion.a
            href="/pages/authorization/log_in"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg transition-all duration-200 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.login}
          </motion.a>
        </motion.div>
      </div>
    )
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-50" dir={direction}>
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-3 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{t.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isDoctor ? "Manage your patient conversations" : "Your conversations with doctors"}
          </p>
        </motion.div>

        {/* Enhanced message interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200"
        >
          <div className="flex h-[calc(100vh-120px)] sm:h-[calc(100vh-180px)]">
            {/* Enhanced conversations list */}
            <div
              className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 ${selectedConversation ? "hidden md:block" : ""}`}
            >
              {/* Header with search */}
              <div className="p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900">{t.title}</h2>
                  <motion.button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${refreshing ? "animate-spin" : ""}`} />
                  </motion.button>
                </div>

                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.searchMessages}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-gray-500 text-sm">{t.loading}</p>
                  </div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-2">{t.noConversations}</p>
                  <p className="text-gray-400 text-sm">{t.startConversation}</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-280px)]">
                  {filteredConversations.map((conversation, index) => (
                    <motion.div
                      key={conversation._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-2 sm:p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                        selectedConversation?._id === conversation._id
                          ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-l-blue-500"
                          : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                          </div>

                          {/* Online status indicator */}
                          {isUserOnline(conversation) ? (
                            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-4 sm:h-4 bg-green-400 rounded-full border-1 sm:border-2 border-white shadow-sm"></div>
                          ) : (
                            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-300 rounded-full border-1 sm:border-2 border-white shadow-sm"></div>
                          )}

                          {/* Approval status indicator */}
                          {isDoctor && !conversation.approved && !conversation.rejected && (
                            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-5 sm:h-5 bg-amber-400 rounded-full border-1 sm:border-2 border-white flex items-center justify-center shadow-sm">
                              <AlertTriangle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                            <h3 className="font-semibold text-gray-900 truncate text-xs sm:text-sm">
                              {isDoctor
                                ? conversation.patientName || "Patient"
                                : `Dr. ${conversation.doctorName || "Doctor"}`}
                            </h3>

                            {conversation.lastMessageTime && (
                              <span className="text-xs text-gray-500 ml-1 sm:ml-2 flex-shrink-0">
                                {formatConversationTime(conversation.lastMessageTime)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-gray-600 text-xs sm:text-sm truncate flex-1 mr-1 sm:mr-2">
                              {conversation.lastMessage || "..."}
                            </p>

                            {/* Status indicators */}
                            <div className="flex items-center gap-0.5 sm:gap-1">
                              {/* Approval status indicators */}
                              {!conversation.approved && !conversation.rejected && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></div>
                              )}
                              {conversation.approved && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                              )}
                              {conversation.rejected && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                              )}

                              {/* Unread message indicator */}
                              {hasUnreadMessages(conversation) && (
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </div>

                          {/* Online status text */}
                          <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                            {isUserOnline(conversation) ? t.online : t.offline}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced message area */}
            {selectedConversation ? (
              <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
                {/* Enhanced conversation header */}
                <div className="p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <motion.button
                        className="md:hidden mr-2 sm:mr-3 text-gray-500 hover:text-gray-700 p-1.5 sm:p-2 hover:bg-white/50 rounded-full transition-all duration-200"
                        onClick={handleBackToList}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.button>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-sm">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          {/* Online status indicator in header */}
                          {isUserOnline(selectedConversation) ? (
                            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full border-1 sm:border-2 border-white"></div>
                          ) : (
                            <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full border-1 sm:border-2 border-white"></div>
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {isDoctor
                              ? selectedConversation.patientName || "Patient"
                              : `Dr. ${selectedConversation.doctorName || "Doctor"}`}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {isUserOnline(selectedConversation) ? t.online : t.offline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      {/* Action buttons */}
                      <motion.button
                        className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>

                      <motion.button
                        className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>

                      {/* Approval button/status */}
                      {!selectedConversation.approved &&
                        (isDoctor ? (
                          <motion.button
                            onClick={handleApproveConversation}
                            disabled={approving}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 disabled:opacity-50 shadow-lg transition-all duration-200 font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {approving ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                                <span className="hidden sm:inline">{t.approving}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">{t.approveConversation}</span>
                              </>
                            )}
                          </motion.button>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 font-medium">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="hidden sm:inline">{t.pendingApproval}</span>
                          </span>
                        ))}

                      {selectedConversation.approved && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 font-medium">
                          <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="hidden sm:inline">{t.approved}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced messages area */}
                <div className="flex-grow max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-320px)] overflow-y-auto p-2 sm:p-4 bg-gradient-to-b from-gray-50/50 to-white">
                  {messages.length > 0 ? (
                    <div className="space-y-2 sm:space-y-4">
                      {messages.map((message, index) => {
                        const isOwnMessage =
                          (isDoctor && message.senderType === "doctor") || (!isDoctor && message.senderType === "user")

                        const showAvatar = index === 0 || messages[index - 1]?.senderType !== message.senderType

                        return (
                          <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-end gap-1 sm:gap-2 max-w-[85%] sm:max-w-[75%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
                            >
                              {!isOwnMessage && showAvatar && (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                </div>
                              )}
                              {!isOwnMessage && !showAvatar && (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"></div>
                              )}

                              <div className={`relative ${isOwnMessage ? "ml-auto" : "mr-auto"}`}>
                                {message.content && (
                                  <div
                                    className={`${
                                      isOwnMessage
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                                        : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                                    } px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl ${isOwnMessage ? "rounded-br-md" : "rounded-bl-md"}`}
                                    style={{
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                      hyphens: "auto",
                                    }}
                                  >
                                    <p className="text-xs sm:text-sm leading-relaxed break-words">{message.content}</p>
                                  </div>
                                )}

                                {/* Enhanced attachments rendering */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className={`mt-1 sm:mt-2 ${message.content ? "pt-1 sm:pt-2" : ""}`}>
                                    <div className="space-y-1 sm:space-y-2">
                                      {message.attachments.map((attachment, idx) => (
                                        <motion.div
                                          key={idx}
                                          className="flex flex-col items-start"
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                          {renderAttachmentPreview(attachment)}
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div
                                  className={`flex items-center gap-0.5 sm:gap-1 mt-0.5 sm:mt-1 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                                >
                                  <span className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</span>
                                  {isOwnMessage && (
                                    <div className="flex items-center">
                                      {messageReadStatus[message._id]?.read ? (
                                        <div className="flex items-center">
                                          <Check
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500"
                                            style={{ marginLeft: "-2px" }}
                                          />
                                          <Check
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500"
                                            style={{ marginLeft: "-6px" }}
                                          />
                                        </div>
                                      ) : (
                                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}

                      {/* Enhanced typing indicator */}
                      {otherUserTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-end gap-2 max-w-[75%]">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {isDoctor ? t.patientTyping : t.doctorTyping}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-10 h-10 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t.noMessages}</h3>
                      <p className="text-gray-500">{t.sendFirstMessage}</p>
                    </div>
                  )}
                </div>

                {/* Enhanced selected files preview */}
                <AnimatePresence>
                  {selectedFiles.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 p-3 bg-gray-50/50"
                    >
                      <div className="flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              {file.type.startsWith("image/") ? (
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                  <ImageIcon className="w-2.5 h-2.5 text-blue-600" />
                                </div>
                              ) : file.type.startsWith("video/") ? (
                                <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Camera className="w-2.5 h-2.5 text-purple-600" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
                                  <File className="w-2.5 h-2.5 text-gray-600" />
                                </div>
                              )}
                              <span className="text-xs font-medium text-gray-700 max-w-[80px] truncate">
                                {file.name}
                              </span>
                            </div>
                            <motion.button
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500 p-0.5 rounded-full hover:bg-red-50 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-3 h-3" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced message input */}
                <div className="border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="p-2 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Enhanced attachment dropdown */}
                      <div className="relative">
                        <motion.button
                          type="button"
                          onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                          className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>

                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" multiple />

                        <AnimatePresence>
                          {attachmentMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              className={`absolute bottom-full ${isRTL ? "right-0" : "left-0"} mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 min-w-[180px] sm:min-w-[200px]`}
                            >
                              <div className="py-1 sm:py-2">
                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = "image/*,video/*"
                                    fileInputRef.current.removeAttribute("capture")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.photoGallery}</span>
                                </motion.button>

                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = "image/*"
                                    fileInputRef.current.setAttribute("capture", "environment")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.takePhoto}</span>
                                </motion.button>

                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = ".pdf,.doc,.docx,.xls,.xlsx,.txt,application/*"
                                    fileInputRef.current.removeAttribute("capture")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                    <File className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.document}</span>
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Enhanced message input field */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value)
                            if (e.target.value.trim()) {
                              handleTypingStart()
                            }
                          }}
                          placeholder={t.typeMessage}
                          className={`w-full ${isRTL ? "pr-3 pl-8 sm:pr-4 sm:pl-12" : "pl-3 pr-8 sm:pl-4 sm:pr-12"} py-2 sm:py-3 border border-gray-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200`}
                          disabled={
                            (!selectedConversation.approved &&
                              !isDoctor &&
                              messages.filter((m) => m.senderType === "user").length >= 1) ||
                            sending ||
                            selectedConversation.rejected
                          }
                          ref={messageInputRef}
                        />
                        <button
                          type="button"
                          className={`absolute ${isRTL ? "left-2 sm:left-3" : "right-2 sm:right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                        >
                          <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Enhanced send button */}
                      <motion.button
                        type="submit"
                        disabled={
                          (!newMessage.trim() && selectedFiles.length === 0) ||
                          sending ||
                          (!selectedConversation.approved &&
                            !isDoctor &&
                            messages.filter((m) => m.senderType === "user").length >= 1) ||
                          selectedConversation.rejected
                        }
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 sm:p-3 rounded-full hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {sending ? (
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                        ) : (
                          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </motion.button>
                    </div>

                    {/* Enhanced status messages */}
                    <AnimatePresence>
                      {!selectedConversation.approved &&
                        !selectedConversation.rejected &&
                        !isDoctor &&
                        messages.filter((m) => m.senderType === "user").length >= 1 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 sm:mt-3"
                          >
                            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-amber-50 rounded-lg border border-amber-200">
                              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 flex-shrink-0" />
                              <p className="text-xs text-amber-700">{t.waitForApproval}</p>
                            </div>
                          </motion.div>
                        )}

                      {selectedConversation.approved && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 sm:mt-3"
                        >
                          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 flex-shrink-0" />
                            <p className="text-xs text-green-700">{t.conversationApproved}</p>
                          </div>
                        </motion.div>
                      )}

                      {selectedConversation.rejected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 sm:mt-3"
                        >
                          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-50 rounded-lg border border-red-200">
                            <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600 flex-shrink-0" />
                            <p className="text-xs text-red-700">Conversation rejected</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex md:w-2/3 lg:w-3/4 items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.noConversations}</h3>
                  <p className="text-gray-500 mb-4">{t.startConversation}</p>
                  <motion.button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/doctors")}
                  >
                    <Plus className="w-5 h-5" />
                    Start New Conversation
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Image Viewer Modal */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setViewingImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-[95vw] max-h-[95vh]"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setViewingImage(null)
                }}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <img
                src={viewingImage || "/placeholder.svg"}
                alt="Full size attachment"
                className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-2 hover:bg-red-600 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
