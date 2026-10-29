'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PINCODES_DATA } from '../data/products';
import { X, MapPin, CheckCircle2, Truck, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export const PincodeModal: React.FC = () => {
  const { isPincodeModalOpen, setIsPincodeModalOpen, pincode, pincodeInfo, updatePincode } = useStore();
  const [inputPin, setInputPin] = useState(pincode);
  const [error, setError] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  // Sync state whenever modal opens or pincode changes
  useEffect(() => {
    if (isPincodeModalOpen) {
      setInputPin(pincode);
      setError(null);
      setVerifiedSuccess(true);
    }
  }, [isPincodeModalOpen, pincode]);

  if (!isPincodeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = updatePincode(inputPin);
    if (success) {
      setError(null);
      setVerifiedSuccess(true);
    } else {
      setError('Please enter a valid 6-digit Indian PIN code (e.g. 110001)');
      setVerifiedSuccess(false);
    }
  };

  const handleSelectQuickPin = (pin: string) => {
    setInputPin(pin);
    const success = updatePincode(pin);
    if (success) {
      setError(null);
      setVerifiedSuccess(true);
    }
  };

  const handleConfirm = () => {
    setIsPincodeModalOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pincode-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsPincodeModalOpen(false);
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-cream-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 id="pincode-modal-title" className="font-serif font-bold text-lg text-charcoal-900 leading-tight">
                Check Delivery Speed
              </h3>
              <p className="text-[11px] text-charcoal-500">Pan-India Express Dispatch from Delhi Hub</p>
            </div>
          </div>
          <button
            onClick={() => setIsPincodeModalOpen(false)}
            className="p-1.5 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-cream-100 transition-colors"
            aria-label="Close PIN code dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <label htmlFor="pincode-input" className="text-xs font-semibold text-charcoal-700 block">
            Enter your 6-digit postal PIN code:
          </label>
          <div className="flex gap-2">
            <input
              id="pincode-input"
              type="text"
              maxLength={6}
              value={inputPin}
              onChange={(e) => {
                setInputPin(e.target.value.replace(/\D/g, ''));
                setVerifiedSuccess(false);
                setError(null);
              }}
              placeholder="e.g. 110001"
              className="flex-1 bg-cream-50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 tracking-wider"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-warm transition-all active:scale-95"
            >
              Verify Speed
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 pt-1">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Current Verified Status Card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          verifiedSuccess ? 'bg-emerald-50/60 border-emerald-200' : 'bg-cream-50 border-cream-200'
        }`}>
          {verifiedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pb-2 mb-2 border-b border-emerald-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Serviceable Zone</span>
            </div>
          )}

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-charcoal-500 font-medium">Delivering to:</span>
              <span className="font-bold text-charcoal-900 text-right">{pincodeInfo.city} ({pincodeInfo.pincode})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-charcoal-500 font-medium">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{pincodeInfo.deliveryDays}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-charcoal-500 font-medium">Cash On Delivery:</span>
              <span className="font-bold text-forestSage-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Available Pan-India</span>
              </span>
            </div>
          </div>
        </div>

        {/* Popular Cities Quick Select */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
            Popular Quick Select:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PINCODES_DATA).slice(0, 8).map(([pin, data]) => (
              <button
                key={pin}
                type="button"
                onClick={() => handleSelectQuickPin(pin)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  pincode === pin
                    ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-xs'
                    : 'bg-white text-charcoal-700 border-cream-300 hover:border-terracotta-300'
                }`}
              >
                {data.city.split(' ')[0]} ({pin})
              </button>
            ))}
          </div>
        </div>

        {/* Primary Confirmation Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 rounded-xl bg-forestSage-700 hover:bg-forestSage-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm active:scale-98 transition-all"
          >
            <span>Confirm Delivery to {pincodeInfo.city.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
