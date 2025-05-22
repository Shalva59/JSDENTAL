"use client"

import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { useLocalizedServices } from "../../../hooks/useLocalizedServices"
import { useLanguage } from "../../../context/LanguageContext"
import Link from "next/link"

const ServicesSection = () => {
  const services = useLocalizedServices() // ენა-სპეციფიკური სერვისების მიღება
  const { translations, currentLanguage } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 1000, // ანიმაციის ხანგრძლივობა
      once: true, // ანიმაცია მხოლოდ ერთხელ შესრულდება
    })

    // Add custom styles for the specific breakpoint
    const style = document.createElement("style")
    style.innerHTML = `
      /* Custom grid for 640px-1025px */
      @media (min-width: 640px) and (max-width: 1025px) {
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .serviceCards {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .serviceCards .link-container {
          margin-top: auto;
          padding-top: 1rem;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  // Determine if the current language is RTL (right-to-left)
  const isRTL = currentLanguage === "he" || currentLanguage === "ar"

  // Choose the appropriate arrow direction based on language direction
  const directionArrow = isRTL ? "←" : "→"

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          {translations?.services?.title || "სერვისები"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in" // ✅ AOS "zoom-in" ეფექტი
              className="bg-white shadow-lg p-6 rounded-lg text-center transform transition-transform duration-300 ease-in-out serviceCards flex flex-col"
            >
              <div className="text-4xl text-teal-500 mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <div className="flex-grow">
                <p className="text-gray-600">{service.description}</p>
              </div>
              <div className="link-container mt-4">
                <Link href="/pages/dentalservise" className="block text-teal-500  font-semibold">
                  {translations?.buttons?.readMore || "ნახე მეტი"} {directionArrow}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
