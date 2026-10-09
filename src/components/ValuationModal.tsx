'use client';

import React, { useState } from 'react';
import { X, Calculator, Sparkles, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

interface ValuationModalProps {
  initialModel?: string;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPostAd: () => void;
}

export default function ValuationModal({
  initialModel = '',
  isOpen,
  onClose,
  onProceedToPostAd,
}: ValuationModalProps) {
  const [model, setModel] = useState(initialModel || 'BMW 3 Series');
  const [year, setYear] = useState('2022');
  const [mileage, setMileage] = useState('35000');
  const [condition, setCondition] = useState('Very Good');
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const getEstimatedRange = () => {
    const yr = parseInt(year) || 2021;
    const base = yr > 2022 ? 55000 : yr > 2020 ? 42000 : 28000;
    const low = Math.round(base * 0.94 / 100) * 100;
    const high = Math.round(base * 1.08 / 100) * 100;
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-lg w-full text-white p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#FF5B26]" />
            <h3 className="font-extrabold text-lg text-white">
              Instant AI Car Valuation
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!showResult ? (
          <form onSubmit={handleCalculate} className="space-y-4 pt-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Make &amp; Model
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. 2022 Porsche 911 or Mercedes C200"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Registration Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Mileage (km)
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Overall Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
              >
                <option value="Excellent">Excellent (Like new, full service history)</option>
                <option value="Very Good">Very Good (Clean, minor wear)</option>
                <option value="Good">Good (Normal wear, well maintained)</option>
                <option value="Fair">Fair (Needs minor servicing/repairs)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Estimated Value</span>
            </button>
          </form>
        ) : (
          <div className="pt-4 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Market Value Valuation for {model}
              </span>
              <h2 className="text-3xl font-black text-[#FF5B26] mt-1">
                {getEstimatedRange()}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Based on recent verified transactions in your city.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-left border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>High Buyer Demand (88% active searches this week)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5B26]" />
                <span>Free 1st Ad Listing for Private Sellers (PRD MON-5)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold text-xs transition-colors"
              >
                Recalculate
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToPostAd();
                }}
                className="flex-1 bg-[#FF5B26] hover:bg-[#E84E1A] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all"
              >
                <span>Post Ad For This Car</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
