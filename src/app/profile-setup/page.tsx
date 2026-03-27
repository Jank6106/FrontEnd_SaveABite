"use client";

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, User, Phone, MapPin, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';

interface SetupForm {
  nickname: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SetupForm>({
    nickname: '',
    phone: '',
    address: '',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate saving and redirecting
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 2000);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen nature-gradient flex items-center justify-center p-4 text-on-surface">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-xl shadow-primary/20">
            <CheckCircle2 className="w-10 h-10 text-on-primary" />
          </div>
          <h2 className="text-3xl font-black text-primary mb-2 uppercase tracking-tighter">Chào mừng bạn!</h2>
          <p className="text-on-surface-variant font-medium">Hồ sơ của bạn đã sẵn sàng. Đang bắt đầu hành trình...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen nature-gradient flex items-center justify-center p-4 text-on-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
            <Leaf className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-primary mb-2 uppercase">Thiết lập hồ sơ</h1>
          <p className="text-on-surface-variant font-medium">Cung cấp thông tin cơ bản để bắt đầu giải cứu thực phẩm</p>
        </div>

        <div className="bg-surface-container-low/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 border border-outline-variant/30 shadow-2xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group cursor-pointer inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-surface-container-highest shadow-xl">
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 bg-primary rounded-full p-2.5 shadow-lg">
                <Camera className="w-4 h-4 text-on-primary" />
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nickname */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 flex items-center gap-2">
                  <User className="w-3 h-3" /> Biệt danh
                </label>
                <input 
                  type="text" 
                  name="nickname"
                  placeholder="Ví dụ: Foodie123"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-2xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 font-medium"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Số điện thoại
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="090 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-2xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 font-medium"
                />
              </div>
            </div>

            {/* Address / Mapping */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Địa chỉ hoặc Khu vực mua hàng
              </label>
              <div className="relative">
                <textarea 
                  name="address"
                  placeholder="Nhập địa chỉ hoặc khu vực bạn muốn mua đồ ăn..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-2xl px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 font-medium resize-none"
                />
                <div className="absolute right-4 bottom-4">
                  <button type="button" className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                    <MapPin className="w-3 h-3" /> Lấy vị trí hiện tại
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant font-medium ml-1">
                * Vị trí giúp chúng tôi gợi ý các ưu đãi gần bạn nhất.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-6">
              <button 
                type="submit"
                className="w-full h-16 rounded-2xl font-black text-lg bg-primary text-on-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 uppercase tracking-tight"
              >
                Hoàn tất thiết lập <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
