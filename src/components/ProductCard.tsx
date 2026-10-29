'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { FALLBACK_IMAGE } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Heart, ShoppingBag, Plus, Minus, Eye, ExternalLink } from 'lucide-react';

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
    <div className="group bg-card rounded-2xl border border-border shadow-subtle hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 100% Veg Green Dot Badge */}
          {product.isVeg && !product.isExternal && product.category !== 'teestah-label' && (
            <Badge variant="veg" className="bg-card/95 backdrop-blur-md shadow-xs pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-veg inline-block" />
              <span className="text-[10px] font-bold uppercase tracking-wider">100% Veg</span>
            </Badge>
          )}

          {product.badgeText ? (
            <Badge variant="bestseller" className="pointer-events-auto">
              {product.badgeText}
            </Badge>
          ) : product.isBestseller ? (
            <Badge variant="default" className="pointer-events-auto text-[10px] font-bold uppercase tracking-wider">
              Bestseller
            </Badge>
          ) : product.isNew ? (
            <Badge variant="fssai" className="pointer-events-auto text-[10px] font-bold uppercase tracking-wider">
              New Arrival
            </Badge>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="pointer-events-auto w-8 h-8 rounded-full bg-card/95 backdrop-blur-md border border-border/80 shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-transform active:scale-90"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        className="relative aspect-square overflow-hidden bg-secondary cursor-pointer"
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
        <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="rounded-full shadow-md gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </Button>
        </div>

        {/* Multi-image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentImageIdx ? 'bg-card w-3' : 'bg-card/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-primary font-semibold tracking-wider uppercase text-[11px]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-accent font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-accent" />
              <span className="text-foreground">{product.rating}</span>
              <span className="text-muted-foreground font-normal text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          {product.hindiName && (
            <span className="text-xs text-primary font-medium block">
              {product.hindiName}
            </span>
          )}
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Variant / Weight Selector Pills */}
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 flex items-center justify-between">
            <span>{product.category === 'teestah-label' ? 'Select Size:' : 'Select Size / Pack:'}</span>
            <span className="text-veg font-bold">{selectedVariant.weight}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  idx === selectedVariantIdx
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-secondary text-foreground border-border hover:border-primary/40'
                }`}
              >
                {v.weight.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Container */}
        <div className="pt-2 border-t border-border flex items-center justify-between gap-2 mt-auto">
          
          {/* Price breakdown */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-foreground font-sans">
                ₹{selectedVariant.price}
              </span>
              <span className="text-xs line-through text-muted-foreground">
                ₹{selectedVariant.originalPrice}
              </span>
            </div>
            {savings > 0 && (
              <span className="text-[10px] font-bold text-veg bg-forestSage-50 px-1.5 py-0.5 rounded border border-veg/20">
                Save ₹{savings} ({savingsPercent}%)
              </span>
            )}
          </div>

          {/* Action: External Amazon link OR D2C Add to Cart */}
          {product.isExternal && product.externalUrl ? (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-foreground hover:bg-black text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 flex-shrink-0"
              title="Shop on Amazon Prime"
            >
              <span>Amazon</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </a>
          ) : existingCartItem ? (
            <div className="flex items-center bg-secondary border border-border rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-foreground">
                {existingCartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(cartItemId, existingCartItem.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-1.5 font-bold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </Button>
          )}

        </div>

      </div>

    </div>
  );
};
