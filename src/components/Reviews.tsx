"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  item: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Suresh Kumar",
    role: "Highway Traveler / Food Blogger",
    rating: 5,
    content: "Whenever I drive down the Nellore Highway, stopping at Hotel Nellore Royal is a strict ritual! Their Natukodi Pulusu with Ragimudda is absolute heaven—fiery, tangy, and incredibly flavorful. Five stars!",
    item: "Natukodi Pulusu + Ragimudda",
  },
  {
    id: 2,
    name: "Pranitha Reddy",
    role: "Local Fine-Dining Critic",
    rating: 5,
    content: "Their Unlimited Jumbo Non-Veg Thali at ₹499 is pure royalty. The sheer variety—Apollo fish, prawns roast, aromatic chicken dum biryani, and traditional sweets—is outstanding. Truly the best value and taste in Nellore!",
    item: "Unlimited Jumbo Non-Veg Thali",
  },
  {
    id: 3,
    name: "Vikram Aduri",
    role: "Software Engineer",
    rating: 5,
    content: "The online WhatsApp checkout is incredibly fast and smooth! I ordered their Special Chicken Dum Biryani for a family get-together, filled out the form, placed the order in seconds, and it arrived hot and fragrant.",
    item: "Nellore Special Chicken Dum Biryani",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section id="reviews" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Title */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase mb-3">
            Royal Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Loved By Our Guests
          </h2>
          <div className="w-16 h-[2px] bg-gold-500 rounded-full"></div>
        </div>

        {/* Carousel Slider Card */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full glass-panel border-gold-500/20 p-8 md:p-12 rounded-3xl shadow-2xl relative text-left"
            >
              {/* Quote Icon overlay */}
              <Quote className="absolute right-8 top-8 w-16 h-16 text-gold-500/10 pointer-events-none" />

              {/* Rating stars */}
              <div className="flex items-center space-x-1 mb-6 text-gold-500">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500" />
                ))}
              </div>

              {/* Main Quote Content */}
              <p className="text-lg md:text-xl text-gray-200 font-sans leading-relaxed mb-8 font-light italic">
                “{current.content}”
              </p>

              {/* Tagged Dish Badge */}
              <div className="inline-flex items-center bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-xs font-sans text-gold-400 font-medium mb-6">
                Loved dish: {current.item}
              </div>

              {/* Guest Profile Details */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-base font-display font-bold text-white tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-xs font-sans text-gray-400 mt-0.5">
                    {current.role}
                  </p>
                </div>
                <div className="text-gold-500/60 font-sans text-xs tracking-wider uppercase font-bold">
                  Verified Visit
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-500 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-sans font-medium text-gray-500">
            {index + 1} / {testimonials.length}
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:text-gold-500 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
