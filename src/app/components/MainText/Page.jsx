"use client" // "use client" დირექტივა, რომ კომპონენტი მუშაობდეს მხოლოდ ბრაუზერში
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { useLanguage } from "@/context/LanguageContext"

const DentalSection = () => {
  const { translations } = useLanguage()

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Ensures animation runs only once
    })
  }, [])

  return (
    <section
      data-aos="zoom-in"
      className="bg-white flex justify-center py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6"
    >
      <div className="max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight text-center font-extrabold text-gray-900">
          {translations?.dentalSection?.title || "JC Dental სტომატოლოგია"}
        </h2>
        <p className="mb-8 font-light text-gray-500 text-center sm:text-xl">
          {translations?.dentalSection?.description ||
            'სტომატოლოგიური კლინიკა "JC Dental" აღჭურვილია თანამედროვე ციფრული ტექნოლოგიებით. ჩვენთან მიიღებთ სრულ სტომატოლოგიურ მომსახურებას, როგორც მკურნალობის, ასევე ესთეტიური მიმართულებით.'}
        </p>
      </div>
    </section>
  )
}

export default DentalSection
