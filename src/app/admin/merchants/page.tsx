"use client";

import { useState } from 'react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Modal } from '@/src/components/ui/Modal';
import { Search, Store, MapPin, Star, FileText, Calendar, TrendingUp, DollarSign, MessageSquare } from 'lucide-react';
import { mockMerchants, mockReviews } from '@/src/mock/data';

export default function AdminMerchants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (merchant: any) => {
    setSelectedMerchant(merchant);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">QUẢN LÝ CỬA HÀNG 🏪</h1>
            <p className="text-on-surface-variant font-medium">Danh sách các đối tác cửa hàng trên hệ thống.</p>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <Input 
              placeholder="Tìm kiếm tên cửa hàng, địa chỉ..." 
              className="pl-12 h-12 bg-surface-container-highest/50 border-outline-variant/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockMerchants.map((merchant) => (
            <Card 
              key={merchant.id} 
              variant="glass" 
              className="p-6 border border-outline-variant/30 flex flex-col h-full cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleCardClick(merchant)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-highest">
                    <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-on-surface line-clamp-1">{merchant.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary mt-1">
                      <Star className="w-4 h-4 fill-primary" /> {merchant.rating}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{merchant.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Store className="w-4 h-4 shrink-0" />
                  <span>{merchant.openingHours}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={`Thông tin chi tiết - ${selectedMerchant?.name}`}
        >
          {selectedMerchant && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
              {/* Basic Info */}
              <div className="flex items-center gap-4 bg-surface-container-highest/30 p-4 rounded-xl border border-outline-variant/20">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-highest shrink-0">
                  <img src={selectedMerchant.logo} alt={selectedMerchant.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-on-surface">{selectedMerchant.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant mt-1">
                    <MapPin className="w-4 h-4" /> <span className="line-clamp-1">{selectedMerchant.address}</span>
                  </div>
                </div>
              </div>

              {/* Documents & Join Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <FileText className="w-4 h-4" />
                    <span className="font-bold text-sm">Giấy tờ pháp lý</span>
                  </div>
                  <div className="text-sm text-on-surface font-medium">Giấy phép ĐKKD: 0108923456</div>
                  <div className="text-xs text-primary mt-1 cursor-pointer hover:underline">Xem tài liệu đính kèm</div>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold text-sm">Thời gian tham gia</span>
                  </div>
                  <div className="text-sm text-on-surface font-medium">15/01/2024</div>
                  <div className="text-xs text-on-surface-variant mt-1">Hoạt động được 2 tháng</div>
                </div>
              </div>

              {/* Revenue Stats */}
              <div>
                <h4 className="font-bold text-sm text-on-surface-variant mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Thống kê doanh thu
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                    <div className="text-xs text-on-surface-variant mb-1">Hôm nay</div>
                    <div className="font-black text-on-surface">1.2M đ</div>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                    <div className="text-xs text-on-surface-variant mb-1">Tuần này</div>
                    <div className="font-black text-on-surface">8.5M đ</div>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                    <div className="text-xs text-on-surface-variant mb-1">Tháng này</div>
                    <div className="font-black text-on-surface">35.2M đ</div>
                  </div>
                  <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                    <div className="text-xs text-on-surface-variant mb-1">Năm nay</div>
                    <div className="font-black text-on-surface">120.5M đ</div>
                  </div>
                </div>
              </div>

              {/* Admin Commission */}
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-primary">Lợi nhuận Admin nhận được (20%)</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">Tổng cộng từ khi tham gia</div>
                  </div>
                </div>
                <div className="text-xl font-black text-primary">24.100.000đ</div>
              </div>

              {/* Reviews & Comments */}
              <div className="pt-4 border-t border-outline-variant/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm text-on-surface-variant flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Đánh giá & Bình luận
                  </h4>
                  <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-black text-primary text-sm">{selectedMerchant.rating} <span className="text-xs font-medium opacity-80">/ 5 sao</span></span>
                  </div>
                </div>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {review.userName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-on-surface">{review.userName}</div>
                            <div className="text-[10px] text-on-surface-variant">{review.createdAt}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span className="text-xs font-bold text-on-surface">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}
