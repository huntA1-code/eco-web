import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Share2, ChevronLeft, ChevronRight, Minus, Plus, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AboutStore } from "@/components/AboutStore";
import { CustomerReviews } from "@/components/CustomerReviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductPage() {
  const { productName } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Mock store data
  const storeData = {
    storeName: "MIMAOYIGOU",
    rating: 4.86,
    itemCount: 23,
    followerCount: 119,
    logo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
  };

  // This would typically come from an API
  const product = {
    name: decodeURIComponent(productName || ""),
    price: "$299.99",
    description: "Elegant and comfortable design perfect for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    details: [
      "Premium quality materials",
      "Ethically manufactured",
      "Free shipping on orders over $100",
      "30-day return policy"
    ],
    images: [
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
    ],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "Absolutely love this product! The quality is outstanding.",
        date: "2024-02-15"
      },
      {
        id: 2,
        user: "John D.",
        rating: 4,
        comment: "Great fit and comfortable. Would buy again.",
        date: "2024-02-10"
      }
    ],
    reviewCount: 128
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    } else if (action === 'increase') {
      setQuantity(prev => prev + 1);
    }
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

    // Add to cart logic
    const cartItem = {
      id: Date.now(),
      name: product.name,
      size: selectedSize,
      price: parseFloat(product.price.replace('$', '')),
      quantity: quantity,
      image: product.images[0]
    };

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...existingCart, cartItem]));

    setIsAddedToCart(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left - Gallery */}
        <div className="col-span-1">
          <div className="flex flex-col gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                className="w-14 h-14 rounded-lg overflow-hidden border hover:border-primary transition-all"
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

        {/* Center - Main Image and Reviews */}
        <div className="col-span-6 space-y-8">
          <div 
            className="relative aspect-[4/5] rounded-xl overflow-hidden group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <Carousel className="w-full h-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </Carousel>
          </div>

          {/* Reviews Section */}
          <CustomerReviews reviews={product.reviews} />
        </div>

        {/* Right - Product Info */}
        <div className="col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold">{product.price}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div>
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-neutral-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-3 w-32">
              <button 
                onClick={() => handleQuantityChange('decrease')}
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-neutral-light"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange('increase')}
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-neutral-light"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 btn-primary flex items-center justify-center gap-2 ${
                isAddedToCart ? 'bg-green-500 hover:bg-green-600' : ''
              }`}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Add to Cart
                </>
              )}
            </button>
            <button className="btn-secondary p-3">
              <Heart size={18} />
            </button>
            <button className="btn-secondary p-3">
              <Share2 size={18} />
            </button>
          </div>

          <div className="border-t pt-6">
            <AboutStore {...storeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
