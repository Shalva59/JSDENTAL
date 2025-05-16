"use client"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { en } from "../../../languages/en"
import { ka } from "../../../languages/ka"
import { ru } from "../../../languages/ru"
import { he } from "../../../languages/he"
import { useEffect, useRef, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const ContactPage = () => {
  const { currentLanguage, direction } = useLanguage()
  const contactInfoRef = useRef(null)
  const [infoHeight, setInfoHeight] = useState("100%")

  // AOS ინიციალიზაცია - გაუმჯობესებული კონფიგურაცია zoom-in ანიმაციებისთვის
  useEffect(() => {
    // Ensure AOS is initialized only once
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out",
      offset: 100, // Trigger animations a bit earlier
      delay: 0,
      mirror: true, // Whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // Defines which position of the element regarding to window should trigger the animation
    })

    // Refresh AOS when the component mounts
    AOS.refresh()

    // Add window resize listener to refresh AOS
    window.addEventListener("resize", AOS.refresh)

    // Cleanup
    return () => {
      window.removeEventListener("resize", AOS.refresh)
    }
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

  // თანმიმდევრული ფერების სქემა
  const colors = {
    primary: "#0284c7", // ღია ლურჯი
    secondary: "#0ea5e9", // ცისფერი
    accent: "#38bdf8", // ღია ცისფერი
    light: "#e0f2fe", // ძალიან ღია ცისფერი
    dark: "#0c4a6e", // მუქი ლურჯი
    text: "#334155", // მუქი ნაცრისფერი ტექსტისთვის
  }

  // ყველა ენის თარგმანების ობიექტი
  const translations = { en, ka, ru, he }

  // მიმდინარე ენის თარგმანები
  const t = translations[currentLanguage] || translations.ka

  // RTL მიმართულების შემთხვევაში ხატულების მარჯინის ცვლილება
  const iconMargin = direction === "rtl" ? "ml-3" : "mr-3"

  return (
    <>
      {/* Add AOS styles to ensure they're loaded */}
      <style jsx global>{`
        /* Ensure AOS styles are applied correctly */
        [data-aos] {
          pointer-events: auto !important;
        }
        
        /* Enhance zoom-in animation */
        [data-aos="zoom-in"] {
          transform: scale(0.6);
          opacity: 0;
          transition-property: transform, opacity;
        }
        
        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>

      <section
        className="py-16 px-4 md:px-6 lg:px-8 bg-white"
        style={{ backgroundColor: colors.light }}
        dir={direction}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
              {t.contact.title}
            </h2>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-800">{t.contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div ref={contactInfoRef} data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-white p-8 rounded-xl shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
                  {t.contact.infoTitle}
                </h3>
                <div className="space-y-6">
                  <div
                    className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <MapPin className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">{t.contact.address}</h4>
                      <p className="text-gray-700">{t.contact.addressText}</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}
                    data-aos="zoom-in"
                    data-aos-delay="250"
                  >
                    <Phone className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">{t.contact.phone}</h4>
                      <p dir="ltr" className="text-gray-700">
                        +995 500 50 20 62
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <Mail className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">{t.contact.email}</h4>
                      <p className="text-gray-700">jcdental07@gmail.com</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}
                    data-aos="zoom-in"
                    data-aos-delay="350"
                  >
                    <Clock className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800">{t.contact.hours}</h4>
                      <p className="text-gray-700">
                        {t.contact.weekdays}: 10:00 - 20:00
                        <br />
                        {t.contact.saturday}: {t.contact.closed}
                        <br />
                        {t.contact.sunday}: 10:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-8 ${direction === "rtl" ? "text-right" : ""}`}
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <h4 className="font-semibold mb-3 text-gray-800">{t.contact.followUs}</h4>
                  <div className={`flex ${direction === "rtl" ? " space-x-reverse gap-3 " : "space-x-4"}`}>
                    <div data-aos="zoom-in" data-aos-delay="450" className="aos-init">
                      <Link
                        href="https://www.facebook.com/profile.php?id=61573996716691"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${colors.light}` }}
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" style={{ color: colors.primary }} />
                      </Link>
                    </div>

                    <div data-aos="zoom-in" data-aos-delay="500" className="aos-init">
                      <Link
                        href="https://www.instagram.com/j_c_dental/"
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${colors.light}` }}
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" style={{ color: colors.primary }} />
                      </Link>
                    </div>

         
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative w-full rounded-xl overflow-hidden shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="150"
              style={{ height: infoHeight }}
            >
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
                <div data-aos="zoom-in" data-aos-delay="600" className="aos-init">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=JC+Dental,+Tbilisi,+Georgia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-blue-50 transition-colors"
                  >
                    📍 {t.contact?.getDirections || "მიიღეთ მიმართულებები"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
