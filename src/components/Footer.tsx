'use client';

import React, { useState } from 'react';
import { Youtube, Instagram, Facebook, ShieldCheck, Mail, ArrowRight, Heart, Sparkles, CheckCircle2, FileText, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SITE_CONFIG, getWhatsAppLink } from '../config/site';

export const Footer: React.FC = () => {
  const { showToast, setActivePolicy } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('🎉 Welcome to Neelam’s Rasoi Club!', 'Use coupon code NEELAM10 for 10% OFF', 'success');
      setNewsletterEmail('');
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-950 text-cream-100 pt-16 pb-32 md:pb-16 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Club Strip */}
        <div className="bg-gradient-to-r from-terracotta-900 to-amberSpice-900 rounded-3xl p-6 sm:p-8 border border-terracotta-700/60 mb-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Join Neelam's VIP Rasoi Family</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Get 10% OFF On Your First Order
            </h3>
            <p className="text-xs sm:text-sm text-cream-200 max-w-lg">
              Receive secret festive recipes, first access to small-batch seasonal spices, and exclusive homemaker kitchen tips.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-cream-300/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amberSpice-500 hover:bg-amberSpice-400 text-charcoal-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <span>{subscribed ? 'Subscribed!' : 'Get 10% Off'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-terracotta-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-warm">
                उ
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-white block">
                  Uttam Rasoi
                </span>
                <span className="text-[11px] uppercase tracking-widest text-amberSpice-400 font-semibold">
                  By Neelam • Artisan Indian Kitchen
                </span>
              </div>
            </div>

            <p className="text-xs text-cream-300/80 leading-relaxed font-sans">
              Founded by lifestyle YouTube creator Neelam Saurabh Sharma. We bring back the forgotten purity of stone-ground spices, pre-seasoned heavy iron cookware, and aesthetic kitchen storage for modern Indian homes.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-800 hover:bg-red-600 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-800 hover:bg-pink-600 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Page"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-800 hover:bg-blue-600 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Pantry Shop
            </h4>
            <ul className="space-y-2 text-xs text-cream-300/80">
              <li>
                <button onClick={() => scrollTo('product-catalog')} className="hover:text-amberSpice-400 transition-colors">
                  Pure Ground Spices
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('product-catalog')} className="hover:text-amberSpice-400 transition-colors">
                  Signature Masala Blends
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('product-catalog')} className="hover:text-amberSpice-400 transition-colors">
                  Cast Iron Cookware
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('product-catalog')} className="hover:text-amberSpice-400 transition-colors">
                  Aesthetic Spice Jars
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('product-catalog')} className="hover:text-amberSpice-400 transition-colors">
                  Festive Gift Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-cream-300/80">
              <li>
                <button onClick={() => setActivePolicy('shipping')} className="hover:text-amberSpice-400 transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amberSpice-400" />
                  <span>Shipping & Delivery Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('returns')} className="hover:text-amberSpice-400 transition-colors flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amberSpice-400" />
                  <span>7-Day Replacement Guarantee</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-amberSpice-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amberSpice-400" />
                  <span>Privacy & Consumer Terms</span>
                </button>
              </li>
              <li>
                <a
                  href={getWhatsAppLink('Namaste Neelam ji, I want to track my order')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amberSpice-400 transition-colors block"
                >
                  Track My Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance Badge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Government Certifications
            </h4>
            <div className="p-3.5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>FSSAI Certified Brand</span>
              </div>
              <p className="text-[11px] text-cream-300/70 font-mono">
                Lic. No: <strong>{SITE_CONFIG.fssaiNumber}</strong>
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>100% Vegetarian Green Dot Certified</span>
              </div>
            </div>

            <p className="text-[11px] text-cream-300/60 leading-tight">
              Customer Support: {SITE_CONFIG.supportEmail} | {SITE_CONFIG.whatsappDisplay} ({SITE_CONFIG.operatingHours})
            </p>
          </div>

        </div>

        {/* Bottom Payment Strip & Copyright */}
        <div className="pt-8 border-t border-charcoal-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-300/60">
          <div>
            © {new Date().getFullYear()} Uttam Rasoi by Neelam. Handcrafted with Homemaker's Love. All Rights Reserved.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[11px] font-semibold text-cream-300/80">Secured with:</span>
            <span className="px-2 py-1 rounded bg-charcoal-800 text-[10px] font-bold text-white">1-Tap UPI</span>
            <span className="px-2 py-1 rounded bg-charcoal-800 text-[10px] font-bold text-white">Google Pay</span>
            <span className="px-2 py-1 rounded bg-charcoal-800 text-[10px] font-bold text-white">PhonePe</span>
            <span className="px-2 py-1 rounded bg-charcoal-800 text-[10px] font-bold text-white">RuPay / Visa / MC</span>
            <span className="px-2 py-1 rounded bg-charcoal-800 text-[10px] font-bold text-emerald-400">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
