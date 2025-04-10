"use client"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedNavigation } from "@/hooks/useLocalizedNavigation"
import logo from './../../Assets/logo.png';
export default function Footer() {
  const { translations, direction, currentLanguage } = useLanguage()
  const localizedNavigation = useLocalizedNavigation()
  const isRTL = direction === "rtl"

  // ფუტერის ნავიგაციის ელემენტები - მხოლოდ მთავარი ლინკები
  const footerNavItems = localizedNavigation.filter((item) =>
    ["მთავარი", "სერვისები", "ექიმები", "კონტაქტი"].includes(item.originalName),
  )

  return (
    <footer className="bg-gray-900 rounded-lg shadow-sm dark:bg-gray-900" dir={direction}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* მთავარი wrapper div */}
        <div
          className={`flex flex-col items-center sm:flex-row sm:justify-between text-center ${isRTL ? "sm:flex-row-reverse" : ""}`}
        >
          <Link
            href="/"
            className={`flex items-center mb-4 sm:mb-0 ${isRTL ? "flex gap-3 flex-row-reverse justify-between space-x-reverse space-x-3" : "space-x-3"}`}
          >
            <div className={isRTL ? "ml-3" : "mr-3"}>
              <Image src={logo} alt="JC Dental" width={80} height={80} />
            </div>
            <span className="text-white text-3xl font-semibold whitespace-nowrap dark:text-white">JC Dental</span>
          </Link>
          <ul
            className={`flex flex-wrap justify-center sm:justify-start text-sm font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "sm:justify-end" : ""}`}
          >
            {footerNavItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link href={item.url} className={`text-white hover:underline mx-4 ${isRTL ? "" : "tracking-[4px]"}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />

        {/* ქვედა ნაწილი - ცენტრში ტელეფონებზე */}
        <div
          className={`flex flex-col items-center text-center sm:flex-row sm:justify-between ${isRTL ? "sm:flex-row-reverse" : ""}`}
        >
          <span className="text-gray-500 text-sm dark:text-gray-400">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              JC Dental
            </Link>
            . {translations?.footer?.rights || "ყველა უფლება დაცულია"}
          </span>
          <ul className={`flex ${isRTL ? "space-x-reverse" : ""} space-x-6 mt-4 sm:mt-0`}>
            {/* Facebook */}
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61573996716691"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-gray-300 hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            {/* Instagram */}
            <li>
              <a
                href="https://www.instagram.com/j_c_dental/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-gray-300 hover:fill-white w-7 h-7"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.975.975 1.26 2.242 1.322 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.347 2.633-1.322 3.608-.975.975-2.242 1.26-3.608 1.322-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.975-.975-1.26-2.242-1.322-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.347-2.633 1.322-3.608.975-.975 2.242-1.26 3.608-1.322C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.013 7.052.07 5.72.129 4.5.392 3.348 1.347 2.196 2.302 1.433 3.523 1.07 4.848.713 6.18.675 6.74.675 12s.038 5.82.395 7.152c.363 1.325 1.126 2.546 2.278 3.501 1.152.955 2.372 1.218 3.704 1.277 1.28.058 1.688.07 4.948.07s3.668-.012 4.948-.07c1.332-.059 2.552-.322 3.704-1.277 1.152-.955 1.915-2.176 2.278-3.501.357-1.332.395-1.892.395-7.152s-.038-5.82-.395-7.152c-.363-1.325-1.126-2.546-2.278-3.501C19.5.392 18.28.129 16.948.07 15.668.013 15.26 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zM18.406 4.594a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
