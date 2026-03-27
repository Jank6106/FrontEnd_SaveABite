/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import Link from 'next/link';

import { Star, Clock, MapPin, Leaf, ShoppingCart } from 'lucide-react';
import { FoodItem } from '@/src/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency } from '@/src/lib/utils';
import { useCart } from '@/src/lib/CartContext';

interface FoodCardProps {
  item: FoodItem;
  key?: React.Key;
}

export const FoodCard = ({ item }: FoodCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };

  return (
    <Card className="group h-full flex flex-col nature-gradient overflow-hidden relative">
      <Link href={`/food/${item.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant="tertiary" className="backdrop-blur-md bg-tertiary/80 text-on-tertiary">
              -{item.discountPercentage}%
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="primary" className="backdrop-blur-md bg-primary/80 text-on-primary flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Tiết kiệm {item.impactCo2}kg CO2
            </Badge>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
            <div className="flex items-center gap-1 text-tertiary">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">{item.rating}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-on-surface mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-xs text-on-surface-variant mb-4 line-clamp-1">{item.merchantName}</p>

          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium">{item.expiryTime}</span>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant line-through opacity-50">{formatCurrency(item.originalPrice)}</span>
                <span className="text-xl font-black text-primary">{formatCurrency(item.discountPrice)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-on-surface-variant block uppercase font-bold">Còn lại</span>
                <span className="text-sm font-black text-on-surface">{item.remainingCount} suất</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-5 pb-5 mt-auto">
        <Button 
          onClick={handleAddToCart}
          className="w-full gap-2 rounded-xl h-11 font-bold shadow-lg shadow-primary/20 group-hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          THÊM VÀO GIỎ
        </Button>
      </div>
    </Card>
  );
};
