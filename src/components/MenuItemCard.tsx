"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, Minus, Flame, Sparkles, Infinity, 
  Fish, Coffee, Soup, Egg, Compass, Cake, Utensils, Leaf 
} from "lucide-react";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  isVeg: boolean;
  isUnlimited?: boolean;
  tag?: string;
  description: string;
  image?: string;
}

interface MenuItemCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAddToCart: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

function getDishIcon(item: MenuItem) {
  if (item.category === "seafood") return <Fish className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />;
  if (item.category === "desserts") return <Cake className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />;
  if (item.category === "soups") return <Soup className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />;
  if (item.category === "breads") return <Coffee className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />;
  if (item.category === "unlimited") return <Utensils className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />;
  
  if (item.isVeg) {
    return <Leaf className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />;
  } else {
    return <Flame className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300 animate-pulse" />;
  }
}

export default function MenuItemCard({
  item,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
}: MenuItemCardProps) {
  const isSpicy = item.description.toLowerCase().includes("spicy") || item.description.toLowerCase().includes("fiery");
  const dishIcon = getDishIcon(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel glass-panel-hover rounded-2xl relative overflow-hidden flex flex-col justify-between group h-full cursor-default p-5 border border-white/5 hover:border-gold-500/20 transition-all duration-350"
    >
      <div className="flex flex-col space-y-3">
        {/* Header Row: Veg Indicator + Name + Category Icon */}
        <div className="flex items-start justify-between space-x-3">
          <div className="flex items-center space-x-2.5 min-w-0">
            {/* Veg/Non-Veg neat indicator box */}
            <div className={`w-5 h-5 border rounded flex items-center justify-center shrink-0 ${
              item.isVeg ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? "bg-green-500" : "bg-red-500"
              }`} />
            </div>

            <h3 className="text-sm sm:text-base font-display font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-gold-500 truncate leading-tight">
              {item.name}
            </h3>
          </div>

          {/* Glowing Vector Icon badge */}
          <div className={`p-1.5 rounded-lg border shrink-0 transition-all duration-300 ${
            item.isVeg 
              ? "bg-green-500/5 border-green-500/10 text-green-500 group-hover:bg-green-500/10" 
              : "bg-red-500/5 border-red-500/10 text-red-500 group-hover:bg-red-500/10"
          }`}>
            {dishIcon}
          </div>
        </div>

        {/* Badges/Tags Row */}
        {(item.tag || item.isUnlimited || isSpicy) && (
          <div className="flex flex-wrap gap-1.5">
            {item.tag && (
              <span className="inline-flex items-center space-x-1 bg-gold-500/10 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-gold-400 uppercase tracking-wider border border-gold-500/20">
                <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                <span>{item.tag}</span>
              </span>
            )}
            {item.isUnlimited && (
              <span className="inline-flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-amber-400 uppercase tracking-wider border border-amber-500/20">
                <Infinity className="w-2.5 h-2.5 text-amber-400" />
                <span>Unlimited</span>
              </span>
            )}
            {isSpicy && (
              <span className="inline-flex items-center space-x-0.5 bg-red-500/10 px-2 py-0.5 rounded text-[8px] font-sans font-bold text-red-400 uppercase tracking-wider border border-red-500/20">
                <Flame className="w-2.5 h-2.5 text-red-400" />
                <span>Spicy</span>
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-400 font-sans font-light leading-relaxed line-clamp-2 h-9">
          {item.description}
        </p>
      </div>

      {/* Pricing & Add Button Action */}
      <div className="pt-3.5 border-t border-white/5 flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-[8px] tracking-wider text-gray-500 font-sans uppercase">Price</span>
          <span className="text-base font-display font-black text-gold-500">
            ₹{item.price}
          </span>
        </div>

        {/* Counter Add-to-Cart Trigger */}
        {quantityInCart === 0 ? (
          <button
            onClick={onAddToCart}
            className="bg-white/5 border border-white/10 hover:border-gold-500/35 hover:bg-gold-500/5 text-white hover:text-gold-500 px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans tracking-wide transition-all duration-300 transform active:scale-95 flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-gold-500/10 px-2 py-1 rounded-lg border border-gold-500/20">
            <button
              onClick={() => onUpdateQuantity(quantityInCart - 1)}
              className="text-gold-500 hover:text-gold-300 p-0.5 rounded transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-sans font-bold text-white w-4 text-center">
              {quantityInCart}
            </span>
            <button
              onClick={() => onUpdateQuantity(quantityInCart + 1)}
              className="text-gold-500 hover:text-gold-300 p-0.5 rounded transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Corner Ambient Glow Accent */}
      <div className="absolute -bottom-12 -left-12 w-20 h-20 bg-gold-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-gold-500/10 transition-all duration-500" />
    </motion.div>
  );
}
