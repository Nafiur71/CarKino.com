'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartDetailModal from '@/components/PartDetailModal';
import PostAdModal from '@/components/PostAdModal';
import {
  Wrench,
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  PlusCircle,
  X,
} from 'lucide-react';
import { MOCK_PARTS, AutoPart } from '@/data/mockData';

export default function PartsCatalogPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold">Loading CarKino Parts Store...</div>}>
      <PartsCatalogContent />
    </React.Suspense>
  );
}

function PartsCatalogContent() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<AutoPart | null>(null);
  const [isPostPartOpen, setIsPostPartOpen] = useState(false);

  const categories = [
    'All',
    'Brakes & Suspension',
    'Wheels & Tires',
    'Performance & Exhaust',
    'Lighting & Electrical',
    'Engine & Transmission',
    'Body & Mirrors',
  ];

  const makes = ['All', 'Porsche', 'BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Volkswagen', 'Subaru'];
  const conditions = ['All', 'Brand New (OEM)', 'Certified Refurbished', 'Genuine Used', 'Aftermarket High Performance'];

  const filteredParts = useMemo(() => {
    const list = MOCK_PARTS.filter((part) => {
      // Keyword
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matches =
          part.name.toLowerCase().includes(q) ||
          part.partNumber.toLowerCase().includes(q) ||
          part.compatibleModels.toLowerCase().includes(q) ||
          part.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'All' && part.category !== selectedCategory) {
        return false;
      }

      // Make
      if (selectedMake !== 'All' && !part.compatibleMakes.some((m) => m.toLowerCase() === selectedMake.toLowerCase())) {
        return false;
      }

      // Condition
      if (selectedCondition !== 'All' && part.condition !== selectedCondition) {
        return false;
      }

      // Price
      if (part.price > maxPrice) {
        return false;
      }

      return true;
    });

    // Sort
    return list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [keyword, selectedCategory, selectedMake, selectedCondition, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setKeyword('');
    setSelectedCategory('All');
    setSelectedMake('All');
    setSelectedCondition('All');
    setMaxPrice(5000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar onPostAdClick={() => setIsPostPartOpen(true)} />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Hero Header */}
        <div className="bg-[#0D162B] text-white py-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5B26] mb-2 bg-[#FF5B26]/10 px-3 py-1 rounded-full border border-[#FF5B26]/20">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>CarKino Parts Store</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Genuine Auto Parts &amp; Accessories
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
                  Explore certified OEM replacements, performance turbos, high-grade brake kits, and styling upgrades with 100% vehicle compatibility guarantee.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPostPartOpen(true)}
                  className="bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-105"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Spare Parts</span>
                </button>
              </div>
            </div>

            {/* Live Search Bar */}
            <div className="mt-8 bg-white/5 border border-white/15 rounded-2xl p-2 sm:p-3 flex items-center gap-3 backdrop-blur-md">
              <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by part name, OEM number (e.g. BRM-GT-6P-992), or vehicle model..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF5B26]" />
                  <h3 className="font-extrabold text-sm text-slate-900">Filter Parts</h3>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#FF5B26] hover:underline font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Part Category
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-[#FF5B26] text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Compatible Vehicle Make */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Compatible Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>{m === 'All' ? 'All Vehicle Makes' : `Fits ${m}`}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Part Condition
                </label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Max Price
                  </label>
                  <span className="text-xs font-bold text-[#FF5B26]">
                    ${maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#FF5B26] cursor-pointer"
                />
              </div>

              {/* Security Guarantee Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#FF5B26]" />
                  <span>CarKino Fitment Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Every part is verified by certified mechanics. 100% money-back guarantee if it doesn&apos;t fit your vehicle.
                </p>
              </div>
            </aside>

            {/* Main Product Catalog Section */}
            <div className="flex-1 w-full">
              {/* Top Controls Bar */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Filter className="w-4 h-4 text-[#FF5B26]" />
                    <span>Filter</span>
                  </button>
                  <span className="text-xs font-bold text-slate-700">
                    Showing <span className="text-[#FF5B26]">{filteredParts.length}</span> verified parts
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#FF5B26]"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Customer Rated</option>
                  </select>

                  {/* Grid / List View Toggle */}
                  <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid View"
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-label="List View"
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty state */}
              {filteredParts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
                  <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900">No auto parts match your filters</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your search query, increasing your price range, or selecting &ldquo;All Makes&rdquo;.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 bg-[#FF5B26] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#E84E1A] transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredParts.map((part) => {
                    const whatsappMsg = encodeURIComponent(
                      `Hello ${part.seller.name}, I want to buy "${part.name}" (Part #: ${part.partNumber}) listed on CarKino Parts Store. Price: $${part.price.toLocaleString()}. Is it in stock?`
                    );

                    return (
                      <div
                        key={part.id}
                        className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-[#FF5B26]/50 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Image */}
                          <div
                            className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer"
                            onClick={() => setSelectedPart(part)}
                          >
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
                            <span className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {part.category}
                            </span>
                          </div>

                          {/* Body */}
                          <div className="p-4">
                            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                              <span className="font-mono">{part.partNumber}</span>
                              <span className="text-amber-500 font-bold">★ {part.rating} ({part.reviewsCount})</span>
                            </div>

                            <h3
                              onClick={() => setSelectedPart(part)}
                              className="font-extrabold text-sm text-slate-900 group-hover:text-[#FF5B26] transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
                            >
                              {part.name}
                            </h3>

                            {/* Fitment info */}
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 mb-3">
                              <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{part.compatibleModels}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 pt-0">
                          <div className="flex items-baseline justify-between mb-3 border-t border-slate-100 pt-3">
                            <div>
                              <span className="text-xl font-black text-slate-900">
                                ${part.price.toLocaleString()}
                              </span>
                              {part.originalPrice && (
                                <span className="text-xs text-slate-400 line-through ml-1.5">
                                  ${part.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                              {part.condition.includes('OEM') ? 'OEM' : 'Certified'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${part.seller.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp</span>
                            </a>
                            <button
                              onClick={() => setSelectedPart(part)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-3 rounded-xl font-bold text-xs transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {filteredParts.map((part) => {
                    const whatsappMsg = encodeURIComponent(
                      `Hello ${part.seller.name}, I want to buy "${part.name}" (Part #: ${part.partNumber}) listed on CarKino Parts Store. Price: $${part.price.toLocaleString()}. Is it available?`
                    );

                    return (
                      <div
                        key={part.id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-[#FF5B26]/40 transition-all flex flex-col sm:flex-row items-center gap-5"
                      >
                        <div
                          className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer relative"
                          onClick={() => setSelectedPart(part)}
                        >
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-full object-cover"
                          />
                          {part.badge && (
                            <span className="absolute top-2 left-2 bg-[#FF5B26] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {part.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#FF5B26] font-bold">{part.category}</span>
                            <span className="text-slate-400 font-mono text-[10px]">&bull; {part.partNumber}</span>
                          </div>

                          <h3
                            onClick={() => setSelectedPart(part)}
                            className="font-extrabold text-base text-slate-900 hover:text-[#FF5B26] transition-colors cursor-pointer"
                          >
                            {part.name}
                          </h3>

                          <p className="text-xs text-slate-500 font-medium">
                            Fits: {part.compatibleModels}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                            <span>★ {part.rating} ({part.reviewsCount} reviews)</span>
                            <span>&bull;</span>
                            <span className="text-emerald-600 font-semibold">{part.condition}</span>
                            <span>&bull;</span>
                            <span>Seller: {part.seller.name}</span>
                          </div>
                        </div>

                        <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 flex flex-col items-start sm:items-end justify-center shrink-0">
                          <span className="text-2xl font-black text-slate-900">
                            ${part.price.toLocaleString()}
                          </span>
                          {part.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ${part.originalPrice.toLocaleString()}
                            </span>
                          )}

                          <div className="w-full mt-3 space-y-1.5">
                            <a
                              href={`https://wa.me/${part.seller.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-white" />
                              <span>WhatsApp</span>
                            </a>
                            <button
                              onClick={() => setSelectedPart(part)}
                              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 rounded-xl font-bold text-xs transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm lg:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Filter Auto Parts</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-2">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                        selectedCategory === c ? 'bg-[#FF5B26] text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-2">Compatible Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-600 block mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Max Price</span>
                  <span className="text-[#FF5B26]">${maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#FF5B26]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-600"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-xl bg-[#FF5B26] text-white text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Part Detail Inspection Modal */}
      <PartDetailModal
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
      />

      {/* Post Part Ad Modal */}
      <PostAdModal
        isOpen={isPostPartOpen}
        onClose={() => setIsPostPartOpen(false)}
      />
    </div>
  );
}
