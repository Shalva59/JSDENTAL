"use client"

// import { useLanguage } from "@/context/LanguageContext"
// import { dentistsByLanguage } from "@/data/dentists"

import { useLanguage } from "../context/LanguageContext";
import { dentistsByLanguage } from "../app/js/doctors";

export function useLocalizedDentists() {
  const { currentLanguage } = useLanguage()

  // Return the dentists for the current language, or fallback to Georgian if not available
  return dentistsByLanguage[currentLanguage] || dentistsByLanguage.ka
}
