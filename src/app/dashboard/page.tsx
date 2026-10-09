'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostAdModal from '@/components/PostAdModal';
import { useCars } from '@/context/CarContext';
import {
  PlusCircle,
  Eye,
  MessageSquare,
  Clock,
  Sparkles,
  Trash2,
} from 'lucide-react';

export default function DashboardPage() {
  const { cars, markAsSold, toggleBoost, deleteCar } = useCars();
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'sold'>('all');

  // Filter listings by tab
  const displayCars = cars.filter((car) => {
    if (activeTab === 'active') return car.status === 'active';
    if (activeTab === 'pending') return car.status === 'pending';
    if (activeTab === 'sold') return car.status === 'sold';
    return true;
  });

  // Summary Metrics
  const totalViews = cars.reduce((acc, c) => acc + (c.viewsCount || 0), 0);
  const totalInquiries = cars.reduce((acc, c) => acc + (c.inquiriesCount || 0), 0);
  const activeCount = cars.filter((c) => c.status === 'active').length;
  const pendingCount = cars.filter((c) => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar onPostAdClick={() => setIsPostAdOpen(true)} />

      {/* Header */}
      <div className="pt-24 pb-8 bg-[#090E1A] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5B26]">
                Seller &amp; Dealer Portal (PRD Section 7.6)
              </span>
              <h1 className="text-3xl font-black text-white mt-1">
                My Vehicle Inventory
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time tracking: Buyer impressions, direct WhatsApp/phone leads, and featured ad boosts on CarKino.
              </p>
            </div>

            <button
              onClick={() => setIsPostAdOpen(true)}
              className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#FF5B26]/30 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post New Ad</span>
            </button>
          </div>

          {/* Metrics Counters (DASH-2) */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold uppercase">Active Listings</span>
              <p className="text-2xl font-black text-white mt-1">{activeCount} Vehicles</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <span className="text-xs text-amber-400 font-semibold uppercase">Pending Moderation</span>
              <p className="text-2xl font-black text-amber-400 mt-1">{pendingCount} Vehicles</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Buyer Impressions</span>
              <p className="text-2xl font-black text-[#FF5B26] mt-1">{totalViews.toLocaleString()} Views</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold uppercase">Direct Buyer Inquiries</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">{totalInquiries} Phone/WA Leads</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#FF5B26] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Inventory ({cars.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'active' ? 'bg-[#FF5B26] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pending' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sold' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sold
            </button>
          </div>
        </div>
      </div>

      {/* Main Inventory List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-lg text-slate-900">
              Manage Listings ({displayCars.length})
            </h2>
            <span className="text-xs text-slate-500">
              Listings expire after 45 days (PRD LIST-9)
            </span>
          </div>

          {displayCars.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-slate-800">No vehicles in this tab</h3>
              <p className="text-xs text-slate-500 mt-1">
                Post an ad to list your car on CarKino and receive genuine buyer inquiries.
              </p>
              <button
                onClick={() => setIsPostAdOpen(true)}
                className="mt-4 bg-[#FF5B26] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
              >
                Post Your Car Now
              </button>
            </div>
          ) : (
            displayCars.map((car) => {
              const isBoosted = !!car.featured;
              return (
                <div
                  key={car.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  {/* Car Thumbnail & Details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-28 h-20 object-cover rounded-xl border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            car.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : car.status === 'sold'
                              ? 'bg-slate-100 text-slate-600'
                              : car.status === 'rejected'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {car.status === 'active'
                            ? 'Active'
                            : car.status === 'sold'
                            ? 'Sold'
                            : car.status === 'rejected'
                            ? 'Rejected'
                            : 'Pending Moderation'}
                        </span>
                        {isBoosted && (
                          <span className="text-[10px] bg-[#FF5B26]/10 text-[#FF5B26] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Featured Boost
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Price: <span className="font-black text-[#FF5B26]">${car.price.toLocaleString()}</span> &bull; {car.mileage.toLocaleString()} km &bull; {car.location}
                      </p>

                      {/* Stats per listing (DASH-2) */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {car.viewsCount || 0} Impressions
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          {car.inquiriesCount || 0} Buyer Contacts (Call/WhatsApp)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Seller Actions (LIST-8 & DASH-4) */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                    {/* Boost Toggle (PRD DASH-4 / MON-1) */}
                    <button
                      onClick={() => toggleBoost(car.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isBoosted
                          ? 'bg-[#FF5B26] text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isBoosted ? 'Boosted (Featured)' : 'Boost Listing'}</span>
                    </button>

                    {/* Mark as Sold (LIST-8) */}
                    {car.status !== 'sold' ? (
                      <button
                        onClick={() => markAsSold(car.id)}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                      >
                        Mark as Sold
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold px-2">Completed</span>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                      aria-label="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
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
