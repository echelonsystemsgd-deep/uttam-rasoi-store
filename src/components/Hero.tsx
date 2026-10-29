'use client';

import React from 'react';
import { Sparkles, Star, ShieldCheck, Heart, ArrowRight, Play, CheckCircle2, Flame, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Hero: React.FC = () => {
  const { addToCart, setIsCartOpen } = useStore();

  // Find featured products for the trio
  const garamMasala = PRODUCTS.find((p) => p.id === 'royal-shahi-garam-masala');
  const kitchenKing = PRODUCTS.find((p) => p.id === 'traditional-kitchen-king-masala');
  const kashmiriMirch = PRODUCTS.find((p) => p.id === 'kashmiri-degi-mirch');

  const addTrioToCart = () => {
    if (garamMasala) addToCart(garamMasala, 0, 1);
    if (kitchenKing) addToCart(kitchenKing, 0, 1);
    if (kashmiriMirch) addToCart(kashmiriMirch, 0, 1);
    setIsCartOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/80 via-background to-secondary/40 pt-8 pb-14 sm:pt-16 sm:pb-20">
      
      {/* Decorative ambient background accents */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[37.5rem] h-[18.75rem] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[24rem] h-[24rem] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-[20rem] h-[20rem] bg-veg/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-foreground text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Ghar Ka Swad, Modern Kitchen</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-veg font-bold">Curated by Neelam</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-foreground tracking-tight leading-[1.15]">
              Pure Flavours.{' '}
              <span className="block mt-1 sm:mt-2 text-primary">
                Modern Kitchen.
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-normal italic text-foreground/90 mt-2">
                Handcrafted with Homemaker's Love.
              </span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              100% stone-ground spices slow-milled to preserve volatile essential oils. Zero artificial food color, zero anti-caking fillers, and zero preservatives. Tested and loved daily across 50,000+ Indian family kitchens.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm font-medium text-foreground max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-veg flex-shrink-0" />
                <span>100% Stone-Ground</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-veg flex-shrink-0" />
                <span>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-veg flex-shrink-0" />
                <span>FSSAI Certified Pure</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollToSection('product-catalog')}
                className="w-full sm:w-auto gap-2 group shadow-soft"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('shoppable-vlogs')}
                className="w-full sm:w-auto gap-2.5 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span>Watch Kitchen Story</span>
              </Button>
            </div>

            {/* Social Trust Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-card object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-card">
                  50k+
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-foreground ml-1.5">4.9 / 5</span>
                </div>
                <span>Trusted by 3,800+ homemakers & vlog subscribers</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Spotlight Feature Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Clean border container */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-primary/30 via-accent/30 to-veg/30 shadow-soft">
              <div className="bg-card rounded-[22px] p-6 sm:p-7 relative overflow-hidden border border-border">
                
                {/* Floating Hot Tag */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="bestseller" className="gap-1.5 uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-accent" />
                    Signature Bestseller
                  </Badge>
                  <Badge variant="fssai" className="gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FSSAI Certified</span>
                  </Badge>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden group mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                    alt="Ultimate Kitchen Masala Trio"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs font-medium text-amber-300 uppercase tracking-widest">Neelam's Daily Secret</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">Ultimate Kitchen Masala Trio</h3>
                    <p className="text-xs text-cream-100">Royal Garam Masala + Kitchen King + Kashmiri Degi Mirch</p>
                  </div>

                  {/* 100% Veg Green Dot */}
                  <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm p-1 rounded border border-veg">
                    <div className="w-2.5 h-2.5 rounded-full bg-veg" />
                  </div>
                </div>

                {/* Bundle items list */}
                <div className="space-y-2 mb-5 text-xs text-foreground">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">1x Royal Shahi Garam Masala (100g)</span>
                    </div>
                    <span className="text-muted-foreground">₹149</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">1x Traditional Kitchen King (100g)</span>
                    </div>
                    <span className="text-muted-foreground">₹129</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-medium">1x Pure Kashmiri Degi Mirch (200g)</span>
                    </div>
                    <span className="text-muted-foreground">₹189</span>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-foreground font-sans">₹369</span>
                      <span className="text-sm line-through text-muted-foreground font-medium">₹467</span>
                      <span className="text-xs font-bold text-veg bg-forestSage-50 border border-veg/20 px-2 py-0.5 rounded-md">Save ₹98</span>
                    </div>
                    <span className="text-[11px] text-veg font-medium block">Free Delivery Included</span>
                  </div>

                  <Button
                    onClick={addTrioToCart}
                    className="gap-2 shadow-sm font-bold"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get The Trio</span>
                  </Button>
                </div>

              </div>
            </div>

            {/* Floating review card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-card/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft border border-border hidden sm:flex items-center gap-3 max-w-xs animate-fadeIn">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 text-primary">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">"Changed our Sunday gravies!"</p>
                <p className="text-muted-foreground text-[11px]">— Suman R., Verified Buyer</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
