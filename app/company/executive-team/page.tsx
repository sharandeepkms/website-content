"use client"
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { getImageSrc } from '@/app/utils/image-path'

type Profile = {
  name: string
  role: string
  bio: string
  image?: string
  linkedin?: string
}

const founders: Profile[] = [
  {
    name: 'Kingston Smiler Selvaraj',
    role: 'CEO & Co-Founder',
    bio: '18+ years across networking, SDN/NFV, data analytics, and product leadership. Authored RFCs, active in IETF, and scaled PalC from scratch to 100+ engineers and 20+ global customers. Frequent conference speaker on virtualization and open networking.',
    image: '/images/executive-team/Kingston.png',
    linkedin: 'https://www.linkedin.com/in/kingstonsmiler',
  },
  {
    name: 'Parul Agrawal',
    role: 'Managing Director & Co-Founder',
    bio: '16+ years in telecom and technology leadership spanning workforce management, global talent, compensation, HR operations, and policy. Drives leadership and culture programs across PalC Networks.',
    image: '/images/executive-team/Parul.png',
    linkedin: 'https://www.linkedin.com/in/parul-agrawal-37b0779/',
  },
]

const leadership: Profile[] = [
  { name: 'Armstrong Mathiyalagan', role: 'Chief Technology Officer', bio: 'Heads technology strategy and advanced R&D; deep background in telecom and datacom solution design and delivery.', image: '/images/executive-team/ARMS.png', linkedin: 'https://www.linkedin.com/in/arms73/' },
  { name: 'Balamurali Santhakumar', role: 'VP Service Delivery', bio: 'Two decades in IT and security delivery; led professional services, program/project management, service delivery, and IT for global clients.', image: '/images/executive-team/BALA.png', linkedin: 'https://www.linkedin.com/in/balamuralisanthakumar' },
  { name: 'Vignesh Kesavan', role: 'AVP, Sales', bio: '15+ years in data networking software (L3/MPLS) across commercial and open NOS; drove SDN solutions and GTM execution.', image: '/images/executive-team/VIGNESH.png', linkedin: 'https://www.linkedin.com/in/vignesh-k-a9869832/?original_referer=https%3A%2F%2Fpalcnetworks.com%2F' },
  { name: 'Kannan Rajadurai', role: 'AVP, Product Marketing & Strategy', bio: '20+ years in cloud networking, AI-driven infrastructure, NPUs/FPGAs/ASICs, and scalable cloud-native architectures.', image: '/images/executive-team/Kannan.png', linkedin: 'https://www.linkedin.com/in/kannan-rajadurai-a40aa89/' },
  { name: 'Chetan Chaudhari', role: 'Channel Sales Head', bio: '12+ years expanding indirect channels across India & MEA; led presales at Edgecore and Ruijie, and technical leadership at global distributors.', image: '/images/executive-team/CHETAN.png', linkedin: 'https://www.linkedin.com/in/chetan2113/' },
  { name: 'Haribabu Alavandar', role: 'Director, Engineering', bio: '20 years in telecom/datacom with specialization in management-layer solutions; ex-Wipro and Aricent technical leader.', image: '/images/executive-team/HARI.png', linkedin: 'https://www.linkedin.com/in/hari-babu-4903559/' },
  { name: 'Harsha Karisaiyappanavar', role: 'Senior Technical Architect', bio: 'L2 control plane and dataplane expert across ethernet and optical; prior technical lead at IP Infusion.', image: '/images/executive-team/HARSHA.png', linkedin: 'https://www.linkedin.com/in/harsha-k-63982454/' },
  { name: 'Ramesh Bysani', role: 'Senior Principal Engineer', bio: '20+ years in data-networking software, L2 dataplane for commercial and open NOS; former technical lead at Cisco.', image: '/images/executive-team/RAMESH.png', linkedin: 'https://www.linkedin.com/in/ramesh-bysani-059343/' },
  { name: 'Sabarish Ravikumar', role: 'Senior Technical Architect', bio: 'Specialist in L3/MPLS control and data plane across carrier-grade stacks; former tech lead at IP Infusion.', image: '/images/executive-team/SABHARI.png', linkedin: 'https://www.linkedin.com/in/sabarish-ravikumar-b7084366/' },
  { name: 'Kashinath Ganapathy', role: 'Senior Technical Architect', bio: 'Focus on L3/MPLS with network analytics and cloud architectures; ex-IP Infusion senior engineer.', image: '/images/executive-team/KASHI.png', linkedin: 'https://www.linkedin.com/in/kashinathg/' },
  { name: 'Sudharshan S', role: 'Principal Engineer', bio: 'Built L2/L3/MPLS control and data plane for Junos EVO and other platforms; production-grade reliability focus.', image: '/images/executive-team/SUDARHSAN.png', linkedin: 'https://www.linkedin.com/in/sudharshan-s-8744b05b/?original_referer=' },
  { name: 'Rashmi H', role: 'Technical Lead', bio: 'Drives L2/L3/MPLS and management-layer software for mission-critical networks; broad control-plane expertise.', image: '/images/executive-team/RASHMI.png', linkedin: 'https://www.linkedin.com/in/rashmi-h-20770b102/?original_referer=https%3A%2F%2Fpalcnetworks.com%2F' },
]

