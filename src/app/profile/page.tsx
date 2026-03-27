"use client";

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Camera, User, Phone, Mail, Lock, MapPin, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';

interface ProfileForm {
  email: string;
  nickname: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

const mockProfile: ProfileForm = {
  email: 'user@saveabite.com',
  nickname: 'Felix Foodie',
  phone: '090 123 4567',
  address: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileForm>(mockProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate saving profile and redirecting to home
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen nature-gradient flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-on-primary" />
          </div>
          <h2 className="text-3xl font-black text-primary mb-2">Đã lưu!</h2>
          <p className="text-on-surface-variant font-medium">Thông tin của bạn đã được cập nhật thành công.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen nature-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="gap-2 group text-on-surface-variant hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-primary mb-2 uppercase">Thông tin cá nhân</h1>
          <p className="text-on-surface-variant font-medium">Quản lý thông tin tài khoản của bạn</p>
        </div>

        <div className="bg-surface-container-low/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 border border-outline-variant/30 shadow-2xl">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group cursor-pointer inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-surface-container-highest shadow-xl">
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              
              <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Thay đổi</span>
              </div>
              
              <div className="absolute bottom-1 right-1 bg-primary rounded-full p-2.5 shadow-lg">
                <Camera className="w-4 h-4 text-on-primary" />
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email (Read-only) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email đăng nhập
              </label>
              <input 
                type="email" 
                value={formData.email}
                readOnly
                className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-2xl px-4 py-4 text-on-surface-variant focus:outline-none font-medium cursor-not-allowed"
              />
            </div>

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

            {/* Actions */}
            <div className="pt-6">
              <button 
                type="submit"
                className="w-full h-16 rounded-2xl font-black text-lg bg-primary text-on-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 uppercase tracking-tight"
              >
                Lưu thay đổi <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

