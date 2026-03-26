/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'customer' | 'merchant' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  impactScore?: number; // kg CO2 saved
}

export interface FoodItem {
  id: string;
  name: string;
  merchantId: string;
  merchantName: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  category: string;
  image: string;
  rating: number;
  expiryTime: string; // ISO string or relative
  remainingCount: number;
  description: string;
  impactCo2: number; // kg CO2 saved
}

export interface Merchant {
  id: string;
  name: string;
  logo: string;
  address: string;
  openingHours: string;
  rating: number;
  isVerified: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  id: string;
  userId: string;
  merchantId: string;
  merchantName: string;
  items: {
    foodItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  pickupTime: string;
  createdAt: string;
  impactCo2: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
