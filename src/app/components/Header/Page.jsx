"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from "../../Assets/logo.png"
import { Globe, Check } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import NotificationsDropdown from "../NotificationsDropdown" // Add this line

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
  const localizedProducts = useLocalizedNavigation()
  const { data: session, status } = useSession()  // Add this line
  const isAuthenticated = status === "authenticated"  // Add this line
  const selectedLanguage = languages.find((lang) => lang.code === currentLanguage)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false)
  const isRTL = direction === "rtl"
  const headerRef = useRef(null)
  const [headerHeightState, setHeaderHeight] = useState(0)
  const langMenuRef = useRef(null)
  const langButtonRef = useRef(null)
  const mobileLangMenuRef = useRef(null)
  const mobileLangButtonRef = useRef(null)
  const pathname = usePathname()
  const [isDesktop, setIsDesktop] = useState(true)
  
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
  
  // Check if screen width is less than 1200px
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsDesktop(window.innerWidth >= 1200)
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
      // მობილურის ენის მენიუსთვის
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
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  const handleLanguageChange = (code) => {
    changeLanguage(code)
    setIsLangMenuOpen(false)
    setIsMobileLangMenuOpen(false)
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
  
  // ენის ელემენტების ანიმაციის ვარიანტები
  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 10 : -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.03, duration: 0.2 },
    }),
    exit: { opacity: 0, transition: { duration: 0.05 } },
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
  
  // ენის ელემენტის რენდერი თანმიმდევრული დაშორებით
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
        dir="ltr"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{language.flag}</div>
          <span>{language.nativeName}</span>
        </div>
        {isSelected && <Check className="h-4 w-4 text-gray-700" />}
      </motion.button>
    )
  }
  
  // არჩეული ენის რენდერი თანმიმდევრული დაშორებით
  const renderSelectedLanguage = () => {
    return (
      <div className="flex items-center gap-3">
        <Globe className="h-4 w-4 flex-shrink-0 text-gray-600" />
        <div className="w-6 h-4 relative overflow-hidden flex-shrink-0">{selectedLanguage?.flag}</div>
        <span>{selectedLanguage?.nativeName}</span>
      </div>
    )
  }
  
  // აქტიური მენიუს ელემენტის შემოწმება
  const isActiveLink = (url) => {
    if (url === "/" && pathname === "/") return true
    if (url !== "/" && pathname.startsWith(url)) return true
    return false
  }
  
  // დროფდაუნის საერთო სტილები
  const dropdownStyles = "rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
  
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
        <div className="max-w-screen-xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* ლოგო */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div style={{ width: logoSize, height: logoSize }}>
                <Image src={logo || "/placeholder.svg"} alt="JC Dental" width={50} height={40} />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">JC Dental</span>
            </Link>
            
            {/* მობილური მენიუს ღილაკი */}
            <motion.button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={
                isDesktop
                  ? "hidden"
                  : "inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              }
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
            
            {/* დესკტოპის ნავიგაცია */}
            <nav className={isDesktop ? "flex items-center space-x-8" : "hidden"}>
              {localizedProducts.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className={`text-base font-medium relative transition-colors ${
                    isActiveLink(item.url) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
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
              <div className="text-base font-medium text-gray-700 relative">
                <span>Smile Creator</span>
                <motion.p
                  className="text-[9.7px] text-right text-red-500 absolute right-0 -bottom-3 tracking-[1.2px]"
                  variants={blinkVariants}
                  animate="animate"
                >
                  {translations?.buttons?.comingSoon || "მალე"}
                </motion.p>
              </div>
            </nav>
            
            {/* ენის არჩევანი და CTA */}
            <div className={isDesktop ? "flex items-center space-x-4" : "hidden"}>
              {/* ენის არჩევანი */}
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
              {isAuthenticated && <NotificationsDropdown />}

              {/* Authentication - Desktop */}
              {isAuthenticated ? (
                <div className="relative group">
                  <motion.button 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{session.user.name}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </motion.button>
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {translations?.header?.logout || "Logout"}
                    </button>
                  </div>
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
          </div>
        </div>
        
        {/* მობილური მენიუ ანიმაციით */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={isDesktop ? "hidden" : "border-t border-gray-200 bg-white overflow-hidden"}
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
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActiveLink(item.url)
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
              <motion.div variants={mobileMenuItemVariants} className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center justify-between px-4">
                  <div className="relative">
                    <motion.button
                      type="button"
                      ref={mobileLangButtonRef}
                      onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      dir="ltr"
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
                  {isAuthenticated && <NotificationsDropdown />}

                  {/* Authentication - Mobile */}
                  {isAuthenticated ? (
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 mt-1"
                      >
                        {translations?.header?.logout || "Logout"}
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/pages/authorization/log_in"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {translations?.login?.login || "Login"}
                    </Link>
                  )}
                </div>
              </motion.div>
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