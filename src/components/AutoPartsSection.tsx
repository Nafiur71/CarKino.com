'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { MOCK_PARTS, AutoPart } from '@/data/mockData';
import PartDetailModal from './PartDetailModal';

export default function AutoPartsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMakeFilter, setSelectedMakeFilter] = useState<string>('All');
  const [activePartForModal, setActivePartForModal] = useState<AutoPart | null>(null);

  const categories = [
    'All',
    'Brakes & Suspension',
    'Wheels & Tires',
    'Performance & Exhaust',
    'Lighting & Electrical',
    'Engine & Transmission',
    'Body & Mirrors',
  ];

  const makes = ['All', 'Porsche', 'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Volkswagen'];

  // Filter parts
  const filteredParts = useMemo(() => {
    return MOCK_PARTS.filter((part) => {
      if (selectedCategory !== 'All' && part.category !== selectedCategory) {
        return false;
      }
      if (
        selectedMakeFilter !== 'All' &&
        !part.compatibleMakes.some((m) => m.toLowerCase() === selectedMakeFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedMakeFilter]);

  return (
    <section id="auto-parts" className="py-20 bg-slate-900 text-white relative border-y border-white/10">
      {/* Background glow styling */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5B26]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5B26] mb-2 bg-[#FF5B26]/10 px-3 py-1 rounded-full border border-[#FF5B26]/20">
              <Wrench className="w-3.5 h-3.5" />
              <span>Genuine Spare Parts &amp; Accessories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Quality Spare Parts, Guaranteed Fitment
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Shop 100% verified OEM components, racing upgrades, and genuine replacement parts directly from verified dealers and specialist garages.
            </p>
          </div>

          <Link
            href="/parts"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#FF5B26] hover:bg-[#E84E1A] px-5 py-2.5 rounded-full shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-[1.02] shrink-0 self-start sm:self-end"
          >
            <span>Explore Parts Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Vehicle Fitment Quick Filter Bar */}
        <div className="bg-[#141F38] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF5B26]/20 text-[#FF5B26] flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Find Parts for Your Vehicle</h4>
                <p className="text-xs text-slate-400">Filter compatible parts guaranteed to fit your car model</p>
              </div>
            </div>

            {/* Make selection dropdowns */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-300 font-semibold shrink-0">Select Make:</span>
              <div className="flex gap-1.5">
                {makes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMakeFilter(m)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                      selectedMakeFilter === m
                        ? 'bg-[#FF5B26] text-white shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none text-xs">
          <span className="text-slate-400 font-bold uppercase text-[11px] shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-md font-extrabold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => {
            const whatsappMessage = encodeURIComponent(
              `Hi ${part.seller.name}, I am inquiring about "${part.name}" (Part #: ${part.partNumber}) listed on CarKino for $${part.price.toLocaleString()}. Is it available?`
            );

            return (
              <div
                key={part.id}
                className="bg-[#0D162B] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-[#FF5B26]/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Part Image */}
                <div className="relative aspect-4/3 bg-slate-800 overflow-hidden cursor-pointer" onClick={() => setActivePartForModal(part)}>
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {part.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#FF5B26] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      {part.badge}
                    </span>
                  )}
                  {part.originalPrice && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      Save ${(part.originalPrice - part.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Condition */}
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-[#FF5B26] font-bold">{part.category}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{part.partNumber}</span>
                    </div>

                    {/* Part Title */}
                    <h3
                      onClick={() => setActivePartForModal(part)}
                      className="font-bold text-sm text-white hover:text-[#FF5B26] transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
                    >
                      {part.name}
                    </h3>

                    {/* Vehicle Compatibility tag */}
                    <div className="bg-white/5 rounded-lg px-2.5 py-1.5 border border-white/5 mb-3">
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{part.compatibleModels}</span>
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xl font-extrabold text-white">
                          ${part.price.toLocaleString()}
                        </span>
                        {part.originalPrice && (
                          <span className="text-xs text-slate-400 line-through ml-1.5">
                            ${part.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        {part.condition.includes('OEM') ? 'OEM Genuine' : 'Certified'}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${part.seller.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>Inquire</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setActivePartForModal(part)}
                        className="bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-xl font-bold text-xs transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seller Banner: Sell Your Parts on CarKino */}
        <div className="mt-14 bg-gradient-to-r from-[#141F38] to-[#0D162B] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#FF5B26]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="bg-[#FF5B26]/20 text-[#FF5B26] text-xs font-bold px-3 py-1 rounded-full border border-[#FF5B26]/20 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Sellers &amp; Garages Wanted
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Sell Your Auto Parts to 50,000+ Car Owners
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Turn excess inventory into cash. List brake kits, headlights, turbos, engines, wheels, and aftermarket performance parts on CarKino with zero listing fees.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              href="/parts"
              className="w-full sm:w-auto bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-center shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-105"
            >
              Browse All Parts
            </Link>
          </div>
        </div>
      </div>

      {/* Part Detail Inspection Modal */}
      <PartDetailModal
        part={activePartForModal}
        onClose={() => setActivePartForModal(null)}
      />
    </section>
  );
}
