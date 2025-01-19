import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { QuickView } from "./QuickView";

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
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

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
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button className="btn-secondary p-1.5">
                <Heart size={16} />
              </button>
              <button className="btn-secondary p-1.5">
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3">
          <Link 
            to={`/store`}
            className="text-xs text-primary hover:underline"
          >
            {product.brand}
          </Link>
          <h3 className="text-sm font-medium mt-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-primary font-semibold text-sm mt-0.5">${product.price}</p>
          <div className="flex gap-1 mt-1">
            {product.colors.map(color => (
              <div
                key={color}
                className="w-2 h-2 rounded-full border"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-1">
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