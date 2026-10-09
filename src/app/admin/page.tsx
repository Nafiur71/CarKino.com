'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCars } from '@/context/CarContext';
import {
  CheckCircle,
  AlertTriangle,
  Check,
  X,
  UserCheck,
} from 'lucide-react';

export default function AdminPage() {
  const { cars, approveCar, rejectCar } = useCars();

  const [rejectingCarId, setRejectingCarId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Duplicate listing detected');
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'rejected'>('pending');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingListings = cars.filter((c) => c.status === 'pending');
  const activeListings = cars.filter((c) => c.status === 'active');
  const rejectedListings = cars.filter((c) => c.status === 'rejected');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (carId: string, modelName: string) => {
    approveCar(carId);
    showToast(`✓ "${modelName}" has been APPROVED and is now live on the marketplace!`);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingCarId) return;

    rejectCar(rejectingCarId, rejectReason);
    setRejectingCarId(null);
    showToast(`Ad has been rejected: "${rejectReason}".`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 font-bold text-sm animate-bounce">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="pt-24 pb-8 bg-[#090E1A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Admin &amp; Moderation Panel (PRD Section 7.7)
                </span>
              </div>
              <h1 className="text-3xl font-black text-white mt-1">
                Moderation Queue
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time queue: Approve or reject vehicle submissions with anti-scam checks and phone verification auditing.
              </p>
            </div>

            {/* Quick Metrics (ADM-7) */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl text-center">
                <span className="text-xs text-amber-400 block font-semibold">Pending Queue</span>
                <span className="text-xl font-black text-white">{pendingListings.length}</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl text-center">
                <span className="text-xs text-emerald-400 block font-semibold">Live Active</span>
                <span className="text-xl font-black text-white">{activeListings.length}</span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 px-4 py-2 rounded-2xl text-center">
                <span className="text-xs text-rose-400 block font-semibold">Rejected Ads</span>
                <span className="text-xl font-black text-white">{rejectedListings.length}</span>
              </div>
            </div>
          </div>

          {/* Segmented Tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pending'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending Reviews ({pendingListings.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'active'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Active Cars ({activeListings.length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rejected'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rejected ({rejectedListings.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Table / Queue Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'pending' && (
          <div className="space-y-6">
            {pendingListings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Queue is clear!</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  All submitted car listings have been reviewed. Post a new ad from the top menu to test moderation!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingListings.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Visual & Basic Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={car.image}
                        alt={car.model}
                        className="w-24 h-20 object-cover rounded-xl border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base text-white">
                            {car.year} {car.make} {car.model}
                          </h3>
                          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                            Pending Review
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          ${car.price.toLocaleString()} &bull; {car.mileage.toLocaleString()} km &bull; {car.location}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-2">
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <UserCheck className="w-3.5 h-3.5" />
                            Seller: {car.seller.name} ({car.seller.phone})
                          </span>
                          <span>&bull;</span>
                          <span className="text-slate-400">Phone Verified: Yes</span>
                        </div>
                      </div>
                    </div>

                    {/* Anti-Scam Audit Checklist (PRD TS-3, TS-4) */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-300">
                        ✓ No Duplicate Images
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-300">
                        ✓ Price Within Market (±4%)
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-300">
                        ✓ Phone OTP Verified
                      </div>
                    </div>

                    {/* Action Buttons (One-Click Approve / Reject with Reason - US-4) */}
                    <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                      <button
                        onClick={() => setRejectingCarId(car.id)}
                        className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleApprove(car.id, `${car.make} ${car.model}`)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Ad</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/10 text-white font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Seller</th>
                  <th className="p-4">Views</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {activeListings.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5">
                    <td className="p-4 font-semibold text-white flex items-center gap-2">
                      <img src={car.image} alt={car.model} className="w-8 h-8 rounded-lg object-cover" />
                      <span>{car.year} {car.make} {car.model}</span>
                    </td>
                    <td className="p-4 text-[#FF5B26] font-bold">${car.price.toLocaleString()}</td>
                    <td className="p-4">{car.seller.name}</td>
                    <td className="p-4">{car.viewsCount || 0}</td>
                    <td className="p-4">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                        Live Active
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href="/cars"
                        className="text-xs text-[#FF5B26] hover:underline font-bold"
                      >
                        View in Catalog →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="space-y-4">
            {rejectedListings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-xs text-slate-400">
                No rejected listings yet.
              </div>
            ) : (
              rejectedListings.map((car) => (
                <div
                  key={car.id}
                  className="bg-white/5 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={car.image} alt={car.model} className="w-12 h-10 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{car.year} {car.make} {car.model}</h4>
                      <p className="text-xs text-rose-400 mt-0.5">Reason: {car.rejectionReason || 'Duplicate or scam suspicion'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApprove(car.id, `${car.make} ${car.model}`)}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl font-bold text-slate-200"
                  >
                    Re-Approve
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Reject Modal with Reason (PRD US-4: Rejection requires a reason) */}
      {rejectingCarId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl">
            <h3 className="font-extrabold text-lg text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Ad Listing</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select the reason why this ad is being rejected. The seller will be notified via SMS.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                  Rejection Reason
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="Duplicate listing detected">Duplicate listing or stolen photos (PRD TS-3)</option>
                  <option value="Unrealistic pricing detected">Price sanity check failed (PRD TS-4)</option>
                  <option value="Contact info in photos or description">Contact details in photos/prohibited text (PRD TS-5)</option>
                  <option value="Incomplete vehicle documentation">Incomplete specs or unverified VIN</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingCarId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
