"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { mockFoodItems } from '@/src/mock/data';
import { formatCurrency } from '@/src/lib/utils';
import { useState } from 'react';

export default function MerchantMenu() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mockFoodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="merchant" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">QUẢN LÝ THỰC ĐƠN 🍱</h1>
            <p className="text-on-surface-variant font-medium">Quản lý các món ăn đang bán và tồn kho của bạn.</p>
          </div>
          <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20">
            <Plus className="w-5 h-5" /> THÊM MÓN MỚI
          </Button>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <Input 
              placeholder="Tìm kiếm món ăn..." 
              className="pl-12 h-12 bg-surface-container-highest/50 border-outline-variant/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="gap-2 flex-1 md:flex-none">
              <Filter className="w-5 h-5" /> Lọc
            </Button>
            <Button variant="outline" className="gap-2 flex-1 md:flex-none">
              Sắp xếp
            </Button>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} variant="glass" className="overflow-hidden border border-outline-variant/30 group" hover={true}>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="primary" className="shadow-lg shadow-primary/20">
                    {item.category}
                  </Badge>
                  <Badge variant={item.remainingCount > 0 ? 'secondary' : 'tertiary'} className="shadow-lg">
                    {item.remainingCount > 0 ? 'Đang bán' : 'Hết hàng'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-on-surface mb-1">{item.name}</h3>
                    <p className="text-sm text-on-surface-variant font-medium line-clamp-1">{item.merchantName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary">{formatCurrency(item.discountPrice)}</p>
                    <p className="text-xs text-on-surface-variant line-through font-bold">{formatCurrency(item.originalPrice)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      {item.remainingCount} suất còn lại
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-primary">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-primary">
                      {item.remainingCount > 0 ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-error">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
