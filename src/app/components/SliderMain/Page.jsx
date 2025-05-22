"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../../context/LanguageContext"
import Link from "next/link"
import { Calendar, Phone, Clock } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import AOS from "aos"
import "aos/dist/aos.css"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"

export default function DentalSlider() {
  const { translations, direction, currentLanguage } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiperInstance, setSwiperInstance] = useState(null)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      easing: "ease-out-cubic",
    })
  }, [])

  // Define slides with translations
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop",
      title: translations?.slider?.slide1Title || "პროფესიონალური მომსახურება",
      subtitle: translations?.slider?.slide1Subtitle || "თანამედროვე სტომატოლოგიური კლინიკა",
      description:
        translations?.slider?.slide1Description ||
        "გთავაზობთ მაღალი ხარისხის სტომატოლოგიურ მომსახურებას თანამედროვე აღჭურვილობით",
      buttonText: translations?.slider?.bookNow || "დაჯავშნეთ ვიზიტი",
      buttonUrl: "/pages/booking",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
      title: translations?.slider?.slide2Title || "გამოცდილი სპეციალისტები",
      subtitle: translations?.slider?.slide2Subtitle || "პროფესიონალთა გუნდი",
      description:
        translations?.slider?.slide2Description ||
        "ჩვენი ექიმები გამოირჩევიან მრავალწლიანი გამოცდილებით და უახლესი მეთოდების ცოდნით",
      buttonText: translations?.slider?.meetDoctors || "გაიცანით ჩვენი ექიმები",
      buttonUrl: "/pages/doctorspage",
    },

    {
      id: 3,
      image: "/implantis_skamis_ukana_xedi.jpeg",
      title: translations?.slider?.slide3Title || "კომფორტული გარემო",
      subtitle: translations?.slider?.slide3Subtitle || "პაციენტზე ორიენტირებული მიდგომა",
      description:
        translations?.slider?.slide3Description ||
        "ჩვენი კლინიკა შექმნილია თქვენი კომფორტისთვის, რათა ვიზიტი იყოს სასიამოვნო და უსაფრთხო",
      buttonText: translations?.slider?.contactUs || "დაგვიკავშირდით",
      buttonUrl: "/pages/contact",
    },
  ]

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }

  // Initialize swiper
  const handleSwiperInit = (swiper) => {
    setSwiperInstance(swiper)

    // Set RTL direction properly
    if (direction === "rtl") {
      swiper.rtlTranslate = true
    } else {
      swiper.rtlTranslate = false
    }

    swiper.update()

    // Make sure autoplay is running
    swiper.autoplay.start()
  }

  // Update direction when language changes
  useEffect(() => {
    if (swiperInstance) {
      // Properly handle RTL direction
      if (direction === "rtl") {
        swiperInstance.rtlTranslate = true
      } else {
        swiperInstance.rtlTranslate = false
      }

      swiperInstance.update()

      // Force re-render of pagination and navigation
      setTimeout(() => {
        swiperInstance.pagination.update()
        swiperInstance.navigation.update()
      }, 100)
    }
  }, [direction, currentLanguage, swiperInstance])

  // Force restart autoplay every 10 seconds as a fallback
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperInstance && !swiperInstance.autoplay.running) {
        swiperInstance.autoplay.start()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [swiperInstance])

  // Refresh AOS when slide changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.refresh()
    }
  }, [activeIndex])

  return (
    <div className="relative w-full overflow-hidden" dir={direction}>
      {/* Main slider container */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]" data-aos="zoom-in">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          dir={direction}
          className="h-full w-full"
          onSlideChange={handleSlideChange}
          onSwiper={handleSwiperInit}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="relative h-full w-full">
              {({ isActive }) => (
                <>
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
                    <div
                      className={`max-w-xl ${direction === "rtl" ? "mr-0 ml-auto text-right" : "ml-0 mr-auto text-left"}`}
                    >
                      {isActive && (
                        <motion.div initial="hidden" animate="visible" className="space-y-4">
                          {/* Subtitle */}
                          <motion.div
                            className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm"
                            variants={contentVariants}
                            custom={0}
                          >
                            <span className="text-sm font-medium text-white md:text-base">{slide.subtitle}</span>
                          </motion.div>

                          {/* Title */}
                          <motion.h2
                            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
                            variants={contentVariants}
                            custom={1}
                          >
                            {slide.title}
                          </motion.h2>

                          {/* Description */}
                          <motion.p
                            className="max-w-md text-base text-white/90 sm:text-lg md:text-xl"
                            variants={contentVariants}
                            custom={2}
                          >
                            {slide.description}
                          </motion.p>

                          {/* Button */}
                          <motion.div variants={contentVariants} custom={3}>
                            <Link
                              href={slide.buttonUrl}
                              className="group relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
                            >
                              {direction === "rtl" ? (
                                <span className="relative z-10 flex items-center">
                               {slide.buttonText}
                              
                                  <svg
                                    className="mr-2 h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                 
                                </span>
                              ) : (
                                <span className="relative z-10 flex items-center">
                                  {slide.buttonText}
                                  <svg
                                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </span>
                              )}
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons with RTL support */}
          <div
            className={`swiper-button-prev !text-white !w-[50px] !h-[50px] !bg-black/30 !rounded-full ${direction === "rtl" ? "!right-4 !left-auto" : "!left-4"}`}
          ></div>
          <div
            className={`swiper-button-next !text-white !w-[50px] !h-[50px] !bg-black/30 !rounded-full ${direction === "rtl" ? "!left-4 !right-auto" : "!right-4"}`}
          ></div>

          {/* Standard Swiper pagination */}
          <div className="swiper-pagination !bottom-4"></div>
        </Swiper>

        {/* Autoplay indicator */}
        <div className="absolute bottom-0 left-0 z-10 h-1 w-full">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            key={activeIndex}
          />
        </div>
      </div>

      {/* Quick info section - with RTL support */}
      <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-lg sm:grid-cols-2 md:grid-cols-3 md:p-6">
          {/* Quick appointment card */}
          <div
            className="rounded-lg bg-gray-50 p-4 md:p-6 hover:shadow-md transition-all duration-300"
            data-aos="zoom-in"
          >
            <div className={`mb-4 flex items-center ${direction === "rtl" ? "" : ""}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ${direction === "rtl" ? "ml-3" : "mr-3"}`}
              >
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {translations?.slider?.quickAppointment || "სწრაფი ჯავშანი"}
              </h3>
            </div>
            <p className={`mb-4 text-sm text-gray-600 ${direction === "rtl" ? "text-right" : ""}`}>
              {translations?.slider?.quickAppointmentText || "დაჯავშნეთ ვიზიტი სწრაფად და მარტივად"}
            </p>
            <div className={`${direction === "rtl" ? "text-right" : ""}`}>
              <Link
                href="/pages/booking"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                {translations?.slider?.bookNow || "დაჯავშნეთ ახლავე"}
              </Link>
            </div>
          </div>

          {/* Working hours card */}
          <div
            className="rounded-lg bg-gray-50 p-4 md:p-6 hover:shadow-md transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className={`mb-4 flex items-center ${direction === "rtl" ? "" : ""}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ${
                  direction === "rtl" ? "ml-3" : "mr-3"
                }`}
              >
                <Clock className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {translations?.slider?.workingHours || "სამუშაო საათები"}
              </h3>
            </div>
            <ul className={`space-y-2 text-sm text-gray-600 ${direction === "rtl" ? "" : ""}`}>
              <li className="flex justify-between items-center">
                <span>{translations?.slider?.mondayFriday || "ორშაბათი-პარასკევი"}</span>
                <span dir="ltr" className="font-medium text-gray-700">
                  10:00 - 20:00
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>{translations?.slider?.saturday || "შაბათი"}</span>
                {/* <span dir="ltr" className="font-medium text-gray-700">10:00 - 16:00</span> */}
                <span className="font-medium text-gray-700">{translations?.slider?.closed || "დახურულია"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>{translations?.slider?.sunday || "კვირა"}</span>
                <span dir="ltr" className="font-medium text-gray-700">
                  10:00 - 20:00
                </span>
              </li>
            </ul>
          </div>

          {/* Contact info card */}
          <div
            className="rounded-lg bg-gray-50 p-4 md:p-6 hover:shadow-md transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className={`mb-4 flex items-center ${direction === "rtl" ? "" : ""}`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ${direction === "rtl" ? "ml-3" : "mr-3"}`}
              >
                <Phone className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {translations?.slider?.contactInfo || "საკონტაქტო ინფორმაცია"}
              </h3>
            </div>
            <ul className={`space-y-2 text-sm text-gray-600 ${direction === "rtl" ? "text-right" : ""}`}>
              <li className={`flex items-center ${direction === "rtl" ? "" : ""}`}>
                <Phone className={`h-4 w-4 text-blue-700 ${direction === "rtl" ? "ml-2" : "mr-2"}`} />
                <span dir="ltr" className="font-medium text-gray-700">
                  +995 500 50 20 62
                </span>
              </li>
              <li className={`flex items-center ${direction === "rtl" ? "" : ""}`}>
                <svg
                  className={`h-4 w-4 text-blue-700 ${direction === "rtl" ? "ml-2" : "mr-2"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>jcdental07@gmail.com</span>
              </li>
              <li className={`flex items-center ${direction === "rtl" ? "" : ""}`}>
                <svg
                  className={`h-4 w-4 text-blue-700 ${direction === "rtl" ? "ml-2" : "mr-2"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{translations?.slider?.address || "თბილისი, საქართველო"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom styles for Swiper elements */}
      <style jsx global>{`
        /* Improve pagination bullets */
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2) !important;
        }
        
        /* Improve navigation buttons */
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 18px !important;
          font-weight: bold !important;
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          transition: all 0.3s ease !important;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* RTL specific fixes */
        html[dir="rtl"] .swiper-wrapper {
          direction: rtl;
        }
        
        html[dir="rtl"] .swiper-button-prev:after {
          content: 'next';
        }
        
        html[dir="rtl"] .swiper-button-next:after {
          content: 'prev';
        }
        
        /* Hide navigation buttons on mobile */
        @media (max-width: 767px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
          
          .swiper-pagination {
            bottom: 10px !important;
          }
        }
      `}</style>
    </div>
  )
}
