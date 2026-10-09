'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarDetailModal from '@/components/CarDetailModal';
import PostAdModal from '@/components/PostAdModal';
import EmiCalculatorModal from '@/components/EmiCalculatorModal';
import { useCars } from '@/context/CarContext';
import { Car } from '@/data/mockData';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Heart,
  Gauge,
  Fuel,
  ShieldCheck,
  Scale,
  ArrowRight,
} from 'lucide-react';

export default function CarsCatalogPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold">Loading CarKino Inventory...</div>}>
      <CarsCatalogContent />
    </React.Suspense>
  );
}

function CarsCatalogContent() {
  const searchParams = useSearchParams();
  const initialMakeParam = searchParams.get('make');
  const { cars, favorites, toggleFavorite, incrementViews, compareList, addToCompare } = useCars();

  // Filter States
  const [keyword, setKeyword] = useState('');
  const [selectedMake, setSelectedMake] = useState(initialMakeParam || 'All');
  const [selectedBodyType, setSelectedBodyType] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc, mileage, year
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);

  const handleCarClick = (car: Car) => {
    incrementViews(car.id);
    setSelectedCar(car);
  };

  // Makes and options
  const makes = [
    'All',
    'Toyota',
    'BMW',
    'Mercedes-Benz',
    'Porsche',
    'Audi',
    'Honda',
    'Ford',
    'Lexus',
    'Tesla',
    'Hyundai',
    'Nissan',
    'Volkswagen',
    'Land Rover',
    'Chevrolet',
    'Kia',
    'Jeep',
    'Ferrari',
    'Lamborghini',
    'Mazda',
  ];
  const bodyTypes = ['All', 'Sedan', 'SUV', 'Sports Car', 'Truck', 'Electric', 'Coupe'];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['All', 'Automatic', 'Manual'];
  const cities = ['All', 'Dubai, UAE', 'New York, USA', 'London, UK', 'Munich, Germany', 'Lahore, PK'];

  // Filtered & Sorted cars from shared real-time store
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Must be active on marketplace
      if (car.status !== 'active') return false;

      // Keyword match
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const title = `${car.make} ${car.model} ${car.year} ${car.location}`.toLowerCase();
        if (!title.includes(query)) return false;
      }

      // Make
      if (selectedMake !== 'All' && car.make.toLowerCase() !== selectedMake.toLowerCase()) {
        return false;
      }

      // Body Type
      if (selectedBodyType !== 'All' && car.bodyType.toLowerCase() !== selectedBodyType.toLowerCase()) {
        return false;
      }

      // Fuel
      if (selectedFuel !== 'All' && car.fuelType.toLowerCase() !== selectedFuel.toLowerCase()) {
        return false;
      }

      // Transmission
      if (selectedTransmission !== 'All' && car.transmission.toLowerCase() !== selectedTransmission.toLowerCase()) {
        return false;
      }

      // City
      if (selectedCity !== 'All' && !car.location.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Max price
      if (car.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      if (sortBy === 'year') return b.year - a.year;
      // Default: newest
      return b.year - a.year;
    });
  }, [cars, keyword, selectedMake, selectedBodyType, selectedFuel, selectedTransmission, selectedCity, maxPrice, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedMake('All');
    setSelectedBodyType('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedCity('All');
    setMaxPrice(150000);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onPostAdClick={() => setIsPostAdOpen(true)}
        onFinancingClick={() => setIsEmiOpen(true)}
      />

      {/* Hero Banner for Catalog */}
      <div className="pt-24 pb-8 bg-[#090E1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Verified Marketplace Catalog
              </span>
              <h1 className="text-3xl font-black text-white mt-1">
                Explore All Used Cars
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Direct contact with sellers, verified phone badges, and fraud-free transactions on CarKino.
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search make, model, city..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-white/10 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5B26]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar: Filters */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF5B26]" />
                  <h3 className="font-bold text-base text-slate-900">Filters</h3>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#FF5B26] hover:underline font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Make Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Body Type Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Body Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {bodyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedBodyType(type)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${
                        selectedBodyType === type
                          ? 'bg-[#FF5B26] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Max Price
                  </label>
                  <span className="text-sm font-bold text-[#FF5B26]">
                    ${maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={150000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#FF5B26] cursor-pointer"
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Fuel Type
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Transmission
                </label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {transmissions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* City / Location */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#FF5B26]"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Right Main Content: Listings */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Result Count, Sort, Grid/List Toggles */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">
                  Showing <span className="text-[#FF5B26]">{filteredCars.length}</span> verified cars
                </span>
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1"
                >
                  <Filter className="w-3.5 h-3.5 text-[#FF5B26]" />
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#FF5B26]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="mileage">Lowest Mileage</option>
                    <option value="year">Newest Model Year</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-[#FF5B26] shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white text-[#FF5B26] shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Grid or List */}
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-slate-800">No matching cars found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your filters or price range to discover more verified used cars on CarKino.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-[#FF5B26] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => {
                  const isFav = favorites.includes(car.id);
                  return (
                    <div
                      key={car.id}
                      onClick={() => handleCarClick(car)}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#FF5B26]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {car.featured && (
                          <div className="absolute top-3 left-3 bg-[#FF5B26] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                            Featured
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCompare(car.id);
                            }}
                            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                              compareList.includes(car.id)
                                ? 'bg-[#FF5B26] text-white shadow-md'
                                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                            }`}
                            title="Compare vehicle"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(car.id);
                            }}
                            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                              isFav
                                ? 'bg-[#FF5B26] text-white'
                                : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-3 text-[11px] text-white/90 font-medium">
                          {car.location}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-[#FF5B26] transition-colors truncate">
                            {car.make} {car.model}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {car.bodyType} &bull; {car.year} &bull; {car.mileage.toLocaleString()} km
                          </p>
                          <div className="mt-3">
                            <span className="text-lg font-black text-[#FF5B26]">
                              ${car.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5" />
                            {car.transmission}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Fuel className="w-3.5 h-3.5" />
                            {car.fuelType}
                          </span>
                          <span className="text-[#FF5B26] font-bold">
                            View →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredCars.map((car) => {
                  return (
                    <div
                      key={car.id}
                      onClick={() => handleCarClick(car)}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#FF5B26]/50 transition-all p-4 flex flex-col sm:flex-row gap-5 group cursor-pointer"
                    >
                      <div className="relative sm:w-60 aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                        <img
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {car.featured && (
                          <div className="absolute top-2 left-2 bg-[#FF5B26] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#FF5B26] transition-colors">
                                {car.make} {car.model}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {car.bodyType} &bull; {car.year} &bull; {car.mileage.toLocaleString()} km &bull; {car.location}
                              </p>
                            </div>
                            <span className="text-2xl font-black text-[#FF5B26]">
                              ${car.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Gauge className="w-3.5 h-3.5 text-slate-400" />
                              {car.transmission}
                            </span>
                            <span className="flex items-center gap-1">
                              <Fuel className="w-3.5 h-3.5 text-slate-400" />
                              {car.fuelType}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {car.seller.name}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            ID: #{car.id.toUpperCase()}
                          </span>
                          <button className="text-xs font-bold text-[#FF5B26] hover:underline">
                            View Full Details &amp; Contact →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-base text-slate-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div>
              <label className="text-xs font-bold uppercase block mb-1">Make</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full border rounded-xl p-2 text-sm"
              >
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#FF5B26] text-white py-3 rounded-xl font-bold text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Comparison Pill */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0D162B] border border-white/20 shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 text-white backdrop-blur-md animate-fade-in">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#FF5B26]" />
            <span className="text-xs sm:text-sm font-bold">
              Comparing {compareList.length} of 3 Vehicles
            </span>
          </div>
          <Link
            href="/compare"
            className="bg-[#FF5B26] hover:bg-[#E84E1A] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1 transition-transform hover:scale-105"
          >
            <span>View Compare Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        isFavorite={selectedCar ? favorites.includes(selectedCar.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
      />

      <EmiCalculatorModal
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
        initialPrice={48000}
      />
    </div>
  );
}
