"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

// Slider configuration kept in one place for easy tuning
const sliderConfig = {
  interval: 6000, // 6 seconds autoplay
  transition: 0.8, // seconds for fade/slide
}

const slides = [
  {
    id: 1,
    title: "SONiC Datacenter Networking",
    subtitle:
      "Disaggregated, high-performance fabrics with enterprise-grade observability and automation.",
    image: "/images/slider1.svg",
  },
  {
    id: 2,
    title: "Multi-Cloud & Infrastructure Automation",
    subtitle:
      "End-to-end automation, zero-touch provisioning, and IaC pipelines for modern cloud networks.",
    image: "/images/slider2.svg",
  },
  {
    id: 3,
    title: "AI-Ready High-Performance Fabrics",
    subtitle:
      "Ultra-low latency, RoCE-optimized designs to power AI/ML workloads at scale.",
    image: "/images/slider3.svg",
  },
]

export function HomeSlider({ className }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const goToSlide = useCallback(
    (index) => {
      const nextIndex = (index + slides.length) % slides.length
      setActiveIndex(nextIndex)
    },
    [setActiveIndex]
  )

  const nextSlide = useCallback(() => goToSlide(activeIndex + 1), [activeIndex, goToSlide])
  const prevSlide = useCallback(() => goToSlide(activeIndex - 1), [activeIndex, goToSlide])

  // Autoplay
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, sliderConfig.interval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [nextSlide, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [nextSlide, prevSlide])

  return (
    <section
      className={cn(
        "relative w-screen h-[50vh] md:h-[60vh] lg:h-[75vh] overflow-hidden",
        "bg-gradient-to-r from-[#050B18] via-[#0A1734] to-[#050B18]",
        className
      )}
      aria-label="Homepage hero slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slides[activeIndex].id}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: sliderConfig.transition, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            <Image
              src={slides[activeIndex].image}
              alt={slides[activeIndex].title}
              fill
              className="object-cover"
              priority={activeIndex === 0}
              sizes="100vw"
            />
            {/* Dark cyber gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050B18]/90 via-[#0A1734]/75 to-[#050B18]/70" />
          </div>

          <div className="relative z-10 h-full w-full">
            <div className="container-custom h-full">
              <div className="flex h-full items-center">
                <div className="max-w-2xl bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-900/30">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-light mb-4">
                    PalC Networks • Future-ready Infrastructure
                  </p>
                  <motion.h1
                    key={`title-${slides[activeIndex].id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4"
                  >
                    {slides[activeIndex].title}
                  </motion.h1>
                  <motion.p
                    key={`subtitle-${slides[activeIndex].id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg text-gray-200/90 leading-relaxed mb-6"
                  >
                    {slides[activeIndex].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                    >
                      <Link href="/solutions" aria-label="Explore Solutions">
                        Explore Solutions
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8">
        <Button
          aria-label="Previous slide"
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="pointer-events-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-primary/30 transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Button>
        <Button
          aria-label="Next slide"
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="pointer-events-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-lg hover:shadow-primary/30 transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={slide.id}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className="relative h-2 w-10 rounded-full bg-white/20 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-primary to-primary-light transition-all duration-500",
                  isActive ? "w-full" : "w-0 group-hover:w-1/2"
                )}
                style={{ transitionDuration: isActive ? `${sliderConfig.interval}ms` : "300ms" }}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

