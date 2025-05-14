"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../../../context/LanguageContext"
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const ResetPasswordPage = () => {
  const { currentLanguage, direction, translations } = useLanguage()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // Get reset password translations from the main translations object
  const t = translations?.resetPassword || {}

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetError, setResetError] = useState("")
  const [focusedField, setFocusedField] = useState(null)

  useEffect(() => {
    if (!token) {
      setResetError(t.invalidToken || "Invalid or expired token")
    }
  }, [token, t])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
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
    if (!formData.password) newErrors.password = t.required || "Password is required"
    if (!formData.confirmPassword) newErrors.confirmPassword = t.required || "Confirm Password is required"

    // Validate password length
    if (formData.password && formData.password.length < 8) {
      newErrors.password = t.passwordRequirements || "Password must be at least 8 characters"
    }

    // Validate password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMatch || "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      setResetError(t.invalidToken || "Invalid or expired token")
      return
    }

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to reset password")
        }

        // Show success message
        setResetSuccess(true)
      } catch (error) {
        console.error("Password reset error:", error)
        setResetError(error.message)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (!token && !resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8" dir={direction}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-white">{t.title || "Reset Password"}</h1>
          </div>
          <div className="p-8 text-center">
            <div className="text-red-600 mb-4">{t.invalidToken || "Invalid or expired token"}</div>
            <Link
              href="/pages/authorization/forgot-password"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {t.requestNewToken || "Request New Password Reset"}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8" dir={direction}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">{t.title || "Reset Password"}</h1>
          <p className="mt-2 text-blue-100">{t.subtitle || "Create a new password for your account"}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {resetSuccess ? (
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">{t.successTitle || "Password Reset Successful"}</h3>
              <p className="mt-2 text-sm text-gray-500">{t.successMessage || "Your password has been successfully reset."}</p>
              <div className="mt-6">
                <Link
                  href="/pages/authorization/log_in"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t.signIn || "Sign In"}
                </Link>
              </div>
            </div>
          ) : (
            <>
              {resetError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <p>{resetError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.newPassword || "New Password"}
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
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.hidePassword || "Hide password"} />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.showPassword || "Show password"} />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.confirmPassword || "Confirm Password"}
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
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.hidePassword || "Hide password"} />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-label={t.showPassword || "Show password"} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                        {t.resetting || "Resetting Password..."}
                      </div>
                    ) : (
                      t.resetPassword || "Reset Password"
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
                    {t.backToLogin || "Back to Login"}
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

export default ResetPasswordPage