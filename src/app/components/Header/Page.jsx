"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "../../Assets/logo.png"
import { Globe, Check, ChevronDown, LogOut } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import NotificationsDropdown from "../NotificationsDropdown" // Keep this line

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

// Add a function to get user initials from name
const getUserInitials = (name) => {
  if (!name) return ""

  // Split the name by spaces
  const nameParts = name.split(" ")

  // Get the first letter of each part and join them
  const initials = nameParts
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase())
    .join("")

  // Return the first two initials if there are more than two
  return initials.length > 2 ? initials.substring(0, 2) : initials
}

const Header = () => {
  const { currentLanguage, changeLanguage, translations, direction } = useLanguage()
  const localizedProducts = useLocalizedNavigation()
  const { data: session, status } = useSession() // Add this line
  const isAuthenticated = status === "authenticated" // Add this line
  const selectedLanguage = languages.find((lang) => lang.code === currentLanguage)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const isRTL = direction === "rtl"
  const headerRef = useRef(null)
  const [headerHeightState, setHeaderHeight] = useState(0)
  const langMenuRef = useRef(null)
  const langButtonRef = useRef(null)
  const navDropdownRef = useRef(null)
  const navDropdownButtonRef = useRef(null)
  const userDropdownRef = useRef(null)
  const userDropdownButtonRef = useRef(null)
  const pathname = usePathname()
  const [screenSize, setScreenSize] = useState("desktop") // "mobile", "intermediate", "desktop"
  const [windowHeight, setWindowHeight] = useState(0)
  const mobileMenuRef = useRef(null)

  // სქროლის პროგრესის გამოთვლა
  const { scrollYProgress } = useScroll()
  // სქროლის ინდიკატორის ტრანსფორმაცია - თავიდან ცარიელი, შემდეგ ივსება
  const scrollProgress = useTransform(scrollYProgress, [0, 0.05, 1], ["0%", "5%", "100%"])
  // ჰედერის სტილების ტრანსფორმაცია სქროლის მიხედვით
  const headerHeight = useTransform(scrollYProgress, [0, 0.1], ["4rem", "3.5rem"])
  const headerBgOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])
  const headerShadow = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"],
  )
  const logoSize = useTransform(scrollYProgress, [0, 0.1], [50, 40])

  // მხოლოდ ჰედერის სიმაღლის გაზომვა
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  // Get window height for mobile menu max height
  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    // Initial set
    updateWindowHeight()

    // Update on resize
    window.addEventListener("resize", updateWindowHeight)

    return () => {
      window.removeEventListener("resize", updateWindowHeight)
    }
  }, [])

  // Check screen size and set appropriate mode
  useEffect(() => {
    const checkScreenWidth = () => {
      const width = window.innerWidth
      if (width >= 1400) {
        setScreenSize("desktop")
      } else if (width >= 1200) {
        setScreenSize("intermediate")
      } else {
        setScreenSize("mobile")
      }
    }
    // Initial check
    checkScreenWidth()
    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth)
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenWidth)
    }
  }, [])

  // ენის მენიუს დახურვა გარე კლიკზე
  useEffect(() => {
    const handleClickOutside = (event) => {
      // დესკტოპის ენის მენიუსთვის
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target)
      ) {
        setIsLangMenuOpen(false)
      }

      // Navigation dropdown menu
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target) &&
        navDropdownButtonRef.current &&
        !navDropdownButtonRef.current.contains(event.target)
      ) {
        setIsNavDropdownOpen(false)
      }

      // User dropdown menu
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        userDropdownButtonRef.current &&
        !userDropdownButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (code) => {
    changeLanguage(code)
    setIsLangMenuOpen(false)
    // Close mobile menu when language is changed
    setIsMobileMenuOpen(false)
  }

  // დროფდაუნის პოზიციის გამოთვლა ენის მიმართულების მიხედვით
  const getDesktopDropdownPosition = () => {
    return isRTL ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }

  // დროფდაუნის ანიმაციის ვარიანტები
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.15 },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  // მობილური მენიუს ანიმაციის ვარიანტები
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, when: "afterChildren" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.03 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, when: "afterChildren" },
    },
  }

  // მობილური მენიუს ელემენტების ანიმაციის ვარიანტები
  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -5, transition: { duration: 0.1 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.1 } },
  }

  // "Coming Soon" ტექსტის ციმციმის ანიმაცია
  const blinkVariants = {
    animate: {
      opacity: [1, 0.5, 1],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" },
    },
  }

  // აქტიური მენიუს ელემენტის შემოწმება
  const isActiveLink = (url) => {
    if (url === "/" && pathname === "/") return true
    if (url !== "/" && pathname.startsWith(url)) return true
    return false
  }

  // Calculate max height for mobile menu
  const getMaxMobileMenuHeight = () => {
    if (!windowHeight) return "70vh"
    const headerHeightValue = headerHeightState || 64 // Default if not measured yet
    const maxHeight = windowHeight - headerHeightValue - 10 // 10px buffer
    return `${maxHeight}px`
  }

  // Split navigation items for intermediate view
  // First half will be visible, second half in dropdown
  const splitNavItems = () => {
    const middleIndex = Math.ceil(localizedProducts.length / 2)
    return {
      visibleItems: localizedProducts.slice(0, middleIndex),
      dropdownItems: localizedProducts.slice(middleIndex),
    }
  }

  const { visibleItems, dropdownItems } = splitNavItems()

  // Get the translated "More" text
  const getMoreText = () => {
    if (translations?.header?.more) {
      return translations.header.more
    }

    // Fallback translations for "More" in different languages
    const moreTranslations = {
      ka: "მეტი",
      en: "More",
      he: "עוד",
      ru: "Ещё",
    }

    return moreTranslations[currentLanguage] || "More"
  }

  // Get user's full name or default
  const getUserFullName = () => {
    return session?.user?.name || "Shalva Kokuashvili"
  }

  // Get user's email or default
  const getUserEmail = () => {
    return session?.user?.email || "shakosmail123456789@gmail.com"
  }

  // Get translated logout text
  const getLogoutText = () => {
    if (translations?.header?.logout) {
      return translations.header.logout
    }

    // Fallback translations for "Logout" in different languages
    const logoutTranslations = {
      ka: "გასვლა",
      en: "Logout",
      he: "התנתק",
      ru: "Выход",
    }

    return logoutTranslations[currentLanguage] || "Logout"
  }

  return (
    <>
      {/* სივრცის შემნახველი დივი */}
      <div style={{ height: `${headerHeightState}px` }} />
      {/* ჰედერი */}
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-full z-30 bg-white border-b border-gray-200"
        dir={direction}
        style={{
          height: headerHeight,
          boxShadow: headerShadow,
          backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity})`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* ლოგო */}
            <Link href="/" className={`flex items-center ${isRTL ? "space-x-reverse space-x-3 gap-2" : "space-x-3"}`}>
              <motion.div style={{ width: logoSize, height: logoSize }}>
                <Image src={logo || "/placeholder.svg"} alt="JC Dental" width={50} height={40} />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">JC Dental</span>
            </Link>

            {/* Desktop Navigation (1400px+) */}
            {screenSize === "desktop" && (
              <nav className="flex items-center">
                <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-8" : "space-x-8"}`}>
                  {localizedProducts.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className={`text-base font-medium relative transition-colors whitespace-nowrap ${isActiveLink(item.url) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      {item.name}
                      {isActiveLink(item.url) && (
                        <motion.div
                          className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-blue-600"
                          layoutId="activeNavIndicator"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}

                  {/* Smile Creator */}
                  <div
                    className={`text-base font-medium text-gray-700 relative whitespace-nowrap ${isRTL ? "mr-8" : ""
                      }`}
                  >
                    <span>Smile Creator</span>
                    <motion.p
                      className={`text-[9.7px] text-red-500 absolute -bottom-3 tracking-[1.2px] ${isRTL ? "text-left right-auto " : "text-right left-auto right-0"
                        }`}
                      variants={blinkVariants}
                      animate="animate"
                    >
                      {translations?.buttons?.comingSoon || "מָלֶה"}
                    </motion.p>
                  </div>
                </div>
              </nav>
            )}

            {/* Intermediate Navigation (1200px-1400px) */}
            {screenSize === "intermediate" && (
              <nav className="flex items-center">
                <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"}`}>
                  {/* Visible navigation items */}
                  {visibleItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      className={`text-sm font-medium relative transition-colors whitespace-nowrap ${isActiveLink(item.url) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                      {item.name}
                      {isActiveLink(item.url) && (
                        <motion.div
                          className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-blue-600"
                          layoutId="activeNavIndicator"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}

                  {/* Dropdown for remaining navigation items - Now before Smile Creator */}
                  <div className="relative">
                    <motion.button
                      type="button"
                      ref={navDropdownButtonRef}
                      onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isNavDropdownOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={isRTL ? "ml-1" : "mr-1"}>{getMoreText()}</span>
                      <ChevronDown className="h-4 w-4" />
                    </motion.button>

                    <AnimatePresence>
                      {isNavDropdownOpen && (
                        <motion.div
                          ref={navDropdownRef}
                          className="absolute mt-2 w-48 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                          style={isRTL ? { right: "auto", left: "0" } : { left: "auto", right: "0" }}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="py-1">
                            {dropdownItems.map((item, index) => (
                              <Link
                                key={index}
                                href={item.url}
                                className={`block px-4 py-2 text-sm ${isActiveLink(item.url) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                onClick={() => setIsNavDropdownOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Add Smile Creator to visible items - Now after More dropdown */}
                  <div className="text-sm font-medium text-gray-700 relative whitespace-nowrap">
                    <span>Smile Creator</span>
                    <motion.p
                      className={`text-[9.7px] text-red-500 absolute -bottom-3 tracking-[1.2px] ${isRTL ? "text-left right-auto left-0" : "text-right left-auto right-0"
                        }`}
                      variants={blinkVariants}
                      animate="animate"
                    >
                      {translations?.buttons?.comingSoon || "მალე"}
                    </motion.p>
                  </div>
                </div>
              </nav>
            )}

            {/* ენის არჩევანი და CTA - Desktop & Intermediate */}
            {(screenSize === "desktop" || screenSize === "intermediate") && (
              <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
                {/* ენის არჩევანი */}
                <div className="relative">
                  <motion.button
                    type="button"
                    ref={langButtonRef}
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="inline-flex items-center px-2 lg:px-3 py-2 border border-gray-200 rounded-md text-xs lg:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`flex items-center ${isRTL ? "gap-1 lg:gap-2 flex-row-reverse" : "gap-1 lg:gap-2"}`}
                    >
                      <Globe className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 text-gray-600" />
                      <div className="w-5 h-3 lg:w-6 lg:h-4 relative overflow-hidden flex-shrink-0">
                        {selectedLanguage?.flag}
                      </div>
                      <span>{selectedLanguage?.nativeName}</span>
                    </div>
                  </motion.button>
                  <AnimatePresence>
                    {isLangMenuOpen && (
                      <motion.div
                        ref={langMenuRef}
                        className="absolute mt-2 w-48 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                        style={getDesktopDropdownPosition()}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="py-1">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => handleLanguageChange(language.code)}
                              className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors justify-between ${language.code === currentLanguage
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50"
                                }`}
                              dir="ltr" // Force LTR direction for all language buttons
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{language.flag}</div>
                                <span className={language.code === currentLanguage ? "text-blue-600" : "text-gray-700"}>
                                  {language.nativeName}
                                </span>
                              </div>
                              {language.code === currentLanguage && <Check className="h-4 w-4 text-blue-600" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Notifications - Desktop & Intermediate */}
                {isAuthenticated && <NotificationsDropdown />}

                {/* Authentication - Desktop & Intermediate */}
                {isAuthenticated ? (
                  <div className="relative">
                    <motion.button
                      ref={userDropdownButtonRef}
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      onMouseEnter={() => setIsProfileHovered(true)}
                      onMouseLeave={() => setIsProfileHovered(false)}
                      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#6366f1] text-white font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getUserInitials(getUserFullName())}
                    </motion.button>

                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          ref={userDropdownRef}
                          className="absolute z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                          style={isRTL ? { right: "auto", left: "0" } : { left: "auto", right: "0" }}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div className="bg-[#6366f1] p-4 text-center">
                            <div className="flex flex-col items-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-black text-xl font-medium mb-2">
                                {getUserInitials(getUserFullName())}
                              </div>
                              <h3 className="text-white font-medium text-lg">{getUserFullName()}</h3>
                              <p className="text-white text-opacity-80 text-xs mt-1 break-all">{getUserEmail()}</p>
                            </div>
                          </div>

                          <div className="py-1">
                            <button
                              onClick={() => {
                                signOut({ callbackUrl: "/" })
                                setIsUserDropdownOpen(false)
                              }}
                              className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 ${isRTL ? "" : ""
                                }`}
                            >
                              <LogOut className={`h-5 w-5 text-red-500 ${isRTL ? "ml-3" : "mr-3"}`} />
                              <span>{getLogoutText()}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/pages/authorization/log_in"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {translations?.login?.login || "Login"}
                    </Link>
                  </motion.div>
                )}
              </div>
            )}

            {/* Mobile - Only Notifications and Burger Menu */}
            {screenSize === "mobile" && (
              <div className="flex items-center">
                {isAuthenticated && (
                  <div className={isRTL ? "ml-2" : "mr-2"}>
                    <NotificationsDropdown />
                  </div>
                )}

                {/* მობილური მენიუს ღილაკი */}
                <motion.button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
              </div>
            )}
          </div>
        </div>

        {/* მობილური მენიუ ანიმაციით */}
        <AnimatePresence>
          {screenSize === "mobile" && isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="border-t border-gray-200 bg-white"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                maxHeight: getMaxMobileMenuHeight(),
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Scrollable container for mobile menu content */}
              <div className="overflow-y-auto" style={{ maxHeight: getMaxMobileMenuHeight() }}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {localizedProducts.map((item, index) => (
                    <motion.div key={index} variants={mobileMenuItemVariants}>
                      <Link
                        href={item.url}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveLink(item.url)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          }`}
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
                    <motion.p
                      className="text-[12.5px] text-red-500 tracking-[1.2px]"
                      variants={blinkVariants}
                      animate="animate"
                    >
                      {translations?.buttons?.comingSoon || "მალე"}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Language section in mobile menu - Fixed for RTL */}
                <motion.div variants={mobileMenuItemVariants} className="border-t border-gray-200 mt-2">
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-medium text-gray-500">
                      {translations?.header?.language || "Language"}
                    </h3>
                  </div>
                  <div className="pb-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          handleLanguageChange(language.code)
                        }}
                        className={`w-full flex items-center px-4 py-3 text-base ${language.code === currentLanguage ? "bg-blue-50" : "hover:bg-gray-50"
                          } ${isRTL ? "" : ""}`}
                      >
                        <div className={`flex-1 flex items-center ${isRTL ? "" : ""}`}>
                          <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{language.flag}</div>
                          <span
                            className={`${language.code === currentLanguage ? "font-medium text-blue-600" : "text-gray-700"
                              } ${isRTL ? "mx-3 " : "mx-3"}`}
                          >
                            {language.nativeName}
                          </span>
                        </div>
                        {language.code === currentLanguage && <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* User info section */}
                {isAuthenticated && (
                  <motion.div variants={mobileMenuItemVariants} className="border-t border-gray-200">
                    <div className="px-4 py-3">
                      <div className={`flex items-center justify-between ${isRTL ? "" : ""}`}>
                        <div className={`flex flex-col ${isRTL ? "" : ""}`}>
                          <div className={`flex items-center ${isRTL ? "" : ""}`}>
                            <div
                              className={`inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#6366f1] text-white text-sm font-medium ${isRTL ? "ml-2" : "mr-2"}`}
                            >
                              {getUserInitials(getUserFullName())}
                            </div>
                            <span className="text-base font-medium text-gray-900">{getUserFullName()}</span>
                          </div>
                          <span className="text-sm text-gray-500 mt-1">{getUserEmail()}</span>
                        </div>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/" })
                            setIsMobileMenuOpen(false)
                          }}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          {getLogoutText()}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Login button for non-authenticated users */}
                {!isAuthenticated && (
                  <div className="px-4 py-3 border-t border-gray-200">
                    <Link
                      href="/pages/authorization/log_in"
                      className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {translations?.login?.login || "Login"}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* სქროლის პროგრესის ინდიკატორი */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </motion.header>
    </>
  )
}

export default Header
