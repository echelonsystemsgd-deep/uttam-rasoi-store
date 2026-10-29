'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, ShoppingBag, Youtube } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-cream-50 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-cream-200 shadow-soft space-y-6">
        
        {/* Brand Monogram */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-600 to-amberSpice-500 text-white font-serif font-black text-3xl flex items-center justify-center mx-auto shadow-warm">
          उ
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-charcoal-900 mt-2">
            Lagta Hai Rasoi Ka Rasta Bhatak Gaye!
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
            The kitchen shelf or recipe page you are searching for might have been moved or seasoned elsewhere. Let’s get you right back to our fresh stone-ground spices.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Neelam's Pantry</span>
          </Link>

          <Link
            href="/#shoppable-vlogs"
            className="w-full py-3 px-6 rounded-2xl bg-cream-100 hover:bg-cream-200 text-charcoal-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-cream-300"
          >
            <Youtube className="w-4 h-4 text-red-600" />
            <span>Watch Shoppable YouTube Recipes</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
