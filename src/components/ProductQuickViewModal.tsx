'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FALLBACK_IMAGE } from '../data/products';
import {
  X,
  Star,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  MapPin,
  Clock,
  Heart,
  ChefHat
} from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setIsCartOpen,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const variant = quickViewProduct.variants[activeVariantIdx] || quickViewProduct.variants[0];
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, activeVariantIdx, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-cream-200">
        
        {/* Modal Close Button */}
        <div className="relative">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md text-charcoal-600 hover:text-charcoal-900 flex items-center justify-center hover:bg-cream-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 sm:p-8 bg-cream-50 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-cream-200/80 shadow-soft">
              <img
                src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* 100% Veg Dot */}
              {quickViewProduct.isVeg && (
                <div className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded-md border border-emerald-600 shadow-sm flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-800">100% PURE VEG</span>
                </div>
              )}
            </div>

            {/* Thumbnail switcher if > 1 images */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === activeImageIdx
                        ? 'border-terracotta-600 scale-105 shadow-sm'
                        : 'border-cream-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Origin & FSSAI Badges */}
            <div className="mt-6 pt-4 border-t border-cream-200 space-y-2 text-xs text-charcoal-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-terracotta-600 flex-shrink-0" />
                <span>Origin: <strong>{quickViewProduct.origin}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>FSSAI License: <strong>{quickViewProduct.fssaiNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amberSpice-600 flex-shrink-0" />
                <span>Best Before: <strong>{quickViewProduct.shelfLife}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-terracotta-700 font-bold uppercase tracking-wider">
                  {quickViewProduct.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-charcoal-900">{quickViewProduct.rating}</span>
                  <span className="text-charcoal-400 font-normal">({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Hindi Subtitle */}
              <div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-charcoal-900 leading-tight">
                  {quickViewProduct.name}
                </h2>
                {quickViewProduct.hindiName && (
                  <span className="text-sm font-serif italic text-terracotta-700 block mt-0.5">
                    {quickViewProduct.hindiName}
                  </span>
                )}
                <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* Neelam's Kitchen Tip (Emotional Homemaker Anchor) */}
              <div className="p-3.5 rounded-2xl bg-amberSpice-50 border border-amberSpice-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amberSpice-900">
                  <ChefHat className="w-4 h-4 text-terracotta-600" />
                  <span>Neelam's Homemaker Secret:</span>
                </div>
                <p className="text-xs text-charcoal-700 italic leading-relaxed">
                  "{quickViewProduct.neelamTip}"
                </p>
              </div>

              {/* Key Ingredients */}
              {quickViewProduct.keyIngredients && quickViewProduct.keyIngredients.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-charcoal-800 uppercase tracking-wider block mb-1.5">
                    100% Pure Ingredients / Materials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.keyIngredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-cream-100 text-charcoal-700 px-2.5 py-1 rounded-lg border border-cream-300 font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Method */}
              <div className="text-xs text-charcoal-600 bg-cream-50 p-3 rounded-xl border border-cream-200">
                <span className="font-bold text-charcoal-900 block mb-0.5">Stone-Milled Purity:</span>
                <p>{quickViewProduct.processingMethod}</p>
              </div>

              {/* Size Selector */}
              <div>
                <span className="text-xs font-bold text-charcoal-800 mb-2 block">
                  Select Size / Package:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantIdx(idx)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        idx === activeVariantIdx
                          ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-700 shadow-xs'
                          : 'border-cream-300 bg-white text-charcoal-700 hover:border-cream-400'
                      }`}
                    >
                      <span>{v.weight}</span>
                      <span className="block text-[11px] font-extrabold mt-0.5">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Actions Bar */}
            <div className="pt-4 border-t border-cream-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-charcoal-900">₹{variant.price}</span>
                    <span className="text-sm line-through text-charcoal-400">₹{variant.originalPrice}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save ₹{variant.originalPrice - variant.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-forestSage-700 font-medium">Taxes Included • Pan-India Delivery</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center bg-cream-100 border border-cream-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-cream-200"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-charcoal-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-cream-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Basket • ₹{variant.price * quantity}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="p-3.5 rounded-2xl border border-cream-300 hover:border-terracotta-300 bg-white text-charcoal-700 hover:text-terracotta-600"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-terracotta-500 text-terracotta-500' : ''}`} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
