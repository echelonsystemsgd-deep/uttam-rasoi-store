'use client';

import React from 'react';
import { Truck, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { freeShippingThreshold, setIsPincodeModalOpen, pincode, pincodeInfo } = useStore();

  return (
    <div className="bg-gradient-to-r from-terracotta-700 via-terracotta-600 to-amberSpice-600 text-cream-50 text-xs py-2 px-3 sm:px-6 relative z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        
        {/* Main message */}
        <div className="flex items-center justify-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse flex-shrink-0" />
          <span>
            <strong className="font-semibold text-white">Free Delivery Across India</strong> on orders above ₹{freeShippingThreshold} | 100% Pure & Stone-Ground
          </span>
        </div>

        {/* Right side links */}
        <div className="flex items-center justify-center gap-4 text-cream-100 text-[11px] sm:text-xs">
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="hover:text-white flex items-center gap-1 transition-colors underline decoration-cream-300/40"
          >
            <Truck className="w-3 h-3 text-cream-200" />
            <span className="hidden xs:inline">PIN:</span> {pincode} ({pincodeInfo.city.split(' ')[0]})
          </button>
          
          <span className="text-terracotta-300">|</span>

          <a
            href="https://wa.me/919876543210?text=Namaste%20Neelam%20ji,%20I%20have%20a%20query%20about%20Uttam%20Rasoi%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-emerald-300" />
            <span>WhatsApp Support</span>
          </a>

          <span className="hidden md:inline text-terracotta-300">|</span>

          <span className="hidden md:flex items-center gap-1 text-cream-200">
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span>FSSAI Lic. #13324001000492</span>
          </span>
        </div>
      </div>
    </div>
  );
};
