"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

export default function DoctorsPage() {
  const { translations, direction, currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()
  const isRTL = direction === "rtl"
  const isHebrew = currentLanguage === "he"

  // AOS ინიციალიზაცია
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  // სტომატოლოგიური სპეციალობები მრავალენოვანი
  const specialties = {
    ka: [
      "ყველა სპეციალობა",
      "ორთოდონტი",
      "თერაპევტი",
      "პაროდონტოლოგი",
      "ქირურგი",
      "ბავშვთა სტომატოლოგი",
      "ორთოპედი",
      "იმპლანტოლოგი",
      "პროთეზისტი",
    ],
    en: [
      "All Specialties",
      "Orthodontist",
      "Therapist",
      "Periodontologist",
      "Surgeon",
      "Pediatric Dentist",
      "Orthopedist",
      "Implantologist",
      "Prosthetist",
    ],
    ru: [
      "Все специальности",
      "Ортодонт",
      "Терапевт",
      "Пародонтолог",
      "Хирург",
      "Детский стоматолог",
      "Ортопед",
      "Имплантолог",
      "Протезист",
    ],
    he: [
      "כל ההתמחויות",
      "אורתודונט",
      "מטפל",
      "פריודונטולוג",
      "מנתח",
      "רופא שיניים לילדים",
      "אורתופד",
      "שתלים",
      "תותבות",
    ],
  }

  // სამუშაო დღეები მრავალენოვანი
  const workDays = {
    ka: ["ყველა დღე", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
    en: ["All Days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ru: ["Все дни", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    he: ["כל הימים", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"],
  }

  // მიმდინარე ენის სპეციალობები და სამუშაო დღეები
  const currentSpecialties = specialties[currentLanguage] || specialties.ka
  const currentWorkDays = workDays[currentLanguage] || workDays.ka

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState(currentSpecialties[0])
  const [selectedDay, setSelectedDay] = useState(currentWorkDays[0])
  const [selectedDentist, setSelectedDentist] = useState(null)
  const [hoveredDentist, setHoveredDentist] = useState(null)

  // ექიმების ფილტრაცია - გათვალისწინებულია რამდენიმე სპეციალობა
  const filteredDentists = dentists.filter((dentist) => {
    const matchesSearch =
      dentist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dentist.specialties.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

    // შემოწმება თუ ექიმს აქვს არჩეული სპეციალობა
    const matchesSpecialty =
      selectedSpecialty === currentSpecialties[0] ||
      dentist.specialties.some((spec) => spec.toLowerCase().includes(selectedSpecialty.toLowerCase()))

    const matchesDay = selectedDay === currentWorkDays[0] || dentist.workingDays.includes(selectedDay)

    return matchesSearch && matchesSpecialty && matchesDay
  })

  // ექიმის დეტალების ჩვენება
  const handleDentistClick = (dentist) => {
    setSelectedDentist(selectedDentist && selectedDentist.id === dentist.id ? null : dentist)
  }

  // ტექსტები სხვადასხვა ენაზე
  const texts = {
    ka: {
      title: "JC Dental - ჩვენი ექიმები",
      subtitle:
        "გაიცანით ჩვენი მაღალკვალიფიციური სტომატოლოგები, რომლებიც ზრუნავენ თქვენი ღიმილის ჯანმრთელობასა და სილამაზეზე",
      searchPlaceholder: "მოძებნეთ ექიმი სახელით ან სპეციალობით",
      sectionTitle: "ნახეთ",
      doctors: "ექიმი",
      clearFilters: "გასუფთავება",
      workingDays: "სამუშაო დღეები:",
      appointment: "ნახეთ მეტი",
      noResults: "ექიმები ვერ მოიძებნა",
      changeParams: "გთხოვთ, შეცვალოთ ძიების პარამეტრები",
      clearFiltersButton: "ფილტრების გასუფთავება",
      contactUs: "დაგვიკავშირდით ჯავშნისთვის",
      phone: "ტელეფონი",
      email: "ელ-ფოსტა",
      workingHours: "სამუშაო საათები",
      workingHoursValue: "ორშ-შაბ: 09:00 - 19:00",
    },
    en: {
      title: "JC Dental - Our Doctors",
      subtitle: "Meet our highly qualified dentists who care about the health and beauty of your smile",
      searchPlaceholder: "Search doctor by name or specialty",
      sectionTitle: "View",
      doctors: "doctors",
      clearFilters: "Clear",
      workingDays: "Working days:",
      appointment: "See More",
      noResults: "No doctors found",
      changeParams: "Please change your search parameters",
      clearFiltersButton: "Clear filters",
      contactUs: "Contact us for an appointment",
      phone: "Phone",
      email: "Email",
      workingHours: "Working hours",
      workingHoursValue: "Mon-Sat: 09:00 - 19:00",
    },
    ru: {
      title: "JC Dental - Наши врачи",
      subtitle:
        "Познакомьтесь с нашими высококвалифицированными стоматологами, которые заботятся о здоровье и красоте вашей улыбки",
      searchPlaceholder: "Поиск врача по имени или специальности",
      sectionTitle: "Просмотр",
      doctors: "врачей",
      clearFilters: "Очистить",
      workingDays: "Рабочие дни:",
      appointment: "Подробнее",
      noResults: "Врачи не найдены",
      changeParams: "Пожалуйста, измените параметры поиска",
      clearFiltersButton: "Очистить фильтры",
      contactUs: "Свяжитесь с нами для записи",
      phone: "Телефон",
      email: "Эл. почта",
      workingHours: "Часы работы",
      workingHoursValue: "Пн-Сб: 09:00 - 19:00",
    },
    he: {
      title: "JC Dental - הרופאים שלנו",
      subtitle: "הכירו את רופאי השיניים המוסמכים שלנו הדואגים לבריאות וליופי של החיוך שלכם",
      searchPlaceholder: "חיפוש רופא לפי שם או התמחות",
      sectionTitle: "צפייה ב",
      doctors: "רופאים",
      clearFilters: "נקה",
      workingDays: "ימי עבודה:",
      appointment: "לפרטים נוספים",
      noResults: "לא נמצאו רופאים",
      changeParams: "אנא שנה את פרמטרי החיפוש",
      clearFiltersButton: "נקה מסננים",
      contactUs: "צור קשר לקביעת תור",
      phone: "טלפון",
      email: "אימייל",
      workingHours: "שעות עבודה",
      workingHoursValue: "שני-שבת: 09:00 - 19:00",
    },
  }

  // მიმდინარე ენის ტექსტები
  const t = texts[currentLanguage] || texts.ka

  return (
    <>
      <style jsx>{`
        /* ძირითადი სტილები - მხოლოდ ღია რეჟიმი */
        .jc-dental-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          max-width: 100%;
          overflow-x: hidden;
          background-color: #ffffff;
        }

        /* ზედა ნაწილი */
        .header {
          background-color: #2563a0;
          color: white;
          padding: 3rem 1rem;
          text-align: center;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .header p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        /* ძიების ველი */
        .search-container {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: #333;
          background-color: #fff;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
        }

        /* RTL სტილები */
        .rtl-search .search-icon {
          left: auto;
          right: 1rem;
        }

        .rtl-search .search-input {
          padding: 1rem 3rem 1rem 1rem;
        }

        /* მთავარი კონტენტი */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background-color: #ffffff;
        }

        /* ფილტრები */
        .filters {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #2563a0;
          font-weight: 600;
        }

        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .filter-group {
          flex: 1;
          min-width: 200px;
        }

        .filter-select {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          background-color: white;
          font-size: 1rem;
          color: #333;
        }

        .reset-button {
          padding: 0.8rem 1.5rem;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #333;
        }

        .reset-button:hover {
          background-color: #e0e0e0;
        }

        /* RTL ფილტრები */
        .rtl-filters {
          flex-direction: row-reverse;
        }

        /* ექიმების ბარათები */
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .doctor-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .doctor-card.selected {
          border: 2px solid #2563a0;
        }

        .doctor-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .doctor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .doctor-card:hover .doctor-image {
          transform: scale(1.05);
        }

        /* სპეციალობის ბეჯი */
        .specialty-badge-container {
          position: absolute;
          bottom: 10px;
          right: 10px;
          z-index: 2;
        }

        .primary-specialty {
          background-color: #2563a0;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        /* Add this new class for RTL specialty badges */
        .rtl-card .primary-specialty {
          padding: 0.4rem 1.2rem; /* Increased horizontal padding */
          margin-left: 0.5rem; /* Add some margin */
        }

        .badge-active {
          background-color: #1a4971; /* უფრო მუქი ლურჯი */
        }

        /* შეცვლილი ნოტიფიკაციის ბეჯი */
        .additional-count {
          margin-left: 5px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* Add this for RTL additional count */
        .rtl-card .additional-count {
          margin-left: 8px; /* Increase spacing between number and text */
        }

        /* სპეციალობების პოპაპი */
        .specialties-popup {
          position: absolute;
          bottom: 60px;
          right: 10px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          padding: 0.5rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 3;
          max-width: 200px;
        }

        .popup-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .popup-specialty {
          padding: 0.3rem 0.6rem;
          font-size: 0.9rem;
          white-space: nowrap;
          color: #333;
        }

        /* RTL სპეციალობები */
        .rtl-card .specialty-badge-container {
          right: auto;
          left: 15px; /* Increased from 10px to 15px to move it further from the edge */
        }

        .rtl-popup {
          right: auto;
          left: 15px; /* Increased from 10px to 15px */
        }

        /* ექიმის ინფორმაცია */
        .doctor-info {
          padding: 1.5rem;
          background-color: #ffffff;
        }

        .doctor-name {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: #2563a0;
          font-weight: 600;
        }

        .doctor-experience {
          font-size: 1rem;
          color: #444;
          margin-bottom: 1rem;
        }

        .doctor-schedule {
          margin-bottom: 1.5rem;
        }

        .doctor-schedule h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #444;
          font-weight: 600;
        }

        .working-days {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .working-day {
          background-color: #f0f0f0;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #333;
        }

        .working-hours {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #444;
        }

        .clock-icon {
          margin-right: 0.5rem;
        }

        /* RTL სამუშაო დღეები */
        .rtl-working-days {
          flex-direction: row-reverse;
        }

        .rtl-working-hours .clock-icon {
          margin-right: 0;
          margin-left: 0.5rem;
        }

        /* ჯავშნის ღილაკი */
        .appointment-button {
          display: inline-block;
          background-color: #2563a0;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s ease;
          text-align: center;
        }

        .appointment-button:hover {
          background-color: #1a4971; /* უფრო მუქი ლურჯი */
        }

        /* შედეგების არარსებობა */
        .no-results {
          text-align: center;
          padding: 3rem 1rem;
          background-color: #ffffff;
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #444;
        }

        .no-results p {
          margin-bottom: 1.5rem;
          color: #555;
        }

        /* საკონტაქტო ინფორმაცია */
        .footer {
          background-color: #f5f5f5;
          padding: 3rem 1rem;
        }

        .contact-info {
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-info h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          text-align: center;
          color: #2563a0;
          font-weight: 600;
        }

        .contact-methods {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 2rem;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          font-size: 1.8rem;
          color: #2563a0;
        }

        .contact-label {
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #444;
        }

        .contact-value {
          color: #444;
        }

        /* RTL საკონტაქტო ინფორმაცია */
        .rtl-contact-methods {
          flex-direction: row-reverse;
        }

        .rtl-contact-method {
          flex-direction: row-reverse;
        }

        /* მედია მოთხოვნები */
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }

          .header p {
            font-size: 1rem;
          }

          .contact-methods {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .filter-controls {
            flex-direction: column;
          }

          .doctor-card {
            max-width: 100%;
          }
        }

        .text-right {
          text-align: right;
        }
      `}</style>

      <div className="jc-dental-page" dir={direction}>
        {/* ზედა ნაწილი */}
        <header className="header">
          <div className={`header-content ${isRTL ? "" : ""}`} data-aos="fade-down">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>

            {/* ექიმების შეყვანა ან პროფესიით  */}
            <div className={`search-container ${isRTL ? "rtl-search" : ""}`} data-aos="zoom-in" data-aos-delay="200">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* ფილტრები */}
          <div className="filters" data-aos="fade-up">
            <h2 className={`section-title ${isRTL ? "text-right" : ""}`}>
              {t.sectionTitle} {filteredDentists.length} {t.doctors}
            </h2>

            <div className={`filter-controls ${isRTL ? "rtl-filters" : ""}`} data-aos="fade-up" data-aos-delay="100">
              <div className="filter-group">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="filter-select"
                >
                  {currentSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="filter-select">
                  {currentWorkDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="reset-button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSpecialty(currentSpecialties[0])
                  setSelectedDay(currentWorkDays[0])
                  setSelectedDentist(null)
                }}
              >
                {t.clearFilters}
              </button>
            </div>
          </div>

          {/* ექიმების სია */}
          {filteredDentists.length > 0 ? (
            <div className="doctors-grid">
              {filteredDentists.map((dentist, index) => (
                <div
                  key={dentist.id}
                  className={`doctor-card ${selectedDentist && selectedDentist.id === dentist.id ? "selected" : ""} ${
                    isRTL ? "rtl-card" : ""
                  }`}
                  onClick={() => handleDentistClick(dentist)}
                  onMouseEnter={() => setHoveredDentist(dentist.id)}
                  onMouseLeave={() => setHoveredDentist(null)}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  offset="100"
                >
                  <div className="doctor-image-container" data-aos="zoom-in" data-aos-delay={index * 100}>
                    <img src={dentist.image || "/placeholder.svg"} alt={dentist.name} className="doctor-image" />

                    {/* პროფესიის ბეჯი სურათზე */}
                    <div className="specialty-badge-container">
                      {dentist.specialties.length > 0 && (
                        <div className={`primary-specialty ${hoveredDentist === dentist.id ? "badge-active" : ""}`}>
                          {dentist.specialties[0]}
                          {dentist.specialties.length > 1 && (
                            <span className="additional-count">+{dentist.specialties.length - 1}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* დამატებითი პროფესიების ჩვენება hover-ზე */}
                    <div
                      className={`specialties-popup ${
                        hoveredDentist === dentist.id && dentist.specialties.length > 1 ? "popup-visible" : ""
                      } ${isRTL ? "rtl-popup" : ""}`}
                    >
                      {dentist.specialties.slice(1).map((specialty, index) => (
                        <div key={index} className="popup-specialty">
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`doctor-info ${isRTL ? "text-right" : ""}`}>
                    <h3 className="doctor-name">{dentist.name}</h3>
                    <p className="doctor-experience">{dentist.experience}</p>

                    <div className="doctor-schedule">
                      <h4>{t.workingDays}</h4>
                      <div className={`working-days ${isRTL ? "rtl-working-days" : ""}`}>
                        {dentist.workingDays.map((day) => (
                          <span key={day} className="working-day">
                            {day}
                          </span>
                        ))}
                      </div>
                      <p className={`working-hours ${isRTL ? "rtl-working-hours" : ""}`}>
                        <span className="clock-icon">🕒</span> {dentist.workingHours}
                      </p>
                    </div>

                    <Link
                      href={`/doctors_vip/${dentist.id}`}
                      className="appointment-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.appointment}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`no-results ${isRTL ? "text-right" : ""}`} data-aos="fade-up">
              <h3>{t.noResults}</h3>
              <p>{t.changeParams}</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSpecialty(currentSpecialties[0])
                  setSelectedDay(currentWorkDays[0])
                }}
              >
                {t.clearFiltersButton}
              </button>
            </div>
          )}
        </main>

        {/* საკონტაქტო ინფორმაცია */}
        <footer className="footer" data-aos="fade-up" data-aos-offset="200">
          <div className={`contact-info ${isRTL ? "text-right" : ""}`}>
            <h2 data-aos="fade-up">{t.contactUs}</h2>
            <div className={`contact-methods ${isRTL ? "rtl-contact-methods" : ""}`}>
              <div
                className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">{t.phone}</p>
                  <p className="contact-value">+995 32 222 33 44</p>
                </div>
              </div>
              <div
                className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <span className="contact-icon">✉️</span>
                <div>
                  <p className="contact-label">{t.email}</p>
                  <p className="contact-value">info@jcdental.ge</p>
                </div>
              </div>
              <div
                className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <span className="contact-icon">🕒</span>
                <div>
                  <p className="contact-label">{t.workingHours}</p>
                  <p className="contact-value">{t.workingHoursValue}</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
