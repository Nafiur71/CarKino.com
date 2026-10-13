'use client';

import React, { useState } from 'react';
import {
  X,
  Heart,
  Phone,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Flag,
  Calendar,
  Gauge,
  Fuel,
  MapPin,
} from 'lucide-react';
import { Car } from '@/data/mockData';
import { useCars } from '@/context/CarContext';
import EmiCalculatorModal from './EmiCalculatorModal';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function CarDetailModal({
  car,
  onClose,
  isFavorite,
  onToggleFavorite,
}: CarDetailModalProps) {
  const [reported, setReported] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showEmi, setShowEmi] = useState(false);

  const { incrementInquiries } = useCars();

  if (!car) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello! I saw your listing for the ${car.year} ${car.make} ${car.model} ($${car.price.toLocaleString()}) on CarKino.com. Is it still available?`
  );

  const handleContactAction = () => {
    incrementInquiries(car.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-3xl w-full text-white overflow-hidden shadow-2xl my-8 relative">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B26]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
              Verified Listing Details
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
            {car.featured && (
              <div className="absolute top-3 left-3 bg-[#FF5B26] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Featured Vehicle
              </div>
            )}
            <button
              onClick={() => onToggleFavorite(car.id)}
              aria-label="Toggle favorite"
              className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                isFavorite
                  ? 'bg-[#FF5B26] text-white'
                  : 'bg-black/50 text-white hover:bg-black/80'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {car.make} {car.model}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF5B26]" />
                <span>{car.location}</span>
                <span>&bull;</span>
                <span>ID: #{car.id.toUpperCase()}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block font-semibold uppercase">Listing Price</span>
              <span className="text-3xl font-black text-[#FF5B26]">
                ${car.price.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={() => setShowEmi(true)}
                className="block sm:ml-auto text-xs text-emerald-400 hover:text-emerald-300 mt-1 font-semibold underline"
              >
                Est. ${Math.round((car.price * 0.8) / 48)}/mo &bull; Calculate Loan
              </button>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <Calendar className="w-4 h-4 text-[#FF5B26] mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Year</p>
              <p className="font-bold text-sm text-white">{car.year}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <Gauge className="w-4 h-4 text-[#FF5B26] mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Mileage</p>
              <p className="font-bold text-sm text-white">{car.mileage.toLocaleString()} km</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <Fuel className="w-4 h-4 text-[#FF5B26] mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Fuel Type</p>
              <p className="font-bold text-sm text-white">{car.fuelType}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <ShieldCheck className="w-4 h-4 text-[#FF5B26] mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Transmission</p>
              <p className="font-bold text-sm text-white">{car.transmission}</p>
            </div>
          </div>

          {/* Seller Card (PRD DET-3 & DET-4) */}
          <div className="bg-[#141F38] border border-white/10 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5B26] to-[#FFA07A] flex items-center justify-center font-bold text-lg text-white">
                  {car.seller.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-white">{car.seller.name}</h4>
                    {car.seller.verified && (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Verified Dealer
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rating: {car.seller.rating} ★ &bull; Phone Verified &bull; Active on CarKino
                  </p>
                </div>
              </div>

              {/* Direct Contact Buttons (Call & WhatsApp - PRD US-3) */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${car.seller.phone}`}
                  onClick={handleContactAction}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-white/15 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FF5B26]" />
                  <span>Call Seller</span>
                </a>

                <a
                  href={`https://wa.me/?text=${whatsappMessage}`}
                  onClick={handleContactAction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Safety Tips Banner (PRD DET-8) */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-300">Safety Tip for Buyers:</p>
              <p className="text-amber-200/90 leading-relaxed">
                Always inspect the car thoroughly in a public place before making any commitment. Never send advance deposits or wire transfers before inspecting vehicle paperwork.
              </p>
            </div>
          </div>

          {/* Action Footer: Report & Share */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {copiedLink ? '✓ Link Copied!' : 'Share Listing Link'}
            </button>

            <button
              onClick={() => setReported(true)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{reported ? 'Listing Reported' : 'Report this ad'}</span>
            </button>
          </div>

        </div>

        {/* Nested EMI Calculator Modal */}
        <EmiCalculatorModal
          isOpen={showEmi}
          onClose={() => setShowEmi(false)}
          initialPrice={car.price}
          carTitle={`${car.year} ${car.make} ${car.model}`}
        />
      </div>
    </div>
  );
}
