
import { useState } from 'react';
import { ShoppingBag, Search, Heart, User, Menu, X, LayoutDashboard, LogIn, UserPlus, ClipboardList } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn] = useState(false); // Replace with actual auth state
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl font-bold text-primary">SHEIN</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-2 hover:bg-muted rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-full">
                  <User className="w-5 h-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="end">
                {isSignedIn ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate('/wishlist/my-orders')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <ClipboardList className="w-4 h-4" />
                      My Orders
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      onClick={() => navigate('/signin')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <button 
              className="p-2 hover:bg-muted rounded-full"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-muted rounded-full relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link 
              to="/dashboard"
              className="p-2 hover:bg-muted rounded-full flex items-center gap-2 text-sm"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden lg:inline">Dashboard</span>
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {isSignedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
                  <User className="w-5 h-5" />
                  My Profile
                </Link>
                <Link to="/wishlist/my-orders" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
                  <ClipboardList className="w-5 h-5" />
                  My Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
                <Link to="/signup" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/dashboard" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="#" className="block nav-link py-2 hover:text-primary">NEW IN</Link>
            <Link to="#" className="block nav-link py-2 hover:text-primary">CLOTHING</Link>
            <Link to="#" className="block nav-link py-2 hover:text-primary">SHOES</Link>
            <Link to="#" className="block nav-link py-2 hover:text-primary">ACCESSORIES</Link>
            <Link to="#" className="block nav-link py-2 hover:text-primary">SALE</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
