import * as React from 'react';
import { useState } from 'react';
import { Store, Clock, MapPin, AlertCircle, QrCode, Navigation, Star, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/shared/Header';

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

export const MyOrders = () => {
  const [activeTab, setActiveTab] = useState<'CURRENT' | 'HISTORY'>('CURRENT');

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'CURRENT') {
      return order.status === 'WAITING' || order.status === 'URGENT';
    }
    return order.status === 'COMPLETED' || order.status === 'CANCELLED';
  });

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

  const renderActions = (status: OrderStatus) => {
    switch (status) {
      case 'WAITING':
        return (
          <>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" /> Đường đi
            </button>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
              <QrCode className="w-4 h-4" /> Xem mã QR
            </button>
          </>
        );
      case 'URGENT':
        return (
          <>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" /> Đường đi
            </button>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-orange-500 text-black hover:bg-orange-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
              <QrCode className="w-4 h-4" /> Xem mã QR
            </button>
          </>
        );
      case 'COMPLETED':
        return (
          <>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Xem chi tiết
            </button>
            <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
              <Star className="w-4 h-4" /> Đánh giá
            </button>
          </>
        );
      case 'CANCELLED':
        return (
          <button className="w-full py-2.5 rounded-xl font-medium text-sm border border-gray-800 text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
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
                  {renderActions(order.status)}
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
    </div>
  );
};
