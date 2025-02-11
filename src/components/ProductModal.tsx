
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    repurchases?: number;
  };
}

const SIZES = [
  { label: '8Y', dimensions: '122-128CM' },
  { label: '9Y', dimensions: '128-134CM' },
  { label: '10Y', dimensions: '134-140CM' },
  { label: '11Y', dimensions: '140-146CM' },
  { label: '12Y', dimensions: '146-152CM' },
];

const COLORS = [
  { name: 'Hot Pink', hex: '#FF69B4', isHot: true },
  { name: 'Navy', hex: '#000080', isHot: true },
  { name: 'Forest Green', hex: '#228B22' },
  { name: 'Black', hex: '#000000' },
];

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { toast } = useToast();

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
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
                  {product.images.map((image, index) => (
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
                    src={product.images[selectedImage]}
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
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
                  {product.sku && (
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  )}
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

                  {/* SHEIN Club Banner */}
                  <div className="bg-orange-50 text-orange-800 p-3 rounded-lg">
                    <p className="text-sm">Save £0.26 with SHEIN Club membership</p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Color</h3>
                      <button className="text-sm text-blue-600">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((color) => (
                        <div key={color.name} className="relative">
                          <button
                            onClick={() => setSelectedColor(color.name)}
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
                          }`}
                        >
                          {size.label} ({size.dimensions})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 h-12"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Additional Info */}
                  {product.repurchases && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{product.repurchases}+ people repurchased</span>
                    </div>
                  )}

                  {/* Reward Points */}
                  <p className="text-sm text-green-600">
                    Earn up to 6 SHEIN Points calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
