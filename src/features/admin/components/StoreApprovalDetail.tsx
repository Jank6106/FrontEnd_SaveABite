import { motion } from 'motion/react';
import { X, User, Phone, Mail, MapPin, Clock, Tag, FileText, Image as ImageIcon, Check } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { useState } from 'react';

interface StoreApprovalDetailProps {
  store: any;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export function StoreApprovalDetail({ store, onClose, onApprove, onReject }: StoreApprovalDetailProps) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  if (!store) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-outline-variant/20 bg-surface-container-lowest shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-on-surface">{store.name}</h1>
          <Badge className="bg-[#FFB300]/20 text-[#FFB300] border-[#FFB300]/30 font-bold tracking-wider">ĐĂNG KÝ MỚI</Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-surface-container-highest">
          <X className="w-6 h-6" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-surface-container-lowest/50">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Section 1: General Info */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Thông tin chung
            </h2>
            <Card variant="glass" className="p-6 border border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-6" hover={false}>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Họ tên chủ cửa hàng</div>
                  <div className="font-medium text-on-surface">Nguyễn Thị Thu Hương</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Liên hệ</div>
                  <div className="flex items-center gap-2 text-on-surface font-medium mb-1">
                    <Phone className="w-4 h-4 text-on-surface-variant" /> 0987 654 321
                  </div>
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <Mail className="w-4 h-4 text-on-surface-variant" /> huong.nguyen@example.com
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Giờ hoạt động dự kiến</div>
                  <div className="flex items-center gap-2 text-on-surface font-medium">
                    <Clock className="w-4 h-4 text-on-surface-variant" /> 06:00 - 22:00 hàng ngày
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Địa chỉ chi tiết</div>
                <div className="flex items-start gap-2 text-on-surface font-medium mb-3">
                  <MapPin className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" /> 
                  <span>{store.address}</span>
                </div>
                {/* Mini map placeholder */}
                <div className="w-full h-32 bg-surface-container-highest rounded-xl border border-outline-variant/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <MapPin className="w-8 h-8 text-primary relative z-10" />
                  <span className="text-xs font-bold text-on-surface-variant relative z-10 ml-2">Bản đồ khu vực</span>
                </div>
              </div>
            </Card>
          </section>

          {/* Section 2: Business Type */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" /> Loại hình kinh doanh & Sản phẩm
            </h2>
            <Card variant="glass" className="p-6 border border-outline-variant/30" hover={false}>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-surface-container-highest px-3 py-1.5 text-sm">Đồ ăn nhanh</Badge>
                <Badge variant="outline" className="bg-surface-container-highest px-3 py-1.5 text-sm">Bánh ngọt</Badge>
                <Badge variant="outline" className="bg-surface-container-highest px-3 py-1.5 text-sm">Đồ uống</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 text-sm font-bold">Thanh lý cận date trong ngày</Badge>
              </div>
              <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                Cửa hàng chuyên phục vụ các loại bánh mì chảo, đồ ăn nhanh buổi sáng và trưa. Cam kết tham gia nền tảng để thanh lý các nguyên liệu và bánh mì dư thừa vào cuối ngày với mức giá ưu đãi, giảm thiểu lãng phí thực phẩm.
              </p>
            </Card>
          </section>

          {/* Section 3: Verification Documents */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Giấy tờ xác minh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-bold text-on-surface-variant">CCCD (Mặt trước)</div>
                <div className="aspect-[1.6/1] border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-surface-container-highest transition-colors cursor-pointer p-2">
                  <img src="https://picsum.photos/seed/idfront/400/250" alt="CCCD Front" className="w-full h-full object-cover rounded-xl opacity-80 mix-blend-luminosity" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-on-surface-variant">CCCD (Mặt sau)</div>
                <div className="aspect-[1.6/1] border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-surface-container-highest transition-colors cursor-pointer p-2">
                  <img src="https://picsum.photos/seed/idback/400/250" alt="CCCD Back" className="w-full h-full object-cover rounded-xl opacity-80 mix-blend-luminosity" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-on-surface-variant">Giấy phép kinh doanh</div>
                <div className="aspect-[1.6/1] border border-outline-variant/30 rounded-2xl overflow-hidden relative group cursor-pointer">
                  <img src="https://picsum.photos/seed/license/400/250" alt="License" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Xem chi tiết</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Store Photos */}
          <section>
            <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" /> Hình ảnh cửa hàng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden border border-outline-variant/20">
                <img src="https://picsum.photos/seed/storefront/400/400" alt="Store Front" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-outline-variant/20">
                <img src="https://picsum.photos/seed/storeinside/400/400" alt="Store Inside" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-outline-variant/20 hidden md:block">
                <img src="https://picsum.photos/seed/storekitchen/400/400" alt="Store Kitchen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-outline-variant/20 bg-surface-container-lowest shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-end gap-4">
          {isRejecting ? (
            <div className="flex-1 flex items-center gap-2 w-full">
              <input 
                type="text" 
                placeholder="Nhập lý do từ chối..." 
                className="flex-1 h-12 px-4 rounded-xl border border-error/50 bg-error/5 text-on-surface focus:outline-none focus:border-error"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                autoFocus
              />
              <Button variant="outline" className="h-12 px-6 text-on-surface-variant" onClick={() => setIsRejecting(false)}>Hủy</Button>
              <Button className="h-12 px-6 bg-error hover:bg-error/90 text-white" onClick={() => onReject(store.id, rejectReason)}>Xác nhận từ chối</Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto h-14 px-8 text-error border-error/30 hover:bg-error/10 font-bold text-base"
                onClick={() => setIsRejecting(true)}
              >
                TỪ CHỐI
              </Button>
              <Button 
                className="w-full sm:w-auto h-14 px-12 bg-[#CCFF00] hover:bg-[#B3E600] text-black font-black text-lg shadow-xl shadow-[#CCFF00]/20"
                onClick={() => onApprove(store.id)}
              >
                <Check className="w-6 h-6 mr-2" /> PHÊ DUYỆT
              </Button>
            </>
          )}
        </div>
      </footer>
    </motion.div>
  );
}
