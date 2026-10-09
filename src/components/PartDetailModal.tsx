'use client';

import React from 'react';
import { X, ShieldCheck, Phone, MessageSquare, CheckCircle2, Wrench, Truck, Award } from 'lucide-react';
import { AutoPart } from '@/data/mockData';

interface PartDetailModalProps {
  part: AutoPart | null;
  onClose: () => void;
}

export default function PartDetailModal({ part, onClose }: PartDetailModalProps) {
  if (!part) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello ${part.seller.name}, I am interested in purchasing "${part.name}" (Part #: ${part.partNumber}) listed on CarKino for $${part.price.toLocaleString()}. Is it currently available?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-2xl w-full text-white p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-[#FF5B26]/20 text-[#FF5B26] text-xs font-bold px-3 py-1 rounded-full">
            {part.category}
          </span>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {part.condition}
          </span>
          {part.inStock && (
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
              In Stock &amp; Ready to Ship
            </span>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Part Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 aspect-4/3">
            <img
              src={part.image}
              alt={part.name}
              className="w-full h-full object-cover"
            />
            {part.badge && (
              <span className="absolute top-3 left-3 bg-[#FF5B26] text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
                {part.badge}
              </span>
            )}
          </div>

          {/* Pricing & Key Specs */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {part.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Part No: <span className="text-white font-semibold">{part.partNumber}</span>
              </p>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#FF5B26]">
                ${part.price.toLocaleString()}
              </span>
              {part.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${part.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Warranty & Guarantee */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Warranty: <strong>{part.warranty}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Worldwide Express Delivery Available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#FF5B26] shrink-0" />
                <span>100% Genuine Fitment Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Compatibility Box */}
        <div className="mt-6 bg-[#141F38] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <Wrench className="w-4 h-4 text-[#FF5B26]" />
            <span>Guaranteed Vehicle Compatibility</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {part.compatibleModels}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {part.compatibleMakes.map((m) => (
              <span key={m} className="bg-white/10 text-slate-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Fits {m}
              </span>
            ))}
          </div>
        </div>

        {/* Seller Info & Contact Actions */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{part.seller.name}</span>
              {part.seller.verified && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Dealer
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{part.seller.location} &bull; ★ {part.seller.rating}</p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${part.seller.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquire</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${part.seller.phone}`}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Seller</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
