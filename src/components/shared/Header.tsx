/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, MapPin, Leaf } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-outline-variant/30">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="text-on-primary w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-primary">SAVEABITE</span>
        </Link>

        {isHome && (
          <div className="hidden md:flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-2xl border border-outline-variant/50">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-on-surface-variant">Hà Nội, Việt Nam</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              <Badge variant="primary" className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center border-2 border-background">
                2
              </Badge>
            </Link>
          </div>
          
          <div className="h-8 w-[1px] bg-outline-variant/50 mx-2 hidden sm:block" />
          
          <Link to="/login">
            <Button variant="primary" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
