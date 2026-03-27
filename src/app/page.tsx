"use client";

import Link from 'next/link';

import { Search, MapPin, Filter, Leaf, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/src/components/shared/Header';
import { FoodCard } from '@/src/components/shared/FoodCard';
import { mockFoodItems } from '@/src/mock/data';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { FoodItem } from '@/src/types';

interface ProductSectionProps {
  title: string;
  items: FoodItem[];
  key?: string;
}

const ProductSection = ({ title, items }: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase">
          <div className="w-2 h-8 bg-primary rounded-full" />
          {title}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Lọc
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <MapPin className="w-4 h-4" /> Bản đồ
          </Button>
        </div>
      </div>
      
      <div className="relative group/scroll">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-surface-container-highest rounded-full hidden md:flex items-center justify-center border border-outline-variant/30 text-primary shadow-2xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto custom-scrollbar scroll-smooth pb-6 -mx-4 px-4 snap-x"
        >
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="min-w-[280px] sm:min-w-[320px] flex-1 snap-start">
              <FoodCard item={item} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-surface-container-highest rounded-full hidden md:flex items-center justify-center border border-outline-variant/30 text-primary shadow-2xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default function CustomerHome() {
  const categories = ['Bánh mỳ', 'Bánh kem', 'Đồ mặn', 'Đồ uống'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="relative rounded-[40px] overflow-hidden nature-gradient p-8 md:p-16 border border-outline-variant/30">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-primary/20 blur-[120px] rounded-full" />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <Badge variant="primary" className="mb-6 py-1.5 px-4 text-xs">
              <Sparkles className="w-3 h-3 mr-2 inline" /> Giải cứu thực phẩm ngay hôm nay
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.4] mb-6 text-on-surface">
              TIẾT KIỆM <span className="text-primary">75%</span> <br />
              CHI PHÍ ĂN UỐNG
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 font-medium max-w-lg">
              Khám phá hàng ngàn món ăn ngon từ các nhà hàng yêu thích với mức giá cực hời trước giờ đóng cửa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <Input 
                  placeholder="Bạn muốn ăn gì hôm nay?" 
                  icon={<Search className="w-5 h-5" />}
                  className="h-14 bg-surface-container-highest/50 backdrop-blur-md"
                />
              </div>
              <Button size="lg" className="h-14 px-10 gap-2">
                Tìm kiếm <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Quick Links */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              DANH MỤC PHỔ BIẾN
            </h2>
            <Button variant="ghost" className="text-primary font-bold">Xem tất cả</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Bánh mỳ', 'Nhà hàng', 'Tạp hóa', 'Đồ mặn', 'Tráng miệng', 'Đồ uống'].map((cat) => (
              <Card key={cat} variant="highest" className="p-6 text-center cursor-pointer border border-transparent hover:border-primary/30 transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-primary w-6 h-6" />
                </div>
                <span className="font-bold text-sm text-on-surface">{cat}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Deals */}
        <ProductSection title="DEAL HỜI GẦN BẠN" items={[...mockFoodItems, ...mockFoodItems]} />

        {/* Dynamic Category Sections */}
        {categories.map((category) => {
          const items = mockFoodItems.filter(item => item.category === category);
          if (items.length === 0) return null;
          return (
            <ProductSection 
              key={category} 
              title={category} 
              items={[...items, ...items]} // Duplicating for scroll effect
            />
          );
        })}

        {/* Impact Banner */}
        <section className="bg-primary rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-on-primary tracking-tighter mb-4">
              TÁC ĐỘNG CỦA BẠN
            </h2>
            <p className="text-on-primary/80 text-lg font-medium">
              Mỗi món ăn bạn giải cứu giúp giảm thiểu trung bình 1.2kg khí thải CO2 vào môi trường. Hãy cùng SaveABite bảo vệ hành tinh xanh!
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <span className="block text-5xl font-black text-on-primary">12.5k</span>
              <span className="text-on-primary/60 font-bold uppercase text-xs tracking-widest">Bữa ăn giải cứu</span>
            </div>
            <div className="text-center">
              <span className="block text-5xl font-black text-on-primary">15t</span>
              <span className="text-on-primary/60 font-bold uppercase text-xs tracking-widest">CO2 Giảm thiểu</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="text-primary w-8 h-8" />
            <span className="text-2xl font-black tracking-tighter text-primary">SAVEABITE</span>
          </div>
          <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-medium">
            Nền tảng kết nối người dùng với các nguồn thực phẩm dư thừa chất lượng cao, cùng nhau xây dựng lối sống bền vững.
          </p>
          <div className="flex justify-center gap-6 text-on-surface-variant font-bold text-sm uppercase tracking-widest">
            <Link href="#" className="hover:text-primary transition-colors">Về chúng tôi</Link>
            <Link href="#" className="hover:text-primary transition-colors">Đối tác</Link>
            <Link href="#" className="hover:text-primary transition-colors">Liên hệ</Link>
            <Link href="#" className="hover:text-primary transition-colors">Điều khoản</Link>
          </div>
          <div className="mt-12 pt-8 border-t border-outline-variant/10 text-xs text-on-surface-variant/50">
            © 2024 SaveABite. All rights reserved. Made with 💚 for the planet.
          </div>
        </div>
      </footer>
    </div>
  );
};
