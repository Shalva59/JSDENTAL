"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useEffect, useRef, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AboutPage() {
  const { translations, direction, currentLanguage } = useLanguage()
  const isRTL = direction === "rtl"
  const contactInfoRef = useRef(null)
  const [infoHeight, setInfoHeight] = useState("100%")

  // თანმიმდევრული ფერების სქემა
  const colors = {
    primary: "#0284c7", // ღია ლურჯი
    secondary: "#0ea5e9", // ცისფერი
    accent: "#38bdf8", // ღია ცისფერი
    light: "#e0f2fe", // ძალიან ღია ცისფერი
    dark: "#0c4a6e", // მუქი ლურჯი
    text: "#334155", // მუქი ნაცრისფერი ტექსტისთვის
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  // მივიღოთ საკონტაქტო ინფორმაციის სიმაღლე და გამოვიყენოთ რუკისთვის
  useEffect(() => {
    if (contactInfoRef.current) {
      const updateHeight = () => {
        const height = contactInfoRef.current.offsetHeight
        setInfoHeight(`${height}px`)
      }

      // Initial measurement
      updateHeight()

      // Update on resize
      window.addEventListener("resize", updateHeight)

      // Cleanup
      return () => {
        window.removeEventListener("resize", updateHeight)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700" dir={direction}>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://thumbs.dreamstime.com/z/stomatology-24828014.jpg"
            alt={translations?.about?.heroImageAlt || "JCDental კლინიკის ინტერიერი"}
            className="w-full h-full object-cover brightness-[0.7]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 to-sky-700/50 z-10"></div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20"
          data-aos="zoom-in"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {translations?.about?.title || "ჩვენს შესახებ JCDental"}
          </h1>
          <p className="text-xl text-white max-w-2xl">
            {translations?.about?.subtitle || "გამორჩეული სტომატოლოგიური მომსახურება."}
          </p>
          <div className="mt-8">
            <Link
              href="/pages/booking"
              className="px-6 py-3 bg-white text-sky-600 rounded-full font-medium shadow-lg hover:bg-sky-50 transition-colors"
            >
              {translations?.hero?.button || "დაჯავშნეთ ვიზიტი"}
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={isRTL ? "md:order-2" : "md:order-1"} data-aos="zoom-in">
            <h2
              className={`text-3xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}
              style={{ color: colors.primary }}
            >
              {translations?.about?.welcomeTitle || "მოგესალმებათ JCDental"}
            </h2>
            <p className={`text-lg mb-4 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              {translations?.about?.welcomeText1 ||
                "JC Dental-ში გვჯერა, რომ ჯანმრთელი ღიმილი საერთო კეთილდღეობის საფუძველია. ჩვენი თანამედროვე სტომატოლოგიური კლინიკა აერთიანებს უახლეს ტექნოლოგიებსა და პროფესიონალებს."}
            </p>
            <p className={`text-lg mb-6 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
              {translations?.about?.welcomeText2 ||
                "მიუხედავად იმისა, გვსტუმრობთ რუტინული შემოწმებისთვის თუ კომპლექსური სტომატოლოგიური მკურნალობისთვის, ჩვენი გამოცდილი მაღალკვალიფიციური გუნდი მზადაა უზრუნველყოს თქვენი კომფორტი და კმაყოფილება."}
            </p>
            <div className={isRTL ? "text-right" : "text-left"}>
              <Link
                href="/pages/booking"
                className="inline-block px-5 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: colors.primary,
                  color: "white",
                }}
              >
                {translations?.hero?.button || "დაჯავშნეთ ვიზიტი"}
              </Link>
            </div>
          </div>
          <div
            className={`relative h-[400px] rounded-lg overflow-hidden shadow-xl ${isRTL ? "md:order-1" : "md:order-2"}`}
            data-aos="zoom-in"
          >
            <img
              src="/implantis_ukana_xedi.jpg"
              alt={translations?.about?.receptionImageAlt || "JCDental მიმღები"}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* History & Mission Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              {translations?.about?.historyMissionTitle || "ჩვენი ისტორია და მისია"}
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={isRTL ? "md:order-2" : "md:order-1"} data-aos="zoom-in">
              <h3
                className={`text-2xl font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
                style={{ color: colors.dark }}
              >
                {translations?.about?.historyTitle || "ჩვენი ისტორია"}
              </h3>
              <p className={`mb-4 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                <span className="font-semibold">
                  {translations?.about?.historyFounder || "JCDental დაარსდა გაბრიელ ჯანაშვილის მიერ"}
                </span>
                ,{" "}
                {translations?.about?.historyFounderDesc ||
                  "როგორც თანამედროვე სტომატოლოგიური ცენტრი, რომელიც მიზნად ისახავს"}{" "}
                <span className="font-semibold">
                  {translations?.about?.historyGoal || "ინოვაციური და უმაღლესი ხარისხის სტომატოლოგიური მომსახურების"}
                </span>{" "}
                {translations?.about?.historyGoalDesc || "მიწოდებას"}.
              </p>
              <p className={`mb-6 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {translations?.about?.historyText ||
                  "ჩვენი კლინიკა აერთიანებს თანამედროვე ტექნოლოგიებს და მაღალკვალიფიციურ გუნდს, რომელიც მიზნად ისახავს ჯანმრთელი და ნათელი ღიმილის შექმნას. მიუხედავად იმისა, რომ JC Dental ჩამოყალიბდა 2025 წელს, ჩვენი ხედვა და პაციენტებისადმი ვალდებულება გვაძლევს შესაძლებლობას, სწრაფად გავხდეთ რეგიონის ერთ-ერთი წამყვანი სტომატოლოგიური ცენტრი."}
              </p>

              <h3
                className={`text-2xl font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
                style={{ color: colors.dark }}
              >
                {translations?.about?.missionTitle || "ჩვენი მისია"}
              </h3>
              <p className={`leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
                {translations?.about?.missionText ||
                  "ჩვენი მისიაა სტომატოლოგიური მომსახურების მაღალი ხარისხის უზრუნველყოფა მინიმალურად ინვაზიური მეთოდებით, თანამედროვე ტექნოლოგიების დანერგვა და პაციენტების კომფორტის პრიორიტირება. JCDental-ში ჩვენ გვჯერა, რომ ჯანმრთელი ღიმილი უკეთესი ცხოვრების საწინდარია, ამიტომ ვთავაზობთ თანამედროვე, უსაფრთხო და ხელმისაწვდომ სტომატოლოგიურ მომსახურებას."}
              </p>
            </div>
            <div
              className={`relative h-[500px] rounded-lg overflow-hidden shadow-xl ${isRTL ? "md:order-1" : "md:order-2"}`}
              data-aos="zoom-in"
            >
              <img
                src="/terapevtis_ukana_xedi.jpg"
                alt={translations?.about?.historyImageAlt || "JCDental კლინიკის ისტორიის დროის ხაზი"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

  

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              {translations?.contact?.title || "დაგვიკავშირდით"}
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
            <p className="text-lg max-w-3xl mx-auto">
              {translations?.contact?.subtitle ||
                "ჩვენ აქ ვართ, რომ ვუპასუხოთ თქვენს კითხვებს და დაგეხმაროთ შემდეგი ვიზიტის დაგეგმვაში."}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Info - ყოველთვის მეორე RTL-ში, პირველი LTR-ში */}
            <div className={`w-full md:w-1/2 ${isRTL ? "md:order-2" : "md:order-1"}`}>
              <div ref={contactInfoRef} className="bg-white p-8 rounded-xl shadow-lg h-full" data-aos="zoom-in">
                <h3
                  className={`text-2xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}
                  style={{ color: colors.dark }}
                >
                  {translations?.contact?.infoTitle || "საკონტაქტო ინფორმაცია"}
                </h3>
                <div className="space-y-6">
                  {/* ლოკაციის ინფორმაცია */}
                  <div className="flex justify-between items-start gap-2" data-aos="zoom-in">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div className={`${isRTL ? "text-right" : "text-left"} flex-grow ${isRTL ? "pl-6" : "pr-6"}`}>
                      <h4 className="font-semibold mb-1">{translations?.contact?.address || "მისამართი"}</h4>
                      <p>
                        {translations?.contact?.addressText ||
                          "ნავთლუღის ქ. 10 არქი-ისანი , C ბლოკი, 1 სადარბაზო, 1, სართული 0190"}
                      </p>
                    </div>
                  </div>

                  {/* ტელეფონის ინფორმაცია */}
                  <div className="flex justify-between items-start gap-2" data-aos="zoom-in">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div className={`${isRTL ? "text-right" : "text-left"} flex-grow ${isRTL ? "pl-6" : "pr-6"}`}>
                      <h4 className="font-semibold mb-1">{translations?.contact?.phone || "ტელეფონი"}</h4>
                      <p dir="ltr">+995 500 50 20 62</p>
                    </div>
                  </div>

                  {/* ელ-ფოსტის ინფორმაცია */}
                  <div className="flex justify-between items-start gap-2" data-aos="zoom-in">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div className={`${isRTL ? "text-right" : "text-left"} flex-grow ${isRTL ? "pl-6" : "pr-6"}`}>
                      <h4 className="font-semibold mb-1">{translations?.contact?.email || "ელ-ფოსტა"}</h4>
                      <p>jcdental07@gmail.com</p>
                    </div>
                  </div>

                  {/* სამუშაო საათების ინფორმაცია */}
                  <div className="flex justify-between items-start gap-2" data-aos="zoom-in">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div className={`${isRTL ? "text-right" : "text-left"} flex-grow ${isRTL ? "pl-6" : "pr-6"}`}>
                      <h4 className="font-semibold mb-1">{translations?.contact?.hours || "სამუშაო საათები"}</h4>
                      <p>
                        {translations?.contact?.weekdays || "ორშაბათი - პარასკევი"}: 10:00 - 20:00
                        <br />
                        {translations?.contact?.saturday || "შაბათი"}: {translations?.contact?.closed || "დახურულია"}
                        <br />
                        {translations?.contact?.sunday || "კვირა"}: 10:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* სოციალური მედიის ლინკები */}
                <div className="mt-8 flex justify-between items-center" data-aos="zoom-in">
                  <div className="flex space-x-4">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61573996716691"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${colors.light}` }}
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" style={{ color: colors.primary }} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/j_c_dental/"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${colors.light}` }}
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" style={{ color: colors.primary }} />
                    </Link>
            
                  </div>
                  <div className={`${isRTL ? "text-right" : "text-left"}`}>
                    <h4 className="font-semibold">{translations?.contact?.followUs || "გამოგვყევით"}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Map - ყოველთვის პირველი RTL-ში, მეორე LTR-ში */}
            <div className={`w-full md:w-1/2 ${isRTL ? "md:order-1" : "md:order-2"}`}>
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-lg"
                data-aos="zoom-in"
                style={{ height: infoHeight }}
              >
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.7482331732344!2d44.842029075397165!3d41.68189427127412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d3db3f527e1%3A0x626d96f8aff559d8!2sJC%20Dental!5e0!3m2!1ska!2sge!4v1713314084985!5m2!1ska!2sge"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Overlay ღილაკი */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=JC+Dental,+Tbilisi,+Georgia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    📍 {translations?.contact?.getDirections || "მიიღეთ მიმართულებები"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
