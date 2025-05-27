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
  CheckCircle
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
      typingLimit: "პაციენტებს შეუძლიათ გააგზავნონ მხოლოდ ერთი შეტყობინება, სანამ ექიმი დაამტკიცებს საუბარს"
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
      typingLimit: "Patients can only send one message until the doctor approves the conversation"
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
      typingLimit: "Пациенты могут отправить только одно сообщение до подтверждения разговора врачом"
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
      typingLimit: "מטופלים יכולים לשלוח רק הודעה אחת עד שהרופא מאשר את השיחה"
    }
  }
  
  const t = texts[currentLanguage] || texts.ka
  
  // Check authentication
  useEffect(() => {
    if (authStatus === "loading") return
    if (!session) {
      router.push("/pages/authorization/log_in")
    }
  }, [session, authStatus, router])
  
  // Fetch conversations on load
  useEffect(() => {
    if (session) {
      fetchConversations()
    }
  }, [session])
  
  // Fetch conversations list
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
      
      // If we have a selected conversation, update it with the latest data
      if (selectedConversation) {
        const updated = data.conversations.find(
          c => c._id === selectedConversation._id
        )
        if (updated) {
          setSelectedConversation(updated)
        }
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    if (!session || !conversationId) return
    
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`)
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }
      
      const data = await response.json()
      setMessages(data.messages || [])
      
      // Update conversation with latest data
      if (data.conversation) {
        setSelectedConversation(data.conversation)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
      setError(error.message)
    }
  }
  
  // Refresh conversations and messages
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
    setMessages([]); // Clear messages first to avoid showing stale data
    
    try {
      const response = await fetch(`/api/conversations/${conversation._id}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      
      const data = await response.json();
      console.log("Fetched messages:", data.messages); // Debug log
      setMessages(data.messages || []);
      
      // Focus on message input after a small delay
      setTimeout(() => {
        if (messageInputRef.current) {
          messageInputRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(error.message);
    }
  };
  
  // Send a message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return
    
    setSending(true)
    try {
      const response = await fetch(`/api/conversations/${selectedConversation._id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }
      
      const data = await response.json()
      
      // Add the new message to the list and clear input
      setMessages(prev => [...prev, data.message])
      setNewMessage("")
      
      // Fetch updated conversation list to update last message data
      fetchConversations()
      
      // Also fetch messages again to ensure complete sync
      await fetchMessages(selectedConversation._id)
    } catch (error) {
      console.error("Error sending message:", error)
      setError(error.message)
    } finally {
      setSending(false)
    }
  }
  
  // Approve conversation (doctor only)
  const handleApproveConversation = async () => {
    if (!isDoctor || !selectedConversation) return
    
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
    }
  }
  
  // Back to conversation list
  const handleBackToList = () => {
    setSelectedConversation(null)
    setMessages([])
  }
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  // Format timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
      return `${t.yesterday}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }
    
    // Otherwise show full date
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatConversationTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            {!conversation.approved && (
                              <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mr-2">
                                <Clock className="w-3 h-3 mr-1" />
                                {t.pendingApproval}
                              </span>
                            )}
                            {conversation.approved && (
                              <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2">
                                <Check className="w-3 h-3 mr-1" />
                                {t.approved}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-500 text-sm mt-1 truncate">
                            {conversation.lastMessage || "..."}
                          </p>
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
                        {!selectedConversation.approved && (
                          <div className="flex items-center">
                            <span className="text-xs text-yellow-600 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {t.pendingApproval}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Approve button for doctors */}
                  {isDoctor && !selectedConversation.approved && (
                    <button
                      onClick={handleApproveConversation}
                      className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-full hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.approveConversation}
                    </button>
                  )}
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
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
                                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                                    isOwnMessage
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 border border-gray-200'
                                }`}
                                >
                                <p>{message.content}</p>
                                <div
                                    className={`text-xs mt-1 ${
                                    isOwnMessage ? 'text-blue-200' : 'text-gray-500'
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
                
                {/* Message input */}
                <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t.typeMessage}
                      className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={
                        (!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1) ||
                        sending
                      }
                      ref={messageInputRef}
                    />
                    <button
                      type="submit"
                      disabled={
                        !newMessage.trim() || 
                        sending ||
                        (!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1)
                      }
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Message limit warning */}
                  {!selectedConversation.approved && !isDoctor && messages.filter(m => m.senderType === 'user').length >= 1 && (
                    <p className="text-xs text-yellow-600 mt-1 px-2">
                      {t.waitForApproval}
                    </p>
                  )}
                  
                  {/* Conversation approved success message */}
                  {selectedConversation.approved && (
                    <AnimatePresence>
                      {selectedConversation.approved && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-green-600 mt-1 px-2"
                        >
                          <CheckCircle className="inline-block w-3 h-3 mr-1" />
                          {t.conversationApproved}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </form>
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