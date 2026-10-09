'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="relative py-24 bg-[#090E1A] overflow-hidden text-white border-t border-white/10">
      {/* Background Winding Scenic Highway Photo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090E1A] via-[#090E1A]/85 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B26] to-[#FFA07A]">
                Perfect Car?
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal">
              Join thousands of happy drivers and drive your dream today. Instant search, verified history, zero hassle.
            </p>
            <div className="pt-3">
              <a
                href="#featured-cars"
                className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-8 py-4 rounded-full font-bold text-base shadow-xl shadow-[#FF5B26]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Browse Cars</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Floating Branding Emblem */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5B26] to-[#FF8A65] flex items-center justify-center shadow-lg shadow-[#FF5B26]/40">
                <span className="text-white font-black text-2xl">C</span>
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight block">
                  Car<span className="text-[#FF5B26]">Kino</span>.com
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                  Drive Your Dreams
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
