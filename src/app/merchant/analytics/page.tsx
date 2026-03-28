"use client";

import { useState, useMemo } from 'react';
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

type TimeFilter = 'day' | 'week' | 'month' | 'year';

const revenueDataMap = {
  day: [
    { name: '08:00', value: 150000 },
    { name: '10:00', value: 300000 },
    { name: '12:00', value: 800000 },
    { name: '14:00', value: 450000 },
    { name: '16:00', value: 200000 },
    { name: '18:00', value: 900000 },
    { name: '20:00', value: 600000 },
  ],
  week: [
    { name: 'T2', value: 1200000 },
    { name: 'T3', value: 1800000 },
    { name: 'T4', value: 1400000 },
    { name: 'T5', value: 2200000 },
    { name: 'T6', value: 2800000 },
    { name: 'T7', value: 3500000 },
    { name: 'CN', value: 3100000 },
  ],
  month: [
    { name: 'Tuần 1', value: 8500000 },
    { name: 'Tuần 2', value: 9200000 },
    { name: 'Tuần 3', value: 10500000 },
    { name: 'Tuần 4', value: 11800000 },
  ],
  year: [
    { name: 'T1', value: 35000000 },
    { name: 'T2', value: 38000000 },
    { name: 'T3', value: 42000000 },
    { name: 'T4', value: 40000000 },
    { name: 'T5', value: 45000000 },
    { name: 'T6', value: 48000000 },
    { name: 'T7', value: 52000000 },
    { name: 'T8', value: 55000000 },
    { name: 'T9', value: 50000000 },
    { name: 'T10', value: 58000000 },
    { name: 'T11', value: 62000000 },
    { name: 'T12', value: 70000000 },
  ]
};

const categoryDataMap = {
  day: [
    { name: 'Bánh mì', value: 45 },
    { name: 'Cơm trưa', value: 80 },
    { name: 'Đồ uống', value: 60 },
    { name: 'Tráng miệng', value: 20 },
  ],
  week: [
    { name: 'Bánh mì', value: 400 },
    { name: 'Cơm trưa', value: 300 },
    { name: 'Đồ uống', value: 200 },
    { name: 'Tráng miệng', value: 100 },
  ],
  month: [
    { name: 'Bánh mì', value: 1800 },
    { name: 'Cơm trưa', value: 1200 },
    { name: 'Đồ uống', value: 900 },
    { name: 'Tráng miệng', value: 450 },
  ],
  year: [
    { name: 'Bánh mì', value: 22000 },
    { name: 'Cơm trưa', value: 15000 },
    { name: 'Đồ uống', value: 11000 },
    { name: 'Tráng miệng', value: 5500 },
  ]
};

const statsDataMap = {
  day: { revenue: '3.4M', orders: '15', customers: '42', co2: '5.2kg', label: 'Hôm nay' },
  week: { revenue: '12.5M', orders: '48', customers: '1.2k', co2: '156kg', label: '7 ngày qua' },
  month: { revenue: '40.0M', orders: '185', customers: '4.5k', co2: '620kg', label: 'Tháng này' },
  year: { revenue: '595M', orders: '2.4k', customers: '52k', co2: '7.5t', label: 'Năm nay' },
};

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export default function MerchantAnalytics() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  const revenueData = revenueDataMap[timeFilter];
  const categoryData = categoryDataMap[timeFilter];
  const stats = statsDataMap[timeFilter];
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
            <div className="flex bg-surface-container-highest/50 rounded-lg p-1 border border-outline-variant/30">
              <Button 
                variant="ghost" 
                size="sm" 
                className={timeFilter === 'day' ? 'font-bold shadow-md bg-surface text-primary' : 'font-medium text-on-surface-variant'}
                onClick={() => setTimeFilter('day')}
              >
                Ngày
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={timeFilter === 'week' ? 'font-bold shadow-md bg-surface text-primary' : 'font-medium text-on-surface-variant'}
                onClick={() => setTimeFilter('week')}
              >
                Tuần
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={timeFilter === 'month' ? 'font-bold shadow-md bg-surface text-primary' : 'font-medium text-on-surface-variant'}
                onClick={() => setTimeFilter('month')}
              >
                Tháng
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={timeFilter === 'year' ? 'font-bold shadow-md bg-surface text-primary' : 'font-medium text-on-surface-variant'}
                onClick={() => setTimeFilter('year')}
              >
                Năm
              </Button>
            </div>
            <Button className="gap-2 h-10 px-6 shadow-xl shadow-primary/20">
              <Download className="w-4 h-4" /> TẢI BÁO CÁO
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
            <h3 className="text-3xl font-black text-on-surface mb-1">{stats.revenue}</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tổng doanh thu ({stats.label})</p>
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
            <h3 className="text-3xl font-black text-on-surface mb-1">{stats.orders}</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Đơn hàng mới ({stats.label})</p>
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
            <h3 className="text-3xl font-black text-on-surface mb-1">{stats.customers}</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Khách hàng mới ({stats.label})</p>
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
            <h3 className="text-3xl font-black text-on-surface mb-1">{stats.co2}</h3>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">CO2 Tiết kiệm ({stats.label})</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Revenue Chart */}
          <Card variant="glass" className="lg:col-span-8 p-8 border border-outline-variant/30" hover={false}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                DOANH THU THEO {timeFilter === 'day' ? 'GIỜ' : timeFilter === 'week' ? 'NGÀY' : timeFilter === 'month' ? 'TUẦN' : 'THÁNG'}
              </h2>
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
