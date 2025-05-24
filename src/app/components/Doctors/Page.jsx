"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { dentistsByLanguage } from "../../js/doctors"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"

const DoctorsCarousel = () => {
  const { translations, currentLanguage } = useLanguage()
  const doctors = dentistsByLanguage[currentLanguage] || dentistsByLanguage.ka
  const isRTL = currentLanguage === "he" || currentLanguage === "ar"
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const transitionTimeoutRef = useRef(null)
  const autoplayIntervalRef = useRef(null)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      easing: "ease-out-cubic",
    })
  }, [])

  // Filter unique doctors
  const uniqueDoctors = doctors.filter(
    (doctor, index, self) =>
      index ===
      self.findIndex(
        (d) => d.image === doctor.image && d.name.toLowerCase().trim() === doctor.name.toLowerCase().trim(),
      ),
  )

  // Don't reverse for RTL - handle in transform instead
  const orderedDoctors = uniqueDoctors

  // Create extended array for infinite carousel
  const extendedDoctors = [...orderedDoctors, ...orderedDoctors, ...orderedDoctors]

  // Calculate visible count
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 640) return 2
      return 1
    }
    return 3
  }

  const [visibleCount, setVisibleCount] = useState(3)

  // Update visible count on resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }

    setVisibleCount(getVisibleCount())
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Set initial index to center section
  useEffect(() => {
    setCurrentIndex(orderedDoctors.length)
  }, [orderedDoctors.length])

  // Clean up timeouts and intervals on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [])

  // Get the correct doctor ID based on the doctor object
  const getCorrectDoctorId = (doctor) => {
    // Use the doctor's ID if it exists
    if (doctor.id) {
      return doctor.id
    }

    // Fallback: specific ID mappings for Ana and Eli based on name
    if (
      doctor.name.toLowerCase().includes("ანა") ||
      doctor.name.toLowerCase().includes("ana") ||
      doctor.name.toLowerCase().includes("პაჭკორია") ||
      doctor.name.toLowerCase().includes("patchkoria")
    ) {
      return 4
    }

    if (
      doctor.name.toLowerCase().includes("ელი") ||
      doctor.name.toLowerCase().includes("eli") ||
      doctor.name.toLowerCase().includes("კასრელიშვილი") ||
      doctor.name.toLowerCase().includes("kasrelishvili")
    ) {
      return 3
    }

    if (
      doctor.name.toLowerCase().includes("თენგო") ||
      doctor.name.toLowerCase().includes("tengo") ||
      doctor.name.toLowerCase().includes("შიმშილაშვილი") ||
      doctor.name.toLowerCase().includes("shimshilashvili")
    ) {
      return 2
    }

    if (
      doctor.name.toLowerCase().includes("გაბრიელ") ||
      doctor.name.toLowerCase().includes("gabriel") ||
      doctor.name.toLowerCase().includes("ჯანაშვილი") ||
      doctor.name.toLowerCase().includes("janashvili")
    ) {
      return 1
    }

    // Default fallback
    return 1
  }

  // Reset transition state safely
  const safelyResetTransition = (delay = 500) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      transitionTimeoutRef.current = null
    }, delay)
  }

  // Smooth infinite loop reset
  const smoothResetToPosition = (targetIndex, delay = 600) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        setCurrentIndex(targetIndex)
      })
      transitionTimeoutRef.current = null
    }, delay)
  }

  // Navigation functions - Improved infinite loop
  const goPrev = () => {
    if (isTransitioning) return

    // Pause autoplay temporarily when manually navigating
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1

      // Check if we need to wrap around
      if (newIndex < orderedDoctors.length) {
        // We're approaching the beginning, smoothly reset to end of middle section
        smoothResetToPosition(orderedDoctors.length * 2 - 1)
        return newIndex
      }

      safelyResetTransition()
      return newIndex
    })
  }

  const goNext = () => {
    if (isTransitioning) return

    // Pause autoplay temporarily when manually navigating
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1

      // Check if we need to wrap around
      if (newIndex >= orderedDoctors.length * 2) {
        // We're approaching the end, smoothly reset to beginning of middle section
        smoothResetToPosition(orderedDoctors.length)
        return newIndex
      }

      safelyResetTransition()
      return newIndex
    })
  }

  // Touch gestures - Fixed for RTL
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
    // Pause autoplay during touch
    setIsPaused(true)
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        goNext()
      } else {
        // Swiped right
        goPrev()
      }
    }

    // Resume autoplay after touch with delay
    setTimeout(() => setIsPaused(false), 3000)
  }

  // Auto-sliding - improved stability
  useEffect(() => {
    // Clear any existing interval
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
    }

    // Set up new interval
    autoplayIntervalRef.current = setInterval(() => {
      if (!isTransitioning && hoveredIndex === null && !isPaused) {
        goNext()
      }
    }, 3000)

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [isTransitioning, hoveredIndex, isPaused])

  // Refresh AOS when slide changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.refresh()
    }
  }, [currentIndex])

  // Calculate transform value for RTL
  const getTransformValue = () => {
    const baseTransform = currentIndex * (100 / visibleCount)
    return isRTL ? baseTransform : -baseTransform
  }

  // Calculate active pagination bullet index - Improved
  const getActiveBulletIndex = () => {
    // Normalize the current index to the original doctors array
    const normalizedIndex = currentIndex % orderedDoctors.length
    return normalizedIndex
  }

  // Handle pagination click with smooth transition
  const handlePaginationClick = (index) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Calculate the target index in the middle section
    const targetIndex = index + orderedDoctors.length
    setCurrentIndex(targetIndex)

    safelyResetTransition()

    // Pause autoplay temporarily
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto py-12 relative" ref={containerRef} data-aos="fade-up">
      <style jsx global>{`
        .doctor-image-container {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          border: 4px solid #ffffff;
          transition: all 0.3s ease;
        }
        
        .doctor-image-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }
        
        .doctor-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s ease;
        }
        
        .doctor-image:hover {
          transform: scale(1.05);
        }
        
        .doctor-name {
          width: 100%;
          text-align: center;
          font-weight: 700;
          letter-spacing: 0.5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
          font-size: 1.2rem;
          line-height: 1.4;
          color: #1e293b;
          margin-bottom: 4px;
        }
        
        .doctor-specialty {
          width: 100%;
          text-align: center;
          color: #64748b;
          letter-spacing: 0.3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
          font-size: 0.95rem;
          line-height: 1.4;
          font-weight: 500;
        }
        
        .doctors-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 40px 0;
          position: relative;
          overflow: hidden;
        }
        
        .doctors-container {
          display: flex;
          width: 100%;
        }
        
        .doctors-container-smooth {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .doctors-container-instant {
          transition: none;
        }
        
        .doctor-slide {
          flex: 0 0 calc(100% / var(--visible-count));
          max-width: calc(100% / var(--visible-count));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .doctor-slide:hover {
          transform: scale(1.02);
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          gap: 8px;
        }
        
        .pagination-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .pagination-bullet:hover {
          background-color: #94a3b8;
          transform: scale(1.2);
        }
        
        .pagination-bullet-active {
          background-color: #3b82f6;
          transform: scale(1.3);
        }
        
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #e2e8f0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-button:hover {
          background-color: #3b82f6;
          border-color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
        }
        
        .nav-button:hover svg {
          color: white;
        }
        
        .nav-button svg {
          width: 20px;
          height: 20px;
          color: #3b82f6;
          transition: color 0.3s ease;
        }
      `}</style>

      <h2 className="text-center text-slate-800 text-3xl font-bold mb-8 tracking-wide" data-aos="zoom-in">
        {translations?.doctors?.title || "ექიმები"}
      </h2>

      {/* Navigation buttons - Fixed positioning for RTL */}
      <button
        className="nav-button"
        onClick={goPrev}
        data-aos="fade-right"
        data-aos-delay="100"
        style={{
          position: "absolute",
          top: "271px",
          [isRTL ? "right" : "left"]: "12px",
        }}
        aria-label={isRTL ? "Next" : "Previous"}
      >
        {isRTL ? <ChevronRight /> : <ChevronLeft />}
      </button>

      <button
        className="nav-button"
        onClick={goNext}
        data-aos="fade-left"
        data-aos-delay="100"
        style={{
          position: "absolute",
          top: "271px",
          [isRTL ? "left" : "right"]: "12px",
        }}
        aria-label={isRTL ? "Previous" : "Next"}
      >
        {isRTL ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Carousel */}
      <div
        className="doctors-carousel relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div
          className={`doctors-container ${isTransitioning ? "doctors-container-smooth" : "doctors-container-instant"}`}
          style={{
            "--visible-count": visibleCount,
            transform: `translateX(${getTransformValue()}%)`,
          }}
        >
          {extendedDoctors.map((doctor, index) => (
            <Link
              key={index}
              href={`/doctors_vip/${getCorrectDoctorId(doctor)}`}
              className="doctor-slide"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="zoom-in"
              data-aos-delay={200 + (index % visibleCount) * 100}
            >
              <div className="doctor-image-container">
                <img
                  src={doctor.image || "/placeholder.svg?height=220&width=220&query=doctor portrait"}
                  alt={doctor.name}
                  className="doctor-image"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/doctor-portrait.png"
                  }}
                />
              </div>
              <div className="mt-6 w-full">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">
                  {Array.isArray(doctor.specialties) ? doctor.specialties.join(", ") : doctor.specialty}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination - Improved */}
      <div className="pagination" data-aos="fade-up" data-aos-delay="300">
        {Array.from({ length: orderedDoctors.length }).map((_, index) => {
          const isActive = index === getActiveBulletIndex()
          return (
            <div
              key={index}
              className={`pagination-bullet ${isActive ? "pagination-bullet-active" : ""}`}
              onClick={() => handlePaginationClick(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DoctorsCarousel
