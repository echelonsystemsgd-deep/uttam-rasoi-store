'use client';

import React from 'react';
import { Home, Sparkles, Youtube, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getWhatsAppLink } from '../config/site';

export const MobileBottomNav: React.FC = () => {
  const { cart, setIsCartOpen, total } = useStore();

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] px-3">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-center text-center">
        
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center p-1.5 min-h-[48px] text-charcoal-700 hover:text-terracotta-600 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>

        {/* Spices Catalog */}
        <button
          onClick={() => scrollTo('product-catalog')}
          className="flex flex-col items-center justify-center p-1.5 min-h-[48px] text-charcoal-700 hover:text-terracotta-600 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Spices</span>
        </button>

        {/* Recipes & Vlogs */}
        <button
          onClick={() => scrollTo('shoppable-vlogs')}
          className="flex flex-col items-center justify-center p-1.5 min-h-[48px] text-red-600 hover:text-red-700 transition-colors"
        >
          <Youtube className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold mt-1">Recipes</span>
        </button>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 min-h-[48px] text-terracotta-600"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-terracotta-600 text-white font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1">
            {totalCount > 0 ? `₹${total}` : 'Cart'}
          </span>
        </button>

        {/* WhatsApp Support */}
        <a
          href={getWhatsAppLink('Namaste Neelam ji, I need help with an order')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 min-h-[48px] text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold mt-1">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
