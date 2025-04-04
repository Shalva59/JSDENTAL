"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "../../js/navigation" // სწორი ბილიკი
import logo from "../../Assets/logo.png" // სწორი ბილიკი
import { Globe } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext";

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
  const [currentLanguage, setCurrentLanguage] = useState("ka")
  const selectedLanguage = languages.find((lang) => lang.code === currentLanguage)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef(null)
  const mobileLangMenuRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false)

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
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false)
      }
      if (mobileLangMenuRef.current && !mobileLangMenuRef.current.contains(event.target)) {
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
    setCurrentLanguage(code)
    setIsLangMenuOpen(false)
    setIsMobileLangMenuOpen(false)
  }

  return (
    <header
      className={`bg-white w-full border-b border-gray-200 z-30 ${
        isScrolled ? "fixed top-0 left-0 animate-slideDown shadow-md" : "relative"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src={logo || "/placeholder.svg"} alt="JC Dental" width={50} height={40} />
            <span className="text-xl font-bold text-gray-900">JC Dental</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {products.map((item, index) => (
              <Link key={index} href={item.url} className="text-base font-medium text-gray-700 hover:text-blue-600">
                {item.name}
              </Link>
            ))}
            <div className="text-base font-medium text-gray-700 relative">
              <span>Smile Creator</span>
              <p className="text-[9.7px] text-right text-red-700 absolute right-0 -bottom-3 tracking-[1.2px] animate-blink">
                Comming Soon
              </p>
            </div>
          </nav>

          {/* Language selector and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Globe className="h-4 w-4 mr-2" />
                <div className="w-5 h-3.5 relative overflow-hidden mr-2">{selectedLanguage?.flag}</div>
                <span>{selectedLanguage?.nativeName}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <div className="w-5 h-3.5 relative overflow-hidden mr-2">{language.flag}</div>
                        <span>{language.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Get Started Button */}
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get started
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {products.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 relative">
              <span>Smile Creator</span>
              <p className="text-[12.5px] text-red-700 tracking-[1.2px] animate-blink">Coming Soon</p>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-4">
              <div className="relative" ref={mobileLangMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <div className="w-5 h-3.5 relative overflow-hidden mr-2">{selectedLanguage?.flag}</div>
                  <span>{selectedLanguage?.nativeName}</span>
                </button>

                {isMobileLangMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <div className="w-5 h-3.5 relative overflow-hidden mr-2">{language.flag}</div>
                          <span>{language.nativeName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Add this CSS to your global styles or component
const styles = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1.5s infinite;
}
`

export default Header

