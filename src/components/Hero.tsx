"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Sparkles, Star, Award } from "lucide-react";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Cinematic Image (User's Restaurant Facade) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-10000 ease-out"
        style={{
          backgroundImage: "url('./restaurant/hero_bg.png')",
        }}
      />

      {/* Luxury Radial Dark & Gold Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-dark-bg via-dark-bg/85 to-transparent"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Floating Sparkles & Accents */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{
            y: [-15, 15, -15],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[18%] left-10 lg:left-24 p-4 glass-panel border-gold-500/20 rounded-2xl shadow-xl flex items-center space-x-3 text-white max-w-xs"
        >
          <div className="p-2.5 bg-gold-500/20 rounded-xl text-gold-500">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gold-500 tracking-wider font-sans uppercase">Signature Recipe</p>
            <p className="text-sm font-semibold font-display">Nellore Special Natukodi Pulusu</p>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [15, -15, 15],
            x: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-10 lg:left-24 p-4 glass-panel border-gold-500/20 rounded-2xl shadow-xl flex items-center space-x-3 text-white max-w-xs hidden md:flex"
        >
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-500">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-400 tracking-wider font-sans uppercase">Top Rated Choice</p>
            <p className="text-sm font-semibold font-display">Unlimited Jumbo Thali (₹499)</p>
          </div>
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Column: Headings & Statistics */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center text-center md:text-left">
            {/* Welcome Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/25 px-4 py-1.5 rounded-full text-gold-400 mb-6 font-sans text-xs font-bold uppercase tracking-widest self-center md:self-start"
            >
              <ChefHat className="w-4 h-4" />
              <span>Welcome to Fine Dining Royalty</span>
            </motion.div>

            {/* Premium Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              Savor the Real <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-gold-500 via-gold-300 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
                Taste of Nellore
              </span>
            </motion.h1>

            {/* Emotional Food Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-2xl text-gray-300 font-sans italic mb-10 max-w-2xl font-light leading-relaxed border-l-2 border-gold-500/40 pl-4 mx-auto md:mx-0"
            >
              “One bite can make your day unforgettable. Come hungry, leave happy. Taste that brings you back again.”
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-5"
            >
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-bg font-bold px-8 py-4 rounded-xl text-base tracking-wide shadow-xl shadow-gold-500/10 hover:shadow-gold-500/35 transition-all duration-300 transform hover:-translate-y-0.5 group cursor-pointer"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-base border border-white/10 hover:border-gold-500/30 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Menu</span>
              </button>
            </motion.div>

            {/* Floating Mini Statistics Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/5 pt-8"
            >
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-gold-500">4.8 ★</span>
                <span className="text-xs text-gray-400 font-sans tracking-wide uppercase mt-1 font-medium">5000+ Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">100%</span>
                <span className="text-xs text-gray-400 font-sans tracking-wide uppercase mt-1 font-medium">Fresh Spices</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-gold-500">100+</span>
                <span className="text-xs text-gray-400 font-sans tracking-wide uppercase mt-1 font-medium">Tasty Delicacies</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-display font-bold text-white">Super Fast</span>
                <span className="text-xs text-gray-400 font-sans tracking-wide uppercase mt-1 font-medium">Highway Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Floating Showcase Platter */}
          <div className="col-span-1 lg:col-span-5 hidden lg:flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Rotating Gold Orbit Rings */}
              <div className="absolute inset-0 border border-gold-500/10 rounded-full animate-spin-slow pointer-events-none scale-105" />
              <div className="absolute inset-6 border border-gold-500/15 rounded-full animate-spin-slow pointer-events-none scale-95" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              
              {/* Glowing Radial Backdrop Accent */}
              <div className="absolute w-72 h-72 bg-gradient-to-br from-gold-500/20 to-amber-500/5 rounded-full blur-[60px] opacity-70 animate-pulse pointer-events-none" />

              {/* Main Floating 3D Showcase Card */}
              <motion.div
                animate={{
                  y: [-12, 12, -12],
                  rotate: [-0.5, 0.5, -0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[340px] h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-gold-500/25 shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Background image of the Unlimited Thali (unhidden and fully visible!) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 z-0"
                  style={{ backgroundImage: "url('./restaurant/generated/cat_unlimited.png')" }}
                />
                
                {/* Gradient Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 group-hover:via-black/30 transition-all duration-500 z-10" />

                {/* Gilded active outline spotlight */}
                <div className="absolute inset-0 border border-gold-500/0 group-hover:border-gold-500/40 rounded-3xl transition-all duration-500 z-20" />

                {/* Top Badge Overlay */}
                <div className="relative z-20 p-4">
                  <span className="bg-gradient-to-r from-gold-600 to-gold-400 text-dark-bg text-[9px] font-sans font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Signature Platter
                  </span>
                </div>

                {/* Premium Frosted Glass bottom details block */}
                <div className="relative z-20 mx-4 mb-4 bg-dark-bg/75 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col space-y-1 group-hover:bg-dark-bg/85 transition-colors duration-500">
                  <span className="text-[9px] font-sans text-gold-500 uppercase tracking-widest font-black">Chef's Choice</span>
                  <h3 className="text-lg font-display font-extrabold text-white tracking-wide group-hover:text-gold-500 transition-colors duration-300">
                    Unlimited Royal Meal
                  </h3>
                  <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-white/5">
                    <span className="text-[11px] font-sans font-light text-gray-400">Authentic South Feast</span>
                    <span className="text-base font-display font-black text-gold-500">₹499 Only</span>
                  </div>
                </div>

                {/* Glow border spotlight */}
                <div className="absolute left-0 bottom-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30" />
              </motion.div>

              {/* Orbital Mini Float Badges */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 p-3 bg-dark-bg/90 border border-gold-500/30 rounded-2xl flex items-center space-x-2 shadow-xl z-20 backdrop-blur-md"
              >
                <span className="text-base">🔥</span>
                <span className="text-[9px] font-sans font-bold text-white tracking-wider uppercase">Highway #1 Choice</span>
              </motion.div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 p-3 bg-dark-bg/90 border border-gold-500/30 rounded-2xl flex items-center space-x-2 shadow-xl z-20 backdrop-blur-md"
              >
                <span className="text-base">⭐️</span>
                <span className="text-[9px] font-sans font-bold text-white tracking-wider uppercase">4.9/5 Rating</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elegant bottom scroll-down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border border-gold-500/40 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
