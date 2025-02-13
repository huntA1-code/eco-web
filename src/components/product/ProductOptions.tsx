import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Size {
  label: string;
  dimensions: string;
  quantity: number;
}

interface Color {
  name: string;
  hex: string;
  isHot?: boolean;
  images: string[];
}

interface ProductOptionsProps {
  sizes: Size[];
  colors: Color[];
  selectedSize: string;
  selectedColor: string;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: Color) => void;
  onAddToCart: () => void;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  isLiked: boolean;
  onLikeClick: () => void;
}

export function ProductOptions({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  onAddToCart,
  price = 0,
  originalPrice,
  rating,
  reviews,
  isLiked,
  onLikeClick
}: ProductOptionsProps) {
  const selectedSizeData = sizes.find(size => size.label === selectedSize);

  const calculateDiscountPercentage = () => {
    if (originalPrice && price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const getQuantityMessage = () => {
    if (!selectedSizeData) return null;
    
    if (selectedSizeData.quantity === 0) {
      return (
        <motion.div 
          className="text-red-500 text-sm font-medium mt-2"
          animate={{ x: [-2, 2, -2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          SOLD OUT
        </motion.div>
      );
    }
    
    if (selectedSizeData.quantity < 10) {
      return (
        <div className="text-red-500 text-sm font-medium mt-2">
          {selectedSizeData.quantity} items left
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Price, Discount and Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-base text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {calculateDiscountPercentage() > 0 && (
          <Badge className="bg-black text-white text-sm px-2 py-1">
            -{calculateDiscountPercentage()}%
          </Badge>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="font-medium mb-2">Color{selectedColor ? `: ${selectedColor}` : ''}</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <div key={color.name} className="relative">
              <button
                onClick={() => onColorSelect(color)}
                className={`w-10 h-10 rounded-full transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-primary ring-offset-2'
                    : ''
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              {color.isHot && (
                <Badge 
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500"
                  variant="secondary"
                >
                  Hot
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-medium mb-2">Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => onSizeSelect(size.label)}
              className={`p-3 rounded border text-sm transition-all ${
                selectedSize === size.label
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-primary'
              } ${size.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={size.quantity === 0}
            >
              {size.label} ({size.dimensions})
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Message */}
      {getQuantityMessage()}

      {/* Add to Cart and Like */}
      <div className="flex gap-3">
        <Button
          onClick={onAddToCart}
          className="flex-1 h-12"
          disabled={selectedSizeData?.quantity === 0}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {selectedSizeData?.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onLikeClick}
          className={cn(
            "h-12 w-12 rounded-full border-2 transition-all",
            isLiked ? "border-primary" : "border-gray-200"
          )}
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked ? "fill-primary text-primary" : "text-gray-500"
            )} 
          />
        </Button>
      </div>
    </div>
  );
}
