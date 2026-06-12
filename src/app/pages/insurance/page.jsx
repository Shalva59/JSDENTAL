"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Shield,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Wallet,
  HeartPulse,
  Stethoscope,
  Users,
  Clock,
  Eye,
  FileText,
  Sparkles,
  Calendar,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Smile,
  Award,
  CreditCard,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"
import { useLanguage } from "@/context/LanguageContext"

// Icons assigned per benefit/coverage/step in display order
const benefitIcons = [Wallet, CreditCard, Sparkles, Award, Calendar, Eye]
const coverageIcons = [HeartPulse, Smile, Stethoscope, ShieldCheck, Users, CheckCircle2]
const stepIcons = [Phone, Stethoscope, FileText, CheckCircle2]

export default function InsurancePage() {
  const { translations, direction } = useLanguage()
  const isRTL = direction === "rtl"
  const t = translations?.insurance || {}
  const [openFaq, setOpenFaq] = useState(0)

  // Brand-aligned palette: site sky blue + TBC-inspired accent
  const colors = {
    primary: "#0284c7",
    secondary: "#0ea5e9",
    accent: "#00B4A0",
    light: "#e0f2fe",
    softer: "#f0f9ff",
    dark: "#0c4a6e",
  }

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" })
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  const benefits = t?.benefits?.items || []
  const coverage = t?.coverage?.items || []
  const steps = t?.howItWorks?.steps || []
  const documents = t?.documents?.items || []
  const faqItems = t?.faq?.items || []

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-700" dir={direction}>
      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/implantis_ukana_xedi.jpg"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(12,74,110,0.92) 0%, rgba(2,132,199,0.85) 50%, rgba(0,180,160,0.78) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-6">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {t?.hero?.badge || "ოფიციალური პარტნიორი"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
                {t?.hero?.title || "თიბისის დაზღვევა"}
                <span
                  className="block mt-2"
                  style={{ color: "#a7f3d0" }}
                >
                  {t?.hero?.titleHighlight || "JC Dental-ში"}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mt-6 font-light">
                {t?.hero?.subtitle || "ჯანმრთელი ღიმილი ხელმისაწვდომ ფასად"}
              </p>

              <p className="text-base md:text-lg text-white/80 mt-4 leading-relaxed max-w-xl text-pretty">
                {t?.hero?.description ||
                  "JC Dental არის თიბისის დაზღვევის ოფიციალური პარტნიორი."}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "white", color: colors.dark }}
                >
                  <Calendar className="w-5 h-5" />
                  {t?.hero?.bookButton || "ვიზიტის დაჯავშნა"}
                </Link>
                <a
                  href="tel:+995500502062"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = "tel:+995500502062"
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {t?.hero?.callButton || "დაგვიკავშირდით"}
                </a>
              </div>
            </div>

            {/* Partnership card */}
            <div data-aos="fade-up" data-aos-delay="200" className="relative">
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md"
                      style={{ backgroundColor: colors.primary }}
                    >
                      JC
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">JC Dental</div>
                      <div className="text-xs text-slate-500">
                        {t?.hero?.clinicLabel || "Dental Clinic"}
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.light }}
                  >
                    <ArrowRight
                      className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                      style={{ color: colors.primary }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md"
                      style={{ backgroundColor: colors.accent }}
                    >
                      TBC
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">TBC</div>
                      <div className="text-xs text-slate-500">
                        {t?.hero?.insuranceLabel || "Insurance"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-200 mb-8"></div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>
                      {t?.partnership?.stat1Value || "100%"}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-tight">
                      {t?.partnership?.stat1Label || "ლეგალური პარტნიორობა"}
                    </div>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.accent }}>
                      {t?.partnership?.stat2Value || "30%+"}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-tight">
                      {t?.partnership?.stat2Label || "საშუალო ფასდაკლება"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.dark }}>
                      {t?.partnership?.stat3Value || "24/7"}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-tight">
                      {t?.partnership?.stat3Label || "მხარდაჭერა"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative blob */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full -z-10 blur-2xl opacity-50"
                style={{ backgroundColor: colors.accent }}
              />
              <div
                className="absolute -top-6 -left-6 w-32 h-32 rounded-full -z-10 blur-2xl opacity-40"
                style={{ backgroundColor: colors.secondary }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP / INTRO */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ backgroundColor: colors.light, color: colors.primary }}
          >
            {t?.partnership?.label || "პარტნიორობა"}
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ color: colors.dark }}
          >
            {t?.partnership?.title || "ერთად ვზრუნავთ თქვენს ღიმილზე"}
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: colors.accent }} />
          <p className="text-lg md:text-xl leading-relaxed text-slate-600 text-pretty">
            {t?.partnership?.description ||
              "JC Dental და თიბისის დაზღვევა გაერთიანებულნი არიან ერთი მიზნით — ხელმისაწვდომი გავხადოთ მაღალი ხარისხის სტომატოლოგიური მომსახურება ყველასთვის."}
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        className="py-16 md:py-24 px-4 md:px-6 lg:px-8"
        style={{ backgroundColor: colors.softer }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ backgroundColor: colors.light, color: colors.primary }}
            >
              {t?.benefits?.label || "უპირატესობები"}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance"
              style={{ color: colors.dark }}
            >
              {t?.benefits?.title || "რატომ JC Dental თიბისის დაზღვევით"}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              {t?.benefits?.subtitle ||
                "ისარგებლეთ თქვენი დაზღვევით და მიიღეთ ექსკლუზიური სარგებელი"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((item, index) => {
              const Icon = benefitIcons[index % benefitIcons.length]
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: colors.light }}
                  >
                    <Icon className="w-7 h-7" style={{ color: colors.primary }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: colors.dark }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ backgroundColor: "#ccfbf1", color: colors.accent }}
            >
              {t?.coverage?.label || "დაფარული სერვისები"}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance"
              style={{ color: colors.dark }}
            >
              {t?.coverage?.title || "რას მოიცავს დაზღვევა"}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              {t?.coverage?.subtitle ||
                "თიბისის დაზღვევით ჩვენთან ისარგებლებთ შემდეგი სერვისებით"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverage.map((item, index) => {
              const Icon = coverageIcons[index % coverageIcons.length]
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 bg-white hover:border-sky-200 transition-colors"
                  style={{ backgroundColor: colors.softer }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "white", border: `1px solid ${colors.light}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.accent }} />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="text-lg font-bold mb-1" style={{ color: colors.dark }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: colors.dark }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(0,180,160,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(2,132,199,0.4) 0%, transparent 40%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 bg-white/10 text-white border border-white/20"
            >
              {t?.howItWorks?.label || "მარტივი 4 ნაბიჯი"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-balance">
              {t?.howItWorks?.title || "როგორ მოიცავს დაზღვევა"}
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto text-pretty">
              {t?.howItWorks?.subtitle ||
                "მიიღეთ მომსახურება მარტივად — ჩვენ ვაგვარებთ ყველაფერს"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = stepIcons[index % stepIcons.length]
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-5xl font-bold opacity-30"
                      style={{ color: colors.accent }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-up">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ backgroundColor: colors.light, color: colors.primary }}
              >
                {t?.documents?.label || "საჭირო დოკუმენტები"}
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance"
                style={{ color: colors.dark }}
              >
                {t?.documents?.title || "რა დაგჭირდებათ ვიზიტისას"}
              </h2>
              <p className="text-lg text-slate-600 mb-8 text-pretty">
                {t?.documents?.subtitle ||
                  "მოამზადეთ მარტივი ჩამონათვალი, დანარჩენი ჩვენ მოვაგვარებთ"}
              </p>

              <ul className="space-y-4">
                {documents.map((doc, index) => (
                  <li
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "white" }}
                    >
                      <CheckCircle2
                        className="w-6 h-6"
                        style={{ color: colors.accent }}
                      />
                    </div>
                    <span className="text-base md:text-lg text-slate-700 font-medium">
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="relative">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"
                style={{ backgroundColor: colors.light }}
              >
                <img
                  src="/terapevtis_ukana_xedi.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(12,74,110,0.85) 100%)",
                  }}
                />

                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <div className="font-bold text-slate-900">
                        {t?.hero?.badge || "ოფიციალური პარტნიორი"}
                      </div>
                      <div className="text-xs text-slate-500">JC Dental × TBC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 md:py-24 px-4 md:px-6 lg:px-8"
        style={{ backgroundColor: colors.softer }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ backgroundColor: colors.light, color: colors.primary }}
            >
              {t?.faq?.label || "FAQ"}
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance"
              style={{ color: colors.dark }}
            >
              {t?.faq?.title || "ხშირად დასმული კითხვები"}
            </h2>
            <p className="text-lg text-slate-600 text-pretty">
              {t?.faq?.subtitle || "გაეცანით პასუხებს ხშირად დასმულ კითხვებზ��"}
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-semibold text-base md:text-lg ${isRTL ? "text-right" : "text-left"}`}
                      style={{ color: colors.dark }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform"
                      style={{
                        backgroundColor: isOpen ? colors.primary : colors.light,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown
                        className="w-5 h-5"
                        style={{ color: isOpen ? "white" : colors.primary }}
                      />
                    </div>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-5 md:px-6 pb-6 text-slate-600 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-3xl p-8 md:p-14 lg:p-20 overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 50%, ${colors.accent} 100%)`,
            }}
            data-aos="fade-up"
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: "#a7f3d0" }}
              />
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: colors.secondary }}
              />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-5">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {t?.partnership?.stat3Label || "მხარდაჭერა"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                  {t?.cta?.title || "დაიწყეთ მკურნალობა დღესვე"}
                </h2>
                <p className="text-lg text-white/85 text-pretty">
                  {t?.cta?.description ||
                    "გამოიყენეთ თქვენი თიბისის დაზღვევა და მიიღეთ პროფესიონალური სტომატოლოგიური მომსახურება."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-stretch">
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "white", color: colors.dark }}
                >
                  <Calendar className="w-5 h-5" />
                  {t?.cta?.bookButton || "ვიზიტის დაჯავშნა"}
                </Link>
                <a
                  href="tel:+995500502062"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = "tel:+995500502062"
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span dir="ltr">{t?.cta?.callButton || "+995 500 50 20 62"}</span>
                </a>
                <Link
                  href="/pages/contact"
                  className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium underline-offset-4 hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t?.hero?.callButton || "დაგვიკავშირდით"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
