'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

type CategoryFilter =
  | 'all'
  | 'pure-spices'
  | 'signature-masalas'
  | 'kitchen-organization'
  | 'teestah-label'
  | 'amazon-appliances'
  | 'gift-bundles';

export const ProductCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const CATEGORY_TABS: { id: CategoryFilter; label: string; badge?: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'pure-spices', label: 'Pure Spices', badge: 'Stone-Ground' },
    { id: 'signature-masalas', label: 'Signature Masalas', badge: 'Neelam’s Blend' },
    { id: 'teestah-label', label: 'Teestah Label', badge: 'Suits & Linens 🌸' },
    { id: 'kitchen-organization', label: 'Cookware & Jars', badge: 'Cast Iron & Glass' },
    { id: 'amazon-appliances', label: 'Appliances', badge: 'Amazon Curated' },
    { id: 'gift-bundles', label: 'Gift Hampers', badge: 'Festive Box' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="product-catalog" className="py-16 sm:py-20 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="bestseller" className="gap-1.5 uppercase tracking-wider px-3.5 py-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Neelam’s Daily Pantry Collection</span>
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-foreground tracking-tight">
            Handcrafted with Purity,{' '}
            <span className="italic font-normal text-primary">Delivered Fresh</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground font-sans">
            Batch-crafted in small quantities. Each spice is sun-dried, stone-ground, and vacuum-sealed to preserve natural essential oils that elevate every Indian meal.
          </p>
        </div>

        {/* Filter Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-foreground hover:bg-secondary border-border'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-primary-hover text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 bg-veg text-veg-foreground p-6 sm:p-8 rounded-3xl shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">100% Satisfaction & Purity Guarantee</h3>
              <p className="text-xs sm:text-sm text-veg-foreground/80 font-sans mt-0.5">
                If our aroma doesn't transform your daily cooking, we offer a hassle-free 7-day replacement or full refund.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold bg-white/15 px-3 py-1.5 rounded-lg">
              FSSAI Lic. #13324001000492
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
