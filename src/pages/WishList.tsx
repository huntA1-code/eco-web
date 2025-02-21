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
  return <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
        <h1 className="mb-6 text-4xl font-extrabold text-center">My Wish List</h1>
        <Routes>
          <Route path="recently-viewed" element={<RecentlyViewed />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="follow" element={<FollowedStores />} />
          <Route path="account/profile" element={<ProfileUpdate />} />
          <Route path="account/address" element={<Address />} />
          <Route path="/" element={isSignedIn ? <SignedInWishlist /> : <SignedOutWishlist />} />
        </Routes>
      </main>
    </div>;
}