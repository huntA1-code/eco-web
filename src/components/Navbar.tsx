
import { useState } from 'react';
import { ShoppingBag, Search, Heart, User, Menu, X, LayoutDashboard, LogIn, UserPlus, ClipboardList } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchModal } from './SearchModal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="font-serif text-2xl font-bold text-primary">NOVA</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                className="group relative p-2 hover:bg-muted rounded-full transition-all duration-300 hover:scale-110"
                onClick={() => setIsSearchModalOpen(true)}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
              >
                <Search className={`w-5 h-5 transition-all duration-300 ${
                  isSearchHovered ? 'text-primary scale-110' : 'text-foreground'
                }`} />
                
                {/* Animated search hint */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap transition-all duration-300 ${
                  isSearchHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  Search products
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-full transition-all duration-200 hover:scale-110">
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
                      <Link 
                        to="/auth" 
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        Sign In
                      </Link>
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
                className="p-2 hover:bg-muted rounded-full transition-all duration-200 hover:scale-110" 
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="w-5 h-5" />
              </button>

              <Link 
                to="/cart" 
                className="p-2 hover:bg-muted rounded-full relative transition-all duration-200 hover:scale-110"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </Link>

              <Link 
                to="/dashboard" 
                className="p-2 hover:bg-muted rounded-full flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            </div>
            
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden bg-white border-t border-border animate-fade-in">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center gap-2 w-full text-left py-2 hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
                Search Products
              </button>

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
                  <Link to="/auth" className="flex items-center gap-2 nav-link py-2 hover:text-primary">
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
      </header>

      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};
