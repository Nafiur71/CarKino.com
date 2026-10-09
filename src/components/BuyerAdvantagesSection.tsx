'use client';

import React from 'react';
import { Layers, ShieldCheck, Wallet, Headphones } from 'lucide-react';

export default function BuyerAdvantagesSection() {
  const advantages = [
    {
      icon: Layers,
      title: 'Wide Selection',
      desc: 'Thousands of cars, all in one place.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Sellers',
      desc: 'Buy with confidence.',
    },
    {
      icon: Wallet,
      title: 'Easy Financing',
      desc: 'Flexible plans for every budget.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      desc: "We're with you, every step.",
    },
  ];

  return (
    <section className="py-24 bg-[#090E1A] text-white relative overflow-hidden">
      {/* Background Ambience & Car Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-right lg:bg-center opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090E1A] via-[#090E1A]/90 to-[#090E1A]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & 4 Advantage Cards */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Our Advantages
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Why Car Buyers <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FF5B26]">
                  Choose CarKino.com
                </span>
              </h2>
            </div>

            {/* 2x2 Grid of dark luxury cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {advantages.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-[#0F172A]/90 border border-white/10 hover:border-[#FF5B26]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-md group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF5B26]/10 text-[#FF5B26] group-hover:bg-[#FF5B26] group-hover:text-white flex items-center justify-center transition-colors mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-[#FF5B26] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Car Headlights & Glow Feature */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                  alt="Sports car front"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090E1A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-center">
                  <span className="text-xs text-[#FF5B26] font-bold uppercase tracking-wider">Top Tier Guarantee</span>
                  <p className="text-xs text-slate-300 mt-0.5">Strict quality and verified authenticity checks</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
