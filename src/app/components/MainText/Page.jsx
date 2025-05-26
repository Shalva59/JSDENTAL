"use client"
import { useEffect } from "react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import { useLanguage } from "@/context/LanguageContext"

const DentalSection = () => {
  const { translations, language } = useLanguage()

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" })
  }, [])

  const isGeorgian = language === "ka"
  const isHebrew = language === "he"
  const isRTL = isHebrew

  const georgianFont = { fontFamily: '"Noto Sans Georgian", sans-serif' }
  const georgianSerifFont = {
    fontFamily: '"Noto Serif Georgian", "Noto Sans Georgian", serif',
    letterSpacing: "-0.02em",
  }

  const hebrewFont = {
    fontFamily: '"Noto Sans Hebrew", "Arial Hebrew", sans-serif',
    direction: "rtl",
  }

  // ებრაულისთვის სწორი რიცხვების ფორმატი
  const getStatsData = () => {
    if (isHebrew) {
      return [
        {
          number: "3+",
          label: translations?.dentalSection?.stats?.experience || "שנות ניסיון",
        },
        {
          number: "50+",
          label: translations?.dentalSection?.stats?.patients || "מטופלים מרוצים",
        },
        {
          number: "100%",
          label: translations?.dentalSection?.stats?.safety || "בטיחות",
        },
        {
          number: "24/7",
          label: translations?.dentalSection?.stats?.support || "תמיכה",
        },
      ]
    }

    return [
      {
        number: "3+",
        label:
          translations?.dentalSection?.stats?.experience || (isGeorgian ? "წლიანი გამოცდილება" : "Years Experience"),
      },
      {
        number: "50+",
        label: translations?.dentalSection?.stats?.patients || (isGeorgian ? "კმაყოფილი პაციენტი" : "Happy Patients"),
      },
      {
        number: "100%",
        label: translations?.dentalSection?.stats?.safety || (isGeorgian ? "უსაფრთხოება" : "Safety Standards"),
      },
      {
        number: "24/7",
        label: translations?.dentalSection?.stats?.support || (isGeorgian ? "მხარდაჭერა" : "Support"),
      },
    ]
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&family=Noto+Serif+Georgian:wght@400;500;600;700;800&family=Noto+Sans+Hebrew:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 opacity-30"></div>
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-slate-100 rounded-full blur-3xl opacity-20"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="mx-auto max-w-4xl text-center">
            <div className="mb-8 sm:mb-10">
              <span
                className={`inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-slate-700 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200/50 ${isRTL ? "gap-3" : ""}`}
              >
                <svg
                  className={`${isRTL ? "" : "mr-2"} w-4 h-4 text-blue-600 flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={`${isGeorgian ? "font-georgian" : ""}`}
                  style={isGeorgian ? georgianFont : isHebrew ? hebrewFont : {}}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {translations?.dentalSection?.badge ||
                    (isGeorgian
                      ? "პროფესიონალური სტომატოლოგია"
                      : isHebrew
                        ? "רפואת שיניים מקצועית"
                        : "Professional Dentistry")}
                </span>
              </span>
            </div>

            <h1
              className={`flex flex-col sm:flex-row items-center justify-center ${isRTL ? "sm:gap-5" : "sm:gap-4"} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-8 leading-tight ${isGeorgian ? "font-georgian-serif" : ""}`}
              style={isGeorgian ? georgianSerifFont : isHebrew ? hebrewFont : {}}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {translations?.dentalSection?.mainTitle || translations?.dentalSection?.title || "JC Dental"}
              </span>
              <span className="text-slate-600 font-medium text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                {translations?.dentalSection?.subtitle ||
                  (isGeorgian ? "სტომატოლოგია" : isHebrew ? "רפואת שיניים" : "Dentistry")}
              </span>
            </h1>

            <div className="flex items-center justify-center mb-10 sm:mb-12">
              <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full mx-6"></div>
              <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
            </div>

            <p
              className={`text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal mb-14 sm:mb-16 px-4 ${isGeorgian ? "font-georgian" : ""}`}
              style={
                isGeorgian
                  ? { ...georgianFont, lineHeight: "1.8", letterSpacing: "0.01em" }
                  : isHebrew
                    ? { ...hebrewFont, lineHeight: "1.9", letterSpacing: "0.02em" }
                    : { lineHeight: "1.8" }
              }
              dir={isRTL ? "rtl" : "ltr"}
            >
              {translations?.dentalSection?.description ||
                (isHebrew
                  ? 'מרפאת השיניים "JC Dental" מצוידת בטכנולוגיות דיגיטליות מתקדמות. אצלנו תקבלו שירותי רפואת שיניים מלאים, הן לטיפול והן למטרות אסתטיות.'
                  : 'სტომატოლოგიური კლინიკა "JC Dental" აღჭურვილია თანამედროვე ციფრული ტექნოლოგიებით. ჩვენთან მიიღებთ სრულ სტომატოლოგიურ მომსახურებას, როგორც მკურნალობის, ასევე ესთეტიური მიმართულებით.')}
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-14 sm:mb-16 px-2`}
            >
              {getStatsData().map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
                    dir={isRTL ? "ltr" : "ltr"}
                  >
                    {stat.number}
                  </div>
                  <div
                    className={`text-slate-600 font-medium text-sm sm:text-base ${isGeorgian ? "font-georgian" : ""} leading-snug`}
                    style={isGeorgian ? georgianFont : isHebrew ? hebrewFont : {}}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className={`flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center px-4 sm:px-0 ${isRTL ? "" : ""}`}
            >
              {/* <Link
                href="/pages/booking"
                className={`group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto min-w-[200px] ${isRTL ? "gap-4" : ""} order-1 ${isRTL ? "sm:order-2" : ""}`}
              >
                <svg
                  className={`${isRTL ? "" : "mr-3"} w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span
                  className={`${isGeorgian ? "font-georgian" : ""} ${isRTL ? "px-2" : ""}`}
                  style={isGeorgian ? georgianFont : isHebrew ? hebrewFont : {}}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {translations?.dentalSection?.bookButton ||
                    (isGeorgian ? "ჩაწერა" : isHebrew ? "קביעת תור" : "Book Appointment")}
                </span>
              </Link>

              <Link href="/pages/contact"
                className={`group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-900 bg-white/90 backdrop-blur-sm border-2 border-slate-200 rounded-2xl hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto min-w-[200px] ${isRTL ? "gap-4 flex row-reverse" : ""} order-2 ${isRTL ? "sm:order-1" : ""}`}
              >
                <svg
                  className={`${isRTL ? "" : "mr-3"} w-5 h-5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span
                  className={`${isGeorgian ? "font-georgian" : ""} ${isRTL ? "px-2" : ""}`}
                  style={isGeorgian ? georgianFont : isHebrew ? hebrewFont : {}}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {translations?.dentalSection?.contactButton ||
                    (isGeorgian ? "დაკავშირება" : isHebrew ? "צור קשר" : "Contact Us")}
                </span>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
      `}</style>
    </>
  )
}

export default DentalSection
