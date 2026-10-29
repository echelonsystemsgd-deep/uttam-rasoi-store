'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter, CheckCircle2 } from 'lucide-react';

type CategoryFilter = 'all' | 'pure-spices' | 'signature-masalas' | 'kitchen-organization' | 'gift-bundles';

export const ProductCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const CATEGORY_TABS: { id: CategoryFilter; label: string; badge?: string }[] = [
    { id: 'all', label: 'All Essentials' },
    { id: 'pure-spices', label: 'Pure Spices', badge: 'Stone-Ground' },
    { id: 'signature-masalas', label: 'Signature Masalas', badge: 'Neelam’s Blend' },
    { id: 'kitchen-organization', label: 'Cookware & Jars', badge: 'Cast Iron & Glass' },
    { id: 'gift-bundles', label: 'Gift Hampers', badge: 'Festive Box' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="product-catalog" className="py-16 sm:py-20 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amberSpice-100 text-amberSpice-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amberSpice-600" />
            <span>Neelam’s Daily Pantry Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-charcoal-900 tracking-tight">
            Handcrafted with Purity,{' '}
            <span className="italic font-normal text-terracotta-600">Delivered Fresh</span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-600 font-sans">
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
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-xs ${
                  isActive
                    ? 'bg-terracotta-600 text-white shadow-warm'
                    : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-terracotta-700 text-cream-100'
                        : 'bg-cream-200 text-charcoal-600'
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
        <div className="mt-14 bg-gradient-to-r from-forestSage-900 to-forestSage-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-amberSpice-400 flex-shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">100% Satisfaction & Purity Guarantee</h3>
              <p className="text-xs sm:text-sm text-cream-200 max-w-xl">
                If our spices don’t remind you of genuine home-ground purity from your grandmother’s kitchen, we’ll refund your order without asking any questions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-cream-300 block">FSSAI Certified</span>
              <span className="text-xs font-mono font-bold text-white">#13324001000492</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
