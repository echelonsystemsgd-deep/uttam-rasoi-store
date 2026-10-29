'use client';

import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, Heart, ShieldCheck, ArrowRight, MessageSquare, Shirt } from 'lucide-react';
import { getWhatsAppLink } from '../config/site';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const TeestahSpotlight: React.FC = () => {
  const teestahProducts = PRODUCTS.filter((p) => p.category === 'teestah-label');

  return (
    <section id="teestah-label" className="py-16 sm:py-24 bg-secondary/50 border-t border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="bestseller" className="gap-1.5 uppercase tracking-wider px-3.5 py-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Neelam's New Apparel Venture</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-foreground tracking-tight leading-tight">
              Teestah Label,{' '}
              <span className="italic font-normal text-primary">Handcrafted Living</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              Designed by lifestyle creator Neelam Saurabh Sharma. Breathable, pure combed Mulmul cotton suits with real pockets, pre-washed slub kitchen aprons, and handwoven dining table linens crafted for comfortable daily homemaking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={getWhatsAppLink('Namaste Neelam ji, I want to inquire about custom sizes in Teestah Label suits')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-card hover:bg-secondary text-foreground border border-border text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-veg" />
              <span>Custom Size Inquiry</span>
            </a>

            <a
              href="#product-catalog"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Explore All {teestahProducts.length} Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold mb-2">
              <Shirt className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-foreground">
              Deep Pockets in Both Kurta & Pants
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Everyday practicality engineered for homemakers. Carry your phone, car keys, or measuring spoons with zero hassle.
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-secondary text-veg flex items-center justify-center font-bold mb-2">
              <ShieldCheck className="w-5 h-5 text-veg" />
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-foreground">
              100% Breathable Combed Cotton
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pure, soft, pre-shrunk fabrics designed to survive Indian summer kitchen heat and countless machine washes.
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border shadow-subtle space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-secondary text-accent flex items-center justify-center font-bold mb-2">
              <Heart className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-foreground">
              Artisan Mill Handloom Weaves
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Handcrafted in Jaipur and Lucknow workshops with traditional hand-block printing and authentic Zari border work.
            </p>
          </div>
        </div>

        {/* Teestah Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teestahProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
