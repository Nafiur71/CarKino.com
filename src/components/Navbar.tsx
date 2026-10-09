'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Menu, X, ShieldCheck, LayoutDashboard, ShieldAlert, Scale, Wrench, ChevronDown } from 'lucide-react';
import { useCars } from '@/context/CarContext';

interface NavbarProps {
  onSearchClick?: () => void;
  onPostAdClick?: () => void;
  onFinancingClick?: () => void;
}

export default function Navbar({ onSearchClick, onPostAdClick, onFinancingClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { compareList } = useCars();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090E1A]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-[#090E1A]/85 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with CarKino branding */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 mr-2 xl:mr-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B26] to-[#FF8A65] flex items-center justify-center shadow-lg shadow-[#FF5B26]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-2xl tracking-tighter">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight leading-none group-hover:text-white/90">
                Car<span className="text-[#FF5B26]">Kino</span>
                <span className="text-xs font-normal text-slate-400">.com</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Verified Deals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium whitespace-nowrap">
            <Link
              href="/"
              className="text-slate-200 hover:text-[#FF5B26] transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="text-slate-200 hover:text-[#FF5B26] transition-colors flex items-center gap-1.5 py-1"
            >
              <span>Browse Cars</span>
              <span className="bg-[#FF5B26]/20 text-[#FF5B26] text-[10px] px-1.5 py-0.5 rounded-full font-bold">New</span>
            </Link>
            <Link
              href="/compare"
              className="text-slate-200 hover:text-[#FF5B26] transition-colors flex items-center gap-1.5 py-1"
            >
              <Scale className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="bg-[#FF5B26] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              href="/parts"
              className="text-slate-200 hover:text-[#FF5B26] transition-colors flex items-center gap-1.5 py-1"
            >
              <Wrench className="w-3.5 h-3.5 text-[#FF5B26]" />
              <span>Auto Parts</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Store</span>
            </Link>
            <Link
              href="/#sell-your-car"
              className="text-slate-300 hover:text-white transition-colors py-1"
            >
              Sell Your Car
            </Link>
            <button
              onClick={onFinancingClick}
              className="text-slate-300 hover:text-[#FF5B26] transition-colors font-medium text-sm py-1 cursor-pointer"
            >
              Financing / EMI
            </button>

            {/* Portals Dropdown for Management routes */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors py-1 cursor-pointer">
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5B26] transition-colors" />
                <span>Portals</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute right-0 top-full pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0B132B]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1">
                  <Link
                    href="/dashboard"
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-all group/item"
                  >
                    <div className="p-2 rounded-lg bg-[#FF5B26]/10 text-[#FF5B26] group-hover/item:bg-[#FF5B26] group-hover/item:text-white transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Seller Dashboard</div>
                      <div className="text-[11px] text-slate-400">Manage listings & inquiries</div>
                    </div>
                  </Link>

                  <Link
                    href="/admin"
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/5 transition-all group/item"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover/item:bg-amber-500 group-hover/item:text-white transition-colors">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Admin Queue</div>
                      <div className="text-[11px] text-slate-400">Moderation & verification</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action Icons & Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 whitespace-nowrap">
            <Link
              href="/cars"
              aria-label="Search"
              onClick={onSearchClick}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              aria-label="User Account"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-1.5"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={onPostAdClick}
              className="bg-[#FF5B26] hover:bg-[#E84E1A] text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md shadow-[#FF5B26]/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Post an Ad
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={onPostAdClick}
              className="bg-[#FF5B26] text-white px-3.5 py-1.5 rounded-full font-semibold text-xs shrink-0 cursor-pointer"
            >
              Post Ad
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090E1A]/98 border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#FF5B26] py-1"
            >
              Home
            </Link>
            <Link
              href="/cars"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1 flex items-center justify-between"
            >
              <span>Browse All Cars</span>
              <span className="text-xs bg-[#FF5B26] px-2 py-0.5 rounded-full text-white">Catalog</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#FF5B26]" />
                <span>Compare Vehicles</span>
              </span>
              {compareList.length > 0 && (
                <span className="text-xs bg-[#FF5B26] px-2 py-0.5 rounded-full text-white font-bold">
                  {compareList.length} Cars
                </span>
              )}
            </Link>
            <Link
              href="/parts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-[#FF5B26]" />
                <span>Auto Parts Store</span>
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                Store
              </span>
            </Link>
            <Link
              href="/#sell-your-car"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1"
            >
              Sell Your Car
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onFinancingClick?.();
              }}
              className="text-left text-slate-200 hover:text-[#FF5B26] py-1 font-medium"
            >
              Financing / EMI Calculator
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-white py-1"
            >
              Seller Dashboard
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-400 hover:text-amber-300 py-1"
            >
              Admin Moderation Queue
            </Link>
          </nav>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#FF5B26]" />
              <span>100% Phone Verified</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPostAdClick?.();
              }}
              className="bg-[#FF5B26] text-white px-5 py-2 rounded-full font-medium text-sm"
            >
              Post an Ad
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
