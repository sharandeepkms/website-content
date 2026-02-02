# CTA Audit - Contact Page Redirects

## CTAs Currently Redirecting to Contact Page

### Navigation & Header
1. **Navbar - "Get Started" button** (Desktop & Mobile)
   - Location: `app/components/Navbar.tsx` (lines 820, 900)
   - Current: `/company/contact`
   - Action: Show LeadCaptureModal

### Footer
2. **Footer - "Talk to an Expert"**
   - Location: `app/components/Footer.tsx` (line 400)
   - Current: `/company/contact`
   - Action: Show LeadCaptureModal

3. **Footer - "Contact" link**
   - Location: `app/components/Footer.tsx` (line 59)
   - Current: `/company/contact`
   - Action: Keep as link (footer navigation)

### Hero Sections
4. **Hero Component - "Get Started"**
   - Location: `app/components/Hero.tsx` (line 100)
   - Current: `/contact` (default)
   - Action: Show LeadCaptureModal

### CTA Sections
5. **CTASection Component - Primary Button**
   - Location: `app/components/CTASection.tsx` (line 22)
   - Current: `/contact` (default)
   - Action: Show LeadCaptureModal

### Product Pages
6. **Products Content - "Talk to Sales"** (2 instances)
   - Location: `app/products/ProductsContent.tsx` (lines 136, 337)
   - Current: `/contact`
   - Action: Show LeadCaptureModal with sales context

7. **Switches Page - "Request BOM & Design"**
   - Location: `app/products/switches/page.tsx` (line 79)
   - Current: `/contact`
   - Action: Show LeadCaptureModal

8. **Servers Page - "Request a BOM"**
   - Location: `app/products/servers/page.tsx` (line 81)
   - Current: `/contact`
   - Action: Show LeadCaptureModal

9. **NICs/DPUs Page - "Request a Recommendation"**
   - Location: `app/products/nics-dpus/page.tsx` (line 80)
   - Current: `/contact`
   - Action: Show LeadCaptureModal

10. **Transceivers Page - "Request an Optics BOM"**
    - Location: `app/products/transceivers/page.tsx` (line 80)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

11. **High-Speed Cables Page - "Request a Cabling BOM"**
    - Location: `app/products/high-speed-cables/page.tsx` (line 78)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

12. **NetPro Page - "Request a Demo"**
    - Location: `app/products/software-tools/netpro/page.tsx` (line 80)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

13. **Packet Broker Page - "Request a Demo"**
    - Location: `app/products/software-tools/packet-broker/page.tsx` (line 79)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

14. **Guardian Page - "Request a Demo"**
    - Location: `app/products/software-tools/guardian/page.tsx` (line 80)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

### Service Pages
15. **IP Networking Page - "Book a Workshop"**
    - Location: `app/services/networking-engineering/ip-networking/page.tsx` (line 112)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

16. **SDN/NFV Page - "Schedule a Design Session"**
    - Location: `app/services/networking-engineering/sdn-nfv/page.tsx` (line 84)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

17. **Wireless Page - "Schedule a Wireless Design Session"**
    - Location: `app/services/networking-engineering/wireless/page.tsx` (line 82)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

18. **Packet Optical NOS Page - "Book a Design Session"**
    - Location: `app/services/networking-engineering/packet-optical-nos/page.tsx` (line 81)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

19. **Cloud Infrastructure Page - "Schedule a Consultation"**
    - Location: `app/services/cloud-infrastructure-engineering/page.tsx` (line 149)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

20. **Software Platform Page - "Start a Platform Sprint"**
    - Location: `app/services/software-platform-engineering/page.tsx` (line 77)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

21. **CI/CD Automation Page - "Design My Pipeline"**
    - Location: `app/services/automation-tooling/cicd-automation/page.tsx` (line 76)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

22. **Network Automation Page - "Book an Automation Review"**
    - Location: `app/services/automation-tooling/network-automation/page.tsx` (line 82)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

