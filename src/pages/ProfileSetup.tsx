import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Phone, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileForm {
  email: string;
  nickname: string;
  phone: string;
  avatarUrl: string;
}

const mockProfile: ProfileForm = {
  email: 'user@saveabite.com',
  nickname: 'Khách hàng',
  phone: '0901234567',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileForm>(mockProfile);

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
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-[#161b22] rounded-2xl p-6 md:p-10 shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-8 text-gray-100 text-center">Chỉnh sửa hồ sơ cá nhân</h1>
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer inline-block">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-500 bg-gray-800">
              <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-6 h-6 text-white mb-1" />
              <span className="text-[10px] font-medium text-white uppercase tracking-wider">Thay đổi ảnh</span>
            </div>
            
            {/* Camera Badge at bottom right */}
            <div className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-2 border border-gray-700 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors duration-200">
              <Camera className="w-4 h-4 text-gray-300 group-hover:text-white" />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email (Read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={formData.email}
                disabled
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-4 pr-10 py-3 text-gray-500 cursor-not-allowed focus:outline-none shadow-inner"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Biệt danh
            </label>
            <input 
              type="text" 
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Số điện thoại
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-8 mt-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-gray-400 border border-gray-600 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              Hủy
            </button>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shadow-lg shadow-emerald-500/20"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

