
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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
}

export function ProductOptions({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeSelect,
  onColorSelect,
  onAddToCart
}: ProductOptionsProps) {
  const selectedSizeData = sizes.find(size => size.label === selectedSize);

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

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button
          onClick={onAddToCart}
          className="flex-1 h-12"
          disabled={selectedSizeData?.quantity === 0}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {selectedSizeData?.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
