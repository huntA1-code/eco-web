import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    colors: string[];
    sizes: string[];
    description: string;
    category: string;
    rating: number;
    reviews: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    setShowQuickView(true);
  };

  const handleQuickViewClose = () => {
    setShowQuickView(false);
  };

  return (
    <>
      <Link 
        to={`/products/${encodeURIComponent(product.name)}`}
        className="block card group animate-fade-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="btn-secondary p-2">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-primary font-semibold mt-1">${product.price}</p>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          <div className="flex gap-2 mt-2">
            {product.colors.map(color => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>
      </Link>

      <QuickView
        product={{
          name: product.name,
          price: `$${product.price}`,
          image: product.image,
          description: product.description,
          sizes: product.sizes,
          rating: product.rating,
          reviews: product.reviews
        }}
        isOpen={showQuickView}
        onClose={handleQuickViewClose}
      />
    </>
  );
};