23. **Managed Services Page - "Schedule an Ops Review"**
    - Location: `app/services/professional-lifecycle-services/managed-services/page.tsx` (line 75)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

### Solution Pages
24. **Solution Detail Pages - "Talk to an Expert"**
    - Location: `app/solutions/[slug]/SolutionDetailContent.tsx` (line 147)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

25. **Data Center Modernization Page - CTA**
    - Location: `app/solutions/data-center-modernization-ai-fabrics/page.tsx` (line 234)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

26. **SONiC Open Networking Page - CTA**
    - Location: `app/solutions/sonic-open-networking/page.tsx` (line 264)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

27. **Cloud & Hybrid Cloud Page - "Get Started"**
    - Location: `app/solutions/cloud-hybrid-cloud/page.tsx` (line 229)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

28. **Data Optimization Page - CTA**
    - Location: `app/services/data-optimization/page.tsx` (line 244)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

### Resource Pages
29. **Blog Content - "Talk to an Architect"**
    - Location: `app/resources/blog/BlogContent.tsx` (line 72)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

30. **Case Studies Content - CTA**
    - Location: `app/resources/case-studies/CaseStudiesContent.tsx` (line 52)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

31. **Whitepapers Content - CTA**
    - Location: `app/resources/whitepapers/WhitepapersContent.tsx` (line 62)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

32. **Events Content - CTA**
    - Location: `app/resources/events/EventsContent.tsx` (line 57)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

33. **Documentation Content - CTA**
    - Location: `app/resources/documentation/DocumentationContent.tsx` (line 109)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

### Detail Pages
34. **Blog Detail - "Talk to Expert"**
    - Location: `app/resources/blog/[slug]/BlogDetailContent.tsx` (line 133)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

35. **Case Study Detail - "Talk to Expert"**
    - Location: `app/resources/case-studies/[slug]/CaseStudyDetailContent.tsx` (line 234)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

36. **Whitepaper Detail - "Talk to Expert"**
    - Location: `app/resources/whitepapers/[slug]/WhitepaperDetailContent.tsx` (line 220)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

37. **Event Detail - "Talk to Expert"**
    - Location: `app/resources/events/[slug]/EventDetailContent.tsx` (line 304)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

### Expert Cards
38. **ExpertCard Component - "Talk to Expert"**
    - Location: `app/components/ExpertCard.tsx` (line 34)
    - Current: `/company/contact` (default)
    - Action: Show LeadCaptureModal or mailto link

### Other Pages
39. **About Page - "Contact Us"**
    - Location: `app/about/AboutContent.tsx` (line 396)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

40. **Services Content - "Contact Us"**
    - Location: `app/services/ServicesContent.tsx` (lines 70, 233)
    - Current: `/contact`
    - Action: Show LeadCaptureModal

41. **Industry Associations - "Contact Us"**
    - Location: `app/company/industry-associations/IndustryAssociationsContent.tsx` (line 273)
    - Current: `/company/contact`
    - Action: Show LeadCaptureModal

42. **404 Page - "Contact Support"**
    - Location: `app/not-found.tsx` (line 34)
    - Current: `/contact`
    - Action: mailto:info@palcnetworks.com (quick support)

### Detail Page Template
43. **DetailPageTemplate - Primary CTA**
    - Location: `app/components/DetailPageTemplate.tsx` (line 505)
    - Current: Uses `openLead` function
    - Action: Already uses LeadCaptureModal (good)

## Summary
- **Total CTAs found:** 43
- **Should use LeadCaptureModal:** ~40
- **Should use mailto:** 2-3 (simple inquiries, support)
- **Keep as navigation link:** 1 (footer Contact link)

## Strategy
1. **LeadCaptureModal** - For all sales, consultation, demo, BOM requests
2. **mailto:info@palcnetworks.com** - For simple inquiries, support, general questions
3. **Keep contact page link** - Only in footer navigation (not CTA buttons)

