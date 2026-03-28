"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  CreditCard, 
  Wallet, 
  Truck, 
  ShieldCheck,
  CheckCircle2,
  Leaf,
  ChevronRight
} from 'lucide-react';
import { Header } from '@/src/components/shared/Header';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { formatCurrency, cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/src/providers/CartProvider';

export default function Payment() {
  const router = useRouter();
  const { cartItems, selectedItemsIds, clearCart } = useCart();
  const [step, setStep] = useState<'payment' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'momo' | 'vnpay'>('cod');

  const selectedItems = cartItems.filter(item => selectedItemsIds.has(item.id));
  const subtotal = selectedItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
  const serviceFee = 5000;
  const deliveryFee = 15000;
  const total = subtotal + serviceFee + deliveryFee;
  const totalCo2 = selectedItems.reduce((sum, item) => sum + item.impactCo2 * item.quantity, 0);

  const handleConfirmPayment = () => {
    setStep('success');
    // In a real app, we'd only clear selected items
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen nature-gradient flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card variant="glass" className="p-10 text-center border border-primary/20" hover={false}>
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-primary w-16 h-16" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-4">ĐẶT HÀNG THÀNH CÔNG!</h1>
            <p className="text-on-surface-variant font-medium mb-8">
              Mã đơn hàng: <span className="text-primary font-black">#SB-9021</span><br />
              Cảm ơn bạn đã cùng SaveABite bảo vệ môi trường.
            </p>
            
            <div className="bg-surface-container-highest rounded-3xl p-6 mb-8 text-left space-y-4 border border-outline-variant/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Thời gian lấy hàng</span>
                <span className="font-black text-primary">18:30 - 19:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Địa điểm</span>
                <span className="font-black text-on-surface">Artisan Bakery, Phố Huế</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">CO2 Tiết kiệm</span>
                <Badge variant="primary" className="flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> {totalCo2.toFixed(1)}kg
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={() => router.push('/')} className="w-full h-14 text-lg font-black tracking-tight">
                VỀ TRANG CHỦ
              </Button>
              <Link href="/orders" className="block w-full">
                <Button variant="ghost" className="w-full text-on-surface-variant font-bold">XEM CHI TIẾT ĐƠN HÀNG</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="gap-2 group text-on-surface-variant hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </Button>
          <h1 className="text-3xl font-black tracking-tighter text-on-surface uppercase">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Info */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-on-surface">Thông tin giao hàng</h2>
              </div>
              <Card variant="glass" className="p-6 border border-outline-variant/30" hover={false}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Họ và tên</label>
                      <Input placeholder="Nguyễn Văn A" className="h-12 rounded-xl bg-surface-container-highest/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Số điện thoại</label>
                      <Input placeholder="090 123 4567" className="h-12 rounded-xl bg-surface-container-highest/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Địa chỉ nhận hàng</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                      <Input placeholder="Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội" className="h-12 pl-12 rounded-xl bg-surface-container-highest/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Ghi chú cho cửa hàng</label>
                    <Input placeholder="Ví dụ: Đừng bỏ hành nhé!" className="h-12 rounded-xl bg-surface-container-highest/50" />
                  </div>
                </div>
              </Card>
            </section>

            {/* Payment Methods */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-on-surface">Phương thức thanh toán</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'cod', name: 'Tiền mặt', icon: Wallet, desc: 'Thanh toán khi nhận hàng' },
                  { id: 'momo', name: 'Ví MoMo', icon: CreditCard, desc: 'Thanh toán qua ứng dụng' },
                  { id: 'vnpay', name: 'VNPAY', icon: ShieldCheck, desc: 'Thanh toán qua ngân hàng' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "p-5 rounded-3xl border-2 text-left transition-all group",
                      paymentMethod === method.id 
                        ? "bg-primary/5 border-primary shadow-lg shadow-primary/10" 
                        : "bg-surface-container-highest/30 border-outline-variant/30 hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                      paymentMethod === method.id ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface-variant group-hover:bg-primary/20"
                    )}>
                      <method.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-on-surface mb-1">{method.name}</h3>
                    <p className="text-xs text-on-surface-variant font-medium">{method.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="space-y-6">
            <Card variant="glass" className="p-6 border border-outline-variant/30 sticky top-24" hover={false}>
              <h2 className="text-xl font-bold text-on-surface mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-on-surface-variant font-medium">
                      <span className="font-black text-primary mr-2">{item.quantity}x</span>
                      {item.name}
                    </span>
                    <span className="font-bold text-on-surface">{formatCurrency(item.discountPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-outline-variant/30 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Tạm tính</span>
                  <span className="font-bold text-on-surface">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Phí dịch vụ</span>
                  <span className="font-bold text-on-surface">{formatCurrency(serviceFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Phí vận chuyển</span>
                  <span className="font-bold text-on-surface">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-outline-variant/30">
                  <span className="text-lg font-black text-on-surface">Tổng cộng</span>
                  <span className="text-2xl font-black text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black text-primary uppercase tracking-wider">Tiết kiệm xanh</span>
                </div>
                <p className="text-sm font-bold text-primary">Bạn đang giảm thiểu {totalCo2.toFixed(1)}kg CO2 cho trái đất!</p>
              </div>

              <Button 
                onClick={handleConfirmPayment}
                className="w-full h-16 text-lg font-black tracking-tight rounded-2xl shadow-xl shadow-primary/20"
              >
                XÁC NHẬN THANH TOÁN
              </Button>
              
              <p className="text-[10px] text-center text-on-surface-variant mt-4 font-medium uppercase tracking-widest">
                Bằng việc nhấn thanh toán, bạn đồng ý với điều khoản của SaveABite
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
