
import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

// Mock data for recently viewed products
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
      type: 'percentage'
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
      type: 'percentage'
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
  }
];

export default function RecentlyViewed() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectMode, setSelectMode] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
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
        {recentlyViewedProducts.map((product) => (
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
    </div>
  );
}
