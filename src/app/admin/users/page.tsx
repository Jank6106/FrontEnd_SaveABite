"use client";

import { useState } from 'react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Modal } from '@/src/components/ui/Modal';
import { Search, Filter, UserX, UserCheck, Phone, Mail, FileText, Download, Store, Trash2 } from 'lucide-react';

const mockUsersList = [
  { id: 'USR-001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', role: 'customer', status: 'active', joined: '2024-01-15' },
  { id: 'USR-002', name: 'Bếp Xanh Hàng Mã', email: 'bepxanh@saveabite.vn', phone: '0987654321', role: 'merchant', status: 'active', joined: '2024-02-20' },
  { id: 'USR-003', name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0912345678', role: 'customer', status: 'banned', joined: '2024-03-01' },
  { id: 'USR-004', name: 'Trần Thị D', email: 'tranthid@gmail.com', phone: '0933445566', role: 'customer', status: 'active', joined: '2024-03-10' },
  { id: 'USR-005', name: 'Admin System', email: 'admin@saveabite.vn', phone: '0999888777', role: 'admin', status: 'active', joined: '2023-12-01' },
  { id: 'USR-006', name: 'Phạm Thị E', email: 'phamthie@gmail.com', phone: '0944556677', role: 'customer', status: 'active', joined: '2024-03-12' },
  { id: 'USR-007', name: 'Tiệm Bánh Ngọt Ngào', email: 'tiembanh@saveabite.vn', phone: '0955667788', role: 'merchant', status: 'active', joined: '2024-03-15' },
  { id: 'USR-008', name: 'Hoàng Văn F', email: 'hoangvanf@gmail.com', phone: '0966778899', role: 'customer', status: 'active', joined: '2024-03-18' },
  { id: 'USR-009', name: 'Vũ Thị G', email: 'vuthig@gmail.com', phone: '0977889900', role: 'customer', status: 'active', joined: '2024-03-20' },
  { id: 'USR-010', name: 'Cơm Tấm Đêm', email: 'comtamdem@saveabite.vn', phone: '0988990011', role: 'merchant', status: 'banned', joined: '2024-03-21' },
  { id: 'USR-011', name: 'Đặng Văn H', email: 'dangvanh@gmail.com', phone: '0999001122', role: 'customer', status: 'active', joined: '2024-03-22' },
  { id: 'USR-012', name: 'Bùi Thị I', email: 'buithii@gmail.com', phone: '0900112233', role: 'customer', status: 'active', joined: '2024-03-23' },
  { id: 'USR-013', name: 'Healthy Green', email: 'healthygreen@saveabite.vn', phone: '0911223344', role: 'merchant', status: 'active', joined: '2024-03-24' },
  { id: 'USR-014', name: 'Ngô Văn K', email: 'ngovank@gmail.com', phone: '0922334455', role: 'customer', status: 'active', joined: '2024-03-25' },
  { id: 'USR-015', name: 'Lý Thị L', email: 'lythil@gmail.com', phone: '0933445566', role: 'customer', status: 'active', joined: '2024-03-26' },
  { id: 'USR-016', name: 'Bobapop', email: 'bobapop@saveabite.vn', phone: '0944556677', role: 'merchant', status: 'active', joined: '2024-03-27' },
  { id: 'USR-017', name: 'Đỗ Văn M', email: 'dovanm@gmail.com', phone: '0955667788', role: 'customer', status: 'active', joined: '2024-03-28' },
];

const mockPurchaseHistory = [
  { id: 'ORD-1029', date: '2024-03-28 10:30', items: 'Túi Bất Ngờ - Bakery x1', total: 35000, status: 'Hoàn thành', merchant: 'Artisan Bakery' },
  { id: 'ORD-1025', date: '2024-03-25 12:15', items: 'Cơm Tấm Sườn Bì x2', total: 70000, status: 'Hoàn thành', merchant: 'Cơm Tấm Đêm' },
  { id: 'ORD-0988', date: '2024-03-20 18:45', items: 'Salad Gà Nướng x1', total: 45000, status: 'Đã hủy', merchant: 'Healthy Green' },
  { id: 'ORD-0950', date: '2024-03-15 09:00', items: 'Bánh Mì Chảo x2', total: 60000, status: 'Hoàn thành', merchant: 'Tiệm Bánh Mì Chảo' },
  { id: 'ORD-0912', date: '2024-03-10 19:30', items: 'Trà Sữa Trân Châu x3', total: 90000, status: 'Hoàn thành', merchant: 'Bobapop' },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsersList);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBlockStatus = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'active' ? 'banned' : 'active' };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-10 flex flex-col h-screen overflow-hidden gap-6">
        <header className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">QUẢN LÝ NGƯỜI DÙNG 👥</h1>
            <p className="text-on-surface-variant font-medium">Xem và quản lý tài khoản người dùng trên hệ thống.</p>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <Input 
              placeholder="Tìm kiếm theo tên, email, SĐT..." 
              className="pl-10 h-10 bg-surface-container-highest/50 border-outline-variant/30 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card variant="glass" className="border border-outline-variant/30 flex-1 flex flex-col min-h-0 overflow-hidden" hover={false}>
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-highest/50 border-b border-outline-variant/30">
                  <th className="px-4 py-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Tên</th>
                  <th className="px-4 py-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Email</th>
                  <th className="px-4 py-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Số điện thoại</th>
                  <th className="px-4 py-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Ngày tham gia</th>
                  <th className="px-4 py-3 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-surface-container-highest/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(user)}
                  >
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {user.name[0]}
                        </div>
                        <div className="font-bold text-xs text-on-surface line-clamp-1">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[11px] text-on-surface-variant">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 shrink-0" /> <span className="line-clamp-1">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[11px] text-on-surface-variant">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 shrink-0" /> {user.phone}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-[11px] text-on-surface-variant font-medium">
                      {user.joined}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`w-8 h-8 ${user.status === 'active' ? "text-error hover:bg-error/10" : "text-primary hover:bg-primary/10"}`} 
                          title={user.status === 'active' ? "Chặn người dùng" : "Bỏ chặn người dùng"}
                          onClick={(e) => toggleBlockStatus(user.id, e)}
                        >
                          {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8 text-error hover:bg-error/10" 
                          title="Xóa người dùng"
                          onClick={(e) => deleteUser(user.id, e)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={`Lịch sử mua hàng - ${selectedUser?.name}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-surface-container-highest/30 p-4 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                  {selectedUser?.name?.[0]}
                </div>
                <div>
                  <div className="font-bold text-on-surface">{selectedUser?.name}</div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedUser?.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedUser?.phone}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Tải về
              </Button>
            </div>

            <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              <h4 className="font-bold text-sm text-on-surface-variant mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Danh sách đơn hàng gần đây
              </h4>
              {mockPurchaseHistory.map(order => (
                <div key={order.id} className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-on-surface">{order.id}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{order.date}</div>
                    </div>
                    <Badge variant={order.status === 'Hoàn thành' ? 'primary' : 'error'} className={order.status === 'Hoàn thành' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
                    <Store className="w-4 h-4" /> {order.merchant}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
                    <div className="text-sm font-medium text-on-surface">{order.items}</div>
                    <div className="font-black text-primary">{order.total.toLocaleString('vi-VN')}đ</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
