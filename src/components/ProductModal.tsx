
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    sku?: string;
    price: number;
    originalPrice?: number;
    description?: string;
    images: string[];
    rating?: number;
    reviews?: number;
  };
}

const SIZES = [
  { label: '8Y', dimensions: '122-128CM', quantity: 5 },
  { label: '9Y', dimensions: '128-134CM', quantity: 15 },
  { label: '10Y', dimensions: '134-140CM', quantity: 0 },
  { label: '11Y', dimensions: '140-146CM', quantity: 8 },
  { label: '12Y', dimensions: '146-152CM', quantity: 3 },
];

const COLORS = [
  { 
    name: 'Hot Pink', 
    hex: '#FF69B4', 
    isHot: true,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
    ]
  },
  { 
    name: 'Navy', 
    hex: '#000080', 
    isHot: true,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
    ]
  },
  { 
    name: 'Forest Green', 
    hex: '#228B22',
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
    ]
  },
  { 
    name: 'Black', 
    hex: '#000000',
    images: [
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    ]
  },
];

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImages, setCurrentImages] = useState(product.images);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const selectedSizeData = SIZES.find(size => size.label === selectedSize);

  const handleColorSelect = (color: typeof COLORS[0]) => {
    setSelectedColor(color.name);
    setCurrentImages(color.images);
    setSelectedImage(0);
  };

  const handleLikeClick = async () => {
    try {
      const response = await fetch('/api/like-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.sku,
          isLiked: !isLiked,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
        toast({
          title: data.isLiked ? "Added to wishlist" : "Removed from wishlist",
          description: data.isLiked ? "Product has been added to your wishlist" : "Product has been removed from your wishlist",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "You must select both size and color before adding to cart",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: "The item has been added to your cart",
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % currentImages.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + currentImages.length) % currentImages.length);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left - Thumbnails */}
              <div className="hidden md:block md:col-span-1">
                <div className="flex flex-col gap-2 sticky top-0">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Center - Main Image */}
              <div className="col-span-1 md:col-span-6">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative">
                  <img
                    src={currentImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right - Product Details */}
              <div className="col-span-1 md:col-span-5">
                <DialogHeader className="flex flex-row items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
                    {product.sku && (
                      <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLikeClick}
                    className={cn(
                      "h-14 w-14 rounded-full border-2 transition-all",
                      isLiked ? "border-primary" : "border-gray-200"
                    )}
                  >
                    <Heart 
                      className={cn(
                        "h-6 w-6 transition-colors",
                        isLiked ? "fill-primary text-primary" : "text-gray-500"
                      )} 
                    />
                  </Button>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} Reviews)
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-semibold">£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        Save £{(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>

                  {/* Color Selection */}
                  <div>
                    <h3 className="font-medium mb-2">
                      Color{selectedColor ? `: ${selectedColor}` : ''}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((color) => (
                        <div key={color.name} className="relative">
                          <button
                            onClick={() => handleColorSelect(color)}
                            className={`w-10 h-10 rounded-full transition-all ${
                              selectedColor === color.name
                                ? 'ring-2 ring-primary ring-offset-2'
                                : ''
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                          {color.isHot && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500">HOT</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="font-medium mb-2">Size</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size.label}
                          onClick={() => setSelectedSize(size.label)}
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
                      onClick={handleAddToCart}
                      className="flex-1 h-12"
                      disabled={selectedSizeData?.quantity === 0}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      {selectedSizeData?.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
