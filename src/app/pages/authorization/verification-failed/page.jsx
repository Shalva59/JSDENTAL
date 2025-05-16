"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"
import { useLanguage } from "../../../../context/LanguageContext"

const VerificationFailedPage = () => {
  const { direction, translations } = useLanguage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8" dir={direction}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-white">Verification Failed</h1>
        </div>
        <div className="p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Unable to Verify Email</h2>
          <p className="text-gray-600 mb-6">The verification link is invalid or has expired. Please try again or contact support.</p>
          <Link
            href="/pages/authorization/log_in"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 mr-3"
          >
            Log In
          </Link>
          <Link
            href="/pages/contact"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerificationFailedPage