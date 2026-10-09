'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostAdModal from '@/components/PostAdModal';
import EmiCalculatorModal from '@/components/EmiCalculatorModal';
import { useCars } from '@/context/CarContext';
import { Car } from '@/data/mockData';
import {
  Scale,
  Plus,
  X,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  Trash2,
} from 'lucide-react';

export default function ComparePage() {
  const { cars, compareList, removeFromCompare, addToCompare, clearCompare, incrementInquiries } = useCars();
  
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmiPrice, setSelectedEmiPrice] = useState(45000);
  const [selectedEmiTitle, setSelectedEmiTitle] = useState('');

  // Active cars in comparison
  const comparedCars: Car[] = compareList
    .map((id) => cars.find((c) => c.id === id))
    .filter((c): c is Car => !!c);

  const availableCarsToPick = cars.filter(
    (c) => c.status === 'active' && !compareList.includes(c.id)
  );

  const handleOpenEmi = (car: Car) => {
    setSelectedEmiPrice(car.price);
    setSelectedEmiTitle(`${car.year} ${car.make} ${car.model}`);
    setIsEmiOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar
        onPostAdClick={() => setIsPostAdOpen(true)}
        onFinancingClick={() => setIsEmiOpen(true)}
      />

      {/* Header Banner */}
      <div className="pt-28 pb-10 bg-[#090E1A] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                <Scale className="w-3.5 h-3.5" />
                <span>Side-by-Side Comparison (PRD ENG-3)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                Compare Vehicles
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Compare specs, monthly financing rates, and seller credentials for up to 3 cars side by side.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {compareList.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
              <span className="text-xs font-bold text-[#FF5B26] bg-[#FF5B26]/10 px-3 py-2 rounded-xl border border-[#FF5B26]/30">
                Comparing {comparedCars.length} of 3 Slots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Comparison Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Top 3 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => {
            const car = comparedCars[index];

            if (car) {
              const estMonthly = Math.round((car.price * 0.8) / 48);
              const whatsappMessage = encodeURIComponent(
                `Hello! I am inquiring about the ${car.year} ${car.make} ${car.model} ($${car.price.toLocaleString()}) on CarKino.com.`
              );

              return (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between relative group"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCompare(car.id)}
                    aria-label="Remove from compare"
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 mb-4">
                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-[#FF5B26] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {car.bodyType}
                      </div>
                    </div>

                    {/* Title & Price */}
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#FF5B26] transition-colors">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {car.location} &bull; {car.mileage.toLocaleString()} km
                    </p>

                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-black text-[#FF5B26]">
                        ${car.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleOpenEmi(car)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                      >
                        Est. ${estMonthly}/mo
                      </button>
                    </div>
                  </div>

                  {/* Actions (WhatsApp & Call) */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${whatsappMessage}`}
                      onClick={() => incrementInquiries(car.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${car.seller.phone}`}
                      onClick={() => incrementInquiries(car.id)}
                      className="flex-1 bg-slate-900 hover:bg-[#FF5B26] text-white py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              );
            }

            // Empty Slot Box
            return (
              <div
                key={`empty-${index}`}
                onClick={() => setIsPickerOpen(true)}
                className="bg-white rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#FF5B26] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[350px] group hover:bg-[#FF5B26]/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-[#FF5B26] text-slate-400 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-7 h-7" />
                </div>
                <h4 className="font-extrabold text-base text-slate-800 group-hover:text-[#FF5B26] transition-colors">
                  Add Vehicle to Slot {index + 1}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                  Select from active inventory to compare price and specifications.
                </p>
                <span className="mt-4 text-xs font-bold text-[#FF5B26] bg-[#FF5B26]/10 px-3 py-1.5 rounded-full">
                  + Choose a Car
                </span>
              </div>
            );
          })}
        </div>

        {/* Detailed Spec Comparison Table */}
        {comparedCars.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF5B26]" />
                Detailed Feature &amp; Specification Matrix
              </h3>
              <span className="text-xs text-slate-500">
                Data verified by CarKino inspection team
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {/* Asking Price */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 w-1/4 bg-slate-50/50">Asking Price</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 font-black text-base text-[#FF5B26] w-1/4">
                        {comparedCars[i] ? `$${comparedCars[i].price.toLocaleString()}` : '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Monthly Loan (EMI) */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Est. Monthly EMI (48 Mo)</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 font-bold text-emerald-600">
                        {comparedCars[i] ? `~$${Math.round((comparedCars[i].price * 0.8) / 48)}/mo` : '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Model Year */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Registration Year</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 font-semibold text-slate-800">
                        {comparedCars[i]?.year || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Mileage */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Odometer Mileage</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 font-semibold text-slate-800">
                        {comparedCars[i] ? `${comparedCars[i].mileage.toLocaleString()} km` : '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Fuel Type */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Fuel Type</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {comparedCars[i]?.fuelType || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Transmission */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Transmission</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {comparedCars[i]?.transmission || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Body Type */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Body Type</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {comparedCars[i]?.bodyType || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Color */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Exterior Color</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {comparedCars[i]?.color || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Location</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4 text-slate-700">
                        {comparedCars[i]?.location || '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Seller & Verification */}
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Seller &amp; Verification</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4">
                        {comparedCars[i] ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                            <ShieldCheck className="w-4 h-4 text-[#FF5B26]" />
                            <span>{comparedCars[i].seller.name} ({comparedCars[i].seller.rating} ★)</span>
                          </div>
                        ) : '—'}
                      </td>
                    ))}
                  </tr>

                  {/* Fraud Check Status */}
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">CarKino Trust Status</td>
                    {[0, 1, 2].map((i) => (
                      <td key={i} className="p-4">
                        {comparedCars[i] ? (
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                            ✓ 100% Phone &amp; Photo Audited
                          </span>
                        ) : '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Vehicle Picker Modal to Add to Comparison */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-xl w-full text-white p-6 shadow-2xl relative max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF5B26]" />
                Select a Car to Compare
              </h3>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-3 flex-1">
              {availableCarsToPick.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-8">
                  All active cars are currently in comparison!
                </p>
              ) : (
                availableCarsToPick.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      addToCompare(car.id);
                      setIsPickerOpen(false);
                    }}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF5B26] rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-16 h-12 object-cover rounded-xl border border-white/10"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white">
                          {car.year} {car.make} {car.model}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {car.bodyType} &bull; {car.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-sm text-[#FF5B26]">
                        ${car.price.toLocaleString()}
                      </span>
                      <span className="block text-[10px] text-emerald-400 font-bold">
                        + Select
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
      />

      <EmiCalculatorModal
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
        initialPrice={selectedEmiPrice}
        carTitle={selectedEmiTitle}
      />
    </div>
  );
}
