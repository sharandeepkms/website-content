"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { LeadCaptureModal } from './LeadCaptureModal'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Building2,
  Globe
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Logo } from './Logo'
import { getApiUrl } from '@/lib/api-utils'

const footerSections = [
  {
    title: 'Solutions',
    links: [
      { name: 'SONiC & Open Networking', href: '/solutions/sonic-open-networking' },
      { name: 'Data Center Modernization & AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
      { name: 'Cloud & Hybrid Cloud', href: '/solutions/cloud-hybrid-cloud' },
      { name: 'Network Observability & Visibility', href: '/solutions/network-observability-visibility' },
      { name: 'Telecom & Edge (TIP / O-RAN / 5G)', href: '/solutions/telecom-edge' },
      { name: 'Identity & Access Management', href: '/solutions/identity-access-management' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Networking Engineering', href: '/services/networking-engineering' },
      { name: 'Software & Platform Engineering', href: '/services/software-platform-engineering' },
      { name: 'Protocol & System Development', href: '/services/protocol-system-development' },
      { name: 'Automation & Tooling', href: '/services/automation-tooling' },
      { name: 'AI/ML Engineering', href: '/services/ai-ml-engineering' },
      { name: 'Professional & Lifecycle Services', href: '/services/professional-lifecycle-services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Events', href: '/resources/events' },
      { name: 'Blog', href: '/resources/blog' },
      { name: 'Case Studies', href: '/resources/case-studies' },
      { name: 'Whitepapers', href: '/resources/whitepapers' },
      { name: 'Documentation', href: '/resources/documentation' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Industry Associations', href: '/company/industry-associations' },
      { name: 'Careers', href: '/careers' },
      { name: 'Executive Team', href: '/company/executive-team' },
      { name: 'Contact', href: '/contact' },
      { name: 'Leadership Team', href: '/about#leadership' },
      { name: 'Partners', href: '/about#partners' },
    ],
  },
]

const XIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 "
    fill="currentColor"
  >
    <title>X</title>
    <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
  </svg>
)

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/palcnetworks' },
  { name: 'X', icon: XIcon, href: 'https://twitter.com/palcnetworks' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@palcnetworks' },
]

// Custom landmark icons for each city - using provided SVGs with cyan outline styling
const SanJoseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" className="w-8 h-8">
    <style>{`.st1{fill:none;stroke:#00C2FF;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;}`}</style>
    <path className="st1" d="M8.4,49.5c11.9,0,23.7,0,35.6,0c0.7,0,1.3-0.5,1.3-1.2c0.1-0.7-0.7-0.9-0.8-1.4c-0.1-0.7,0.1-1.4,0-2.1 c-0.1-0.5-0.5-1.1-1-1.1c-0.9-0.1-1.9,0-2.8,0c0-1.5,0-3.1,0-4.6c0-0.3,0-0.7-0.2-1c-0.6-0.2-1.2-0.1-1.8-0.2c-0.1-2.6,0-5.2,0-7.8 c0-0.5,0.7-0.7,0.7-1.2c0.1-1.2,0.1-2.4,0-3.5c-0.1-0.8-1-1-1.6-1.2c-0.1-1.9-0.4-4-1.4-5.7c-1.5-2.7-4.5-4.2-7.4-4.8 c-0.1-1.3,0.1-2.6-0.1-3.9c-0.2-0.9-1.2-1-1.9-1.3c-0.1-1.2,0-2.4-0.3-3.6c-0.2-0.8,0-1.5,0-2.3c0-0.8-1-1.4-1.6-0.8 c-0.9,0.7-0.4,1.8-0.5,2.7c-0.3,1.3-0.3,2.7-0.3,4.1c-0.7,0.2-1.7,0.3-2,1.1c-0.2,1.3,0,2.6-0.1,4C20,14.2,17.6,15.1,16,17 c-1.7,1.9-2.4,4.5-2.4,7c-0.6,0.2-1.4,0.4-1.6,1.1c-0.2,1.2-0.1,2.4-0.1,3.6c0,0.4,0.3,0.8,0.5,1.1c0,2.7,0.1,5.4,0,8.1 c-0.6,0-1.1,0-1.7,0.1c-0.1,1.9-0.1,3.8-0.1,5.7c-1,0-1.9-0.1-2.9,0c-0.5,0-0.9,0.4-1,0.9c-0.2,0.8-0.1,1.6,0,2.5 c-0.7,0.3-1.3,1.2-0.8,1.9C6.4,49.8,7.6,49.4,8.4,49.5z M35.3,22.6c-0.5-0.2-1.2-0.1-1.7-0.5c-0.3-1.3-0.5-2.7-0.8-4 C34,19.3,34.8,21,35.3,22.6z M32,21.9c-0.4,0-0.8-0.1-1.2-0.1c-0.4-1.5-0.5-3-0.6-4.5C31.4,18.6,32,20.2,32,21.9z M27.7,16.8 c1.4,1.2,1.4,3.1,1.4,4.8c-0.4,0-0.8,0-1.2-0.1C27.6,20,27.7,18.4,27.7,16.8z M24.4,10.6c0.8,0,1.6,0,2.4,0c0,1,0,1.9,0.1,2.9 c-0.8,0-1.7,0-2.5,0C24.4,12.5,24.3,11.5,24.4,10.6z M26.3,21.4c-0.4,0-0.7,0-1.1,0C25.2,20,25,18.4,25.7,17 c0.2,0.3,0.5,0.6,0.6,1.1C26.3,19.2,26.3,20.3,26.3,21.4z M23.7,17c0,1.5,0,3.1-0.2,4.6c-0.4,0-0.7,0-1.1-0.1 C22.4,20,22.4,18.1,23.7,17z M21.2,17.6c-0.2,1.4-0.4,2.8-0.6,4.3c-0.2,0-0.7,0-1,0C19.7,20.3,20.1,18.7,21.2,17.6z M18.8,18.2 c-0.3,1.3-0.7,2.6-0.8,4c-0.6,0.1-1.3,0.2-1.9,0.4C16.6,20.9,17.4,19.3,18.8,18.2z M14.2,26.1c0.5-0.4,1.1-0.5,1.7-0.6 c7-1.8,14.6-1.7,21.5,0.6c0,0.6-0.1,1.2-0.1,1.8c-4.9-0.8-9.9-0.9-14.9-0.9c-2.8,0.1-5.5,0.3-8.3,0.7C14.1,27,14,26.5,14.2,26.1z  M35.5,29.5c0.4,0,0.9,0.1,1.3,0.1c0,2.7,0.1,5.4-0.1,8.1c-0.4,0-0.8,0-1.3,0C35.4,35,35.5,32.3,35.5,29.5z M33.7,37.6 c-0.4,0-0.8,0-1.2,0c0-2.9,0-5.7,0.1-8.6c0.4,0.1,0.8,0.1,1.1,0.2C33.6,32.1,33.7,34.9,33.7,37.6z M30.7,37.7c-0.4,0-0.8,0-1.2-0.1 c0.1-2.9,0.1-5.8,0.1-8.7c0.4,0,0.7,0.1,1.1,0.1C30.6,31.9,30.8,34.8,30.7,37.7z M27.8,37.7c-0.4,0-0.8,0-1.3,0c0-3-0.1-6,0-8.9 c0.4,0,0.9,0.1,1.3,0.1C27.7,31.8,27.9,34.7,27.8,37.7z M24.7,37.7c-0.4,0-0.7,0-1.1,0c0-3,0-5.9,0-8.9c0.4,0,0.7,0,1.1,0 C24.6,31.7,24.7,34.7,24.7,37.7z M21.7,37.7c-0.4,0-0.7,0-1.1-0.1c0-2.9,0.1-5.8,0.1-8.7c0.4,0,0.7,0,1.1,0 C21.6,31.9,21.7,34.8,21.7,37.7z M18.7,37.7c-0.4,0-0.7,0-1.1,0c0-2.8,0-5.7,0.1-8.5c0.4,0,0.8,0,1.2,0C18.7,32,18.8,34.9,18.7,37.7 z M15.7,37.7c-0.4,0-0.8,0-1.2,0c0-2.7,0.1-5.5,0-8.2c0.4,0,0.8,0,1.1,0C15.6,32.2,15.7,34.9,15.7,37.7z M12.9,39.8 c8.5,0,16.9,0,25.4,0c0,0.2,0,0.7,0,0.9c-8.5,0-17,0-25.4,0C12.9,40.4,12.9,40.1,12.9,39.8z M38.3,42.3c0,0.4,0,0.8-0.1,1.2 c-4.3,0-8.7,0-13,0c-4.1,0-8.2,0.2-12.3,0c0-0.4,0-0.8,0-1.1C21.4,42.5,29.9,42.4,38.3,42.3z M42.3,45.8c0,0.5,0,0.9-0.1,1.4 c-4.8,0.1-9.6,0-14.4,0.1c-6.3,0-12.7,0-19,0c0-0.5,0-0.9-0.1-1.4C19.9,46,31.1,45.8,42.3,45.8z" />
  </svg>
)

const DubaiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" className="w-8 h-8">
    <style>{`.st1{fill:none;stroke:#00C2FF;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;}`}</style>
    <g>
      <g>
        <path className="st1" d="M38.7,49.9H12.3c-0.4,0-0.8-0.3-0.8-0.8l0,0v-2.2c0-1.6,0.9-2.9,2.1-2.9h23.7c0.6,0,1.2,0.4,1.6,1   c0.3,0.6,0.5,1.2,0.5,1.9v2.2C39.5,49.5,39.1,49.9,38.7,49.9L38.7,49.9z M13.1,48.3h24.8v-1.5c0-0.4-0.1-0.7-0.3-1.1   c-0.1-0.2-0.2-0.3-0.3-0.3H13.6c-0.2,0-0.6,0.5-0.6,1.3V48.3z" />
      </g>
      <g>
        <path className="st1" d="M23.2,45.5c-0.4,0-0.8-0.3-0.8-0.8v-5.6H16c-0.1,0-0.2,0.2-0.2,0.5v5.1c0,0.4-0.3,0.8-0.8,0.8   s-0.8-0.3-0.8-0.8l0,0v-5.1c0-1.1,0.8-2,1.7-2h7.2c0.4,0,0.8,0.3,0.8,0.8l0,0v6.4C24,45.2,23.6,45.5,23.2,45.5z" />
      </g>
      <g>
        <path className="st1" d="M27.8,11.3c-0.4,0-0.8-0.3-0.8-0.8V7.3C27,7.2,27,7.1,27,7H24C24,7.1,24,7.2,24,7.3v2.5   c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8V7.3c0-1,0.7-1.8,1.6-1.8h3c0.9,0,1.6,0.8,1.6,1.8v3.2C28.6,10.9,28.2,11.3,27.8,11.3z" />
      </g>
      <g>
        <path className="st1" d="M35.9,45.5c-0.4,0-0.8-0.3-0.8-0.8v-5.1c0-0.3-0.1-0.5-0.2-0.5h-6.4v5.6c0,0.4-0.3,0.8-0.8,0.8   S27,45.2,27,44.8l0,0v-6.4c0-0.4,0.3-0.8,0.8-0.8l0,0H35c1,0,1.7,0.9,1.7,2v5.1C36.7,45.2,36.4,45.5,35.9,45.5z" />
      </g>
      <g>
        <path className="st1" d="M23.2,39.1c-0.4,0-0.8-0.3-0.8-0.8l0,0v-9.1h-4.5c-0.1,0-0.2,0.2-0.2,0.5v8.6c0,0.4-0.3,0.8-0.8,0.8   s-0.8-0.3-0.8-0.8v-8.6c0-1.1,0.8-2,1.7-2h5.3c0.4,0,0.8,0.3,0.8,0.8v9.9C24,38.8,23.6,39.1,23.2,39.1z" />
      </g>
      <g>
        <path className="st1" d="M33.4,39.1c-0.4,0-0.8-0.3-0.8-0.8l0,0v-5.9c0-0.3-0.1-0.5-0.2-0.5h-3.9v6.4c0,0.4-0.3,0.8-0.8,0.8   S27,38.8,27,38.3v-7.1c0-0.4,0.3-0.8,0.8-0.8h4.7c1,0,1.7,0.9,1.7,2v5.9C34.2,38.8,33.9,39.1,33.4,39.1z" />
      </g>
      <g>
        <path className="st1" d="M23.2,29.3c-0.4,0-0.8-0.3-0.8-0.8l0,0V22h-3c-0.1,0-0.2,0.2-0.2,0.5v6.1c0,0.4-0.3,0.8-0.8,0.8   s-0.8-0.3-0.8-0.8v-6c0-1.1,0.8-2,1.7-2h3.8c0.4,0,0.8,0.3,0.8,0.8v7.3C24,28.9,23.6,29.3,23.2,29.3z" />
      </g>
      <g>
        <path className="st1" d="M27.8,32c-0.4,0-0.8-0.3-0.8-0.8V17.8c0-0.4,0.3-0.8,0.8-0.8h3.8c1,0,1.7,0.9,1.7,2v12.1   c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8V19.1c0-0.3-0.1-0.5-0.2-0.5h-3v12.6C28.6,31.6,28.2,32,27.8,32L27.8,32z" />
      </g>
      <g>
        <path className="st1" d="M23.2,22c-0.4,0-0.8-0.3-0.8-0.8l0,0V10.6H21c-0.1,0-0.2,0.2-0.2,0.5v10.2c0,0.4-0.3,0.8-0.8,0.8   s-0.8-0.3-0.8-0.8l0,0V11c0-1.1,0.8-2,1.7-2h2.2C23.6,9,24,9.4,24,9.8l0,0v11.4C24,21.6,23.6,22,23.2,22L23.2,22z" />
      </g>
      <g>
        <path className="st1" d="M30.2,18.6c-0.4,0-0.8-0.3-0.8-0.8v-6.1c0-0.3-0.1-0.5-0.2-0.5h-0.6v6.6c0,0.4-0.3,0.8-0.8,0.8   S27,18.3,27,17.8v-7.3c0-0.4,0.3-0.8,0.8-0.8l0,0h1.4c1,0,1.7,0.9,1.7,2v6.1C31,18.3,30.6,18.6,30.2,18.6   C30.2,18.6,30.2,18.6,30.2,18.6z" />
      </g>
      <g>
        <path className="st1" d="M25.5,7c-0.4,0-0.8-0.3-0.8-0.8l0,0V1.9c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v4.3C26.3,6.7,25.9,7,25.5,7   C25.5,7,25.5,7,25.5,7z" />
      </g>
    </g>
  </svg>
)

