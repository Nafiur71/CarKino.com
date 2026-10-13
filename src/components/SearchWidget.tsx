'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Car as CarIcon, DollarSign, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface SearchWidgetProps {
  onSearch?: (filters: { make: string; model: string; price: string; location: string }) => void;
  onValuationStart?: (val: string) => void;
}

export default function SearchWidget({ onSearch, onValuationStart }: SearchWidgetProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [sellModelInput, setSellModelInput] = useState('');

  const makesList = ['All Makes', 'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Honda', 'Porsche', 'Range Rover', 'Ford', 'Lexus'];
  
  const getModelsForMake = (selectedMake: string) => {
    switch (selectedMake) {
      case 'BMW':
        return ['All Models', '5 Series', 'M4 Competition', '3 Series', 'X5', 'M8 Gran Coupe'];
      case 'Mercedes-Benz':
        return ['All Models', 'GLE 350', 'C-Class', 'E-Class', 'G-Wagon AMG', 'S-Class'];
      case 'Porsche':
        return ['All Models', '911 Carrera', 'Cayenne', 'Macan GTS', 'Taycan', 'Panamera'];
      case 'Toyota':
        return ['All Models', 'Premio', 'Allion', 'Corolla Axio', 'Noah', 'Harrier', 'Land Cruiser', 'Camry', 'RAV4'];
      case 'Range Rover':
        return ['All Models', 'Evoque', 'Sport', 'Velar', 'Vogue'];
      default:
        return ['All Models', 'Sedan Models', 'SUV Models', 'Sports Cars', 'Electric Vehicles'];
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ make, model, price, location });
    }
    // Smooth scroll down to featured cars section
    const el = document.getElementById('featured-cars');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onValuationStart) {
      onValuationStart(sellModelInput || 'Toyota Camry');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 sm:-mt-20 relative z-30 px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 sm:p-4">
        {/* Segmented Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 pb-3 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`flex items-center gap-2 font-bold text-sm sm:text-base py-2 px-5 rounded-full transition-all ${
              activeTab === 'buy'
                ? 'bg-[#FF5B26] text-white shadow-md shadow-[#FF5B26]/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CarIcon className="w-4 h-4" />
            Buy a Car
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sell')}
            className={`flex items-center gap-2 font-bold text-sm sm:text-base py-2 px-5 rounded-full transition-all ${
              activeTab === 'sell'
                ? 'bg-[#FF5B26] text-white shadow-md shadow-[#FF5B26]/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Sell Your Car
          </button>
        </div>

        {/* Tab 1: Buy a Car Filters */}
        {activeTab === 'buy' ? (
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-1">
            {/* Make */}
            <div className="flex flex-col border border-slate-200/90 rounded-2xl px-3.5 py-2.5 bg-slate-50/60 hover:bg-white hover:border-[#FF5B26]/60 transition-colors">
              <label className="text-[11px] font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
                <CarIcon className="w-3.5 h-3.5 text-[#FF5B26]" />
                Make
              </label>
              <div className="relative mt-0.5">
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel('');
                  }}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="">Any Make</option>
                  {makesList.map((m) => (
                    <option key={m} value={m === 'All Makes' ? '' : m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Model */}
            <div className="flex flex-col border border-slate-200/90 rounded-2xl px-3.5 py-2.5 bg-slate-50/60 hover:bg-white hover:border-[#FF5B26]/60 transition-colors">
              <label className="text-[11px] font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5B26]" />
                Model
              </label>
              <div className="relative mt-0.5">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="">Any Model</option>
                  {getModelsForMake(make).map((mod) => (
                    <option key={mod} value={mod === 'All Models' ? '' : mod}>
                      {mod}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Price Range */}
            <div className="flex flex-col border border-slate-200/90 rounded-2xl px-3.5 py-2.5 bg-slate-50/60 hover:bg-white hover:border-[#FF5B26]/60 transition-colors">
              <label className="text-[11px] font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#FF5B26]" />
                Price Range
              </label>
              <div className="relative mt-0.5">
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="">Any Price</option>
                  <option value="under-30k">Under $30,000</option>
                  <option value="30k-60k">$30,000 - $60,000</option>
                  <option value="60k-100k">$60,000 - $100,000</option>
                  <option value="over-100k">$100,000+</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col border border-slate-200/90 rounded-2xl px-3.5 py-2.5 bg-slate-50/60 hover:bg-white hover:border-[#FF5B26]/60 transition-colors">
              <label className="text-[11px] font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5B26]" />
                Location
              </label>
              <div className="relative mt-0.5">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none appearance-none pr-6 cursor-pointer"
                >
                  <option value="">Any Location</option>
                  <option value="Dhaka">Dhaka, Bangladesh</option>
                  <option value="Gulshan">Dhaka - Gulshan</option>
                  <option value="Uttara">Dhaka - Uttara</option>
                  <option value="Chittagong">Chittagong, Bangladesh</option>
                  <option value="Dubai, UAE">Dubai, UAE</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="London, UK">London, UK</option>
                  <option value="Munich, Germany">Munich, Germany</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] bg-[#FF5B26] hover:bg-[#E84E1A] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </form>
        ) : (
          /* Tab 2: Sell Your Car Quick Valuation Form */
          <form onSubmit={handleSellSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1">
            <div className="sm:col-span-2 flex flex-col border border-slate-200/90 rounded-2xl px-4 py-2.5 bg-slate-50/60 hover:bg-white hover:border-[#FF5B26]/60 transition-colors">
              <label className="text-[11px] font-bold text-slate-600 tracking-wide uppercase flex items-center gap-1.5">
                <CarIcon className="w-3.5 h-3.5 text-[#FF5B26]" />
                Enter Your Car Make, Model & Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2022 Mercedes GLE 350 or Registration #"
                value={sellModelInput}
                onChange={(e) => setSellModelInput(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400 mt-1"
              />
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] bg-[#FF5B26] hover:bg-[#E84E1A] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Instant Valuation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
