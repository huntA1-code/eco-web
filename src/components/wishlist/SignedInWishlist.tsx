
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';

const products = [{
  id: 1,
  name: "Floral Summer Dress",
  description: "Beautiful floral dress perfect for summer days",
  price: 49.99,
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  brand: "Summer Collection",
  colors: ["White", "Pink", "Blue"],
  sizes: ["XS", "S", "M", "L"],
  category: "Dresses",
  rating: 4.5,
  reviews: 128,
  discount: {
    rate: 20,
    type: 'percentage' as const  // Fixed by adding type assertion
  }
}, {
  id: 2,
  name: "Classic White Shirt",
  description: "Timeless white shirt for any occasion",
  price: 29.99,
  image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  brand: "Classics",
  colors: ["White", "Light Blue"],
  sizes: ["S", "M", "L", "XL"],
  category: "Shirts",
  rating: 4.8,
  reviews: 256
}, {
  id: 3,
  name: "Leather Jacket",
  description: "Classic leather jacket for a bold look",
  price: 89.99,
  image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  brand: "Urban Style",
  colors: ["Black", "Brown"],
  sizes: ["S", "M", "L"],
  category: "Outerwear",
  rating: 4.6,
  reviews: 189
}, {
  id: 4,
  name: "Denim Jeans",
  description: "Comfortable and stylish denim jeans",
  price: 59.99,
  image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  brand: "Denim Co",
  colors: ["Blue", "Black", "Gray"],
  sizes: ["28", "30", "32", "34"],
  category: "Jeans",
  rating: 4.7,
  reviews: 312
}];

export default function SignedInWishlist() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">Save your favorite items for later</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{products.length}</p>
            <p className="text-sm text-muted-foreground">Items saved</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <ProductCard product={product} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
