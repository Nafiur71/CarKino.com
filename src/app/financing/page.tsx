'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostAdModal from '@/components/PostAdModal';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Building,
} from 'lucide-react';

export default function FinancingPage() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(45000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [applied, setApplied] = useState(false);
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);

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

  const banks = [
    { name: 'Emirates NBD Auto Finance', rate: '5.99%', tenure: 'Up to 5 yrs', approval: 'Instant' },
    { name: 'Dubai Islamic Bank Auto Murabaha', rate: '6.25%', tenure: 'Up to 5 yrs', approval: 'Same Day' },
    { name: 'Standard Chartered Car Loan', rate: '6.50%', tenure: 'Up to 7 yrs', approval: '24 Hours' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar onPostAdClick={() => setIsPostAdOpen(true)} />

      {/* Header Banner */}
      <div className="pt-28 pb-12 bg-[#090E1A] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26] px-3 py-1 rounded-full bg-white/5 border border-white/10">
            CarKino Auto Finance (PRD ENG-4)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
            Car Loan &amp; EMI Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Estimate your monthly payments, compare verified partner interest rates, and get pre-approved for your dream used car in minutes.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Calculator className="w-5 h-5 text-[#FF5B26]" />
              <h2 className="text-lg font-extrabold text-slate-900">Customize Your Loan Terms</h2>
            </div>

            {/* Vehicle Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase text-slate-600">Vehicle Price</label>
                <span className="text-lg font-black text-[#FF5B26]">
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
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$5,000</span>
                <span>$100,000</span>
                <span>$200,000</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase text-slate-600">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-base font-bold text-slate-900">
                  ${downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                {[10, 20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`flex-1 py-1.5 text-xs rounded-xl font-bold transition-all ${
                      downPaymentPercent === pct
                        ? 'bg-[#FF5B26] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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

            {/* Loan Tenure */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-2">
                Loan Duration ({loanTermMonths} Months / {loanTermMonths / 12} Years)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[24, 36, 48, 60, 72, 84].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermMonths(term)}
                    className={`py-2 text-xs rounded-xl font-bold transition-all ${
                      loanTermMonths === term
                        ? 'bg-[#FF5B26] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {term} Mos
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase text-slate-600">
                  Annual Interest Rate (APR)
                </label>
                <span className="text-base font-bold text-emerald-600">
                  {interestRate}% APR
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={15.0}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Result Card Box */}
          <div className="lg:col-span-5 bg-[#090E1A] rounded-3xl p-6 sm:p-8 text-white border border-white/10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Estimated Monthly Payment (EMI)
                </span>
                <div className="mt-2">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5B26] via-[#FF7A45] to-[#FFA07A]">
                    ${monthlyInstallment.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">per month for {loanTermMonths} months</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Principal Loan Amount:</span>
                  <span className="font-bold text-white">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Down Payment Paid:</span>
                  <span className="font-bold text-white">${downPaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Interest Payable:</span>
                  <span className="font-bold text-amber-400">${totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-slate-300 font-bold">Total Payment:</span>
                  <span className="font-black text-white text-base">${totalPayment.toLocaleString()}</span>
                </div>
              </div>

              {/* Proportions */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Loan Principal: {principalRatio}%</span>
                  <span>Interest: {100 - principalRatio}%</span>
                </div>
                <div className="w-full h-2.5 bg-amber-400/80 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#FF5B26]"
                    style={{ width: `${principalRatio}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Pre-Approval Button */}
            <div className="pt-6">
              {!applied ? (
                <button
                  type="button"
                  onClick={() => setApplied(true)}
                  className="w-full bg-[#FF5B26] hover:bg-[#E84E1A] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF5B26]/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Get Pre-Approved Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Application Submitted!</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    CarKino financing specialists will connect you with our lowest APR banking partner within 2 hours.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Partner Banking Rates Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-[#FF5B26]" />
            <h3 className="font-extrabold text-lg text-slate-900">
              Verified Partner Banking Rates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banks.map((b, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-emerald-600">{b.rate}</span>
                    <span className="text-xs text-slate-400 font-medium">Starting APR</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Tenure: {b.tenure}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Approval: {b.approval}</span>
                  <span className="text-[#FF5B26] font-bold">Apply →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
      />
    </div>
  );
}
