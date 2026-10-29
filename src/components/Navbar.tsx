'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, MapPin, Menu, X, ChevronRight, Youtube, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { SITE_CONFIG, getWhatsAppLink } from '../config/site';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsPincodeModalOpen,
    pincode,
    pincodeInfo,
    setQuickViewProduct,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Total items in cart
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Search filtered products
  const searchResults: Product[] = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.hindiName && p.hindiName.includes(searchQuery))
      ).slice(0, 5)
    : [];

  // Lock background scroll when mobile navigation menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isMobileMenuOpen]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-subtle transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-serif font-black text-xl tracking-wider">उ</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Uttam Rasoi
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                </div>
                <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-primary font-semibold font-sans">
                  <span>By Neelam</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-veg">Artisan Kitchen</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-foreground">
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Spices & Masalas
            </button>
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Cookware & Storage
            </button>
            <button
              onClick={() => scrollToSection('shoppable-vlogs')}
              className="hover:text-primary flex items-center gap-1.5 transition-colors py-1 text-primary font-semibold"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Recipes & Vlogs</span>
            </button>
            <button
              onClick={() => scrollToSection('founders-story')}
              className="hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection('customer-reviews')}
              className="hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              Reviews (4.9★)
            </button>
          </nav>

          {/* Search, Pincode Pill & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            
            {/* Interactive Search Bar */}
            <div ref={searchRef} className="relative hidden lg:block w-48 xl:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pure spices, kadhai..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full bg-secondary border border-border rounded-full py-2 pl-9 pr-4 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all placeholder:text-muted-foreground"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-soft border border-border overflow-hidden z-50 animate-fadeIn">
                  <div className="p-2 border-b border-border text-[11px] font-semibold text-primary uppercase tracking-wider flex items-center justify-between">
                    <span>Products Found</span>
                    <span>{searchResults.length} items</span>
                  </div>
                  <div className="divide-y divide-border max-h-72 overflow-y-auto">
                    {searchResults.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setQuickViewProduct(p);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-2.5 hover:bg-secondary flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{p.categoryLabel}</p>
                        </div>
                        <span className="text-xs font-bold text-primary">
                          ₹{p.variants[0].price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pincode Pill */}
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-secondary hover:bg-muted border border-border text-foreground px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="truncate max-w-[110px]">{pincodeInfo.city.split(' ')[0]}</span>
              <span className="text-primary font-semibold underline text-[11px]">Change</span>
            </button>

            {/* Wishlist Pill */}
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="p-2.5 rounded-full text-foreground hover:text-primary hover:bg-secondary transition-colors relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-primary text-primary' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Slide-out Cart Button */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="rounded-full gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-sm"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-accent text-accent-foreground font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold hidden xs:inline">Cart</span>
            </Button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pt-3 pb-8 space-y-4 animate-slideDown shadow-soft max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Mobile Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search spices, kadhai, jars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          {searchQuery && searchResults.length > 0 && (
            <div className="bg-card rounded-xl p-2 border border-border divide-y divide-border max-h-56 overflow-y-auto">
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setQuickViewProduct(p);
                    setIsMobileMenuOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 flex items-center justify-between text-xs cursor-pointer hover:bg-secondary"
                >
                  <span className="font-medium text-foreground truncate">{p.name}</span>
                  <span className="text-primary font-bold">₹{p.variants[0].price}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="space-y-1 divide-y divide-border text-foreground text-sm font-medium">
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="w-full text-left py-3 flex items-center justify-between hover:text-primary"
            >
              <span>Spices & Masalas</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollToSection('product-catalog')}
              className="w-full text-left py-3 flex items-center justify-between hover:text-primary"
            >
              <span>Cookware & Kitchen Storage</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollToSection('shoppable-vlogs')}
              className="w-full text-left py-3 flex items-center justify-between text-primary font-semibold"
            >
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span>Shoppable YouTube Recipes</span>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => scrollToSection('founders-story')}
              className="w-full text-left py-3 flex items-center justify-between hover:text-primary"
            >
              <span>Neelam's Story & Mission</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => scrollToSection('customer-reviews')}
              className="w-full text-left py-3 flex items-center justify-between hover:text-primary"
            >
              <span>Customer Reviews (4.9★)</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Quick Pincode selector in mobile menu */}
          <div className="pt-2 flex items-center justify-between bg-secondary p-3 rounded-xl border border-border">
            <div className="flex items-center gap-2 text-xs text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Delivering to: <strong>{pincode}</strong> ({pincodeInfo.city})</span>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPincodeModalOpen(true);
              }}
              className="text-xs font-semibold text-primary underline"
            >
              Change
            </button>
          </div>

          {/* Direct WhatsApp Callout in mobile drawer */}
          <a
            href={getWhatsAppLink('Namaste Neelam ji, I want to order spices directly')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-veg text-veg-foreground flex items-center justify-center gap-2 text-xs font-semibold hover:bg-veg/90 transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Order Directly via WhatsApp ({SITE_CONFIG.whatsappDisplay})</span>
          </a>
        </div>
      )}
    </header>
  );
};
