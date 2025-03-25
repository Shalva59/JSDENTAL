"use client"

import { useState } from "react"

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

// Services data
const services = [
  {
    id: 1,
    title: "თერაპია",
    description:
      "თერაპია მოიცავს კბილების და პირის ღრუს არასქირურგიულ მკურნალობას. ის ფოკუსირებულია კბილების, ლორწოვანის და პირის ღრუს ქსოვილების კონსერვატიულ აღდგენაზე.",
    icon: <DrillIcon className="h-16 w-16" />,
    color: "teal",
  },
  {
    id: 2,
    title: "ორთოპედია",
    description:
      "ფოკუსირებულია კბილების და ყბა-სახის აპარატის ფუნქციური და ესთეტიკური აღდგენაზე. ეს სფერო მოიცავს დაზიანებული, დაკარგული ან დეფორმირებული კბილების პროთეზირებას და აღდგენას.",
    icon: <ToothIcon className="h-16 w-16" />,
    color: "cyan",
  },
  {
    id: 3,
    title: "იმპლანტოლოგია",
    description: "დაკარგული კბილების აღდგენა იმპლანტებით",
    icon: <ImplantIcon className="h-16 w-16" />,
    color: "sky",
  },
  {
    id: 4,
    title: "ორთოდონტია",
    description: "კბილების ლამაზად დაწყობის კორექცია",
    icon: <BraceIcon className="h-16 w-16" />,
    color: "blue",
  },
  {
    id: 5,
    title: "პაროდონტოლოგია",
    description:
      "ღრძილების, პაროდონტის ქსოვილების (კბილის ირგვლივ მდებარე რბილი და მაგარი ქსოვილები) და ალვეოლური ძვლის დაავადებების მკურნალობა",
    icon: <GumIcon className="h-16 w-16" />,
    color: "emerald",
  },
  {
    id: 6,
    title: "ბავშვთა სტომატოლოგია",
    description: "ბავშვებისთვის განკუთვნილი მკურნალობა",
    icon: <ChildToothIcon className="h-16 w-16" />,
    color: "green",
  },
]

// Color mapping
const colorMap = {
  teal: {
    bg: "bg-teal-500",
    bgLight: "bg-teal-100",
    text: "text-teal-500",
    border: "border-teal-500",
    hover: "hover:bg-teal-600",
    shadow: "shadow-teal-200",
  },
  cyan: {
    bg: "bg-cyan-500",
    bgLight: "bg-cyan-100",
    text: "text-cyan-500",
    border: "border-cyan-500",
    hover: "hover:bg-cyan-600",
    shadow: "shadow-cyan-200",
  },
  sky: {
    bg: "bg-sky-500",
    bgLight: "bg-sky-100",
    text: "text-sky-500",
    border: "border-sky-500",
    hover: "hover:bg-sky-600",
    shadow: "shadow-sky-200",
  },
  blue: {
    bg: "bg-blue-500",
    bgLight: "bg-blue-100",
    text: "text-blue-500",
    border: "border-blue-500",
    hover: "hover:bg-blue-600",
    shadow: "shadow-blue-200",
  },
  emerald: {
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-100",
    text: "text-emerald-500",
    border: "border-emerald-500",
    hover: "hover:bg-emerald-600",
    shadow: "shadow-emerald-200",
  },
  green: {
    bg: "bg-green-500",
    bgLight: "bg-green-100",
    text: "text-green-500",
    border: "border-green-500",
    hover: "hover:bg-green-600",
    shadow: "shadow-green-200",
  },
}

// Service Card Component
const ServiceCard = ({ service, isActive, onClick }) => {
  const colors = colorMap[service.color]

  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out 
        ${isActive ? "shadow-xl scale-105" : "shadow-md hover:shadow-lg hover:scale-102"} 
        ${colors.shadow} cursor-pointer`}
      onClick={() => onClick(service.id)}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.bg}`}></div>

      <div className="p-6">
        <div className={`w-20 h-20 mx-auto rounded-full ${colors.bgLight} flex items-center justify-center mb-4`}>
          <div className={colors.text}>{service.icon}</div>
        </div>

        <h3 className={`text-xl font-bold text-center mb-3 ${colors.text}`}>{service.title}</h3>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden 
          ${isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-gray-600 text-center mb-4">{service.description}</p>

          <div className="text-center">
            <a href="#" className={`inline-flex items-center ${colors.text} font-medium hover:underline`}>
              ნახე მეტი →
            </a>
          </div>
        </div>

        {!isActive && (
          <div className="text-center mt-2">
            <span className={`inline-block ${colors.text} text-sm`}>დეტალებისთვის დააკლიკეთ</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Services Component
export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null)

  const handleCardClick = (id) => {
    setActiveService(activeService === id ? null : id)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">სერვისები</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ჩვენ გთავაზობთ მაღალი ხარისხის სტომატოლოგიურ მომსახურებას თანამედროვე ტექნოლოგიებით და გამოცდილი
            სპეციალისტებით.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

