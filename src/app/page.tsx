"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Clock, MapPin, Phone, MessageSquare, Compass } from "lucide-react";

import menuData from "@/data/menu.json";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import MenuItemCard from "@/components/MenuItemCard";
import Reviews from "@/components/Reviews";
import CartDrawer from "@/components/CartDrawer";
import BottomNav from "@/components/BottomNav";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("unlimited");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");

  // Load cart from localStorage if running client-side
  useEffect(() => {
    const savedCart = localStorage.getItem("nellore_royal_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("nellore_royal_cart", JSON.stringify(items));
  };

  const handleAddToCart = (id: string, name: string, price: number, isVeg: boolean) => {
    const existing = cartItems.find((item) => item.id === id);
    if (existing) {
      const updated = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      const updated = [...cartItems, { id, name, price, quantity: 1, isVeg }];
      saveCart(updated);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    // Smooth scroll down to the unified menu dashboard
    const element = document.getElementById("menu");
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

  const handleExploreMenu = () => {
    const element = document.getElementById("menu");
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

  // Filter items in active category
  const filteredItems = menuData.items.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = vegFilter === "all" || 
                       (vegFilter === "veg" && item.isVeg) || 
                       (vegFilter === "nonveg" && !item.isVeg);
    return matchesCategory && matchesSearch && matchesVeg;
  });

  const activeCategoryDetails = menuData.categories.find(c => c.id === activeCategory);

  return (
    <div className="flex-1 bg-dark-bg text-[#f5f5f7] pb-16 md:pb-0 w-full flex flex-col items-center justify-start">
      {/* Dynamic Glow Accents */}
      <div className="glow-spot top-1/4 left-10 w-[500px] h-[500px]"></div>
      <div className="glow-spot top-2/3 right-10 w-[600px] h-[600px]"></div>

      {/* Navigation Shell */}
      <Navbar cartCount={totalCartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Cinematic Hero */}
      <Hero onExploreMenu={handleExploreMenu} />

      {/* ================= SECTION 1: ROYAL MEALS & THALIS PROMOTION ================= */}
      <section id="unlimited-promo" className="py-16 relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-bg w-full">
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Promo Card Image (User's Thali Board display) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-600 to-amber-500 rounded-3xl blur opacity-30 animate-pulse"></div>
              <div 
                className="relative h-[450px] bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl border border-gold-500/10 flex flex-col justify-end p-8"
                style={{
                  backgroundImage: "url('/restaurant/generated/cat_unlimited.png')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="relative z-10">
                  <span className="bg-gold-500 text-dark-bg text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                    Iconic Deal
                  </span>
                  <h3 className="text-3xl font-display font-extrabold text-white leading-tight mb-2">
                    Our Legendary Unlimited Thalis
                  </h3>
                  <p className="text-sm text-gray-300 font-sans font-light leading-relaxed">
                    Captured live inside our restaurant. Experience local South Indian cuisine served unlimited to your heart's content!
                  </p>
                </div>
              </div>
            </div>

            {/* Promo Pitch */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase mb-3 block">
                  Eat Like Royalty
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  Signature Unlimited Thalis
                </h2>
                <div className="w-16 h-[2px] bg-gold-500 rounded-full"></div>
              </div>

              <p className="text-base sm:text-lg text-gray-300 font-sans font-light leading-relaxed">
                Step into a world where flavor has no limits. Our unlimited thalis are carefully structured using traditional family recipes passed down through generations. From fluffy tiffins in the morning to jumbo multi-cuisine feasts, we guarantee you leave happy and satisfied!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-panel border-gold-500/20 p-5 rounded-2xl">
                  <span className="text-xs text-gold-500 font-sans uppercase font-bold">Pure Veg</span>
                  <h4 className="text-lg font-display font-bold text-white mt-1">Veg Thali</h4>
                  <div className="text-2xl font-display font-black text-gold-500 mt-2">₹179</div>
                  <p className="text-[11px] text-gray-400 mt-1">Unlimited rice, dal, curries, curd, sweet, papad.</p>
                </div>

                <div className="glass-panel border-gold-500/20 p-5 rounded-2xl">
                  <span className="text-xs text-amber-500 font-sans uppercase font-bold">Andhra Hot</span>
                  <h4 className="text-lg font-display font-bold text-white mt-1">Non-Veg Thali</h4>
                  <div className="text-2xl font-display font-black text-gold-500 mt-2">₹299</div>
                  <p className="text-[11px] text-gray-400 mt-1">Unlimited non-veg gravies, rice, chicken curry, sweet.</p>
                </div>

                <div className="glass-panel border-gold-500/40 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gold-500 text-dark-bg text-[8px] font-sans font-black px-2 py-0.5 uppercase tracking-wide rounded-bl-lg">
                    Best Value
                  </div>
                  <span className="text-xs text-gold-500 font-sans uppercase font-bold">Grand Feast</span>
                  <h4 className="text-lg font-display font-bold text-white mt-1">Jumbo Thali</h4>
                  <div className="text-2xl font-display font-black text-gold-500 mt-2">₹499</div>
                  <p className="text-[11px] text-gray-400 mt-1">Biryani, Chicken dry, Mutton curry, fish, curds, sweets.</p>
                </div>
              </div>

              <button
                onClick={() => handleCategorySelect("unlimited")}
                className="bg-white/5 border border-white/10 hover:border-gold-500/30 hover:bg-gold-500/5 text-white hover:text-gold-500 px-6 py-3.5 rounded-xl text-sm font-sans font-bold tracking-wide transition-all duration-300 cursor-pointer"
              >
                Order Unlimited Meals Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: INTEGRATED ROYAL MENU DASHBOARD ================= */}
      <section id="menu" className="py-16 relative z-10 bg-dark-bg border-y border-white/5 w-full">
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase mb-2">
              Order Online Instantly
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3 tracking-wide">
              Royal Interactive Menu
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 rounded-full mb-4"></div>
            <p className="text-sm text-gray-400 font-sans font-light max-w-xl">
              Tap any category below or in the grid to load our fresh highway delicacies, custom thalis, and hot starters.
            </p>
          </div>

          {/* Mobile Horizontal Selector Bar (lg:hidden) */}
          <div className="lg:hidden w-full overflow-x-auto pb-4 mb-6 flex items-center space-x-3 scrollbar-none snap-x snap-mandatory">
            {menuData.categories.map((category) => {
              const isActive = activeCategory === category.id;
              const categoryImages: Record<string, string> = {
                unlimited: "/restaurant/generated/cat_unlimited.png",
                specials: "/restaurant/generated/cat_specials.png",
                biryani: "/restaurant/generated/cat_biryani.png",
                seafood: "/restaurant/generated/cat_seafood.png",
                tandoori: "/restaurant/generated/cat_tandoori.png",
                "nonveg-starters": "/restaurant/generated/cat_nonveg_starters.png",
                "veg-starters": "/restaurant/generated/cat_veg_starters.png",
                "veg-curries": "/restaurant/generated/cat_veg_curries.png",
                "nonveg-curries": "/restaurant/generated/cat_nonveg_curries.png",
                soups: "/restaurant/generated/cat_soups.png",
                breads: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
                desserts: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
              };
              const bgImage = categoryImages[category.id] || category.image;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative rounded-xl py-3 px-4.5 flex items-center space-x-2.5 shrink-0 overflow-hidden border transition-all duration-300 snap-start cursor-pointer ${
                    isActive
                      ? "border-gold-500 shadow-md shadow-gold-500/15 scale-102"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive ? "bg-black/85" : "bg-black/75"
                  }`} />
                  <span className={`relative z-10 text-[11px] font-sans font-bold uppercase tracking-wider ${isActive ? "text-gold-500" : "text-gray-300"}`}>
                    {category.name.split(" (")[0]}
                  </span>
                  {isActive && (
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-gold-500 animate-glow-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop & Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Categories Sidebar (lg:col-span-5 - Desktop only, Sticky 2-Column Grid) */}
            <div className="hidden lg:grid lg:col-span-5 sticky top-28 self-start grid-cols-2 gap-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-1.5 custom-scrollbar">
              <span className="text-[10px] tracking-widest text-gray-500 font-sans uppercase font-bold col-span-2 mb-2 block">
                Category Selection
              </span>
              {menuData.categories.map((category) => {
                const isActive = activeCategory === category.id;
                const categoryImages: Record<string, string> = {
                  unlimited: "/restaurant/generated/cat_unlimited.png",
                  specials: "/restaurant/generated/cat_specials.png",
                  biryani: "/restaurant/generated/cat_biryani.png",
                  seafood: "/restaurant/generated/cat_seafood.png",
                  tandoori: "/restaurant/generated/cat_tandoori.png",
                  "nonveg-starters": "/restaurant/generated/cat_nonveg_starters.png",
                  "veg-starters": "/restaurant/generated/cat_veg_starters.png",
                  "veg-curries": "/restaurant/generated/cat_veg_curries.png",
                  "nonveg-curries": "/restaurant/generated/cat_nonveg_curries.png",
                  soups: "/restaurant/generated/cat_soups.png",
                  breads: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
                  desserts: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
                };
                const bgImage = categoryImages[category.id] || category.image;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative rounded-3xl h-56 lg:h-64 xl:h-72 flex flex-col justify-end text-left overflow-hidden border transition-all duration-500 group cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                      isActive
                        ? "border-gold-500 shadow-gold-500/20"
                        : "border-white/5 hover:border-gold-500/35 bg-[#08080a]"
                    }`}
                  >
                    {/* Visual Section Photo Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    
                    {/* Dark gradient overlay for rich contrast */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive 
                        ? "bg-black/40"
                        : "bg-black/55 group-hover:bg-black/35"
                    }`} />
                    
                    {/* Active Radial Golden Sheen */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 via-transparent to-black/95 pointer-events-none" />
                    )}

                    {/* Indicator Gilded Corner Tab */}
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-gold-600 to-gold-400 text-dark-bg text-[8px] font-sans font-black px-3 py-1 uppercase tracking-widest rounded-bl-xl shadow-md z-20">
                        Selected
                      </div>
                    )}

                    {/* Frosted Glass Footer Label Block (Extremely Premium!) */}
                    <div className="w-full bg-dark-bg/60 backdrop-blur-md border-t border-white/5 p-3.5 relative z-10 flex flex-col justify-end transition-all duration-500 group-hover:bg-dark-bg/85">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm shrink-0 transition-transform duration-500 ${isActive ? "scale-125 text-gold-500 rotate-12" : "text-gray-400 group-hover:text-gold-500 group-hover:scale-110 group-hover:rotate-12"}`}>
                          🍽️
                        </span>
                        <span className={`text-[12px] sm:text-xs font-display font-extrabold uppercase tracking-widest transition-colors ${isActive ? "text-gold-500" : "text-gray-300 group-hover:text-white"}`}>
                          {category.name}
                        </span>
                      </div>
                      
                      {/* Explore details */}
                      <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/5">
                        <span className={`text-[8px] font-sans tracking-widest uppercase transition-colors duration-300 ${
                          isActive ? "text-gold-400 font-bold" : "text-gray-500 group-hover:text-gold-400/80"
                        }`}>
                          {isActive ? "Viewing Section" : "Explore Dishes"}
                        </span>
                        
                        <span className={`text-[8px] font-sans font-bold transition-all duration-300 ${
                          isActive ? "text-gold-500 translate-x-0" : "text-gray-600 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}>
                          ➔
                        </span>
                      </div>
                    </div>

                    {/* Left Active Accent Line */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gold-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Menu Shelf (lg:col-span-7) */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                {activeCategoryDetails && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Header bar and filtering tools */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-5 gap-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center space-x-2">
                          <span className="text-gold-500">🍽️</span>
                          <span>{activeCategoryDetails.name}</span>
                        </h2>
                        <p className="text-xs text-gray-400 font-sans font-light mt-1">
                          {activeCategoryDetails.description}
                        </p>
                      </div>

                      {/* Filter Tools Panel */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        {/* Search input */}
                        <div className="relative w-full sm:w-56">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search dishes..."
                            className="glass-input pl-9 py-2 w-full text-xs"
                          />
                        </div>

                        {/* Veg filter toggles */}
                        <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/5 w-full sm:w-auto shrink-0">
                          <button
                            onClick={() => setVegFilter("all")}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              vegFilter === "all"
                                ? "bg-gradient-to-r from-gold-600 to-gold-400 text-dark-bg"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setVegFilter("veg")}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              vegFilter === "veg"
                                ? "bg-green-600 text-white"
                                : "text-gray-400 hover:text-green-500"
                            }`}
                          >
                            Veg
                          </button>
                          <button
                            onClick={() => setVegFilter("nonveg")}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              vegFilter === "nonveg"
                                ? "bg-red-600 text-white"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          >
                            Non-Veg
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dish Cards Grid */}
                    {filteredItems.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400 font-sans font-light text-sm">
                          No matching dishes found in this category. Try adjusting your filters.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredItems.map((item) => {
                          const cartItem = cartItems.find((i) => i.id === item.id);
                          const quantity = cartItem ? cartItem.quantity : 0;
                          return (
                            <MenuItemCard
                              key={item.id}
                              item={item}
                              quantityInCart={quantity}
                              onAddToCart={() =>
                                handleAddToCart(item.id, item.name, item.price, item.isVeg)
                              }
                              onUpdateQuantity={(q) => handleUpdateQuantity(item.id, q)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: THE AMBIENCE STORY ================= */}
      <section className="py-16 relative overflow-hidden bg-dark-bg w-full">
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Elegant 4-Box interactive Features Showcase (No poor/rotated photos!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Box 1: Hygiene */}
              <div className="glass-panel glass-panel-hover border-gold-500/20 rounded-3xl p-6 flex flex-col space-y-3 justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-gold-500/10 text-gold-500 rounded-2xl border border-gold-500/20">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <span className="bg-gold-500/10 text-gold-400 text-[8px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Certified
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1.5">5-Star Hygiene</h4>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                    Uncompromising cleanliness, fresh ingredients, and mineral purified water.
                  </p>
                </div>
              </div>

              {/* Box 2: AC Comfort */}
              <div className="glass-panel glass-panel-hover border-gold-500/20 rounded-3xl p-6 flex flex-col space-y-3 justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-gold-500/10 text-gold-500 rounded-2xl border border-gold-500/20">
                    <span className="text-2xl">❄️</span>
                  </div>
                  <span className="bg-gold-500/10 text-gold-400 text-[8px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Comfort
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1.5">A/C Fine Dining</h4>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                    Fully air-conditioned ambient seating styled with botanical hanging flora.
                  </p>
                </div>
              </div>

              {/* Box 3: Highway stop */}
              <div className="glass-panel glass-panel-hover border-gold-500/20 rounded-3xl p-6 flex flex-col space-y-3 justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-gold-500/10 text-gold-500 rounded-2xl border border-gold-500/20">
                    <span className="text-2xl">🧭</span>
                  </div>
                  <span className="bg-gold-500/10 text-gold-400 text-[8px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Landmark
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1.5">Travelers' Oasis</h4>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                    Conveniently situated directly adjacent to the busy Nellore Highway Road.
                  </p>
                </div>
              </div>

              {/* Box 4: Parking */}
              <div className="glass-panel glass-panel-hover border-gold-500/20 rounded-3xl p-6 flex flex-col space-y-3 justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 bg-gold-500/10 text-gold-500 rounded-2xl border border-gold-500/20">
                    <span className="text-2xl">🚗</span>
                  </div>
                  <span className="bg-gold-500/10 text-gold-400 text-[8px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Ample Space
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1.5">Secure Free Parking</h4>
                  <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                    Spacious, safe, and easily accessible parking lots for all standard cars.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase">
                Fine Dining Ambience
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-wide">
                Luxury Highway Experience
              </h2>
              <div className="w-16 h-[2px] bg-gold-500 rounded-full"></div>
              <p className="text-sm sm:text-base text-gray-300 font-sans font-light leading-relaxed">
                Strategically located on the busy **Nellore Highway Road**, Hotel Nellore Royal is a highly popular landmark. Known for our modern, well-decorated interior with green hanging plants, comfortable ambient lighting, and fully air-conditioned spaces, we offer travelers and families a pristine oasis to stop, relax, and savor unparalleled multi-cuisine delights.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 text-sm text-gray-300 font-sans font-light">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <span>Open Daily: 11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span>Rajupalem, Nellore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CUSTOMER REVIEWS ================= */}
      <Reviews />

      {/* ================= SECTION 6: CONTACT & MAP SECTION ================= */}
      <section id="contact" className="py-16 relative overflow-hidden bg-gradient-to-t from-dark-bg to-dark-bg/95 border-t border-white/5 w-full">
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-gold-500 font-sans text-xs font-bold tracking-widest uppercase mb-3 block">
                  Find & Call Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wide">
                  Contact Operational Coordinates
                </h2>
                <div className="w-16 h-[2px] bg-gold-500 rounded-full"></div>
              </div>

              <div className="space-y-6 font-sans text-sm font-light text-gray-300">
                {/* Owner details */}
                <div className="flex items-start space-x-4 glass-panel border-gold-500/10 p-5 rounded-2xl">
                  <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-white mb-1">Direct Call & Orders</h4>
                    <p className="text-gold-500 font-semibold text-base mb-1">+91 9515428438</p>
                    <p className="text-xs text-gray-400">Ask for Harish (Owner/Manager)</p>
                  </div>
                </div>

                {/* Location details */}
                <div className="flex items-start space-x-4 glass-panel border-gold-500/10 p-5 rounded-2xl">
                  <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-white mb-1">Physical Address</h4>
                    <p className="leading-relaxed">
                      Near Brahmaiah Engineering College, <br />
                      Rajupalem, Nellore Highway Road
                    </p>
                  </div>
                </div>

                {/* Opening Timings */}
                <div className="flex items-start space-x-4 glass-panel border-gold-500/10 p-5 rounded-2xl">
                  <div className="p-3 bg-gold-500/10 rounded-xl text-gold-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-white mb-1">Kitchen Open Timings</h4>
                    <p className="leading-relaxed">11:00 AM to 11:00 PM</p>
                    <p className="text-xs text-gray-400">Serving warm and fresh highway thalis and hot starters all day.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder */}
            <div className="lg:col-span-7 h-[480px] relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-600 to-amber-500 rounded-3xl blur opacity-25"></div>
              <a
                href="https://maps.app.goo.gl/KJPDyGXZ3yzUEMSKA"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-full glass-panel border-gold-500/20 hover:border-gold-500/50 rounded-3xl overflow-hidden flex flex-col justify-between block group/map transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5 cursor-pointer"
              >
                
                {/* 3D Stylized Isometric Highway Map Graphic */}
                <div className="absolute inset-0 bg-[#060608] flex flex-col justify-between p-6 overflow-hidden">
                  {/* Modern 3D Isometric SVG Graphic */}
                  <div className="relative w-full h-[280px] flex items-center justify-center pointer-events-none">
                    {/* Isometric Grid Background */}
                    <div className="absolute inset-0 opacity-25" style={{
                      backgroundImage: "radial-gradient(#d4af37 1.5px, transparent 1.5px), linear-gradient(30deg, transparent 49%, rgba(212,175,55,0.15) 50%, transparent 51%), linear-gradient(-30deg, transparent 49%, rgba(212,175,55,0.15) 50%, transparent 51%)",
                      backgroundSize: "30px 30px, 60px 34px, 60px 34px"
                    }} />

                    <svg className="w-full h-full max-w-[450px]" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Ambient Glows */}
                      <circle cx="250" cy="180" r="130" fill="url(#goldGlow)" opacity="0.3" />
                      <circle cx="290" cy="220" r="60" fill="url(#pinSpotlight)" opacity="0.45" />

                      {/* 3D Isometric Highway Deck */}
                      <g>
                        {/* Highway Base Support Structure */}
                        <polygon points="40,265 440,145 440,185 40,305" fill="url(#highwayBaseGradient)" stroke="#d4af37" strokeWidth="1" />
                        {/* Highway Surface */}
                        <polygon points="40,260 440,140 440,145 40,265" fill="url(#highwaySurfaceGradient)" />
                        {/* Glowing Gold Road Lanes */}
                        <line x1="70" y1="251" x2="410" y2="149" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="14 14" opacity="0.9" />
                        {/* Side Barrier Neon Rails */}
                        <polygon points="40,260 440,140 440,137 40,257" fill="#d4af37" opacity="0.8" />
                        {/* Traffic Beam Lights (Animated Look) */}
                        <circle cx="150" cy="227" r="4" fill="#00ffff" filter="blur(1px)" />
                        <path d="M150,227 L180,217" stroke="url(#trafficCyan)" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="320" cy="176" r="4" fill="#ffd700" filter="blur(1px)" />
                        <path d="M320,176 L290,186" stroke="url(#trafficGold)" strokeWidth="3" strokeLinecap="round" />
                      </g>

                      {/* Brahmaiah College Indicator */}
                      <g transform="translate(90, 130)">
                        {/* Semi-transparent 3D Block */}
                        <polygon points="0,30 60,12 110,30 50,48" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />
                        <polygon points="0,30 50,48 50,78 0,60" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" />
                        <polygon points="50,48 110,30 110,60 50,78" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
                        <text x="55" y="52" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="bold" fontFamily="var(--font-sans)" textAnchor="middle" transform="skewY(-15)">
                          Engineering College
                        </text>
                      </g>

                      {/* Hotel Nellore Royal - 3D Isometric Landmark Building */}
                      <g transform="translate(240, 180)">
                        {/* Base shadow with radar glow */}
                        <ellipse cx="40" cy="50" rx="70" ry="30" fill="url(#radarGlow)" />

                        {/* Building Blocks */}
                        {/* Left Wing (Primary Dining Area) */}
                        <g>
                          {/* Top Roof Face */}
                          <polygon points="0,0 45,-15 90,0 45,15" fill="#f5d670" stroke="#ffd700" strokeWidth="1" />
                          {/* Left Wall (Ambient Lighted Side) */}
                          <polygon points="0,0 45,15 45,60 0,45" fill="url(#wallGlowDark)" stroke="#d4af37" strokeWidth="0.8" />
                          {/* Right Wall (Ambient Lighted Front) */}
                          <polygon points="45,15 90,0 90,45 45,60" fill="url(#wallGlowLight)" stroke="#d4af37" strokeWidth="0.8" />
                        </g>

                        {/* Luxury AC Dining - Glass Facade (3D projection) */}
                        <g>
                          {/* Large Illuminated Cyan Window */}
                          <polygon points="12,23 38,31 38,55 12,47" fill="url(#cyanGlassGlow)" stroke="#00f3ff" strokeWidth="1.2" />
                          {/* Window reflection lines */}
                          <line x1="20" y1="28" x2="20" y2="47" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                          <line x1="30" y1="32" x2="30" y2="51" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                          {/* Glowing entrance door */}
                          <polygon points="20,38 30,41 30,54 20,51" fill="#ffffff" filter="blur(0.5px)" opacity="0.95" />
                        </g>

                        {/* Botanical Green Hanging Plants climbing rooftop */}
                        <g transform="translate(45, -15)">
                          <polygon points="-40,15 -10,5 15,13 -15,23" fill="url(#botanicalIvy)" stroke="#4ade80" strokeWidth="0.5" />
                          <polygon points="-20,20 -5,15 5,18 -10,23" fill="#059669" />
                          {/* Hanging vines */}
                          <path d="M-30,20 Q-32,35 -30,45" stroke="#10b981" strokeWidth="1" fill="none" />
                          <path d="M-10,23 Q-8,38 -10,48" stroke="#059669" strokeWidth="1" fill="none" />
                          <path d="M5,21 Q3,33 5,42" stroke="#10b981" strokeWidth="0.7" fill="none" />
                        </g>

                        {/* Grand Gilded Neon Restaurant Signboard */}
                        <g transform="translate(45, -20)">
                          {/* Double Support Pillars */}
                          <line x1="-15" y1="5" x2="-15" y2="20" stroke="#d4af37" strokeWidth="1.5" />
                          <line x1="15" y1="-5" x2="15" y2="10" stroke="#d4af37" strokeWidth="1.5" />
                          {/* Neon Signboard Plate */}
                          <polygon points="-35,-15 35,-25 35,-5 -35,5" fill="#0c0c0e" stroke="#ffdb70" strokeWidth="2" />
                          {/* Glowing border ring */}
                          <polygon points="-33,-13 33,-23 33,-7 -33,3" fill="none" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="4 2" />
                          {/* Gilded branding text */}
                          <text x="0" y="-7" fill="#ffdb70" fontSize="9" fontWeight="900" fontFamily="var(--font-serif)" textAnchor="middle" transform="skewY(-8)" filter="drop-shadow(0px 0px 3px rgba(212,175,55,0.8))">
                            NELLORE ROYAL
                          </text>
                        </g>
                      </g>

                      {/* Giant 3D Glowing Map Pin Floating */}
                      <g className="map-pin-3d" transform="translate(285, 140)">
                        {/* Floor Pulsing Radar Rings */}
                        <ellipse cx="0" cy="70" rx="18" ry="8" fill="none" stroke="#00f3ff" strokeWidth="2.5" opacity="0.9" />
                        <ellipse cx="0" cy="70" rx="30" ry="13" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />
                        <ellipse cx="0" cy="70" rx="45" ry="19" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.3" />

                        {/* Floating Pin Shadow on rooftop */}
                        <ellipse cx="0" cy="65" rx="10" ry="5" fill="rgba(0,0,0,0.5)" filter="blur(3px)" />

                        {/* Giant 3D Teardrop Pin */}
                        {/* Pin Left Side Face */}
                        <path d="M0,0 C-22,0 -32,22 -32,38 C-32,58 0,73 0,73 C0,73 0,73 0,73 C0,73 0,58 0,38 C0,22 -11,0 0,0 Z" fill="url(#pinGlowDark)" stroke="#fff2a3" strokeWidth="0.8" />
                        {/* Pin Right Side Face */}
                        <path d="M0,0 C22,0 32,22 32,38 C32,58 0,73 0,73 C0,73 0,73 0,73 C0,73 0,58 0,38 C0,22 11,0 0,0 Z" fill="url(#pinGlowLight)" stroke="#fff2a3" strokeWidth="0.8" />
                        {/* Inner Glowing Lens */}
                        <circle cx="0" cy="32" r="11" fill="#040404" stroke="#ffdb70" strokeWidth="2" />
                        <circle cx="0" cy="32" r="6" fill="#00f3ff" filter="drop-shadow(0px 0px 4px #00f3ff)" />
                      </g>

                      {/* Definitions for all premium gradients */}
                      <defs>
                        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
                          <stop offset="50%" stopColor="#d4af37" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="pinSpotlight" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffdb70" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#040404" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.7" />
                          <stop offset="70%" stopColor="#d4af37" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="highwayBaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#433719" />
                          <stop offset="100%" stopColor="#1a150a" />
                        </linearGradient>
                        <linearGradient id="highwaySurfaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22222a" />
                          <stop offset="100%" stopColor="#131317" />
                        </linearGradient>
                        <linearGradient id="trafficCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00f0ff" />
                          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="trafficGold" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffd700" stopOpacity="0" />
                          <stop offset="100%" stopColor="#ffd700" />
                        </linearGradient>
                        <linearGradient id="wallGlowDark" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#b8860b" />
                          <stop offset="100%" stopColor="#433004" />
                        </linearGradient>
                        <linearGradient id="wallGlowLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffdb70" />
                          <stop offset="100%" stopColor="#a88324" />
                        </linearGradient>
                        <linearGradient id="cyanGlassGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e0faff" />
                          <stop offset="50%" stopColor="#00f0ff" />
                          <stop offset="100%" stopColor="#006f8a" />
                        </linearGradient>
                        <linearGradient id="botanicalIvy" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a7f3d0" />
                          <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                        <linearGradient id="pinGlowDark" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a88324" />
                          <stop offset="100%" stopColor="#3c2c0f" />
                        </linearGradient>
                        <linearGradient id="pinGlowLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffea85" />
                          <stop offset="100%" stopColor="#d4af37" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* UI Action Row */}
                  <div className="flex flex-col items-center text-center px-4 mb-2 z-10">
                    <h4 className="text-base font-display font-bold text-white tracking-wide mb-1 flex items-center space-x-2">
                      <span className="text-gold-500">📍</span>
                      <span>Hotel Nellore Royal GPS Map</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 font-sans font-light leading-relaxed max-w-sm mb-4">
                      Conveniently located near Brahmaiah Engineering College, Rajupalem. Tap below to navigate directly.
                    </p>
                    <div
                      className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-bg px-6 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-300 shadow-md shadow-gold-500/10 hover:shadow-gold-500/30 active:scale-98 cursor-pointer inline-block"
                    >
                      Open Live Navigation
                    </div>
                  </div>
                </div>

                {/* Glassy overlay coordinates bar */}
                <div className="relative z-10 glass-panel border-t border-gold-500/10 p-4 flex items-center justify-between text-xs text-gray-300 font-sans">
                  <span>📍 GPS: Rajupalem Highway Road, Nellore</span>
                  <span className="text-gold-500 font-semibold uppercase">Highway Landmark</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark-bg border-t border-white/5 py-12 relative z-10 w-full">
        <div className="max-w-[96%] xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-8 text-center md:text-left">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-display font-bold tracking-wider text-white">
                HOTEL <span className="text-gold-500">NELLORE ROYAL</span>
              </span>
            </div>

            {/* Social handles */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/hotelnelloreroyal?igsh=MXZsaGJ5OGdqYjJzaQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="Instagram handle"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="Facebook handle"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919515428438"
                className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:text-gold-500 transition-colors"
                aria-label="WhatsApp chat"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans font-light">
            <p>© {new Date().getFullYear()} Hotel Nellore Royal Multi-Cuisine. All rights reserved.</p>
            <p>
              Managed by <span className="text-gold-500/80 font-medium">Harish</span> | Crafted for Fast Highway Online Orders.
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sliding Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* App-like Mobile Bottom Nav */}
      <BottomNav cartCount={totalCartCount} onCartClick={() => setIsCartOpen(true)} />
    </div>
  );
}
