# Case Study PDF Files - Complete List

## Base Path
All PDF files should be located in: `public/pdfs/case-studies/`

## Full URL Path Format
`/pdfs/case-studies/{filename}.pdf`

---

## PDF Files List

| # | Case Study Title | Slug | PDF Filename | Full Path |
|---|------------------|------|--------------|-----------|
| 
| 6 | White Box NOS Porting | `white-box-nos-porting` | `white-box-nos-porting.pdf` | `/pdfs/case-studies/white-box-nos-porting.pdf` |
| 7 | Egress QoS | `egress-qos` | `egress-qos.pdf` | `/pdfs/case-studies/egress-qos.pdf` |
| 8 | Open CORD / R-CORD Deployment | `open-cord-r-cord-deployment` | `open-cord-r-cord-deployment.pdf` | `/pdfs/case-studies/open-cord-r-cord-deployment.pdf` |
| 9 | Network Management | `network-management` | `network-management.pdf` | `/pdfs/case-studies/network-management.pdf` |
| 10 | Network Analytics | `network-analytics` | `Network-Analytics Case-Study.pdf` | `/pdfs/case-studies/Network-Analytics Case-Study.pdf` |
| 11 | Cloud Native Application Development | `cloud-native-application-development` | `cloud-native-application-development.pdf` | `/pdfs/case-studies/cloud-native-application-development.pdf` |
| 12 | Falca | `falca` | `falca.pdf` | `/pdfs/case-studies/falca.pdf` |
| 13 | Supply Chain Solution | `supply-chain-solution` | `supply-chain-solution.pdf` | `/pdfs/case-studies/supply-chain-solution.pdf` |
| 14 | Build Time Optimization | `build-time-optimization` | `build-time-optimization.pdf` | `/pdfs/case-studies/build-time-optimization.pdf` |
| 15 | Real-Time Video Streaming | `real-time-video-streaming` | `real-time-video-streaming.pdf` | `/pdfs/case-studies/real-time-video-streaming.pdf` |
| 16 | Transport Technology Software Development | `transport-technology-software-development` | `transport-technology-software-development.pdf` | `/pdfs/case-studies/transport-technology-software-development.pdf` |
| 17 | ONF VOLTHA OLT Certification Procedure | `onf-voltha-olt-certification-procedure` | `onf-voltha-olt-certification-procedure.pdf` | `/pdfs/case-studies/onf-voltha-olt-certification-procedure.pdf` |
| 18 | Porting commercial-NOS on to Marvell Gen-6 switching ASICs | `porting-commercial-nos-marvell-gen6` | `Marvell Gen-6 switching ASICs Case-Study.pdf` | `/pdfs/case-studies/Marvell Gen-6 switching ASICs Case-Study.pdf` |
| 19 | SONiC Deployment for National-Scale Digital Payments Modernization | `sonic-deployment-national-scale-digital-payments-modernization` | `sonic-deployment-national-scale-digital-payments-modernization.pdf` | `/pdfs/case-studies/sonic-deployment-national-scale-digital-payments-modernization.pdf` |

---

## File System Paths

### Windows Path Format
```
public\pdfs\case-studies\{filename}.pdf
```

### Linux/Mac Path Format
```
public/pdfs/case-studies/{filename}.pdf
```

---

## Quick Reference - Filenames Only

1. `dpdk-ipsec-security-gateway.pdf`
2. `cord-pon-aggregation-switch.pdf`
3. `white-box-packet-optical-nos.pdf`
4. `OOPT NOS-Goldstone Case-Study.pdf`
5. `segment-routing-development.pdf`
6. `white-box-nos-porting.pdf`
7. `egress-qos.pdf`
8. `open-cord-r-cord-deployment.pdf`
9. `network-management.pdf`
10. `Network-Analytics Case-Study.pdf`
11. `cloud-native-application-development.pdf`
12. `falca.pdf`
13. `supply-chain-solution.pdf`
14. `build-time-optimization.pdf`
15. `real-time-video-streaming.pdf`
16. `transport-technology-software-development.pdf`
17. `onf-voltha-olt-certification-procedure.pdf`
18. `Marvell Gen-6 switching ASICs Case-Study.pdf`
19. `sonic-deployment-national-scale-digital-payments-modernization.pdf`

---

## Notes

- **Total PDFs**: 19
- **Location**: All PDFs are in `public/pdfs/case-studies/` directory
- **URL Format**: `/pdfs/case-studies/{filename}.pdf`
- **Special Characters**: Some filenames contain spaces and special characters (e.g., `OOPT NOS-Goldstone Case-Study.pdf`, `Network-Analytics Case-Study.pdf`, `Marvell Gen-6 switching ASICs Case-Study.pdf`)

---

## Verification

To verify all PDFs exist, check:
```bash
# Windows PowerShell
Get-ChildItem -Path "public\pdfs\case-studies" -Filter "*.pdf" | Select-Object Name

# Linux/Mac
ls public/pdfs/case-studies/*.pdf
```

