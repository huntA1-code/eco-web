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
              <div className="col-span-5">
                <ProductHeader
                  name={product.name}
                  sku={product.sku}
                  isLiked={isLiked}
                  onLikeClick={handleLikeClick}
                />
                <div className="mt-4">
                  <ProductOptions
                    sizes={SIZES}
                    colors={COLORS}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    onSizeSelect={setSelectedSize}
                    onColorSelect={handleColorSelect}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
