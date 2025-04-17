"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDentists } from "@/hooks/useLocalizedDentists"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

export default function DoctorsPage() {
  const { direction, currentLanguage } = useLanguage()
  const dentists = useLocalizedDentists()
  const isRTL = direction === "rtl"

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

  // სტილები
  const styles = {
    jcDentalPage: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      color: '#333',
      maxWidth: '100%',
      overflowX: 'hidden'
    },
    header: {
      backgroundColor: '#008b9a',
      color: 'white',
      padding: '3rem 1rem',
      textAlign: 'center'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    headerH1: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    headerP: {
      fontSize: '1.2rem',
      maxWidth: '800px',
      margin: '0 auto 2rem',
      lineHeight: '1.6'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto'
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1rem 1rem 3rem',
      borderRadius: '50px',
      border: 'none',
      fontSize: '1rem',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.2rem'
    },
    rtlSearchIcon: {
      left: 'auto',
      right: '1rem'
    },
    rtlSearchInput: {
      padding: '1rem 3rem 1rem 1rem'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    filters: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      marginBottom: '1.5rem'
    },
    textRight: {
      textAlign: 'right'
    },
    filterControls: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem'
    },
    rtlFilters: {
      flexDirection: 'row-reverse'
    },
    filterGroup: {
      flex: '1',
      minWidth: '200px'
    },
    filterSelect: {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      backgroundColor: 'white',
      fontSize: '1rem'
    },
    resetButton: {
      padding: '0.8rem 1.5rem',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem'
    },
    doctorCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    },
    doctorCardSelected: {
      border: '2px solid #008b9a'
    },
    doctorImageContainer: {
      position: 'relative',
      height: '250px',
      overflow: 'hidden'
    },
    doctorImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease'
    },
    specialtyBadgeContainer: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      zIndex: '2'
    },
    rtlSpecialtyBadgeContainer: {
      right: 'auto',
      left: '10px'
    },
    primarySpecialty: {
      backgroundColor: '#008b9a',
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    badgeActive: {
      backgroundColor: '#006d78'
    },
    additionalCount: {
      marginLeft: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem'
    },
    specialtiesPopup: {
      position: 'absolute',
      bottom: '60px',
      right: '10px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
      padding: '0.5rem',
      opacity: '0',
      transform: 'translateY(10px)',
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
      zIndex: '3',
      maxWidth: '200px'
    },
    rtlSpecialtiesPopup: {
      right: 'auto',
      left: '10px'
    },
    popupVisible: {
      opacity: '1',
      transform: 'translateY(0)'
    },
    popupSpecialty: {
      padding: '0.3rem 0.6rem',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
      color: '#333'
    },
    doctorInfo: {
      padding: '1.5rem'
    },
    doctorName: {
      fontSize: '1.4rem',
      marginBottom: '0.5rem',
      color: '#008b9a'
    },
    doctorExperience: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '1rem'
    },
    doctorSchedule: {
      marginBottom: '1.5rem'
    },
    doctorScheduleH4: {
      fontSize: '1rem',
      marginBottom: '0.5rem',
      color: '#555'
    },
    workingDays: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    rtlWorkingDays: {
      flexDirection: 'row-reverse'
    },
    workingDay: {
      backgroundColor: '#f0f0f0',
      padding: '0.3rem 0.6rem',
      borderRadius: '4px',
      fontSize: '0.9rem'
    },
    workingHours: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem',
      color: '#666'
    },
    rtlWorkingHours: {
      flexDirection: 'row-reverse'
    },
    clockIcon: {
      marginRight: '0.5rem'
    },
    rtlClockIcon: {
      marginRight: '0',
      marginLeft: '0.5rem'
    },
    appointmentButton: {
      display: 'inline-block',
      backgroundColor: '#008b9a',
      color: 'white',
      padding: '0.8rem 1.5rem',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
      textAlign: 'center'
    },
    noResults: {
      textAlign: 'center',
      padding: '3rem 1rem'
    },
    noResultsH3: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#666'
    },
    noResultsP: {
      marginBottom: '1.5rem',
      color: '#888'
    },
    footer: {
      backgroundColor: '#f5f5f5',
      padding: '3rem 1rem'
    },
    contactInfo: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    contactInfoH2: {
      fontSize: '1.8rem',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#008b9a'
    },
    contactMethods: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '2rem'
    },
    rtlContactMethods: {
      flexDirection: 'row-reverse'
    },
    contactMethod: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    rtlContactMethod: {
      flexDirection: 'row-reverse'
    },
    contactIcon: {
      fontSize: '1.8rem',
      color: '#008b9a'
    },
    contactLabel: {
      fontWeight: '600',
      marginBottom: '0.3rem',
      color: '#555'
    },
    contactValue: {
      color: '#666'
    },
    // მედია მოთხოვნები
    '@media (max-width: 768px)': {
      headerH1: {
        fontSize: '2rem'
      },
      headerP: {
        fontSize: '1rem'
      },
      contactMethods: {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    '@media (max-width: 480px)': {
      filterControls: {
        flexDirection: 'column'
      },
      doctorCard: {
        maxWidth: '100%'
      }
    }
  }

  return (
    <div style={styles.jcDentalPage} dir={direction}>
      {/* ზედა ნაწილი */}
      <header style={styles.header}>
        <div style={styles.headerContent} data-aos="fade-down">
          <h1 style={styles.headerH1}>{t.title}</h1>
          <p style={styles.headerP}>{t.subtitle}</p>

          {/* ექიმების შეყვანა ან პროფესიით  */}
          <div 
            style={{
              ...styles.searchContainer,
              ...(isRTL ? styles.rtlSearchContainer : {})
            }} 
            data-aos="zoom-in" 
            data-aos-delay="200"
          >
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...styles.searchInput,
                ...(isRTL ? styles.rtlSearchInput : {})
              }}
              className="text-black"
            />
            <span 
              style={{
                ...styles.searchIcon,
                ...(isRTL ? styles.rtlSearchIcon : {})
              }}
            >
              🔍
            </span>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* ფილტრები */}
        <div style={styles.filters} data-aos="fade-up">
          <h2 
            style={{
              ...styles.sectionTitle,
              ...(isRTL ? styles.textRight : {})
            }}
          >
            {t.sectionTitle} {filteredDentists.length} {t.doctors}
          </h2>

          <div 
            style={{
              ...styles.filterControls,
              ...(isRTL ? styles.rtlFilters : {})
            }} 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <div style={styles.filterGroup}>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={styles.filterSelect}
              >
                {currentSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)} 
                style={styles.filterSelect}
              >
                {currentWorkDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <button
              style={styles.resetButton}
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
          <div style={styles.doctorsGrid}>
            {filteredDentists.map((dentist, index) => (
              <div
                key={dentist.id}
                style={{
                  ...styles.doctorCard,
                  ...(selectedDentist && selectedDentist.id === dentist.id ? styles.doctorCardSelected : {})
                }}
                onClick={() => handleDentistClick(dentist)}
                onMouseEnter={() => setHoveredDentist(dentist.id)}
                onMouseLeave={() => setHoveredDentist(null)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-offset="100"
              >
                <div style={styles.doctorImageContainer} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <img 
                    src={dentist.image || "/placeholder.svg"} 
                    alt={dentist.name} 
                    style={styles.doctorImage} 
                  />

                  {/* პროფესიის ბეჯი სურათზე */}
                  <div 
                    style={{
                      ...styles.specialtyBadgeContainer,
                      ...(isRTL ? styles.rtlSpecialtyBadgeContainer : {})
                    }}
                  >
                    {dentist.specialties.length > 0 && (
                      <div 
                        style={{
                          ...styles.primarySpecialty,
                          ...(hoveredDentist === dentist.id ? styles.badgeActive : {})
                        }}
                      >
                        {dentist.specialties[0]}
                        {dentist.specialties.length > 1 && (
                          <span style={styles.additionalCount}>+{dentist.specialties.length - 1}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* დამატებითი პროფესიების ჩვენება hover-ზე */}
                  <div
                    style={{
                      ...styles.specialtiesPopup,
                      ...(isRTL ? styles.rtlSpecialtiesPopup : {}),
                      ...(hoveredDentist === dentist.id && dentist.specialties.length > 1 ? styles.popupVisible : {})
                    }}
                  >
                    {dentist.specialties.slice(1).map((specialty, index) => (
                      <div key={index} style={styles.popupSpecialty}>
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  style={{
                    ...styles.doctorInfo,
                    ...(isRTL ? styles.textRight : {})
                  }}
                >
                  <h3 style={styles.doctorName}>{dentist.name}</h3>
                  <p style={styles.doctorExperience}>{dentist.experience}</p>

                  <div style={styles.doctorSchedule}>
                    <h4 style={styles.doctorScheduleH4}>{t.workingDays}</h4>
                    <div 
                      style={{
                        ...styles.workingDays,
                        ...(isRTL ? styles.rtlWorkingDays : {})
                      }}
                    >
                      {dentist.workingDays.map((day) => (
                        <span key={day} style={styles.workingDay}>
                          {day}
                        </span>
                      ))}
                    </div>
                    <p 
                      style={{
                        ...styles.workingHours,
                        ...(isRTL ? styles.rtlWorkingHours : {})
                      }}
                    >
                      <span 
                        style={{
                          ...styles.clockIcon,
                          ...(isRTL ? styles.rtlClockIcon : {})
                        }}
                      >
                        🕒
                      </span> 
                      {dentist.workingHours}
                    </p>
                  </div>

                  <Link 
                    href={`/doctors_vip/${dentist.id}`} 
                    style={styles.appointmentButton}
                  >
                    {t.appointment}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            style={{
              ...styles.noResults,
              ...(isRTL ? styles.textRight : {})
            }} 
            data-aos="fade-up"
          >
            <h3 style={styles.noResultsH3}>{t.noResults}</h3>
            <p style={styles.noResultsP}>{t.changeParams}</p>
            <button
              style={styles.resetButton}
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
      <footer style={styles.footer} data-aos="fade-up" data-aos-offset="200">
        <div 
          style={{
            ...styles.contactInfo,
            ...(isRTL ? styles.textRight : {})
          }}
        >
          <h2 style={styles.contactInfoH2} data-aos="fade-up">{t.contactUs}</h2>
          <div 
            style={{
              ...styles.contactMethods,
              ...(isRTL ? styles.rtlContactMethods : {})
            }}
          >
            <div
              style={{
                ...styles.contactMethod,
                ...(isRTL ? styles.rtlContactMethod : {})
              }}
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <span style={styles.contactIcon}>📞</span>
              <div>
                <p style={styles.contactLabel}>{t.phone}</p>
                <p style={styles.contactValue}>+995 32 222 33 44</p>
              </div>
            </div>
            <div
              style={{
                ...styles.contactMethod,
                ...(isRTL ? styles.rtlContactMethod : {})
              }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <span style={styles.contactIcon}>✉️</span>
              <div>
                <p style={styles.contactLabel}>{t.email}</p>
                <p style={styles.contactValue}>info@jcdental.ge</p>
              </div>
            </div>
            <div
              style={{
                ...styles.contactMethod,
                ...(isRTL ? styles.rtlContactMethod : {})
              }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <span style={styles.contactIcon}>🕒</span>
              <div>
                <p style={styles.contactLabel}>{t.workingHours}</p>
                <p style={styles.contactValue}>{t.workingHoursValue}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}