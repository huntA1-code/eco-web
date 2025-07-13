import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import SignedInWishlist from '@/components/wishlist/SignedInWishlist';
import SignedOutWishlist from '@/components/wishlist/SignedOutWishlist';
import RecentlyViewed from './RecentlyViewed';
import MyOrders from './dashboard/orders/MyOrders';
import FollowedStores from './FollowedStores';
import ProfileUpdate from './dashboard/profile/ProfileUpdate';
import Address from './dashboard/profile/Address';
export default function WishList() {
  const [isSignedIn] = useState(true);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="recently-viewed" element={<RecentlyViewed />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="follow" element={<FollowedStores />} />
            <Route path="account/profile" element={<ProfileUpdate />} />
            <Route path="account/address" element={<Address />} />
            <Route path="/" element={isSignedIn ? <SignedInWishlist /> : <SignedOutWishlist />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}