'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Fuel, Gauge, Award, CheckCircle2, Calculator, Scale } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useCars } from '@/context/CarContext';

interface PopularBdCarsSectionProps {
  onFilterMakeModel?: (make: string, model: string) => void;
  onOpenEmi?: (price: number, modelName: string) => void;
}

export default function PopularBdCarsSection({
  onFilterMakeModel,
  onOpenEmi,
}: PopularBdCarsSectionProps) {
  const { addToCompare, compareList, cars } = useCars();

  const handleComparePremioAndAllion = () => {
    const premioCar = cars.find((c) => c.model.toLowerCase().includes('premio'));
    const allionCar = cars.find((c) => c.model.toLowerCase().includes('allion'));
    if (premioCar && !compareList.includes(premioCar.id)) {
      addToCompare(premioCar.id);
    }
    if (allionCar && !compareList.includes(allionCar.id)) {
      addToCompare(allionCar.id);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#090E1A] via-[#0D162B] to-[#090E1A] text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FF5B26]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B26]/15 border border-[#FF5B26]/30 text-xs font-bold tracking-wider text-[#FF5B26] uppercase mb-4 shadow-sm">
            <span className="text-sm">🇧🇩</span>
            <span>Bangladesh&apos;s #1 Road Kings &bull; বাংলাদেশের সর্বাধিক জনপ্রিয় গাড়ি</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Toyota <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D061] to-[#E5A93B]">Premio</span> &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#0284C7]">Allion</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            The undisputed champions of Bangladesh roads. Loved by generations for supreme resale value, 
            luxurious comfort, affordable maintenance, and bulletproof Japanese reliability.
          </p>
        </div>

        {/* Spotlight Comparison: Premio vs Allion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* 1. Toyota Premio Card */}
          <div className="bg-[#111A33]/90 rounded-3xl border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden group hover:border-amber-400/60 transition-all shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between">
            {/* Top Amber Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500" />
            
            <div>
              {/* Badge & Model Crest Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Authentic Premio Crown Shield Crest */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-2.5 border border-amber-400/40 shadow-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BrandLogo name="premio" className="w-full h-full" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>The Executive Luxury Crown</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Toyota Premio</h3>
                    <p className="text-xs text-slate-400">NZT260 / ZRT260 &bull; 1.5L / 1.8L VVT-i</p>
                  </div>
                </div>

                <span className="bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap">
                  VIP Luxury
                </span>
              </div>

              {/* Price Range Banner */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    BD Market Price Guide
                  </span>
                  <span className="text-xl font-extrabold text-amber-300">
                    ৳২৬.৫ – ৪২.০ লাখ <span className="text-xs text-slate-400 font-normal">($24K - $38K)</span>
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 96% Resale Value
                  </span>
                  <span className="text-[11px] text-slate-400">Highest Liquidity in BD</span>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-slate-300">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                  <Fuel className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Mileage (City/Hwy)</div>
                    <div className="font-bold text-white">14 – 18 km/L (Octane)</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                  <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Engine / Chassis</div>
                    <div className="font-bold text-white">1500cc 1NZ-FE &bull; Super CVT-i</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 col-span-2">
                  <span className="text-[11px] text-slate-400 font-medium block mb-1">Hallmark Features in Bangladesh:</span>
                  <p className="text-slate-200 leading-relaxed text-[11px]">
                    Luxurious warm beige interior with woodgrain finish, plush soft-touch seats, Toyota Safety Sense, 
                    ultra-smooth acoustic isolation, and elite executive status.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onFilterMakeModel?.('Toyota', 'Premio')}
                className="flex-1 min-w-[140px] bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>View Premio Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenEmi?.(31500, 'Toyota Premio F EX Package')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Calculate Monthly EMI"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-300" />
                <span>EMI Plan</span>
              </button>
            </div>
          </div>

          {/* 2. Toyota Allion Card */}
          <div className="bg-[#111A33]/90 rounded-3xl border border-sky-500/30 p-6 sm:p-8 relative overflow-hidden group hover:border-sky-400/60 transition-all shadow-xl hover:shadow-sky-500/10 flex flex-col justify-between">
            {/* Top Cyan/Blue Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500" />

            <div>
              {/* Badge & Model Crest Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Authentic Allion Winged "A" Crest */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-2.5 border border-sky-400/40 shadow-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BrandLogo name="allion" className="w-full h-full" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>The Dynamic Sporty Icon</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Toyota Allion</h3>
                    <p className="text-xs text-slate-400">NZT260 / ZRT260 &bull; A15 / A18 G-Plus</p>
                  </div>
                </div>

                <span className="bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap">
                  Sport Sedan
                </span>
              </div>

              {/* Price Range Banner */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    BD Market Price Guide
                  </span>
                  <span className="text-xl font-extrabold text-sky-300">
                    ৳২৫.০ – ৩৯.৫ লাখ <span className="text-xs text-slate-400 font-normal">($23K - $36K)</span>
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 95% Resale Value
                  </span>
                  <span className="text-[11px] text-slate-400">Popular with Young Executives</span>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-slate-300">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                  <Fuel className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Mileage (City/Hwy)</div>
                    <div className="font-bold text-white">15 – 18.5 km/L (Octane)</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                  <Gauge className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Engine / Chassis</div>
                    <div className="font-bold text-white">1500cc 1NZ-FE &bull; Responsive CVT</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 col-span-2">
                  <span className="text-[11px] text-slate-400 font-medium block mb-1">Hallmark Features in Bangladesh:</span>
                  <p className="text-slate-200 leading-relaxed text-[11px]">
                    Sleek dark charcoal/black sporty cockpit, aerodynamic Modellista body kits, sharp aggressive front grill, 
                    responsive high-speed steering, and athletic road stance.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onFilterMakeModel?.('Toyota', 'Allion')}
                className="flex-1 min-w-[140px] bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <span>View Allion Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenEmi?.(29800, 'Toyota Allion A15 G-Plus')}
                className="bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 px-3.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Calculate Monthly EMI"
              >
                <Calculator className="w-3.5 h-3.5 text-sky-300" />
                <span>EMI Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Versus & Direct Compare Tool Banner */}
        <div className="bg-gradient-to-r from-[#1E293B]/80 via-[#0F172A] to-[#1E293B]/80 rounded-2xl border border-white/10 p-5 sm:p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#FF5B26]/10 border border-[#FF5B26]/30 flex items-center justify-center text-[#FF5B26] shrink-0 hidden sm:flex">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg text-white">
                Confused between Premio vs Allion?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Both share the legendary 1NZ-FE 1500cc engine. Choose <strong className="text-amber-300 font-bold">Premio</strong> for luxury executive elegance or <strong className="text-sky-300 font-bold">Allion</strong> for modern sporty thrills!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/compare"
              onClick={handleComparePremioAndAllion}
              className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-[#FF5B26]/20 transition-all hover:scale-105"
            >
              <Scale className="w-4 h-4" />
              <span>Compare Side-by-Side</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars: Why Premio & Allion Dominate Bangladesh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3 text-lg">
              ৳
            </div>
            <h5 className="font-bold text-sm text-white mb-1">Unrivaled Resale Value</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premio and Allion retain up to 95% of their value even after 3-5 years of local use in Bangladesh.
            </p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-[#FF5B26]/20 text-[#FF5B26] flex items-center justify-center font-bold mb-3 text-lg">
              🔧
            </div>
            <h5 className="font-bold text-sm text-white mb-1">Parts in All 64 Districts</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              From Dholaikhal to Kakrail, any auto mechanic can service them instantly with inexpensive parts.
            </p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3 text-lg">
              🛡️
            </div>
            <h5 className="font-bold text-sm text-white mb-1">Durable for Local Roads</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              High suspension clearance and heavy-duty chassis perfectly soak up monsoon potholes and rough terrains.
            </p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.08] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-3 text-lg">
              ⛽
            </div>
            <h5 className="font-bold text-sm text-white mb-1">Octane & LPG Compatible</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bulletproof 1NZ-FE engine operates reliably on local Octane, and easily adapts to CNG/LPG conversions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
