import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AboutStore } from "@/components/AboutStore";
import { CustomerReviews } from "@/components/CustomerReviews";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useProductDetails, ProductColor } from "@/hooks/useProductDetails";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { ProductError } from "@/components/ProductError";


export default function ProductPage() {
  const { productName } = useParams();
  const { toast } = useToast();
  
  // Extract product ID from URL (assuming it's in the format /product/:productId)
  const productId = productName || '';
  
  // Use the custom hook for API data
  const {
    product,
    reviews,
    recommendedProducts,
    productLoading,
    reviewsLoading,
    recommendedLoading,
    isLoading,
    isError,
    error,
    refetchAll
  } = useProductDetails(productId);

  // Local state for UI interactions
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [openDescription, setOpenDescription] = useState(true);
  const [openSizeFit, setOpenSizeFit] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  
  // Reset selected image when color changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedColorIndex]);
  
  // Show loading skeleton
  if (isLoading || productLoading) {
    return <ProductSkeleton />;
  }
  
  // Show error state
  if (isError || !product) {
    return <ProductError error={error} onRetry={refetchAll} />;
  }
  
  // Get current color data
  const currentColor = product.colors[selectedColorIndex];
  const currentImages = currentColor?.images || [product.image];
  const currentSizes = currentColor?.sizes || [];
  const currentPrice = currentColor?.price || product.price;
  const currentOriginalPrice = currentColor?.originalPrice || product.price;

  const handleColorSelect = (colorIndex: number) => {
    setSelectedColorIndex(colorIndex);
    setSelectedSize(''); // Reset selected size when changing color
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    const selectedSizeData = currentSizes.find(s => s.label === selectedSize);
    if (selectedSizeData?.quantity === 0) {
      toast({
        title: "Size out of stock",
        description: "Please select a different size",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
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


  return <div className="container max-w-[1100px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <div className="grid grid-cols-12 gap-4">
            <div className="hidden md:block col-span-1 -ml-2">
              <div className="flex flex-col gap-2 sticky top-0">
                {currentImages.map((image, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}>
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>)}
              </div>
            </div>
            <div className="col-span-11">
              <div className="relative aspect-[4/5] max-w-[500px] mx-auto rounded-lg overflow-hidden bg-gray-100 group">
                <img src={currentImages[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                <button onClick={previousImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-label="Previous image">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-label="Next image">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {reviewsLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ) : (
              <CustomerReviews 
                reviews={reviews || []} 
                availableSizes={currentSizes.map(size => size.label)} 
                availableColors={product.colors.map(color => color.name)} 
              />
            )}
          </div>
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.isTrending && <Badge variant="secondary" className="bg-primary text-white">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trends
                </Badge>}
              {product.isBestSeller && <Badge variant="secondary" className="bg-amber-500 text-white">
                  <Award className="w-4 h-4 mr-1" />
                  #6 Best Seller
                </Badge>}
            </div>
            <h1 className="text-2xl font-bold font-serif">{product.name}</h1>
            {product.sku && <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>}
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">${currentPrice.toFixed(2)}</span>
                  {currentOriginalPrice && currentOriginalPrice > currentPrice && <span className="text-base text-muted-foreground line-through">
                      ${currentOriginalPrice.toFixed(2)}
                    </span>}
                </div>
                {currentOriginalPrice && currentOriginalPrice > currentPrice && <Badge className="bg-black text-white text-sm px-2 py-1">
                    -{Math.round((currentOriginalPrice - currentPrice) / currentOriginalPrice * 100)}%
                  </Badge>}
              </div>
              <div>
                <h3 className="font-medium mb-2">Color{currentColor ? `: ${currentColor.name}` : ''}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <div key={color.name} className="relative">
                      <button 
                        onClick={() => handleColorSelect(index)} 
                        className={`w-10 h-10 rounded-full transition-all ${selectedColorIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}`} 
                        style={{ backgroundColor: color.hex }} 
                        title={color.name} 
                      />
                      {color.isHot && (
                        <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500" variant="secondary">
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
                  {currentSizes.map(size => <button key={size.label} onClick={() => setSelectedSize(size.label)} className={`p-3 rounded border text-sm transition-all ${selectedSize === size.label ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-primary'} ${size.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={size.quantity === 0}>
                      {size.label} ({size.dimensions})
                    </button>)}
                </div>
              </div>
              {selectedSize && currentSizes.find(s => s.label === selectedSize)?.quantity === 0 && <div className="text-red-500 text-sm font-medium">
                  SOLD OUT
                </div>}
              {selectedSize && currentSizes.find(s => s.label === selectedSize)?.quantity! < 10 && currentSizes.find(s => s.label === selectedSize)?.quantity! > 0 && <div className="text-red-500 text-sm font-medium">
                  {currentSizes.find(s => s.label === selectedSize)?.quantity} items left
                </div>}
              <div className="flex gap-3">
                <button onClick={handleAddToCart} className="flex-1 h-12 btn-primary flex items-center justify-center gap-2" disabled={!selectedSize || currentSizes.find(s => s.label === selectedSize)?.quantity === 0}>
                  Add to Cart
                </button>
                <button onClick={handleLikeClick} className={`h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center ${isLiked ? 'border-primary bg-primary text-white' : 'border-gray-200'}`}>
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            <div className="space-y-4 mt-6 border-t pt-6">
              <Collapsible open={openDescription} onOpenChange={setOpenDescription} className="border-b pb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Description</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openDescription ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4 text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Color</p>
                      <p className="text-sm">{currentColor?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Material</p>
                      <p className="text-sm">{product.specifications.material}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Outsole Material</p>
                      <p className="text-sm">{product.specifications.outsoleMaterial}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Upper Material</p>
                      <p className="text-sm">{product.specifications.upperMaterial}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Activity Type</p>
                      <p className="text-sm">{product.specifications.activityType}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openSizeFit} onOpenChange={setOpenSizeFit} className="border-b pb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Size & Fit</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openSizeFit ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4 text-muted-foreground">
                  <div className="space-y-2">
                    <p className="text-sm">• True to size, order your normal size</p>
                    <p className="text-sm">• Regular fit</p>
                    <p className="text-sm">• Heel height: {product.specifications.heelHeight}</p>
                    <p className="text-sm">• Available in {product.specifications.width.toLowerCase()} width</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openStore} onOpenChange={setOpenStore} className="border-b pb-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Store Information</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openStore ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <AboutStore 
                    storeName={product.store.name} 
                    rating={product.store.rating} 
                    itemCount={product.store.itemCount} 
                    followerCount={product.store.followerCount} 
                    logo={product.store.logo} 
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommended Products Section */}
      {recommendedLoading ? (
        <div className="mt-16">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <RecommendedProducts productId={product.id.toString()} />
      )}
    </div>;
}
