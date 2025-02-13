import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AboutStore } from "@/components/AboutStore";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    price: 49.99,
    originalPrice: 89.99,
    sizes: [
      { label: '8Y', dimensions: '122-128CM', quantity: 2 },
      { label: '9Y', dimensions: '128-134CM', quantity: 8 },
      { label: '10Y', dimensions: '134-140CM', quantity: 0 },
      { label: '11Y', dimensions: '140-146CM', quantity: 5 },
      { label: '12Y', dimensions: '146-152CM', quantity: 1 },
    ],
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
  }
];

export default function ProductPage() {
  const { productName } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [currentImages, setCurrentImages] = useState(COLORS[0].images);
  const [currentSizes, setCurrentSizes] = useState(COLORS[0].sizes);
  const [currentPrice, setCurrentPrice] = useState(COLORS[0].price);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState(COLORS[0].originalPrice);
  const [isLiked, setIsLiked] = useState(false);
  const [openDescription, setOpenDescription] = useState(true);
  const [openSizeFit, setOpenSizeFit] = useState(false);

  const handleColorSelect = (color: typeof COLORS[0]) => {
    setSelectedColor(color.name);
    setCurrentImages(color.images);
    setSelectedImage(0);
    setCurrentSizes(color.sizes);
    setCurrentPrice(color.price);
    setCurrentOriginalPrice(color.originalPrice);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toast({
      title: !isLiked ? "Added to wishlist" : "Removed from wishlist",
      description: !isLiked ? "Product has been added to your wishlist" : "Product has been removed from your wishlist"
    });
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % currentImages.length);
  };

  const previousImage = () => {
    setSelectedImage(prev => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const product = {
    name: decodeURIComponent(productName || ""),
    sku: `SK${Math.random().toString(36).substr(2, 8)}`,
    rating: 4.8,
    reviews: 128,
    isTrending: true,
    isBestSeller: true,
    description: "This premium quality clothing item is designed with both style and comfort in mind. Made from high-grade materials, it features excellent durability and a perfect fit. Perfect for everyday wear or special occasions."
  };

  return (
    <div className="container max-w-[1100px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <div className="grid grid-cols-12 gap-4">
            <div className="hidden md:block col-span-1 -ml-2">
              <div className="flex flex-col gap-2 sticky top-0">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
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
            <div className="col-span-11">
              <div className="relative aspect-[4/5] max-w-[500px] mx-auto rounded-lg overflow-hidden bg-gray-100 group">
                <img
                  src={currentImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.isTrending && (
                <Badge variant="secondary" className="bg-primary text-white">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trends
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="secondary" className="bg-amber-500 text-white">
                  <Award className="w-4 h-4 mr-1" />
                  #6 Best Seller
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold font-serif">{product.name}</h1>
            {product.sku && (
              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            )}
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">${currentPrice.toFixed(2)}</span>
                  {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      ${currentOriginalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && (
                  <Badge className="bg-black text-white text-sm px-2 py-1">
                    -{Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}%
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Color{selectedColor ? `: ${selectedColor}` : ''}</h3>
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
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentSizes.map((size) => (
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
              {selectedSize && currentSizes.find(s => s.label === selectedSize)?.quantity === 0 && (
                <div className="text-red-500 text-sm font-medium">
                  SOLD OUT
                </div>
              )}
              {selectedSize && currentSizes.find(s => s.label === selectedSize)?.quantity! < 10 && currentSizes.find(s => s.label === selectedSize)?.quantity! > 0 && (
                <div className="text-red-500 text-sm font-medium">
                  {currentSizes.find(s => s.label === selectedSize)?.quantity} items left
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 btn-primary flex items-center justify-center gap-2"
                  disabled={!selectedSize || currentSizes.find(s => s.label === selectedSize)?.quantity === 0}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleLikeClick}
                  className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center ${
                    isLiked ? 'border-primary bg-primary text-white' : 'border-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            <div className="space-y-4 mt-6 border-t pt-6">
              <Collapsible
                open={openDescription}
                onOpenChange={setOpenDescription}
                className="border-b pb-4"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Description</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openDescription ? 'rotate-180' : ''
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4 text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Color</p>
                      <p className="text-sm">{selectedColor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Material</p>
                      <p className="text-sm">Premium Leather</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Outsole Material</p>
                      <p className="text-sm">Rubber</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Upper Material</p>
                      <p className="text-sm">Genuine Leather</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Activity Type</p>
                      <p className="text-sm">Casual Wear</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openSizeFit}
                onOpenChange={setOpenSizeFit}
                className="border-b pb-4"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Size & Fit</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openSizeFit ? 'rotate-180' : ''
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4 text-muted-foreground">
                  <div className="space-y-2">
                    <p className="text-sm">• True to size, order your normal size</p>
                    <p className="text-sm">• Regular fit</p>
                    <p className="text-sm">• Heel height: 1.5 inches</p>
                    <p className="text-sm">• Available in standard width</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            {product.description && (
              <p className="text-muted-foreground leading-relaxed mt-6">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CustomerReviews 
          reviews={[
            {
              id: 1,
              user: "Sarah M.",
              rating: 5,
              comment: "Absolutely love this product! The quality is outstanding.",
              date: "2024-02-15",
              helpfulCount: 8,
              overallFit: "True to Size",
              size: "M",
              color: "Black"
            },
            {
              id: 2,
              user: "John D.",
              rating: 4,
              comment: "Great fit and comfortable. Would buy again.",
              date: "2024-02-10",
              helpfulCount: 3,
              overallFit: "Runs Small",
              size: "L",
              color: "Navy"
            }
          ]} 
          availableSizes={SIZES.map(size => size.label)}
          availableColors={COLORS.map(color => color.name)}
        />
      </div>
      <div className="mt-16">
        <AboutStore {...{
          storeName: "MIMAOYIGOU",
          rating: 4.86,
          itemCount: 23,
          followerCount: 119,
          logo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
        }} />
      </div>
    </div>
  );
}
