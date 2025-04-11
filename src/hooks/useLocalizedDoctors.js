"use client"


import { useLanguage } from "../context/LanguageContext"
import { doctorsByLanguage } from "../app/js/doctors"

export function useLocalizedDoctors() {
  const { currentLanguage } = useLanguage()

  // დააბრუნეთ შესაბამისი ენის ექიმები ან ქართული, თუ არ არსებობს
  return doctorsByLanguage[currentLanguage] || doctorsByLanguage.ka
}
