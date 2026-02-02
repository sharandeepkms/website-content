"use client"

import React, { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { getImageSrc } from "@/app/utils/image-path"

type Slide = {
  id: number
  category: string
  title: string
  subtitle: string
  image: string
  eyebrow?: string
  href?: string
}

// Slider configuration in one place for easy tuning
const SLIDER_CONFIG = {
  interval: 7500, // 7.5s autoplay for longer reading
  transition: 0.8, // seconds for fade/slide
}

// Helper to get PNG image path
const getSliderImage = (index: number): string => {
  return `/images/slider-${index + 1}.png`
}

const slides: Slide[] = [
  {
    id: 1,
    category: "SONiC & Open Networking",
    eyebrow: "SONiC • Production-Grade • Scale",
    title: "SONiC Experts for Production Networks",
    subtitle:
      "We help organizations design, deploy, and operate SONiC-based networks that work reliably in real-world, multi-vendor environments.",
    image: getSliderImage(0),
    href: "/solutions/sonic-open-networking",
  },
  {
    id: 2,
    category: "AI Infrastructure",
    eyebrow: "AI Platforms • High-Performance • Scale",
    title: "Networking Built for AI Platforms",
    subtitle:
      "We design and integrate network architectures that support AI workloads, large-scale compute clusters, and data-intensive pipelines with predictable performance.",
    image: getSliderImage(1),
    href: "/solutions/data-center-modernization-ai-fabrics",
  },
  {
    id: 3,
    category: "Data Center Modernization",
    eyebrow: "Modernization • Open Architectures • Evolution",
    title: "Modern Data Center Networks, Built to Evolve",
    subtitle:
      "We modernize data center and network infrastructure using open architectures, observability, and automation designed for long-term operations.",
    image: getSliderImage(2),
    href: "/solutions/data-center-modernization-ai-fabrics",
  },
]

export function HomeSlider({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Memoize image paths to prevent recalculation
  const imagePaths = useMemo(() => {
    return slides.map(slide => getImageSrc(slide.image, true))
  }, [])
  
  // Preload all slider images on mount
  useEffect(() => {
    if (!isMounted) return
    
    // Preload all images to ensure they're cached
    // Use Image objects for preloading (simpler and matches Next.js Image behavior)
    imagePaths.forEach((src) => {
      const img = new window.Image()
      img.src = src
      // Don't set crossOrigin - these are same-origin images
    })
  }, [isMounted, imagePaths])

  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + slides.length) % slides.length
    setActiveIndex(nextIndex)
    setProgress(0) // Reset progress on slide change
    // Don't pause on click - let it continue normally
  }, [])

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % slides.length
      setProgress(0) // Reset progress on slide change
      return nextIndex
    })
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const nextIndex = (prev - 1 + slides.length) % slides.length
      setProgress(0) // Reset progress on slide change
      return nextIndex
    })
  }, [])

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Progress animation - animates from 0 to 100% over the interval duration
  useEffect(() => {
    if (!isMounted || isPaused) {
      setProgress(0)
      return
    }

    let animationFrameId: number | null = null
    let isCancelled = false
    
    const startTime = Date.now()
    const updateProgress = () => {
      if (isPaused || isCancelled) return
      
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / SLIDER_CONFIG.interval) * 100, 100)
      
      setProgress(newProgress)
      
      if (newProgress < 100 && !isCancelled) {
        animationFrameId = requestAnimationFrame(updateProgress)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)
    return () => {
      isCancelled = true
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [activeIndex, isMounted, isPaused])

  // Autoplay
  useEffect(() => {
    if (isPaused || !isMounted) return
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % slides.length
        setProgress(0) // Reset progress on slide change
        return nextIndex
      })
    }, SLIDER_CONFIG.interval)
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, isMounted])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % slides.length
          setProgress(0)
          return nextIndex
        })
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          const nextIndex = (prev - 1 + slides.length) % slides.length
          setProgress(0)
          return nextIndex
        })
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <section
      className={cn(
        "relative w-full max-w-full h-screen md:h-[85vh] lg:h-screen min-h-[600px] md:min-h-[80vh] overflow-hidden pt-12 md:pt-0",
        "bg-[#05060A] bg-gradient-to-r from-[#050B18] via-[#05060A] to-[#02030A]",
        className
      )}
      aria-label="Homepage hero slider"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(64,116,255,0.15),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(0,255,209,0.12),transparent_35%)]" />

      {/* Slides Content */}
      <div className="relative z-10 h-full w-full max-w-full flex items-center">
        <div className="container-custom h-full max-w-full w-full">
          <div className="grid h-full items-center justify-items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 min-w-0 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
            {/* Text + CTA - flexible height, content fully visible */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slides[activeIndex].id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: SLIDER_CONFIG.transition, ease: "easeInOut" }}
                className="w-full space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight break-words">
                  {slides[activeIndex].title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-xl break-words">
                  {slides[activeIndex].subtitle}
                </p>
                <div className="pt-2 sm:pt-3 md:pt-4 flex-shrink-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
                  >
                    <Link href="/contact" aria-label="Talk to an Infrastructure Expert">
                      Talk to an Infrastructure Expert
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Image - full height */}
            <div className="relative w-full h-full max-w-full min-w-0 flex items-center justify-center">
              <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#05060A]">
                {slides.map((slide, idx) => (
                  <Image
                    key={slide.id}
                    src={imagePaths[idx]}
                    alt={slide.title}
                    fill
                    className={cn(
                      "object-contain object-center md:object-right transition-opacity duration-500",
                      idx === activeIndex ? "opacity-100 relative z-10" : "opacity-0 absolute pointer-events-none"
                    )}
                    priority={idx === 0}
                    sizes="50vw"
                    loading={idx === 0 ? "eager" : "lazy"}
                    unoptimized={true}
                    quality={100}
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent && !parent.querySelector('.bg-gradient-primary')) {
                        const fallback = document.createElement('div')
                        fallback.className = 'w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-cyan/20 rounded-[24px] md:rounded-[32px]'
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category bar - compact height, pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="container-custom pointer-events-auto">
          {/* Mobile: compact dots */}
          <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-2 no-scrollbar px-2 justify-center max-w-full">
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  onMouseEnter={() => {
                    if (isActive) {
                      setIsPaused(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (isActive) {
                      setIsPaused(false)
                    }
                  }}
                  className={cn(
                    "flex-1 basis-1/5 max-w-[20%] min-w-0 h-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg",
                    "hover:border-primary/60 hover:bg-white/10 transition",
                    isActive && "border-primary/80 shadow-[0_8px_30px_rgba(0,255,180,0.18)]"
                  )}
                >
                  <span
                    className={cn(
                      "block h-full rounded-full bg-gradient-to-r from-primary to-primary-light",
                      !isActive && "w-0 group-hover:w-2/3 transition-all duration-300"
                    )}
                    style={isActive ? { 
                      width: `${isMounted ? progress : 0}%`
                    } : {}}
                  />
                </button>
              )
            })}
          </div>

          {/* Desktop / tablet: compact grid - 3 columns */}
          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-5xl mx-auto pb-3">
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  onMouseEnter={() => {
                    if (isActive) {
                      setIsPaused(true)
                    }
                  }}
                  onMouseLeave={() => {
                    if (isActive) {
                      setIsPaused(false)
                    }
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg",
                    "hover:border-primary/60 hover:bg-white/10 transition",
                    isActive && "border-primary/80 shadow-[0_8px_30px_rgba(0,255,180,0.18)]"
                  )}
                >
                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-300 leading-tight">{slide.category}</p>
                  <div className="mt-0.5 h-1 rounded-full bg-white/10 overflow-hidden">
                    <span
                      className={cn(
                        "block h-full bg-gradient-to-r from-primary to-primary-light",
                        !isActive && "w-0 group-hover:w-2/3 transition-all duration-300"
                      )}
                      style={isActive ? { 
                        width: `${isMounted ? progress : 0}%`
                      } : {}}
                    />
                  </div>
                  <p className="mt-0.5 text-[10px] text-white/70 leading-tight line-clamp-1">{slide.title}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
