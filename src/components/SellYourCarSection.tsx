'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Calculator } from 'lucide-react';

interface SellYourCarSectionProps {
  onOpenValuationModal: (modelName: string) => void;
  onPostAdClick: () => void;
}

export default function SellYourCarSection({
  onOpenValuationModal,
  onPostAdClick,
}: SellYourCarSectionProps) {
  const [modelInput, setModelInput] = useState('');
  const [estimatedValue, setEstimatedValue] = useState<string | null>(null);

  const perks = [
    'Free Car Valuation',
    'Wide Buyer Network',
    'Safe & Secure Process',
    'Quick & Hassle-Free',
  ];

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;

    // Generate a reasonable estimate simulation
    const base = 25000 + Math.floor(Math.random() * 45000);
    const rangeLow = Math.round(base * 0.95 / 100) * 100;
    const rangeHigh = Math.round(base * 1.08 / 100) * 100;
    setEstimatedValue(`$${rangeLow.toLocaleString()} - $${rangeHigh.toLocaleString()}`);

    onOpenValuationModal(modelInput);
  };

  return (
    <section id="sell-your-car" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Selling USPs & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Sell Your Car
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Get the Best Value <br />
                <span className="text-[#FF5B26]">For Your Car</span>
              </h2>
              <p className="text-slate-600 text-base mt-3 leading-relaxed">
                Fast. Safe. Simple. Sell your car with CarKino.com and reach thousands of serious buyers.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF5B26]/10 text-[#FF5B26] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5B26]" />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm sm:text-base">
                    {perk}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onPostAdClick}
                className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Sell Your Car Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual with Floating Valuation Box */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                alt="Sell your car with CarKino"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Valuation Widget Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-slate-100 text-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-[#FF5B26]" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    Get Your Car Valued <br />
                    <span className="text-xs font-semibold text-slate-500">in 2 Minutes</span>
                  </h3>
                </div>

                <form onSubmit={handleValuationSubmit} className="space-y-3 mt-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your car model"
                      value={modelInput}
                      onChange={(e) => setModelInput(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5B26] focus:ring-1 focus:ring-[#FF5B26] placeholder-slate-400 bg-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#090E1A] hover:bg-[#FF5B26] text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Get Value</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {estimatedValue && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <p className="text-[11px] text-emerald-800 font-semibold uppercase">Estimated Market Value</p>
                    <p className="text-base font-black text-emerald-600">{estimatedValue}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
