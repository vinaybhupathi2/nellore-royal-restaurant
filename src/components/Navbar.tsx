"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Crown, MapPin } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-dark-bg/85 backdrop-blur-md border-b border-gold-500/10 shadow-lg shadow-black/40"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gold-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-2 bg-gradient-to-br from-gold-600 to-gold-400 rounded-xl text-dark-bg">
                  <Crown className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-display font-bold tracking-wider text-white group-hover:text-gold-500 transition-colors duration-300">
                  NELLORE ROYAL
                </span>
                <span className="text-[10px] tracking-widest text-gold-500 font-sans uppercase -mt-1 font-semibold">
                  Multi Cuisine Restaurant
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-x-12 lg:gap-x-20 xl:gap-x-28 font-sans font-semibold text-xs tracking-[0.4em] uppercase text-gray-300">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, "hero")}
                className="hover:text-gold-500 transition-colors duration-300 relative py-2.5 px-5 hover:bg-gold-500/5 rounded-xl after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Home
              </a>
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, "menu")}
                className="hover:text-gold-500 transition-colors duration-300 relative py-2.5 px-5 hover:bg-gold-500/5 rounded-xl after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Our Menu
              </a>
              <a
                href="#unlimited-promo"
                onClick={(e) => handleNavClick(e, "unlimited-promo")}
                className="hover:text-gold-500 transition-colors duration-300 relative py-2.5 px-5 hover:bg-gold-500/5 rounded-xl after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Royal Meals
              </a>
              <a
                href="#reviews"
                onClick={(e) => handleNavClick(e, "reviews")}
                className="hover:text-gold-500 transition-colors duration-300 relative py-2.5 px-5 hover:bg-gold-500/5 rounded-xl after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="hover:text-gold-500 transition-colors duration-300 relative py-2.5 px-5 hover:bg-gold-500/5 rounded-xl after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                Contact
              </a>
            </div>

            {/* Cart & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-500 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-300 group cursor-pointer"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-dark-bg animate-glow-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA */}
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, "menu")}
                className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-bg px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 shadow-md shadow-gold-500/10 hover:shadow-gold-500/30 hover:-translate-y-0.5"
              >
                <span>Order Now</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-b border-gold-500/10 shadow-xl py-4 px-6 animate-slide-up">
            <div className="flex flex-col space-y-6 font-sans font-medium text-base text-gray-300">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, "hero")}
                className="hover:text-gold-500 py-1 transition-colors"
              >
                Home
              </a>
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, "menu")}
                className="hover:text-gold-500 py-1 transition-colors"
              >
                Our Menu
              </a>
              <a
                href="#unlimited-promo"
                onClick={(e) => handleNavClick(e, "unlimited-promo")}
                className="hover:text-gold-500 py-1 transition-colors"
              >
                Royal Meals
              </a>
              <a
                href="#reviews"
                onClick={(e) => handleNavClick(e, "reviews")}
                className="hover:text-gold-500 py-1 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="hover:text-gold-500 py-1 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, "menu")}
                className="flex justify-center text-center bg-gradient-to-r from-gold-600 to-gold-400 text-dark-bg py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Order Online Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
