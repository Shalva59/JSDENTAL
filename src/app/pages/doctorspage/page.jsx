"use client"

import { useState } from "react"

function JCDentalDoctors() {
    // სტომატოლოგების მონაცემები
    const dentists = [
        {
            id: 1,
            name: "დოქტ. ნინო ჯავახიშვილი",
            specialty: "ორთოდონტი სტომატოლოგი",
            experience: "15 წელი გამოცდილება",
            workingDays: ["სამშაბათი", "ოთხშაბათი", "შაბათი"],
            workingHours: "09:00 - 17:00",
            image: "https://royalimplant.com/blogs/wp-content/uploads/2022/06/doctor-and-dentist-thumbs-up-510x340.jpg",
        },
        {
            id: 2,
            name: "დოქტ. თამარ ბერიძე",
            specialty: "პაროდონტოლოგი",
            experience: "10 წელი გამოცდილება",
            workingDays: ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი"],
            workingHours: "11:00 - 19:00",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: 3,
            name: "დოქტ. ნათია გოგოლაძე",
            specialty: "ბავშვთა სტომატოლოგი",
            experience: "8 წელი გამოცდილება",
            workingDays: ["ორშაბათი", "სამშაბათი", "პარასკევი"],
            workingHours: "09:00 - 17:00",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: 4,
            name: "დოქტ. გიორგი მაისურაძე",
            specialty: "თერაპევტი სტომატოლოგი",
            experience: "15 წელი გამოცდილება",
            workingDays: ["სამშაბათი", "ხუთშაბათი", "შაბათი"],
            workingHours: "09:00 - 17:00",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: 5,
            name: "დოქტ. ლევან კახიძე",
            specialty: "ქირურგი სტომატოლოგი",
            experience: "18 წელი გამოცდილება",
            workingDays: ["ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
            workingHours: "10:00 - 18:00",
            image: "/placeholder.svg?height=400&width=400",
        },
        {
            id: 6,
            name: "დოქტ. ზურაბ მამულაშვილი",
            specialty: "ორთოპედი სტომატოლოგი",
            experience: "14 წელი გამოცდილება",
            workingDays: ["სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "შაბათი"],
            workingHours: "10:00 - 18:00",
            image: "/placeholder.svg?height=400&width=400",
        },
    ]

    // სტომატოლოგიური სპეციალობები
    const specialties = [
        "ყველა სპეციალობა",
        "ორთოდონტი სტომატოლოგი",
        "თერაპევტი სტომატოლოგი",
        "პაროდონტოლოგი",
        "ქირურგი სტომატოლოგი",
        "ბავშვთა სტომატოლოგი",
        "ორთოპედი სტომატოლოგი",
    ]

    // სამუშაო დღეები
    const workDays = ["ყველა დღე", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSpecialty, setSelectedSpecialty] = useState("ყველა სპეციალობა")
    const [selectedDay, setSelectedDay] = useState("ყველა დღე")
    const [selectedDentist, setSelectedDentist] = useState(null)

    // ექიმების ფილტრაცია
    const filteredDentists = dentists.filter((dentist) => {
        const matchesSearch =
            dentist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dentist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesSpecialty = selectedSpecialty === "ყველა სპეციალობა" || dentist.specialty === selectedSpecialty
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

                    {/*  ექიმების მოძებნა */}
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
                            >
                                <div className="doctor-image-container">
                                    <img src={dentist.image || "/placeholder.svg"} alt={dentist.name} className="doctor-image" />
                                    <div className="doctor-specialty-badge">{dentist.specialty}</div>
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

            <style jsx>{`
        /* ძირითადი სტილები */
        .jc-dental-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
        }
        
        /* ზედა ნაწილი */
        .header {
          background: linear-gradient(to right, #0891b2, #0c4a6e);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          font-weight: bold;
        }
        
        .header p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto 32px;
        }
        
        .search-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .search-input {
          width: 100%;
          padding: 14px 20px 14px 50px;
          border-radius: 30px;
          border: none;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        /* მთავარი კონტენტი */
        .main-content {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
        }
        
        /* ფილტრები */
        .filters {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        
        .filter-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: center;
        }
        
        .filter-group {
          min-width: 200px;
        }
        
        .filter-select {
          width: 100%;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
          background-color: white;
        }
        
        .reset-button {
          padding: 10px 20px;
          background-color: #f1f5f9;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          margin-left: auto;
        }
        
        .reset-button:hover {
          background-color: #e2e8f0;
        }
        
        /* ექიმების ბარათები */
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .doctor-card {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .doctor-card.selected {
          border: 2px solid #0891b2;
        }
        
        .doctor-image-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
        
        .doctor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .doctor-image-container:hover .doctor-image {
          transform: scale(1.1);
        }
        
        .doctor-specialty-badge {
          position: absolute;
          bottom: 15px;
          left: 15px;
          background-color: #0891b2;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .doctor-info {
          padding: 20px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .doctor-name {
          font-size: 1.4rem;
          font-weight: bold;
          margin-bottom: 5px;
          color: #0c4a6e;
        }
        
        .doctor-experience {
          color: #64748b;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }
        
        .doctor-schedule {
          margin-bottom: 20px;
          flex-grow: 1;
        }
        
        .doctor-schedule h4 {
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 0.95rem;
          color: #334155;
        }
        
        .working-days {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        
        .working-day {
          background-color: #f1f5f9;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.85rem;
          color: #334155;
        }
        
        .working-hours {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #64748b;
        }
        
        .clock-icon {
          font-size: 1rem;
        }
        
        .appointment-button {
          width: 100%;
          padding: 12px;
          background-color: #0891b2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: auto;
        }
        
        .appointment-button:hover {
          background-color: #0c4a6e;
        }
        
        /* შედეგების არარსებობა */
        .no-results {
          text-align: center;
          padding: 60px 20px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .no-results h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #0c4a6e;
        }
        
        .no-results p {
          color: #64748b;
          margin-bottom: 20px;
        }
        
        /* ფუტერი */
        .footer {
          background-color: #f1f5f9;
          padding: 60px 20px;
          margin-top: 60px;
        }
        
        .contact-info {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        
        .contact-info h2 {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 30px;
          color: #0c4a6e;
        }
        
        .contact-methods {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }
        
        .contact-method {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .contact-icon {
          font-size: 1.5rem;
        }
        
        .contact-label {
          font-weight: bold;
          margin-bottom: 5px;
          color: #334155;
        }
        
        .contact-value {
          color: #64748b;
        }
        
        /* რესპონსიული დიზაინი */
        @media (max-width: 768px) {
          .doctors-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .filter-controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-group {
            width: 100%;
          }
          
          .reset-button {
            width: 100%;
            margin-left: 0;
          }
          
          .contact-methods {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
        </div>
    )
}

export default JCDentalDoctors

