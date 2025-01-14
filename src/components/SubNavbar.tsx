import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const SubNavbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const categories = ["NEW IN", "CLOTHING", "SHOES", "ACCESSORIES", "SALE"];
  
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="w-full bg-secondary shadow-sm mt-16">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 z-10 p-2 hover:bg-muted rounded-full bg-white shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div 
            id="category-scroll"
            className="flex items-center space-x-8 overflow-x-auto scrollbar-hide mx-12 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map((category) => (
              <Link
                key={category}
                to="#"
                className="nav-link whitespace-nowrap hover:text-primary"
              >
                {category}
              </Link>
            ))}
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 z-10 p-2 hover:bg-muted rounded-full bg-white shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};