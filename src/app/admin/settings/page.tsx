"use client";

import { useState } from 'react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Shield, Bell, Lock, Key, Mail, Smartphone, Globe, Save } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        <header>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">CÀI ĐẶT HỆ THỐNG ⚙️</h1>
          <p className="text-on-surface-variant font-medium">Quản lý cấu hình và bảo mật cho tài khoản quản trị.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <Card variant="glass" className="w-full lg:w-64 shrink-0 p-4 border border-outline-variant/30 h-fit" hover={false}>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'general' 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <Shield className="w-5 h-5" /> Thông tin chung
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'security' 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <Lock className="w-5 h-5" /> Bảo mật
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'notifications' 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <Bell className="w-5 h-5" /> Thông báo
              </button>
            </nav>
          </Card>

          <div className="flex-1">
            {activeTab === 'general' && (
              <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
                <h2 className="text-2xl font-black text-on-surface mb-6">Thông tin quản trị viên</h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-black text-primary border-4 border-background shadow-xl">
                      A
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface">Admin System</h3>
                      <p className="text-on-surface-variant">Quản trị viên cấp cao</p>
                      <Button variant="outline" size="sm" className="mt-2">Đổi ảnh đại diện</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">Họ và tên</label>
                      <Input defaultValue="Admin System" className="bg-surface-container-highest/50 border-outline-variant/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">Email liên hệ</label>
                      <Input defaultValue="admin@saveabite.vn" type="email" className="bg-surface-container-highest/50 border-outline-variant/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">Số điện thoại</label>
                      <Input defaultValue="0999888777" className="bg-surface-container-highest/50 border-outline-variant/30" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">Khu vực quản lý</label>
                      <Input defaultValue="Toàn quốc" disabled className="bg-surface-container-highest/50 border-outline-variant/30 opacity-70" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
                    <Button className="gap-2 shadow-xl shadow-primary/20 px-8">
                      <Save className="w-4 h-4" /> LƯU THAY ĐỔI
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
                <h2 className="text-2xl font-black text-on-surface mb-6">Bảo mật tài khoản</h2>
                <div className="space-y-8 max-w-2xl">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      <Key className="w-5 h-5 text-primary" /> Đổi mật khẩu
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-on-surface">Mật khẩu hiện tại</label>
                        <Input type="password" placeholder="••••••••" className="bg-surface-container-highest/50 border-outline-variant/30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-on-surface">Mật khẩu mới</label>
                        <Input type="password" placeholder="••••••••" className="bg-surface-container-highest/50 border-outline-variant/30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-on-surface">Xác nhận mật khẩu mới</label>
                        <Input type="password" placeholder="••••••••" className="bg-surface-container-highest/50 border-outline-variant/30" />
                      </div>
                      <Button className="mt-2">CẬP NHẬT MẬT KHẨU</Button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10 space-y-4">
                    <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-primary" /> Xác thực hai yếu tố (2FA)
                    </h3>
                    <p className="text-sm text-on-surface-variant">Bảo vệ tài khoản của bạn bằng cách yêu cầu mã xác nhận khi đăng nhập từ thiết bị lạ.</p>
                    <Button variant="outline" className="gap-2">
                      Thiết lập 2FA
                    </Button>
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10 space-y-4">
                    <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      <Globe className="w-5 h-5 text-error" /> Phiên đăng nhập
                    </h3>
                    <p className="text-sm text-on-surface-variant">Đăng xuất khỏi tất cả các thiết bị khác ngoại trừ thiết bị này.</p>
                    <Button variant="outline" className="text-error border-error/30 hover:bg-error/10">
                      Đăng xuất tất cả thiết bị
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card variant="glass" className="p-8 border border-outline-variant/30" hover={false}>
                <h2 className="text-2xl font-black text-on-surface mb-6">Tùy chỉnh thông báo</h2>
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-highest/30 border border-outline-variant/20">
                    <div>
                      <h4 className="font-bold text-on-surface">Cửa hàng đăng ký mới</h4>
                      <p className="text-sm text-on-surface-variant">Nhận email khi có cửa hàng mới yêu cầu phê duyệt.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-highest/30 border border-outline-variant/20">
                    <div>
                      <h4 className="font-bold text-on-surface">Báo cáo vi phạm</h4>
                      <p className="text-sm text-on-surface-variant">Nhận thông báo khi có người dùng báo cáo đánh giá hoặc cửa hàng.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-highest/30 border border-outline-variant/20">
                    <div>
                      <h4 className="font-bold text-on-surface">Báo cáo hệ thống hàng tuần</h4>
                      <p className="text-sm text-on-surface-variant">Nhận email tổng hợp số liệu hoạt động của hệ thống mỗi tuần.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
