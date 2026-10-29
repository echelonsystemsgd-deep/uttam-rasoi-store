# Uttam Rasoi by Neelam (उत्तम रसोई) — Artisan Indian Kitchen Storefront

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Edge-000000?style=flat-square&logo=vercel)](https://uttam-rasoi-store.vercel.app)
[![Brand Status](https://img.shields.io/badge/FSSAI-Certified%2013324001000492-green?style=flat-square)](https://uttam-rasoi-store.vercel.app)

> **"Pure Flavours. Modern Kitchen. Handcrafted with Homemaker's Love."**  
> Official modern D2C e-commerce platform and flagship digital storefront for **Uttam Rasoi by Neelam**, founded by Indian lifestyle and culinary creator **Neelam Saurabh Sharma** ([@indianyoutuberneelamvlogs](https://www.youtube.com/@indianyoutuberneelamvlogs)).

---

## 🌟 Live Storefront

* **Production URL:** [https://uttam-rasoi-store.vercel.app](https://uttam-rasoi-store.vercel.app)
* **GitHub Repository:** [https://github.com/echelonsystemsgd-deep/uttam-rasoi-store](https://github.com/echelonsystemsgd-deep/uttam-rasoi-store)
* **Target Audience:** Indian homemakers, diaspora culinary enthusiasts, and modern cooks seeking 100% pure, stone-ground, chemical-free spices, heavy pre-seasoned cookware, and aesthetic kitchen storage.

---

## ✨ Core Pillars & Architectural Innovations

### 1. 🎥 Shoppable YouTube Video Recipes ("Cook What You Watch")
* **Embedded Interactive Video Player:** Directly embeds authentic recipe walkthroughs (Restaurant-Style Shahi Paneer, Dhaba Dal Tadka, Spice Organization Tour) with autoplay and YouTube player controls.
* **1-Click Recipe Pantry Kit:** Automatically maps featured spices and cookware directly to the video timeline. Homemakers can click **"Add All To Cart"** to purchase every ingredient with a single tap.
* **Step-by-Step Cooking Guide:** Formatted, numbered kitchen instructions paired with preparation and cook timers.

### 2. 🇮🇳 Indian D2C Checkout & Payment Engine
* **1-Tap Indian UPI & Multi-Rail Payments:** Optimized for Google Pay, PhonePe, Paytm, RuPay, NetBanking, Credit/Debit cards, and Cash on Delivery (COD).
* **Dynamic Gamified Shipping Bar:** Real-time visual progress tracker (*"Add ₹150 more to unlock FREE Delivery!"* at ₹499 threshold).
* **Creator Coupon System:** Instant celebratory confetti triggers for codes like `NEELAM10` (10% OFF) and `FIRSTSWAD` (₹50 OFF).
* **Full Order Receipts & WhatsApp Tracking:** Direct sync with Neelam's VIP concierge WhatsApp channel (`+91 80477 63021`).

### 3. 📍 Verified PIN Code Delivery Checker
* **Express Speed Estimation:** Instant lookup across major Indian metros (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Lucknow, Chandigarh, Jaipur) with estimated dispatch timelines (e.g. *Tomorrow Express 24h*).
* **Non-Blocking Confirmation Flow:** Clear delivery speed and COD verification badge with explicit *"Confirm Delivery"* user action.

### 4. 🔒 Universal Background Body Scroll Lock
* **Zero Background Bleed:** When opening the mobile navigation menu, slide-out Cart drawer, Checkout modal, Pincode checker, Quick View, or Recipe Video player, the background page is strictly locked (`overflow: hidden; touch-action: none;`).
* **Hardware-Accelerated Smooth Overlays:** Fast touch response with zero stutter on iOS Safari and Android Chrome.

### 5. 📱 Omnichannel Responsive Design
* **Adaptive Split-Screen & Desktop Layouts:** Intelligent breakpoint management (`md:hidden` bottom nav) ensures desktop, tablet, and side-by-side browser windows display pristine proportions without UI clashes.
* **Mobile-First Bottom Dock:** Instant 1-tap navigation for Home, Spices, Recipes, Cart with badge counter, and Direct WhatsApp support.
* **WCAG 2.2 AA Accessibility:** Pinch-to-zoom unlocked (`maximum-scale=5`), high-contrast slate typography (`#1A1A1A`), warm terracotta (`#C85A32`), and deep forest sage (`#2C4A3E`).

### 6. 🏷️ 100% White-Label Branding & Metadata
* **Custom SVG Favicons & Apple Touch Icons:** High-resolution artisan Hindi logo mark (`उ`) in terracotta and amber gradients.
* **Web App Manifest (`manifest.json`):** Standalone PWA-ready mobile app capabilities.
* **Schema.org Structured Data:** Valid JSON-LD schemas for `Store`, `Organization`, `WebSite`, and `ProductCollection` to maximize Google Search rich snippet rankings.

### 7. 🌸 Teestah Label Integration (Apparel & Homemaker Linens)
* **Creator-Led Ethnic Wear & Kitchen Textiles:** Direct-to-consumer apparel line featuring pure breathable Mulmul cotton suits (3-piece with pockets), festive Chanderi Anarkali sets, heavy slub cotton kitchen aprons, and textured dining table runners.
* **Integrated Unified Checkout:** Homemakers can shop both their kitchen spices and daily cotton suits in a single mobile checkout drawer.

### 8. 🛒 Official Amazon Influencer Storefront Integration
* **Vlog Appliance Bridge (`amazon.in/shop/indianyoutuberneelam`):** Features the exact high-ticket appliances Neelam uses in her kitchen reset and recipe vlogs (`tag=indianyoutu06-21`):
  * *Philips HL7756/00 750W Heavy-Duty Mixer Grinder*
  * *Faber 3-Burner Toughened Glass Automatic Hob*
  * *The Indus Valley Tri-Ply Pressure Cooker*
* **Zero D2C Cannibalization:** Preserves 100% margin on consumable spices/cookware while earning creator affiliate commissions on heavy electricals.

---

## 🛠️ Tech Stack & Directory Structure

```
uttam-rasoi-store/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Schema.org JSON-LD and custom metadata
│   │   ├── page.tsx           # High-converting storefront homepage
│   │   ├── manifest.ts        # PWA Web App Manifest
│   │   ├── not-found.tsx      # Custom white-labeled 404 error page
│   │   └── globals.css        # Tailwind styling & animation keyframes
│   ├── components/
│   │   ├── AnnouncementBar.tsx # Urgency dispatch & coupon ticker
│   │   ├── CartDrawer.tsx      # Slide-out cart with free shipping meter
│   │   ├── CheckoutModal.tsx   # Indian D2C checkout with UPI/COD
│   │   ├── Hero.tsx            # High-impact creator lifestyle banner
│   │   ├── MobileBottomNav.tsx # Responsive sticky mobile dock
│   │   ├── Navbar.tsx          # Sticky navigation with live search & scroll-locked mobile menu
│   │   ├── PincodeModal.tsx    # Indian PIN code speed verifier
│   │   ├── PolicyModal.tsx     # Shipping, returns, and consumer policies
│   │   ├── ProductCatalog.tsx  # Spice & cookware catalog with category tabs
│   │   ├── QuickViewModal.tsx  # Product quick view modal
│   │   ├── RecipeModal.tsx     # Embedded YouTube recipe player & step guide
│   │   ├── ShoppableVlogs.tsx  # Vlog cards with direct shop links
│   │   ├── Testimonials.tsx    # 4.9-star verified homemaker reviews
│   │   └── Footer.tsx          # FSSAI certification, copyright & links
│   ├── context/
│   │   └── StoreContext.tsx    # Zustand/React state for Cart, Wishlist, Pincode & Scroll Lock
│   ├── data/
│   │   ├── products.ts         # High-resolution spice & cookware product catalog
│   │   └── vlogs.ts            # YouTube vlog metadata and verified embed IDs
│   └── types/
│       └── index.ts            # Strict TypeScript interfaces
├── public/
│   ├── favicon.svg             # Handcrafted SVG favicon
│   ├── icon.svg                # Application icon
│   └── apple-touch-icon.svg    # iOS home screen bookmark icon
└── implementation/             # Architecture blueprints & implementation logs
```

---

## 🚀 Local Development Setup

### Prerequisites
* **Node.js:** v18.17.0+ (Tested on Node v24.14.0)
* **npm:** v9.0.0+

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/echelonsystemsgd-deep/uttam-rasoi-store.git
cd uttam-rasoi-store

# Install production dependencies
npm install

# Run the local development server
npm run dev

# Open your browser at http://localhost:3000
```

### Production Build & Verification
```bash
# Compile and verify with 0 errors
npm run build

# Start production server locally
npm run start
```

---

## 📜 Compliance & Guarantees
* **FSSAI License:** 13324001000492 (Government Food Safety Certified)
* **Dietary Standard:** 100% Vegetarian Green Dot Certified
* **Purity Guarantee:** Stone-ground at low temperatures with zero artificial fillers or preservatives
* **Support Contact:** `care@uttamrasoi.com` | `+91 80477 63021` (Mon-Sat 10 AM - 7 PM IST)

---

© 2026 Uttam Rasoi by Neelam. Handcrafted with Homemaker's Love. All Rights Reserved.
