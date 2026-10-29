'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Truck, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const BADGES = [
    {
      icon: ShieldCheck,
      title: '100% FSSAI Certified',
      subtitle: 'Lic. #13324001000492 • Zero Chemical Adulterants',
      iconBox: 'text-veg bg-forestSage-50 border-veg/20',
    },
    {
      icon: Sparkles,
      title: 'Traditional Stone-Ground',
      subtitle: 'Slow RPM Cold Milling to Retain Natural Oils',
      iconBox: 'text-primary bg-primary/10 border-primary/20',
    },
    {
      icon: Truck,
      title: 'Pan-India Express Dispatch',
      subtitle: '24-48h in Metros • Free Shipping Above ₹499',
      iconBox: 'text-accent bg-accent/10 border-accent/20',
    },
    {
      icon: CreditCard,
      title: '1-Tap UPI & COD Available',
      subtitle: 'GPay, PhonePe, Paytm, Cards & Cash on Delivery',
      iconBox: 'text-foreground bg-secondary border-border',
    },
  ];

  return (
    <section className="bg-card border-y border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border transition-all hover:shadow-subtle"
              >
                <div className={`p-2.5 rounded-xl border ${badge.iconBox} flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
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
