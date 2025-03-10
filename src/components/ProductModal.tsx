import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
const SIZES = [{
  label: '8Y',
  dimensions: '122-128CM',
  quantity: 5
}, {
  label: '9Y',
  dimensions: '128-134CM',
  quantity: 15
}, {
  label: '10Y',
  dimensions: '134-140CM',
  quantity: 0
}, {
  label: '11Y',
  dimensions: '140-146CM',
  quantity: 8
}, {
  label: '12Y',
  dimensions: '146-152CM',
  quantity: 3
}];
const COLORS = [{
  name: 'Hot Pink',
  hex: '#FF69B4',
  isHot: true,
  price: 49.99,
  originalPrice: 89.99,
  sizes: [{
    label: '8Y',
    dimensions: '122-128CM',
    quantity: 2
  }, {
    label: '9Y',
    dimensions: '128-134CM',
    quantity: 8
  }, {
    label: '10Y',
    dimensions: '134-140CM',
    quantity: 0
  }, {
    label: '11Y',
    dimensions: '140-146CM',
    quantity: 5
  }, {
    label: '12Y',
    dimensions: '146-152CM',
    quantity: 1
  }],
  images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", "https://images.unsplash.com/photo-1582562124811-c09040d0a901", "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"]
}, {
  name: 'Navy',
  hex: '#000080',
  isHot: true,
  price: 39.99,
  originalPrice: 79.99,
  sizes: [{
    label: '8Y',
    dimensions: '122-128CM',
    quantity: 10
  }, {
    label: '9Y',
    dimensions: '128-134CM',
    quantity: 12
  }, {
    label: '10Y',
    dimensions: '134-140CM',
    quantity: 5
  }, {
    label: '11Y',
    dimensions: '140-146CM',
    quantity: 3
  }, {
    label: '12Y',
    dimensions: '146-152CM',
    quantity: 0
  }],
  images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"]
}, {
  name: 'Forest Green',
  hex: '#228B22',
  price: 44.99,
  originalPrice: 84.99,
  sizes: [{
    label: '8Y',
    dimensions: '122-128CM',
    quantity: 7
  }, {
    label: '9Y',
    dimensions: '128-134CM',
    quantity: 4
  }, {
    label: '10Y',
    dimensions: '134-140CM',
    quantity: 2
  }, {
    label: '11Y',
    dimensions: '140-146CM',
    quantity: 0
  }, {
    label: '12Y',
    dimensions: '146-152CM',
    quantity: 8
  }],
  images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "https://images.unsplash.com/photo-1582562124811-c09040d0a901", "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"]
}, {
  name: 'Black',
  hex: '#000000',
  price: 54.99,
  originalPrice: 94.99,
  sizes: [{
    label: '8Y',
    dimensions: '122-128CM',
    quantity: 3
  }, {
    label: '9Y',
    dimensions: '128-134CM',
    quantity: 6
  }, {
    label: '10Y',
    dimensions: '134-140CM',
    quantity: 4
  }, {
    label: '11Y',
    dimensions: '140-146CM',
    quantity: 2
  }, {
    label: '12Y',
    dimensions: '146-152CM',
    quantity: 1
  }],
  images: ["https://images.unsplash.com/photo-1466721591366-2d5fba72006d", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", "https://images.unsplash.com/photo-1582562124811-c09040d0a901"]
}];
export function ProductModal({
  isOpen,
  onClose,
  product
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [currentImages, setCurrentImages] = useState(COLORS[0].images);
  const [currentSizes, setCurrentSizes] = useState(COLORS[0].sizes);
  const [currentPrice, setCurrentPrice] = useState(COLORS[0].price);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState(COLORS[0].originalPrice);
  const [isLiked, setIsLiked] = useState(false);
  const {
    toast
  } = useToast();
  const handleColorSelect = (color: typeof COLORS[0]) => {
    setSelectedColor(color.name);
    setCurrentImages(color.images);
    setSelectedImage(0);
    setCurrentSizes(color.sizes);
    setCurrentPrice(color.price);
    setCurrentOriginalPrice(color.originalPrice);
  };
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % currentImages.length);
  };
  const previousImage = () => {
    setSelectedImage(prev => (prev - 1 + currentImages.length) % currentImages.length);
  };
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toast({
      title: !isLiked ? "Added to wishlist" : "Removed from wishlist",
      description: !isLiked ? "Product has been added to your wishlist" : "Product has been removed from your wishlist"
    });
  };
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "You must select both size and color before adding to cart",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Added to cart",
      description: "The item has been added to your cart"
    });
  };
  const enhancedProduct = {
    ...product,
    isTrending: true,
    isBestSeller: true,
    description: "This premium quality clothing item is designed with both style and comfort in mind. Made from high-grade materials, it features excellent durability and a perfect fit. Perfect for everyday wear or special occasions.",
    price: currentPrice,
    originalPrice: currentOriginalPrice
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="col-span-7">
                <ImageGallery images={currentImages} selectedImage={selectedImage} productName={enhancedProduct.name} onImageSelect={setSelectedImage} onNext={nextImage} onPrevious={previousImage} />
              </div>
              <div className="col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {enhancedProduct.isTrending && <Badge variant="secondary" className="bg-primary text-white">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Trends
                      </Badge>}
                    {enhancedProduct.isBestSeller && <Badge variant="secondary" className="bg-amber-500 text-white">
                        <Award className="w-4 h-4 mr-1" />
                        #6 Best Seller
                      </Badge>}
                  </div>
                  <h1 className="font-bold font-serif text-xl">{enhancedProduct.name}</h1>
                  {enhancedProduct.sku && <p className="text-sm text-muted-foreground">SKU: {enhancedProduct.sku}</p>}
                </div>

                <ProductOptions sizes={currentSizes} colors={COLORS} selectedSize={selectedSize} selectedColor={selectedColor} onSizeSelect={setSelectedSize} onColorSelect={handleColorSelect} onAddToCart={handleAddToCart} price={currentPrice} originalPrice={currentOriginalPrice} rating={enhancedProduct.rating} reviews={enhancedProduct.reviews} isLiked={isLiked} onLikeClick={handleLikeClick} />

                {enhancedProduct.description}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>;
}