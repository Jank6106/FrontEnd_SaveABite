"use client";

import { 
  ShieldCheck, 
  Users, 
  Utensils, 
  AlertTriangle, 
  Search, 
  ArrowUpRight, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  BarChart3,
  Leaf
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { mockMerchants } from '@/src/mock/data';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Tổng người dùng', value: '24.5k', icon: Users, color: 'primary' },
    { label: 'Cửa hàng đối tác', value: '842', icon: Utensils, color: 'secondary' },
    { label: 'Báo cáo vi phạm', value: '12', icon: AlertTriangle, color: 'error' },
    { label: 'Tổng CO2 giảm', value: '1,240t', icon: Leaf, color: 'primary' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">HỆ THỐNG QUẢN TRỊ 🛡️</h1>
            <p className="text-on-surface-variant font-medium">Chào mừng trở lại, Admin. Hệ thống đang hoạt động ổn định.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="w-5 h-5" /> Xuất báo cáo
            </Button>
            <Button variant="error" className="gap-2 h-12 px-6">
              <AlertTriangle className="w-5 h-5" /> CẢNH BÁO HỆ THỐNG
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} variant="highest" className="p-6 border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}/10 text-${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-primary">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-on-surface mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Merchant Approval Queue */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                KIỂM DUYỆT CỬA HÀNG
              </h2>
              <div className="flex gap-2">
                <Input placeholder="Tìm kiếm cửa hàng..." className="h-10 w-64" icon={<Search className="w-4 h-4" />} />
              </div>
            </div>

            <Card variant="glass" className="overflow-hidden border border-outline-variant/30" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-highest/50 border-b border-outline-variant/30">
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Cửa hàng</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Địa chỉ</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Ngày đăng ký</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Trạng thái</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {mockMerchants.map((merchant) => (
                      <tr key={merchant.id} className="hover:bg-surface-container-highest/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden nature-gradient border border-outline-variant/30">
                              <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <span className="font-bold text-sm text-on-surface">{merchant.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant font-medium max-w-[200px] truncate">
                          {merchant.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface font-medium">24/03/2024</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-secondary/10 text-secondary">Đang chờ</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                              <CheckCircle2 className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-error hover:bg-error/10">
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* System Logs */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              HOẠT ĐỘNG HỆ THỐNG
            </h2>
            <div className="space-y-4">
              {[
                { type: 'user', text: 'Người dùng mới đăng ký: @hoangnam', time: '2 phút trước' },
                { type: 'merchant', text: 'Cửa hàng "Bếp Xanh" vừa thêm 12 món mới', time: '15 phút trước' },
                { type: 'alert', text: 'Phát hiện đăng nhập bất thường từ IP: 1.2.3.4', time: '1 giờ trước' },
                { type: 'success', text: 'Đã hoàn thành sao lưu dữ liệu hệ thống', time: '3 giờ trước' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/30">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    log.type === 'alert' ? 'bg-error' : log.type === 'success' ? 'bg-primary' : 'bg-secondary'
                  }`} />
                  <div>
                    <p className="text-xs font-bold text-on-surface leading-snug">{log.text}</p>
                    <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{log.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 font-bold">XEM NHẬT KÝ CHI TIẾT</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
