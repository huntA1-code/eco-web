import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductModal } from "./ProductModal";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
    discount?: {
      rate: number;
      type: 'percentage' | 'fixed';
    };
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  ];

  const handleModalClose = () => {
    setShowModal(false);
  };

  const calculateDiscountedPrice = () => {
    if (!product.discount) return product.price;
    
    return product.discount.type === 'percentage' 
      ? product.price * (1 - product.discount.rate / 100)
      : product.price - product.discount.rate;
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast({
      title: !isLiked ? "Added to wishlist" : "Removed from wishlist",
      description: !isLiked ? "Product has been added to your wishlist" : "Product has been removed from your wishlist"
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) {
      navigate(`/product/${encodeURIComponent(product.name)}`);
    }
  };

  return (
    <>
      <div 
        className="block card group animate-fade-up relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
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
              <button 
                onClick={handleLikeClick}
                className={cn(
                  "btn-secondary p-1.5 hover:bg-primary hover:text-white transition-colors duration-300",
                  isLiked && "bg-primary text-white"
                )}
              >
                <Heart 
                  size={16} 
                  className={cn(
                    "transition-colors",
                    isLiked ? "fill-current" : "fill-none"
                  )} 
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 relative">
          <Link 
            to="/store"
            onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="btn-secondary p-2 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={handleModalClose}
        product={{
          name: product.name,
          price: product.price,
          originalPrice: product.discount ? product.price / (1 - product.discount.rate / 100) : undefined,
          images: productImages,
          rating: product.rating,
          reviews: product.reviews,
          sku: `SK${Math.random().toString(36).substr(2, 8)}`,
        }}
      />
    </>
  );
};
