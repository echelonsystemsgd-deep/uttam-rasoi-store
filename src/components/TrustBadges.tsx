'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Truck, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const BADGES = [
    {
      icon: ShieldCheck,
      title: '100% FSSAI Certified',
      subtitle: 'Lic. #13324001000492 • Zero Chemical Adulterants',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Sparkles,
      title: 'Traditional Stone-Ground',
      subtitle: 'Slow RPM Cold Milling to Retain Natural Oils',
      color: 'text-terracotta-600 bg-terracotta-50 border-terracotta-200',
    },
    {
      icon: Truck,
      title: 'Pan-India Express Dispatch',
      subtitle: '24-48h in Metros • Free Shipping Above ₹499',
      color: 'text-amberSpice-600 bg-amberSpice-50 border-amberSpice-200',
    },
    {
      icon: CreditCard,
      title: '1-Tap UPI & COD Available',
      subtitle: 'GPay, PhonePe, Paytm, Cards & Cash on Delivery',
      color: 'text-forestSage-700 bg-forestSage-50 border-forestSage-200',
    },
  ];

  return (
    <section className="bg-white border-y border-cream-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3.5 sm:p-4 rounded-2xl bg-cream-50/60 hover:bg-cream-100/70 border border-cream-200/60 transition-all hover:shadow-sm"
              >
                <div className={`p-2.5 rounded-xl border ${badge.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 leading-snug">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-charcoal-600 leading-tight">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
