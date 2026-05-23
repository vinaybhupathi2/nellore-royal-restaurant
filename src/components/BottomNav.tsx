"use client";

import React from "react";
import { Home, UtensilsCrossed, ShoppingBag, PhoneCall } from "lucide-react";

interface BottomNavProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function BottomNav({ cartCount, onCartClick }: BottomNavProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-t border-gold-500/10 px-6 py-2 pb-5 flex items-center justify-between text-gray-400">
      {/* Home Tab */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex flex-col items-center justify-center space-y-1 hover:text-gold-500 transition-colors"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-sans font-medium">Home</span>
      </button>

      {/* Menu Tab */}
      <button
        onClick={() => handleScrollTo("menu")}
        className="flex flex-col items-center justify-center space-y-1 hover:text-gold-500 transition-colors"
      >
        <UtensilsCrossed className="w-5 h-5" />
        <span className="text-[10px] font-sans font-medium">Menu</span>
      </button>

      {/* Cart Tab */}
      <button
        onClick={onCartClick}
        className="relative flex flex-col items-center justify-center space-y-1 hover:text-gold-500 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-dark-bg">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium">Cart</span>
      </button>

      {/* Call/Contact Tab */}
      <a
        href="tel:+919515428438"
        className="flex flex-col items-center justify-center space-y-1 hover:text-gold-500 transition-colors"
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[10px] font-sans font-medium">Call Us</span>
      </a>
    </div>
  );
}
