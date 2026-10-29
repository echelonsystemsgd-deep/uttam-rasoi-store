# Master Implementation Plan 5: Teestah Label & Amazon Influencer Ecosystem Integration

**Target URL:** `uttam-rasoi-store.vercel.app`  
**Brand Pillars:**  
1. **Uttam Rasoi by Neelam:** Pure Stone-Ground Spices, Handcrafted Cookware & Spice Storage  
2. **Teestah Label by Neelam:** Handcrafted Pure Cotton Suits, Daily Homemaker Kurtis & Kitchen Linens  
3. **Amazon Curated Appliances:** Vlog Equipment & Kitchen Electricals (`amazon.in/shop/indianyoutuberneelam?tag=indianyoutu06-21`)  
**Status:** In Progress / Coding  

---

## 1. Architectural Blueprint & Product Schema

### 1.1 Teestah Label (Apparel & Homemaker Linens)
Add authentic, creator-aligned apparel and kitchen linen items into `src/data/products.ts`:
- **Teestah Pure Mulmul Cotton Daily Suit Set (3-Piece):** Breathable, floral hand-block printed everyday homemaker suit with chiffon dupatta.
- **Teestah Chanderi Festive Anarkali Kurti Set:** Elegant pastel festive wear seen in her family celebration vlogs.
- **Teestah Artisan Cotton Kitchen Apron & Mitts Duo:** Durable 100% slub cotton apron with deep front utensil pockets.
- **Teestah Handwoven Table Runner & Mat Set:** Earthy bohemian dining decor matching her aesthetic home resets.

### 1.2 Amazon Influencer Curated Appliances
Add verified kitchen appliances from her video `vflgEKE-qvE` description with external routing (`amazonUrl` with tag `indianyoutu06-21`):
- **Philips HL7756/00 750W Mixer Grinder** (Neelam’s everyday masala & puree grinder)
- **Faber 3-Burner Glass Top Automatic Hob** (Seen in her kitchen makeover)
- **The Indus Valley Tri-Ply Stainless Steel Pressure Cooker**
- **Nestasia Fridge Organization Bins & Acrylic Jars**

---

## 2. Component Enhancements

### 2.1 Navigation & Branding (`Navbar.tsx`, `MobileBottomNav.tsx`)
- Add **"Teestah Label 🌸"** link in desktop nav and mobile drawer.
- Add **"Amazon Store ↗"** quick link in mobile drawer and announcement bar.

### 2.2 Product Catalog Filtering (`ProductCatalog.tsx`)
- Add two new high-impact category filter pills:
  - `Teestah Label (Apparel & Linens)`
  - `Vlog Appliances (Amazon Curated)`
- Render native cart actions for Teestah items and clean "Open on Amazon ↗" action buttons for electrical appliances.

### 2.3 Dedicated Teestah Label Homepage Spotlight (`TeestahSpotlight.tsx`)
- High-converting editorial showcase for Teestah Label:
  - Creator story: *"From Neelam’s Wardrobe To Yours — Handcrafted Pure Cotton Daily Wear & Linens"*.
  - Feature highlights: 100% Breathable Mulmul, Pre-Shrunk, Pockets in Kurtis, Homemaker Comfort.
  - Direct 1-tap "Shop Teestah Collection" anchor navigation.

### 2.4 Recipe Modal Video Player (`RecipeModal.tsx`)
- Beneath the spice pantry kit, render an expandable/clean shelf:
  - *"Kitchen Appliances Used in this Recipe"* linking with `tag=indianyoutu06-21`.

### 2.5 Site Configuration (`site.ts`) & Footer (`Footer.tsx`)
- Add `amazonStore` URL in `SITE_CONFIG`.
- Include Verified Amazon Influencer badge and Teestah Label brand mark in the footer.

---

## 3. Execution & Verification Steps

1. Update `src/types/index.ts` to support `isExternal?: boolean; amazonUrl?: string; badge?: string;`.
2. Update `src/data/products.ts` with Teestah Label and Amazon curated appliances.
3. Update `src/config/site.ts` with Amazon Influencer URL.
4. Create `src/components/TeestahSpotlight.tsx`.
5. Update `src/components/Navbar.tsx` and `src/components/Footer.tsx`.
6. Update `src/components/ProductCatalog.tsx` with Teestah and Amazon filters.
7. Update `src/components/RecipeModal.tsx` with appliances integration.
8. Update `src/app/page.tsx` with the new Teestah spotlight section.
9. Execute `npm run build` and ensure 0 errors.
10. Commit and push to `origin main`.
