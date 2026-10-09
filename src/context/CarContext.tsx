'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_CARS, Car } from '@/data/mockData';

interface CarContextType {
  cars: Car[];
  favorites: string[];
  compareList: string[];
  addCar: (carData: Omit<Car, 'id' | 'status' | 'viewsCount' | 'inquiriesCount'>) => Car;
  approveCar: (id: string) => void;
  rejectCar: (id: string, reason: string) => void;
  markAsSold: (id: string) => void;
  toggleBoost: (id: string) => void;
  deleteCar: (id: string) => void;
  incrementViews: (id: string) => void;
  incrementInquiries: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const STORAGE_KEY = 'carkino_cars_inventory';
const FAVORITES_KEY = 'carkino_user_favorites';
const COMPARE_KEY = 'carkino_compare_list';

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(ALL_CARS);
  const [favorites, setFavorites] = useState<string[]>(['car-1', 'car-2']);
  const [compareList, setCompareList] = useState<string[]>(['car-1', 'car-4']);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount safely
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCars = localStorage.getItem(STORAGE_KEY);
        if (savedCars) {
          setCars(JSON.parse(savedCars));
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_CARS));
        }

        const savedFavs = localStorage.getItem(FAVORITES_KEY);
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }

        const savedCompare = localStorage.getItem(COMPARE_KEY);
        if (savedCompare) {
          setCompareList(JSON.parse(savedCompare));
        }
      } catch (e) {
        console.warn('Error reading from localStorage', e);
      } finally {
        setIsLoaded(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever cars change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  }, [cars, isLoaded]);

  // Save favorites
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Error saving favorites', e);
    }
  }, [favorites, isLoaded]);

  // Save compare list
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
    } catch (e) {
      console.warn('Error saving compare list', e);
    }
  }, [compareList, isLoaded]);

  // Add a new Car
  const addCar = (carData: Omit<Car, 'id' | 'status' | 'viewsCount' | 'inquiriesCount'>): Car => {
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`,
      status: 'pending',
      viewsCount: 0,
      inquiriesCount: 0,
    };

    setCars((prev) => [newCar, ...prev]);
    return newCar;
  };

  // Approve a pending car
  const approveCar = (id: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'active', rejectionReason: undefined } : c))
    );
  };

  // Reject a car with reason
  const rejectCar = (id: string, reason: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected', rejectionReason: reason } : c))
    );
  };

  // Mark listing as Sold
  const markAsSold = (id: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'sold' } : c))
    );
  };

  // Boost listing
  const toggleBoost = (id: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
  };

  // Delete listing
  const deleteCar = (id: string) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  // Increment views count
  const incrementViews = (id: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, viewsCount: (c.viewsCount || 0) + 1 } : c))
    );
  };

  // Increment inquiries count
  const incrementInquiries = (id: string) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, inquiriesCount: (c.inquiriesCount || 0) + 1 } : c))
    );
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add to compare (Max 3 cars per PRD ENG-3)
  const addToCompare = (id: string): boolean => {
    if (compareList.includes(id)) {
      setCompareList((prev) => prev.filter((item) => item !== id));
      return false;
    }
    if (compareList.length >= 3) {
      alert('You can compare a maximum of 3 cars side-by-side (PRD ENG-3). Please remove one first.');
      return false;
    }
    setCompareList((prev) => [...prev, id]);
    return true;
  };

  // Remove from compare
  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  // Clear compare
  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        favorites,
        compareList,
        addCar,
        approveCar,
        rejectCar,
        markAsSold,
        toggleBoost,
        deleteCar,
        incrementViews,
        incrementInquiries,
        toggleFavorite,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}
