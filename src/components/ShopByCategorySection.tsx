'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, Category } from '@/data/mockData';

interface ShopByCategorySectionProps {
  selectedCategory?: string;
  onSelectCategory?: (categorySlug: string) => void;
}

export default function ShopByCategorySection({
  selectedCategory,
  onSelectCategory,
}: ShopByCategorySectionProps) {
  return (
    <section id="categories" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
              Browse by Type
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1">
              Find the perfect car that fits your lifestyle and budget.
            </p>
          </div>
          <button
            onClick={() => onSelectCategory?.('')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5B26] hover:text-[#E84E1A] mt-4 sm:mt-0 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat: Category) => {
            const isSelected = selectedCategory?.toLowerCase() === cat.slug.toLowerCase();
            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory?.(isSelected ? '' : cat.slug)}
                className={`relative rounded-3xl overflow-hidden shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border ${
                  isSelected ? 'border-[#FF5B26] ring-2 ring-[#FF5B26]' : 'border-slate-200'
                }`}
              >
                {/* Background Image Container */}
                <div className="h-64 overflow-hidden bg-slate-900 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle Dark Vignette & Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-xl group-hover:text-[#FF5B26] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-white/70 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                      {cat.count}+
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
