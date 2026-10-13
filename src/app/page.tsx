'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TopBrandsSection from '@/components/TopBrandsSection';
import FeaturedCarsSection from '@/components/FeaturedCarsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ShopByCategorySection from '@/components/ShopByCategorySection';
import AutoPartsSection from '@/components/AutoPartsSection';
import SellYourCarSection from '@/components/SellYourCarSection';
import BuyerAdvantagesSection from '@/components/BuyerAdvantagesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsBanner from '@/components/StatsBanner';
import ArticlesSection from '@/components/ArticlesSection';
import FinalCtaSection from '@/components/FinalCtaSection';
import Footer from '@/components/Footer';

import CarDetailModal from '@/components/CarDetailModal';
import ValuationModal from '@/components/ValuationModal';
import PostAdModal from '@/components/PostAdModal';
import EmiCalculatorModal from '@/components/EmiCalculatorModal';

import { useCars } from '@/context/CarContext';
import { Car } from '@/data/mockData';

export default function Home() {
  const { cars, favorites, toggleFavorite, incrementViews } = useCars();

  // State for search filters
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<{
    make: string;
    model: string;
    price: string;
    location: string;
  }>({
    make: '',
    model: '',
    price: '',
    location: '',
  });

  // Modals state
  const [selectedCarForModal, setSelectedCarForModal] = useState<Car | null>(null);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [valuationInitialModel, setValuationInitialModel] = useState('');
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);

  // Filtered cars computation from live active cars
  const activeMarketplaceCars = useMemo(() => {
    return cars.filter((c) => c.status === 'active');
  }, [cars]);

  const featuredCarsList = useMemo(() => {
    const featuredOnly = activeMarketplaceCars.filter((c) => c.featured);
    return featuredOnly.length > 0 ? featuredOnly : activeMarketplaceCars.slice(0, 4);
  }, [activeMarketplaceCars]);

  const filteredCars = useMemo(() => {
    return activeMarketplaceCars.filter((car) => {
      // Filter by brand pill if selected
      if (selectedBrand && car.make.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Filter by category if selected
      if (
        selectedCategory &&
        car.bodyType.toLowerCase().replace(/\s+/g, '-') !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      // Filter by search form filters
      if (searchFilters.make && car.make.toLowerCase() !== searchFilters.make.toLowerCase()) {
        return false;
      }
      if (
        searchFilters.location &&
        !car.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      ) {
        return false;
      }
      if (searchFilters.price) {
        if (searchFilters.price === 'under-30k' && car.price >= 30000) return false;
        if (searchFilters.price === '30k-60k' && (car.price < 30000 || car.price > 60000)) return false;
        if (searchFilters.price === '60k-100k' && (car.price < 60000 || car.price > 100000)) return false;
        if (searchFilters.price === 'over-100k' && car.price <= 100000) return false;
      }
      return true;
    });
  }, [activeMarketplaceCars, selectedBrand, selectedCategory, searchFilters]);

  const handleCarClick = (car: Car) => {
    incrementViews(car.id);
    setSelectedCarForModal(car);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#FF5B26] selection:text-white">
      {/* 1. Sticky Navigation */}
      <Navbar
        onSearchClick={() => {
          const el = document.getElementById('home');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onPostAdClick={() => setIsPostAdOpen(true)}
        onFinancingClick={() => setIsEmiOpen(true)}
      />

      <main>
        {/* 2. Hero Section with Integrated Search Widget */}
        <HeroSection
          onSearchFilters={(filters) => setSearchFilters(filters)}
          onValuationClick={(modelName) => {
            setValuationInitialModel(modelName || 'Mercedes GLE 350');
            setIsValuationOpen(true);
          }}
        />

        {/* 3. Popular Brands */}
        <TopBrandsSection
          selectedBrand={selectedBrand}
          onSelectBrand={(brand) => setSelectedBrand(brand)}
        />

        {/* 4. Handpicked Premium Cars (Dark Navy Section) */}
        <FeaturedCarsSection
          cars={
            selectedBrand || selectedCategory || searchFilters.make
              ? filteredCars.length > 0 ? filteredCars : activeMarketplaceCars.slice(0, 4)
              : featuredCarsList
          }
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onCarClick={handleCarClick}
        />

        {/* Active filter reset notice if filtered */}
        {(selectedBrand || selectedCategory || searchFilters.make) && (
          <div className="bg-[#0D162B] text-center pb-8">
            <button
              onClick={() => {
                setSelectedBrand('');
                setSelectedCategory('');
                setSearchFilters({ make: '', model: '', price: '', location: '' });
              }}
              className="text-xs text-[#FF5B26] hover:text-white underline font-semibold transition-colors"
            >
              Showing filtered results ({filteredCars.length} matches). Click here to reset filters.
            </button>
          </div>
        )}

        {/* 5. Why Choose CarKino */}
        <WhyChooseUsSection />

        {/* 6. Shop by Category */}
        <ShopByCategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />

        {/* 7. Auto Parts & Spare Parts Marketplace */}
        <AutoPartsSection />

        {/* 8. Sell Your Car & Valuation Tool */}
        <SellYourCarSection
          onOpenValuationModal={(model) => {
            setValuationInitialModel(model);
            setIsValuationOpen(true);
          }}
          onPostAdClick={() => setIsPostAdOpen(true)}
        />

        {/* 8. Why Car Buyers Choose Us (Dark Luxury Advantage Section) */}
        <BuyerAdvantagesSection />

        {/* 9. Real Stories / Testimonials */}
        <TestimonialsSection />

        {/* 10. Numbers That Drive Us (Stats Banner) */}
        <StatsBanner />

        {/* 11. Latest Articles & Insights */}
        <ArticlesSection />

        {/* 12. Final Call-to-Action Banner */}
        <FinalCtaSection />
      </main>

      {/* 13. Comprehensive Footer */}
      <Footer />

      {/* Modals */}
      <CarDetailModal
        car={selectedCarForModal}
        onClose={() => setSelectedCarForModal(null)}
        isFavorite={selectedCarForModal ? favorites.includes(selectedCarForModal.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <ValuationModal
        initialModel={valuationInitialModel}
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
        onProceedToPostAd={() => setIsPostAdOpen(true)}
      />

      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
      />

      <EmiCalculatorModal
        isOpen={isEmiOpen}
        onClose={() => setIsEmiOpen(false)}
        initialPrice={55000}
      />
    </div>
  );
}
