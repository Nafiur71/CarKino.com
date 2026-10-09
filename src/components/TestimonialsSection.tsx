'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/data/mockData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
              Real Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1 max-w-xl">
              Thousands of happy drivers. Here&apos;s what they have to say about their experience with CarKino.com.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#FF5B26] hover:border-[#FF5B26] flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-white hover:bg-[#FF5B26] hover:border-[#FF5B26] flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item: Testimonial, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                idx === currentIndex ? 'border-[#FF5B26] ring-1 ring-[#FF5B26]' : 'border-slate-100'
              }`}
            >
              <div>
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#FF5B26]/30 mb-3" />

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  {item.review}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF5B26] text-[#FF5B26]" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {item.countryCode} {item.country} &bull; <span className="text-[#FF5B26]">{item.carBought}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
