"use client";

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Mail, Lock, Leaf, ArrowRight, Facebook, Chrome } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { motion } from 'motion/react';

export default function Login() {
  const [role, setRole] = useState<'customer' | 'merchant' | 'admin'>('customer');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'merchant') router.push('/merchant');
    else if (role === 'admin') router.push('/admin');
    else router.push('/');
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
          <p className="text-on-surface-variant font-medium">Cùng nhau giảm thiểu lãng phí thực phẩm</p>
        </div>

        <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
          <div className="flex gap-2 p-1 bg-surface-container-highest rounded-2xl mb-8">
            {(['customer', 'merchant', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                  role === r ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r === 'customer' ? 'Khách' : r === 'merchant' ? 'Cửa hàng' : 'Admin'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email</label>
              <Input type="email" placeholder="name@example.com" icon={<Mail className="w-5 h-5" />} required />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Mật khẩu</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Quên mật khẩu?</Link>
              </div>
              <Input type="password" placeholder="••••••••" icon={<Lock className="w-5 h-5" />} required />
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-black tracking-tight gap-2">
              Đăng nhập <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container-low px-4 text-on-surface-variant font-bold">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 gap-2">
              <Chrome className="w-5 h-5" /> Google
            </Button>
            <Button variant="outline" className="h-12 gap-2">
              <Facebook className="w-5 h-5" /> Facebook
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-on-surface-variant">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};
