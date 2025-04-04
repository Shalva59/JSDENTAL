"use client"

import { createContext, useState, useContext } from "react"

const LanguageContext = createContext()

const languages = {
  en: {
    name: "English",
    code: "en",
  },
  ka: {
    name: "ქართული",
    code: "ka",
  },
  he: {
    name: "עברית",
    code: "he",
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(languages.ka)

  const changeLanguage = (langCode) => {
    setLanguage(languages[langCode] || languages.ka)
  }

  return <LanguageContext.Provider value={{ language, changeLanguage, languages }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

