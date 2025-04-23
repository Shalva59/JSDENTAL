"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(Math.max(x, 0), 100))
  }

  const handleTouchMove = (e) => {
    if (!containerRef.current) return

    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(Math.max(x, 0), 100))
  }

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0">
        <img src={beforeImage || "/placeholder.svg"} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">{beforeLabel}</div>
      </div>

      {/* After image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <img
          src={afterImage || "/placeholder.svg"}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%` }}
        />
        <div className="absolute top-3 right-3 bg-blue-600/90 text-white text-xs px-2 py-1 rounded">{afterLabel}</div>
      </div>

      {/* Slider handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize" style={{ left: `${sliderPosition}%` }}>
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex items-center justify-center">
            <div className="w-1 h-5 bg-gray-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
