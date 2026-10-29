'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
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
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-drawer flex flex-col justify-between animate-slideInRight">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-cream-200/80 bg-cream-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-charcoal-900 leading-tight">Your Kitchen Basket</h3>
                <span className="text-xs text-charcoal-500 font-medium">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items in your cart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Progress Bar */}
          <div className="bg-amberSpice-50 px-5 py-3 border-b border-amberSpice-100">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-charcoal-800">
                  <span className="flex items-center gap-1 text-terracotta-700">
                    <Sparkles className="w-3.5 h-3.5 text-amberSpice-600" />
                    <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery!</strong></span>
                  </span>
                  <span className="text-amberSpice-700 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amberSpice-500 to-terracotta-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery Across India</strong></span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-cream-100 text-terracotta-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-charcoal-900">Your basket is empty</h4>
                  <p className="text-xs text-charcoal-500 max-w-xs mx-auto mt-1">
                    Fill your home with the fragrance of pure stone-ground spices and traditional cookware!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider shadow-warm"
                >
                  Explore Neelam's Spices
                </button>
              </div>
            ) : (
              <div className="divide-y divide-cream-100 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 rounded-xl object-cover border border-cream-200 flex-shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 leading-tight truncate">
                            {item.productName}
                          </h4>
                          <span className="text-[11px] text-terracotta-700 font-semibold bg-terracotta-50 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                            {item.weight}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-cream-100 border border-cream-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-charcoal-700 hover:bg-cream-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-charcoal-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-charcoal-700 hover:bg-cream-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-charcoal-900">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-[11px] line-through text-charcoal-400 block">
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amberSpice-500" />
                      <span>Frequently Bought Together</span>
                    </span>
                    <div className="space-y-2">
                      {upsellItems.map((up) => (
                        <div
                          key={up.id}
                          className="p-2.5 rounded-xl bg-cream-50 border border-cream-200/80 flex items-center justify-between gap-3"
                        >
                          <img
                            src={up.images[0]}
                            alt={up.name}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-charcoal-900 truncate">{up.name}</p>
                            <p className="text-[10px] text-charcoal-500">₹{up.variants[0].price} • {up.variants[0].weight}</p>
                          </div>
                          <button
                            onClick={() => addToCart(up, 0, 1)}
                            className="px-2.5 py-1 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white text-[11px] font-bold flex-shrink-0 shadow-xs"
                          >
                            + Add
                          </button>
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
            <div className="p-4 sm:p-5 border-t border-cream-200 bg-cream-50/90 space-y-3.5">
              
              {/* Promo code input */}
              <div className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                        <span className="text-[11px] text-emerald-700 block">{appliedCoupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-800 hover:text-red-600 font-bold text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. NEELAM10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full bg-white border border-cream-300 rounded-xl py-2 pl-8 pr-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                      />
                      <Tag className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold text-xs"
                    >
                      Apply
                    </button>
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
                  className="text-xs text-charcoal-600 hover:text-terracotta-600 font-medium flex items-center gap-1.5"
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
                    className="w-full mt-2 bg-white border border-cream-300 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-500"
                  />
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-700 pt-1 border-t border-cream-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal-900">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-charcoal-900 pt-1 border-t border-cream-200">
                  <span>Grand Total</span>
                  <span className="text-terracotta-600">₹{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-amberSpice-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-amber-200" />
                <span>Proceed to 1-Tap Checkout • ₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-500 text-center">
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
