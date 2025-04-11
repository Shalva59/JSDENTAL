"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { languages } from "../languages"

// Create the context
const LanguageContext = createContext()

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Provider component
export const LanguageProvider = ({ children }) => {
  // Try to get the language from localStorage, default to 'ka'
  const [currentLanguage, setCurrentLanguage] = useState("ka")
  const [translations, setTranslations] = useState(languages.ka)
  const [direction, setDirection] = useState("ltr")

  // Update language
  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode)
    setTranslations(languages[langCode])

    // Set direction for RTL languages (Hebrew)
    if (langCode === "he") {
      setDirection("rtl")
      document.documentElement.dir = "rtl"
      document.documentElement.lang = langCode
    } else {
      setDirection("ltr")
      document.documentElement.dir = "ltr"
      document.documentElement.lang = langCode
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", langCode)
    }
  }

  // Initialize from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage && languages[savedLanguage]) {
        changeLanguage(savedLanguage)
      }
    }
  }, [])

  const value = {
    currentLanguage,
    translations,
    direction,
    changeLanguage,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
