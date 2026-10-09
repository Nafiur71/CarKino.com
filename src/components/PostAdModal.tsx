'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCars } from '@/context/CarContext';
import { Car } from '@/data/mockData';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostAdModal({ isOpen, onClose }: PostAdModalProps) {
  const { addCar } = useCars();

  const [step, setStep] = useState(1);
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [bodyType, setBodyType] = useState<'Sedan' | 'SUV' | 'Sports Car' | 'Truck' | 'Electric' | 'Coupe'>('Sedan');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'>('Petrol');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [color, setColor] = useState('White');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('25000');
  const [location, setLocation] = useState('Dubai, UAE');
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittedCarId, setSubmittedCarId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Step 3 submission: verify phone OTP and save to shared store!
      setIsSubmitting(true);
      setTimeout(() => {
        const newCar = addCar({
          make,
          model: model.trim() || 'Corolla Altis',
          year: parseInt(year) || 2022,
          price: parseFloat(price) || 28000,
          mileage: parseInt(mileage) || 25000,
          fuelType,
          transmission,
          bodyType,
          color,
          location,
          image: selectedImage,
          seller: {
            name: sellerName.trim() || 'Private Seller',
            type: 'Private',
            rating: 5.0,
            phone: phone.trim() || '+971 50 123 4567',
            verified: true,
          },
        });

        setSubmittedCarId(newCar.id);
        setIsSubmitting(false);
        setIsCompleted(true);
      }, 700);
    }
  };

  const resetForm = () => {
    setStep(1);
    setModel('');
    setPrice('');
    setPhone('');
    setOtp('');
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0D162B] border border-white/15 rounded-3xl max-w-lg w-full text-white p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B26]" />
            <h3 className="font-extrabold text-lg text-white">
              {isCompleted ? 'Ad Submitted Successfully!' : `Post Your Car (Step ${step} of 3)`}
            </h3>
          </div>
          <button
            onClick={resetForm}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isCompleted ? (
          <form onSubmit={handleNext} className="space-y-4 pt-4">
            {/* Step 1: Car Details */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Step 1: Vehicle Specifications</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Make</label>
                    <select
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                    >
                      <option value="Toyota">Toyota</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Range Rover">Range Rover</option>
                      <option value="Audi">Audi</option>
                      <option value="Honda">Honda</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Ford">Ford</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Body Type</label>
                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value as Car['bodyType'])}
                      className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Sports Car">Sports Car</option>
                      <option value="Truck">Truck</option>
                      <option value="Electric">Electric</option>
                      <option value="Coupe">Coupe</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Model &amp; Variant</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Camry XLE or 530i M Sport"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Registration Year</label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Transmission</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as Car['transmission'])}
                      className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value as Car['fuelType'])}
                      className="w-full bg-[#141F38] border border-white/15 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Color</label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. White"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Price, Location & Photos */}
            {step === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Step 2: Price, Location &amp; Photos</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Asking Price ($)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 45000"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Mileage (km)</label>
                    <input
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="e.g. 25000"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">City / Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#141F38] border border-white/15 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-[#FF5B26]"
                  >
                    <option value="Dubai, UAE">Dubai, UAE</option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="London, UK">London, UK</option>
                    <option value="Munich, Germany">Munich, Germany</option>
                    <option value="Lahore, PK">Lahore, PK</option>
                  </select>
                </div>

                {/* Photo Simulation */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Vehicle Photo</label>
                  <div className="border border-white/15 rounded-2xl p-3 bg-white/5 flex items-center gap-3 mb-2">
                    <img
                      src={selectedImage}
                      alt="Car Preview"
                      className="w-16 h-12 object-cover rounded-lg border border-white/10"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-200">High-Resolution Exterior Photo</p>
                      <p className="text-[10px] text-slate-400">Automatic anti-duplicate image scan ready</p>
                    </div>
                    <span className="text-xs text-[#FF5B26] font-bold">Ready</span>
                  </div>
                  <input
                    type="text"
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B26]"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Seller Contact & Phone Verification */}
            {step === 3 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Step 3: Phone Verification (Guarantees Anti-Scam Protection)</p>
                
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="e.g. Sana Al-Nuaimi or Imran Khan"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Mobile Phone Number</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setOtp('4829');
                        alert('Demo OTP code: 4829 has been auto-filled!');
                      }}
                      className="bg-white/10 hover:bg-white/20 text-[#FF5B26] text-xs font-bold px-3 py-2.5 rounded-xl border border-white/10"
                    >
                      Get OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Enter 4-Digit OTP Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="4829"
                    maxLength={6}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B26]"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Phone verification gives your ad the &quot;Verified Seller&quot; trust badge.</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-slate-200 text-xs font-semibold hover:bg-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : <div />}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-[#FF5B26]/30 transition-all ml-auto"
              >
                {isSubmitting ? (
                  <span>Saving &amp; Verifying...</span>
                ) : step === 3 ? (
                  <span>Verify &amp; Submit Ad</span>
                ) : (
                  <>
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Screen (PRD LIST-7) */
          <div className="pt-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-white">
                Listing Submitted for Moderation!
              </h4>
              <p className="text-xs text-slate-300 mt-1 font-medium">
                {year} {make} {model} (${parseFloat(price || '0').toLocaleString()})
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Status:</span>
                <span className="bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  Pending Review (PRD LIST-7)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Listing ID:</span>
                <span className="text-white font-mono">{submittedCarId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Moderation Queue:</span>
                <span className="text-emerald-400 font-medium">Visible to Admin for Approval</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="/admin"
                onClick={resetForm}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold text-xs transition-colors"
              >
                View in Admin Queue →
              </a>
              <button
                onClick={resetForm}
                className="flex-1 bg-[#FF5B26] hover:bg-[#E84E1A] text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-[#FF5B26]/30 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
