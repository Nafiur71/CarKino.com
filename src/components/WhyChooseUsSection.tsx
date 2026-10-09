'use client';

import React from 'react';
import { ShieldCheck, Tag, Lock, Headset } from 'lucide-react';

export default function WhyChooseUsSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Verified Vehicles',
      desc: '100% Checked',
    },
    {
      icon: Tag,
      title: 'Best Prices',
      desc: 'Competitive Rates',
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      desc: 'Safe & Trusted',
    },
    {
      icon: Headset,
      title: 'Dedicated Support',
      desc: "We're Here 24/7",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic road journey"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Floating Pill on image */}
              <div className="absolute top-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/40 inline-flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF5B26] animate-ping" />
                  <span className="text-slate-900 font-bold text-sm">
                    Your Next Ride Is Just a Click Away
                  </span>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#FF5B26] font-bold">Guaranteed Confidence</span>
                <p className="text-lg font-bold text-white mt-1">Every car thoroughly inspected</p>
              </div>
            </div>
          </div>

          {/* Right Content & 2x2 Feature Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Why Choose CarKino
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                More Than Just a Car — <br />
                <span className="text-[#FF5B26]">It&apos;s Your Next Chapter</span>
              </h2>
              <p className="text-slate-600 text-base mt-4 leading-relaxed">
                At CarKino.com, we make car buying simple, safe, and stress-free. From trusted sellers to verified vehicles, we&apos;re here to help you find the perfect ride — whether it&apos;s for today or tomorrow.
              </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF5B26]/30 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF5B26]/10 text-[#FF5B26] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
