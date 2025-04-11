"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useLocalizedDoctors } from "@/hooks/useLocalizedDoctors"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DoctorsCarousel = () => {
  const { translations, currentLanguage } = useLanguage()
  const doctors = useLocalizedDoctors()
  const isHebrew = currentLanguage === "he"
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // ✅ ფილტრაცია სურათის და სახელის მიხედვით (დუბლიკატების ამოსაშლელად)
  const uniqueDoctors = doctors.filter(
    (doctor, index, self) =>
      index ===
      self.findIndex(
        (d) => d.image === doctor.image && d.name.toLowerCase().trim() === doctor.name.toLowerCase().trim(),
      ),
  )

  // ებრაულისთვის ვაბრუნებთ მასივს საპირისპირო მიმართულებით
  const orderedDoctors = isHebrew ? [...uniqueDoctors].reverse() : uniqueDoctors

  // ვქმნით უწყვეტი კარუსელისთვის გაფართოებულ მასივს
  const extendedDoctors = [...orderedDoctors, ...orderedDoctors, ...orderedDoctors]

  // ვითვლით რამდენი ექიმი უნდა გამოჩნდეს ერთდროულად
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 640) return 2
      return 1
    }
    return 3 // საწყისი მნიშვნელობა სერვერზე
  }

  const [visibleCount, setVisibleCount] = useState(3)

  // ვაახლებთ ხილული ექიმების რაოდენობას ფანჯრის ზომის ცვლილებისას
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }

    // საწყისი მნიშვნელობის დაყენება
    setVisibleCount(getVisibleCount())

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // ვაყენებთ საწყის ინდექსს ცენტრალურ ნაწილში
  useEffect(() => {
    setCurrentIndex(orderedDoctors.length)
  }, [orderedDoctors.length])

  // წინა სლაიდზე გადასვლა
  const goPrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1

      // თუ მივაღწიეთ პირველ სექციას და მივდივართ უკან
      if (newIndex < 0) {
        // ვაყენებთ ინდექსს ბოლო სექციის ბოლოში
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(extendedDoctors.length - visibleCount - 1)
        }, 0)
        return 0
      }

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)

      return newIndex
    })
  }

  // შემდეგ სლაიდზე გადასვლა
  const goNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1

      // თუ მივაღწიეთ ბოლო სექციას და მივდივართ წინ
      if (newIndex >= extendedDoctors.length - visibleCount) {
        // ვაყენებთ ინდექსს პირველი სექციის დასაწყისში
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(orderedDoctors.length)
        }, 0)
        return extendedDoctors.length - visibleCount
      }

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)

      return newIndex
    })
  }

  // სენსორული ჟესტების მხარდაჭერა
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 50) {
      // თუ ებრაულია, ვაბრუნებთ მიმართულებას
      if (isHebrew) {
        if (diff > 0) {
          goPrev()
        } else {
          goNext()
        }
      } else {
        if (diff > 0) {
          goNext()
        } else {
          goPrev()
        }
      }
    }
  }

  // ავტომატური სლაიდინგი
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goNext()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex, visibleCount, isTransitioning])

  return (
    <div className="max-w-5xl mx-auto py-10 relative" ref={containerRef}>
      <style jsx global>{`
        /* სურათის კონტეინერის სტილები */
        .doctor-image-container {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f3f4f6;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
        }
        
        .doctor-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease-in-out;
        }
        
        .doctor-image:hover {
          transform: scale(1.1);
        }
        
        /* ტექსტის სტილები */
        .doctor-name {
          width: 100%;
          text-align: center;
          font-weight: 600;
          letter-spacing: 1.7px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
          font-size: 1.125rem;
          line-height: 1.5;
        }
        
        .doctor-specialty {
          width: 100%;
          text-align: center;
          color: #4b5563;
          letter-spacing: 1.4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        
        /* კარუსელის სტილები */
        .doctors-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 438px;
          padding: 41px 0;
          position: relative;
          overflow: hidden;
        }
        
        .doctors-container {
          display: flex;
          transition: transform 0.5s ease;
          width: 100%;
        }
        
        .doctor-slide {
          flex: 0 0 calc(100% / var(--visible-count));
          max-width: calc(100% / var(--visible-count));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
        }
        
        /* პაგინაციის სტილები */
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        
        .pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1d5db;
          margin: 0 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .pagination-bullet-active {
          background-color: #0066cc;
        }
        
        /* ნავიგაციის ღილაკების სტილები */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .nav-button svg {
          width: 16px;
          height: 16px;
          color: #0066cc;
        }
        
        .nav-prev {
          left: 10px;
        }
        
        .nav-next {
          right: 10px;
        }
        
        /* ებრაულისთვის ღილაკების პოზიციები */
        html[dir="rtl"] .nav-prev {
          left: auto;
          right: 10px;
        }
        
        html[dir="rtl"] .nav-next {
          right: auto;
          left: 10px;
        }
      `}</style>

      <h2 className="text-center text-2xl ponomar-regular font-bold mb-6 tracking-[.25em]">
        {translations?.doctors?.title || "ექიმები"}
      </h2>

      {/* ნავიგაციის ღილაკები */}
      <button className="nav-button nav-prev" onClick={goPrev}>
        {isHebrew ? <ChevronRight /> : <ChevronLeft />}
      </button>

      <button className="nav-button nav-next" onClick={goNext}>
        {isHebrew ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* კარუსელი */}
      <div
        className="doctors-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ direction: isHebrew ? "rtl" : "ltr" }}
      >
        <div
          className="doctors-container"
          style={{
            "--visible-count": visibleCount,
            transform: `translateX(${isHebrew ? "" : "-"}${currentIndex * (100 / visibleCount)}%)`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
        >
          {extendedDoctors.map((doctor, index) => (
            <div key={index} className="doctor-slide">
              <div className="doctor-image-container">
                <img
                  src={doctor.image || "/placeholder.svg?height=240&width=240"}
                  alt={doctor.name}
                  className="doctor-image"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=240&width=240"
                  }}
                />
              </div>
              <div className="mt-4 w-full">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* პაგინაცია */}
      <div className="pagination">
        {Array.from({ length: orderedDoctors.length }).map((_, index) => (
          <div
            key={index}
            className={`pagination-bullet ${
              currentIndex >= orderedDoctors.length &&
              currentIndex < orderedDoctors.length * 2 &&
              index === currentIndex - orderedDoctors.length
                ? "pagination-bullet-active"
                : ""
            }`}
            onClick={() => {
              setIsTransitioning(true)
              setCurrentIndex(index + orderedDoctors.length)
              setTimeout(() => {
                setIsTransitioning(false)
              }, 500)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default DoctorsCarousel
