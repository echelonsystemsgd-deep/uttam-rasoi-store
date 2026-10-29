'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { SITE_CONFIG, getWhatsAppLink } from '../config/site';
import { X, Truck, RotateCcw, ShieldCheck, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy } = useStore();

  if (!activePolicy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-cream-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-cream-200 bg-cream-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center">
              {activePolicy === 'shipping' && <Truck className="w-5 h-5" />}
              {activePolicy === 'returns' && <RotateCcw className="w-5 h-5" />}
              {activePolicy === 'privacy' && <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900 leading-tight">
                {activePolicy === 'shipping' && 'Shipping & Pan-India Dispatch Policy'}
                {activePolicy === 'returns' && 'Freshness & 7-Day Replacement Guarantee'}
                {activePolicy === 'privacy' && 'Privacy & Consumer Protection (E-Commerce 2020)'}
              </h3>
              <p className="text-[11px] text-charcoal-500 font-medium">
                Official policy for Uttam Rasoi by Neelam • FSSAI Lic. #{SITE_CONFIG.fssaiNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePolicy(null)}
            className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-cream-200"
            aria-label="Close policy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 p-3 bg-cream-100/60 border-b border-cream-200 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActivePolicy('shipping')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activePolicy === 'shipping'
                ? 'bg-terracotta-600 text-white shadow-xs'
                : 'bg-white text-charcoal-700 hover:bg-cream-200'
            }`}
          >
            Shipping & Delivery
          </button>
          <button
            onClick={() => setActivePolicy('returns')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activePolicy === 'returns'
                ? 'bg-terracotta-600 text-white shadow-xs'
                : 'bg-white text-charcoal-700 hover:bg-cream-200'
            }`}
          >
            Freshness & Returns
          </button>
          <button
            onClick={() => setActivePolicy('privacy')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activePolicy === 'privacy'
                ? 'bg-terracotta-600 text-white shadow-xs'
                : 'bg-white text-charcoal-700 hover:bg-cream-200'
            }`}
          >
            Privacy & Terms
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed max-h-[60vh] overflow-y-auto">
          
          {activePolicy === 'shipping' && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-charcoal-900">Same-Day Express Dispatch</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Orders received before 12:00 PM IST are freshly hand-packed and dispatched the same day from our Delhi fulfillment hub.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-charcoal-900 text-sm">Estimated Delivery Timelines:</h4>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-charcoal-600">
                  <li><strong>Delhi NCR (Delhi, Gurgaon, Noida, Ghaziabad, Faridabad):</strong> Next-day delivery (24 hours).</li>
                  <li><strong>Metro Cities (Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune):</strong> 2 to 3 business days.</li>
                  <li><strong>Tier-2 & Tier-3 Indian Cities:</strong> 3 to 4 business days.</li>
                  <li><strong>Free Delivery:</strong> Automatically applied to all orders above ₹499. Flat ₹60 for orders under ₹499.</li>
                </ul>
              </div>

              <div className="p-3 bg-amberSpice-50 rounded-xl border border-amberSpice-200 text-xs text-amberSpice-900">
                <strong>Real-Time Tracking:</strong> You will receive instant SMS and WhatsApp tracking updates with a direct courier tracking link as soon as your parcel is picked up by Delhivery, BlueDart, or DTDC.
              </div>
            </div>
          )}

          {activePolicy === 'returns' && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950">100% Homemaker Swad & Freshness Guarantee</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    If our stone-ground spices do not meet your family's standard of purity and authentic aroma, Neelam personally guarantees a hassle-free resolution.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-charcoal-900 text-sm">7-Day Replacement Policy:</h4>
                <p className="text-xs text-charcoal-600">
                  Because our spices are perishable, 100% chemical-free food products, we do not accept returns of opened spice pouches for health and safety reasons. However, we offer <strong>immediate free replacement</strong> within 7 days if:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-charcoal-600">
                  <li>The product arrived damaged, broken, or with a compromised tamper-seal.</li>
                  <li>You received an incorrect item or weight variant.</li>
                  <li>Cookware (Cast Iron Kadhai / Brass Pan / Glass Jars) arrived with physical transit defects.</li>
                </ul>
              </div>

              <div className="p-3.5 bg-cream-50 rounded-xl border border-cream-200 text-xs text-charcoal-700">
                <strong>How to Claim:</strong> Simply send a photo of the damaged parcel to our WhatsApp care line at <strong>{SITE_CONFIG.whatsappDisplay}</strong> or email <strong>{SITE_CONFIG.supportEmail}</strong>. We will dispatch a replacement within 24 hours.
              </div>
            </div>
          )}

          {activePolicy === 'privacy' && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200">
                <h4 className="font-bold text-charcoal-900">Indian E-Commerce Rules (2020) & FSSAI Compliance</h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  Uttam Rasoi by Neelam operates under full compliance with the Consumer Protection (E-Commerce) Rules, 2020 and the Food Safety and Standards Authority of India (FSSAI) License No. <strong>{SITE_CONFIG.fssaiNumber}</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-charcoal-900 text-sm">Your Data & Payment Security:</h4>
                <ul className="space-y-1.5 list-disc pl-5 text-xs text-charcoal-600">
                  <li><strong>256-Bit SSL Encryption:</strong> All payments (UPI, RuPay, Cards, NetBanking) are routed through certified, RBI-authorized Indian payment gateways. We never store credit/debit card numbers or UPI PINs.</li>
                  <li><strong>Zero Spam Guarantee:</strong> Your mobile number and delivery address are strictly used for shipping notifications and customer support. We never sell, rent, or distribute your personal data.</li>
                  <li><strong>Grievance Officer:</strong> In accordance with Indian IT rules, address all inquiries to: Saurabh Sharma (Grievance Officer), Email: {SITE_CONFIG.supportEmail}.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cream-200 bg-cream-50 flex items-center justify-between">
          <a
            href={getWhatsAppLink('Namaste Neelam ji, I have a question regarding store policies')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
          </a>

          <button
            onClick={() => setActivePolicy(null)}
            className="px-5 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
