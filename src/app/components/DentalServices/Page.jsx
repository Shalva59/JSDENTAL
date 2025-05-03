"use client"

import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { useLocalizedServices } from "../../../hooks/useLocalizedServices"
import { useLanguage } from "../../../context/LanguageContext"
import Link from "next/link"

const ServicesSection = () => {
  const services = useLocalizedServices() // ენა-სპეციფიკური სერვისების მიღება
  const { translations } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 1000, // ანიმაციის ხანგრძლივობა
      once: true, // ანიმაცია მხოლოდ ერთხელ შესრულდება
    })
  }, [])

  

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          {translations?.services?.title || "სერვისები"}
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in" // ✅ AOS "zoom-in" ეფექტი
              className="bg-white shadow-lg p-6 rounded-lg text-center transform transition-transform duration-300 ease-in-out serviceCards"
            >
              <div className="text-4xl text-teal-500 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <Link href="/pages/dentalservise" className="mt-4 block text-teal-500 font-semibold">
                {translations?.buttons?.readMore || "ნახე მეტი"} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
