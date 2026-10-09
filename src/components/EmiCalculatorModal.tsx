'use client';

import React, { useState, useMemo } from 'react';
import { X, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EmiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  carTitle?: string;
}

export default function EmiCalculatorModal({
  isOpen,
  onClose,
  initialPrice = 45000,
  carTitle,
}: EmiCalculatorModalProps) {
  const [vehiclePrice, setVehiclePrice] = useState<number>(initialPrice);
  const [prevInitialPrice, setPrevInitialPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [appliedPreApproval, setAppliedPreApproval] = useState(false);

  // Sync initial price if changed from outside
  if (initialPrice !== prevInitialPrice) {
    setPrevInitialPrice(initialPrice);
    setVehiclePrice(initialPrice);
  }

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return Math.round((vehiclePrice * downPaymentPercent) / 100);
  }, [vehiclePrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, vehiclePrice - downPaymentAmount);
  }, [vehiclePrice, downPaymentAmount]);

  const monthlyInstallment = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    if (monthlyRate === 0) return Math.round(loanAmount / loanTermMonths);

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1);

    return Math.round(emi);
  }, [loanAmount, interestRate, loanTermMonths]);

  const totalPayment = useMemo(() => {
    return monthlyInstallment * loanTermMonths + downPaymentAmount;
  }, [monthlyInstallment, loanTermMonths, downPaymentAmount]);

  const totalInterest = useMemo(() => {
    return Math.max(0, totalPayment - vehiclePrice);
  }, [totalPayment, vehiclePrice]);

  const principalRatio = useMemo(() => {
    if (totalPayment === 0) return 100;
    return Math.round((loanAmount / (loanAmount + totalInterest)) * 100);
  }, [loanAmount, totalInterest, totalPayment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-2xl w-full text-white p-6 shadow-2xl relative my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF5B26]/20 text-[#FF5B26] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                CarKino Financing &amp; EMI Calculator
              </h3>
              {carTitle && (
                <p className="text-xs text-slate-400">
                  Calculating monthly installment for <span className="text-[#FF5B26]">{carTitle}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5">
          
          {/* Controls Column */}
          <div className="md:col-span-7 space-y-5">
            {/* Vehicle Price */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Vehicle Price
                </label>
                <span className="text-sm font-black text-[#FF5B26]">
                  ${vehiclePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={1000}
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(parseInt(e.target.value))}
                className="w-full accent-[#FF5B26] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$200,000+</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-bold text-white">
                  ${downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {[10, 20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`flex-1 py-1 text-xs rounded-lg font-bold transition-all ${
                      downPaymentPercent === pct
                        ? 'bg-[#FF5B26] text-white shadow-sm'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                className="w-full accent-[#FF5B26] cursor-pointer"
              />
            </div>

            {/* Loan Term (Months) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Loan Duration ({loanTermMonths} Months / {loanTermMonths / 12} Yrs)
                </label>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60, 72, 84].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermMonths(term)}
                    className={`py-1.5 text-xs rounded-xl font-bold transition-all ${
                      loanTermMonths === term
                        ? 'bg-[#FF5B26] text-white shadow-sm'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {term} Mos
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Estimated Interest Rate
                </label>
                <span className="text-sm font-bold text-emerald-400">
                  {interestRate}% APR
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={15.0}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-5 bg-[#141F38] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Monthly Estimate
              </span>

              {/* Big Highlighted Monthly Payment */}
              <div>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B26] via-[#FF7A45] to-[#FFA07A]">
                  ${monthlyInstallment.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">/ month</span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Principal Loan:</span>
                  <span className="font-bold text-white">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Down Payment:</span>
                  <span className="font-bold text-white">${downPaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Interest:</span>
                  <span className="font-bold text-amber-400">${totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-slate-400 font-bold">Total Cost:</span>
                  <span className="font-black text-white">${totalPayment.toLocaleString()}</span>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Principal ({principalRatio}%)</span>
                  <span>Interest ({100 - principalRatio}%)</span>
                </div>
                <div className="w-full h-2 bg-amber-400/80 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#FF5B26]"
                    style={{ width: `${principalRatio}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-5">
              {!appliedPreApproval ? (
                <button
                  type="button"
                  onClick={() => setAppliedPreApproval(true)}
                  className="w-full bg-[#FF5B26] hover:bg-[#E84E1A] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF5B26]/30 transition-all"
                >
                  <span>Apply for Pre-Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pre-Approval Request Sent!</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    A verified partner dealer will contact you with loan rates.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
