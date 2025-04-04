"use client"

import { createContext, useState, useContext } from "react"
import en from "@/locales/en/translation.json" assert { type: "json" }
import ka from "@/locales/ka/translation.json" assert { type: "json" }
import he from "@/locales/he/translation.json" assert { type: "json" }
import ru from "@/locales/ru/translation.json" assert { type: "json" }

const LanguageContext = createContext()

const translations = {
  en,
  ka,
  he,
  ru,
}

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
  ru: {
    name: "Русский",
    code: "ru",
  }
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageProvider({ children }) {
  const [languageCode, setLanguageCode] = useState("ka")

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguageCode(langCode)
    }
  }

  const t = (keyPath) => {
    const keys = keyPath.split(".")
    return keys.reduce((obj, key) => obj?.[key], translations[languageCode]) || keyPath
  }

  const language = languages[languageCode]

  return (
    <LanguageContext.Provider value={{ language, languageCode, changeLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  )
}