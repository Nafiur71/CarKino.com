'use client';

import React, { useState } from 'react';
import { ArrowRight, Play, CheckCircle, Sparkles } from 'lucide-react';
import SearchWidget from './SearchWidget';

interface HeroSectionProps {
  onSearchFilters?: (filters: { make: string; model: string; price: string; location: string }) => void;
  onValuationClick?: (model?: string) => void;
}

export default function HeroSection({ onSearchFilters, onValuationClick }: HeroSectionProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-20 lg:pb-28 bg-[#090E1A] overflow-hidden">
      {/* Background Graphic Gradients & Skyline */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF5B26]/20 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />

        {/* Ambient Darkened Skyline & Road photo overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090E1A]/80 via-[#090E1A]/90 to-[#090E1A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 lg:pt-8">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF5B26] animate-pulse" />
              <span>PREMIUM CARS. TRUSTED DEALS.</span>
            </div>

            {/* Main Headline with CarKino */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B26] via-[#FF7A45] to-[#FFA07A]">
                Dream Car
              </span>
              <br />
              <span className="font-extrabold text-slate-100">with CarKino.com</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From luxury to everyday rides — explore thousands of verified cars, compare, and drive with complete confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#featured-cars"
                className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-7 py-3.5 rounded-full font-bold text-base shadow-xl shadow-[#FF5B26]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Browse Cars</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/10 backdrop-blur-sm transition-all hover:border-white/30"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#FF5B26]" />
                <span>100% Verified Sellers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#FF5B26]" />
                <span>Transparent History</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#FF5B26]" />
                <span>Zero Advance Scams</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Car Showcase Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Backlight halo effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5B26]/20 via-blue-500/10 to-transparent rounded-full filter blur-3xl transform scale-90" />
              
              {/* Car Image with reflection plate */}
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
                  alt="CarKino Premium Sports Coupe"
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl border border-white/10 transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#090E1A]/90 backdrop-blur-md border border-white/15 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Featured Deal</p>
                    <p className="text-white font-bold text-sm">2023 BMW M-Series Performance</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#FF5B26] font-bold">Verified Dealer</span>
                    <p className="text-white font-extrabold text-base">$64,900</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Interactive Search Widget */}
      <div className="mt-12 sm:mt-16">
        <SearchWidget onSearch={onSearchFilters} onValuationStart={onValuationClick} />
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-2xl w-full p-6 text-white relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF5B26]" />
                How CarKino Works
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="py-6 space-y-4">
              <div className="aspect-video bg-black/60 rounded-2xl flex flex-col items-center justify-center border border-white/10 text-center p-6">
                <Play className="w-12 h-12 text-[#FF5B26] mb-3 animate-pulse" />
                <p className="font-semibold text-lg text-slate-200">Watch: Buying & Selling Safely in 3 Steps</p>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  1. Search verified cars • 2. Check seller phone badge & history • 3. Meet and test drive with confidence.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-5 py-2 rounded-xl text-sm font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
