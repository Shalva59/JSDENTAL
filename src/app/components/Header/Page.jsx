"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "../../js/navigation" // სწორი ბილიკი
import logo from "../../Assets/logo.png" // სწორი ბილიკი

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 100px
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`bg-white dark:bg-gray-900 w-full z-30 border-b border-gray-200 dark:border-gray-600 transition-all duration-300 ${
        isScrolled ? "fixed top-0 start-0 animate-slideDown shadow-md" : "relative"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo || "/placeholder.svg"} alt="jc dental" width={50} height={40} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">JC Dental</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {products.map((item, index) => (
              <li key={index} className="content-center">
                <Link
                  href={item.url}
                  className="block font-medium tracking-[1.2px] py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Smile Creator */}
            <li className="ml-4 content-center">
              <span className="font-bold tracking-[1.2px] text-gray-900 dark:text-white">Smile Creator</span>
              <p className="text-gray-500 tracking-[1.2px] dark:text-gray-300 text-[12.5px] text-right animate-blink text-red-700">
                Coming Soon
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

