/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Leaf,
  ArrowUpRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Sidebar } from '../components/shared/Sidebar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { mockOrders, mockFoodItems } from '../mock/data';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export const MerchantDashboard = () => {
  const stats = [
    { label: 'Doanh thu tháng', value: '12.5M', icon: TrendingUp, color: 'primary', trend: '+12%' },
    { label: 'Đơn hàng mới', value: '48', icon: ShoppingBag, color: 'secondary', trend: '+5%' },
    { label: 'Khách hàng', value: '1.2k', icon: Users, color: 'tertiary', trend: '+18%' },
    { label: 'CO2 Tiết kiệm', value: '156kg', icon: Leaf, color: 'primary', trend: '+24%' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">XIN CHÀO, BẾP XANH! 👋</h1>
            <p className="text-on-surface-variant font-medium">Hôm nay bạn đã giúp giải cứu 12 suất ăn dư thừa.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Clock className="w-5 h-5" /> Lịch sử
            </Button>
            <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20">
              <Plus className="w-5 h-5" /> THÊM MÓN MỚI
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
                <Badge variant={stat.color as any} className="flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                </Badge>
              </div>
              <h3 className="text-3xl font-black text-on-surface mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Recent Orders */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                ĐƠN HÀNG MỚI NHẤT
              </h2>
              <Button variant="ghost" className="text-primary font-bold">Xem tất cả</Button>
            </div>

            <Card variant="glass" className="overflow-hidden border border-outline-variant/30" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-highest/50 border-b border-outline-variant/30">
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Mã đơn</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Khách hàng</th>
                      <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Sản phẩm</th>
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
                        <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                          {order.items[0].name} x{order.items[0].quantity}
                        </td>
                        <td className="px-6 py-4 font-black text-on-surface">{formatCurrency(order.totalAmount)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="tertiary" className="bg-tertiary/10 text-tertiary">Chờ lấy</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Inventory Summary */}
          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              THỰC ĐƠN ĐANG BÁN
            </h2>
            <div className="space-y-4">
              {mockFoodItems.slice(0, 3).map((item) => (
                <Card key={item.id} variant="highest" className="p-4 border border-outline-variant/30 flex gap-4" hover={false}>
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface text-sm mb-1">{item.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{item.remainingCount} suất còn lại</span>
                      <Badge variant="primary" className="text-[9px]">{item.category}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </Card>
              ))}
              <Button variant="outline" className="w-full h-12 font-bold">QUẢN LÝ THỰC ĐƠN</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
