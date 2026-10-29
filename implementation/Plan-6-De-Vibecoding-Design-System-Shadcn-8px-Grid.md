# Master Implementation Plan 6: De-Vibecoding, shadcn/ui Design System & 8px Mathematical Grid

**Target URL:** `https://uttam-rasoi-store.vercel.app`  
**Repository:** `https://github.com/echelonsystemsgd-deep/uttam-rasoi-store`  
**Brand Archetype:** Warm Heritage Editorial D2C (Subko / Blue Tokai benchmark)  
**Status:** Completed & Production Verified (0 Errors)

---

## 1. Context & Motivation

Following user critiques on AI-generated / "vibecoded" websites (arbitrary spacing, random color hexes, mismatched stock photography, lack of cohesive component systems):
1. **Doubled down on a single UI library architecture:** Standardized 100% on **shadcn/ui** primitives (Radix-backed) styled with Tailwind CSS variables and the `cn` utility (`clsx` + `tailwind-merge`).
2. **Eliminated "vibecoded" random padding/colors:** Replaced arbitrary values with a **strict 8px / rem mathematical grid system** (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `5rem`).
3. **Established the 60-30-10 Color System:** Replaced fragmented inline hex codes with semantic HSL CSS tokens (`--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--veg`, `--border`, `--radius`).
4. **Curated Culinary Photography Pipeline:** Replaced all mismatched placeholder photos (e.g. broccoli placeholder on Lakadong Haldi, restaurant booth seating on Cast Iron Kadhai, fried rice on Spice Jars) with authentic high-resolution Indian spices, cast-iron cookware, and artisan packaging.

---

## 2. Architecture & Token System

### 2.1 Color Tokens (`globals.css` & `tailwind.config.js`)
* **60% Canvas & Surfaces:**
  * `--background`: `38 28% 97%` (`#FAF8F5` Warm Artisan Linen)
  * `--card`: `0 0% 100%` (`#FFFFFF` Crisp Card Surface)
  * `--secondary`: `36 24% 93%` (`#F3EFEA` Secondary Canvas)
* **30% Typography & Structure:**
  * `--foreground`: `24 10% 12%` (`#1C1917` Deep Espresso Slate)
  * `--muted-foreground`: `25 8% 44%` (`#736B63` Editorial Charcoal Body)
  * `--border`: `35 18% 88%` (`#E5DED5` Hairline Warm Border)
* **10% Action & Accent:**
  * `--primary`: `16 63% 49%` (`#C85A32` Artisan Terracotta)
  * `--primary-hover`: `16 68% 42%` (`#B24925`)
  * `--accent`: `36 90% 48%` (`#E8921A` Spiced Honey)
  * `--veg`: `152 45% 24%` (`#22583F` 100% Vegetarian Green Dot)

### 2.2 8-Point Spacing Grid (in `rem`)
* `0.25rem` (4px): Micro badges and icon gaps
* `0.5rem` (8px): Tag chips, button internal inline gaps (`py-2`, `gap-2`)
* `1rem` (16px): Standard form inputs, content gutters (`p-4`)
* `1.5rem` (24px): Card interior padding, grid gaps (`gap-6`, `p-6`)
* `2rem` (32px): Component blocks and container padding
* `3rem` (48px): Sub-section vertical rhythm
* `4rem` (64px) / `5rem` (80px): Major section breaks (`py-16`, `py-20`)

---

## 3. Implemented Components & Primitives

1. **`src/lib/utils.ts`**: Standard shadcn `cn` utility combining `clsx` and `tailwind-merge`.
2. **`src/components/ui/button.tsx`**: `cva`-powered Button supporting variants (`default`, `secondary`, `outline`, `ghost`, `link`, `veg`) and sizes (`default`, `sm`, `lg`, `icon`, `icon-sm`).
3. **`src/components/ui/badge.tsx`**: Semantic Badges (`default`, `secondary`, `bestseller`, `fssai`, `veg`, `outline`).
4. **`src/components/ui/card.tsx`**: Structured Card primitives (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
5. **`src/components/ui/input.tsx`**: Accessible, consistent input styling with focus ring states.
6. **`src/components/ui/separator.tsx`**: Semantic hairline divider primitives.

---

## 4. Refactored Application Components

* **`ProductCard.tsx`**: Refactored to utilize shadcn `Button` and `Badge`, fixed typography hierarchy, strict 8px spacing, and responsive stepper controls.
* **`Hero.tsx`**: Streamlined ambient gradients, clean button variants, unified typography tokens, and social trust indicators.
* **`ProductCatalog.tsx`**: 12-column responsive layout, unified filter pill state, and FSSAI guarantee banner.
* **`ShoppableVlogs.tsx`**: Aligned video cards, aspect-video embeds, and recipe kit shelf.
* **`SlideCart.tsx`**: Cart drawer refactored with clean `Input` for coupons, `Button` for checkout, and dynamic free shipping progress bar.
* **`PincodeModal.tsx`**: Upgraded with `Input`, `Button`, and quick-select metro pills.
* **`TeestahSpotlight.tsx`**: Warm editorial cards with structured value pillars.
* **`TrustBadges.tsx` & `AnnouncementBar.tsx`**: Clean tokens and strict 8px vertical padding.
* **Universal Keyboard Listeners:** Added explicit `Escape` key handlers across `RecipeModal`, `ProductQuickViewModal`, and `CheckoutModal`.

---

## 5. Verification & Quality Gates

* **TypeScript Compilation:** Passed with 0 errors.
* **Next.js 14 Production Build:** Passed with 100% static page generation (5/5 routes prerendered).
* **Cross-Viewport Responsiveness:** Tested and verified on desktop (1440×900) and mobile (390×844) with 0 horizontal scroll overflow (`hasOverflow: false`).
