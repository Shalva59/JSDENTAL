"use client"

import { useState } from "react"
import { useLanguage } from "../../../../context/LanguageContext"
import { Eye, EyeOff, CheckCircle, User, Mail, Phone, Lock } from "lucide-react"
import Link from "next/link"

const RegistrationPage = () => {
  const { currentLanguage, direction, translations } = useLanguage()

  // Get registration translations from the main translations object
  const t = translations?.registration || {}

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    // Skip phone field as it has its own handler
    if (name === "phone") return

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
    if (!formData.firstName) newErrors.firstName = t.required
    if (!formData.lastName) newErrors.lastName = t.required
    if (!formData.email) newErrors.email = t.required
    if (!formData.phone) newErrors.phone = t.required
    if (!formData.password) newErrors.password = t.required
    if (!formData.confirmPassword) newErrors.confirmPassword = t.required
    if (!formData.agreeToTerms) newErrors.agreeToTerms = t.termsRequired

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid
    }

    // Validate phone format (simple validation)
    if (formData.phone && !/^\+?[0-9\s-]{9,}$/.test(formData.phone)) {
      newErrors.phone = t.phoneInvalid
    }

    // Validate password length
    if (formData.password && formData.password.length < 8) {
      newErrors.password = t.passwordRequirements
    }

    // Validate password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMatch
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
        setRegistrationSuccess(true)

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        })
      } catch (error) {
        console.error("Registration error:", error)
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
      <div className="max-w-4xl w-full flex flex-col md:flex-row overflow-hidden bg-white rounded-2xl shadow-xl">
        {/* Left side - Image and branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-white text-3xl font-bold">JC Dental</h2>
              <p className="text-blue-100 mt-2">{t.subtitle}</p>
            </div>

            <div className="hidden md:block">
              <h3 className="text-white text-xl font-semibold mb-4">{t.benefits}</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-200" />
                  <span>{t.benefit1}</span>
                </li>
                <li className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-200" />
                  <span>{t.benefit2}</span>
                </li>
                <li className="flex items-center text-blue-100">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-200" />
                  <span>{t.benefit3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute top-0 -left-16 w-48 h-48 bg-cyan-300 rounded-full opacity-20"></div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-7/12 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          </div>

          {registrationSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg mb-6 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium mb-2">{t.successTitle}</h3>
              <p>{t.registrationSuccess}</p>
              <Link
                href="/pages/authorization/log_in"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                {t.login}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.firstName}
                  </label>
                  <div className={`relative rounded-md shadow-sm ${errors.firstName ? "ring-1 ring-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 ${focusedField === "firstName" ? "text-blue-500" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.firstName
                          ? "border-red-300"
                          : focusedField === "firstName"
                            ? "border-blue-500"
                            : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.lastName}
                  </label>
                  <div className={`relative rounded-md shadow-sm ${errors.lastName ? "ring-1 ring-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-5 w-5 ${focusedField === "lastName" ? "text-blue-500" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.lastName
                          ? "border-red-300"
                          : focusedField === "lastName"
                            ? "border-blue-500"
                            : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
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
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phone}
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.phone ? "ring-1 ring-red-500" : ""}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className={`h-5 w-5 ${focusedField === "phone" ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+\-\s]*"
                    value={formData.phone}
                    onChange={(e) => {
                      // Only allow numbers, +, -, and spaces
                      const value = e.target.value.replace(/[^\d+\-\s]/g, "")
                      setFormData({
                        ...formData,
                        phone: value,
                      })

                      // Clear error when user types
                      if (errors.phone) {
                        setErrors({
                          ...errors,
                          phone: "",
                        })
                      }
                    }}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-3 py-2.5 border text-left ${
                      errors.phone ? "border-red-300" : focusedField === "phone" ? "border-blue-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      direction === "rtl" ? "text-right" : "text-left"
                    }`}
                    dir="ltr" // Always keep phone number LTR for proper display
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword}
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.confirmPassword ? "ring-1 ring-red-500" : ""}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 ${focusedField === "confirmPassword" ? "text-blue-500" : "text-gray-400"}`}
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : focusedField === "confirmPassword"
                          ? "border-blue-500"
                          : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.hidePassword} />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.showPassword} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className={`text-sm ${direction === "rtl" ? "mr-3" : "ml-3"}`}>
                  <label
                    htmlFor="agreeToTerms"
                    className={`font-medium ${errors.agreeToTerms ? "text-red-600" : "text-gray-700"}`}
                  >
                    {t.termsAndConditions}
                  </label>
                </div>
              </div>
              {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}

              {/* Submit Button */}
              <div>
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
                      {t.registering}
                    </div>
                  ) : (
                    t.register
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">{t.alreadyHaveAccount} </span>
                <Link
                  href="/pages/authorization/log_in"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  {t.login}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
