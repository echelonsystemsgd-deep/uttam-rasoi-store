'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const QUICK_QUESTIONS = [
    { label: '🥘 Which masala is best for Paneer?', text: 'Namaste Neelam ji, which masala do you recommend for restaurant-style Paneer?' },
    { label: '📦 How to check delivery to my pin code?', text: 'Namaste! Can you tell me delivery time for my PIN code?' },
    { label: '🎁 Need gift hampers for family/Diwali', text: 'Namaste Neelam ji, I want to order Starter Gift Hampers in bulk.' },
    { label: '📞 Help with direct WhatsApp order', text: 'Namaste! I want to place an order directly on WhatsApp.' },
  ];

  const handleSendQuery = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-forestSage-800 to-forestSage-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-emerald-300">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Uttam Rasoi Support</h4>
                <p className="text-[11px] text-emerald-200">Neelam's Kitchen Help Desk • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-cream-50 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-cream-200 text-charcoal-700 leading-relaxed shadow-xs">
              <span className="font-bold text-charcoal-900 block mb-0.5">Namaste! 🙏</span>
              How can we assist your kitchen today? Choose a quick question below or message us directly:
            </div>

            <div className="space-y-1.5">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuery(q.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-cream-200 hover:border-emerald-300 text-charcoal-800 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2 font-medium">{q.label}</span>
                  <Send className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="p-3 bg-white border-t border-cream-200">
            <button
              onClick={() => handleSendQuery('Namaste Neelam ji, I have an inquiry about Uttam Rasoi spices.')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline text-xs font-bold font-sans">
          Recipe & Order Help
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amberSpice-400 rounded-full border-2 border-white animate-pulse" />
      </button>

    </div>
  );
};