const advisors: Profile[] = [
  { name: 'Ravi Mittal', role: 'Independent Advisor', bio: 'Veteran technology leader, academic, and mentor; ex-Symbian/Nokia VP Engineering; published 30+ papers and co-authored books.', image: '/images/executive-team/Ravi.png', linkedin: 'https://www.linkedin.com' },
  { name: 'Steven King', role: 'Sales Advisor', bio: '20+ years in networking/OS/security sales (IP Infusion, Wind River, Green Hills); guided sales processes for major accounts.', image: '/images/executive-team/STEVEN.png', linkedin: 'https://www.linkedin.com' },
  { name: 'Heimdall Siao', role: 'Independent Advisor', bio: 'Telecom executive; roles at Ericsson and Accton, former President at Edgecore; deep leadership in networking hardware.', image: '/images/executive-team/Heimdall.png', linkedin: 'https://www.linkedin.com' },
]

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('')

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-100 shadow-card hover:border-primary/20 hover:shadow-hover transition-all flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-semibold shadow-lg ring-2 ring-white">
          {profile.image ? (
            <Image
              src={getImageSrc(profile.image, false)}
              alt={profile.name}
              fill
              sizes="64px"
              className="object-cover"
              priority={false}
              unoptimized={false}
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement
                const parent = target.parentElement
                if (parent) {
                  target.style.display = 'none'
                  const fallback = document.createElement('span')
                  fallback.className = 'text-gray-600 font-semibold text-lg'
                  fallback.textContent = getInitials(profile.name)
                  parent.appendChild(fallback)
                }
              }}
            />
          ) : (
            <span className="text-gray-600">{getInitials(profile.name)}</span>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-gray-900 leading-tight">{profile.name}</h4>
          <p className="text-sm text-primary font-medium">{profile.role}</p>
        </div>
        {profile.linkedin && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto px-2"
            asChild
          >
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn profile of ${profile.name}`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{profile.bio}</p>
    </motion.div>
  )
}

export default function ExecutiveTeamPage() {
  return (
    <>
      <PageHero
        title="Executive Team"
        subtitle="Leadership driving SONiC-first, cloud-scale, and AI-powered networking."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/about' },
          { label: 'Executive Team' },
        ]}
      />

      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="container-custom">
          <SectionHeading
            tag="Founders"
            title="Vision and stewardship"
            subtitle="Strategic leadership guiding PalC Networks across innovation, delivery, and growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((leader, index) => (
              <ProfileCard key={leader.name} profile={leader} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Leadership"
            title="Operational excellence"
            subtitle="Leaders across technology, delivery, sales, and product strategy."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader, index) => (
              <ProfileCard key={leader.name} profile={leader} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Advisors"
            title="Guidance and governance"
            subtitle="Industry veterans advising on growth, sales, and technology direction."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <ProfileCard key={advisor.name} profile={advisor} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

