"use client"

import React, { useState, useEffect } from "react"

// SVG Icons for dental services
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

const DrillIcon = (props) => (
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
    <path d="m14 7 4-4 2 2-4 4" />
    <path d="m17 10 2-2" />
    <path d="m14 14 2 2" />
    <path d="m13 18 4 4" />
    <path d="m13 18-2-2" />
    <path d="m10 7 4 4" />
    <path d="M6 11a5 5 0 0 0 8 0" />
  </svg>
)

const ImplantIcon = (props) => (
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
    <path d="M12 4v16" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
    <path d="M8 9h8" />
    <path d="M8 13h8" />
  </svg>
)

const BraceIcon = (props) => (
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
    <path d="M7 21h-4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h4" />
    <path d="M17 21h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4" />
    <path d="M12 21a9 9 0 0 0 0-18" />
    <path d="M7 15a9 9 0 0 1 9-9" />
  </svg>
)

const GumIcon = (props) => (
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
    <path d="M17 10c.7-.7 1.7-2 1.7-3.3.1-2.3-1.7-4-3.7-4-1.4 0-2.8.8-3.5 2" />
    <path d="M9 6.8C8.3 5.6 6.9 4.8 5.5 4.8c-2 0-3.8 1.7-3.7 4 .1 1.3 1 2.6 1.7 3.3" />
    <path d="M8 20c-1 0-3.1-.8-3.8-2.6-.8-1.8 0-3.3 0-3.3.4-.8 1.4-1.4 2.2-1.5.4 0 .8.1 1.1.2" />
    <path d="M16 20c1 0 3.1-.8 3.8-2.6.8-1.8 0-3.3 0-3.3-.4-.8-1.4-1.4-2.2-1.5-.4 0-.8.1-1.1.2" />
    <path d="M12 20c1 0 2-.8 2-2v-2c0-1-.7-1.8-1.5-1.8S11 15 11 16v2c0 1.2 1 2 2 2Z" />
  </svg>
)

