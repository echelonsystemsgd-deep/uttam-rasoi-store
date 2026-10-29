'use client';

import React from 'react';
import { Heart, Sparkles, ShieldCheck, CheckCircle2, Award, Youtube } from 'lucide-react';

export const FoundersStory: React.FC = () => {
  return (
    <section id="founders-story" className="py-16 sm:py-24 bg-white border-t border-cream-200/80 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait & Visual Trust Stills */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-100 bg-cream-100">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
                  alt="Neelam & Saurabh Sharma in their kitchen"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                    The Homemaker Behind The Brand
                  </span>
                  <h3 className="font-serif text-2xl font-bold">Neelam & Saurabh Sharma</h3>
                  <p className="text-xs text-cream-200 mt-0.5">Founders, Uttam Rasoi & Lifestyle Creators</p>
                </div>
              </div>

              {/* Floating YouTube Stats Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-cream-200 flex items-center gap-3.5 max-w-xs animate-fadeIn">
                <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                  <Youtube className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-base text-charcoal-900">500,000+</span>
                    <span className="text-xs text-red-600 font-extrabold">Family</span>
                  </div>
                  <p className="text-[11px] text-charcoal-500">Cook with Neelam every week</p>
                </div>
              </div>

              {/* Stamp Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 w-24 h-24 rounded-full bg-terracotta-600 text-white p-2 shadow-lg flex flex-col items-center justify-center text-center rotate-[-12deg]">
                <Award className="w-6 h-6 text-amber-200 mb-0.5" />
                <span className="text-[9px] font-extrabold uppercase leading-tight">100% PURE GUARANTEE</span>
              </div>

            </div>
          </div>

          {/* Right Column: The Heartfelt Letter */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-terracotta-600 fill-current" />
              <span>A Personal Letter From Neelam</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-charcoal-900 tracking-tight leading-tight">
              "From My Kitchen To Yours —{' '}
              <span className="italic font-normal text-terracotta-600">Why We Created Uttam Rasoi"</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-charcoal-700 font-sans leading-relaxed">
              <p>
                <strong>Namaste, I am Neelam.</strong> For years on my YouTube channel, hundreds of you commented asking: <em>"Neelam ji, what garam masala do you use in your paneer?"</em> or <em>"How does your yellow dal get that rich dhaba fragrance without artificial essences?"</em>
              </p>

              <p>
                The honest truth is, I never used commercial supermarket spices. When we looked into factory-packaged spices, we were shocked to discover spent spice residue, artificial red dyes (Sudan dyes), anti-caking silica powders, and starch fillers used to cut costs.
              </p>

              <p>
                In Indian culture, food isn't just fuel — it is <em>Prasad</em>. It is health, love, and our family’s immunity. So my husband Saurabh and I decided to bring the exact stone-ground spices we make for our own children directly to your doorstep.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block mb-1.5" />
                <h4 className="font-bold text-xs text-charcoal-900">Zero Chemical Milling</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">Cold stone grinding at slow RPMs leaves essential oils intact.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 inline-block mb-1.5" />
                <h4 className="font-bold text-xs text-charcoal-900">Direct From Farms</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">Nagaur methi, Meghalaya turmeric & Kashmiri chillies.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="w-2 h-2 rounded-full bg-amberSpice-500 inline-block mb-1.5" />
                <h4 className="font-bold text-xs text-charcoal-900">Daily Tested In Home</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">Every single batch is cooked in Neelam’s kitchen before packing.</p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
              <div>
                <span className="font-serif italic text-xl sm:text-2xl font-bold text-charcoal-900 block">
                  Neelam Saurabh Sharma
                </span>
                <span className="text-xs text-charcoal-500">Creator & Founder, Uttam Rasoi</span>
              </div>

              <div className="flex items-center gap-1.5 bg-forestSage-50 border border-forestSage-200 text-forestSage-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Govt. FSSAI Approved</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
