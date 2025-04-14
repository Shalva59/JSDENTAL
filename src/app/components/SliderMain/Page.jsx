"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

// Slider data
const slides = [
  {
    id: 1,
    image: "https://www.yourdentistryguide.com/wp-content/uploads/2017/11/kids-dentistry-min.jpg",
    title: "JC DENTAL",
    subtitle: "სტომატოლოგიური კლინიკა",
    buttonText: "ნახეთ მეტი",
    buttonUrl: "#",
  },
  {
    id: 2,
    image: "https://healthcare.trainingleader.com/wp-content/uploads/2017/09/dentist-teeth.jpg",
    title: "JC DENTAL",
    subtitle: "სტომატოლოგიური კლინიკა",
    buttonText: "ნახეთ მეტი",
    buttonUrl: "#",
  },
  {
    id: 3,
    image: "https://familydentalcareindore.com/wp-content/uploads/2013/08/Family-Dental-Care-Indore.jpg",
    title: "JC DENTAL",
    subtitle: "სტომატოლოგიური კლინიკა",
    buttonText: "ნახეთ მეტი",
    buttonUrl: "#",
  },
]

// Custom Button component
const Button = ({ className, onClick, children, asChild, href, variant, size, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    icon: "h-10 w-10 p-0",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  }

  const styles = `${baseStyles} ${variantStyles[variant || "default"]} ${sizeStyles[size || "default"]} ${className || ""}`

  if (asChild && href) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={styles} onClick={onClick} type="button" {...props}>
      {children}
    </button>
  )
}

// Icon components
const ChevronLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const Sparkles = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.2 1.2L3 12l5.9 1.9a2 2 0 0 1 1.2 1.2L12 21l1.9-5.9a2 2 0 0 1 1.2-1.2L21 12l-5.9-1.9a2 2 0 0 1-1.2-1.2L12 3Z" />
  </svg>
)

const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// Main slider component
export default function DentalSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [prevIndex, setPrevIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  )

  const scrollTo = useCallback(
    (index) => {
      if (!emblaApi) return

      // Determine direction
      const currentIndex = emblaApi.selectedScrollSnap()
      const dir = index > currentIndex ? 1 : -1

      setDirection(dir)
      setPrevIndex(currentIndex)
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return

    const newIndex = emblaApi.selectedScrollSnap()
    if (newIndex !== selectedIndex) {
      // Determine direction based on index change
      const dir = newIndex > prevIndex ? 1 : -1
      setDirection(dir)
      setPrevIndex(selectedIndex)
      setSelectedIndex(newIndex)
    }
  }, [emblaApi, prevIndex, selectedIndex])

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    setDirection(-1)
    setPrevIndex(selectedIndex)
    emblaApi.scrollPrev()
  }, [emblaApi, selectedIndex])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    setDirection(1)
    setPrevIndex(selectedIndex)
    emblaApi.scrollNext()
  }, [emblaApi, selectedIndex])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative mt-[-10px] w-full">
      <div className="relative h-[400px] overflow-hidden md:h-[580px]" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex min-w-0 flex-[0_0_100%] flex-col items-start justify-end">
              {/* Background Image with Animation */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: index === selectedIndex ? 1.05 : 1 }}
                  transition={{ duration: 6 }}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                  {/* Animated Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: index === selectedIndex ? 0.7 : 0.5 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              </div>

              {/* Content with Animations */}
              {index === selectedIndex && (
                <div className="relative z-10 w-full p-8 md:p-12 lg:p-16">
                  <motion.div
                    className="max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      className="mb-2 flex items-center gap-2"
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      variants={contentVariants}
                    >
                      <motion.div
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Sparkles className="h-5 w-5 text-teal-300" />
                      </motion.div>
                      <h2 className="text-3xl font-bold tracking-wider text-white">{slide.title}</h2>
                    </motion.div>

                    <motion.p
                      className="mb-6 text-lg font-medium tracking-wider text-teal-50"
                      initial="hidden"
                      animate="visible"
                      custom={1}
                      variants={contentVariants}
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      className="mb-4 flex gap-1"
                      initial="hidden"
                      animate="visible"
                      custom={2}
                      variants={contentVariants}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + star * 0.1 }}
                        >
                          <Star className="h-4 w-4 fill-teal-300 text-teal-300" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" custom={3} variants={contentVariants}>
                      <Button
                        className="group relative overflow-hidden bg-teal-600 text-white hover:bg-teal-700"
                        asChild
                        href={slide.buttonUrl}
                      >
                        <motion.span
                          className="absolute inset-0 bg-white"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                          style={{ opacity: 0.2 }}
                        />
                        {slide.buttonText}
                        <motion.svg
                          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </motion.svg>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animated Navigation Buttons */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white"
          onClick={scrollPrev}
          aria-label="წინა სლაიდი"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white"
          onClick={scrollNext}
          aria-label="შემდეგი სლაიდი"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Animated Dots Navigation */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {scrollSnaps.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2.5 rounded-full transition-all ${
              selectedIndex === index ? "bg-teal-400 w-8" : "bg-white/50 hover:bg-white/80 w-2.5"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`სლაიდი ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={selectedIndex === index ? { scale: [1, 1.2, 1] } : {}}
            transition={selectedIndex === index ? { duration: 0.5 } : {}}
          />
        ))}
      </motion.div>

      {/* Animated Floating Elements */}
      <AnimatePresence>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute z-10 hidden rounded-full bg-teal-500/20 backdrop-blur-md md:block"
            style={{
              width: 20 + i * 15,
              height: 20 + i * 15,
              top: `${20 + i * 25}%`,
              right: `${5 + i * 10}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 0.6,
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              y: { repeat: Number.POSITIVE_INFINITY, duration: 3 + i, repeatType: "reverse" },
              x: { repeat: Number.POSITIVE_INFINITY, duration: 5 + i, repeatType: "reverse" },
              opacity: { duration: 1, delay: 0.5 + i * 0.2 },
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
