'use client';

import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { ARTICLES, Article } from '@/data/mockData';

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
              Blog &amp; News
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Latest Articles &amp; Insights
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1">
              Tips, guides and the latest updates from the world of cars.
            </p>
          </div>
          <a
            href="#articles"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5B26] hover:text-[#E84E1A] mt-4 sm:mt-0 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((art: Article) => (
            <article
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#FF5B26]/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col group cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#FF5B26] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {art.tag}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {art.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#FF5B26] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5B26] group-hover:gap-2 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
