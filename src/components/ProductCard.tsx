'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { FALLBACK_IMAGE } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingBag, Plus, Minus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setIsCartOpen,
  } = useStore();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const cartItemId = `${product.id}-${selectedVariant.id}`;
  const existingCartItem = cart.find((item) => item.id === cartItemId);
  const isWishlisted = isInWishlist(product.id);

  const savings = selectedVariant.originalPrice - selectedVariant.price;
  const savingsPercent = Math.round((savings / selectedVariant.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedVariantIdx, 1);
  };

  return (
    <div className="group bg-white rounded-2xl border border-cream-200/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 100% Veg Green Dot Badge */}
          {product.isVeg && (
            <div className="bg-white/95 backdrop-blur-md px-1.5 py-1 rounded-md border border-emerald-600 shadow-sm flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-tighter">100% Veg</span>
            </div>
          )}

          {product.isBestseller && (
            <span className="bg-terracotta-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-charcoal-700 hover:text-terracotta-600 transition-transform active:scale-90"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-terracotta-500 text-terracotta-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        className="relative aspect-square overflow-hidden bg-cream-100 cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
        onMouseEnter={() => {
          if (product.images.length > 1) setCurrentImageIdx(1);
        }}
        onMouseLeave={() => {
          setCurrentImageIdx(0);
        }}
      >
        <img
          src={product.images[currentImageIdx] || product.images[0]}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-charcoal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-4 py-2 rounded-xl bg-white/95 text-charcoal-900 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:bg-terracotta-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Recipe Tips</span>
          </button>
        </div>

        {/* Alternate angle indicator dots if > 1 images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full">
            {product.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? 'bg-terracotta-600 w-3' : 'bg-charcoal-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Rating and category */}
        <div className="flex items-center justify-between text-xs text-charcoal-500">
          <span className="font-medium text-terracotta-700 uppercase tracking-wider text-[11px]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-charcoal-900">{product.rating}</span>
            <span className="text-charcoal-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title & Hindi Name */}
        <div>
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif font-bold text-base sm:text-lg text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          {product.hindiName && (
            <span className="text-xs font-serif text-terracotta-700/80 italic font-medium block">
              {product.hindiName}
            </span>
          )}
          <p className="text-xs text-charcoal-600 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Variant / Weight Selector Pills */}
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-charcoal-500 mb-1.5 flex items-center justify-between">
            <span>Select Size / Pack:</span>
            <span className="text-forestSage-700 font-bold">{selectedVariant.weight}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  idx === selectedVariantIdx
                    ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-xs'
                    : 'bg-cream-100 text-charcoal-700 border-cream-300 hover:border-terracotta-300'
                }`}
              >
                {v.weight.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Container */}
        <div className="pt-2 border-t border-cream-200/80 flex items-center justify-between gap-2 mt-auto">
          
          {/* Price breakdown */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-charcoal-900">
                ₹{selectedVariant.price}
              </span>
              <span className="text-xs line-through text-charcoal-400">
                ₹{selectedVariant.originalPrice}
              </span>
            </div>
            {savings > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Save ₹{savings} ({savingsPercent}%)
              </span>
            )}
          </div>

          {/* Add to Cart or Stepper */}
          {existingCartItem ? (
            <div className="flex items-center bg-cream-100 border border-terracotta-300 rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-terracotta-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-charcoal-900">
                {existingCartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-terracotta-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:shadow-warm transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
