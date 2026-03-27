"use client";

import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingBag, 
  Leaf,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { name: 'T2', value: 1200000 },
  { name: 'T3', value: 1800000 },
  { name: 'T4', value: 1400000 },
  { name: 'T5', value: 2200000 },
  { name: 'T6', value: 2800000 },
  { name: 'T7', value: 3500000 },
  { name: 'CN', value: 3100000 },
];

const categoryData = [
  { name: 'Bánh mì', value: 400 },
  { name: 'Cơm trưa', value: 300 },
  { name: 'Đồ uống', value: 200 },
  { name: 'Tráng miệng', value: 100 },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export default function MerchantAnalytics() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">BÁO CÁO & PHÂN TÍCH 📊</h1>
            <p className="text-on-surface-variant font-medium">Theo dõi hiệu quả kinh doanh và tác động môi trường của bạn.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 h-12 px-6">
              <Calendar className="w-5 h-5" /> 7 ngày qua
            </Button>
            <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20">
              <Download className="w-5 h-5" /> TẢI BÁO CÁO
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="highest" className="p-6 border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge variant="primary" className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </Badge>
            </div>
            <h3 className="text-3xl font-black text-on-surface mb-1">12.5M</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tổng doanh thu</p>
          </Card>

          <Card variant="highest" className="p-6 border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +5%
              </Badge>
            </div>
            <h3 className="text-3xl font-black text-on-surface mb-1">48</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Đơn hàng mới</p>
          </Card>

          <Card variant="highest" className="p-6 border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-tertiary/10 text-tertiary">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="tertiary" className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +18%
              </Badge>
            </div>
            <h3 className="text-3xl font-black text-on-surface mb-1">1.2k</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Khách hàng mới</p>
          </Card>

          <Card variant="highest" className="p-6 border border-outline-variant/30">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary">
                <Leaf className="w-6 h-6" />
              </div>
              <Badge variant="primary" className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +24%
              </Badge>
            </div>
            <h3 className="text-3xl font-black text-on-surface mb-1">156kg</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">CO2 Tiết kiệm</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Revenue Chart */}
          <Card variant="glass" className="lg:col-span-8 p-8 border border-outline-variant/30" hover={false}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                DOANH THU THEO NGÀY
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="font-bold">Ngày</Button>
                <Button variant="ghost" size="sm" className="font-bold text-primary">Tuần</Button>
                <Button variant="ghost" size="sm" className="font-bold">Tháng</Button>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '16px', 
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value), 'Doanh thu']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card variant="glass" className="lg:col-span-4 p-8 border border-outline-variant/30" hover={false}>
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              DANH MỤC BÁN CHẠY
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm font-bold text-on-surface">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-on-surface-variant">{item.value} đơn</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
