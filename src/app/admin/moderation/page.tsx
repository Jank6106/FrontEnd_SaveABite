"use client";

import { useState } from 'react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ShieldCheck, Check, X, AlertTriangle, Store, FileText, Star } from 'lucide-react';
import { StoreApprovalDetail } from '@/src/features/admin/components/StoreApprovalDetail';
import { AnimatePresence } from 'motion/react';
import { mockMerchants } from '@/src/mock/data';
import { Modal } from '@/src/components/ui/Modal';

const initialPendingApprovals = [
  { id: 'req-1', type: 'merchant_registration', name: 'Tiệm Bánh Mì Chảo Cô 3', address: '123 Lò Đúc, Hà Nội', submittedAt: '2024-03-28 10:00', status: 'pending' },
  { id: 'req-2', type: 'merchant_registration', name: 'Cơm Tấm Đêm Sài Gòn', address: '456 Xã Đàn, Hà Nội', submittedAt: '2024-03-27 15:30', status: 'pending' },
];

const initialReportedReviews = [
  { 
    id: 'rep-1', 
    user: 'Khách hàng ẩn danh', 
    merchant: 'Artisan Bakery & Cafe', 
    reason: 'Ngôn từ không phù hợp', 
    date: '2024-03-28 09:15',
    reviewContent: 'Đồ ăn dở tệ, chủ quán thái độ lồi lõm!!! Không bao giờ quay lại cái quán rác rưởi này.',
    reviewRating: 1,
    reviewerName: 'Nguyễn Văn Toxic'
  },
];

export default function AdminModeration() {
  const [activeTab, setActiveTab] = useState('merchants');
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [pendingList, setPendingList] = useState(initialPendingApprovals);
  
  const [reportList, setReportList] = useState(initialReportedReviews);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleApprove = (id: string) => {
    const storeToApprove = pendingList.find(s => s.id === id);
    if (storeToApprove) {
      // Thêm vào danh sách cửa hàng
      mockMerchants.unshift({
        id: `m${Date.now()}`,
        name: storeToApprove.name,
        logo: `https://picsum.photos/seed/${id}/400/400`,
        address: storeToApprove.address,
        openingHours: '06:00 - 22:00',
        rating: 5.0,
        isVerified: true,
        location: { lat: 21.0285, lng: 105.8542 },
      });
    }
    setPendingList(prev => prev.filter(s => s.id !== id));
    setSelectedStore(null);
  };

  const handleReject = (id: string, reason: string) => {
    setPendingList(prev => prev.filter(s => s.id !== id));
    setSelectedStore(null);
  };

  const handleDeleteReview = (id: string) => {
    setReportList(prev => prev.filter(r => r.id !== id));
    setIsReportModalOpen(false);
  };

  const handleViewReportDetails = (report: any) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-10 space-y-10 overflow-y-auto custom-scrollbar">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">KIỂM DUYỆT 🛡️</h1>
            <p className="text-on-surface-variant font-medium">Phê duyệt cửa hàng mới và xử lý các báo cáo vi phạm.</p>
          </div>
        </header>

        <div className="flex gap-2 p-1 bg-surface-container-highest/50 rounded-2xl border border-outline-variant/30 w-fit">
          <button
            onClick={() => setActiveTab('merchants')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'merchants' 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
            }`}
          >
            <Store className="w-4 h-4" /> Cửa hàng chờ duyệt
            <Badge variant={activeTab === 'merchants' ? 'primary' : 'outline'} className="text-[10px] px-1.5 py-0">
              {pendingList.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'reports' 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Báo cáo vi phạm
            <Badge variant={activeTab === 'reports' ? 'primary' : 'outline'} className="text-[10px] px-1.5 py-0">
              {reportList.length}
            </Badge>
          </button>
        </div>

        {activeTab === 'merchants' && (
          <div className="space-y-4">
            {pendingList.map((req) => (
              <Card 
                key={req.id} 
                variant="glass" 
                className="p-6 border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-surface-container-highest/50 transition-colors"
                onClick={() => setSelectedStore(req)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-on-surface">{req.name}</h3>
                      <Badge variant="tertiary" className="bg-tertiary/10 text-tertiary text-[10px]">Đăng ký mới</Badge>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-1">{req.address}</p>
                    <p className="text-xs font-bold text-on-surface-variant opacity-70">Gửi lúc: {req.submittedAt}</p>
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button variant="outline" className="gap-2 text-error border-error/30 hover:bg-error/10" onClick={(e) => { e.stopPropagation(); handleReject(req.id, 'Từ chối nhanh'); }}>
                    <X className="w-4 h-4" /> TỪ CHỐI
                  </Button>
                  <Button className="gap-2 shadow-xl shadow-primary/20" onClick={(e) => { e.stopPropagation(); handleApprove(req.id); }}>
                    <Check className="w-4 h-4" /> PHÊ DUYỆT
                  </Button>
                </div>
              </Card>
            ))}
            {pendingList.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-bold">Không có yêu cầu phê duyệt nào.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reportList.map((report) => (
              <Card key={report.id} variant="glass" className="p-6 border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-on-surface">Báo cáo đánh giá</h3>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-1">
                      <span className="font-bold text-on-surface">{report.user}</span> đã báo cáo đánh giá tại <span className="font-bold text-on-surface">{report.merchant}</span>
                    </p>
                    <p className="text-sm text-error font-medium mb-1">Lý do: {report.reason}</p>
                    <p className="text-xs font-bold text-on-surface-variant opacity-70">Gửi lúc: {report.date}</p>
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button variant="outline" className="gap-2" onClick={() => handleViewReportDetails(report)}>
                    <FileText className="w-4 h-4" /> XEM CHI TIẾT
                  </Button>
                  <Button className="gap-2 bg-error hover:bg-error/90 text-white shadow-xl shadow-error/20" onClick={() => handleDeleteReview(report.id)}>
                    <X className="w-4 h-4" /> XÓA ĐÁNH GIÁ
                  </Button>
                </div>
              </Card>
            ))}
            {reportList.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-bold">Không có báo cáo vi phạm nào.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedStore && (
          <StoreApprovalDetail 
            store={selectedStore} 
            onClose={() => setSelectedStore(null)} 
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>

      <Modal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        title="Chi tiết báo cáo vi phạm"
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="bg-error/10 p-4 rounded-xl border border-error/20">
              <h4 className="font-bold text-error mb-1">Lý do báo cáo:</h4>
              <p className="text-on-surface">{selectedReport.reason}</p>
              <p className="text-xs text-on-surface-variant mt-2">Người báo cáo: {selectedReport.user} - {selectedReport.date}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-on-surface-variant mb-3">Nội dung đánh giá bị báo cáo:</h4>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-on-surface">{selectedReport.reviewerName}</div>
                  <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-bold text-on-surface">{selectedReport.reviewRating}</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant">{selectedReport.reviewContent}</p>
                <div className="text-xs text-on-surface-variant mt-2">Cửa hàng: {selectedReport.merchant}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10">
              <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>ĐÓNG</Button>
              <Button className="bg-error hover:bg-error/90 text-white" onClick={() => handleDeleteReview(selectedReport.id)}>
                <X className="w-4 h-4 mr-2" /> XÓA ĐÁNH GIÁ NÀY
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
