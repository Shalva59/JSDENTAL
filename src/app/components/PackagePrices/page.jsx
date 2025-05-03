"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useLanguage } from "../../../context/LanguageContext"

export default function PackagesSection({ showAllLink = true, limit = 3, className = "" }) {
  const { currentLanguage, translations, direction } = useLanguage()
  const isRtl = direction === "rtl"

  // cn ფუნქცია პირდაპირ კომპონენტის ფაილში
  function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  // პაკეტების მონაცემები
  const packages = [
    {
      id: "basic",
      name: translations?.packages?.basic?.name || "საბაზისო",
      price: "50₾",
      description: translations?.packages?.basic?.description || "ძირითადი მომსახურება",
      features: translations?.packages?.basic?.features || [
        "2 პროფილაქტიკური ვიზიტი წელიწადში",
        "1 რენტგენის სურათი წელიწადში",
        "10% ფასდაკლება სხვა პროცედურებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: false,
    },
    {
      id: "full",
      name: translations?.packages?.full?.name || "სრული",
      price: "80₾",
      description: translations?.packages?.full?.description || "ოპტიმალური არჩევანი",
      features: translations?.packages?.full?.features || [
        "3 პროფილაქტიკური ვიზიტი წელიწადში",
        "2 სრული რენტგენის სურათი წელიწადში",
        "15% ფასდაკლება ესთეტიკურ პროცედურებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: true,
    },
    {
      id: "premium",
      name: translations?.packages?.premium?.name || "პრემიუმ",
      price: "120₾",
      description: translations?.packages?.premium?.description || "სრული მომსახურება",
      features: translations?.packages?.premium?.features || [
        "4 პროფილაქტიკური ვიზიტი წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "20% ფასდაკლება იმპლანტებზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: false,
    },
    {
      id: "family",
      name: translations?.packages?.family?.name || "ოჯახური",
      price: "200₾",
      description: translations?.packages?.family?.description || "ოჯახისთვის (4 წევრამდე)",
      features: translations?.packages?.family?.features || [
        "3 პროფილაქტიკური ვიზიტი წევრზე წელიწადში",
        "სრული რენტგენის სურათები საჭიროებისამებრ",
        "25% ფასდაკლება ყველა პროცედურაზე",
      ],
      color: "bg-blue-50",
      accentColor: "bg-blue-600",
      textColor: "text-blue-600",
      popular: false,
    },
  ]

  // Display only the limited number of packages on the main page
  const displayedPackages = packages.slice(0, limit)

  const MotionDiv = motion.div

  return (
    <section id="packages" className={cn("py-24 relative overflow-hidden", className)} dir={isRtl ? "rtl" : "ltr"}>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {translations?.packagesLabel || "პაკეტები"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              <span className="text-blue-600">{translations?.sectionTitle || "ჩვენი პაკეტები"}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {translations?.sectionSubtitle ||
                "აირჩიეთ თქვენზე მორგებული პაკეტი და ისარგებლეთ მაღალი ხარისხის სტომატოლოგიური მომსახურებით"}
            </p>
          </MotionDiv>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedPackages.map((pkg, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              whileHover={{ y: -8 }}
            >
              <div
                className={`h-full rounded-2xl ${pkg.color} border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-xl overflow-hidden`}
              >
                {pkg.popular && (
                  <div className={`absolute top-6 ${isRtl ? "left-6" : "right-6"}`}>
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {translations?.popularLabel || "პოპულარული"}
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <div
                    className={`w-12 h-12 rounded-xl mb-6 ${pkg.accentColor} flex items-center justify-center text-white`}
                  >
                    <span className="text-xl font-bold">{pkg.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="mb-8">
                    <span className={`text-4xl font-bold ${pkg.textColor}`}>{pkg.price}</span>
                    <span className="text-gray-600 mx-1">{translations?.perMonth || "/ თვეში"}</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-5 h-5 rounded-full ${pkg.accentColor} flex items-center justify-center text-white`}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                        <p className={`${isRtl ? "mr-3" : "ml-3"} text-gray-600`}>{feature}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className={`w-full ${pkg.accentColor} rounded-3xl hover:bg-opacity-90 text-white`}>
                      {translations?.choosePackage || "აირჩიე პაკეტი"}
                    </Button>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="text-center text-sm text-gray-500 hover:text-blue-600"
                    >
                      {translations?.viewDetails || "დეტალურად ნახვა"}
                    </Link>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {showAllLink && (
          <div className="text-center mt-12">
            <Link
              href="/pages/price_page"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
            >
              {translations?.viewAllPackages || "ნახეთ პაკეტების სრული აღწერა და შედარება"}
              <ArrowRight
                className={`${isRtl ? "mr-2 rotate-180" : "ml-2"} h-4 w-4 transition-transform group-hover:translate-x-1`}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
