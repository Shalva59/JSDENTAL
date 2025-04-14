"use client"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { en } from "../../../languages/en"
import { ka } from "../../../languages/ka"
import { ru } from "../../../languages/ru"
import { he } from "../../../languages/he"

const ContactPage = () => {
  const { currentLanguage, direction } = useLanguage()

  // თანმიმდევრული ფერების სქემა
  const colors = {
    primary: "#0284c7", // ღია ლურჯი
    secondary: "#0ea5e9", // ცისფერი
    accent: "#38bdf8", // ღია ცისფერი
    light: "#e0f2fe", // ძალიან ღია ცისფერი
    dark: "#0c4a6e", // მუქი ლურჯი
    text: "#334155", // მუქი ნაცრისფერი ტექსტისთვის
  }

  // ყველა ენის თარგმანების ობიექტი
  const translations = { en, ka, ru, he }

  // მიმდინარე ენის თარგმანები
  const t = translations[currentLanguage] || translations.ka

  // RTL მიმართულების შემთხვევაში ხატულების მარჯინის ცვლილება
  const iconMargin = direction === "rtl" ? "ml-3" : "mr-3"

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }} dir={direction}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            {t.contact.title}
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-lg max-w-3xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
                {t.contact.infoTitle}
              </h3>
              <div className="space-y-6">
                <div className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}>
                  <MapPin className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                  <div>
                    <h4 className="font-semibold mb-1">{t.contact.address}</h4>
                    <p>{t.contact.addressText}</p>
                  </div>
                </div>

                <div className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}>
                  <Phone className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                  <div>
                    <h4 className="font-semibold mb-1">{t.contact.phone}</h4>
                    <p>+995 500 50 20 62</p>
                  </div>
                </div>

                <div className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}>
                  <Mail className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                  <div>
                    <h4 className="font-semibold mb-1">{t.contact.email}</h4>
                    <p>jcdental07@gmail.com</p>
                  </div>
                </div>

                <div className={`flex items-start ${direction === "rtl" ? "flex-row text-right" : ""}`}>
                  <Clock className={`w-5 h-5 ${iconMargin} mt-1`} style={{ color: colors.primary }} />
                  <div>
                    <h4 className="font-semibold mb-1">{t.contact.hours}</h4>
                    <p>
                      {t.contact.weekdays}: 10:00 - 20:00
                      <br />
                      {t.contact.saturday}: {t.contact.closed}
                      <br />
                      {t.contact.sunday}: 10:00 - 20:00
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-8 ${direction === "rtl" ? "text-right" : ""}`}>
                <h4 className="font-semibold mb-3">{t.contact.followUs}</h4>
                <div className={`flex space-x-4 ${direction === "rtl" ? "" : ""}`}>
                  <Link
                    href="https://facebook.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${colors.light}` }}
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" style={{ color: colors.primary }} />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${colors.light}` }}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" style={{ color: colors.primary }} />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: `${colors.light}` }}
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" style={{ color: colors.primary }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1252.8391205735695!2d44.84022233089427!3d41.68230198865621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d3db3f527e1%3A0x626d96f8aff559d8!2sJC%20dental!5e0!3m2!1sen!2sge!4v1742504874462!5m2!1sen!2sge"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Overlay ღილაკი */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=41.68230198865621,44.84022233089427"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-blue-50 transition-colors"
              >
                📍 {t.contact.getDirections}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
