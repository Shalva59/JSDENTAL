"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import {
  MessageCircle,
  X,
  Minimize2,
  Send,
  ChevronLeft,
  Clock,
  Check,
  User,
  Phone,
  Video,
  MoreHorizontal,
  Edit3,
  Paperclip,
  ImageIcon,
  Camera,
  File,
  CheckCircle,
  AlertTriangle,
  Download,
} from "lucide-react"

export default function MessageBox() {
  const { data: session } = useSession()
  const { currentLanguage, direction } = useLanguage()
  const isRTL = direction === "rtl"

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)
  const messagesEndRef = useRef(null)
  const [hasConversations, setHasConversations] = useState(false)
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false)
  const [approving, setApproving] = useState(false)
  const [viewingImage, setViewingImage] = useState(null)
  const [showConversationUser, setShowConversationUser] = useState(false)

  // Move all useEffect hooks right after useState declarations
  useEffect(() => {
    if (session) {
      fetchConversations()
    }
  }, [session])

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    // Clear files when switching conversations
    setSelectedFiles([])
    setAttachmentMenuOpen(false)
  }, [selectedConversation])

  useEffect(() => {
    // Reset state when component mounts
    if (!session) {
      setIsOpen(false)
      setIsMinimized(false)
      setSelectedConversation(null)
      setSelectedFiles([])
      setAttachmentMenuOpen(false)
      setViewingImage(null)
    }
  }, [session])

  // Translations
  const texts = {
    ka: {
      messages: "შეტყობინებები",
      typeMessage: "დაწერეთ შეტყობინება...",
      noConversations: "საუბრები არ არის",
      back: "უკან",
      send: "გაგზავნა",
      pendingApproval: "დამტკიცების მოლოდინში",
      approveConversation: "დაამტკიცეთ საუბარი",
      approving: "მტკიცდება...",
      attachFile: "დაამატეთ ფაილი",
      photoGallery: "ფოტო გალერეა",
      takePhoto: "გადაიღეთ ფოტო",
      document: "დოკუმენტი",
      removeFile: "წაშლა",
      fileTooLarge: "ფაილი ძალიან დიდია (მაქს. 50MB)",
      conversationApproved: "საუბარი დამტკიცებულია",
      attachments: "მიმაგრებული ფაილები",
      downloadFile: "ჩამოტვირთვა",
      online: "ონლაინ",
      active: "აქტიური",
      offline: "ოფლაინ",
      doctorChat: "ექიმთან საუბარი",
      patientChat: "პაციენტთან საუბარი",
      startConversation: "დაიწყეთ საუბარი პაციენტთან",
      askQuestion: "დაწერეთ თქვენი კითხვა ან პრობლემა",
    },
    en: {
      messages: "Messages",
      typeMessage: "Type a message...",
      noConversations: "No conversations",
      back: "Back",
      send: "Send",
      pendingApproval: "Pending approval",
      approveConversation: "Approve Conversation",
      approving: "Approving...",
      attachFile: "Attach File",
      photoGallery: "Photo Gallery",
      takePhoto: "Take Photo",
      document: "Document",
      removeFile: "Remove",
      fileTooLarge: "File too large (max 50MB)",
      conversationApproved: "Conversation approved",
      attachments: "Attachments",
      downloadFile: "Download",
      online: "Online",
      active: "Active",
      offline: "Offline",
      doctorChat: "Doctor Chat",
      patientChat: "Patient Chat",
      startConversation: "Start conversation with patient",
      askQuestion: "Write your question or problem",
    },
    ru: {
      messages: "Сообщения",
      typeMessage: "Введите сообщение...",
      noConversations: "Нет разговоров",
      back: "Назад",
      send: "Отправить",
      pendingApproval: "Ожидает подтверждения",
      approveConversation: "Подтвердить разговор",
      approving: "Подтверждение...",
      attachFile: "Прикрепить файл",
      photoGallery: "Фотогалерея",
      takePhoto: "Сделать фото",
      document: "Документ",
      removeFile: "Удалить",
      fileTooLarge: "Файл слишком большой (макс. 50MB)",
      conversationApproved: "Разговор подтвержден",
      attachments: "Вложения",
      downloadFile: "Скачать",
      online: "Онлайн",
      active: "Активен",
      offline: "Оффлайн",
      doctorChat: "Чат с врачом",
      patientChat: "Чат с пациентом",
      startConversation: "Начать разговор с пациентом",
      askQuestion: "Напишите свой вопрос или проблему",
    },
    he: {
      messages: "הודעות",
      typeMessage: "הקלד הודעה...",
      noConversations: "אין שיחות",
      back: "חזור",
      send: "שלח",
      pendingApproval: "ממתין לאישור",
      approveConversation: "אשר שיחה",
      approving: "מאשר...",
      attachFile: "צרף קובץ",
      photoGallery: "גלריית תמונות",
      takePhoto: "צלם תמונה",
      document: "מסמך",
      removeFile: "הסר",
      fileTooLarge: "קובץ גדול מדי (מקסימום 50MB)",
      conversationApproved: "השיחה אושרה",
      attachments: "קבצים מצורפים",
      downloadFile: "הורד",
      online: "מקוון",
      active: "פעיל",
      offline: "לא מקוון",
      doctorChat: "צ'אט עם רופא",
      patientChat: "צ'אט עם מטופל",
      startConversation: "התחל שיחה עם מטופל",
      askQuestion: "כתוב את השאלה או הבעיה שלך",
    },
  }

  const t = texts[currentLanguage] || texts.ka

  // Fetch conversations on mount

  const fetchConversations = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch("/api/conversations")
      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations || [])
        setIsDoctor(data.isDoctor || false)
        setHasConversations((data.conversations || []).length > 0)
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch messages for selected conversation
  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  // Handle conversation selection
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation)
    setMessages([])
    // Clear selected files when switching conversations
    setSelectedFiles([])
    // Close attachment menu
    setAttachmentMenuOpen(false)
    await fetchMessages(conversation._id)
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)

    // Check file size
    const validFiles = files.filter((file) => {
      if (file.size > 50 * 1024 * 1024) {
        alert(t.fileTooLarge)
        return false
      }
      return true
    })

    setSelectedFiles((prev) => [...prev, ...validFiles])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // Close attachment menu
    setAttachmentMenuOpen(false)
  }

  // Remove selected file
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Get file icon based on type
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-4 h-4" />
    } else if (file.type.startsWith("video/")) {
      return <Camera className="w-4 h-4" />
    } else {
      return <File className="w-4 h-4" />
    }
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Approve conversation (for doctors)
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

      if (response.ok) {
        // Update local state
        setSelectedConversation({
          ...selectedConversation,
          approved: true,
        })

        // Refresh conversations list
        fetchConversations()
      }
    } catch (error) {
      console.error("Error approving conversation:", error)
    } finally {
      setApproving(false)
    }
  }

  // Download attachment
  const downloadAttachment = (attachment) => {
    try {
      // Create a blob from the base64 data
      const byteCharacters = atob(attachment.data)
      const byteArrays = []

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i))
      }

      const byteArray = new Uint8Array(byteArrays)
      const blob = new Blob([byteArray], { type: attachment.type })

      // Create a temporary URL for the blob
      const blobUrl = URL.createObjectURL(blob)

      // Create an invisible download link and click it
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = attachment.name || `download.${attachment.type.split("/")[1] || "file"}`
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again.")
    }
  }

  // Send message with or without attachments
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if ((!newMessage.trim() && selectedFiles.length === 0) || !selectedConversation) return

    setSending(true)
    try {
      // Create FormData to handle file uploads
      const formData = new FormData()
      formData.append("content", newMessage)

      // Add files if any
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch(`/api/conversations/${selectedConversation._id}/messages`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      // Add the new message to the list
      setMessages((prev) => [...prev, data.message])

      // Clear input and selected files
      setNewMessage("")
      setSelectedFiles([])

      // Refresh conversations list to update last message
      fetchConversations()
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Check if doctor is online
  const isDoctorOnline = (conversation) => {
    // For demo purposes, let's simulate some doctors being online
    // In real app, this would come from the API
    if (isDoctor) {
      return true // Current user is doctor, so they're online
    }

    // Simulate some doctors being online based on their ID or name
    const onlineDoctors = ["Gabriel", "Nino", "David", "Ana"]
    return (
      conversation?.doctorName &&
      onlineDoctors.some((name) => conversation.doctorName.toLowerCase().includes(name.toLowerCase()))
    )
  }

  // Render file attachment preview
  const renderAttachmentPreview = (attachment) => {
    if (attachment.type.startsWith("image/")) {
      return (
        <div
          className="cursor-pointer overflow-hidden rounded-2xl relative bg-gray-100"
          onClick={() => setViewingImage(`data:${attachment.type};base64,${attachment.data}`)}
          style={{ maxWidth: "260px" }}
        >
          <img
            src={`data:${attachment.type};base64,${attachment.data}`}
            alt="Attachment"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-2 right-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                downloadAttachment(attachment)
              }}
              className="bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-black/70 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm" style={{ maxWidth: "260px" }}>
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                <File className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name || "file"}</p>
              <p className="text-xs text-gray-500 mb-1">{formatFileSize(attachment.size)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadAttachment(attachment)
                }}
                className="text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                {t.downloadFile}
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  // Don't render if no session or no conversations
  if (!session || !hasConversations) {
    return null
  }

  // Also clear files when going back to conversation list
  const handleBackToConversations = () => {
    setSelectedConversation(null)
    setSelectedFiles([])
    setAttachmentMenuOpen(false)
    setMessages([])
  }

  return (
    <>
      {/* Minimized floating buttons */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed bottom-4 ${isRTL ? "left-4" : "right-4"} z-50 flex flex-col gap-3`}
        >
          {/* Profile/Avatar button */}
          <div className="relative">
            <motion.button
              className="w-14 h-14 rounded-full shadow-lg overflow-hidden"
              onClick={() => setIsMinimized(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedConversation ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <User className="w-7 h-7 text-blue-600" />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-gray-600" />
                </div>
              )}
              {/* Online indicator - only show if doctor is online */}
              {selectedConversation && isDoctorOnline(selectedConversation) && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
              {selectedConversation && !isDoctorOnline(selectedConversation) && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
              )}
            </motion.button>

            {/* Notification badge */}
            {conversations.filter((c) => c.lastMessage).length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-10"
              >
                <span className="text-xs text-white font-bold">
                  {conversations.filter((c) => c.lastMessage).length}
                </span>
              </motion.div>
            )}
          </div>

          {/* Compose/Edit button */}
          <motion.button
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
            onClick={() => {
              setIsMinimized(false)
              if (selectedConversation) {
                setSelectedConversation(null)
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit3 className="w-6 h-6 text-gray-700" />
          </motion.button>
        </motion.div>
      )}

      {/* Regular floating button (when not minimized and not open) */}
      {!isOpen && !isMinimized && (
        <motion.button
          className={`fixed bottom-4 ${isRTL ? "left-4" : "right-4"} bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-blue-700 z-40 transition-all duration-300`}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6" />
          {conversations.filter((c) => c.lastMessage).length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium shadow-lg"
            >
              {conversations.filter((c) => c.lastMessage).length}
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Message box */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden border border-gray-100`}
            style={{
              width: "min(380px, calc(100vw - 48px))",
              height: "min(580px, calc(100vh - 120px))",
              maxHeight: "calc(100vh - 120px)",
            }}
            dir={direction}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
              {selectedConversation ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBackToConversations}
                    className="hover:bg-white/20 p-1 rounded-full transition-colors"
                  >
                    <ChevronLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      {/* Online indicator based on doctor status */}
                      {isDoctorOnline(selectedConversation) ? (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      ) : (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm leading-tight">
                        {(() => {
                          const fullName = isDoctor
                            ? selectedConversation.patientName
                            : `Dr. ${selectedConversation.doctorName}`
                          const words = fullName.split(" ")

                          // If it's a doctor, try to show "Dr. FirstName L." format
                          if (!isDoctor && words.length >= 3) {
                            const firstName = words[1] // Skip "Dr."
                            const lastInitial = words[words.length - 1][0]
                            const shortName = `Dr. ${firstName} ${lastInitial}.`

                            // If short name is still too long, truncate
                            return shortName.length > 18 ? `${shortName.substring(0, 15)}...` : shortName
                          }

                          // For patients or shorter names, use smart truncation
                          if (fullName.length > 18) {
                            const words = fullName.split(" ")
                            if (words.length >= 2) {
                              const firstName = words[0]
                              const lastInitial = words[words.length - 1][0]
                              return `${firstName} ${lastInitial}.`
                            }
                            return `${fullName.substring(0, 15)}...`
                          }

                          return fullName
                        })()}
                      </div>
                      <div className="text-xs text-blue-100 leading-tight">
                        {isDoctorOnline(selectedConversation) ? t.online : t.offline}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{t.messages}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                {/* {selectedConversation && (
                  <>
                    <button className="hover:bg-white/20 p-2 rounded-full transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="hover:bg-white/20 p-2 rounded-full transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                  </>
                )} */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation list or messages */}
            {!selectedConversation ? (
              <div className="overflow-y-auto" style={{ height: "min(510px, calc(100vh - 190px))" }}>
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-center font-medium">{t.noConversations}</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {conversations.map((conversation) => (
                      <motion.div
                        key={conversation._id}
                        whileHover={{ backgroundColor: "#f8fafc" }}
                        className="p-3 rounded-xl cursor-pointer transition-all duration-200 mb-1"
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-12 h-12 flex items-center justify-center">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            {/* Online indicator in conversation list */}
                            {isDoctorOnline(conversation) ? (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                            ) : (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 truncate text-sm">
                                {isDoctor ? conversation.patientName : `Dr. ${conversation.doctorName}`}
                              </h4>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-500">
                                  {formatTime(conversation.lastMessageTime)}
                                </span>
                              )}
                            </div>
                            {conversation.lastMessage && (
                              <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                            )}
                          </div>
                          {!conversation.approved && <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Doctor approval banner */}
                {isDoctor && !selectedConversation.approved && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 border-b border-amber-100"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-sm font-medium">{t.pendingApproval}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApproveConversation}
                        disabled={approving}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 shadow-sm transition-all duration-200"
                      >
                        {approving ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            <span>{t.approving}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>{t.approveConversation}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Messages area */}
                <div
                  className="overflow-y-auto p-4 bg-gray-50/50"
                  style={{
                    height: "calc(100% - 240px)", // Fixed height that accounts for input area
                    minHeight: "280px",
                    maxHeight: "380px",
                  }}
                >
                  {messages.length === 0 ? (
                    // Empty state with welcome message
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-gray-700 mb-2">{isDoctor ? t.patientChat : t.doctorChat}</h3>
                      <p className="text-sm text-center text-gray-500 max-w-[200px]">
                        {isDoctor ? t.startConversation : t.askQuestion}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* User's messages */}
                      {messages.map((message, index) => {
                        const isOwnMessage =
                          (isDoctor && message.senderType === "doctor") || (!isDoctor && message.senderType === "user")

                        const showAvatar = index === 0 || messages[index - 1]?.senderType !== message.senderType

                        return (
                          <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-4 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-end gap-2 max-w-[75%] ${
                                isOwnMessage ? "flex-row-reverse" : "flex-row"
                              }`}
                            >
                              {!isOwnMessage && showAvatar && (
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-gray-600" />
                                </div>
                              )}
                              {!isOwnMessage && !showAvatar && <div className="w-8 h-8 flex-shrink-0"></div>}

                              <div className={`relative ${isOwnMessage ? "ml-auto" : "mr-auto"}`}>
                                {message.content ? (
                                  <div
                                    className={`${
                                      isOwnMessage
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                        : "bg-white text-gray-800 border border-gray-100"
                                    } px-4 py-3 rounded-2xl shadow-sm ${isOwnMessage ? "rounded-br-md" : "rounded-bl-md"}`}
                                    style={{
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                      hyphens: "auto",
                                    }}
                                  >
                                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                                  </div>
                                ) : null}

                                {/* Render attachments if any */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className={`${message.content ? "mt-2" : ""}`}>
                                    {message.attachments.map((attachment, idx) => (
                                      <div key={idx} className={`${idx > 0 ? "mt-2" : ""}`}>
                                        {renderAttachmentPreview(attachment)}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div
                                  className={`flex items-center gap-1 mt-1 ${
                                    isOwnMessage ? "justify-end" : "justify-start"
                                  }`}
                                >
                                  <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                                  {isOwnMessage && <Check className="w-3 h-3 text-blue-500" />}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input container - FIXED HEIGHT */}
                <div className="bg-white border-t border-gray-100" style={{ minHeight: "120px" }}>
                  {/* Selected files preview - fixed space allocation */}
                  <div className="h-16 border-b border-gray-100 overflow-hidden flex items-center">
                    {selectedFiles.length > 0 ? (
                      <div className="p-3 w-full">
                        <div className="flex gap-2 overflow-x-auto">
                          {selectedFiles.map((file, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap"
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
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500 p-0.5 rounded-full hover:bg-red-50 transition-colors"
                              >
                                <X className="w-2.5 h-2.5" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Empty space when no files - maintains consistent height
                      <div className="p-3 w-full"></div>
                    )}
                  </div>

                  {/* Input area - fixed height */}
                  <div className="px-4 py-3 h-16 flex items-center">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3 w-full">
                      {/* Attachment button with dropdown */}
                      <div className="relative">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                        >
                          <Paperclip className="w-5 h-5" />
                        </motion.button>

                        {/* File input (hidden) */}
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" multiple />

                        {/* Attachment dropdown menu */}
                        <AnimatePresence>
                          {attachmentMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              className={`absolute bottom-full ${isRTL ? "right-0" : "left-0"} mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10 min-w-[180px]`}
                            >
                              <div className="py-2">
                                {/* Photo Gallery */}
                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = "image/*,video/*"
                                    fileInputRef.current.removeAttribute("capture")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.photoGallery}</span>
                                </motion.button>

                                {/* Camera */}
                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = "image/*"
                                    fileInputRef.current.setAttribute("capture", "environment")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-green-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.takePhoto}</span>
                                </motion.button>

                                {/* Document */}
                                <motion.button
                                  type="button"
                                  whileHover={{ backgroundColor: "#f8fafc" }}
                                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-left transition-colors"
                                  onClick={() => {
                                    fileInputRef.current.accept = ".pdf,.doc,.docx,.xls,.xlsx,.txt,application/*"
                                    fileInputRef.current.removeAttribute("capture")
                                    fileInputRef.current.click()
                                    setAttachmentMenuOpen(false)
                                  }}
                                >
                                  <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                    <File className="w-4 h-4 text-orange-600" />
                                  </div>
                                  <span className="font-medium text-gray-700">{t.document}</span>
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message input */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={t.typeMessage}
                          className={`w-full ${isRTL ? "pr-4 pl-12" : "pl-4 pr-12"} py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 break-words`}
                          style={{
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                          }}
                          disabled={
                            (!selectedConversation.approved &&
                              !isDoctor &&
                              messages.filter((m) => m.senderType === "user").length >= 1) ||
                            sending
                          }
                        />
                        <button
                          type="button"
                          className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Send button */}
                      <motion.button
                        type="submit"
                        disabled={
                          (!newMessage.trim() && selectedFiles.length === 0) ||
                          sending ||
                          (!selectedConversation.approved &&
                            !isDoctor &&
                            messages.filter((m) => m.senderType === "user").length >= 1)
                        }
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {sending ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Status messages - fixed height */}
                  <div className="h-12 px-4 flex items-center">
                    <AnimatePresence>
                      {!selectedConversation.approved &&
                        !isDoctor &&
                        messages.filter((m) => m.senderType === "user").length >= 1 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-3"
                          >
                            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                              <Clock className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                              <p className="text-xs text-yellow-700">{t.pendingApproval}</p>
                            </div>
                          </motion.div>
                        )}

                      {selectedConversation.approved && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-3"
                        >
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <p className="text-xs text-green-700">{t.conversationApproved}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image viewer modal */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100]"
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
                className="max-w-full max-h-[95vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}