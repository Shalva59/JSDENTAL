"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "../../../../context/LanguageContext"

const VerificationSuccessPage = () => {
  const { direction, translations } = useLanguage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8" dir={direction}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">Email Verified!</h1>
        </div>
        <div className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your Email Has Been Verified</h2>
          <p className="text-gray-600 mb-6">Thank you for verifying your email address. You can now log in to your account.</p>
          <Link
            href="/pages/authorization/log_in"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerificationSuccessPage