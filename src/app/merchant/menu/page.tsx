"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Sidebar } from '@/src/components/shared/Sidebar';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { mockFoodItems } from '@/src/mock/data';
import { formatCurrency, cn } from '@/src/lib/utils';
import { useState } from 'react';
import { Modal } from '@/src/components/ui/Modal';
import { Textarea } from '@/src/components/ui/Textarea';
import { motion } from 'motion/react';

export default function MerchantMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    originalPrice: '',
    discountPrice: '',
    category: 'Bánh mỳ',
    remainingCount: '',
    description: '',
  });
  const [productType, setProductType] = useState<'daily' | 'longterm'>('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filteredItems = mockFoodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setFormData({
      name: '',
      originalPrice: '',
      discountPrice: '',
      category: 'Bánh mỳ',
      remainingCount: '',
      description: '',
    });
    setProductType('daily');
    setStartDate('');
    setEndDate('');
    setImagePreview(null);
    setModalMode('add');
  };

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      originalPrice: item.originalPrice.toString(),
      discountPrice: item.discountPrice.toString(),
      category: item.category,
      remainingCount: item.remainingCount.toString(),
      description: item.description || 'Mô tả chi tiết món ăn...',
    });
    setProductType('daily');
    setImagePreview(item.image);
    setModalMode('edit');
  };

  const openDeleteModal = (item: any) => {
    setSelectedItem(item);
    setModalMode('delete');
  };

  const openViewModal = (item: any) => {
    setSelectedItem(item);
    setModalMode('view');
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedItem(null);
    setShowSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1500);
  };

  const handleDelete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <Button 
            onClick={openAddModal}
            className="gap-2 h-12 px-6 shadow-xl shadow-primary/20"
          >
            <Plus className="w-5 h-5" /> THÊM MÓN MỚI
          </Button>
        </header>

        {/* Modal: Add / Edit Item */}
        <Modal 
          isOpen={modalMode === 'add' || modalMode === 'edit'} 
          onClose={handleCloseModal} 
          title={modalMode === 'add' ? "Thêm món mới vào thực đơn 🍱" : "Chỉnh sửa món ăn 📝"}
        >
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight">
                {modalMode === 'add' ? 'THÊM MÓN THÀNH CÔNG!' : 'CẬP NHẬT THÀNH CÔNG!'}
              </h3>
              <p className="text-on-surface-variant font-medium">
                {modalMode === 'add' ? 'Món ăn của bạn đã được đăng bán trên hệ thống.' : 'Thông tin món ăn đã được lưu lại.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Tên món ăn</label>
                <Input 
                  placeholder="Ví dụ: Túi Bất Ngờ - Bakery" 
                  required 
                  className="h-12" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Product Type Selection */}
              <div className="space-y-4 p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest block mb-2">Loại sản phẩm</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 cursor-pointer hover:bg-surface-container-highest/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input 
                      type="radio" 
                      name="productType" 
                      value="daily" 
                      checked={productType === 'daily'}
                      onChange={() => setProductType('daily')}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface">Sản phẩm trong ngày</span>
                  </label>
                  <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 cursor-pointer hover:bg-surface-container-highest/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input 
                      type="radio" 
                      name="productType" 
                      value="longterm" 
                      checked={productType === 'longterm'}
                      onChange={() => setProductType('longterm')}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-bold text-on-surface">Sản phẩm dài hạn</span>
                  </label>
                </div>

                {/* Date Range for Long-term Product */}
                {productType === 'longterm' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 gap-4 pt-2"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Từ ngày</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <Input 
                          type="date" 
                          required 
                          className="pl-10 h-10 text-xs" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Đến ngày</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                        <Input 
                          type="date" 
                          required 
                          className="pl-10 h-10 text-xs" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Giá gốc (VND)</label>
                  <Input 
                    type="number" 
                    placeholder="140000" 
                    required 
                    className="h-12" 
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Giá giảm (VND)</label>
                  <Input 
                    type="number" 
                    placeholder="35000" 
                    required 
                    className="h-12" 
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Danh mục</label>
                  <select 
                    className="w-full h-12 rounded-2xl border border-outline-variant/30 bg-surface-container-highest/50 px-4 py-2 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option>Bánh mỳ</option>
                    <option>Nhà hàng</option>
                    <option>Tạp hóa</option>
                    <option>Đồ mặn</option>
                    <option>Đồ uống</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Số lượng còn lại</label>
                  <Input 
                    type="number" 
                    placeholder="5" 
                    required 
                    className="h-12" 
                    value={formData.remainingCount}
                    onChange={(e) => setFormData({...formData, remainingCount: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Mô tả món ăn</label>
                <Textarea 
                  placeholder="Mô tả ngắn gọn về món ăn của bạn..." 
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Image Upload from File Explorer */}
              <div className="space-y-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Hình ảnh món ăn</label>
                <div 
                  className={cn(
                    "relative group cursor-pointer border-2 border-dashed border-outline-variant/30 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/50 bg-surface-container-highest/30",
                    imagePreview ? "aspect-video" : "h-32"
                  )}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <Upload className="w-5 h-5" /> Thay đổi ảnh
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tải ảnh từ thiết bị</p>
                    </div>
                  )}
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-14 font-bold uppercase tracking-widest"
                  onClick={handleCloseModal}
                >
                  HỦY BỎ
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-14 font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'ĐANG XỬ LÝ...' : (modalMode === 'add' ? 'ĐĂNG BÁN NGAY' : 'LƯU THAY ĐỔI')}
                </Button>
              </div>
            </form>
          )}
        </Modal>

        {/* Modal: Delete Confirmation */}
        <Modal 
          isOpen={modalMode === 'delete'} 
          onClose={handleCloseModal} 
          title="Xác nhận xóa món ăn"
        >
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center text-error">
                <Trash2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight">ĐÃ XÓA THÀNH CÔNG!</h3>
              <p className="text-on-surface-variant font-medium">Món ăn đã được gỡ khỏi thực đơn.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-on-surface">Bạn có chắc chắn muốn xóa?</h3>
                <p className="text-on-surface-variant">
                  Món <span className="font-bold text-on-surface">"{selectedItem?.name}"</span> sẽ bị xóa vĩnh viễn khỏi thực đơn của bạn. Hành động này không thể hoàn tác.
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 font-bold uppercase tracking-widest"
                  onClick={handleCloseModal}
                >
                  HỦY BỎ
                </Button>
                <Button 
                  type="button" 
                  className="flex-1 h-12 font-bold uppercase tracking-widest bg-error hover:bg-error/90 text-white shadow-xl shadow-error/20"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'ĐANG XÓA...' : 'XÓA MÓN NÀY'}
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal: View Details */}
        <Modal 
          isOpen={modalMode === 'view'} 
          onClose={handleCloseModal} 
          title="Chi tiết món ăn"
        >
          {selectedItem && (
            <div className="space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden relative">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="primary" className="shadow-lg shadow-primary/20">
                    {selectedItem.category}
                  </Badge>
                  <Badge variant={selectedItem.remainingCount > 0 ? 'secondary' : 'tertiary'} className="shadow-lg">
                    {selectedItem.remainingCount > 0 ? 'Đang bán' : 'Hết hàng'}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-on-surface mb-2">{selectedItem.name}</h3>
                <p className="text-on-surface-variant font-medium">{selectedItem.description || 'Chưa có mô tả cho món ăn này.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10">
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Giá bán</p>
                  <p className="text-xl font-black text-primary">{formatCurrency(selectedItem.discountPrice)}</p>
                  <p className="text-xs text-on-surface-variant line-through font-bold">{formatCurrency(selectedItem.originalPrice)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Số lượng còn</p>
                  <p className="text-xl font-black text-on-surface">{selectedItem.remainingCount} <span className="text-sm font-medium text-on-surface-variant">suất</span></p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 font-bold uppercase tracking-widest"
                  onClick={handleCloseModal}
                >
                  ĐÓNG
                </Button>
                <Button 
                  type="button" 
                  className="flex-1 h-12 font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                  onClick={() => openEditModal(selectedItem)}
                >
                  CHỈNH SỬA
                </Button>
              </div>
            </div>
          )}
        </Modal>

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
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-primary" onClick={() => openEditModal(item)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-primary" onClick={() => openViewModal(item)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-error" onClick={() => openDeleteModal(item)}>
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
