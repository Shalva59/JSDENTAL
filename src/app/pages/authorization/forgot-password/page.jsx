"use client"

import { useState } from "react"
import { useLanguage } from "../../../../context/LanguageContext"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

const ForgotPasswordPage = () => {
  const { currentLanguage, direction, translations } = useLanguage()

  // Get forgot password translations from the main translations object
  const t = translations?.forgotPassword || {}

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetRequested, setResetRequested] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  const validateEmail = () => {
    if (!email) {
      setError(t.required)
      return false
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t.emailInvalid)
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateEmail()) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setResetRequested(true)
      } catch (error) {
        console.error("Password reset error:", error)
        setError(t.resetError)
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
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          <p className="mt-2 text-blue-100">{t.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {resetRequested ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{t.resetRequestedTitle}</h3>
              <p className="mt-2 text-sm text-gray-500">{t.resetRequestedMessage}</p>
              <p className="mt-1 text-sm text-gray-500">{t.checkSpam}</p>
              <div className="mt-6">
                <Link
                  href="/pages/authorization/log_in"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t.backToLogin}
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-6">{t.instructions}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.email}
                  </label>
                  <div className={`relative rounded-md shadow-sm ${error ? "ring-1 ring-red-500" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${focusedField === "email" ? "text-blue-500" : "text-gray-400"}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        error ? "border-red-300" : focusedField === "email" ? "border-blue-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

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
                        {t.sending}
                      </div>
                    ) : (
                      t.resetPassword
                    )}
                  </button>
                </div>

                {/* Back to Login */}
                <div className="flex items-center justify-center mt-4">
                  <Link
                    href="/pages/authorization/log_in"
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    {t.backToLogin}
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
