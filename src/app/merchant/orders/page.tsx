"use client";

import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { mockOrders } from '@/src/mock/data';
import { formatCurrency } from '@/src/lib/utils';
import { useState } from 'react';

export default function MerchantOrders() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tất cả', count: mockOrders.length },
    { id: 'pending', label: 'Chờ xử lý', count: 12 },
    { id: 'processing', label: 'Đang chuẩn bị', count: 8 },
    { id: 'completed', label: 'Hoàn thành', count: 156 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">QUẢN LÝ ĐƠN HÀNG 📦</h1>
            <p className="text-on-surface-variant font-medium">Theo dõi và xử lý các đơn hàng từ khách hàng.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 h-12 px-6">
              <Clock className="w-5 h-5" /> Lịch sử
            </Button>
            <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20">
              XUẤT BÁO CÁO
            </Button>
          </div>
        </header>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex gap-2 p-1 bg-surface-container-highest/50 rounded-2xl border border-outline-variant/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {tab.label}
                <Badge variant={activeTab === tab.id ? 'primary' : 'outline'} className="text-[10px] px-1.5 py-0">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <Input 
              placeholder="Tìm mã đơn hàng..." 
              className="pl-12 h-12 bg-surface-container-highest/50 border-outline-variant/30"
            />
          </div>
        </div>

        {/* Orders Table */}
        <Card variant="glass" className="overflow-hidden border border-outline-variant/30" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/50 border-b border-outline-variant/30">
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Mã đơn</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Khách hàng</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Sản phẩm</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Thời gian</th>
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
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="text-sm text-on-surface-variant font-medium">
                            {item.name} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                      Hôm nay, 14:30
                    </td>
                    <td className="px-6 py-4 font-black text-on-surface">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                      <Badge variant="tertiary" className="bg-tertiary/10 text-tertiary flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" /> Chờ chuẩn bị
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                          <CheckCircle2 className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-error hover:bg-error/10">
                          <XCircle className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="highest" className="p-6 border border-outline-variant/30 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-on-surface">12</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Đang chuẩn bị</p>
            </div>
          </Card>
          <Card variant="highest" className="p-6 border border-outline-variant/30 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-on-surface">5</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Đang giao hàng</p>
            </div>
          </Card>
          <Card variant="highest" className="p-6 border border-outline-variant/30 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-on-surface">156</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Đã hoàn thành</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
