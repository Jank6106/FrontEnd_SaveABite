/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Leaf, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { motion } from 'motion/react';

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration success
    navigate('/');
  };

  return (
    <div className="min-h-screen nature-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-2xl shadow-primary/30 mb-6">
            <Leaf className="text-on-primary w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-primary mb-2">SAVEABITE</h1>
          <p className="text-on-surface-variant font-medium">Tham gia cộng đồng giải cứu thực phẩm</p>
        </div>

        <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-on-surface tracking-tight">Tạo tài khoản mới</h2>
            <p className="text-sm text-on-surface-variant font-medium">Dành cho Người mua (Khách hàng)</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Họ và tên</label>
              <Input type="text" placeholder="Nguyễn Văn A" icon={<User className="w-5 h-5" />} required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email</label>
              <Input type="email" placeholder="name@example.com" icon={<Mail className="w-5 h-5" />} required />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Mật khẩu</label>
              <Input type="password" placeholder="••••••••" icon={<Lock className="w-5 h-5" />} required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
              <Input type="password" placeholder="••••••••" icon={<ShieldCheck className="w-5 h-5" />} required />
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" id="terms" className="mt-1 rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/30" required />
              <label htmlFor="terms" className="text-xs text-on-surface-variant font-medium leading-tight">
                Tôi đồng ý với <Link to="#" className="text-primary font-bold hover:underline">Điều khoản dịch vụ</Link> và <Link to="#" className="text-primary font-bold hover:underline">Chính sách bảo mật</Link> của SaveABite.
              </label>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-black tracking-tight gap-2 mt-4">
              Đăng ký ngay <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-on-surface-variant font-medium">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary font-black hover:underline">Đăng nhập</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
