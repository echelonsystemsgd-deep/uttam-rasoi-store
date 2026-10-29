# Implementation Plan 1: Desktop, Tablet & Split-Screen Viewport Ergonomics & Image Reliability

**Target Platform:** `uttam-rasoi-store.vercel.app`  
**Focus:** Fixing Broken Unsplash Images, Split-Screen Layouts, Floating Nav Collisions, and Viewport Adaptability  
**Status:** Ready for Execution  

---

## 1. Problem Statement & Forensic Evidence (from User Screenshots)

Analysis of `media_1793277279974_e93b5311.png` and `media_1793277295771_2a580c14.png` revealed 5 specific layout defects when viewing on desktop split-screen (width between 768px and 1024px):

1. **Broken Unsplash Images (404 Error):**
   * Three image URLs in `src/data/products.ts` return HTTP 404:
     - `photo-1621996346565-e3d5d62810cd` (Kashmiri Mirch) -> Shows broken icon with alt text `"Pure"`
     - `photo-1584990347449-3e3c0f653457` (Cast Iron Kadhai & Brass Pan) -> Shows broken icon with alt text `"Hea"`
     - `photo-1584990347462-841fce3f738c` (Brass Pan) -> Shows broken icon with alt text `"Han"`
   * **Root Cause:** Unsplash removed or unindexed these asset IDs.
   * **Fix:** Replace with verified 200 OK food & cookware photos and implement global `onError` fallback handlers.

2. **Mobile Bottom Navigation Bar Collision on Split-Screen:**
   * In `MobileBottomNav.tsx`, the bar used `lg:hidden` (hiding only at >= 1024px).
   * On split-screen desktop windows (650px - 1000px), the mobile navigation bar rendered over the footer, obscuring payment badges ("Secured with: 1-Tap UPI... COD") and colliding with the floating WhatsApp button.
   * **Fix:** Change breakpoint to `md:hidden` (hides at >= 768px) and add `pb-20 md:pb-0` to the main layout to prevent overlap on mobile.

3. **Shoppable Vlogs Header Text Wrapping Glitch:**
   * In `ShoppableVlogs.tsx`, header text `Used In This Video:` and `View Recipe Steps` wrapped awkwardly into truncated fragments (`VIDEO:` / `Steps`).
   * **Fix:** Simplify to responsive flex layout: `Used in Recipe:` with badge styling and clean spacing.

4. **Shoppable Vlogs Grid on Split-Screen & Tablet:**
   * Grid was hardcoded to `grid-cols-1 md:grid-cols-3`. On split screen, 3 columns squeeze cards too tight.
   * **Fix:** Update grid to `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`.

5. **Footer YouTube Icon Fill Bug:**
   * In `Footer.tsx`, `<Youtube className="w-5 h-5 fill-current" />` filled both the outer shape and inner triangle with solid white, rendering as a solid white pill.
   * **Fix:** Remove `fill-current` so the YouTube icon renders cleanly with transparent inner play symbol.

---

## 2. Technical Remediation Plan

### 2.1 Image Asset Replacement (`src/data/products.ts`)
* Replace 404 URLs with verified 200 OK CDN URLs:
  - Kashmiri Mirch: `https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&w=800&q=80`
  - Cast Iron Kadhai: `https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?auto=format&fit=crop&w=800&q=80`
  - Brass Tadka Pan: `https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80`
* Add fallback image handler in all components:
  ```tsx
  onError={(e) => {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80';
  }}
  ```

### 2.2 Breakpoint Refinement (`MobileBottomNav.tsx` & `FloatingWhatsApp.tsx`)
* Change `MobileBottomNav.tsx` container from `lg:hidden` to `md:hidden`.
* Adjust `FloatingWhatsApp.tsx` positioning: `bottom-20 md:bottom-6` to avoid any overlap with bottom bar.
* In `src/app/layout.tsx`, wrap children with `pb-16 md:pb-0` to provide natural margin.

### 2.3 Shoppable Vlogs & Header Polish (`ShoppableVlogs.tsx` & `Navbar.tsx`)
* Clean up micro-shelf headers in `ShoppableVlogs.tsx` with truncate-safe labels.
* Fix `<Youtube />` fill style in `Footer.tsx`.
