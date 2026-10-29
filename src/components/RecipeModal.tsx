'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, FALLBACK_IMAGE } from '../data/products';
import { X, Youtube, Clock, ChefHat, Users, ShoppingBag, Sparkles, Play, Video, BookOpen, Check } from 'lucide-react';

export const RecipeModal: React.FC = () => {
  const { recipeModalVlog, setRecipeModalVlog, addToCart, setIsCartOpen } = useStore();
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'steps'>('video');

  if (!recipeModalVlog) return null;

  const linkedProducts = recipeModalVlog.featuredProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const addAllIngredientsToCart = () => {
    linkedProducts.forEach((p) => {
      if (p) addToCart(p, 0, 1);
    });
    setRecipeModalVlog(null);
    setIsCartOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setRecipeModalVlog(null);
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-cream-200 flex flex-col">
        
        {/* Video Player / Media Header */}
        <div className="relative aspect-video w-full bg-charcoal-950 flex-shrink-0">
          {isPlayingVideo ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${recipeModalVlog.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={recipeModalVlog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setIsPlayingVideo(true)}
            >
              <img
                src={recipeModalVlog.thumbnail}
                alt={recipeModalVlog.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-16 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Click To Play Video
                </span>
                <p className="font-serif text-base sm:text-lg font-bold line-clamp-1">
                  {recipeModalVlog.recipeName}
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setRecipeModalVlog(null)}
            className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-charcoal-900/85 text-white flex items-center justify-center hover:bg-charcoal-900 shadow-md backdrop-blur-sm transition-transform active:scale-90"
            aria-label="Close recipe video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
                <Youtube className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span>Neelam's Vlog Recipe</span>
              </span>
              <span className="text-xs text-charcoal-500 font-medium">
                {recipeModalVlog.views} • {recipeModalVlog.videoDuration}
              </span>
            </div>

            <h2 id="recipe-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mt-2">
              {recipeModalVlog.title}
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 leading-relaxed">
              {recipeModalVlog.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-700 mt-3 pt-3 border-t border-cream-200">
              <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-terracotta-600" /> Prep: <strong>{recipeModalVlog.prepTime}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1 rounded-lg">
                <ChefHat className="w-3.5 h-3.5 text-terracotta-600" /> Cook: <strong>{recipeModalVlog.cookTime}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1 rounded-lg">
                <Users className="w-3.5 h-3.5 text-terracotta-600" /> Serves: <strong>{recipeModalVlog.servings}</strong>
              </span>
            </div>
          </div>

          {/* Add All Ingredients Callout */}
          <div className="bg-gradient-to-r from-terracotta-50 via-amberSpice-50 to-cream-100 p-4 sm:p-5 rounded-2xl border border-terracotta-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-base text-charcoal-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-terracotta-600" />
                <span>Shop All {linkedProducts.length} Spices / Tools Used</span>
              </h4>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Cook this recipe with 100% authentic flavor using Neelam’s recommended pantry kit.
              </p>
            </div>
            <button
              onClick={addAllIngredientsToCart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-warm active:scale-95 transition-all flex-shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All To Cart</span>
            </button>
          </div>

          {/* Step-by-Step Cooking Instructions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-2">
              <h3 className="font-serif font-bold text-lg text-charcoal-900">
                Step-by-Step Cooking Method
              </h3>
              <span className="text-xs text-charcoal-500 font-medium">
                {recipeModalVlog.instructions.length} Essential Steps
              </span>
            </div>

            <div className="space-y-3">
              {recipeModalVlog.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs sm:text-sm text-charcoal-700 leading-relaxed p-2.5 rounded-xl bg-cream-50/70 border border-cream-200/60">
                  <span className="w-6 h-6 rounded-full bg-terracotta-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <p className="flex-1 font-sans">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Channel Link */}
          <div className="text-center pt-2 border-t border-cream-200">
            <a
              href="https://www.youtube.com/@indianyoutuberneelamvlogs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              <Youtube className="w-4 h-4 fill-red-600 text-red-600" />
              <span>Subscribe & watch Neelam cook live on YouTube (@indianyoutuberneelamvlogs)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
