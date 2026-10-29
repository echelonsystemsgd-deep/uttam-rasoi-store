'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PINCODES_DATA } from '../data/products';
import { SITE_CONFIG, getWhatsAppLink } from '../config/site';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft,
  MessageCircle,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    orderNote,
    completeOrder,
    latestOrder,
    setLatestOrder,
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen) {
        setIsCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, setIsCheckoutOpen]);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi NCR');
  const [pincode, setPincode] = useState('110001');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !latestOrder) return null;

  // Auto-fill city/state when pincode changes
  const handlePincodeChange = (pin: string) => {
    setPincode(pin);
    if (pin.length === 6 && PINCODES_DATA[pin]) {
      setCity(PINCODES_DATA[pin].city.split(' ')[0]);
      setState(PINCODES_DATA[pin].state);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = 'Valid 10-digit mobile number required';
    }
    if (!address.trim()) errs.address = 'Street address is required';
    if (!pincode.trim() || pincode.length !== 6) errs.pincode = 'Valid 6-digit PIN code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      completeOrder({
        customerName: name,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        paymentMethod,
        upiApp,
        items: [...cart],
        subtotal,
        discount: discountAmount,
        discountAmount,
        couponCode: appliedCoupon?.code,
        deliveryFee,
        total,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLatestOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-cream-200">
        
        {/* Header */}
        <div className="p-5 border-b border-cream-200 bg-cream-50 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900 leading-tight">
                {latestOrder ? 'Order Confirmed 🎉' : '100% Secure Checkout'}
              </h3>
              <p className="text-[11px] text-charcoal-500 font-medium">
                {latestOrder ? 'Thank you for supporting pure artisan food' : 'Encrypted 256-bit Indian Gateway'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-cream-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: Order Confirmation Screen */}
        {latestOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Order Placed Successfully
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-charcoal-900 mt-3">
                Swad Aapke Ghar Pahuchne Wala Hai!
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-md mx-auto">
                Neelam and our kitchen packing team are stone-milling & hand-packing your pure spices fresh for dispatch.
              </p>
            </div>

            {/* Order details summary card */}
            <div className="bg-cream-50 p-4 rounded-2xl border border-cream-200 text-left space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-cream-200 text-xs">
                <span className="text-charcoal-600">Order ID:</span>
                <span className="font-mono font-bold text-charcoal-900">{latestOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-cream-200 text-xs">
                <span className="text-charcoal-600">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">{latestOrder.estimatedDeliveryDate}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-cream-200 text-xs">
                <span className="text-charcoal-600">Shipping Address:</span>
                <span className="font-medium text-charcoal-900 text-right max-w-xs truncate">
                  {latestOrder.customerName}, {latestOrder.address}, {latestOrder.city} ({latestOrder.pincode})
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-charcoal-600">Total Paid:</span>
                <span className="font-extrabold text-terracotta-600 text-sm">
                  ₹{latestOrder.total} ({latestOrder.paymentMethod.toUpperCase()})
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={getWhatsAppLink(`Namaste Neelam ji, I have placed order ${latestOrder.orderId} for Rs ${latestOrder.total}. Please send tracking updates!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-forestSage-700 hover:bg-forestSage-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Get Updates On WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-warm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Indian Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-5 sm:p-7 space-y-6">
            
            {/* Step 1: Customer Contact & Delivery Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-charcoal-900 border-b border-cream-200 pb-2">
                <Truck className="w-4 h-4 text-terracotta-600" />
                <span>1. Delivery Address & Contact</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anjali Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-terracotta-500 focus:bg-white"
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    Mobile Number (For Delivery SMS / WhatsApp) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-cream-200 border border-r-0 border-cream-300 rounded-l-xl text-xs text-charcoal-700 font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-300 rounded-r-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-terracotta-500 focus:bg-white"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    House / Flat / Street Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Flat 302, Green Valley Apartments, Sector 14"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-terracotta-500 focus:bg-white"
                  />
                  {errors.address && <p className="text-[11px] text-red-600 mt-0.5">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    PIN Code (Pan-India) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="110001"
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold focus:ring-1 focus:ring-terracotta-500 focus:bg-white"
                  />
                  {errors.pincode && <p className="text-[11px] text-red-600 mt-0.5">{errors.pincode}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-charcoal-900 border-b border-cream-200 pb-2">
                <CreditCard className="w-4 h-4 text-terracotta-600" />
                <span>2. Payment Option</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-terracotta-500 bg-terracotta-50/70 shadow-xs'
                      : 'border-cream-300 hover:border-cream-400 bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto text-terracotta-600 mb-1" />
                  <span className="text-xs font-bold text-charcoal-900 block">1-Tap UPI</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Fastest & Safe</span>
                </button>

                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-terracotta-500 bg-terracotta-50/70 shadow-xs'
                      : 'border-cream-300 hover:border-cream-400 bg-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto text-amberSpice-600 mb-1" />
                  <span className="text-xs font-bold text-charcoal-900 block">Cash on Del.</span>
                  <span className="text-[10px] text-charcoal-500">Pay at Doorstep</span>
                </button>

                {/* Cards Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-terracotta-500 bg-terracotta-50/70 shadow-xs'
                      : 'border-cream-300 hover:border-cream-400 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto text-forestSage-700 mb-1" />
                  <span className="text-xs font-bold text-charcoal-900 block">Card</span>
                  <span className="text-[10px] text-charcoal-500">Debit / Credit</span>
                </button>

                {/* NetBanking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-terracotta-500 bg-terracotta-50/70 shadow-xs'
                      : 'border-cream-300 hover:border-cream-400 bg-white'
                  }`}
                >
                  <Lock className="w-5 h-5 mx-auto text-charcoal-700 mb-1" />
                  <span className="text-xs font-bold text-charcoal-900 block">NetBanking</span>
                  <span className="text-[10px] text-charcoal-500">All Indian Banks</span>
                </button>
              </div>

              {/* UPI Sub-selector if UPI is active */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
                  <span className="text-xs font-bold text-charcoal-800 block">Select UPI App:</span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setUpiApp('gpay')}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border ${
                        upiApp === 'gpay' ? 'bg-white border-terracotta-500 text-terracotta-700 shadow-xs' : 'bg-cream-100 border-transparent text-charcoal-600'
                      }`}
                    >
                      Google Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiApp('phonepe')}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border ${
                        upiApp === 'phonepe' ? 'bg-white border-terracotta-500 text-terracotta-700 shadow-xs' : 'bg-cream-100 border-transparent text-charcoal-600'
                      }`}
                    >
                      PhonePe
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiApp('paytm')}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border ${
                        upiApp === 'paytm' ? 'bg-white border-terracotta-500 text-terracotta-700 shadow-xs' : 'bg-cream-100 border-transparent text-charcoal-600'
                      }`}
                    >
                      Paytm
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiApp('qr')}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border ${
                        upiApp === 'qr' ? 'bg-white border-terracotta-500 text-terracotta-700 shadow-xs' : 'bg-cream-100 border-transparent text-charcoal-600'
                      }`}
                    >
                      Scan QR
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price review summary */}
            <div className="bg-cream-100/70 p-4 rounded-2xl border border-cream-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-charcoal-600">Items Subtotal:</span>
                <span className="font-bold text-charcoal-900">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-charcoal-600">Pan-India Delivery:</span>
                <span className="font-bold text-emerald-700">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-charcoal-900 pt-1.5 border-t border-cream-300">
                <span>Final Payable Amount:</span>
                <span className="text-terracotta-600">₹{total}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-amberSpice-500 hover:from-terracotta-700 hover:to-terracotta-600 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Securing and confirming your order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-amber-200" />
                  <span>Confirm Order • ₹{total} ({paymentMethod.toUpperCase()})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>FSSAI Certified Freshness • Express Dispatch Within 24 Hours</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
