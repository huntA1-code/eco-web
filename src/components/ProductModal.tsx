
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageGallery } from './product/ImageGallery';
import { ProductHeader } from './product/ProductHeader';
import { ProductOptions } from './product/ProductOptions';
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp } from 'lucide-react';

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
    isTrending?: boolean;
    isBestSeller?: boolean;
    category?: string;
    discountPercentage?: number;
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

  const calculateDiscountPercentage = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return product.discountPercentage || 0;
  };

  const handleColorSelect = (color: typeof COLORS[0]) => {
    setSelectedColor(color.name);
    setCurrentImages(color.images);
    setSelectedImage(0);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toast({
      title: !isLiked ? "Added to wishlist" : "Removed from wishlist",
      description: !isLiked 
        ? "Product has been added to your wishlist" 
        : "Product has been removed from your wishlist",
    });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-7">
                <ImageGallery
                  images={currentImages}
                  selectedImage={selectedImage}
                  productName={product.name}
                  onImageSelect={setSelectedImage}
                  onNext={nextImage}
                  onPrevious={previousImage}
                />
              </div>
              <div className="col-span-5 space-y-6">
                {/* Product Header with Trending Badge */}
                <div className="space-y-2">
                  {product.isTrending && (
                    <Badge variant="secondary" className="bg-primary text-white mb-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trends
                    </Badge>
                  )}
                  <h1 className="text-2xl font-bold font-serif">{product.name}</h1>
                  {product.sku && (
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  )}
                </div>

                {/* Price Section */}
                <div className="space-y-4">
                  {calculateDiscountPercentage() > 0 && (
                    <Badge className="bg-black text-white text-sm px-2 py-1">
                      -{calculateDiscountPercentage()}%
                    </Badge>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ratings Section */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < product.rating! ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    {product.reviews && (
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews}+ Reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Product Options */}
                <ProductOptions
                  sizes={SIZES}
                  colors={COLORS}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeSelect={setSelectedSize}
                  onColorSelect={handleColorSelect}
                  onAddToCart={handleAddToCart}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  isLiked={isLiked}
                  onLikeClick={handleLikeClick}
                />

                {/* Description */}
                {product.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Best Seller Badge */}
                {product.isBestSeller && (
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="secondary" className="bg-amber-500 text-white">
                      <Award className="w-4 h-4 mr-1" />
                      #6 Best Seller
                    </Badge>
                    {product.category && (
                      <span className="text-sm text-muted-foreground">
                        in {product.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
