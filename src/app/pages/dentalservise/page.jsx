"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import Link from "next/link"
import Image from "next/image"
import AOS from "aos"
import "aos/dist/aos.css"

// Improved Service Icon Component with proper responsive handling
const ServiceIcon = ({ src, alt, className = "h-20 w-20" }) => {
  return (
    <div className={`relative ${className} flex-shrink-0`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 64px, 80px"
        priority={false}
        quality={85}
      />
    </div>
  )
}

// Fallback SVG icons for better compatibility
const ToothIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5.5c-1.5-2-3-2.5-4-2.5-3 0-5 2.5-5 5 0 3.5 2 5.5 4 8 1.5 2 3 3.5 5 3.5s3.5-1.5 5-3.5c2-2.5 4-4.5 4-8 0-2.5-2-5-5-5-1 0-2.5.5-4 2.5z" />
  </svg>
)

const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

// Main Services Page Component
export default function ServicesPageImproved() {
  const { translations, direction, currentLanguage } = useLanguage()
  const [selectedService, setSelectedService] = useState(null)
  const [searchParams, setSearchParams] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [imageErrors, setImageErrors] = useState({})
  const isRTL = direction === "rtl"
  const isHebrew = currentLanguage === "he"

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  // Handle image loading errors
  const handleImageError = (serviceId) => {
    setImageErrors((prev) => ({ ...prev, [serviceId]: true }))
  }

  // Services data with improved image handling
  const getServicesData = () => {
    const servicesData = {
      therapy: {
        id: 1,
        title: translations?.services?.therapy?.title || "თერაპია",
        slug: "therapy",
        shortDescription:
          translations?.services?.therapy?.shortDescription || "კბილების და პირის ღრუს არასქირურგიული მკურნალობა",
        fullDescription:
          translations?.services?.therapy?.fullDescription ||
          "თერაპია მოიცავს კბილების და პირის ღრუს არასქირურგიულ მკურნალობას. ის ფოკუსირებულია კბილების, ლორწოვანის და პირის ღრუს ქსოვილების კონსერვატიულ აღდგენაზე. ჩვენი კლინიკა გთავაზობთ თანამედროვე მეთოდებს და მასალებს, რომლებიც უზრუნველყოფს მაღალი ხარისხის მკურნალობას და ხანგრძლივ შედეგს.",
        procedures: translations?.services?.therapy?.procedures || [
          "კბილის დაბჟენა",
          "კარიესის მკურნალობა",
          "ენდოდონტიური მკურნალობა (არხების მკურნალობა)",
          "კბილების პროფესიული წმენდა",
          "ფტორირება",
        ],
        imageSrc: "/tooth_folder/therapy2.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
      orthopedics: {
        id: 2,
        title: translations?.services?.orthopedics?.title || "ორთოპედია",
        slug: "orthopedics",
        shortDescription:
          translations?.services?.orthopedics?.shortDescription ||
          "კბილების და ყბა-სახის აპარატის ფუნქციური და ესთეტიკური აღდგენა",
        fullDescription:
          translations?.services?.orthopedics?.fullDescription ||
          "ორთოპედია ფოკუსირებულია კბილების და ყბა-სახის აპარატის ფუნქციური და ესთეტიკური აღდგენაზე. ეს სფერო მოიცავს დაზიანებული, დაკარგული ან დეფორმირებული კბილების პროთეზირებას და აღდგენას. ჩვენი კლინიკა იყენებს უმაღლესი ხარისხის მასალებს და თანამედროვე ტექნოლოგიებს, რათა უზრუნველყოს ბუნებრივი გარეგნობა და მაქსიმალური კომფორტი.",
        procedures: translations?.services?.orthopedics?.procedures || [
          "კბილის გვირგვინები",
          "ვინირები",
          "ხიდები",
          "მოსახსნელი პროთეზები",
          "ინლეი და ონლეი",
        ],
        imageSrc: "/tooth_folder/ortopedia.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
      implantology: {
        id: 3,
        title: translations?.services?.implantology?.title || "იმპლანტოლოგია",
        slug: "implantology",
        shortDescription:
          translations?.services?.implantology?.shortDescription || "დაკარგული კბილების აღდგენა იმპლანტებით",
        fullDescription:
          translations?.services?.implantology?.fullDescription ||
          "იმპლანტოლოგია არის სტომატოლოგიის დარგი, რომელიც სპეციალიზირებულია დაკარგული კბილების აღდგენაზე იმპლანტების საშუალებით. იმპლანტები წარმოადგენენ ტიტანის ხრახნებს, რომლებიც ჩაინერგება ძვალში და ასრულებს ფესვის ფუნქციას. ჩვენი კლინიკა გთავაზობთ მსოფლიოში აღიარებული ბრენდების იმპლანტებს და გამოცდილ სპეციალისტებს.",
        procedures: translations?.services?.implantology?.procedures || [
          "ერთეული იმპლანტები",
          "მრავლობითი იმპლანტები",
          "All-on-4 და All-on-6 სისტემები",
          "ძვლის აუგმენტაცია",
          "სინუს ლიფტინგი",
        ],
        imageSrc: "/tooth_folder/implant.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
      orthodontics: {
        id: 4,
        title: translations?.services?.orthodontics?.title || "ორთოდონტია",
        slug: "orthodontics",
        shortDescription:
          translations?.services?.orthodontics?.shortDescription || "კბილების ლამაზად დაწყობის კორექცია",
        fullDescription:
          translations?.services?.orthodontics?.fullDescription ||
          "ორთოდონტია ფოკუსირებულია კბილების არასწორი განლაგების, თანკბილვის პრობლემების და ყბის არასწორი განვითარების გამოსწორებაზე. ჩვენი კლინიკა გთავაზობთ ორთოდონტიული მკურნალობის სხვადასხვა მეთოდებს, როგორიცაა ტრადიციული ბრეკეტები, გამჭვირვალე კაპები და სხვა თანამედროვე სისტემები.",
        procedures: translations?.services?.orthodontics?.procedures || [
          "მეტალის ბრეკეტები",
          "კერამიკული ბრეკეტები",
          "გამჭვირვალე კაპები (Invisalign)",
          "ლინგვალური ბრეკეტები",
          "რეტეინერები",
        ],
        imageSrc: "/tooth_folder/ortodontia.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
      periodontology: {
        id: 5,
        title: translations?.services?.periodontology?.title || "პაროდონტოლოგია",
        slug: "periodontology",
        shortDescription:
          translations?.services?.periodontology?.shortDescription || "ღრძილების და პაროდონტის ქსოვილების მკურნალობა",
        fullDescription:
          translations?.services?.periodontology?.fullDescription ||
          "პაროდონტოლოგია არის სტომატოლოგიის დარგი, რომელიც ფოკუსირებულია ღრძილების, პაროდონტის ქსოვილების (კბილის ირგვლივ მდებარე რბილი და მაგარი ქსოვილები) და ალვეოლური ძვლის დაავადებების მკურნალობაზე. ჩვენი კლინიკა გთავაზობთ პაროდონტოლოგიური დაავადებების პრევენციას, დიაგნოსტიკას და მკურნალობას.",
        procedures: translations?.services?.periodontology?.procedures || [
          "ღრძილების პროფესიული წმენდა",
          "ღრმა კიურეტაჟი",
          "ღრძილების პლასტიკა",
          "ღრძილების რეცესიის მკურნალობა",
          "პაროდონტიტის მკურნალობა",
        ],
        imageSrc: "/tooth_folder/periodontology.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
      "pediatric-dentistry": {
        id: 6,
        title: translations?.services?.pediatricDentistry?.title || "ბავშვთა სტომატოლოგია",
        slug: "pediatric-dentistry",
        shortDescription:
          translations?.services?.pediatricDentistry?.shortDescription || "ბავშვებისთვის განკუთვნილი მკურნალობა",
        fullDescription:
          translations?.services?.pediatricDentistry?.fullDescription ||
          "ბავშვთა სტომატოლოგია მოიცავს პროფილაქტიკური ზომებს, კბილების მკურნალობას და ბავშვებში ჯანსაღი პირის ღრუს ჩვევების ჩამოყალიბებას. ჩვენი კლინიკა გთავაზობთ მეგობრულ და კომფორტულ გარემოს ბავშვებისთვის, სადაც ისინი მიიღებენ მაღალი ხარისხის სტომატოლოგიურ მომსახურებას.",
        procedures: translations?.services?.pediatricDentistry?.procedures || [
          "პროფილაქტიკური შემოწმება",
          "კბილების დაბჟენა",
          "ფტორირება",
          "ჰერმეტიზაცია",
          "სარძევე კბილების მკურნალობა",
        ],
        imageSrc: "/tooth_folder/kid.png",
        fallbackIcon: <ToothIcon className="h-20 w-20" />,
      },
    }

    return servicesData
  }

  const servicesData = getServicesData()

  // Check if there's a service slug in the URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const serviceSlug = params.get("service")
    if (serviceSlug && servicesData[serviceSlug]) {
      setSelectedService(servicesData[serviceSlug])
    }
    setSearchParams(params)
  }, [currentLanguage])

  // Function to show service details
  const showServiceDetails = (slug) => {
    setSelectedService(servicesData[slug])

    // Update URL without full page reload
    const newParams = new URLSearchParams(searchParams)
    newParams.set("service", slug)
    window.history.pushState({}, "", `?${newParams.toString()}`)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Function to go back to services list
  const backToServices = () => {
    setSelectedService(null)

    // Update URL without full page reload
    const newParams = new URLSearchParams(searchParams)
    newParams.delete("service")
    window.history.pushState(
      {},
      "",
      window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : ""),
    )

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Function to clear filters
  const clearFilters = () => {
    setSelectedCategory("all")
  }

  // Filter services based on selected category
  const filteredServices = Object.entries(servicesData).filter(([slug, service]) => {
    const matchesCategory = selectedCategory === "all" || slug === selectedCategory
    return matchesCategory
  })

  // Service Icon Renderer for DETAIL PAGE (with white circle)
  const renderServiceIconForDetail = (service, size = "h-20 w-20") => {
    if (imageErrors[service.id]) {
      return <div className={`${size} flex items-center justify-center rounded-lg`}>{service.fallbackIcon}</div>
    }

    return (
      <div className={`${size} relative rounded-lg p-3 flex-shrink-0`}>
        <Image
          src={service.imageSrc || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 80px, 96px"
          onError={() => handleImageError(service.id)}
          quality={90}
          priority={false}
        />
      </div>
    )
  }

  // Service Icon Renderer for GRID/LIST PAGE (with light blue square)
  const renderServiceIconForGrid = (service, size = "h-20 w-20") => {
    if (imageErrors[service.id]) {
      return (
        <div className={`${size} flex items-center justify-center bg-[#e6f7fa] rounded-lg`}>{service.fallbackIcon}</div>
      )
    }

    return (
      <div className={`${size} relative bg-[#e6f7fa] rounded-lg p-3 flex-shrink-0`}>
        <Image
          src={service.imageSrc || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 64px, 80px"
          onError={() => handleImageError(service.id)}
          quality={90}
          priority={false}
        />
      </div>
    )
  }

  // If a service is selected, show its details
  if (selectedService) {
    return (
      <div className="min-h-screen bg-white" dir={direction}>
        {/* Hero Section */}
        <div className="bg-[#0088a9] text-white py-16">
          <div className="container mx-auto px-4">
            <div className={`flex items-center mb-6 ${isRTL ? "flex-row gap-3" : ""}`} data-aos="zoom-in">
              <button
                onClick={backToServices}
                className={`bg-white text-[#0088a9] p-2 rounded-full ${isRTL ? "ml-4" : "mr-4"} hover:bg-gray-100 transition-colors flex-shrink-0`}
              >
                <ArrowLeftIcon className="h-5 w-5" style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
              </button>
              <h1 className="text-3xl md:text-4xl font-bold">{selectedService.title}</h1>
            </div>
            <p className={`max-w-2xl ${isRTL ? "text-right " : ""}`} data-aos="zoom-in">
              {selectedService.shortDescription}
            </p>
          </div>
        </div>

        {/* Service Detail Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="zoom-in">
            <div className="p-4 md:p-8">
              <div className={`flex flex-col md:flex-row gap-8 ${isRTL ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-2/3" data-aos="zoom-in">
                  <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${isRTL ? "text-right" : ""}`}>
                    {translations?.services?.serviceDescription || "სერვისის აღწერა"}
                  </h2>
                  <p className={`text-gray-700 mb-8 leading-relaxed ${isRTL ? "text-right" : ""}`}>
                    {selectedService.fullDescription}
                  </p>

                  <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${isRTL ? "text-right" : ""}`}>
                    {translations?.services?.procedures || "პროცედურები"}
                  </h2>
                  <ul className={`${isRTL ? "pr-5 text-right" : "pl-5"} list-disc mb-8 space-y-3`}>
                    {selectedService.procedures.map((procedure, index) => (
                      <li key={index} className="text-gray-700" data-aos="zoom-in" data-aos-delay={index * 100}>
                        {procedure}
                      </li>
                    ))}
                  </ul>

                  <div className={isRTL ? "text-right" : ""} data-aos="zoom-in">
                    <Link
                      href="/pages/booking"
                      className="inline-block bg-[#0088a9] text-white px-6 py-3 rounded-md hover:bg-[#006680] transition-colors"
                    >
                      {translations?.buttons?.bookConsultation || "დაჯავშნე კონსულტაცია"}
                    </Link>
                  </div>
                </div>

                <div className="md:w-1/3 bg-[#e6f7fa] p-6 rounded-lg" data-aos="zoom-in">
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                      <div className="text-[#0088a9]">{renderServiceIconForDetail(selectedService, "h-18 w-18")}</div>
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold text-gray-800 mb-4 text-center`}>
                    {translations?.services?.whyChooseUs || "რატომ JC Dental?"}
                  </h3>
                  <ul className="space-y-3">
                    <li
                      className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    >
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {translations?.services?.benefits?.modernEquipment || "თანამედროვე აღჭურვილობა და ტექნოლოგიები"}
                      </span>
                    </li>
                    <li
                      className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {translations?.services?.benefits?.experiencedDoctors || "გამოცდილი და მზრუნველი სტომატოლოგები"}
                      </span>
                    </li>
                    <li
                      className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    >
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {translations?.services?.benefits?.comfortableEnvironment || "კომფორტული და მშვიდი გარემო"}
                      </span>
                    </li>
                    <li
                      className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                      data-aos="zoom-in"
                      data-aos-delay="400"
                    >
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {translations?.services?.benefits?.individualTreatment || "ინდივიდუალური მკურნალობის გეგმა"}
                      </span>
                    </li>
                    <li
                      className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}
                      data-aos="zoom-in"
                      data-aos-delay="500"
                    >
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">
                        {translations?.services?.benefits?.flexibleSchedule ||
                          "მოქნილი განრიგი და გადაუდებელი დახმარება"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="mt-16">
            <h2 className={`text-2xl font-bold text-gray-800 mb-8 ${isRTL ? "text-right" : ""}`} data-aos="zoom-in">
              {translations?.services?.otherServices || "სხვა სერვისები"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(servicesData)
                .filter(([slug, service]) => service.id !== selectedService.id)
                .slice(0, 3)
                .map(([slug, service], index) => (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => showServiceDetails(slug)}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <div className="p-6 border-b border-gray-100">
                      <div className={`flex items-center ${isHebrew ? "flex-row" : ""}`}>
                        <div className={`${isHebrew ? "ml-4" : "mr-4"}`}>
                          {renderServiceIconForGrid(service, "h-20 w-20")}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className={`text-gray-700 mb-6 ${isHebrew ? "text-right" : ""}`}>{service.shortDescription}</p>

                      <div className={isHebrew ? "text-right" : ""}>
                        <button className="inline-flex items-center text-[#0088a9] font-medium hover:text-[#006680] transition-colors">
                          {isHebrew ? (
                            <>{translations?.buttons?.viewDetails || "צפה בפרטים"} ←</>
                          ) : (
                            <>{translations?.buttons?.viewDetails || "დეტალურად ნახვა"} →</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Otherwise, show the services list
  return (
    <div className="min-h-screen bg-white" dir={direction}>
      {/* Hero Section */}
      <div className="bg-[#0088a9] text-white py-16">
        <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {translations?.services?.pageTitle || "JC Dental - ჩვენი სერვისები"}
          </h1>
          <p className="max-w-2xl mx-auto">
            {translations?.services?.pageDescription ||
              "გაეცანით ჩვენს მაღალი ხარისხის სტომატოლოგიურ მომსახურებას, რომელიც მორგებულია თქვენს საჭიროებებზე"}
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.querySelector(".services-grid")?.offsetTop - 100 || 0,
                  behavior: "smooth",
                })
              }
              className="px-6 py-3 bg-white text-[#0088a9] rounded-full font-medium shadow-lg hover:bg-sky-50 transition-colors"
            >
              {translations?.services?.allServices || "ყველა სერვისი"}
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className={`flex flex-wrap gap-4 mb-8 ${isRTL ? "flex-row-reverse" : ""}`} data-aos="zoom-in">
          <div className="w-full md:w-64">
            <select
              className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white"
              value={selectedCategory}
              onChange={handleCategoryChange}
              dir={direction}
            >
              <option value="all">{translations?.services?.allServices || "ყველა სერვისი"}</option>
              <option value="therapy">{translations?.services?.therapy?.title || "თერაპია"}</option>
              <option value="orthopedics">{translations?.services?.orthopedics?.title || "ორთოპედია"}</option>
              <option value="implantology">{translations?.services?.implantology?.title || "იმპლანტოლოგია"}</option>
              <option value="orthodontics">{translations?.services?.orthodontics?.title || "ორთოდონტია"}</option>
              <option value="periodontology">
                {translations?.services?.periodontology?.title || "პაროდონტოლოგია"}
              </option>
              <option value="pediatric-dentistry">
                {translations?.services?.pediatricDentistry?.title || "ბავშვთა სტომატოლოგია"}
              </option>
            </select>
          </div>

          <button
            className={`${isRTL ? "mr-auto" : "ml-auto"} cursor-pointer px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-gray-800`}
            onClick={clearFilters}
          >
            {translations?.buttons?.clear || "გასუფთავება"}
          </button>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 services-grid">
            {filteredServices.map(([slug, service], index) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => showServiceDetails(slug)}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {/* Service Card Header */}
                <div className="p-6 border-b border-gray-100">
                  {isHebrew ? (
                    // ებრაული ენისთვის - აიკონი მარჯვნივ
                    <div className="flex flex-row items-center">
                      <div className="mr-0 ml-4">{renderServiceIconForGrid(service, "h-20 w-20")}</div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                  ) : (
                    // სხვა ენებისთვის - აიკონი მარცხნივ
                    <div className="flex items-center">
                      <div className="mr-4 ml-0">{renderServiceIconForGrid(service, "h-20 w-20")}</div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                  )}
                </div>

                {/* Service Description */}
                <div className="p-6">
                  <p className={`text-gray-700 mb-6 ${isHebrew ? "text-right" : ""}`}>{service.shortDescription}</p>

                  <div className={isHebrew ? "text-right" : ""}>
                    <button className="inline-flex items-center text-[#0088a9] font-medium hover:text-[#006680] transition-colors">
                      {isHebrew ? (
                        <>{translations?.buttons?.viewDetails || "צפה בפרטים"} ←</>
                      ) : (
                        <>{translations?.buttons?.viewDetails || "დეტალურად ნახვა"} →</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-aos="zoom-in">
            <p className="text-gray-700 mb-4">
              {translations?.services?.noResultsMessage || "სამწუხაროდ, თქვენი ძიების შედეგად სერვისები ვერ მოიძებნა."}
            </p>
            <p className="text-gray-700">
              {translations?.services?.tryAgainMessage ||
                "გთხოვთ, შეცვალოთ ძიების პარამეტრები ან გაასუფთავოთ ფილტრები."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
