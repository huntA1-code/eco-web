import { useState } from 'react';
import { ShoppingBag, Search, Heart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl font-bold text-primary">SHEIN</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-2 hover:bg-muted rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
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