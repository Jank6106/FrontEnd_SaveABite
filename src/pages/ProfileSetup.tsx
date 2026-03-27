import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface UserProfile {
  email: string;
  nickname: string;
  phone: string;
  avatarUrl: string;
}

const mockUser: UserProfile = {
  email: 'user@saveabite.com',
  nickname: 'Khách hàng',
  phone: '0901234567',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfile>(mockUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile and redirecting back
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#050806] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-gradient-to-b from-[#1a241e] to-[#121a15] rounded-2xl border border-primary/50 p-6 md:p-8 shadow-[0_0_120px_-30px_rgba(46,202,106,0.4),inset_0_0_20px_rgba(46,202,106,0.05)]"
      >
        <h1 className="text-2xl font-bold mb-8 text-on-surface text-center md:text-left drop-shadow-[0_0_10px_rgba(46,202,106,0.3)]">Hồ sơ cá nhân</h1>
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="relative group cursor-pointer inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors bg-surface-container-highest shadow-[0_0_20px_rgba(46,202,106,0.2)]">
              <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            {/* Camera Badge at bottom right */}
            <div className="absolute bottom-0 right-0 bg-surface-container-highest rounded-full p-1.5 border border-primary/30 group-hover:border-primary transition-colors shadow-[0_0_10px_rgba(46,202,106,0.3)]">
              <Camera className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-5 p-44 rounded-2xl shadow-[inset_0_0_460px_rgba(46,202,106,0.45)]" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2 drop-shadow-[0_0_5px_rgba(46,202,106,0.2)]">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input 
              type="email" 
              value={formData.email}
              disabled
              className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface-variant/70 cursor-not-allowed focus:outline-none shadow-[inset_0_0_10px_rgba(46,202,106,0.02)]"
            />
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2 drop-shadow-[0_0_5px_rgba(46,202,106,0.2)]">
              <User className="w-4 h-4" /> Biệt danh
            </label>
            <input 
              type="text" 
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(46,202,106,0.2)] transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2 drop-shadow-[0_0_5px_rgba(46,202,106,0.2)]">
              <Phone className="w-4 h-4" /> Số điện thoại
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(46,202,106,0.2)] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-outline-variant/30">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest hover:shadow-[0_0_15px_rgba(46,202,106,0.1)] transition-all"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl font-medium bg-primary text-on-primary hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(46,202,106,0.4)]"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

