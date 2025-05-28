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
  Image,
  Camera,
  File,
  X,
  AlertTriangle
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
  const [viewingImage, setViewingImage] = useState(null);

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
      downloadFile: "ჩამოტვირთვა"
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
      downloadFile: "Download"
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
      downloadFile: "Скачать"
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
      downloadFile: "הורד"
    }
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
  }, [session, authStatus])

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

  // Select a conversation
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    try {
      const response = await fetch(`/api/conversations/${conversation._id}/messages?ts=${Date.now()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message);
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    
    // Check file size
    const validFiles = files.filter(file => {
      if (file.size > 50 * 1024 * 1024) {
        alert(t.fileTooLarge)
        return false
      }
      return true
    })
    
    setSelectedFiles(prev => [...prev, ...validFiles])
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    // Close attachment menu
    setAttachmentMenuOpen(false)
  }
  
  // Remove selected file
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }
  
  // Get file icon based on type
  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-5 h-5" />
    } else if (file.type.startsWith('video/')) {
      return <Camera className="w-5 h-5" />
    } else {
      return <File className="w-5 h-5" />
    }
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ approved: true })
      })
      
      if (!response.ok) {
        throw new Error("Failed to approve conversation")
      }
      
      // Update the selected conversation and refresh
      setSelectedConversation({
        ...selectedConversation,
        approved: true
      })
      
      // Refresh conversations list
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
      // Create FormData to handle file uploads
      const formData = new FormData()
      formData.append('content', newMessage)
      
      // Add files if any
      selectedFiles.forEach(file => {
        formData.append('files', file)
      })
      
      const response = await fetch(`/api/conversations/${selectedConversation._id}/messages`, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }
      
      const data = await response.json()
      
      // Add the new message to the list and clear input
      setMessages(prev => [...prev, data.message])
      setNewMessage("")
      setSelectedFiles([])
      
      // Fetch updated conversation list to update last message data
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
    if (attachment.type.startsWith('image/')) {
      return (
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <img 
            src={`data:${attachment.type};base64,${attachment.data}`} 
            alt="Attachment" 
            className="max-w-[150px] max-h-[150px] object-contain cursor-pointer"
            onClick={() => setViewingImage(`data:${attachment.type};base64,${attachment.data}`)}
          />
        </div>
      )
    } else {
      // For non-image files, show file info with better mobile layout
      return (
        <div className="w-full flex flex-wrap items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {attachment.type.startsWith('video/') ? 
              <Camera className="w-5 h-5 text-blue-500 flex-shrink-0" /> : 
              <File className="w-5 h-5 text-blue-500 flex-shrink-0" />
            }
            <div className="overflow-hidden min-w-0 flex-1">
              <p className="text-xs font-medium truncate text-gray-700 dark:text-gray-200">{attachment.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(attachment.size)}</p>
            </div>
          </div>
          <div className="w-full mt-1 sm:w-auto sm:mt-0 text-center">
            <a 
              href={`data:${attachment.type};base64,${attachment.data}`} 
              download={attachment.name}
              className="inline-block px-2 py-1 text-xs text-center text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                // Mobile workaround
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                  alert(t.longPressToDownload || "For mobile: long-press and select 'Save Image' or 'Download'");
                }
              }}
            >
              {t.downloadFile}
            </a>
          </div>
        </div>
      )
    }
  }


  // Format timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  // Format conversation time
  const formatConversationTime = (timestamp) => {
    if (!timestamp) return ''
    
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
  
  // Scroll to bottom when messages update
  // useEffect(() => {
  //   if (messagesEndRef.current && messages.length > 0) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  // Loading state
  if (authStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  // Unauthenticated state
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir={direction}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t.loginRequired}</h1>
          <a
            href="/pages/authorization/log_in"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {t.login}
          </a>
        </div>
      </div>
    )
  }  
  
  // Main content
  return (
    <div className="min-h-screen bg-gray-50" dir={direction}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">{t.title}</h1>
        
        {/* Message interface */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex h-[calc(100vh-200px)]">
            {/* Conversations list */}
            <div className={`w-full md:w-1/3 border-r border-gray-200 ${selectedConversation ? 'hidden md:block' : ''}`}>
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium text-gray-800">{t.title}</h2>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center p-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-3">{t.noConversations}</p>
                  <p className="text-gray-500 text-sm">{t.startConversation}</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation._id}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedConversation?._id === conversation._id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800 truncate">
                                {isDoctor 
                                    ? (conversation.patientName || "Patient")
                                    : `Dr. ${conversation.doctorName || "Doctor"}`
                                }
                            </h3>
                            
                            {/* Approval status */}
                            {!conversation.approved && (
                              <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded ml-2">
                                <Clock className="w-3 h-3 mr-1" />
                                {t.pendingApproval}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-500 text-sm mt-1 truncate">
                            {conversation.lastMessage || "..."}
                          </p>
                          
                          <div className="text-xs text-gray-400 mt-1">
                            {formatConversationTime(conversation.lastMessageTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Message area */}
            {selectedConversation ? (
              <div className="w-full md:w-2/3 flex flex-col">
                {/* Conversation header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      className="md:hidden mr-2 text-gray-500"
                      onClick={handleBackToList}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {isDoctor 
                              ? (selectedConversation.patientName || "Patient")
                              : `Dr. ${selectedConversation.doctorName || "Doctor"}`
                          }
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Approval status / action */}
                  {!selectedConversation.approved && (
                    isDoctor ? (
                      <button 
                        onClick={handleApproveConversation}
                        disabled={approving}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-md flex items-center gap-1 disabled:opacity-50"
                      >
                        {approving ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                            <span>{t.approving}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{t.approveConversation}</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t.pendingApproval}
                      </span>
                    )
                  )}
                </div>
                
                {/* Messages */}
                <div className="flex-grow max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-200px)] overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        // Determine if this message was sent by the current user
                        const isOwnMessage =
                          (isDoctor && message.senderType === 'doctor') ||
                          (!isDoctor && message.senderType === 'user');
                        
                        return (
                          <div
                            key={message._id}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`inline-block max-w-[90%] sm:max-w-[75%] rounded-lg px-4 py-2 ${
                                isOwnMessage
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              {message.content && (
                                <p className="dark:text-inherit">{message.content}</p>
                              )}
                              
                              {/* Render attachments if any */}
                              {message.attachments && message.attachments.length > 0 && (
                                <div className={`mt-2 ${message.content ? 'pt-2 border-t border-gray-200/30' : ''}`}>
                                  <div className="space-y-2">
                                    {message.attachments.map((attachment, idx) => (
                                      <div key={idx} className="flex flex-col items-start">
                                        {renderAttachmentPreview(attachment)}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div
                                className={`text-xs mt-1 ${
                                isOwnMessage ? 'text-blue-200' : 'text-gray-500 dark:text-gray-300'
                                }`}
                              >
                                {formatMessageTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">{t.noMessages}</p>
                      <p className="text-gray-400 text-sm mt-1">{t.sendFirstMessage}</p>
                    </div>
                  )}
                </div>
                
                {/* Selected files preview */}
                {selectedFiles.length > 0 && (
                  <div className="max-h-20 overflow-y-auto border-t border-gray-200 p-2 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white p-1 rounded border border-gray-200">
                          {getFileIcon(file)}
                          <span className="text-xs truncate max-w-[80px]">{file.name}</span>
                          <button 
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
                  <div className="flex items-center gap-2">
                    {/* Attachment button with dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setAttachmentMenuOpen(!attachmentMenuOpen)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      
                      {/* Hidden file input */}
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileSelect} 
                        className="hidden" 
                        multiple 
                      />
                      
                      {/* Attachment dropdown menu */}
                      {attachmentMenuOpen && (
                        <div className="absolute bottom-full left-0 mb-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-10">
                          <div className="py-1">
                            {/* Photo Gallery */}
                            <button
                              type="button"
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                              onClick={() => {
                                fileInputRef.current.accept = "image/*,video/*";
                                fileInputRef.current.removeAttribute("capture");
                                fileInputRef.current.click();
                                setAttachmentMenuOpen(false);
                              }}
                            >
                              <Image className="w-4 h-4 text-blue-500" />
                              {t.photoGallery}
                            </button>
                            
                            {/* Camera */}
                            <button
                              type="button"
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                              onClick={() => {
                                fileInputRef.current.accept = "image/*";
                                fileInputRef.current.setAttribute("capture", "environment");
                                fileInputRef.current.click();
                                setAttachmentMenuOpen(false);
                              }}
                            >
                              <Camera className="w-4 h-4 text-green-500" />
                              {t.takePhoto}
                            </button>
                            
                            {/* Document */}
                            <button
                              type="button"
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                              onClick={() => {
                                fileInputRef.current.accept = ".pdf,.doc,.docx,.xls,.xlsx,.txt,application/*";
                                fileInputRef.current.removeAttribute("capture");
                                fileInputRef.current.click();
                                setAttachmentMenuOpen(false);
                              }}
                            >
                              <File className="w-4 h-4 text-orange-500" />
                              {t.document}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t.typeMessage}
                      className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={
                        (!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1) ||
                        sending
                      }
                      ref={messageInputRef}
                    />
                    <button
                      type="submit"
                      disabled={
                        (!newMessage.trim() && selectedFiles.length === 0) || 
                        sending ||
                        (!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1)
                      }
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
                    >
                      {sending ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Message limit warning */}
                  {!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1 && (
                    <p className="text-xs text-yellow-600 mt-1 px-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.waitForApproval}
                    </p>
                  )}
                  
                  {/* Show approved status */}
                  {selectedConversation.approved && (
                    <p className="text-xs text-green-600 mt-1 px-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {t.conversationApproved}
                    </p>
                  )}
                </form>
                {/* Image viewer modal */}
                {viewingImage && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setViewingImage(null)}
                  >
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                      <button 
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingImage(null);
                        }}
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <img 
                        src={viewingImage} 
                        alt="Full size attachment" 
                        className="max-w-full max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:w-2/3 items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.noConversations}</p>
                  <p className="text-gray-400 text-sm mt-2">{t.startConversation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}