"use client";

import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Leaf,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Upload,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { mockOrders, mockFoodItems } from '@/src/mock/data';
import { formatCurrency, cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

import { useState } from 'react';
import { Modal } from '@/src/components/ui/Modal';
import { Textarea } from '@/src/components/ui/Textarea';

export default function MerchantDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // New states for product type and dates
  const [productType, setProductType] = useState<'daily' | 'longterm'>('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // New states for image upload
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const stats = [
    { label: 'Doanh thu tháng', value: '12.5M', icon: TrendingUp, color: 'primary', trend: '+12%' },
    { label: 'Đơn hàng mới', value: '48', icon: ShoppingBag, color: 'secondary', trend: '+5%' },
    { label: 'Khách hàng', value: '1.2k', icon: Users, color: 'tertiary', trend: '+18%' },
    { label: 'CO2 Tiết kiệm', value: '156kg', icon: Leaf, color: 'primary', trend: '+24%' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen(false);
        // Reset form
        setProductType('daily');
        setStartDate('');
        setEndDate('');
        setImagePreview(null);
      }, 2000);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">XIN CHÀO, BẾP XANH! 👋</h1>
            <p className="text-on-surface-variant font-medium">Hôm nay bạn đã giúp giải cứu 12 suất ăn dư thừa.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Clock className="w-5 h-5" /> Lịch sử
            </Button>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="gap-2 h-12 px-6 shadow-xl shadow-primary/20"
            >
              <Plus className="w-5 h-5" /> THÊM MÓN MỚI
            </Button>
          </div>
        </header>

        {/* Modal: Add New Item */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Thêm món mới vào thực đơn 🍱"
        >
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight">THÊM MÓN THÀNH CÔNG!</h3>
              <p className="text-on-surface-variant font-medium">Món ăn của bạn đã được đăng bán trên hệ thống.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Tên món ăn</label>
                <Input placeholder="Ví dụ: Túi Bất Ngờ - Bakery" required className="h-12" />
              </div>

              {/* Product Type Selection */}
              <div className="space-y-4 p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest block mb-2">Loại sản phẩm</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 cursor-pointer hover:bg-surface-container-highest/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input 
                      type="radio" 
                      name="productType" 
                      value="daily" 
                      checked={productType === 'daily'}
                      onChange={() => setProductType('daily')}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface">Sản phẩm trong ngày</span>
                  </label>
                  <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 cursor-pointer hover:bg-surface-container-highest/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input 
                      type="radio" 
                      name="productType" 
                      value="longterm" 
                      checked={productType === 'longterm'}
                      onChange={() => setProductType('longterm')}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface">Sản phẩm dài hạn</span>
                  </label>
                </div>

                {/* Date Range for Long-term Product */}
                {productType === 'longterm' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 gap-4 pt-2"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Từ ngày</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <Input 
                          type="date" 
                          required 
                          className="pl-10 h-10 text-xs" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Đến ngày</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <Input 
                          type="date" 
                          required 
                          className="pl-10 h-10 text-xs" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Giá gốc (VND)</label>
                  <Input type="number" placeholder="140,000" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Giá giảm (VND)</label>
                  <Input type="number" placeholder="35,000" required className="h-12" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Danh mục</label>
                  <select className="w-full h-12 rounded-2xl border border-outline-variant/30 bg-surface-container-highest/50 px-4 py-2 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option>Bánh mỳ</option>
                    <option>Nhà hàng</option>
                    <option>Tạp hóa</option>
                    <option>Đồ mặn</option>
                    <option>Đồ uống</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Số lượng còn lại</label>
                  <Input type="number" placeholder="5" required className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Mô tả món ăn</label>
                <Textarea placeholder="Mô tả ngắn gọn về món ăn của bạn..." required />
              </div>

              {/* Image Upload from File Explorer */}
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Hình ảnh món ăn</label>
                <div 
                  className={cn(
                    "relative group cursor-pointer border-2 border-dashed border-outline-variant/30 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/50 bg-surface-container-highest/30",
                    imagePreview ? "aspect-video" : "h-32"
                  )}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Upload className="w-5 h-5" /> Thay đổi ảnh
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tải ảnh từ thiết bị</p>
                    </div>
                  )}
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-14 font-bold uppercase tracking-widest"
                  onClick={() => setIsModalOpen(false)}
                >
                  HỦY BỎ
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-14 font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐĂNG BÁN NGAY'}
                </Button>
              </div>
            </form>
          )}
        </Modal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} variant="highest" className="p-6 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}/10 text-${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant={stat.color as any} className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                </Badge>
              </div>
              <h3 className="text-3xl font-black text-on-surface mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Recent Orders */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                ĐƠN HÀNG MỚI NHẤT
              </h2>
              <Link href="/merchant/orders">
                <Button variant="ghost" className="text-primary font-bold">Xem tất cả</Button>
              </Link>
            </div>

            <Card variant="glass" className="overflow-hidden border border-outline-variant/30" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-highest/50 border-b border-outline-variant/30">
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Mã đơn</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Khách hàng</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Sản phẩm</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Tổng tiền</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Trạng thái</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface-container-highest/30 transition-colors">
                        <td className="px-6 py-4 font-black text-primary">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                              {order.merchantName[0]}
                            </div>
                            <span className="font-bold text-sm text-on-surface">{order.merchantName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                          {order.items[0].name} x{order.items[0].quantity}
                        </td>
                        <td className="px-6 py-4 font-black text-on-surface">{formatCurrency(order.totalAmount)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="tertiary" className="bg-tertiary/10 text-tertiary">Chờ lấy</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Inventory Summary */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              THỰC ĐƠN ĐANG BÁN
            </h2>
            <div className="space-y-4">
              {mockFoodItems.slice(0, 3).map((item) => (
                <Card key={item.id} variant="highest" className="p-4 border border-outline-variant/30 flex gap-4" hover={false}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface text-sm mb-1">{item.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{item.remainingCount} suất còn lại</span>
                      <Badge variant="primary" className="text-[9px]">{item.category}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </Card>
              ))}
              <Link href="/merchant/menu">
                <Button variant="outline" className="w-full h-12 font-bold uppercase tracking-widest">QUẢN LÝ THỰC ĐƠN</Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
