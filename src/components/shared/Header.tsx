/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Leaf, Navigation, LogOut, RefreshCw, ClipboardList } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AnimatePresence, motion } from 'motion/react';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [userLocation, setUserLocation] = useState('Hà Nội, Việt Nam');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Simulate logged in state to show avatar as requested
  const [isLoggedIn] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGetLocation = () => {
    setIsFetchingLocation(true);
    setUserLocation('Đang lấy vị trí...');
    setTimeout(() => {
      setUserLocation('Quận 1, TP.HCM');
      setIsFetchingLocation(false);
    }, 1500);
  };

  const handleMenuAction = (path: string) => {
    setIsProfileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-outline-variant/30">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="text-on-primary w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-primary">SAVEABITE</span>
        </Link>

        {isHome && (
          <button 
            onClick={handleGetLocation}
            disabled={isFetchingLocation}
            className="hidden md:flex items-center gap-2 bg-surface-container-highest px-5 py-2.5 rounded-full border border-outline-variant/50 hover:bg-surface-container-highest/80 transition-colors disabled:opacity-70"
          >
            {isFetchingLocation ? (
              <Navigation className="w-4 h-4 text-primary animate-pulse" />
            ) : (
              <MapPin className="w-4 h-4 text-primary" />
            )}
            <span className="text-sm font-medium text-on-surface-variant">{userLocation}</span>
          </button>
        )}

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-surface-container-highest">
                <ShoppingBag className="w-5 h-5 text-on-surface" />
              </Button>
              <Badge variant="primary" className="absolute -top-1 -right-1 px-1.5 min-w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-background text-[10px] font-bold">
                2
              </Badge>
            </Link>
          </div>
          
          <div className="h-8 w-[1px] bg-outline-variant/50 mx-1 hidden sm:block" />
          
          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              >
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#121a15]/95 backdrop-blur-xl border border-outline-variant/30 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-outline-variant/30 bg-surface-container-highest/50">
                      <p className="text-sm font-bold text-on-surface">Khách hàng</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">user@saveabite.com</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <button 
                        onClick={() => handleMenuAction('/profile-setup')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Hồ sơ cá nhân
                      </button>
                      <button 
                        onClick={() => handleMenuAction('/orders')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                        Đơn hàng của tôi
                      </button>
                      <button 
                        onClick={() => handleMenuAction('/login')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Đổi vai trò
                      </button>
                      <div className="h-[1px] bg-outline-variant/30 my-1" />
                      <button 
                        onClick={() => handleMenuAction('/login')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error hover:bg-error/10 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm" className="gap-2 rounded-full px-5">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
