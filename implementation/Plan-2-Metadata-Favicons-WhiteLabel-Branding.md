# Implementation Plan 2: Metadata, Custom Favicons, Web Manifest & 100% White-Label Branding

**Target Platform:** `uttam-rasoi-store.vercel.app`  
**Focus:** Removing Default/Vercel/Next.js Brand Signatures, Generating Native Favicons, Apple Touch Icons, and Schema SEO  
**Status:** Ready for Execution  

---

## 1. Problem Statement & Audit Findings

To achieve a true enterprise-grade direct-to-consumer storefront for creator Neelam Saurabh Sharma:
1. **Missing Custom Brand Favicons:**
   * Currently lacks a dedicated brand `.svg` and `.ico` icon representing the "उ" Devanagari monogram and terracotta artisan leaf.
2. **Missing Web App Manifest:**
   * Browsers and mobile "Add to Home Screen" actions lack an official `manifest.webmanifest` defining `theme_color`, `background_color`, and standalone PWA displays.
3. **Eradication of Vendor References:**
   * Next.js metadata must explicitly define `generator`, `publisher`, `creator`, `applicationName` as **Uttam Rasoi by Neelam**, eliminating any standard framework footprints.
4. **Custom 404 Error Experience:**
   * A bespoke `src/app/not-found.tsx` page matching the terracotta/cream palette must replace any default Next.js 404 pages.

---

## 2. Technical Remediation Plan

### 2.1 Brand Icon Creation (`public/favicon.svg`, `public/icon.svg`, `public/apple-touch-icon.png`)
* Generate an official SVG brand insignia with:
  - Background: Terracotta squircle `#C85A32`
  - Forefront: Stylized golden Devanagari character **"उ"** with modern culinary leaf motif `#FDFBF7`
  - Gold accent trim `#D48B38`
* Register in `src/app/layout.tsx`:
  ```ts
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
  ```

### 2.2 Native Web App Manifest (`src/app/manifest.ts`)
* Define Next.js 14 App Router native `manifest.ts`:
  ```ts
  import { MetadataRoute } from 'next';

  export default function manifest(): MetadataRoute.Manifest {
    return {
      name: 'Uttam Rasoi by Neelam',
      short_name: 'Uttam Rasoi',
      description: '100% Pure, Stone-Ground Indian Spices, Pre-Seasoned Cast Iron Cookware & Aesthetic Storage',
      start_url: '/',
      display: 'standalone',
      background_color: '#FDFBF7',
      theme_color: '#C85A32',
      icons: [
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    };
  }
  ```

### 2.3 Comprehensive White-Label Metadata (`src/app/layout.tsx`)
* Set:
  - `generator: 'Uttam Rasoi Digital Engine'`
  - `applicationName: 'Uttam Rasoi by Neelam'`
  - `creator: 'Neelam Saurabh Sharma'`
  - `publisher: 'Uttam Rasoi'`
  - `formatDetection: { telephone: true, date: true, address: true, email: true }`
  - Canonical and language alternates (`en-IN`, `hi-IN`)
  - OpenGraph & Twitter tags with absolute URLs and 1200x630 rich card images.

### 2.4 Branded 404 Not Found Page (`src/app/not-found.tsx`)
* Create a dedicated `not-found.tsx` with:
  - Warm chef icon & "404 - Rasoi Ka Rasta Bhatak Gaye!"
  - Reassurance copy & direct link back to home.
