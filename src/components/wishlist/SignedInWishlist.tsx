import { motion } from 'framer-motion';
import { Heart, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const products = [{
  id: 1,
  name: "Floral Summer Dress",
  description: "Beautiful floral dress perfect for summer days",
  price: 49.99,
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  likes: 128,
  unitsSold: 100
}, {
  id: 2,
  name: "Classic White Shirt",
  description: "Timeless white shirt for any occasion",
  price: 29.99,
  image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  likes: 256,
  unitsSold: 150
}, {
  id: 3,
  name: "Leather Jacket",
  description: "Classic leather jacket for a bold look",
  price: 89.99,
  image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  likes: 189,
  unitsSold: 75
}, {
  id: 4,
  name: "Denim Jeans",
  description: "Comfortable and stylish denim jeans",
  price: 59.99,
  image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  likes: 312,
  unitsSold: 200
}];
export default function SignedInWishlist() {
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Select defaultValue="category">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="status">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="instock">In Stock</SelectItem>
              <SelectItem value="outofstock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 mb-8">
        <Button variant="outline" className="hover:bg-primary/10">
          Price cut
        </Button>
        <Button variant="outline" className="hover:bg-primary/10">
          Low in stock
        </Button>
        <Button variant="outline" className="hover:bg-primary/10">
          Back in stock
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => <motion.div key={product.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                <Heart className="w-5 h-5 text-gray-600 hover:text-primary" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{product.unitsSold}+ sold</span>
                <span className="font-bold text-lg">£{product.price}</span>
              </div>
              <Button className="w-full flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </motion.div>)}
      </div>
    </div>;
}