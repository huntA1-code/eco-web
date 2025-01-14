import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export const SubNavbar = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    "NEW IN",
    "CLOTHING",
    "SHOES",
    "ACCESSORIES",
    "BAGS",
    "JEWELRY",
    "BEAUTY",
    "SALE",
    "DESIGNERS",
    "SPORTSWEAR",
    "SUSTAINABLE",
    "VINTAGE",
    "PLUS SIZE"
  ];
  
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth / 2;
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });

      // Update scroll buttons state after scrolling
      setTimeout(checkScroll, 100);
    }
  };

  return (
    <div className="w-full bg-secondary shadow-sm mt-16">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-2 z-10 p-2 hover:bg-muted rounded-full bg-white shadow-sm transition-opacity duration-200 ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div 
            ref={containerRef}
            className="flex items-center space-x-8 overflow-x-auto scrollbar-hide mx-12 scroll-smooth"
            onScroll={checkScroll}
          >
            {categories.map((category) => (
              <Link
                key={category}
                to="#"
                className="nav-link whitespace-nowrap hover:text-primary transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className={`absolute right-2 z-10 p-2 hover:bg-muted rounded-full bg-white shadow-sm transition-opacity duration-200 ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};