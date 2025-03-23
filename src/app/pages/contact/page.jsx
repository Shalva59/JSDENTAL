import React from 'react'
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

const page = () => {

      // თანმიმდევრული ფერების სქემა
  const colors = {
    primary: "#0284c7", // ღია ლურჯი
    secondary: "#0ea5e9", // ცისფერი
    accent: "#38bdf8", // ღია ცისფერი
    light: "#e0f2fe", // ძალიან ღია ცისფერი
    dark: "#0c4a6e", // მუქი ლურჯი
    text: "#334155", // მუქი ნაცრისფერი ტექსტისთვის
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: colors.light }}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
          დაგვიკავშირდით
        </h2>
        <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.primary }}></div>
        <p className="text-lg max-w-3xl mx-auto">
          ჩვენ აქ ვართ, რომ ვუპასუხოთ თქვენს კითხვებს და დაგეხმაროთ შემდეგი ვიზიტის დაგეგმვაში.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
              საკონტაქტო ინფორმაცია
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                <div>
                  <h4 className="font-semibold mb-1">მისამართი</h4>
                  <p>ნავთლუღის ქ. 10 არქი-ისანი , C ბლოკი, 1 სადარბაზო, 1, სართული 0190</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                <div>
                  <h4 className="font-semibold mb-1">ტელეფონი</h4>
                  <p>+995 500 50 20 62</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                <div>
                  <h4 className="font-semibold mb-1">ელ-ფოსტა</h4>
                  <p>jcdental07@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-1" style={{ color: colors.primary }} />
                <div>
                  <h4 className="font-semibold mb-1">სამუშაო საათები</h4>
                  <p>
                    ორშაბათი - პარასკევი: 10:00 - 20:00
                    <br />
                    შაბათი: დახურულია
                    <br />
                    კვირა: 10:00 - 20:00
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-3">გამოგვყევით</h4>
              <div className="flex space-x-4">
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
      📍 მიიღეთ მიმართულებები
    </Link>
  </div>
</div>
      </div>
    </div>
  </section>
  )
}

export default page
