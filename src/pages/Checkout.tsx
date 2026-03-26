/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  Leaf, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Header } from '../components/shared/Header';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'cash'>('momo');

  const handlePayment = () => {
    setStep('success');
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
                  <Leaf className="w-3 h-3" /> 2.4kg
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={() => navigate('/')} className="w-full h-14 text-lg font-black tracking-tight">
                VỀ TRANG CHỦ
              </Button>
              <Button variant="ghost" className="w-full text-on-surface-variant font-bold">XEM CHI TIẾT ĐƠN HÀNG</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="gap-2 group text-on-surface-variant hover:text-primary"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </Button>
          <h1 className="text-3xl font-black tracking-tighter text-on-surface">XÁC NHẬN ĐƠN HÀNG</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                THÔNG TIN NHẬN HÀNG
              </h3>
              <Card variant="highest" className="p-6 border border-outline-variant/30" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-black text-on-surface">Tự đến lấy hàng (Pickup)</h4>
                      <Badge variant="primary">Khuyên dùng</Badge>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium mb-4">
                      Artisan Bakery & Cafe • 123 Phố Huế, Hai Bà Trưng, Hà Nội
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-widest">
                      <Clock className="w-4 h-4" /> Khung giờ: 18:30 - 19:30, Hôm nay
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                PHƯƠNG THỨC THANH TOÁN
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'momo', name: 'Ví MoMo', icon: Wallet },
                  { id: 'vnpay', name: 'VNPay', icon: CreditCard },
                  { id: 'cash', name: 'Tiền mặt', icon: Truck },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      'p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4',
                      paymentMethod === method.id 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                        : 'border-outline-variant/30 bg-surface-container-highest hover:border-primary/30'
                    )}
                  >
                    <method.icon className={cn('w-8 h-8', paymentMethod === method.id ? 'text-primary' : 'text-on-surface-variant')} />
                    <span className={cn('font-bold text-sm', paymentMethod === method.id ? 'text-primary' : 'text-on-surface-variant')}>
                      {method.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                GHI CHÚ ĐƠN HÀNG
              </h3>
              <Input placeholder="Ví dụ: Không lấy túi nilon, hâm nóng giúp mình..." className="h-20" />
            </section>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
                <h3 className="text-xl font-black tracking-tight mb-8 uppercase tracking-widest">TÓM TẮT ĐƠN HÀNG</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden nature-gradient border border-outline-variant/30">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkbGggX4BowTY2QkdnUHGj9Zb5jLdnv8QllKvZW_rZamUaS9tTFNTipL5KrpbBHN5bjA-hpqLbHRdMnD1ywFTUqkBFUsrx_v9NG5oYwHE5McbATMRrpd2VOcdQnufTeFPoJ22Jx3Ocinq7p0KWHx7axHKRHqpqtMNDu-TuVfiHeNqluNznZsN58pzZVbtQoEe34bw_cdm0UbVMrkYBmzpsGzphj8lt0ecI2rcnRhZ_UkD9m8tnzZSfFkysbWZyY_bOJ2AO3uWyvw" 
                        alt="Surprise Bag" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-on-surface mb-1">Túi Bất Ngờ - Bakery</h4>
                      <p className="text-xs text-on-surface-variant mb-2">Artisan Bakery & Cafe</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-on-surface">x2 suất</span>
                        <span className="font-black text-primary">{formatCurrency(70000)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-outline-variant/30 mb-8">
                  <div className="flex justify-between text-sm font-medium text-on-surface-variant">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(70000)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-on-surface-variant">
                    <span>Phí dịch vụ</span>
                    <span>{formatCurrency(2000)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-primary">
                    <span>Giảm giá SaveABite</span>
                    <span>-{formatCurrency(2000)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                    <span className="text-lg font-black text-on-surface">TỔNG CỘNG</span>
                    <span className="text-3xl font-black text-primary">{formatCurrency(70000)}</span>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-3 mb-8">
                  <Leaf className="text-primary w-6 h-6" />
                  <p className="text-xs font-bold text-primary leading-tight">
                    Đơn hàng này giúp giảm thiểu <span className="text-lg">2.4kg</span> khí thải CO2. Bạn là người hùng của hành tinh!
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handlePayment}
                    className="w-full h-16 text-xl font-black tracking-tight gap-3 shadow-2xl shadow-primary/30"
                  >
                    THANH TOÁN NGAY <ArrowRight className="w-6 h-6" />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Bảo mật theo tiêu chuẩn quốc tế
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
