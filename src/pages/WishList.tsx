import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
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
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 1) return [{ label: 'Wishlist', icon: Heart }];
    
    const breadcrumbMap: Record<string, string> = {
      'recently-viewed': 'Recently Viewed',
      'my-orders': 'My Orders',
      'follow': 'Followed Stores',
      'account': 'Account Settings',
      'profile': 'Profile',
      'address': 'Address'
    };

    return segments.map((segment, index) => ({
      label: breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: index === 0 ? Heart : undefined
    }));
  };

  const getPageTitle = () => {
    const breadcrumbs = getBreadcrumbs();
    return breadcrumbs[breadcrumbs.length - 1]?.label || 'Wishlist';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 md:px-8 py-6"
        >
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              {getBreadcrumbs().map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                  <div className="flex items-center gap-2">
                    {crumb.icon && <crumb.icon className="h-4 w-4" />}
                    <span className={index === getBreadcrumbs().length - 1 ? 'text-foreground font-medium' : ''}>
                      {crumb.label}
                    </span>
                  </div>
                </div>
              ))}
            </nav>
            
            {/* Page Title */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {getPageTitle()}
            </motion.h1>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="px-4 md:px-8 py-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg p-6 md:p-8">
              <Routes>
                <Route path="recently-viewed" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RecentlyViewed />
                  </motion.div>
                } />
                <Route path="my-orders" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MyOrders />
                  </motion.div>
                } />
                <Route path="follow" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FollowedStores />
                  </motion.div>
                } />
                <Route path="account/profile" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProfileUpdate />
                  </motion.div>
                } />
                <Route path="account/address" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Address />
                  </motion.div>
                } />
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSignedIn ? <SignedInWishlist /> : <SignedOutWishlist />}
                  </motion.div>
                } />
              </Routes>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}