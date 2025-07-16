import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: {
    rate: number;
    type: 'percentage' | 'fixed';
  };
}

interface RecommendedProductsProps {
  productId: string;
}

export const RecommendedProducts = ({ productId }: RecommendedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock recommended products data - replace with actual API call
  const mockRecommendedProducts: Product[] = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      brand: "StyleCraft",
      price: 299,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      colors: ["#000000", "#FFFFFF", "#FF0000"],
      sizes: ["S", "M", "L", "XL"],
      description: "High-quality cotton t-shirt perfect for everyday wear",
      category: "T-Shirts",
      rating: 4.5,
      reviews: 89,
      discount: { rate: 20, type: 'percentage' }
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      brand: "UrbanStyle",
      price: 899,
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
      colors: ["#1E3A8A", "#000000"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Classic denim jacket with modern fit",
      category: "Jackets",
      rating: 4.7,
      reviews: 124
    },
    {
      id: 3,
      name: "Running Sneakers",
      brand: "SportMax",
      price: 1299,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      colors: ["#FFFFFF", "#000000", "#FF0000"],
      sizes: ["7", "8", "9", "10", "11"],
      description: "Comfortable running shoes for daily workouts",
      category: "Footwear",
      rating: 4.8,
      reviews: 203,
      discount: { rate: 15, type: 'percentage' }
    },
    {
      id: 4,
      name: "Leather Wallet",
      brand: "LuxCraft",
      price: 599,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      colors: ["#8B4513", "#000000"],
      sizes: ["One Size"],
      description: "Premium leather wallet with multiple card slots",
      category: "Accessories",
      rating: 4.6,
      reviews: 67
    },
    {
      id: 5,
      name: "Smart Watch",
      brand: "TechWear",
      price: 2499,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      colors: ["#000000", "#C0C0C0"],
      sizes: ["S", "M", "L"],
      description: "Advanced smartwatch with health monitoring",
      category: "Electronics",
      rating: 4.9,
      reviews: 412,
      discount: { rate: 10, type: 'percentage' }
    },
    {
      id: 6,
      name: "Summer Dress",
      brand: "FloralCo",
      price: 799,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      colors: ["#FF69B4", "#FFFFFF", "#000000"],
      sizes: ["XS", "S", "M", "L"],
      description: "Beautiful floral dress perfect for summer",
      category: "Dresses",
      rating: 4.4,
      reviews: 91
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRecommendedProducts = async () => {
      setLoading(true);
      try {
        // In real implementation, make API call using productId
        // const response = await getRecommendedProducts(productId);
        // setProducts(response.data);
        
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockRecommendedProducts);
      } catch (error) {
        console.error('Failed to fetch recommended products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [productId]);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="w-full py-16">
        <div className="container max-w-[1100px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Recommended Products for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="bg-muted rounded h-4 mb-2"></div>
                <div className="bg-muted rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-16 bg-background/50">
      <div className="container max-w-[1100px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Recommended Products for You</h2>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={cn(
                "p-2 rounded-full border transition-all duration-200",
                currentIndex === 0
                  ? "bg-muted border-muted text-muted-foreground cursor-not-allowed"
                  : "bg-background border-border text-foreground hover:bg-muted hover:scale-105 shadow-sm"
              )}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={cn(
                "p-2 rounded-full border transition-all duration-200",
                currentIndex >= maxIndex
                  ? "bg-muted border-muted text-muted-foreground cursor-not-allowed"
                  : "bg-background border-border text-foreground hover:bg-muted hover:scale-105 shadow-sm"
              )}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(products.length / itemsPerView) * 100}%`
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0"
                style={{ width: `${100 / products.length}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                currentIndex === index
                  ? "bg-primary scale-125"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};