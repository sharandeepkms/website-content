export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  postedDate: string
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Network Engineer',
    department: 'Network Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Join our network engineering team to design and implement enterprise network solutions for our global clients. You will work with cutting-edge technologies across data center, campus, and cloud networks.',
    responsibilities: [
      'Design and implement network solutions for enterprise clients',
      'Lead technical assessments and provide architectural recommendations',
      'Troubleshoot complex network issues and perform root cause analysis',
      'Create technical documentation and knowledge base articles',
      'Mentor junior engineers and conduct knowledge transfer sessions',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science, Engineering, or related field',
      '5+ years of experience in network engineering',
      'Expert knowledge of routing protocols (BGP, OSPF, IS-IS)',
      'Experience with data center technologies (VXLAN, EVPN)',
      'Industry certifications (CCIE, JNCIE, or equivalent) preferred',
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Comprehensive health insurance',
      'Flexible work arrangements',
      'Professional development budget',
      'Certification support and training',
    ],
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Cloud Solutions Architect',
    department: 'Cloud Services',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    experience: '7+ years',
    description: 'Lead cloud architecture initiatives for enterprise clients, designing and implementing scalable, secure cloud solutions across AWS, Azure, and GCP.',
    responsibilities: [
      'Design cloud architecture solutions aligned with business requirements',
      'Lead cloud migration and modernization projects',
      'Develop cloud governance and best practices',
      'Collaborate with DevOps teams on CI/CD implementations',
      'Provide technical leadership on multi-cloud strategies',
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in Computer Science or related field',
      '7+ years of experience in IT with 4+ years in cloud architecture',
      'Deep expertise in at least one major cloud platform (AWS/Azure/GCP)',
      'Experience with containerization and Kubernetes',
      'Cloud certifications (AWS Solutions Architect, Azure Solutions Architect) required',
    ],
    benefits: [
      'Competitive salary and equity options',
      'Remote-first work culture',
      'Generous PTO policy',
      'Learning and development allowance',
      'Home office setup allowance',
    ],
    postedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Cloud Services',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build and maintain CI/CD pipelines, infrastructure automation, and cloud platforms for our clients and internal projects.',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure using IaC tools',
      'Implement monitoring and observability solutions',
      'Automate operational tasks and processes',
      'Collaborate with development teams on deployment strategies',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of DevOps/SRE experience',
      'Proficiency in IaC tools (Terraform, Ansible, CloudFormation)',
      'Experience with container orchestration (Kubernetes, Docker)',
      'Strong scripting skills (Python, Bash)',
    ],
    benefits: [
      'Competitive compensation package',
      'Flexible working hours',
      'Health and wellness benefits',
      'Professional development opportunities',
      'Team building events',
    ],
    postedDate: '2024-01-12',
  },
  {
    id: '4',
    title: 'Security Engineer',
    department: 'Security Services',
    location: 'Hybrid',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Join our security team to implement and manage security solutions for enterprise clients, focusing on network security, identity management, and compliance.',
    responsibilities: [
      'Implement security solutions across network and cloud environments',
      'Conduct security assessments and penetration testing',
      'Design and implement IAM solutions',
      'Develop security policies and procedures',
      'Respond to security incidents and perform forensic analysis',
    ],
    requirements: [
      'Bachelor\'s degree in Cybersecurity, Computer Science, or related field',
      '4+ years of experience in security engineering',
      'Knowledge of security frameworks (NIST, ISO 27001, SOC2)',
      'Experience with security tools (SIEM, IDS/IPS, firewalls)',
      'Security certifications (CISSP, CEH, or equivalent) preferred',
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive benefits package',
      'Security certification support',
      'Flexible work arrangements',
      'Career advancement opportunities',
    ],
    postedDate: '2024-01-08',
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    department: 'Software Development',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build modern web applications and internal tools using React, Node.js, and cloud technologies. Work on network management platforms and customer-facing applications.',
    responsibilities: [
      'Develop and maintain full-stack web applications',
      'Design and implement RESTful APIs',
      'Collaborate with UX designers on user interfaces',
      'Write clean, maintainable, and tested code',
      'Participate in code reviews and technical discussions',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of full-stack development experience',
      'Proficiency in React/TypeScript and Node.js',
      'Experience with relational and NoSQL databases',
      'Familiarity with cloud platforms and containerization',
    ],
    benefits: [
      'Competitive salary',
      'Fully remote position',
      'Flexible schedule',
      'Technology allowance',
      'Continuous learning opportunities',
    ],
    postedDate: '2024-01-05',
  },
]

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id)
}

