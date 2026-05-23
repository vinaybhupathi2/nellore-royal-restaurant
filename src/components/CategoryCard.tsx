"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Flame, Coffee, Fish, Egg, FlameKindling, Soup, Compass, Cake, Utensils } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

// Map categories to modern, premium food/beverage icons to replace images beautifully
const categoryIcons: Record<string, React.ReactNode> = {
  unlimited: <Compass className="w-8 h-8 text-gold-500" />,
  specials: <Sparkles className="w-8 h-8 text-gold-500" />,
  biryani: <Flame className="w-8 h-8 text-gold-500 animate-pulse" />,
  seafood: <Fish className="w-8 h-8 text-gold-500" />,
  tandoori: <FlameKindling className="w-8 h-8 text-gold-500" />,
  "nonveg-starters": <Egg className="w-8 h-8 text-gold-500" />,
  "veg-starters": <Sparkles className="w-8 h-8 text-gold-500" />,
  "veg-curries": <Soup className="w-8 h-8 text-gold-500" />,
  "nonveg-curries": <Flame className="w-8 h-8 text-gold-500" />,
  soups: <Soup className="w-8 h-8 text-gold-500" />,
  breads: <Coffee className="w-8 h-8 text-gold-500" />,
  desserts: <Cake className="w-8 h-8 text-gold-500" />,
};

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const icon = categoryIcons[category.id] || <Utensils className="w-8 h-8 text-gold-500" />;

  // Map category ids to the generated image paths
  const categoryImages: Record<string, string> = {
    unlimited: "./restaurant/generated/cat_unlimited.png",
    specials: "./restaurant/generated/cat_specials.png",
    biryani: "./restaurant/generated/cat_biryani.png",
    seafood: "./restaurant/generated/cat_seafood.png",
    tandoori: "./restaurant/generated/cat_tandoori.png",
    "nonveg-starters": "./restaurant/generated/cat_nonveg_starters.png",
    "veg-starters": "./restaurant/generated/cat_veg_starters.png",
    "veg-curries": "./restaurant/generated/cat_veg_curries.png",
    "nonveg-curries": "./restaurant/generated/cat_nonveg_curries.png",
    soups: "./restaurant/generated/cat_soups.png",
    breads: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
    desserts: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  };

  const bgImage = categoryImages[category.id] || category.image;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`relative rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-500 group flex flex-col justify-between h-56 ${
        isActive
          ? "border-2 border-gold-500 shadow-lg shadow-gold-500/15"
          : "border border-white/5 hover:border-gold-500/30"
      }`}
    >
      {/* Background Image with Hover Zoom effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      
      {/* Dark Overlay for excellent text contrast */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isActive 
          ? "bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/85 to-[#0a0a0c]/40 opacity-95"
          : "bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-[#0a0a0c]/30 opacity-90 group-hover:opacity-80"
      }`} />

      {/* Decorative Glow Spot inside card */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-500 z-10 ${
        isActive ? "bg-gold-500/20" : "bg-gold-500/5 group-hover:bg-gold-500/15"
      }`} />

      {/* Top Section: Icon & Small Label */}
      <div className="flex items-start justify-between relative z-10">
        <div className={`p-3 rounded-2xl transition-all duration-500 backdrop-blur-md ${
          isActive ? "bg-gold-500/20 text-gold-400 border border-gold-500/30" : "bg-black/40 text-gold-500 border border-white/5 group-hover:bg-gold-500/10"
        }`}>
          {icon}
        </div>
        <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] tracking-widest text-gold-500/80 font-sans uppercase font-extrabold border border-white/5">
          Royal Selection
        </span>
      </div>

      {/* Mid & Bottom Section: Text Details */}
      <div className="mt-4 flex-1 flex flex-col justify-end relative z-10">
        <h3 className="text-xl font-display font-extrabold text-white tracking-wide mb-1.5 transition-colors duration-300 group-hover:text-gold-400">
          {category.name}
        </h3>
        <p className="text-xs text-gray-300 font-sans font-light line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>

        {/* Expand Action Indicator */}
        <div className="flex items-center text-xs font-sans text-gold-500 font-semibold group-hover:text-gold-400 transition-colors">
          <span>{isActive ? "Viewing Items" : "Explore Delicacies"}</span>
          <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 ${
            isActive ? "rotate-90 text-gold-400" : "group-hover:translate-x-1"
          }`} />
        </div>
      </div>
    </motion.div>
  );
}
