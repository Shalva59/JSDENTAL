"use client"

// import { useLanguage } from "@/context/LanguageContext"
// import { servicesByLanguage } from "@/js/dentalServicesList"

import { useLanguage } from "../context/LanguageContext"
import { servicesByLanguage } from "../app/js/dentalServicesList"

export function useLocalizedServices() {
  const { currentLanguage } = useLanguage()

  // დააბრუნეთ შესაბამისი ენის სერვისები ან ქართული, თუ არ არსებობს
  return servicesByLanguage[currentLanguage] || servicesByLanguage.ka
}
