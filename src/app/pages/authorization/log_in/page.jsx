"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../../../context/LanguageContext"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

const LoginPage = () => {
  const { currentLanguage, direction, translations } = useLanguage()

  // Get login translations from the main translations object
  const t = translations?.login || {}

  // AOS ინიციალიზაცია
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate required fields
    if (!formData.email) newErrors.email = t.required
    if (!formData.password) newErrors.password = t.required

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        setLoginSuccess(true)
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={direction}
    >
      <div
        className="max-w-4xl w-full flex flex-col md:flex-row overflow-hidden bg-white rounded-2xl shadow-xl"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        {/* Left side - Image and branding */}
        <div
          className="md:w-5/12 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 flex flex-col justify-between relative overflow-hidden"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="relative z-10">
            <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-white text-3xl font-bold">JC Dental</h2>
              <p className="text-blue-100 mt-2">{t.subtitle}</p>
            </div>

            <div className="hidden md:block" data-aos="fade-up" data-aos-delay="600">
              <h3 className="text-white text-xl font-semibold mb-4">{t.welcomeBack}</h3>
              <p className="text-blue-100 mb-6">{t.welcomeMessage}</p>

              <div
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <p className="text-white text-sm">{t.noAccount}</p>
                <Link
                  href="/pages/authorization/registration"
                  className="mt-2 inline-block text-white font-medium underline hover:text-blue-100"
                >
                  {t.createAccount}
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute top-0 -left-16 w-48 h-48 bg-cyan-300 rounded-full opacity-20"></div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-7/12 p-8" data-aos="fade-left" data-aos-delay="200">
          <div className="mb-6 text-center" data-aos="fade-up" data-aos-delay="400">
            <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          </div>

          {loginSuccess ? (
            <div
              className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg mb-6 text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">{t.successTitle}</h3>
              <p>{t.loginSuccess}</p>
              <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                {t.goToDashboard}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div data-aos="fade-up" data-aos-delay="500">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.email}
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.email ? "ring-1 ring-red-500" : ""}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${focusedField === "email" ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${
                      errors.email ? "border-red-300" : focusedField === "email" ? "border-blue-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder={t.emailPlaceholder}
                    style={{ direction: "ltr", textAlign: direction === "rtl" ? "right" : "left" }}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div data-aos="fade-up" data-aos-delay="600">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.password}
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.password ? "ring-1 ring-red-500" : ""}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${focusedField === "password" ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.password
                        ? "border-red-300"
                        : focusedField === "password"
                          ? "border-blue-500"
                          : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder={t.passwordPlaceholder}
                    style={{ direction: "ltr", textAlign: direction === "rtl" ? "right" : "left" }}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.hidePassword} />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.showPassword} />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between" data-aos="fade-up" data-aos-delay="700">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className={`block text-sm text-gray-700 ${direction === "rtl" ? "mr-3" : "ml-2"}`}
                  >
                    {t.rememberMe}
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/pages/authorization/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {t.forgotPassword}
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div data-aos="fade-up" data-aos-delay="800">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out transform hover:scale-[1.01]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t.loggingIn}
                    </div>
                  ) : (
                    t.login
                  )}
                </button>
              </div>

              {/* Register Link (mobile only) */}
              <div className="text-center mt-4 md:hidden" data-aos="fade-up" data-aos-delay="900">
                <span className="text-sm text-gray-600">{t.noAccount} </span>
                <Link
                  href="/pages/authorization/registration"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  {t.createAccount}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
