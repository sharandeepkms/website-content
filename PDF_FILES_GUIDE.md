# Case Study PDF Files Guide

## PDF File Names and Paths

All case study PDF files should be placed in the `public/pdfs/case-studies/` directory.

### Required PDF Files (18 total):

1. **dpdk-ipsec-security-gateway.pdf**
   - Path: `public/pdfs/case-studies/dpdk-ipsec-security-gateway.pdf`
   - Case Study: DPDK IPSec Security Gateway

2. **cord-pon-aggregation-switch.pdf**
   - Path: `public/pdfs/case-studies/cord-pon-aggregation-switch.pdf`
   - Case Study: CORD PON Aggregation Switch

3. **white-box-packet-optical-nos.pdf**
   - Path: `public/pdfs/case-studies/white-box-packet-optical-nos.pdf`
   - Case Study: White Box Packet Optical NOS

4. **goldstone-oopt-nos.pdf**
   - Path: `public/pdfs/case-studies/goldstone-oopt-nos.pdf`
   - Case Study: Goldstone – OOPT NOS

5. **segment-routing-development.pdf**
   - Path: `public/pdfs/case-studies/segment-routing-development.pdf`
   - Case Study: Segment Routing Development

6. **white-box-nos-porting.pdf**
   - Path: `public/pdfs/case-studies/white-box-nos-porting.pdf`
   - Case Study: White Box NOS Porting

7. **egress-qos.pdf**
   - Path: `public/pdfs/case-studies/egress-qos.pdf`
   - Case Study: Egress QoS

8. **open-cord-r-cord-deployment.pdf**
   - Path: `public/pdfs/case-studies/open-cord-r-cord-deployment.pdf`
   - Case Study: Open CORD / R-CORD Deployment

9. **network-management.pdf**
   - Path: `public/pdfs/case-studies/network-management.pdf`
   - Case Study: Network Management

10. **network-analytics.pdf**
    - Path: `public/pdfs/case-studies/network-analytics.pdf`
    - Case Study: Network Analytics

11. **cloud-native-application-development.pdf**
    - Path: `public/pdfs/case-studies/cloud-native-application-development.pdf`
    - Case Study: Cloud Native Application Development

12. **falca.pdf**
    - Path: `public/pdfs/case-studies/falca.pdf`
    - Case Study: Falca

13. **supply-chain-solution.pdf**
    - Path: `public/pdfs/case-studies/supply-chain-solution.pdf`
    - Case Study: Supply Chain Solution

14. **build-time-optimization.pdf**
    - Path: `public/pdfs/case-studies/build-time-optimization.pdf`
    - Case Study: Build Time Optimization

15. **real-time-video-streaming.pdf**
    - Path: `public/pdfs/case-studies/real-time-video-streaming.pdf`
    - Case Study: Real-Time Video Streaming

16. **transport-technology-software-development.pdf**
    - Path: `public/pdfs/case-studies/transport-technology-software-development.pdf`
    - Case Study: Transport Technology Software Development

17. **onf-voltha-olt-certification-procedure.pdf**
    - Path: `public/pdfs/case-studies/onf-voltha-olt-certification-procedure.pdf`
    - Case Study: ONF VOLTHA OLT Certification Procedure

18. **porting-commercial-nos-marvell-gen6.pdf**
    - Path: `public/pdfs/case-studies/porting-commercial-nos-marvell-gen6.pdf`
    - Case Study: Porting commercial-NOS on to Marvell Gen-6 switching ASICs

## Directory Structure

```
public/
  └── pdfs/
      └── case-studies/
          ├── dpdk-ipsec-security-gateway.pdf
          ├── cord-pon-aggregation-switch.pdf
          ├── white-box-packet-optical-nos.pdf
          ├── goldstone-oopt-nos.pdf
          ├── segment-routing-development.pdf
          ├── white-box-nos-porting.pdf
          ├── egress-qos.pdf
          ├── open-cord-r-cord-deployment.pdf
          ├── network-management.pdf
          ├── network-analytics.pdf
          ├── cloud-native-application-development.pdf
          ├── falca.pdf
          ├── supply-chain-solution.pdf
          ├── build-time-optimization.pdf
          ├── real-time-video-streaming.pdf
          ├── transport-technology-software-development.pdf
          ├── onf-voltha-olt-certification-procedure.pdf
          └── porting-commercial-nos-marvell-gen6.pdf
```

## Naming Convention

- All file names are lowercase
- Words are separated by hyphens (-)
- File extension is `.pdf`
- File names match the `slug` field in the case study data

## How to Add PDFs

1. Create the directory if it doesn't exist: `public/pdfs/case-studies/`
2. Place each PDF file with the exact name listed above
3. The PDFs will be automatically linked on the case study detail pages
4. Users can download PDFs by clicking the "Get Case Study PDF" button

## Notes

- PDF files are referenced in the case study data via the `pdfUrl` field
- The URL format is: `/pdfs/case-studies/{slug}.pdf`
- If a PDF is not available, the download button will not appear on the page

