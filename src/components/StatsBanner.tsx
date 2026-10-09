'use client';

import React from 'react';
import { Users, CheckCircle, Store, Star } from 'lucide-react';
import { STATS } from '@/data/mockData';

export default function StatsBanner() {
  const statIcons = [Users, CheckCircle, Store, Star];

  return (
    <section className="py-20 relative bg-[#090E1A] overflow-hidden text-white">
      {/* Background Photography with Sunset Horizon */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090E1A] via-[#090E1A]/85 to-[#090E1A]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
            Our Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Numbers That Drive Us
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every listing verified, every transaction transparent, every customer satisfied.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div
                key={index}
                className="bg-[#0F172A]/80 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-md hover:border-[#FF5B26]/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FF5B26]/10 text-[#FF5B26] mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#FF5B26] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
