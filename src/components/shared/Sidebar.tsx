/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  LogOut,
  Leaf,
  Users,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  role: 'merchant' | 'admin';
}

export const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();

  const merchantLinks = [
    { label: 'Tổng quan', icon: LayoutDashboard, path: '/merchant' },
    { label: 'Thực đơn', icon: Utensils, path: '/merchant/menu' },
    { label: 'Đơn hàng', icon: ClipboardList, path: '/merchant/orders' },
    { label: 'Báo cáo', icon: BarChart3, path: '/merchant/analytics' },
  ];

  const adminLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Người dùng', icon: Users, path: '/admin/users' },
    { label: 'Cửa hàng', icon: Utensils, path: '/admin/merchants' },
    { label: 'Kiểm duyệt', icon: ShieldCheck, path: '/admin/moderation' },
  ];

  const links = role === 'merchant' ? merchantLinks : adminLinks;

  return (
    <aside className="w-72 h-screen sticky top-0 bg-surface-container-low border-r border-outline-variant/30 flex flex-col p-6">
      <Link to="/" className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Leaf className="text-on-primary w-6 h-6" />
        </div>
        <span className="text-xl font-black tracking-tighter text-primary">SAVEABITE</span>
      </Link>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-4 mb-4">
          Menu chính
        </p>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
                isActive 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
              )}
            >
              <link.icon className={cn('w-5 h-5', isActive ? 'text-on-primary' : 'text-primary group-hover:scale-110 transition-transform')} />
              <span className="font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-on-surface-variant hover:bg-surface-container-highest transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-semibold">Cài đặt</span>
        </Link>
        <button
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-error hover:bg-error/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};
