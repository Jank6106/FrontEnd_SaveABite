/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Leaf, ArrowLeft, ShieldCheck, Info, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Header } from '../components/shared/Header';
import { mockFoodItems, mockReviews } from '../mock/data';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../lib/utils';
import { useState } from 'react';
import { motion } from 'motion/react';

export const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockFoodItems.find((i) => i.id === id) || mockFoodItems[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 gap-2 group text-on-surface-variant hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Images & Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-video rounded-[40px] overflow-hidden nature-gradient border border-outline-variant/30 shadow-2xl">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <Badge variant="tertiary" className="py-2 px-4 text-sm backdrop-blur-md bg-tertiary/80 text-on-tertiary">
                  -{item.discountPercentage}% OFF
                </Badge>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="py-1 px-3">{item.category}</Badge>
                  <div className="flex items-center gap-1 text-tertiary font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{item.rating} (120+ đánh giá)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Leaf className="w-5 h-5" />
                  <span>Tiết kiệm {item.impactCo2}kg CO2</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface leading-tight">
                {item.name}
              </h1>

              <div className="flex items-center gap-4 p-4 bg-surface-container-highest rounded-3xl border border-outline-variant/30">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{item.merchantName}</h4>
                  <p className="text-xs text-on-surface-variant">123 Phố Huế, Hai Bà Trưng, Hà Nội • 1.2 km</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Xem bản đồ</Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" /> MÔ TẢ SẢN PHẨM
                </h3>
                <p className="text-on-surface-variant leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="pt-8 border-t border-outline-variant/30">
                <h3 className="text-xl font-black tracking-tight mb-6">ĐÁNH GIÁ TỪ CỘNG ĐỒNG</h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id} variant="highest" className="p-6" hover={false}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                            {review.userName[0]}
                          </div>
                          <div>
                            <h5 className="font-bold text-on-surface">{review.userName}</h5>
                            <div className="flex gap-0.5 text-tertiary">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-on-surface-variant font-medium">{review.createdAt}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant font-medium italic">"{review.comment}"</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface-variant line-through opacity-50 font-bold">{formatCurrency(item.originalPrice)}</span>
                    <span className="text-4xl font-black text-primary">{formatCurrency(item.discountPrice)}</span>
                  </div>
                  <Badge variant="tertiary" className="py-2 px-4 text-sm font-black">TIẾT KIỆM 75%</Badge>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Thời gian lấy hàng</span>
                        <span className="font-bold text-on-surface">{item.expiryTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/30">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      <div>
                        <span className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Số lượng còn lại</span>
                        <span className="font-bold text-on-surface">{item.remainingCount} suất</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">Chọn số lượng:</span>
                    <div className="flex items-center gap-4 bg-surface-container-highest p-2 rounded-2xl border border-outline-variant/30">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/10 text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-black text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(item.remainingCount, quantity + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/10 text-primary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="w-full h-16 text-xl font-black tracking-tight gap-3 shadow-2xl shadow-primary/30"
                  >
                    ĐẶT HÀNG NGAY <ShoppingBag className="w-6 h-6" />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Thanh toán an toàn & bảo mật
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-outline-variant/30">
                  <h4 className="text-sm font-black text-on-surface mb-4 uppercase tracking-widest">Lưu ý quan trọng</h4>
                  <ul className="space-y-3">
                    {[
                      'Vui lòng đến đúng khung giờ lấy hàng.',
                      'Mang theo mã QR đơn hàng để đối soát.',
                      'Hỗ trợ hoàn tiền nếu thực phẩm không đúng mô tả.'
                    ].map((note, i) => (
                      <li key={i} className="flex gap-3 text-xs text-on-surface-variant font-medium">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1 shrink-0" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
