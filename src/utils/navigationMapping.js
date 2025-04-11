"use client"

import { useLanguage } from "@/context/LanguageContext"
import { navigationByLanguage } from "@/js/navigation"

export function useLocalizedNavigation() {
  const { currentLanguage } = useLanguage()

  // დააბრუნეთ შესაბამისი ენის ნავიგაცია ან ქართული, თუ არ არსებობს
  return navigationByLanguage[currentLanguage] || navigationByLanguage.ka
}
