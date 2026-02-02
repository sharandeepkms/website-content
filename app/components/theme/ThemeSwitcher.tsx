"use client"

import React, { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

interface ThemeSwitcherProps {
  className?: string
  variant?: 'button' | 'dropdown'
}

export function ThemeSwitcher({ className, variant = 'button' }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const effectiveTheme = theme === 'system' ? systemTheme : theme

    root.classList.remove('light', 'dark')
    root.classList.add(effectiveTheme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={className} disabled>
        <Sun className="w-5 h-5" />
      </Button>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn("relative", className)}>
        <div className="flex flex-col gap-1 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
          <button
            onClick={() => handleThemeChange('light')}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === 'light'
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            <Sun className="w-4 h-4" />
            <span>Light</span>
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === 'dark'
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            <Moon className="w-4 h-4" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === 'system'
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            <Monitor className="w-4 h-4" />
            <span>System</span>
          </button>
        </div>
      </div>
    )
  }

  // Button variant - cycles through themes
  const getIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />
    if (theme === 'dark') return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className={className}
      aria-label="Toggle theme"
    >
      {getIcon()}
    </Button>
  )
}

