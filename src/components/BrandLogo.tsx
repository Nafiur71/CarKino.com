'use client';

import React from 'react';

interface BrandLogoProps {
  name: string;
  className?: string;
}

export default function BrandLogo({ name, className = 'w-10 h-10' }: BrandLogoProps) {
  const normalized = name.toLowerCase().trim();

  // Toyota Premio - Iconic JDM Royal Gold/Chrome Crown Shield "P" Crest
  if (normalized.includes('premio')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="premioGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#E5A93B" />
            <stop offset="100%" stopColor="#9E6E18" />
          </linearGradient>
          <linearGradient id="premioDarkBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
        </defs>
        {/* Shield Outer Outline */}
        <path
          d="M50 8 C72 8, 88 18, 88 40 C88 66, 68 85, 50 92 C32 85, 12 66, 12 40 C12 18, 28 8, 50 8 Z"
          fill="url(#premioDarkBg)"
          stroke="url(#premioGold)"
          strokeWidth="3.5"
        />
        {/* Inner Shield Rim */}
        <path
          d="M50 14 C68 14, 82 22, 82 41 C82 63, 65 79, 50 85 C35 79, 18 63, 18 41 C18 22, 32 14, 50 14 Z"
          fill="none"
          stroke="url(#premioGold)"
          strokeWidth="1.2"
          opacity="0.7"
        />
        {/* Royal Crown top motif */}
        <path
          d="M37 28 L43 33 L50 25 L57 33 L63 28 L61 36 L39 36 Z"
          fill="url(#premioGold)"
        />
        {/* Iconic Heraldic "P" */}
        <path
          d="M41 38 L54 38 C59.5 38 63 41.5 63 46.5 C63 51.5 59.5 55 54 55 L47 55 L47 70 L41 70 Z M47 43.5 L47 49.5 L53.5 49.5 C55.5 49.5 57 48.5 57 46.5 C57 44.5 55.5 43.5 53.5 43.5 Z"
          fill="url(#premioGold)"
        />
        {/* Laurel wings at base */}
        <path
          d="M30 60 C32 68, 40 76, 50 80 C60 76, 68 68, 70 60 C64 64, 56 66, 50 66 C44 66, 36 64, 30 60 Z"
          fill="url(#premioGold)"
          opacity="0.85"
        />
      </svg>
    );
  }

  // Toyota Allion - Iconic JDM Winged Aerodynamic Chrome & Sapphire "A" Emblem
  if (normalized.includes('allion')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="allionBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="allionChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="55%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>
        {/* Sleek Aerodynamic Badge Background */}
        <ellipse cx="50" cy="50" rx="46" ry="40" fill="url(#allionBlue)" stroke="url(#allionChrome)" strokeWidth="3.5" />
        <ellipse cx="50" cy="50" rx="41" ry="35" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
        
        {/* Left Wing of "A" */}
        <path
          d="M50 18 L33 66 L20 66 L44 26 L50 18 Z"
          fill="url(#allionChrome)"
        />
        {/* Right Wing of "A" */}
        <path
          d="M50 18 L67 66 L80 66 L56 26 L50 18 Z"
          fill="url(#allionChrome)"
        />
        {/* Horizontal Speed Wing Bar */}
        <path
          d="M26 53 L74 53 L77 59 L23 59 Z"
          fill="url(#allionChrome)"
        />
        {/* Center Stylized Diamond Peak */}
        <polygon points="50,22 55,34 50,42 45,34" fill="#38BDF8" />
      </svg>
    );
  }

  // Toyota Harrier - Iconic Golden Flying Hawk Emblem
  if (normalized.includes('harrier')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="harrierGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="#0B132B" stroke="url(#harrierGold)" strokeWidth="3" />
        {/* Soaring Hawk silhouette */}
        <path
          d="M50 18 C52 24, 62 30, 78 30 C66 38, 56 46, 52 64 C48 46, 38 38, 22 30 C38 30, 48 24, 50 18 Z"
          fill="url(#harrierGold)"
        />
        <circle cx="50" cy="46" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // Toyota - Vibrant Red Triple Interlocking Ovals
  if (normalized.includes('toyota')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="42" ry="29" fill="none" stroke="#EB0A1E" strokeWidth="5.5" />
        <ellipse cx="50" cy="42" rx="25" ry="11.5" fill="none" stroke="#EB0A1E" strokeWidth="4.5" />
        <ellipse cx="50" cy="53" rx="13" ry="24" fill="none" stroke="#EB0A1E" strokeWidth="4.5" />
      </svg>
    );
  }

  // BMW - Blue/White Quadrants with Black Ring & Chrome Trim
  if (normalized.includes('bmw')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#18181B" stroke="#D4D4D8" strokeWidth="2" />
        <circle cx="50" cy="50" r="29" fill="#FFFFFF" stroke="#71717A" strokeWidth="1" />
        <path d="M50 50 L50 21 A29 29 0 0 1 79 50 Z" fill="#0066B1" />
        <path d="M50 50 L50 79 A29 29 0 0 1 21 50 Z" fill="#0066B1" />
        <text x="31" y="24" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="sans-serif">B</text>
        <text x="50" y="18" fill="#FFFFFF" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">M</text>
        <text x="69" y="24" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="sans-serif">W</text>
      </svg>
    );
  }

  // Mercedes-Benz - High-Contrast Dark Badge with Metallic Chrome 3D Star
  if (normalized.includes('mercedes')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#0F172A" stroke="#94A3B8" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#475569" strokeWidth="1.5" />
        {/* Top Blade */}
        <polygon points="50,13 47,48 50,50" fill="#F8FAFC" />
        <polygon points="50,13 53,48 50,50" fill="#CBD5E1" />
        {/* Bottom Left Blade */}
        <polygon points="18,68 48,49 50,50" fill="#E2E8F0" />
        <polygon points="18,68 49,52 50,50" fill="#94A3B8" />
        {/* Bottom Right Blade */}
        <polygon points="82,68 52,49 50,50" fill="#CBD5E1" />
        <polygon points="82,68 51,52 50,50" fill="#64748B" />
      </svg>
    );
  }

  // Audi - Four Interlocking Bold Dark Charcoal Rings
  if (normalized.includes('audi')) {
    return (
      <svg viewBox="0 0 120 70" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="35" r="19" fill="none" stroke="#0F172A" strokeWidth="4.5" />
        <circle cx="49" cy="35" r="19" fill="none" stroke="#0F172A" strokeWidth="4.5" />
        <circle cx="71" cy="35" r="19" fill="none" stroke="#0F172A" strokeWidth="4.5" />
        <circle cx="94" cy="35" r="19" fill="none" stroke="#0F172A" strokeWidth="4.5" />
      </svg>
    );
  }

  // Honda - Chrome H Emblem in Dark Frame
  if (normalized.includes('honda')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22 18 L78 18 C83 18 87 22 86 27 L80 78 C79 83 75 86 70 86 L30 86 C25 86 21 83 20 78 L14 27 C13 22 17 18 22 18 Z" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M30 26 L38 26 L42 78 L34 78 Z" fill="#F8FAFC" />
        <path d="M70 26 L62 26 L58 78 L66 78 Z" fill="#F8FAFC" />
        <path d="M37 46 L63 46 L62 54 L38 54 Z" fill="#F8FAFC" />
      </svg>
    );
  }

  // Ford - The World-Famous Ford Blue Oval with Script
  if (normalized.includes('ford')) {
    return (
      <svg viewBox="0 0 120 75" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="37.5" rx="57" ry="33" fill="#002C6C" stroke="#D1D5DB" strokeWidth="2.5" />
        <ellipse cx="60" cy="37.5" rx="51" ry="27" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <text x="60" y="47" fill="#FFFFFF" fontSize="25" fontWeight="bold" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
          Ford
        </text>
      </svg>
    );
  }

  // Lexus - Sleek Chrome L Inside Dark Shield
  if (normalized.includes('lexus')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#0F172A" stroke="#94A3B8" strokeWidth="2.5" />
        <ellipse cx="50" cy="50" rx="38" ry="32" fill="none" stroke="#E2E8F0" strokeWidth="3" />
        <path d="M34 28 L43 28 L37 68 L67 68 L67 74 L30 74 Z" fill="#F8FAFC" />
        <path d="M41 28 C55 28 66 38 64 54 L58 54 C59 42 51 34 41 34 Z" fill="#F8FAFC" />
      </svg>
    );
  }

  // Porsche - Stuttgart Golden Crest with Red & Black Stripes and Prancing Horse
  if (normalized.includes('porsche')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16 L78 16 C80 16 82 18 82 20 L82 52 C82 74 50 88 50 88 C50 88 18 74 18 52 L18 20 C18 18 20 16 22 16 Z" fill="#D4AF37" stroke="#0F172A" strokeWidth="2.5" />
        <rect x="20" y="18" width="60" height="11" fill="#0F172A" />
        <text x="50" y="27" fill="#F8FAFC" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">PORSCHE</text>
        <rect x="22" y="31" width="26" height="23" fill="#D4AF37" />
        <rect x="52" y="31" width="26" height="23" fill="#B91C1C" />
        <line x1="57" y1="31" x2="57" y2="54" stroke="#0F172A" strokeWidth="2.5" />
        <line x1="67" y1="31" x2="67" y2="54" stroke="#0F172A" strokeWidth="2.5" />
        <rect x="22" y="54" width="26" height="20" fill="#B91C1C" />
        <line x1="27" y1="54" x2="27" y2="74" stroke="#0F172A" strokeWidth="2.5" />
        <line x1="37" y1="54" x2="37" y2="74" stroke="#0F172A" strokeWidth="2.5" />
        <rect x="52" y="54" width="26" height="20" fill="#D4AF37" />
        <path d="M42 42 L58 42 L58 58 C58 64 50 68 50 68 C50 68 42 64 42 58 Z" fill="#FDE047" stroke="#0F172A" strokeWidth="1" />
        <path d="M50 46 C48 46 47 48 48 50 C49 52 47 54 48 58 L52 58 C51 54 53 52 52 50 C51 48 52 46 50 46 Z" fill="#0F172A" />
      </svg>
    );
  }

  // Tesla - Red T Emblem on Dark Slate
  if (normalized.includes('tesla')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M22 28 C38 24 62 24 78 28 L75 35 C62 32 38 32 25 35 Z" fill="#E82127" />
        <path d="M50 34 L56 34 L53 78 L47 78 L44 34 Z" fill="#E82127" />
        <path d="M34 38 C44 35 56 35 66 38 L68 43 C58 40 42 40 32 43 Z" fill="#E82127" />
      </svg>
    );
  }

  // Hyundai - Royal Blue Oval with Italic Chrome H
  if (normalized.includes('hyundai')) {
    return (
      <svg viewBox="0 0 110 80" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="40" rx="51" ry="35" fill="#002C6C" stroke="#CBD5E1" strokeWidth="2" />
        <ellipse cx="55" cy="40" rx="44" ry="28" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M36 24 L44 24 L40 56 L32 56 Z" fill="#FFFFFF" />
        <path d="M74 24 L66 24 L70 56 L78 56 Z" fill="#FFFFFF" />
        <path d="M37 38 L72 42 L70 48 L35 44 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Nissan - Bold Emblem with Red/Chrome Bar
  if (normalized.includes('nissan')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="4.5" />
        <rect x="10" y="41" width="80" height="18" fill="#C0392B" rx="3" />
        <text x="50" y="54" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1" textAnchor="middle" fontFamily="sans-serif">NISSAN</text>
      </svg>
    );
  }

  // Volkswagen - Deep Blue VW Roundel
  if (normalized.includes('volkswagen')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="47" fill="#001E50" stroke="#CBD5E1" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M30 32 L40 58 L46 42 L42 32 Z" fill="#FFFFFF" />
        <path d="M70 32 L60 58 L54 42 L58 32 Z" fill="#FFFFFF" />
        <path d="M36 50 L46 72 L54 72 L64 50 L56 50 L50 64 L44 50 Z" fill="#FFFFFF" />
        <path d="M46 32 L50 44 L54 32 Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Land Rover - Forest Green Oval with Gold Typography
  if (normalized.includes('land rover') || normalized.includes('land-rover')) {
    return (
      <svg viewBox="0 0 120 75" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="37.5" rx="57" ry="33" fill="#005A2B" stroke="#D4AF37" strokeWidth="3" />
        <text x="60" y="34" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="2" textAnchor="middle" fontFamily="sans-serif">LAND</text>
        <text x="60" y="50" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="2" textAnchor="middle" fontFamily="sans-serif">ROVER</text>
      </svg>
    );
  }

  // Chevrolet - Gold Bowtie on Sleek Dark Frame
  if (normalized.includes('chevrolet')) {
    return (
      <svg viewBox="0 0 120 70" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="70" rx="14" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M46 16 L74 16 L74 27 L102 27 L98 43 L74 43 L74 54 L46 54 L46 43 L18 43 L22 27 L46 27 Z" fill="#EAAA00" stroke="#CBD5E1" strokeWidth="2" />
      </svg>
    );
  }

  // Kia - Modern Sleek KIA typography
  if (normalized.includes('kia')) {
    return (
      <svg viewBox="0 0 110 65" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="32.5" rx="52" ry="30" fill="#05141F" stroke="#EA0029" strokeWidth="2.5" />
        <text x="55" y="42" fill="#FFFFFF" fontSize="23" fontWeight="900" letterSpacing="3" textAnchor="middle" fontFamily="sans-serif">KIA</text>
      </svg>
    );
  }

  // Jeep - Iconic Military Style Wordmark
  if (normalized.includes('jeep')) {
    return (
      <svg viewBox="0 0 110 65" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="110" height="65" rx="14" fill="#2E4033" stroke="#CBD5E1" strokeWidth="2" />
        <text x="55" y="43" fill="#FFFFFF" fontSize="23" fontWeight="900" letterSpacing="2" textAnchor="middle" fontFamily="sans-serif">Jeep</text>
      </svg>
    );
  }

  // Volvo - Silver Ring with Diagonal Arrow & Blue Banner
  if (normalized.includes('volvo')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="52" r="38" fill="#0F172A" stroke="#94A3B8" strokeWidth="5" />
        <line x1="72" y1="28" x2="88" y2="12" stroke="#94A3B8" strokeWidth="6" />
        <polyline points="76,12 88,12 88,24" fill="none" stroke="#94A3B8" strokeWidth="6" />
        <rect x="14" y="44" width="68" height="16" fill="#002C6C" rx="2" />
        <text x="48" y="56" fill="#FFFFFF" fontSize="10.5" fontWeight="900" letterSpacing="1" textAnchor="middle" fontFamily="sans-serif">VOLVO</text>
      </svg>
    );
  }

  // Ferrari - Yellow Scuderia Shield with Prancing Horse
  if (normalized.includes('ferrari')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16 L78 16 C80 16 82 18 82 20 L82 52 C82 74 50 88 50 88 C50 88 18 74 18 52 L18 20 C18 18 20 16 22 16 Z" fill="#FFE000" stroke="#1E293B" strokeWidth="2" />
        <rect x="20" y="17" width="20" height="7" fill="#009246" />
        <rect x="40" y="17" width="20" height="7" fill="#FFFFFF" />
        <rect x="60" y="17" width="20" height="7" fill="#CE2B37" />
        <path d="M50 32 C46 36 43 45 46 54 L42 62 L48 60 L50 68 L54 62 L52 54 C58 48 56 38 50 32 Z" fill="#1C1917" />
        <text x="50" y="79" fill="#1C1917" fontSize="8" fontWeight="bold" letterSpacing="1" textAnchor="middle" fontFamily="serif">S F</text>
      </svg>
    );
  }

  // Lamborghini - Black/Gold Shield with Charging Bull
  if (normalized.includes('lamborghini')) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16 L78 16 C80 16 82 18 82 20 L82 52 C82 74 50 88 50 88 C50 88 18 74 18 52 L18 20 C18 18 20 16 22 16 Z" fill="#0F172A" stroke="#D4AF37" strokeWidth="2.5" />
        <text x="50" y="27" fill="#D4AF37" fontSize="5.5" fontWeight="900" letterSpacing="1" textAnchor="middle" fontFamily="sans-serif">LAMBORGHINI</text>
        <path d="M38 46 C44 42 56 42 62 46 C60 52 56 58 50 64 C44 58 40 52 38 46 Z" fill="#D4AF37" />
      </svg>
    );
  }

  // Mazda - Dark Oval with Chrome Flying Wings
  if (normalized.includes('mazda')) {
    return (
      <svg viewBox="0 0 110 80" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="40" rx="49" ry="33" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
        <ellipse cx="55" cy="40" rx="42" ry="26" fill="none" stroke="#E2E8F0" strokeWidth="3" />
        <path d="M30 46 C40 34 50 32 55 42 C60 32 70 34 80 46 C68 38 60 48 55 48 C50 48 42 38 30 46 Z" fill="#E2E8F0" />
      </svg>
    );
  }

  // Generic Premium Emblem Fallback
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="47" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
      <text x="50" y="58" fill="#FF5B26" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
        {name.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
}
