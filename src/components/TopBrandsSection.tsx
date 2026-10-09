'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X, Sparkles, ExternalLink, Check } from 'lucide-react';
import { TOP_BRANDS, ALL_BRANDS, Brand } from '@/data/mockData';
import BrandLogo from './BrandLogo';

interface TopBrandsSectionProps {
  selectedBrand?: string;
  onSelectBrand?: (brandName: string) => void;
}

// Groupings for modal filter
const BRAND_CATEGORIES: Record<string, string[]> = {
  German: ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen'],
  Japanese: ['Toyota', 'Honda', 'Lexus', 'Nissan', 'Mazda'],
  American: ['Ford', 'Tesla', 'Chevrolet', 'Jeep'],
  Luxury: ['Porsche', 'Ferrari', 'Lamborghini', 'Mercedes-Benz', 'BMW', 'Lexus', 'Land Rover'],
};

export default function TopBrandsSection({ selectedBrand, onSelectBrand }: TopBrandsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState<'All' | 'German' | 'Japanese' | 'American' | 'Luxury'>('All');
  const [showAllInPage, setShowAllInPage] = useState(false);

  const filteredModalBrands = useMemo(() => {
    return ALL_BRANDS.filter((brand) => {
      // Search matching
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        brand.slug.toLowerCase().includes(searchQuery.toLowerCase().trim());

      if (!matchesSearch) return false;

      // Tab filter
      if (activeFilterTab === 'All') return true;
      const allowedNames = BRAND_CATEGORIES[activeFilterTab] || [];
      return allowedNames.some((n) => n.toLowerCase() === brand.name.toLowerCase());
    });
  }, [searchQuery, activeFilterTab]);

  const displayedBrands = showAllInPage ? ALL_BRANDS : TOP_BRANDS;

  const handleBrandSelect = (brandName: string) => {
    const isAlreadySelected = selectedBrand?.toLowerCase() === brandName.toLowerCase();
    onSelectBrand?.(isAlreadySelected ? '' : brandName);
    
    // Smooth scroll to the filtered inventory section
    const target = document.getElementById('featured-cars');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5B26] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Brands</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Top Car Brands
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1">
              Choose from the world&apos;s most trusted and loved automotive brands.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* In-page toggle */}
            <button
              onClick={() => setShowAllInPage(!showAllInPage)}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:border-[#FF5B26] hover:text-[#FF5B26] transition-colors"
            >
              {showAllInPage ? 'Show Top 8 Only' : `Show All ${ALL_BRANDS.length} Brands`}
            </button>

            {/* View All Brands Modal Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5B26] hover:text-[#E84E1A] transition-colors group px-3 py-1.5 rounded-full bg-[#FF5B26]/10 hover:bg-[#FF5B26]/15"
            >
              <span>View All Brands ({ALL_BRANDS.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {displayedBrands.map((brand: Brand) => {
            const isSelected = selectedBrand?.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={brand.name}
                type="button"
                onClick={() => handleBrandSelect(brand.name)}
                className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 group cursor-pointer relative ${
                  isSelected
                    ? 'border-[#FF5B26] bg-[#FF5B26]/5 shadow-md scale-105 ring-2 ring-[#FF5B26]/20'
                    : 'border-slate-200/80 bg-white hover:border-[#FF5B26]/50 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Active check pill */}
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#FF5B26] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}

                {/* High-Contrast Brand Logo Container */}
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center p-2.5 mb-3 group-hover:scale-110 group-hover:border-[#FF5B26]/40 group-hover:shadow-md transition-all">
                  <BrandLogo name={brand.name} className="w-11 h-11 object-contain" />
                </div>

                <span className="font-bold text-sm text-slate-900 group-hover:text-[#FF5B26] transition-colors text-center">
                  {brand.name}
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {brand.modelsCount}+ cars
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Brand Quick Reset Pill */}
        {selectedBrand && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-xs text-slate-500">
              Filtered by brand: <strong className="text-slate-800">{selectedBrand}</strong>
            </span>
            <button
              onClick={() => onSelectBrand?.('')}
              className="text-xs text-[#FF5B26] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Clear Filter</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ALL BRANDS DIRECTORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full text-slate-900 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5B26] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>World-Class Automakers</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  All Car Brands Directory
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Explore verified inventory by manufacturer or click to filter instant deals.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Origin Tabs */}
            <div className="py-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by brand name (e.g. BMW, Tesla, Toyota, Porsche)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5B26] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {(['All', 'German', 'Japanese', 'American', 'Luxury'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
                      activeFilterTab === tab
                        ? 'bg-[#FF5B26] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Grid (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 py-2">
              {filteredModalBrands.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm font-bold text-slate-700">No brands found matching &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilterTab('All');
                    }}
                    className="text-xs text-[#FF5B26] font-semibold hover:underline mt-2 inline-block"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredModalBrands.map((brand) => {
                    const isSelected = selectedBrand?.toLowerCase() === brand.name.toLowerCase();
                    return (
                      <div
                        key={brand.name}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col items-center justify-between group ${
                          isSelected
                            ? 'border-[#FF5B26] bg-[#FF5B26]/5 ring-2 ring-[#FF5B26]/20'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {/* Brand Logo & Name */}
                        <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform">
                          <BrandLogo name={brand.name} className="w-9 h-9 object-contain" />
                        </div>

                        <span className="font-bold text-sm text-slate-900 group-hover:text-[#FF5B26] transition-colors text-center">
                          {brand.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {brand.modelsCount}+ models
                        </span>

                        {/* Action Buttons */}
                        <div className="w-full mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              handleBrandSelect(brand.name);
                              setIsModalOpen(false);
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold text-center transition-colors ${
                              isSelected
                                ? 'bg-[#FF5B26] text-white'
                                : 'bg-slate-100 hover:bg-[#FF5B26] hover:text-white text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Filter Home'}
                          </button>

                          <Link
                            href={`/cars?make=${encodeURIComponent(brand.name)}`}
                            onClick={() => setIsModalOpen(false)}
                            title="Browse in full catalog"
                            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Showing {filteredModalBrands.length} of {ALL_BRANDS.length} total brands
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectBrand?.('');
                    setIsModalOpen(false);
                  }}
                  className="font-semibold text-slate-600 hover:text-slate-900"
                >
                  Clear Selection
                </button>
                <Link
                  href="/cars"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-4 py-2 rounded-full font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Explore All in Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
