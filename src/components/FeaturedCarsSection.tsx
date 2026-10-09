'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Fuel, Gauge, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { Car } from '@/data/mockData';
import { useCars } from '@/context/CarContext';

interface FeaturedCarsSectionProps {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (carId: string) => void;
  onCarClick: (car: Car) => void;
}

export default function FeaturedCarsSection({
  cars,
  favorites,
  onToggleFavorite,
  onCarClick,
}: FeaturedCarsSectionProps) {
  const { compareList, addToCompare } = useCars();

  return (
    <section id="featured-cars" className="py-20 bg-[#090E1A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5B26]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Featured Cars
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Handpicked Premium Cars
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Top quality. Verified. Ready for you.
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5B26] hover:text-[#FFA07A] mt-4 sm:mt-0 transition-colors"
          >
            <span>View All Cars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cars Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => {
            const isFav = favorites.includes(car.id);
            const isCompared = compareList.includes(car.id);

            return (
              <div
                key={car.id}
                className="bg-[#0F172A] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF5B26]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col group cursor-pointer"
                onClick={() => onCarClick(car)}
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Featured Badge */}
                  {car.featured && (
                    <div className="absolute top-3 left-3 bg-[#FF5B26] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      Featured
                    </div>
                  )}

                  {/* Top Right Buttons (Compare & Favorite) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCompare(car.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isCompared
                          ? 'bg-[#FF5B26] text-white shadow-md'
                          : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                      }`}
                      title={isCompared ? 'In Comparison' : 'Add to Compare'}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(car.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        isFav
                          ? 'bg-[#FF5B26] text-white'
                          : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                      }`}
                      aria-label="Add to favorites"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Location Chip */}
                  <div className="absolute bottom-2 left-3 text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5B26]" />
                    <span>{car.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-base text-white group-hover:text-[#FF5B26] transition-colors truncate">
                      {car.make} {car.model}
                    </h3>

                    {/* Subtitle / Specs Info */}
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {car.bodyType} &bull; {car.year} &bull; {car.mileage.toLocaleString()} km
                    </p>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-lg font-black text-[#FF5B26]">
                        ${car.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        ~${Math.round((car.price * 0.8) / 48)}/mo
                      </span>
                    </div>
                  </div>

                  {/* Bottom Chips: Transmission & Fuel */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-slate-500" />
                      {car.transmission}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-slate-500" />
                      {car.fuelType}
                    </span>
                    <span className="text-xs text-[#FF5B26] font-semibold group-hover:underline">
                      Details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Comparison Pill (When cars are added) */}
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
      </div>
    </section>
  );
}
