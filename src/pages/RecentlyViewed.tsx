import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 8;

const recentlyViewedProducts = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    brand: "Levi's",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic denim jacket with a modern twist",
    category: "Outerwear",
    rating: 4.5,
    reviews: 128,
    discount: {
      rate: 20,
      type: "percentage" as const
    }
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    brand: "Nike",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    colors: ["White", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Premium cotton t-shirt for everyday comfort",
    category: "T-Shirts",
    rating: 4.8,
    reviews: 256
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    brand: "H&M",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["30", "32", "34", "36"],
    description: "Comfortable slim fit chinos for a modern look",
    category: "Pants",
    rating: 4.3,
    reviews: 89,
    discount: {
      rate: 15,
      type: "percentage" as const
    }
  },
  {
    id: 4,
    name: "Wool Blend Sweater",
    brand: "Uniqlo",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    colors: ["Gray", "Navy", "Burgundy"],
    sizes: ["S", "M", "L"],
    description: "Warm and stylish wool blend sweater",
    category: "Sweaters",
    rating: 4.6,
    reviews: 167
  },
  {
    id: 5,
    name: "Leather Belt",
    brand: "Ralph Lauren",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    colors: ["Brown", "Black", "Tan"],
    sizes: ["S", "M", "L"],
    description: "Premium leather belt with classic buckle",
    category: "Accessories",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 6,
    name: "Summer Dress",
    brand: "Zara",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
    colors: ["White", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    description: "Light and breezy summer dress",
    category: "Dresses",
    rating: 4.4,
    reviews: 156,
    discount: {
      rate: 25,
      type: "percentage" as const
    }
  },
  {
    id: 7,
    name: "Running Shoes",
    brand: "Nike",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    colors: ["Black", "White", "Red"],
    sizes: ["7", "8", "9", "10", "11"],
    description: "High-performance running shoes",
    category: "Footwear",
    rating: 4.9,
    reviews: 324
  },
  {
    id: 8,
    name: "Silk Scarf",
    brand: "Hermès",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    colors: ["Multicolor"],
    sizes: ["One Size"],
    description: "Luxurious silk scarf with artistic pattern",
    category: "Accessories",
    rating: 4.8,
    reviews: 67
  }
];

export default function RecentlyViewed() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recentlyViewedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = recentlyViewedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedItems([]);
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold"
        >
          RECENTLY VIEWED
        </motion.h1>
        <button
          onClick={toggleSelectMode}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {selectMode ? 'Cancel' : 'Select'}
        </button>
      </div>

      {selectMode && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              id="selectAll"
              checked={selectedItems.length === recentlyViewedProducts.length}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedItems(recentlyViewedProducts.map(p => p.id));
                } else {
                  setSelectedItems([]);
                }
              }}
            />
            <label htmlFor="selectAll" className="text-sm font-medium">
              Select All ({selectedItems.length}/{recentlyViewedProducts.length})
            </label>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {selectMode && (
              <div className="absolute top-4 left-4 z-10">
                <Checkbox
                  checked={selectedItems.includes(product.id)}
                  onCheckedChange={() => toggleSelectItem(product.id)}
                />
              </div>
            )}
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
              className="w-8 h-8"
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
