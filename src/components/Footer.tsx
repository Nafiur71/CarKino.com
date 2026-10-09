'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090E1A] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5B26] to-[#FF8A65] flex items-center justify-center shadow-lg shadow-[#FF5B26]/30">
                <span className="text-white font-black text-2xl tracking-tighter">C</span>
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tight">
                Car<span className="text-[#FF5B26]">Kino</span>
                <span className="text-xs font-normal text-slate-400">.com</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 font-medium">
              Premium Cars, Trusted Deals.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The premier online automotive marketplace for buying and selling verified used vehicles with zero fraud risk and instant valuation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5B26]" />
              <span>Verified Seller Network &amp; Anti-Scam Protection</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">Browse Cars</Link>
              </li>
              <li>
                <Link href="/parts" className="hover:text-white transition-colors">Auto Parts &amp; Accessories</Link>
              </li>
              <li>
                <Link href="/#sell-your-car" className="hover:text-white transition-colors">Sell Your Car</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Seller Dashboard</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">Admin Queue</Link>
              </li>
              <li>
                <Link href="/#articles" className="hover:text-white transition-colors">Blog &amp; Guides</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Safety Tips</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Fraud Reporting</a>
              </li>
            </ul>
          </div>

          {/* Follow Us & Socials */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3 mb-6">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#FF5B26] hover:bg-[#FF5B26] hover:text-white flex items-center justify-center transition-all text-slate-300"
              >
                <span className="font-bold text-xs">fb</span>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#FF5B26] hover:bg-[#FF5B26] hover:text-white flex items-center justify-center transition-all text-slate-300"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#FF5B26] hover:bg-[#FF5B26] hover:text-white flex items-center justify-center transition-all text-slate-300"
              >
                <span className="font-bold text-xs">yt</span>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#FF5B26] hover:bg-[#FF5B26] hover:text-white flex items-center justify-center transition-all text-slate-300"
              >
                <span className="font-bold text-xs">in</span>
              </a>
            </div>

            <div className="text-xs space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF5B26]" />
                <span>support@carkino.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF5B26]" />
                <span>+1 (800) 555-KINO</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2025 CarKino.com. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#FF5B26] font-semibold">Drive Your Dreams</span>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
