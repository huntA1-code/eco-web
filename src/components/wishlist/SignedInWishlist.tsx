
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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
