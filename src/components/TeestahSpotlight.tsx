'use client';

import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, Heart, ShieldCheck, ArrowRight, MessageSquare, Shirt } from 'lucide-react';
import { getWhatsAppLink } from '../config/site';

export const TeestahSpotlight: React.FC = () => {
  const teestahProducts = PRODUCTS.filter((p) => p.category === 'teestah-label');

  return (
    <section id="teestah-label" className="py-16 sm:py-24 bg-gradient-to-b from-cream-100/90 via-cream-50 to-cream-100/60 border-t border-cream-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-rose-100/80 text-rose-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-rose-200/60">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Neelam's New Apparel Venture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-charcoal-900 tracking-tight leading-tight">
              Teestah Label,{' '}
              <span className="italic font-normal text-terracotta-600">Handcrafted Living</span>
            </h2>

            <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed">
              Designed by lifestyle creator Neelam Saurabh Sharma. Breathable, pure combed Mulmul cotton suits with real pockets, pre-washed slub kitchen aprons, and handwoven dining table linens crafted for comfortable daily homemaking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={getWhatsAppLink('Namaste Neelam ji, I want to inquire about custom sizes in Teestah Label suits')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-cream-100 text-charcoal-800 border border-cream-300 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-forestSage-700" />
              <span>Custom Size Inquiry</span>
            </a>

            <a
              href="#product-catalog"
              className="px-5 py-2.5 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-warm transition-all"
            >
              <span>Explore All {teestahProducts.length} Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-cream-200/80 shadow-soft space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold mb-2">
              <Shirt className="w-5 h-5 text-rose-600" />
            </div>
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">100% Breathable Mulmul</h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Featherlight natural cotton with zero polyester blends. Keeps you cool through long kitchen cooking routines.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cream-200/80 shadow-soft space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-amberSpice-50 text-amberSpice-700 flex items-center justify-center font-bold mb-2">
              <Heart className="w-5 h-5 text-amberSpice-600" />
            </div>
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">Real Functional Pockets</h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Every kurti and apron features deep, reinforced pockets sized for modern smartphones and everyday homemaker essentials.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cream-200/80 shadow-soft space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-forestSage-50 text-forestSage-700 flex items-center justify-center font-bold mb-2">
              <ShieldCheck className="w-5 h-5 text-forestSage-700" />
            </div>
            <h4 className="font-serif font-bold text-charcoal-900 text-sm">Artisan Direct Fair Price</h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Direct hand-block artisans from Jaipur and Chanderi weavers with zero boutique retail markups.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teestahProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Teestah VIP Club Strip */}
        <div className="mt-12 bg-charcoal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-1.5 text-center md:text-left z-10">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold font-mono">
              Teestah VIP Family Drop
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Upcoming Festive Pure Silk & Cotton Suit Drop
            </h3>
            <p className="text-xs text-cream-300 max-w-xl">
              Neelam personally curates limited small-batch collections. Join the waitlist to receive private pre-booking links before public video announcements.
            </p>
          </div>

          <a
            href={getWhatsAppLink('Namaste Neelam ji, please add me to the Teestah Label VIP Drop waitlist!')}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-warm transition-transform active:scale-95 flex-shrink-0"
          >
            <span>Join VIP Waitlist (WhatsApp)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
