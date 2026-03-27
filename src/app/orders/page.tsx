"use client";

import * as React from 'react';
import { useState } from 'react';
import { Store, Clock, MapPin, AlertCircle, QrCode, Navigation, Star, FileText, X, ChevronRight, ExternalLink, CreditCard, Receipt, MessageSquare, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/src/components/shared/Header';

type OrderStatus = 'WAITING' | 'URGENT' | 'COMPLETED' | 'CANCELLED';

interface Order {
  id: string;
  storeName: string;
  bagName: string;
  quantity: number;
  totalPrice: number;
  pickupTime: string;
  address: string;
  status: OrderStatus;
  urgentMessage?: string;
}

const mockOrders: Order[] = [
  {
    id: '#SB-1029',
    storeName: 'Highlands Coffee - Nguyễn Du',
    bagName: 'Túi Bánh Ngọt Cuối Ngày',
    quantity: 1,
    totalPrice: 45000,
    pickupTime: '20:00 - 21:00 Hôm nay',
    address: '123 Nguyễn Du, Quận 1, TP.HCM',
    status: 'WAITING',
  },
  {
    id: '#SB-1030',
    storeName: 'Bánh Mì Huynh Hoa',
    bagName: 'Túi Bánh Mì Thập Cẩm',
    quantity: 2,
    totalPrice: 60000,
    pickupTime: '19:30 - 20:30 Hôm nay',
    address: '26 Lê Thị Riêng, Quận 1, TP.HCM',
    status: 'URGENT',
    urgentMessage: 'Phải lấy trước 20:30',
  },
  {
    id: '#SB-1031',
    storeName: 'Katinat Saigon Kafe',
    bagName: 'Túi Nước Ngọt & Bánh',
    quantity: 1,
    totalPrice: 40000,
    pickupTime: '21:00 - 22:00 Hôm nay',
    address: '120 Nguyễn Thái Học, Quận 1, TP.HCM',
    status: 'WAITING',
  },
  {
    id: '#SB-1032',
    storeName: 'Phúc Long Coffee & Tea',
    bagName: 'Túi Trà Sữa Cuối Ngày',
    quantity: 2,
    totalPrice: 70000,
    pickupTime: '21:30 - 22:00 Hôm nay',
    address: '42 Ngô Đức Kế, Quận 1, TP.HCM',
    status: 'WAITING',
  },
  {
    id: '#SB-1033',
    storeName: 'Pizza 4P\'s',
    bagName: 'Túi Pizza Dư',
    quantity: 1,
    totalPrice: 120000,
    pickupTime: '22:00 - 22:30 Hôm nay',
    address: '8 Thủ Khoa Huân, Quận 1, TP.HCM',
    status: 'URGENT',
    urgentMessage: 'Phải lấy trước 22:30',
  },
  {
    id: '#SB-0985',
    storeName: 'The Coffee House',
    bagName: 'Túi Tráng Miệng',
    quantity: 1,
    totalPrice: 35000,
    pickupTime: '21:00 - 22:00 Hôm qua',
    address: '159 Phạm Ngũ Lão, Quận 1, TP.HCM',
    status: 'COMPLETED',
  },
  {
    id: '#SB-0980',
    storeName: 'Cơm Tấm Ba Ghiền',
    bagName: 'Túi Cơm Tấm',
    quantity: 1,
    totalPrice: 45000,
    pickupTime: '14:00 - 15:00 3 ngày trước',
    address: '84 Đặng Văn Ngữ, Phú Nhuận, TP.HCM',
    status: 'COMPLETED',
  },
  {
    id: '#SB-0975',
    storeName: 'Gong Cha',
    bagName: 'Túi Trà Sữa Trân Châu',
    quantity: 2,
    totalPrice: 60000,
    pickupTime: '21:00 - 22:00 4 ngày trước',
    address: '83 Hồ Tùng Mậu, Quận 1, TP.HCM',
    status: 'COMPLETED',
  },
  {
    id: '#SB-0970',
    storeName: 'McDonald\'s',
    bagName: 'Túi Burger & Khoai Tây',
    quantity: 1,
    totalPrice: 50000,
    pickupTime: '23:00 - 23:59 5 ngày trước',
    address: '2-2A Trần Hưng Đạo, Quận 1, TP.HCM',
    status: 'CANCELLED',
  },
  {
    id: '#SB-0950',
    storeName: 'KFC - Trần Hưng Đạo',
    bagName: 'Túi Gà Rán Giờ Chót',
    quantity: 1,
    totalPrice: 55000,
    pickupTime: '22:00 - 23:00 6 ngày trước',
    address: '456 Trần Hưng Đạo, Quận 5, TP.HCM',
    status: 'CANCELLED',
  }
];

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState<'CURRENT' | 'HISTORY'>('CURRENT');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<'QR' | 'DIRECTIONS' | 'DETAILS' | 'REVIEW' | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'CURRENT') {
      return order.status === 'WAITING' || order.status === 'URGENT';
    }
    return order.status === 'COMPLETED' || order.status === 'CANCELLED';
  });

  const openModal = (order: Order, type: 'QR' | 'DIRECTIONS' | 'DETAILS' | 'REVIEW') => {
    setSelectedOrder(order);
    setModalType(type);
    if (type === 'REVIEW') {
      setRating(0);
      setReviewComment('');
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOrder(null);
    setIsSubmitted(false);
  };

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'WAITING':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-500">
            Chờ lấy hàng
          </span>
        );
      case 'URGENT':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-500 animate-pulse flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Sắp hết giờ
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-500/20 text-gray-400">
            Đã hoàn thành
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500">
            Đã hủy
          </span>
        );
    }
  };

  const renderActions = (order: Order) => {
    const status = order.status;
    switch (status) {
      case 'WAITING':
        return (
          <>
            <button 
              onClick={() => openModal(order, 'DIRECTIONS')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Đường đi
            </button>
            <button 
              onClick={() => openModal(order, 'QR')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
            >
              <QrCode className="w-4 h-4" /> Xem mã QR
            </button>
          </>
        );
      case 'URGENT':
        return (
          <>
            <button 
              onClick={() => openModal(order, 'DIRECTIONS')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Đường đi
            </button>
            <button 
              onClick={() => openModal(order, 'QR')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-orange-500 text-black hover:bg-orange-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <QrCode className="w-4 h-4" /> Xem mã QR
            </button>
          </>
        );
      case 'COMPLETED':
        return (
          <>
            <button 
              onClick={() => openModal(order, 'DETAILS')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> Xem chi tiết
            </button>
            <button 
              onClick={() => openModal(order, 'REVIEW')}
              className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4" /> Đánh giá
            </button>
          </>
        );
      case 'CANCELLED':
        return (
          <button 
            onClick={() => openModal(order, 'DETAILS')}
            className="w-full py-2.5 rounded-xl font-medium text-sm border border-gray-800 text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Xem chi tiết
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Đơn hàng của tôi</h1>
          
          {/* Tabs */}
          <div className="flex p-1 bg-[#1a221d] rounded-xl border border-gray-800 w-full max-w-md">
            <button
              onClick={() => setActiveTab('CURRENT')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'CURRENT' 
                  ? 'bg-gray-800 text-green-500 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Hiện tại
            </button>
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'HISTORY' 
                  ? 'bg-gray-800 text-green-500 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Lịch sử
            </button>
          </div>
        </div>

        {/* Order List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`bg-[#1a221d] rounded-xl border border-gray-800 p-5 flex flex-col gap-4 ${
                  order.status === 'COMPLETED' || order.status === 'CANCELLED' ? 'opacity-70 hover:opacity-100 transition-opacity' : ''
                }`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <Store className="w-5 h-5 text-gray-400" />
                      {order.storeName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{order.id}</p>
                  </div>
                  {renderStatusBadge(order.status)}
                </div>

                {/* Card Content */}
                <div className="bg-[#0a0f0d] rounded-lg p-4 border border-gray-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-200">{order.bagName}</span>
                    <span className="text-sm text-gray-400">x{order.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Tổng tiền:</span>
                    <span className={`font-bold text-lg ${order.status === 'CANCELLED' ? 'text-gray-500 line-through' : 'text-green-400'}`}>
                      {order.totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                {/* Time & Location */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className={`w-4 h-4 mt-0.5 ${order.status === 'URGENT' ? 'text-orange-500' : 'text-gray-400'}`} />
                    <div>
                      <p className={`font-medium ${order.status === 'URGENT' ? 'text-orange-500' : 'text-gray-300'}`}>
                        {order.pickupTime}
                      </p>
                      {order.status === 'URGENT' && order.urgentMessage && (
                        <p className="text-xs text-orange-500 mt-0.5 font-bold">{order.urgentMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-gray-400 leading-snug">{order.address}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto pt-2">
                  {renderActions(order)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-1">Không có đơn hàng nào</h3>
              <p className="text-gray-500 text-sm">Bạn chưa có đơn hàng nào trong mục này.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {modalType && selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a221d] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {modalType === 'QR' && <><QrCode className="w-5 h-5 text-green-500" /> Mã nhận hàng</>}
                  {modalType === 'DIRECTIONS' && <><Navigation className="w-5 h-5 text-primary" /> Chỉ đường</>}
                  {modalType === 'DETAILS' && <><Receipt className="w-5 h-5 text-blue-400" /> Chi tiết đơn hàng</>}
                  {modalType === 'REVIEW' && <><Star className="w-5 h-5 text-yellow-400" /> Đánh giá dịch vụ</>}
                </h2>
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {modalType === 'QR' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white p-6 rounded-3xl mb-6 shadow-xl">
                      {/* Simulated QR Code */}
                      <div className="w-48 h-48 bg-white flex flex-col items-center justify-center border-4 border-black p-2">
                        <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-black' : 'bg-white'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 mb-8">
                      <p className="text-2xl font-black text-white tracking-widest">{selectedOrder.id}</p>
                      <p className="text-sm text-gray-400 font-medium">Đưa mã này cho nhân viên cửa hàng</p>
                    </div>
                    
                    <div className="w-full bg-[#0a0f0d] rounded-2xl p-4 border border-gray-800 text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Cửa hàng</p>
                          <p className="text-sm font-bold text-white">{selectedOrder.storeName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <p className="text-sm text-gray-400">{selectedOrder.address}</p>
                      </div>
                    </div>
                  </div>
                )}

                {modalType === 'DIRECTIONS' && (
                  <div className="space-y-6">
                    {/* Simulated Map */}
                    <div className="w-full aspect-video bg-[#0a0f0d] rounded-2xl border border-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        {/* Grid lines to simulate map */}
                        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
                          {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-gray-700" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Route Line */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path
                          d="M 20 80 Q 50 50 80 20"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </svg>

                      {/* Markers */}
                      <div className="absolute left-[15%] bottom-[15%] flex flex-col items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                        <p className="text-[10px] font-bold text-blue-400 mt-1 bg-black/50 px-1 rounded">Bạn</p>
                      </div>
                      <div className="absolute right-[15%] top-[15%] flex flex-col items-center">
                        <MapPin className="w-6 h-6 text-green-500 drop-shadow-lg" />
                        <p className="text-[10px] font-bold text-green-400 mt-1 bg-black/50 px-1 rounded">Cửa hàng</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#0a0f0d] p-4 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Khoảng cách</p>
                        <p className="text-xl font-black text-white">1.2 km</p>
                      </div>
                      <div className="bg-[#0a0f0d] p-4 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Thời gian</p>
                        <p className="text-xl font-black text-green-500">5 phút</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Điểm đi</p>
                          <p className="text-sm font-medium text-white">Vị trí của bạn</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-3">
                        <div className="w-[2px] h-6 bg-gray-800" />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                          <MapPin className="w-3 h-3 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Điểm đến</p>
                          <p className="text-sm font-medium text-white">{selectedOrder.storeName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {modalType === 'DETAILS' && (
                  <div className="space-y-6">
                    {/* Order Status Header */}
                    <div className="flex items-center justify-between bg-[#0a0f0d] p-4 rounded-2xl border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedOrder.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' : 
                          selectedOrder.status === 'CANCELLED' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {selectedOrder.status === 'COMPLETED' ? <CheckCircle2 className="w-6 h-6" /> : 
                           selectedOrder.status === 'CANCELLED' ? <X className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Trạng thái</p>
                          <p className="text-sm font-bold text-white">
                            {selectedOrder.status === 'COMPLETED' ? 'Đã nhận hàng' : 
                             selectedOrder.status === 'CANCELLED' ? 'Đã hủy đơn' : 'Đang xử lý'}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 font-medium italic">Cập nhật 2 phút trước</p>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-3">
                      <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest px-1">Sản phẩm đã đặt</h3>
                      <div className="bg-[#0a0f0d] rounded-2xl border border-gray-800 overflow-hidden">
                        <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                              <Store className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{selectedOrder.bagName}</p>
                              <p className="text-xs text-gray-400">Số lượng: {selectedOrder.quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-white">{(selectedOrder.totalPrice).toLocaleString('vi-VN')}đ</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="space-y-3">
                      <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest px-1">Tóm tắt thanh toán</h3>
                      <div className="bg-[#0a0f0d] rounded-2xl border border-gray-800 p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tạm tính</span>
                          <span className="text-gray-200">{selectedOrder.totalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Phí dịch vụ</span>
                          <span className="text-gray-200">0đ</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Giảm giá</span>
                          <span className="text-green-500">-0đ</span>
                        </div>
                        <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                          <span className="font-bold text-white">Tổng cộng</span>
                          <span className="text-xl font-black text-green-500">{selectedOrder.totalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-[#0a0f0d] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phương thức thanh toán</p>
                          <p className="text-sm font-medium text-white">Ví MoMo</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                )}

                {modalType === 'REVIEW' && (
                  <div className="space-y-8">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="review-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-8"
                        >
                          <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold text-white">Bạn thấy dịch vụ thế nào?</h3>
                            <p className="text-sm text-gray-400">Đánh giá của bạn giúp cửa hàng cải thiện hơn</p>
                          </div>

                          {/* Star Rating */}
                          <div className="flex justify-center gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-90"
                              >
                                <Star 
                                  className={`w-10 h-10 ${
                                    (hoverRating || rating) >= star 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-700'
                                  } transition-colors`} 
                                />
                              </button>
                            ))}
                          </div>

                          {/* Quick Tags */}
                          <div className="flex flex-wrap justify-center gap-2">
                            {['Ngon miệng', 'Giá hời', 'Phục vụ tốt', 'Đóng gói kỹ', 'Đúng mô tả'].map((tag) => (
                              <button
                                key={tag}
                                className="px-4 py-2 rounded-full border border-gray-800 text-xs font-medium text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>

                          {/* Comment Area */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest px-1">
                              <MessageSquare className="w-3 h-3" /> Nhận xét thêm
                            </div>
                            <textarea
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                              className="w-full h-32 bg-[#0a0f0d] border border-gray-800 rounded-2xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="review-success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 flex flex-col items-center text-center space-y-4"
                        >
                          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Cảm ơn bạn!</h3>
                          <p className="text-gray-400 max-w-[240px]">Đánh giá của bạn đã được gửi thành công. Chúc bạn một ngày tốt lành!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[#0a0f0d]/50 border-t border-gray-800">
                {modalType === 'QR' && (
                  <button 
                    onClick={closeModal}
                    className="w-full h-14 rounded-2xl bg-green-500 text-black font-black text-lg hover:bg-green-400 transition-all shadow-lg shadow-green-500/20"
                  >
                    Xong
                  </button>
                )}
                
                {modalType === 'DIRECTIONS' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={closeModal}
                      className="flex-1 h-14 rounded-2xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-all"
                    >
                      Đóng
                    </button>
                    <button 
                      className="flex-[2] h-14 rounded-2xl bg-primary text-on-primary font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                    >
                      Mở Google Maps <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {modalType === 'DETAILS' && (
                  <div className="flex gap-3">
                    <button 
                      onClick={closeModal}
                      className="flex-1 h-14 rounded-2xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-all"
                    >
                      Đóng
                    </button>
                    {selectedOrder.status === 'COMPLETED' && (
                      <button 
                        onClick={() => setModalType('REVIEW')}
                        className="flex-[2] h-14 rounded-2xl bg-green-500 text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-500/20"
                      >
                        Đánh giá ngay <Star className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}

                {modalType === 'REVIEW' && (
                  <div className="flex gap-3">
                    {!isSubmitted ? (
                      <>
                        <button 
                          onClick={() => setModalType('DETAILS')}
                          className="flex-1 h-14 rounded-2xl border border-gray-700 text-gray-300 font-bold hover:bg-gray-800 transition-all"
                        >
                          Quay lại
                        </button>
                        <button 
                          onClick={() => setIsSubmitted(true)}
                          disabled={!rating}
                          className={`flex-[2] h-14 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl ${
                            rating 
                              ? 'bg-green-500 text-black hover:scale-[1.02] active:scale-[0.98] shadow-green-500/20' 
                              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Gửi đánh giá <ThumbsUp className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={closeModal}
                        className="w-full h-14 rounded-2xl bg-green-500 text-black font-black text-lg hover:bg-green-400 transition-all shadow-lg shadow-green-500/20"
                      >
                        Đóng
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
