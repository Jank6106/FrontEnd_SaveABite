/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { CustomerHome } from './pages/CustomerHome';
import { FoodDetail } from './pages/FoodDetail';
import { Checkout } from './pages/Checkout';
import { MerchantDashboard } from './pages/MerchantDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Customer Routes */}
          <Route path="/" element={<CustomerHome />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Merchant Routes */}
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/merchant/menu" element={<MerchantDashboard />} />
          <Route path="/merchant/orders" element={<MerchantDashboard />} />
          <Route path="/merchant/analytics" element={<MerchantDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/merchants" element={<AdminDashboard />} />
          <Route path="/admin/moderation" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
