'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const SlideCart: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    orderNote,
    setOrderNote,
    setIsCheckoutOpen,
    addToCart,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [showOrderNote, setShowOrderNote] = useState(false);

  if (!isCartOpen) return null;

  // Calculate free shipping progress %
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Upsell recommendations (items not in cart)
  const cartProductIds = cart.map((i) => i.productId);
  const upsellItems = PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 3);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md h-[100dvh] max-h-[100dvh] bg-card shadow-drawer flex flex-col justify-between animate-slideInRight border-l border-border">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-border bg-secondary/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-foreground leading-tight">Your Kitchen Basket</h3>
                <span className="text-xs text-muted-foreground font-medium">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items in your cart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Progress Bar */}
          <div className="bg-secondary/80 px-5 py-3 border-b border-border">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span className="flex items-center gap-1 text-primary">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery!</strong></span>
                  </span>
                  <span className="text-accent font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-veg">
                <CheckCircle2 className="w-4 h-4 text-veg flex-shrink-0" />
                <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery Across India</strong></span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-foreground">Your basket is empty</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
                    Fill your home with the fragrance of pure stone-ground spices and traditional cookware!
                  </p>
                </div>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-xl px-6 py-2.5 font-bold text-xs uppercase tracking-wider"
                >
                  Explore Neelam's Spices
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.productName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-16 h-16 rounded-xl object-cover border border-border flex-shrink-0 bg-secondary"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
                            {item.productName}
                          </h4>
                          <span className="text-[11px] text-primary font-semibold bg-secondary px-1.5 py-0.5 rounded mt-0.5 inline-block">
                            {item.weight}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-secondary border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-[11px] line-through text-muted-foreground block">
                              ₹{item.originalPrice * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Micro-upsell / Frequently Bought Together */}
                {upsellItems.length > 0 && (
                  <div className="pt-5 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span>Frequently Bought Together</span>
                    </span>
                    <div className="space-y-2">
                      {upsellItems.map((up) => (
                        <div
                          key={up.id}
                          className="p-2.5 rounded-xl bg-secondary/50 border border-border flex items-center justify-between gap-3"
                        >
                          <img
                            src={up.images[0]}
                            alt={up.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                            }}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-secondary"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">{up.name}</p>
                            <p className="text-[10px] text-muted-foreground">₹{up.variants[0].price} • {up.variants[0].weight}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(up, 0, 1)}
                            className="h-7 text-[11px] font-bold px-2.5"
                          >
                            + Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-border bg-secondary/30 space-y-3.5">
              
              {/* Promo code input */}
              <div className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-forestSage-50 border border-veg/20 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-veg" />
                      <div>
                        <span className="font-bold text-veg">{appliedCoupon.code}</span>
                        <span className="text-[11px] text-muted-foreground block">{appliedCoupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-veg hover:text-red-600 font-bold text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Coupon (e.g. NEELAM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="pl-8 uppercase h-9 text-xs"
                      />
                      <Tag className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-2.5" />
                    </div>
                    <Button
                      type="submit"
                      variant="secondary"
                      size="sm"
                      className="h-9 font-bold px-3.5"
                    >
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && (
                  <div className="flex items-center gap-1 text-[11px] text-red-600">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>

              {/* Order note accordion */}
              <div>
                <button
                  onClick={() => setShowOrderNote(!showOrderNote)}
                  className="text-xs text-muted-foreground hover:text-primary font-medium flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{showOrderNote ? 'Hide Order Note' : '+ Add Special Kitchen / Gift Note'}</span>
                </button>
                {showOrderNote && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="E.g., Please pack securely for elderly parents, or include gift ribbon..."
                    className="w-full mt-2 bg-card border border-border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-foreground pt-1 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-foreground">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-veg font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pan-India Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="text-veg font-bold">FREE</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-foreground pt-1 border-t border-border">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleProceedToCheckout}
                size="lg"
                className="w-full gap-2 font-bold shadow-soft"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>Proceed to 1-Tap Checkout • ₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground text-center">
                <span>🔒 100% Secure Checkout</span>
                <span>•</span>
                <span>UPI / NetBanking / COD Supported</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
