# Implementation Plan 3: Embedded Video Player, Universal Scroll Locking, and PIN Code Verification UX

**Target Platform:** `uttam-rasoi-store.vercel.app`  
**Focus:** Embedded YouTube Video Player in Recipe Modal, Universal Background Body Scroll Lock, and PIN Verification Flow  
**Status:** In Progress / Execution  

---

## 1. Problem Statement & User Feedback Analysis

### 1.1 Embedded Video Playback ("no videos being played when user presses watch?")
* **Current Issue:** In `RecipeModal.tsx`, clicking "Watch" or the play icon opened a modal displaying a static thumbnail with step-by-step text, but lacked a playable video embed.
* **Solution:** 
  - Embed an interactive YouTube video player (`iframe` with `youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`) directly into the header of `RecipeModal.tsx`.
  - Add smooth toggle between "▶ Watch Cooking Video" and "📖 Recipe Steps & Ingredients".
  - Ensure video controls (play, pause, volume, fullscreen) function seamlessly across desktop, tablet, and mobile.
  - Update `RECIPE_VLOGS` in `src/data/vlogs.ts` with authentic, embeddable Indian culinary video IDs.

### 1.2 Universal Background Scroll Lock ("burger menu & modals should not allow the user to move the background site")
* **Current Issue:** When the mobile drawer menu or any overlay modal (`Cart`, `Checkout`, `Pincode`, `QuickView`, `Recipe`, `Policy`) was open, scrolling on touchscreens or trackpads caused the background page to scroll underneath the modal.
* **Solution:**
  - Implement a centralized `useBodyScrollLock` mechanism in `StoreContext.tsx` and `Navbar.tsx`.
  - When ANY modal, slide-out drawer, or the mobile burger menu is active, apply:
    ```ts
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    ```
  - Restore `document.body.style.overflow = ''` when all overlays close.

### 1.3 PIN Code Modal Verification Flow ("clicking verify takes them off the modal?")
* **Current Issue:** In `PincodeModal.tsx`, clicking "Verify" or a popular city button immediately executed `setIsPincodeModalOpen(false)`, kicking the user off the modal before they could read the delivery estimate ("Tomorrow Express 24h") or COD availability.
* **Solution:**
  - Keep the modal open upon verification!
  - Display an animated success card with delivery timelines and COD badge.
  - Provide a clear, prominent primary confirmation button: `"Confirm Delivery to [City] →"` so the user decides when to proceed.

---

## 2. Step-by-Step Execution Sequence

1. **Update `src/data/vlogs.ts`:**
   - Configure active, public embeddable YouTube IDs for the signature recipes (Shahi Paneer, Kitchen Organization, Dal Tadka).
2. **Update `src/components/RecipeModal.tsx`:**
   - Add YouTube embed iframe player with autoplay, sound controls, and fullscreen capability.
   - Retain 1-click "Add All Spices to Cart" and step-by-step checklist below the video player.
3. **Update `src/components/PincodeModal.tsx`:**
   - Retain verified state on click without prematurely dismissing the modal.
   - Add "Deliver to this PIN" confirmation CTA.
4. **Implement Body Scroll Locking:**
   - Add reactive `useEffect` in `StoreContext.tsx` covering all modal states.
   - Add reactive `useEffect` in `Navbar.tsx` covering `isMobileMenuOpen`.
5. **Update `README.md`:**
   - Comprehensive documentation with architecture, features, mobile optimization, and deployment links.
6. **Verify Build & Deploy:**
   - Run `npm run build` to guarantee 0 errors.
   - `git commit` and `git push` to `main`.
