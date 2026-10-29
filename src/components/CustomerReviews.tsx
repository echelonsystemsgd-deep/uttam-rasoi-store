'use client';

import React from 'react';
import { REVIEWS, COMMUNITY_THALIS } from '../data/reviews';
import { Star, CheckCircle, Heart, Utensils, Sparkles, MessageSquare } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="customer-reviews" className="py-16 sm:py-24 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Proof Counter Banner */}
        <div className="bg-gradient-to-r from-terracotta-600 via-amberSpice-600 to-terracotta-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-200 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-4 h-4" /> Live Community Milestone
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black">
              50,000+ Happy Indian Kitchens
            </h3>
            <p className="text-xs sm:text-sm text-cream-100 max-w-xl">
              From morning ginger-cardamom chai to midnight dal makhani, see how families across Delhi, Mumbai, Bengaluru, and NRI kitchens celebrate pure taste.
            </p>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">
            <div className="text-center">
              <span className="font-serif font-black text-3xl sm:text-4xl text-amber-300 block">4.9★</span>
              <span className="text-[11px] text-cream-200">Average Rating</span>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <span className="font-serif font-black text-3xl sm:text-4xl text-amber-300 block">94%</span>
              <span className="text-[11px] text-cream-200">Repeat Orders</span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-100 px-3.5 py-1 rounded-full">
            Verified Homemaker Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-charcoal-900 tracking-tight">
            Real Kitchens. Real Aromas. Real Swad.
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Read unfiltered feedback from homemakers and food lovers who switched to stone-ground spices.
          </p>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Rating & Verified Buyer */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Title & Comment */}
                <h4 className="font-serif font-bold text-base text-charcoal-900 leading-snug">
                  "{rev.title}"
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                  {rev.comment}
                </p>

                {/* Dish Cooked Pill with Image */}
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-cream-50 border border-cream-200/80">
                  {rev.dishImage && (
                    <img
                      src={rev.dishImage}
                      alt={rev.dishCooked}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="truncate">
                    <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block font-semibold">
                      Dish Cooked:
                    </span>
                    <span className="text-xs font-bold text-terracotta-700 truncate block">
                      {rev.dishCooked}
                    </span>
                  </div>
                </div>

              </div>

              {/* Author & City Footer */}
              <div className="pt-3 border-t border-cream-100 flex items-center justify-between text-xs text-charcoal-500">
                <div>
                  <span className="font-bold text-charcoal-900 block">{rev.author}</span>
                  <span className="text-[11px]">{rev.city}</span>
                </div>
                <span className="text-[11px] text-charcoal-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Community Thali Gallery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-4">
            <div>
              <h3 className="font-serif font-bold text-2xl text-charcoal-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-terracotta-600" />
                <span>The Community Thali Gallery</span>
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600">
                Tag @indianyoutuberneelam on Instagram to get your home-cooked thali featured!
              </p>
            </div>
            <a
              href="https://www.instagram.com/indianyoutuberneelam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1"
            >
              <span>Follow @indianyoutuberneelam on Instagram</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {COMMUNITY_THALIS.map((thali) => (
              <div
                key={thali.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-charcoal-900 shadow-soft"
              >
                <img
                  src={thali.image}
                  alt={thali.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                    Spice: {thali.spiceUsed}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-bold line-clamp-1">{thali.title}</h4>
                  <span className="text-[11px] text-cream-200 mt-0.5">By {thali.chef}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
