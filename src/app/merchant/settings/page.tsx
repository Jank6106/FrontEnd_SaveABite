"use client";

import { useState } from 'react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { 
  Store, 
  MapPin, 
  Phone, 
  Clock, 
  Bell, 
  Shield, 
  CreditCard,
  Save,
  Camera
} from 'lucide-react';

export default function MerchantSettings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">Cài đặt cửa hàng</h1>
            <p className="text-on-surface-variant font-medium">Quản lý thông tin, giờ hoạt động và các tùy chọn khác.</p>
          </div>
          <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20">
            <Save className="w-5 h-5" /> LƯU THAY ĐỔI
          </Button>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Navigation */}
          <Card className="w-full md:w-64 p-4 h-fit border border-outline-variant/30 shrink-0">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activeTab === 'general' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <Store className="w-5 h-5" /> Thông tin chung
              </button>
              <button 
                onClick={() => setActiveTab('hours')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activeTab === 'hours' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <Clock className="w-5 h-5" /> Giờ hoạt động
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <Bell className="w-5 h-5" /> Thông báo
              </button>
              <button 
                onClick={() => setActiveTab('payment')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activeTab === 'payment' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <CreditCard className="w-5 h-5" /> Thanh toán
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  activeTab === 'security' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <Shield className="w-5 h-5" /> Bảo mật
              </button>
            </nav>
          </Card>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <Card className="p-8 border border-outline-variant/30">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  THÔNG TIN CỬA HÀNG
                </h2>
                
                <div className="flex flex-col gap-8">
                  {/* Logo Upload */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-surface-container-highest border-2 border-dashed border-outline-variant flex items-center justify-center relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <Store className="w-10 h-10 text-on-surface-variant" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface mb-1">Logo cửa hàng</h3>
                      <p className="text-sm text-on-surface-variant mb-3">Định dạng JPG, PNG. Kích thước tối đa 2MB.</p>
                      <Button variant="outline" size="sm">Tải ảnh lên</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Tên cửa hàng</label>
                      <Input defaultValue="Tiệm Bánh Ngọt Ngào" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Số điện thoại</label>
                      <Input defaultValue="0901234567" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Địa chỉ</label>
                      <Input defaultValue="123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Mô tả cửa hàng</label>
                      <Textarea 
                        defaultValue="Chuyên cung cấp các loại bánh ngọt, bánh kem, bánh mì tươi mỗi ngày. Giảm giá đặc biệt cho bánh cuối ngày để chống lãng phí thực phẩm." 
                        className="h-32"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'hours' && (
              <Card className="p-8 border border-outline-variant/30">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  GIỜ HOẠT ĐỘNG
                </h2>
                
                <div className="space-y-4">
                  {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                      <div className="flex items-center gap-4 w-32">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary focus:ring-primary" />
                        <span className="font-bold">{day}</span>
                      </div>
                      <div className="flex items-center gap-4 flex-1 max-w-md">
                        <Input type="time" defaultValue="08:00" className="w-full" />
                        <span className="text-on-surface-variant font-medium">đến</span>
                        <Input type="time" defaultValue="22:00" className="w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-8 border border-outline-variant/30">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  CÀI ĐẶT THÔNG BÁO
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start justify-between p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                    <div>
                      <h3 className="font-bold text-on-surface text-lg mb-1">Đơn hàng mới</h3>
                      <p className="text-on-surface-variant text-sm">Nhận thông báo khi có khách hàng đặt món</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                    <div>
                      <h3 className="font-bold text-on-surface text-lg mb-1">Đánh giá từ khách hàng</h3>
                      <p className="text-on-surface-variant text-sm">Nhận thông báo khi có đánh giá mới</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                    <div>
                      <h3 className="font-bold text-on-surface text-lg mb-1">Báo cáo doanh thu</h3>
                      <p className="text-on-surface-variant text-sm">Nhận email báo cáo tổng kết mỗi tuần</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-outline-variant/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'payment' && (
              <Card className="p-8 border border-outline-variant/30">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  THÔNG TIN THANH TOÁN
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Ngân hàng thụ hưởng</label>
                    <Input defaultValue="Vietcombank" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Tên chủ tài khoản</label>
                    <Input defaultValue="NGUYEN VAN A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Số tài khoản</label>
                    <Input defaultValue="0123456789" type="password" />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-8 border border-outline-variant/30">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  BẢO MẬT TÀI KHOẢN
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Mật khẩu hiện tại</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Mật khẩu mới</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Xác nhận mật khẩu mới</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="text-error border-error/30 hover:bg-error/10">
                      Đăng xuất khỏi tất cả thiết bị
                    </Button>
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