const ChildToothIcon = (props) => (
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
    <path d="M12 2a7 7 0 0 0-7 7c0 2.1 0 4.7 2 6.5 1.6 1.5 3 3.5 3 6.5h4c0-3 1.4-5 3-6.5 2-1.8 2-4.4 2-6.5a7 7 0 0 0-7-7Z" />
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

// Services data with full details
const servicesData = {
  therapy: {
    id: 1,
    title: "თერაპია",
    slug: "therapy",
    shortDescription: "კბილების და პირის ღრუს არასქირურგიული მკურნალობა",
    fullDescription:
      "თერაპია მოიცავს კბილების და პირის ღრუს არასქირურგიულ მკურნალობას. ის ფოკუსირებულია კბილების, ლორწოვანის და პირის ღრუს ქსოვილების კონსერვატიულ აღდგენაზე. ჩვენი კლინიკა გთავაზობთ თანამედროვე მეთოდებს და მასალებს, რომლებიც უზრუნველყოფს მაღალი ხარისხის მკურნალობას და ხანგრძლივ შედეგს.",
    procedures: [
      "კბილის დაბჟენა",
      "კარიესის მკურნალობა",
      "ენდოდონტიური მკურნალობა (არხების მკურნალობა)",
      "კბილების პროფესიული წმენდა",
      "ფტორირება",
    ],
    icon: <DrillIcon className="h-16 w-16" />,
  },
  orthopedics: {
    id: 2,
    title: "ორთოპედია",
    slug: "orthopedics",
    shortDescription: "კბილების და ყბა-სახის აპარატის ფუნქციური და ესთეტიკური აღდგენა",
    fullDescription:
      "ორთოპედია ფოკუსირებულია კბილების და ყბა-სახის აპარატის ფუნქციური და ესთეტიკური აღდგენაზე. ეს სფერო მოიცავს დაზიანებული, დაკარგული ან დეფორმირებული კბილების პროთეზირებას და აღდგენას. ჩვენი კლინიკა იყენებს უმაღლესი ხარისხის მასალებს და თანამედროვე ტექნოლოგიებს, რათა უზრუნველყოს ბუნებრივი გარეგნობა და მაქსიმალური კომფორტი.",
    procedures: ["კბილის გვირგვინები", "ვინირები", "ხიდები", "მოსახსნელი პროთეზები", "ინლეი და ონლეი"],
    icon: <ToothIcon className="h-16 w-16" />,
  },
  implantology: {
    id: 3,
    title: "იმპლანტოლოგია",
    slug: "implantology",
    shortDescription: "დაკარგული კბილების აღდგენა იმპლანტებით",
    fullDescription:
      "იმპლანტოლოგია არის სტომატოლოგიის დარგი, რომელიც სპეციალიზირებულია დაკარგული კბილების აღდგენაზე იმპლანტების საშუალებით. იმპლანტები წარმოადგენენ ტიტანის ხრახნებს, რომლებიც ჩაინერგება ძვალში და ასრულებს ფესვის ფუნქციას. ჩვენი კლინიკა გთავაზობთ მსოფლიოში აღიარებული ბრენდების იმპლანტებს და გამოცდილ სპეციალისტებს.",
    procedures: [
      "ერთეული იმპლანტები",
      "მრავლობითი იმპლანტები",
      "All-on-4 და All-on-6 სისტემები",
      "ძვლის აუგმენტაცია",
      "სინუს ლიფტინგი",
    ],
    icon: <ImplantIcon className="h-16 w-16" />,
  },
  orthodontics: {
    id: 4,
    title: "ორთოდონტია",
    slug: "orthodontics",
    shortDescription: "კბილების ლამაზად დაწყობის კორექცია",
    fullDescription:
      "ორთოდონტია ფოკუსირებულია კბილების არასწორი განლაგების, თანკბილვის პრობლემების და ყბის არასწორი განვითარების გამოსწორებაზე. ჩვენი კლინიკა გთავაზობთ ორთოდონტიული მკურნალობის სხვადასხვა მეთოდებს, როგორიცაა ტრადიციული ბრეკეტები, გამჭვირვალე კაპები და სხვა თანამედროვე სისტემები.",
    procedures: [
      "მეტალის ბრეკეტები",
      "კერამიკული ბრეკეტები",
      "გამჭვირვალე კაპები (Invisalign)",
      "ლინგვალური ბრეკეტები",
      "რეტეინერები",
    ],
    icon: <BraceIcon className="h-16 w-16" />,
  },
  periodontology: {
    id: 5,
    title: "პაროდონტოლოგია",
    slug: "periodontology",
    shortDescription: "ღრძილების და პაროდონტის ქსოვილების მკურნალობა",
    fullDescription:
      "პაროდონტოლოგია არის სტომატოლოგიის დარგი, რომელიც ფოკუსირებულია ღრძილების, პაროდონტის ქსოვილების (კბილის ირგვლივ მდებარე რბილი და მაგარი ქსოვილები) და ალვეოლური ძვლის დაავადებების მკურნალობაზე. ჩვენი კლინიკა გთავაზობთ პაროდონტოლოგიური დაავადებების პრევენციას, დიაგნოსტიკას და მკურნალობას.",
    procedures: [
      "ღრძილების პროფესიული წმენდა",
      "ღრმა კიურეტაჟი",
      "ღრძილების პლასტიკა",
      "ღრძილების რეცესიის მკურნალობა",
      "პაროდონტიტის მკურნალობა",
    ],
    icon: <GumIcon className="h-16 w-16" />,
  },
  "pediatric-dentistry": {
    id: 6,
    title: "ბავშვთა სტომატოლოგია",
    slug: "pediatric-dentistry",
    shortDescription: "ბავშვებისთვის განკუთვნილი მკურნალობა",
    fullDescription:
      "ბავშვთა სტომატოლოგია მოიცავს პროფილაქტიკურ ზომებს, კბილების მკურნალობას და ბავშვებში ჯანსაღი პირის ღრუს ჩვევების ჩამოყალიბებას. ჩვენი კლინიკა გთავაზობთ მეგობრულ და კომფორტულ გარემოს ბავშვებისთვის, სადაც ისინი მიიღებენ მაღალი ხარისხის სტომატოლოგიურ მომსახურებას.",
    procedures: [
      "პროფილაქტიკური შემოწმება",
      "კბილების დაბჟენა",
      "ფტორირება",
      "ჰერმეტიზაცია",
      "სარძევე კბილების მკურნალობა",
    ],
    icon: <ChildToothIcon className="h-16 w-16" />,
  },
}

// Main Services Page Component
export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null)
  const [searchParams, setSearchParams] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Check if there's a service slug in the URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const serviceSlug = params.get("service")
    if (serviceSlug && servicesData[serviceSlug]) {
      setSelectedService(servicesData[serviceSlug])
    }
    setSearchParams(params)
  }, [])

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

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // Function to clear filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  // Filter services based on search query and selected category
  const filteredServices = Object.entries(servicesData).filter(([slug, service]) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || slug === selectedCategory

    return matchesSearch && matchesCategory
  })

  // If a service is selected, show its details
  if (selectedService) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-[#0088a9] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <button
                onClick={backToServices}
                className="bg-white text-[#0088a9] p-2 rounded-full mr-4 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <h1 className="text-3xl md:text-4xl font-bold">{selectedService.title}</h1>
            </div>
            <p className="max-w-2xl">{selectedService.shortDescription}</p>
          </div>
        </div>

        {/* Service Detail Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">სერვისის აღწერა</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">{selectedService.fullDescription}</p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">პროცედურები</h2>
                  <ul className="list-disc pl-5 mb-8 space-y-3">
                    {selectedService.procedures.map((procedure, index) => (
                      <li key={index} className="text-gray-600">
                        {procedure}
                      </li>
                    ))}
                  </ul>

                  <button className="bg-[#0088a9] text-white px-6 py-3 rounded-md hover:bg-[#006680] transition-colors">
                    დაჯავშნე კონსულტაცია
                  </button>
                </div>

                <div className="md:w-1/3 bg-[#e6f7fa] p-6 rounded-lg">
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-4 rounded-full">
                      <div className="text-[#0088a9]">
                        {React.cloneElement(selectedService.icon, { className: "h-16 w-16" })}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">რატომ JC Dental?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">თანამედროვე აღჭურვილობა და ტექნოლოგიები</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">გამოცდილი და მზრუნველი სტომატოლოგები</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">კომფორტული და მშვიდი გარემო</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">ინდივიდუალური მკურნალობის გეგმები</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-[#0088a9] rounded-full p-1 mt-0.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">მოქნილი განრიგი და გადაუდებელი დახმარება</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">სხვა სერვისები</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(servicesData)
                .filter(([slug, service]) => service.id !== selectedService.id)
                .slice(0, 3)
                .map(([slug, service]) => (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => showServiceDetails(slug)}
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center">
                      <div className="bg-[#e6f7fa] p-2 rounded-lg mr-3">
                        <div className="text-[#0088a9]">
                          {React.cloneElement(service.icon, { className: "h-8 w-8" })}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-600 mb-4 text-sm">{service.shortDescription}</p>

                      <span className="inline-flex items-center text-[#0088a9] font-medium hover:text-[#006680] transition-colors text-sm">
                        დეტალურად ნახვა →
                      </span>
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#0088a9] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">JC Dental - ჩვენი სერვისები</h1>
          <p className="max-w-2xl mx-auto">
            გაეცანით ჩვენს მაღალი ხარისხის სტომატოლოგიურ მომსახურებას, რომელიც მორგებულია თქვენს საჭიროებებზე
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="მოძებნეთ სერვისი"
                className="w-full py-3 px-4 pl-12 rounded-full bg-[#0079a9] text-white placeholder-gray-300 border border-[#0099c9] focus:outline-none focus:ring-2 focus:ring-white"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">
            {filteredServices.length > 0 ? `ნაპოვნია ${filteredServices.length} სერვისი` : "სერვისები ვერ მოიძებნა"}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="w-full md:w-64">
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">ყველა სერვისი</option>
                <option value="therapy">თერაპია</option>
                <option value="orthopedics">ორთოპედია</option>
                <option value="implantology">იმპლანტოლოგია</option>
                <option value="orthodontics">ორთოდონტია</option>
                <option value="periodontology">პაროდონტოლოგია</option>
                <option value="pediatric-dentistry">ბავშვთა სტომატოლოგია</option>
              </select>
            </div>

            <button
              className="ml-auto px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              onClick={clearFilters}
            >
              გასუფთავება
            </button>
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(([slug, service]) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => showServiceDetails(slug)}
              >
                <div className="p-6 border-b border-gray-100 flex items-center">
                  <div className="bg-[#e6f7fa] p-3 rounded-lg mr-4">
                    <div className="text-[#0088a9]">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{service.shortDescription}</p>

                  <button className="inline-flex items-center text-[#0088a9] font-medium hover:text-[#006680] transition-colors">
                    დეტალურად ნახვა →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">სამწუხაროდ, თქვენი ძიების შედეგად სერვისები ვერ მოიძებნა.</p>
            <p className="text-gray-600">გთხოვთ, შეცვალოთ ძიების პარამეტრები ან გაასუფთავოთ ფილტრები.</p>
          </div>
        )}
      </div>
    </div>
  )
}

