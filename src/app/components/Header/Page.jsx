"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "../../Assets/logo.png" // სწორი ბილიკი
import { Globe, Check } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation"
import { motion, AnimatePresence } from "framer-motion"

const languages = [
  // საქართველოს დროშა
  {
    code: "ka",
    name: "Georgian",
    nativeName: "ქართული",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="h-full w-full">
        <rect width="300" height="200" fill="white" />
        <path
          d="M120,0 L120,80 L0,80 L0,120 L120,120 L120,200 L180,200 L180,120 L300,120 L300,80 L180,80 L180,0 Z"
          fill="#ff0000"
        />
        <path
          d="M0,0 h60 v40 h-60 z M240,0 h60 v40 h-60 z M0,160 h60 v40 h-60 z M240,160 h60 v40 h-60 z"
          fill="#ff0000"
        />
      </svg>
    ),
  },

  // ამერიკის დროშა
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="h-full w-full">
        <rect width="300" height="200" fill="#ffffff" />
        <g>
          <rect width="300" height="15.4" y="0" fill="#B22234" />
          <rect width="300" height="15.4" y="30.8" fill="#B22234" />
          <rect width="300" height="15.4" y="61.6" fill="#B22234" />
          <rect width="300" height="15.4" y="92.4" fill="#B22234" />
          <rect width="300" height="15.4" y="123.2" fill="#B22234" />
          <rect width="300" height="15.4" y="154" fill="#B22234" />
          <rect width="300" height="15.4" y="184.8" fill="#B22234" />
        </g>
        <rect width="120" height="107.7" fill="#3C3B6E" />
      </svg>
    ),
  },

  //  ებრაული დროშა
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="h-full w-full">
        <rect width="300" height="200" fill="white" />
        <rect width="300" height="25" y="25" fill="#0038b8" />
        <rect width="300" height="25" y="150" fill="#0038b8" />
        <path d="M150,60 l30,52 l-60,0 z M150,140 l30,-52 l-60,0 z" fill="#0038b8" stroke="#0038b8" strokeWidth="0" />
      </svg>
    ),
  },

  // რუსული დროშა
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="h-full w-full">
        <rect width="300" height="66.7" y="0" fill="#FFFFFF" />
        <rect width="300" height="66.7" y="66.7" fill="#0039A6" />
        <rect width="300" height="66.7" y="133.3" fill="#D52B1E" />
      </svg>
    ),
  },
]

