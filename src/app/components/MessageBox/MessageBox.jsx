// src/app/components/MessageBox/MessageBox.jsx

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
  Paperclip,
  Image,
  Camera,
  File,
  CheckCircle,
  XCircle,
  AlertTriangle
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
  const [viewingImage, setViewingImage] = useState(null);

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
      longPressToDownload: "მობილურზე: ხანგრძლივად დააჭირეთ და აირჩიეთ 'სურათის შენახვა' ან 'ჩამოტვირთვა'",

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
      longPressToDownload: "For mobile: long-press and select 'Save Image' or 'Download'",
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
      longPressToDownload: "Для мобильных: удерживайте и выберите 'Сохранить изображение' или 'Скачать'",
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
      longPressToDownload: "למכשירים ניידים: לחץ לחיצה ארוכה ובחר 'שמור תמונה' או 'הורד'",
    }
  }

  const t = texts[currentLanguage] || texts.ka

  // Fetch conversations on mount
  useEffect(() => {
    if (session) {
      fetchConversations()
    }
  }, [session])

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
    await fetchMessages(conversation._id)
  }

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

  // Approve conversation (for doctors)
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
      
      if (response.ok) {
        // Update local state
        setSelectedConversation({
          ...selectedConversation,
          approved: true
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

  // Add this function to your component (before the return statement)
  const downloadAttachment = (attachment) => {
    try {
      // Create a blob from the base64 data
      const byteCharacters = atob(attachment.data);
      const byteArrays = [];
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      
      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], {type: attachment.type});
      
      // Create a temporary URL for the blob
      const blobUrl = URL.createObjectURL(blob);
      
      // Create an invisible download link and click it
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = attachment.name || `download.${attachment.type.split('/')[1] || 'file'}`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
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
        throw new Error("Failed to send message")
      }
      
      const data = await response.json()
      
      // Add the new message to the list
      setMessages(prev => [...prev, data.message])
      
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

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadAttachment(attachment);
            }}
            className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
          >
            {t.downloadFile}
          </button>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadAttachment(attachment);
              }}
              className="inline-block px-2 py-1 text-xs text-center text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t.downloadFile}
            </button>
          </div>
        </div>
      )
    }
  }

  // Don't render if no session or no conversations
  if (!session || !hasConversations) {
    return null
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
        {conversations.filter(c => c.lastMessage).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {conversations.filter(c => c.lastMessage).length}
          </span>
        )}
      </motion.button>

      {/* Message box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} bg-white rounded-lg shadow-2xl z-50 overflow-hidden`}
            style={{
              width: isMinimized ? '300px' : '380px', // Increased width
              height: isMinimized ? '60px' : '550px', // Increased height
              maxHeight: 'calc(100vh - 120px)'
            }}
            dir={direction}
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
              {selectedConversation && !isMinimized ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedConversation(null)}>
                    <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                  <span className="font-medium">
                    {isDoctor 
                      ? selectedConversation.patientName 
                      : `Dr. ${selectedConversation.doctorName}`}
                  </span>
                  
                  {/* Show approval status */}
                  {!selectedConversation.approved && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.pendingApproval}
                    </span>
                  )}
                </div>
              ) : (
                <span className="font-medium">{t.messages}</span>
              )}
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-blue-700 p-1 rounded"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-blue-700 p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Conversation list or messages */}
                {!selectedConversation ? (
                  <div className="h-[440px] overflow-y-auto">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <MessageCircle className="w-12 h-12 mb-2" />
                        <p>{t.noConversations}</p>
                      </div>
                    ) : (
                      conversations.map((conversation) => (
                        <div
                          key={conversation._id}
                          className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSelectConversation(conversation)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-800 truncate">
                                  {isDoctor 
                                    ? conversation.patientName 
                                    : `Dr. ${conversation.doctorName}`}
                                </h4>
                                
                                {/* Approval status indicator */}
                                {!conversation.approved && (
                                  <span className="ml-2">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                  </span>
                                )}
                              </div>
                              
                              {conversation.lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                  {conversation.lastMessage}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <>
                    {/* Doctor approval banner */}
                    {isDoctor && !selectedConversation.approved && (
                      <div className="bg-amber-50 p-3 border-b border-amber-100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-amber-800">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="text-sm font-medium">{t.pendingApproval}</span>
                          </div>
                          <button 
                            onClick={handleApproveConversation}
                            disabled={approving}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md flex items-center gap-1 disabled:opacity-50"
                          >
                            {approving ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                <span>{t.approving}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                <span>{t.approveConversation}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Messages area */}
                    <div className="h-[calc(100%-165px)] overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
                      {messages.length > 0 ? (
                        <div className="space-y-4">
                          {messages.map((message) => {
                            const isOwnMessage = 
                              (isDoctor && message.senderType === 'doctor') ||
                              (!isDoctor && message.senderType === 'user');
                            
                            return (
                              <div
                                key={message._id}
                                className={`mb-3 ${isOwnMessage ? 'text-right' : 'text-left'}`}
                              >
                                <div
                                  className={`inline-block max-w-[90%] sm:max-w-[70%] p-2 rounded-lg ${
                                    isOwnMessage
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                                  }`}
                                >
                                  {message.content && (
                                    <p className="text-sm dark:text-inherit">{message.content}</p>
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
                                  
                                  <p className={`text-xs mt-1 ${
                                    isOwnMessage ? 'text-blue-200' : 'text-gray-500 dark:text-gray-300'
                                  }`}>
                                    {formatTime(message.timestamp)}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-gray-500">
                            <MessageCircle className="w-10 h-10 mx-auto mb-2" />
                            <p>{t.noConversations}</p>
                          </div>
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
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
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
                          
                          {/* File input (hidden) */}
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
                        
                        {/* Message input */}
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
                        />
                        
                        {/* Send button */}
                        <button
                          type="submit"
                          disabled={
                            (!newMessage.trim() && selectedFiles.length === 0) || 
                            sending ||
                            (!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1)
                          }
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
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
                          {t.pendingApproval}
                        </p>
                      )}
                      
                      {/* Show approved status */}
                      {selectedConversation.approved && (
                        <p className="text-xs text-green-600 mt-1 px-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {t.conversationApproved}
                        </p>
                      )}
                      {/* Image viewer modal */}
                      {viewingImage && (
                        <div 
                          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]"
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
                    </form>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}