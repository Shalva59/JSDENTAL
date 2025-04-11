"use client"

// import { useLanguage } from "@/context/LanguageContext"
// import { navigationByLanguage } from "@/js/navigation"

import { useLanguage } from "../context/LanguageContext"
import { navigationByLanguage } from "../app/js/navigation"

export function useLocalizedNavigation() {
  const { currentLanguage } = useLanguage()

  // მივიღოთ შესაბამისი ენის ნავიგაცია
  const navItems = navigationByLanguage[currentLanguage] || navigationByLanguage.ka

  // დავამატოთ originalName ველი, თუ არ არსებობს
  return navItems.map((item) => {
    // ვიპოვოთ ქართული ეკვივალენტი, რომ შევინახოთ originalName
    const originalItem = navigationByLanguage.ka.find((kaItem) => kaItem.url === item.url)

    return {
      ...item,
      originalName: originalItem ? originalItem.name : item.name,
    }
  })
}
