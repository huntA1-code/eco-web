import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { QuickView } from "./QuickView";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
  product: {
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
    discount?: { // Added discount type
      rate: number;
      type: 'percentage' | 'fixed';
    };
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Generate additional product images for the gallery
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  ];

  const handleQuickViewClose = () => {
    setShowQuickView(false);
  };

  const calculateDiscountedPrice = () => {
    if (!product.discount) return product.price;
    
    return product.discount.type === 'percentage' 
      ? product.price * (1 - product.discount.rate / 100)
      : product.price - product.discount.rate;
  };

  return (
    <>
      <Link 
        to={`/products/${encodeURIComponent(product.name)}`}
        className="block card group animate-fade-up relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-[#ea384c] text-white px-2 py-1 rounded-md text-sm font-medium">
              {product.discount.rate}% OFF
            </div>
          )}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-2 right-2 flex gap-2">
              <button className="btn-secondary p-1.5">
                <Heart size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickView(true);
                }}
                className="btn-secondary p-2 hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Quick View
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 relative">
          <Link 
            to={`/store`}
            className="text-xs text-primary hover:underline"
          >
            {product.brand}
          </Link>
          <h3 className="text-sm font-medium mt-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-primary font-semibold">
              ${calculateDiscountedPrice().toFixed(2)}
            </p>
            {product.discount && (
              <p className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex gap-1.5 mt-2">
            {product.colors.map(color => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border shadow-sm"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-[10px] ${
                      i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <button 
              className="btn-secondary p-2 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>

      <ProductModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={{
          name: product.name,
          price: product.price,
          originalPrice: product.discount ? product.price / (1 - product.discount.rate / 100) : undefined,
          images: productImages,
          rating: product.rating,
          reviews: product.reviews,
          repurchases: 12000,
          sku: `SK${Math.random().toString(36).substr(2, 8)}`,
        }}
      />
    </>
  );
};
