'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PINCODES_DATA } from '../data/products';
import { X, MapPin, CheckCircle2, Truck, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
      className="fixed inset-0 z-50 overflow-y-auto bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsPincodeModalOpen(false);
      }}
    >
      <div className="bg-card rounded-3xl shadow-soft max-w-md w-full p-6 border border-border space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 id="pincode-modal-title" className="font-serif font-bold text-lg text-foreground leading-tight">
                Check Delivery Speed
              </h3>
              <p className="text-[11px] text-muted-foreground">Pan-India Express Dispatch from Delhi Hub</p>
            </div>
          </div>
          <button
            onClick={() => setIsPincodeModalOpen(false)}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close PIN code dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <label htmlFor="pincode-input" className="text-xs font-semibold text-foreground block">
            Enter your 6-digit postal PIN code:
          </label>
          <div className="flex gap-2">
            <Input
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
              className="flex-1 font-mono font-bold tracking-wider"
            />
            <Button
              type="submit"
              className="font-bold text-xs"
            >
              Verify Speed
            </Button>
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
          verifiedSuccess ? 'bg-forestSage-50 border-veg/20' : 'bg-secondary border-border'
        }`}>
          {verifiedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-veg pb-2 mb-2 border-b border-veg/20">
              <ShieldCheck className="w-4 h-4 text-veg" />
              <span>Verified Serviceable Zone</span>
            </div>
          )}

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Delivering to:</span>
              <span className="font-bold text-foreground text-right">{pincodeInfo.city} ({pincodeInfo.pincode})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Estimated Delivery:</span>
              <span className="font-bold text-veg flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{pincodeInfo.deliveryDays}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Cash On Delivery:</span>
              <span className="font-bold text-veg flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-veg" />
                <span>Available Pan-India</span>
              </span>
            </div>
          </div>
        </div>

        {/* Popular Cities Quick Select */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
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
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-card text-foreground border-border hover:border-primary/40'
                }`}
              >
                {data.city.split(' ')[0]} ({pin})
              </button>
            ))}
          </div>
        </div>

        {/* Primary Confirmation Action Button */}
        <div className="pt-2">
          <Button
            type="button"
            variant="veg"
            onClick={handleConfirm}
            className="w-full uppercase tracking-wider font-bold text-xs gap-2"
          >
            <span>Confirm Delivery to {pincodeInfo.city.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </div>
  );
};
