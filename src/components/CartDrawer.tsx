"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ClipboardCheck, Phone, MapPin, User, FileText } from "lucide-react";
import confetti from "canvas-confetti";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingFee = subtotal > 0 ? 30 : 0;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + packagingFee + gst;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format WhatsApp Message
    const formattedItems = cartItems
      .map((item) => `* ${item.name} × ${item.quantity} (₹${item.price * item.quantity})`)
      .join("\n");

    const orderText = `*New Food Order* 🍽️\n\n` +
      `*Customer Details:*\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📍 *Address:* ${formData.address}\n\n` +
      `*Ordered Items:*\n${formattedItems}\n\n` +
      `*Bill Details:*\n` +
      `• Subtotal: ₹${subtotal}\n` +
      `• GST (5%): ₹${gst}\n` +
      `• Packaging & Delivery: ₹${packagingFee}\n` +
      `💰 *Grand Total:* ₹${grandTotal}\n\n` +
      `📝 *Order Notes:* ${formData.notes || "None"}\n\n` +
      `------------\n` +
      `Order placed via Nellore Royal eCommerce platform.`;

    // WhatsApp URL
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/919515428438?text=${encodedText}`;

    // Celebrate order!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d4af37", "#ffffff", "#e9d99f", "#0c0c0c"],
    });

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset Drawer State
    onClearCart();
    setCheckoutStep("cart");
    setFormData({ name: "", phone: "", address: "", notes: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Slider Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-gold-500/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gold-500">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-display font-bold text-white tracking-wide">
                {checkoutStep === "cart" ? "Your Cart Selection" : "Complete Order"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutStep === "cart" ? (
            /* ================= CART VIEW ================= */
            <>
              {cartItems.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-6">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    Your Cart is Empty
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xs mb-8 font-light">
                    Browse our royal specialties and add savory delicacies to start your feast!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-gold-600 to-gold-400 text-dark-bg font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 cursor-pointer"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl relative hover:border-gold-500/20 transition-all duration-300 group"
                      >
                        {/* Item Details */}
                        <div className="flex-1 pr-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-2 h-2 rounded-full inline-block ${
                                item.isVeg ? "bg-green-500" : "bg-red-500"
                              }`}
                            />
                            <h4 className="text-sm font-semibold text-white group-hover:text-gold-500 transition-colors duration-300">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 font-light">
                            ₹{item.price} each
                          </p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center space-x-3 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="text-right pl-4 flex flex-col items-end">
                          <span className="text-sm font-semibold text-white">
                            ₹{item.price * item.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-500 p-1 mt-1 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Footer Billing */}
                  <div className="bg-white/[0.02] border-t border-white/5 px-6 py-5 space-y-4">
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="text-white">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & GST (5%)</span>
                        <span className="text-white">₹{gst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packaging & Delivery</span>
                        <span className="text-white">₹{packagingFee}</span>
                      </div>
                      <div className="border-t border-white/5 my-2 pt-2 flex justify-between text-base font-bold text-white">
                        <span>Grand Total</span>
                        <span className="text-gold-500">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep("checkout")}
                      className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-bg font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/30 cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* ================= CHECKOUT FORM VIEW ================= */
            <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div className="bg-white/5 border border-gold-500/10 p-4 rounded-xl">
                  <h4 className="text-xs font-semibold text-gold-500 tracking-wider uppercase mb-1">
                    Delivery Coordinates
                  </h4>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    Fill out details below. The order details will format dynamically and load inside WhatsApp.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-gold-500" />
                      <span>Full Name <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="glass-input"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-gold-500" />
                      <span>Phone Number <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit number"
                      className="glass-input"
                    />
                  </div>

                  {/* Address Input */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      <span>Delivery Address <span className="text-red-500">*</span></span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat, building, area, near landmark"
                      className="glass-input resize-none"
                    />
                  </div>

                  {/* Order Notes */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs text-gray-400 font-semibold flex items-center space-x-1">
                      <FileText className="w-3.5 h-3.5 text-gold-500" />
                      <span>Cooking Instructions / Notes</span>
                    </label>
                    <textarea
                      rows={2}
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="e.g., Make it extra spicy, no onions, etc."
                      className="glass-input resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer Action */}
              <div className="bg-white/[0.02] border-t border-white/5 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Back to Edit Cart
                  </button>
                  <span className="font-bold text-white text-base">
                    Total: <span className="text-gold-500">₹{grandTotal}</span>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-bg font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/35 cursor-pointer"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
