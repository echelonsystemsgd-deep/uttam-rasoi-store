'use client';

import React from 'react';
import { Sparkles, Star, ShieldCheck, Heart, ArrowRight, Play, CheckCircle2, Flame, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { addToCart, setIsCartOpen, setQuickViewProduct } = useStore();

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
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-cream-200/50 pt-8 pb-14 sm:pt-12 sm:pb-20">
      
      {/* Decorative background blurs & motifs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amberSpice-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-forestSage-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-terracotta-100/90 border border-terracotta-200/80 px-4 py-1.5 rounded-full text-terracotta-800 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Ghar Ka Swad, Modern Kitchen</span>
              <span className="text-terracotta-400">•</span>
              <span className="text-forestSage-800 font-bold">Curated by Neelam</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-charcoal-900 tracking-tight leading-[1.15]">
              Pure Flavours.{' '}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 via-amberSpice-500 to-terracotta-700">
                Modern Kitchen.
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-normal italic text-charcoal-800 mt-2">
                Handcrafted with Homemaker's Love.
              </span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-charcoal-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              100% stone-ground spices slow-milled to preserve volatile essential oils. Zero artificial food color, zero anti-caking fillers, and zero preservatives. Tested and loved daily across 50,000+ Indian family kitchens.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm font-medium text-charcoal-800 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forestSage-700 flex-shrink-0" />
                <span>100% Stone-Ground</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forestSage-700 flex-shrink-0" />
                <span>Zero Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forestSage-700 flex-shrink-0" />
                <span>FSSAI Certified Pure</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => scrollToSection('product-catalog')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-sm sm:text-base shadow-warm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('shoppable-vlogs')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-100 text-charcoal-900 font-semibold text-sm sm:text-base border border-cream-300 shadow-soft hover:shadow-md transition-all flex items-center justify-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span>Watch Kitchen Story</span>
              </button>
            </div>

            {/* Social Trust Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <div className="h-8 w-8 rounded-full bg-terracotta-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  50k+
                </div>
              </div>
              <div className="text-xs text-charcoal-700">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-charcoal-900 ml-1.5">4.9 / 5</span>
                </div>
                <span>Trusted by 3,800+ homemakers & vlog subscribers</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Spotlight Feature Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Glow border background */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-terracotta-500 via-amberSpice-400 to-forestSage-700 shadow-2xl">
              <div className="bg-white rounded-[22px] p-6 sm:p-7 relative overflow-hidden">
                
                {/* Floating Hot Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-terracotta-50 text-terracotta-600 border border-terracotta-200">
                    <Flame className="w-3.5 h-3.5 text-terracotta-500" />
                    Signature Bestseller
                  </span>
                  <div className="flex items-center gap-1 bg-forestSage-50 text-forestSage-700 border border-forestSage-100 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>FSSAI Certified</span>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden group mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                    alt="Ultimate Kitchen Masala Trio"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-xs font-medium text-amber-300 uppercase tracking-widest">Neelam's Daily Secret</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">Ultimate Kitchen Masala Trio</h3>
                    <p className="text-xs text-cream-100">Royal Garam Masala + Kitchen King + Kashmiri Degi Mirch</p>
                  </div>

                  {/* 100% Veg Green Dot */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded border border-emerald-600">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  </div>
                </div>

                {/* Bundle items list */}
                <div className="space-y-2 mb-5 text-xs text-charcoal-800">
                  <div className="flex items-center justify-between pb-1.5 border-b border-cream-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                      <span className="font-medium">1x Royal Shahi Garam Masala (100g)</span>
                    </div>
                    <span className="text-charcoal-500">₹149</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-cream-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                      <span className="font-medium">1x Traditional Kitchen King (100g)</span>
                    </div>
                    <span className="text-charcoal-500">₹129</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-cream-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                      <span className="font-medium">1x Pure Kashmiri Degi Mirch (200g)</span>
                    </div>
                    <span className="text-charcoal-500">₹189</span>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-charcoal-900">₹369</span>
                      <span className="text-sm line-through text-charcoal-400 font-medium">₹467</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Save ₹98</span>
                    </div>
                    <span className="text-[11px] text-forestSage-700 font-medium block">Free Delivery Included</span>
                  </div>

                  <button
                    onClick={addTrioToCart}
                    className="px-5 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-warm hover:shadow-lg transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get The Trio</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Floating review card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-cream-200 hidden sm:flex items-center gap-3 max-w-xs animate-fadeIn">
              <div className="w-10 h-10 rounded-xl bg-terracotta-100 flex items-center justify-center flex-shrink-0 text-terracotta-600">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-charcoal-900">"Changed our Sunday gravies!"</p>
                <p className="text-charcoal-600 text-[11px]">— Suman R., Verified Buyer</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
