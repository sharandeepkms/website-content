# Solutions Pages Banner Images - File Path and Names Guide

## Base Directory
All solutions banner images should be placed in:
```
public/images/solutions/
```

## Required Banner Image Files

### 1. Data Center Modernization & AI Fabrics
- **File Name:** `data-center-modernization-ai-fabrics-banner.png`
- **Full Path:** `public/images/solutions/data-center-modernization-ai-fabrics-banner.png`
- **Solution Slug:** `data-center-modernization-ai-fabrics`
- **Current Reference:** `/images/solutions/dc-ai-fabric-hero.svg` (to be replaced with PNG)

### 2. SONiC & Open Networking
- **File Name:** `sonic-open-networking-banner.png`
- **Full Path:** `public/images/solutions/sonic-open-networking-banner.png`
- **Solution Slug:** `sonic-open-networking`
- **Current Reference:** `/images/solutions/sonic-hero.svg` (to be replaced with PNG)

### 3. Cloud & Hybrid Cloud
- **File Name:** `cloud-hybrid-cloud-banner.png`
- **Full Path:** `public/images/solutions/cloud-hybrid-cloud-banner.png`
- **Solution Slug:** `cloud-hybrid-cloud`
- **Current Reference:** `/images/solutions/cloud-hybrid-hero.svg` (to be replaced with PNG)

### 4. Network Observability & Visibility
- **File Name:** `network-observability-visibility-banner.png`
- **Full Path:** `public/images/solutions/network-observability-visibility-banner.png`
- **Solution Slug:** `network-observability-visibility`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

### 5. Network Observability
- **File Name:** `network-observability-banner.png`
- **Full Path:** `public/images/solutions/network-observability-banner.png`
- **Solution Slug:** `network-observability`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

### 6. Telecom & Edge (TIP / O-RAN / 5G)
- **File Name:** `telecom-edge-banner.png`
- **Full Path:** `public/images/solutions/telecom-edge-banner.png`
- **Solution Slug:** `telecom-edge`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

### 7. Identity & Access Management (IAM)
- **File Name:** `identity-access-management-banner.png`
- **Full Path:** `public/images/solutions/identity-access-management-banner.png`
- **Solution Slug:** `identity-access-management`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

### 8. IAM (Alternative Route)
- **File Name:** `iam-banner.png`
- **Full Path:** `public/images/solutions/iam-banner.png`
- **Solution Slug:** `iam`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

### 9. Data Center Modernization
- **File Name:** `data-center-modernization-banner.png`
- **Full Path:** `public/images/solutions/data-center-modernization-banner.png`
- **Solution Slug:** `data-center-modernization`
- **Current Reference:** `/images/placeholder-hero.svg` (to be replaced with PNG)

## Quick Reference List

Copy this list for easy reference:

```
public/images/solutions/data-center-modernization-ai-fabrics-banner.png
public/images/solutions/sonic-open-networking-banner.png
public/images/solutions/cloud-hybrid-cloud-banner.png
public/images/solutions/network-observability-visibility-banner.png
public/images/solutions/network-observability-banner.png
public/images/solutions/telecom-edge-banner.png
public/images/solutions/identity-access-management-banner.png
public/images/solutions/iam-banner.png
public/images/solutions/data-center-modernization-banner.png
```

## Image Specifications

- **Format:** PNG (required)
- **Recommended Dimensions:** 1920x600px (16:5 aspect ratio) or 1920x800px (12:5 aspect ratio) for banner sections
- **File Size:** Optimize for web (under 500KB recommended)
- **Naming Convention:** Use lowercase with hyphens (kebab-case), ending with `-banner.png`
- **Usage:** These images are displayed in the hero/banner section of solution detail pages

## Notes

- All images should be placed in the `public/images/solutions/` directory
- The file names must match exactly (case-sensitive)
- Images will be automatically served with the basePath (`/palc-staging`) prefix on staging server
- If an image is missing, the system will fallback to a placeholder image (`/images/placeholder-hero.svg`)
- After adding PNG files, update the `heroImage` prop in each solution page file to use the new PNG path instead of SVG or placeholder

## Solution Page Files to Update

After adding the PNG files, update these files to reference the new banner images:

1. `app/solutions/data-center-modernization-ai-fabrics/page.tsx` - Update `heroImage` prop
2. `app/solutions/sonic-open-networking/page.tsx` - Update `heroImage` prop
3. `app/solutions/cloud-hybrid-cloud/page.tsx` - Update `heroImage` prop
4. `app/solutions/network-observability-visibility/page.tsx` - Update `heroImage` prop
5. `app/solutions/network-observability/page.tsx` - Update `heroImage` prop
6. `app/solutions/telecom-edge/page.tsx` - Update `heroImage` prop
7. `app/solutions/identity-access-management/page.tsx` - Update `heroImage` prop
8. `app/solutions/iam/page.tsx` - Update `heroImage` prop
9. `app/solutions/data-center-modernization/page.tsx` - Update `heroImage` prop

