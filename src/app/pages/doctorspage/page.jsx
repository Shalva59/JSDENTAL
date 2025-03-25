"use client"

import { useState } from "react"
import { dentists } from "../../js/doctors.js"

// კომპონენტის სახელი შევცვალოთ, რომ ემთხვეოდეს ფაილის სახელს
export default function JCDentalDoctors() {
  // სტომატოლოგიური სპეციალობები
  const specialties = [
    "ყველა სპეციალობა",
    "ორთოდონტი",
    "თერაპევტი",
    "პაროდონტოლოგი",
    "ქირურგი",
    "ბავშვთა სტომატოლოგი",
    "ორთოპედი",
    "იმპლანტოლოგი",
    "პროთეზისტი",
  ]

  // სამუშაო დღეები
  const workDays = ["ყველა დღე", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("ყველა სპეციალობა")
  const [selectedDay, setSelectedDay] = useState("ყველა დღე")
  const [selectedDentist, setSelectedDentist] = useState(null)
  const [hoveredDentist, setHoveredDentist] = useState(null)

  // ექიმების ფილტრაცია - გათვალისწინებულია რამდენიმე სპეციალობა
  const filteredDentists = dentists.filter((dentist) => {
    const matchesSearch =
      dentist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dentist.specialties.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

    // შემოწმება თუ ექიმს აქვს არჩეული სპეციალობა
    const matchesSpecialty =
      selectedSpecialty === "ყველა სპეციალობა" ||
      dentist.specialties.some((spec) => spec.toLowerCase().includes(selectedSpecialty.toLowerCase()))

    const matchesDay = selectedDay === "ყველა დღე" || dentist.workingDays.includes(selectedDay)

    return matchesSearch && matchesSpecialty && matchesDay
  })

  // ექიმის დეტალების ჩვენება
  const handleDentistClick = (dentist) => {
    setSelectedDentist(selectedDentist && selectedDentist.id === dentist.id ? null : dentist)
  }

  return (
    <div className="jc-dental-page">
      {/* ზედა ნაწილი */}
      <header className="header">
        <div className="header-content">
          <h1>JC Dental - ჩვენი ექიმები</h1>
          <p>
            გაიცანით ჩვენი მაღალკვალიფიციური სტომატოლოგები, რომლებიც ზრუნავენ თქვენი ღიმილის ჯანმრთელობასა და სილამაზეზე
          </p>

          {/* ექიმების შეყვანა ან პროფესიით  */}
          <div className="search-container">
            <input
              type="text"
              placeholder="მოძებნეთ ექიმი სახელით ან სპეციალობით"
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
          <h2 className="section-title">ნახეთ {filteredDentists.length} ექიმი</h2>

          <div className="filter-controls">
            <div className="filter-group">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="filter-select"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="filter-select">
                {workDays.map((day) => (
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
                setSelectedSpecialty("ყველა სპეციალობა")
                setSelectedDay("ყველა დღე")
                setSelectedDentist(null)
              }}
            >
              გასუფთავება
            </button>
          </div>
        </div>

        {/* ექიმების სია */}
        {filteredDentists.length > 0 ? (
          <div className="doctors-grid">
            {filteredDentists.map((dentist) => (
              <div
                key={dentist.id}
                className={`doctor-card ${selectedDentist && selectedDentist.id === dentist.id ? "selected" : ""}`}
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
                    className={`specialties-popup ${hoveredDentist === dentist.id && dentist.specialties.length > 1 ? "popup-visible" : ""}`}
                  >
                    {dentist.specialties.slice(1).map((specialty, index) => (
                      <div key={index} className="popup-specialty">
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="doctor-info">
                  <h3 className="doctor-name">{dentist.name}</h3>
                  <p className="doctor-experience">{dentist.experience}</p>

                  <div className="doctor-schedule">
                    <h4>სამუშაო დღეები:</h4>
                    <div className="working-days">
                      {dentist.workingDays.map((day) => (
                        <span key={day} className="working-day">
                          {day}
                        </span>
                      ))}
                    </div>
                    <p className="working-hours">
                      <span className="clock-icon">🕒</span> {dentist.workingHours}
                    </p>
                  </div>

                  <button className="appointment-button">ჯავშანი</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>ექიმები ვერ მოიძებნა</h3>
            <p>გთხოვთ, შეცვალოთ ძიების პარამეტრები</p>
            <button
              className="reset-button"
              onClick={() => {
                setSearchQuery("")
                setSelectedSpecialty("ყველა სპეციალობა")
                setSelectedDay("ყველა დღე")
              }}
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}
      </main>

      {/* საკონტაქტო ინფორმაცია */}
      <footer className="footer">
        <div className="contact-info">
          <h2>დაგვიკავშირდით ჯავშნისთვის</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📞</span>
              <div>
                <p className="contact-label">ტელეფონი</p>
                <p className="contact-value">+995 32 222 33 44</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">✉️</span>
              <div>
                <p className="contact-label">ელ-ფოსტა</p>
                <p className="contact-value">info@jcdental.ge</p>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-icon">🕒</span>
              <div>
                <p className="contact-label">სამუშაო საათები</p>
                <p className="contact-value">ორშ-შაბ: 09:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

