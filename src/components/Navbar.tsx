import { useState } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="font-serif text-2xl font-bold">MODENA</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="nav-link">Women</a>
            <a href="#" className="nav-link">Men</a>
            <a href="#" className="nav-link">Collections</a>
            <a href="#" className="nav-link">About</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-secondary/50 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary/50 rounded-full">
              <ShoppingBag className="w-5 h-5" />
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
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#" className="block nav-link py-2">Women</a>
            <a href="#" className="block nav-link py-2">Men</a>
            <a href="#" className="block nav-link py-2">Collections</a>
            <a href="#" className="block nav-link py-2">About</a>
          </div>
        </div>
      )}
    </nav>
  );
};