"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"

// კომპონენტის სახელი შევცვალოთ, რომ ემთხვეოდეს ფაილის სახელს
export default function JCDentalDoctors() {
  const { translations, direction, currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()
  const isRTL = direction === "rtl"
  const isHebrew = currentLanguage === "he"

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
      appointment: "ჯავშანი",
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
      appointment: "Book Appointment",
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
      appointment: "Записаться",
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
      appointment: "קביעת תור",
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
    <div className="jc-dental-page" dir={direction}>
      {/* ზედა ნაწილი */}
      <header className="header">
        <div className={`header-content ${isRTL ? "" : ""}`}>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>

          {/* ექიმების შეყვანა ან პროფესიით  */}
          <div className={`search-container ${isRTL ? "rtl-search" : ""}`}>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input text-black"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* ფილტრები */}
        <div className="filters">
          <h2 className={`section-title ${isRTL ? "text-right" : ""}`}>
            {t.sectionTitle} {filteredDentists.length} {t.doctors}
          </h2>

          <div className={`filter-controls ${isRTL ? "rtl-filters" : ""}`}>
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
            {filteredDentists.map((dentist) => (
              <div
                key={dentist.id}
                className={`doctor-card ${selectedDentist && selectedDentist.id === dentist.id ? "selected" : ""} ${
                  isRTL ? "rtl-card" : ""
                }`}
                onClick={() => handleDentistClick(dentist)}
                onMouseEnter={() => setHoveredDentist(dentist.id)}
                onMouseLeave={() => setHoveredDentist(null)}
              >
                <div className="doctor-image-container">
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

                  <button className="appointment-button">{t.appointment}</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`no-results ${isRTL ? "text-right" : ""}`}>
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
      <footer className="footer">
        <div className={`contact-info ${isRTL ? "text-right" : ""}`}>
          <h2>{t.contactUs}</h2>
          <div className={`contact-methods ${isRTL ? "rtl-contact-methods" : ""}`}>
            <div className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}>
              <span className="contact-icon">📞</span>
              <div>
                <p className="contact-label">{t.phone}</p>
                <p className="contact-value">+995 32 222 33 44</p>
              </div>
            </div>
            <div className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}>
              <span className="contact-icon">✉️</span>
              <div>
                <p className="contact-label">{t.email}</p>
                <p className="contact-value">info@jcdental.ge</p>
              </div>
            </div>
            <div className={`contact-method ${isRTL ? "rtl-contact-method" : ""}`}>
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
  )
}
