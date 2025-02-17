
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import SignedInWishlist from '@/components/wishlist/SignedInWishlist';
import SignedOutWishlist from '@/components/wishlist/SignedOutWishlist';
import RecentlyViewed from './RecentlyViewed';
import MyOrders from './dashboard/orders/MyOrders';
import FollowedStores from './FollowedStores';

export default function WishList() {
  const [isSignedIn] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">MY WISHLIST</h1>
        </div>
        <Routes>
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="follow" element={<FollowedStores />} />
          <Route path="/" element={
            isSignedIn ? <SignedInWishlist /> : <SignedOutWishlist />
          } />
        </Routes>
      </main>
    </div>
  );
}