const Header = () => {
  const { currentLanguage, changeLanguage, translations, direction } = useLanguage()
  const localizedProducts = useLocalizedNavigation() // ენა-სპეციფიკური ნავიგაციის მიღება
  const selectedLanguage = languages.find((lang) => lang.code === currentLanguage)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef(null)
  const langButtonRef = useRef(null)
  const mobileLangMenuRef = useRef(null)
  const mobileLangButtonRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false)
  const isRTL = direction === "rtl"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    const handleClickOutside = (event) => {
      // For desktop language menu
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target)
      ) {
        setIsLangMenuOpen(false)
      }

      // For mobile language menu
      if (
        mobileLangMenuRef.current &&
        !mobileLangMenuRef.current.contains(event.target) &&
        mobileLangButtonRef.current &&
        !mobileLangButtonRef.current.contains(event.target)
      ) {
        setIsMobileLangMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (code) => {
    // ენის ცვლილების დროს ვხურავთ მენიუს
    changeLanguage(code)
    setIsLangMenuOpen(false)
    setIsMobileLangMenuOpen(false)
  }

  // Calculate dropdown position based on language direction for desktop
  const getDesktopDropdownPosition = () => {
    return isRTL ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.0,
        ease: "easeInOut",
      },
    },
  }

  // Animation variants for language items
  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 10 : -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.05 } },
  }

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      },
    },
  }

  // Animation variants for mobile menu items
  const mobileMenuItemVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.1,
      },
    },
  }

  // Function to render language item with consistent spacing
  const renderLanguageItem = (language, index) => {
    const isSelected = language.code === currentLanguage

    return (
      <motion.button
        key={language.code}
        custom={index}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={() => handleLanguageChange(language.code)}
        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors justify-between ${
          isSelected ? "bg-white text-gray-900" : "text-gray-700 hover:bg-gray-50"
        }`}
        dir="ltr" // Force LTR for language items to ensure consistent spacing
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{language.flag}</div>
          <span>{language.nativeName}</span>
        </div>
        {isSelected && <Check className="h-4 w-4 text-gray-700" />}
      </motion.button>
    )
  }

  // Function to render the selected language with consistent spacing
  const renderSelectedLanguage = () => {
    return (
      <div className="flex items-center gap-3">
        <Globe className="h-4 w-4 flex-shrink-0 text-gray-600" />
        <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{selectedLanguage?.flag}</div>
        <span>{selectedLanguage?.nativeName}</span>
      </div>
    )
  }

  // Common dropdown styles
  const dropdownStyles = "rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"

  return (
    <header
      className={`bg-white w-full border-b border-gray-200 z-30 ${
        isScrolled ? "fixed top-0 left-0 animate-slideDown shadow-md" : "relative"
      }`}
      dir={direction}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src={logo || "/placeholder.svg"} alt="JC Dental" width={50} height={40} />
            <span className="text-xl font-bold text-gray-900">JC Dental</span>
          </Link>

          {/* Mobile menu button */}
          <motion.button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <motion.svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16"
                animate={{
                  d: isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16",
                  opacity: isMobileMenuOpen ? 1 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12h16"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 18h16"
                animate={{
                  d: isMobileMenuOpen ? "M6 6l12 12" : "M4 18h16",
                  opacity: isMobileMenuOpen ? 1 : 1,
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.svg>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {localizedProducts.map((item, index) => (
              <Link key={index} href={item.url} className="text-base font-medium text-gray-700 hover:text-blue-600">
                {item.name}
              </Link>
            ))}
            <div className="text-base font-medium text-gray-700 relative">
              <span>Smile Creator</span>
              <p className="text-[9.7px] text-right text-red-700 absolute right-0 -bottom-3 tracking-[1.2px] animate-blink">
                {translations?.buttons?.comingSoon || "Coming Soon"}
              </p>
            </div>
          </nav>

          {/* Language selector and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                type="button"
                ref={langButtonRef}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                whileHover={{ backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.98 }}
              >
                {renderSelectedLanguage()}
              </motion.button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    ref={langMenuRef}
                    className={`absolute mt-2 w-48 z-10 ${dropdownStyles}`}
                    style={getDesktopDropdownPosition()}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-1">
                      {languages.map((language, index) => renderLanguageItem(language, index))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Started Button */}
            <motion.button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              whileHover={{ backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.98 }}
            >
              {translations?.buttons?.getStarted || "Get started"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {localizedProducts.map((item, index) => (
                <motion.div key={index} variants={mobileMenuItemVariants}>
                  <Link
                    href={item.url}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={mobileMenuItemVariants}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 relative"
              >
                <span>Smile Creator</span>
                <p className="text-[12.5px] text-red-700 tracking-[1.2px] animate-blink">
                  {translations?.buttons?.comingSoon || "Coming Soon"}
                </p>
              </motion.div>
            </div>
            <motion.div variants={mobileMenuItemVariants} className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-between px-4">
                <div className="relative">
                  <motion.button
                    type="button"
                    ref={mobileLangButtonRef}
                    onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    dir="ltr" // Force LTR for consistent layout
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {renderSelectedLanguage()}
                  </motion.button>

                  <AnimatePresence>
                    {isMobileLangMenuOpen && (
                      <motion.div
                        ref={mobileLangMenuRef}
                        className={`fixed w-48 z-[100] ${dropdownStyles}`}
                        style={{
                          top: mobileLangButtonRef.current
                            ? mobileLangButtonRef.current.getBoundingClientRect().bottom + 5
                            : "auto",
                          left: isRTL
                            ? "auto"
                            : mobileLangButtonRef.current
                              ? mobileLangButtonRef.current.getBoundingClientRect().left
                              : 16,
                          right: isRTL
                            ? mobileLangButtonRef.current
                              ? window.innerWidth - mobileLangButtonRef.current.getBoundingClientRect().right
                              : 16
                            : "auto",
                        }}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="py-1">
                          {languages.map((language, index) => renderLanguageItem(language, index))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  whileHover={{ backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {translations?.buttons?.getStarted || "Get started"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
