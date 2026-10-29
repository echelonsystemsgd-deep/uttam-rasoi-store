'use client';

import React from 'react';
import { RECIPE_VLOGS } from '../data/vlogs';
import { PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Youtube, Play, Clock, Eye, ShoppingBag, Sparkles, ChefHat } from 'lucide-react';

export const ShoppableVlogs: React.FC = () => {
  const { setRecipeModalVlog, addToCart, setIsCartOpen } = useStore();

  return (
    <section id="shoppable-vlogs" className="py-16 sm:py-20 bg-cream-100/70 border-t border-cream-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Youtube className="w-4 h-4 text-red-600 fill-current" />
              <span>As Seen on Neelam's YouTube Vlog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-charcoal-900 tracking-tight">
              Cook What You Watch,{' '}
              <span className="italic font-normal text-terracotta-600">Shop The Recipes</span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 font-sans max-w-2xl">
              Don’t guess the ingredients! Directly shop the exact stone-ground spices, pre-seasoned kadhai, and airtight glass jars Neelam uses in her real kitchen videos.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@indianyoutuberneelamvlogs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
          >
            <span>Visit @indianyoutuberneelamvlogs</span>
            <span>→</span>
          </a>
        </div>

        {/* Vlogs Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECIPE_VLOGS.map((vlog) => {
            // Find linked products
            const linkedProducts = vlog.featuredProductIds
              .map((id) => PRODUCTS.find((p) => p.id === id))
              .filter(Boolean);

            return (
              <div
                key={vlog.id}
                className="bg-white rounded-3xl border border-cream-200 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Video Preview Thumbnail with Play Button */}
                <div
                  onClick={() => setRecipeModalVlog(vlog)}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-charcoal-900"
                >
                  <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  {/* Video duration & view badge */}
                  <div className="absolute top-3 right-3 bg-charcoal-900/80 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amberSpice-400" />
                    <span>{vlog.videoDuration}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                      {vlog.recipeName}
                    </span>
                    <span className="text-xs text-cream-200 font-medium">
                      {vlog.views} • Recipe Walkthrough
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => setRecipeModalVlog(vlog)}
                      className="font-serif font-bold text-base sm:text-lg text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {vlog.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {vlog.description}
                    </p>
                  </div>

                  {/* Recipe Stats Pills */}
                  <div className="flex items-center gap-2 text-[11px] text-charcoal-600 bg-cream-100/70 p-2 rounded-xl">
                    <ChefHat className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                    <span>Prep: <strong>{vlog.prepTime}</strong></span>
                    <span>•</span>
                    <span>Cook: <strong>{vlog.cookTime}</strong></span>
                    <span>•</span>
                    <span>Serves: <strong>{vlog.servings}</strong></span>
                  </div>

                  {/* Linked Products Micro-Shelf */}
                  <div className="border-t border-cream-200/80 pt-3 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-charcoal-700 gap-2 pb-0.5">
                      <span className="flex items-center gap-1.5 uppercase tracking-wider text-charcoal-800">
                        <Sparkles className="w-3.5 h-3.5 text-amberSpice-500 flex-shrink-0" />
                        <span>Recipe Kit:</span>
                      </span>
                      <button
                        onClick={() => setRecipeModalVlog(vlog)}
                        className="text-terracotta-600 hover:text-terracotta-700 hover:underline font-semibold text-[11px] flex-shrink-0"
                      >
                        Recipe Steps →
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {linkedProducts.map((p) => {
                        if (!p) return null;
                        const v = p.variants[0];
                        return (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-cream-50 hover:bg-cream-100/80 transition-colors border border-cream-200/60"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                                }}
                                className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-cream-200"
                              />
                              <div className="truncate">
                                <p className="text-xs font-semibold text-charcoal-900 truncate">{p.name}</p>
                                <p className="text-[10px] text-charcoal-500">{v.weight}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs font-bold text-charcoal-900">₹{v.price}</span>
                              <button
                                onClick={() => {
                                  addToCart(p, 0, 1);
                                  setIsCartOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-xs"
                                title="Add to cart"
                              >
                                <ShoppingBag className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
