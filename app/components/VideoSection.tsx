'use client'

import React, { useState } from 'react'
import { Play, Pause, Zap, Shield, Layers, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { getImageSrc } from '@/app/utils/image-path'

interface Video {
  title: string
  description?: string
  vimeoId?: string
  youtubeId?: string
  thumbnail?: string
  duration?: string
}

interface VideoSectionProps {
  title?: string
  subtitle?: string
  videos: Video[]
  className?: string
  sectionTag?: string
  highlights?: { icon: React.ElementType; text: string }[]
  featuredImage?: string
}

const defaultHighlights = [
  { icon: Zap, text: 'High-performance architecture' },
  { icon: Shield, text: 'Enterprise-grade reliability' },
  { icon: Layers, text: 'Modular & scalable design' },
]

export function VideoSection({
  title = 'See It In Action',
  subtitle = 'Watch how our solutions work in real-world environments.',
  videos,
  className,
  sectionTag = 'Video Resources',
  highlights = defaultHighlights,
  featuredImage = '/images/services/ip-networking/whitebox-networking-thumbnail.jpg',
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const video = videos[0]

  const getEmbedUrl = (video: Video, autoplay: boolean = true): string => {
    if (video.vimeoId) {
      return `https://player.vimeo.com/video/${video.vimeoId}?${autoplay ? 'autoplay=1&' : ''}title=0&byline=0&portrait=0&dnt=1`
    }
    if (video.youtubeId) {
      return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${autoplay ? 'autoplay=1&' : ''}rel=0`
    }
    return ''
  }

  if (!video) return null

  return (
    <section className={cn('relative py-16 md:py-20 overflow-hidden', className)}>
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1a] to-[#020617]">
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Top/Bottom Borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {sectionTag}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15] tracking-tight">
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-gradient-cyan">{title.split(' ').slice(-1)}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-md">
              {subtitle}
            </p>

            {/* Highlights - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium leading-tight">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {/* Main Video Card */}
              <div className="relative group">
                {/* Glow Effect */}
                <div className={cn(
                  "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/50 via-cyan-500/50 to-primary/50 opacity-0 blur-lg transition-all duration-500",
                  (isHovered || isPlaying) && "opacity-40"
                )} />
                
                {/* Card Frame */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl shadow-black/50">
                  {/* Video Area */}
                  <div className="relative aspect-video">
                    {!isPlaying ? (
                      <>
                        {/* Featured Image */}
                        <div className="absolute inset-0">
                          <Image
                            src={getImageSrc(video.thumbnail || featuredImage, true)}
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          {/* Gradient Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/5" />
                        </div>

                        {/* Play Button */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                          onClick={() => setIsPlaying(true)}
                        >
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {/* Outer Ring */}
                            <div className="absolute inset-0 -m-6 rounded-full border border-white/20 animate-pulse" />
                            <div className="absolute inset-0 -m-3 rounded-full border border-white/30" />
                            
                            {/* Button */}
                            <button
                              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                              aria-label={`Play ${video.title}`}
                            >
                              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/30" />
                              <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/40" />
                              <Play className="relative w-6 h-6 md:w-8 md:h-8 text-white ml-0.5" fill="currentColor" />
                            </button>
                          </motion.div>
                        </div>

                        {/* Video Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                          <div className="flex items-end justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="text-base md:text-lg font-semibold text-white mb-0.5 truncate">
                                {video.title}
                              </h3>
                              {video.description && (
                                <p className="text-xs md:text-sm text-gray-400 line-clamp-1">
                                  {video.description}
                                </p>
                              )}
                            </div>
                            {video.duration && (
                              <div className="flex-shrink-0 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                                <span className="text-xs font-medium text-white">{video.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-primary/60 rounded-tl-md opacity-60" />
                        <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-cyan-500/60 rounded-tr-md opacity-60" />
                      </>
                    ) : (
                      <>
                        {/* Video Player */}
                        <iframe
                          src={getEmbedUrl(video, true)}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={video.title}
                        />
                        
                        {/* Close Button */}
                        <button
                          onClick={() => setIsPlaying(false)}
                          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-sm transition-all"
                          aria-label="Close video"
                        >
                          <Pause className="w-4 h-4 text-white" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
