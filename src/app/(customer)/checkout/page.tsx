"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { 
  ArrowLeft, 
  ShoppingBag, 
  Leaf, 
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Check
} from 'lucide-react';
import { Header } from '@/src/components/shared/Header';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { formatCurrency, cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/src/providers/CartProvider';

export default function Checkout() {
  const router = useRouter();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    selectedItemsIds, 
    toggleSelectItem, 
    toggleSelectAllItems 
  } = useCart();

  const selectedItems = cartItems.filter(item => selectedItemsIds.has(item.id));
  const selectedTotalPrice = selectedItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
  const selectedCo2 = selectedItems.reduce((sum, item) => sum + item.impactCo2 * item.quantity, 0);

  const handlePayment = () => {
    if (selectedItems.length === 0) return;
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="gap-2 group text-on-surface-variant hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </Button>
          <h1 className="text-3xl font-black tracking-tighter text-on-surface uppercase">Giỏ hàng của bạn</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-8">
            {/* Select All Header */}
            <div className="flex items-center gap-4 px-6 py-4 bg-surface-container-highest/30 rounded-3xl border border-outline-variant/30 backdrop-blur-sm">
              <button 
                onClick={toggleSelectAllItems}
                className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  selectedItemsIds.size === cartItems.length && cartItems.length > 0
                    ? "bg-primary border-primary text-on-primary" 
                    : "border-outline-variant hover:border-primary"
                )}
              >
                {selectedItemsIds.size === cartItems.length && cartItems.length > 0 && <Check className="w-4 h-4 stroke-[3]" />}
              </button>
              <span className="text-sm font-bold text-on-surface">Chọn tất cả ({cartItems.length} sản phẩm)</span>
            </div>

            {/* Cart List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} variant="glass" className="p-5 border border-outline-variant/30" hover={false}>
                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Checkbox */}
                    <button 
                      onClick={() => toggleSelectItem(item.id)}
                      className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                        selectedItemsIds.has(item.id) 
                          ? "bg-primary border-primary text-on-primary" 
                          : "border-outline-variant hover:border-primary"
                      )}
                    >
                      {selectedItemsIds.has(item.id) && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>

                    {/* Product Info */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden nature-gradient border border-outline-variant/30 shrink-0 shadow-inner">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-bold text-lg text-on-surface line-clamp-1 leading-tight">{item.name}</h4>
                          <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">{item.merchantName}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-2 hover:bg-error/10 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-3 bg-surface-container-highest rounded-2xl px-3 py-1.5 border border-outline-variant/30">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-base font-black text-on-surface w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-black text-primary block">{formatCurrency(item.discountPrice * item.quantity)}</span>
                          <span className="text-xs text-on-surface-variant line-through opacity-50 font-bold">{formatCurrency(item.originalPrice * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="sticky bottom-8 z-10 pt-4">
              <Card variant="glass" className="p-8 border border-primary/20 shadow-2xl shadow-primary/20 backdrop-blur-xl" hover={false}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Tổng thanh toán</span>
                      <span className="text-4xl font-black text-primary tracking-tighter">{formatCurrency(selectedTotalPrice)}</span>
                    </div>
                    {selectedItems.length > 0 && (
                      <div className="hidden sm:flex flex-col gap-1 bg-primary/10 px-5 py-3 rounded-3xl border border-primary/20">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-primary" />
                          <span className="text-xs font-black text-primary uppercase tracking-wider">Tác động xanh</span>
                        </div>
                        <span className="text-sm font-bold text-primary">-{selectedCo2.toFixed(1)}kg CO2</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handlePayment}
                    disabled={selectedItems.length === 0}
                    className="w-full md:w-auto h-20 px-16 text-2xl font-black tracking-tight gap-4 shadow-2xl shadow-primary/40 rounded-3xl transition-transform active:scale-95"
                  >
                    THANH TOÁN ({selectedItems.length}) <ArrowRight className="w-8 h-8" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-32 h-32 bg-surface-container-highest/50 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-outline-variant/30">
              <ShoppingBag className="w-16 h-16 text-on-surface-variant/20" />
            </div>
            <h2 className="text-3xl font-black text-on-surface mb-3 tracking-tight">GIỎ HÀNG ĐANG TRỐNG</h2>
            <p className="text-on-surface-variant mb-10 font-medium max-w-xs mx-auto">Hãy chọn những món ăn ngon để cùng SaveABite bảo vệ môi trường nhé!</p>
            <Button onClick={() => router.push('/')} size="lg" className="h-16 px-12 text-lg font-black rounded-2xl">
              TIẾP TỤC MUA SẮM
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
