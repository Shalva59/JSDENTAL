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
  User
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

  // Translations
  const texts = {
    ka: {
      messages: "შეტყობინებები",
      typeMessage: "დაწერეთ შეტყობინება...",
      noConversations: "საუბრები არ არის",
      back: "უკან",
      send: "გაგზავნა",
      pendingApproval: "დამტკიცების მოლოდინში"
    },
    en: {
      messages: "Messages",
      typeMessage: "Type a message...",
      noConversations: "No conversations",
      back: "Back",
      send: "Send",
      pendingApproval: "Pending approval"
    },
    ru: {
      messages: "Сообщения",
      typeMessage: "Введите сообщение...",
      noConversations: "Нет разговоров",
      back: "Назад",
      send: "Отправить",
      pendingApproval: "Ожидает подтверждения"
    },
    he: {
      messages: "הודעות",
      typeMessage: "הקלד הודעה...",
      noConversations: "אין שיחות",
      back: "חזור",
      send: "שלח",
      pendingApproval: "ממתין לאישור"
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

  // Send message
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
      
      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, data.message])
        setNewMessage("")
        
        // Update conversation list
        fetchConversations()
      }
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
              width: isMinimized ? '300px' : '350px',
              height: isMinimized ? '60px' : '500px',
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
                              <h4 className="font-medium text-gray-800 truncate">
                                {isDoctor 
                                  ? conversation.patientName 
                                  : `Dr. ${conversation.doctorName}`}
                              </h4>
                              {conversation.lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                  {conversation.lastMessage}
                                </p>
                              )}
                            </div>
                            {!conversation.approved && (
                              <Clock className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <>
                    {/* Messages area */}
                    <div className="h-[350px] overflow-y-auto p-3 bg-gray-50">
                      {messages.map((message) => {
                        const isOwnMessage = 
                          (isDoctor && message.senderType === 'doctor') ||
                          (!isDoctor && message.senderType === 'user')
                        
                        return (
                          <div
                            key={message._id}
                            className={`mb-3 ${isOwnMessage ? 'text-right' : 'text-left'}`}
                          >
                            <div
                              className={`inline-block max-w-[70%] p-2 rounded-lg ${
                                isOwnMessage
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-800 border border-gray-200'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                              }`}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={t.typeMessage}
                          className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={
                            (!selectedConversation.approved && !isDoctor && 
                             messages.filter(m => m.senderType === 'user').length >= 1) ||
                            sending
                          }
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim() || sending}
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {!selectedConversation.approved && !isDoctor && 
                       messages.filter(m => m.senderType === 'user').length >= 1 && (
                        <p className="text-xs text-yellow-600 mt-1">
                          {t.pendingApproval}
                        </p>
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