const BangaloreIcon = () => (
  <svg fill="#00C2FF" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" className="w-8 h-8" stroke="#00C2FF" strokeWidth="0.6">
    <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.256"></g>
    <g id="SVGRepo_iconCarrier">
      <path id="bangalore_1_" d="M5.5,10c0-0.276,0.224-0.5,0.5-0.5S6.5,9.724,6.5,10S6.276,10.5,6,10.5S5.5,10.276,5.5,10z M26,10.5 c0.276,0,0.5-0.224,0.5-0.5S26.276,9.5,26,9.5s-0.5,0.224-0.5,0.5S25.724,10.5,26,10.5z M6,21.5c-0.276,0-0.5,0.224-0.5,0.5 s0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5S6.276,21.5,6,21.5z M25.5,22c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5 S25.5,21.724,25.5,22z M16,18c-0.276,0-0.5,0.224-0.5,0.5S15.724,19,16,19c0.276,0,0.5-0.224,0.5-0.5S16.276,18,16,18z M16,2.5 c0.276,0,0.5-0.224,0.5-0.5S16.276,1.5,16,1.5S15.5,1.724,15.5,2S15.724,2.5,16,2.5z M8,30.36h16v-0.72H8V30.36z M30.333,18.138 C30.277,18.272,30.146,18.36,30,18.36h-1.64v7.279H30v0.721h-5.64v1.279H28v0.721H4v-0.72h3.64v-1.28H2v-0.72h1.64v-7.28H2 c-0.146,0-0.277-0.088-0.333-0.223s-0.025-0.289,0.078-0.393L3.64,15.85V14c0-1.301,1.059-2.36,2.36-2.36S8.36,12.699,8.36,14v1.64 H10c0.146,0,0.277,0.087,0.333,0.222c0.056,0.134,0.025,0.289-0.078,0.392L8.869,17.64h2.771v-3.491l-1.895-1.895 c-0.103-0.103-0.134-0.258-0.078-0.392C9.723,11.728,9.854,11.64,10,11.64h1.64V10c0-1.927,1.264-3.546,3-4.121V5 c0-0.75,0.61-1.36,1.36-1.36S17.36,4.25,17.36,5v0.879c1.736,0.575,3,2.195,3,4.121v1.64H22c0.146,0,0.277,0.087,0.333,0.222 c0.056,0.134,0.024,0.289-0.078,0.392l-1.895,1.895v3.491h2.771l-1.386-1.385c-0.103-0.103-0.134-0.258-0.078-0.392 c0.056-0.135,0.188-0.222,0.333-0.222h1.64V14c0-1.301,1.059-2.36,2.36-2.36s2.36,1.059,2.36,2.36v1.851l1.895,1.894 C30.357,17.849,30.389,18.003,30.333,18.138z M24.36,15.64h3.279V14c0-0.904-0.735-1.64-1.64-1.64s-1.64,0.736-1.64,1.64 L24.36,15.64L24.36,15.64z M8.36,20.36v5.279h1.28V20.36H8.36z M10.36,25.64h1.28v-5.28h-1.28V25.64z M12.36,20.36v5.279h1.28V20.36 H12.36z M14.36,19.64h3.28v-1.49L16,16.509l-1.64,1.64V19.64z M14.36,20.36v5.279h3.28V20.36H14.36z M18.36,25.64h1.279v-5.28H18.36 V25.64z M10.36,26.36v1.279h1.28V26.36H10.36z M12.36,27.64h1.28v-1.28h-1.28V27.64z M14.36,27.64h3.28v-1.28h-3.28V27.64z  M18.36,27.64h1.279v-1.28H18.36V27.64z M20.36,27.64h1.279v-1.28H20.36V27.64z M21.64,25.64v-5.28h-1.28v5.279L21.64,25.64 L21.64,25.64z M22.36,25.64h1.279v-5.28H22.36V25.64z M25.131,19.64l-1.28-1.279h-5.49v1.279H25.131z M15.36,5.705 C15.57,5.674,15.781,5.64,16,5.64s0.43,0.033,0.64,0.065V5c0-0.353-0.287-0.64-0.64-0.64S15.36,4.647,15.36,5V5.705z M12.36,10v1.64 h2.28V9c0-0.75,0.61-1.36,1.36-1.36c0.75,0,1.36,0.61,1.36,1.36v2.64h2.279V10c0-2.007-1.633-3.64-3.64-3.64 C13.993,6.36,12.36,7.993,12.36,10z M16.64,11.64V9c0-0.353-0.287-0.64-0.64-0.64S15.36,8.647,15.36,9v2.64H16.64z M10.869,12.36 l1.28,1.28h7.702l1.28-1.28H20h-8H10.869z M12.36,17.64h1.491l1.895-1.894c0.141-0.141,0.368-0.141,0.509,0l1.895,1.894h1.49v-3.28 h-7.28C12.36,14.36,12.36,17.64,12.36,17.64z M8.149,18.36l-1.28,1.279h6.771V18.36H8.149z M4.36,14v1.64h3.28V14 c0-0.904-0.736-1.64-1.64-1.64S4.36,13.096,4.36,14z M2.869,17.64h4.982l1.28-1.28H4.149L2.869,17.64z M7.64,25.64v-5.28H6 c-0.146,0-0.277-0.088-0.333-0.223s-0.025-0.289,0.078-0.393l1.385-1.385H4.36v7.279h3.28V25.64z M8.36,27.64h1.28v-1.28H8.36V27.64 z M23.64,26.36h-1.28v1.279h1.279L23.64,26.36L23.64,26.36z M27.64,18.36h-2.771l1.386,1.385c0.103,0.104,0.134,0.258,0.078,0.393 S26.146,20.36,26,20.36h-1.64v5.279h3.279L27.64,18.36L27.64,18.36z M29.131,17.64l-1.28-1.28H22.87l1.28,1.28H29.131z"></path>
      
    </g>
  </svg>
)

const ChennaiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8">
    <style>{`.st1{fill:none;stroke:#00C2FF;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}</style>
    <g>
      <rect x="12.5" y="15.3" className="st1" width="6.9" height="8.9" />
      <rect x="12.5" y="10.4" className="st1" width="6.9" height="5" />
      <rect x="14.4" y="12" className="st1" width="3.2" height="3.3" />
      <polygon className="st1" points="18.8,9.2 13.2,9.2 12.5,10.4 19.5,10.4  " />
      <line className="st1" x1="19.5" y1="16.6" x2="12.5" y2="16.6" />
      <rect x="13.9" y="18.4" className="st1" width="4.2" height="5.8" />
      <polygon className="st1" points="19.5,24.2 12.5,24.2 10.6,28.7 21.4,28.7  " />
      <path className="st1" d="M8.9,13.5c0-1,0.8-1.8,1.8-1.8s1.8,0.8,1.8,1.8v10.7H8.9V13.5z" />
      <polyline className="st1" points="10.6,28.7 0.6,28.7 0.6,26.2 11.5,26.2  " />
      <polyline className="st1" points="1.9,26.2 1.9,24.2 8.9,24.2  " />
      <line className="st1" x1="8.9" y1="13.8" x2="12.5" y2="13.8" />
      <line className="st1" x1="8.9" y1="15.3" x2="12.5" y2="15.3" />
      <rect x="3.3" y="17.9" className="st1" width="5.6" height="6.3" />
      <rect x="4.8" y="20.4" className="st1" width="2.6" height="3.8" />
      <circle className="st1" cx="16" cy="7.4" r="1.7" />
      <path className="st1" d="M17.4,6.3L17.4,6.3c0.8,0,1.4,0.6,1.4,1.4v1.4" />
      <path className="st1" d="M13.2,9.2V7.8c0-0.8,0.6-1.4,1.4-1.4h0" />
      <line className="st1" x1="16" y1="5.7" x2="16" y2="3.3" />
      <line className="st1" x1="10.7" y1="11.6" x2="10.7" y2="8.9" />
      <path className="st1" d="M8.9,17.9c0-1.5-1.3-2.8-2.8-2.8s-2.8,1.3-2.8,2.8" />
      <line className="st1" x1="6.1" y1="15.1" x2="6.1" y2="12.9" />
      <path className="st1" d="M23.1,13.5c0-1-0.8-1.8-1.8-1.8s-1.8,0.8-1.8,1.8v10.7h3.6V13.5z" />
      <polyline className="st1" points="21.4,28.7 31.4,28.7 31.4,26.2 20.5,26.2  " />
      <polyline className="st1" points="30.1,26.2 30.1,24.2 23.1,24.2  " />
      <line className="st1" x1="23.1" y1="13.8" x2="19.5" y2="13.8" />
      <line className="st1" x1="23.1" y1="15.3" x2="19.5" y2="15.3" />
      <rect x="23.1" y="17.9" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 51.7567 42.0811)" className="st1" width="5.6" height="6.3" />
      <rect x="24.6" y="20.4" transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 51.7567 44.5736)" className="st1" width="2.6" height="3.8" />
      <line className="st1" x1="21.3" y1="11.6" x2="21.3" y2="8.9" />
      <path className="st1" d="M23.1,17.9c0-1.5,1.3-2.8,2.8-2.8c1.5,0,2.8,1.3,2.8,2.8" />
      <line className="st1" x1="25.9" y1="15.1" x2="25.9" y2="12.9" />
      <line className="st1" x1="8.9" y1="19.7" x2="12.5" y2="19.7" />
      <line className="st1" x1="8.9" y1="21" x2="12.5" y2="21" />
      <line className="st1" x1="23.1" y1="21" x2="19.5" y2="21" />
      <line className="st1" x1="23.1" y1="19.7" x2="19.5" y2="19.7" />
    </g>
  </svg>
)

const locations = [
  {
    city: 'San Jose',
    address: '2033 Gateway Place, Ste 500',
    phone: '',
    icon: SanJoseIcon,
  },
  {
    city: 'Dubai',
    address: 'IFZA business park, DDP A1',
    phone: '',
    icon: DubaiIcon,
  },
  {
    city: 'Bengaluru',
    address: 'Unit 8, 5th Floor, ITPB, Whitefield',
    phone: '080 40905088',
    icon: BangaloreIcon,
  },
  {
    city: 'Chennai',
    address: 'Phase 1, Tower 2, Chennai One IT SEZ',
    phone: '044 47764670',
    icon: ChennaiIcon,
  },
]

export function Footer() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-64 w-64 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-12 h-72 w-72 bg-cyan/20 blur-3xl rounded-full" />
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10 relative">
        <div className="container-custom py-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg shadow-black/10">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-cyan mb-3">
                Stay Updated
              </p>
              <h3 className="text-2xl font-bold mb-2">Insights, launches, and SONiC news.</h3>
              <p className="text-gray-300 max-w-2xl">
                Subscribe for product updates, architecture guides, and AI/infra deep dives.
              </p>
            </div>
            <form 
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get('email') as string
                
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  return
                }
                
                try {
                  const response = await fetch(getApiUrl('/api/lead'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email,
                      name: '',
                      source: 'newsletter',
                      interest: 'newsletter subscription',
                    }),
                  })
                  
                  if (response.ok) {
                    e.currentTarget.reset()
                    // Show success message (could use toast here)
                    alert('Thank you for subscribing!')
                  }
                } catch (error) {
                  // Silently fail - don't disrupt UX
                  if (process.env.NODE_ENV === 'development') {
                    // eslint-disable-next-line no-console
                    console.error('Newsletter subscription failed:', error)
                  }
                }
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Work email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 w-full sm:w-80"
              />
              <Button type="submit" variant="gradient" className="whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16 relative">
        <div className="grid grid-cols-1 gap-12">
          {/* Brand / Contact Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg shadow-black/10 space-y-5">
            <Logo href="/" size="xl" variant="light" />
            <p className="text-gray-200">
              Empowering enterprises with SONiC-first networking, cloud infra, and AI-ready platforms.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-gray-300">24/7</p>
                <p className="font-semibold text-white">Global Support</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-gray-300">Locations</p>
                <p className="font-semibold text-white">{locations.length} Offices</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@palcnetworks.com"
                className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-primary-light" />
                info@palcnetworks.com
              </a>
              <a
                href="mailto:sales@palcnetworks.com"
                className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-primary-light" />
                sales@palcnetworks.com
              </a>
            </div>
            
            {/* Locations Bar - Horizontal Layout with Advanced Icons */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-light" />
                Our Locations
              </h4>
              <div className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
                <div className="flex flex-wrap items-center">
                  {locations.map((location, index) => {
                    const Icon = location.icon
                    return (
                      <React.Fragment key={location.city}>
                        <div className="flex-1 min-w-[160px] flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors group">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Icon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-white text-sm mb-1">{location.city}</h5>
                            <p className="text-xs text-gray-300 leading-tight line-clamp-1">{location.address}</p>
                            {location.phone && (
                              <p className="text-xs text-gray-400 mt-0.5">{location.phone}</p>
                            )}
                          </div>
                        </div>
                        {index < locations.length - 1 && (
                          <div className="w-px h-12 bg-white/10" />
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
                {/* Blue accent bar at bottom */}
                <div className="h-1 bg-gradient-to-r from-primary via-cyan to-primary" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-lg mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Actions + Popular Links in two columns on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg shadow-black/10">
              <p className="text-sm text-gray-200 mb-2">Need help fast?</p>
              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => setIsLeadModalOpen(true)}
              >
                Talk to an Expert
              </Button>
              <Button variant="outline" className="w-full mt-3 border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg shadow-black/10 space-y-3 text-sm text-gray-200">
              <p className="font-semibold text-white">Popular links</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'SONiC configs', href: '/solutions/sonic-open-networking' },
                  { name: 'AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
                  { name: 'Cloud & Hybrid', href: '/solutions/cloud-hybrid-cloud' },
                  { name: 'Events', href: '/resources/events' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} PalC Networks. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="footer-expert"
        title="Talk to an Expert"
        subtitle="Connect with our team to discuss your infrastructure needs."
      />
    </footer>
  )
}

