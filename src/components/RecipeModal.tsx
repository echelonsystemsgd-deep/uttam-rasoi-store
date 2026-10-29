'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Youtube, Clock, ChefHat, Users, CheckCircle2, ShoppingBag, Sparkles } from 'lucide-react';

export const RecipeModal: React.FC = () => {
  const { recipeModalVlog, setRecipeModalVlog, addToCart, setIsCartOpen } = useStore();

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-cream-200">
        
        {/* Header */}
        <div className="relative aspect-video max-h-72 w-full overflow-hidden bg-charcoal-900">
          <img
            src={recipeModalVlog.thumbnail}
            alt={recipeModalVlog.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Neelam's Recipe Walkthrough
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
              {recipeModalVlog.recipeName}
            </h2>
            <div className="flex items-center gap-4 text-xs text-cream-200 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Prep: {recipeModalVlog.prepTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-amber-400" /> Cook: {recipeModalVlog.cookTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Serves: {recipeModalVlog.servings}
              </span>
            </div>
          </div>

          <button
            onClick={() => setRecipeModalVlog(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-charcoal-900/80 text-white flex items-center justify-center hover:bg-charcoal-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
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
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-warm active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All To Cart</span>
            </button>
          </div>

          {/* Step-by-Step Cooking Instructions */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-charcoal-900 border-b border-cream-200 pb-2">
              Step-by-Step Cooking Method
            </h3>
            <div className="space-y-3">
              {recipeModalVlog.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-terracotta-100 text-terracotta-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Channel Redirect */}
          <div className="text-center pt-2">
            <a
              href="https://www.youtube.com/@indianyoutuberneelamvlogs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:underline"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Watch Neelam cook this live on YouTube</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
