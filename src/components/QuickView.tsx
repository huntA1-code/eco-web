import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface QuickViewProps {
  product: {
    name: string;
    price: string;
    image: string;
    tag?: string;
    description: string;
    sizes: string[];
    rating: number;
    reviews: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(product.image);

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
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  // Generate additional product images for the gallery
  const productImages = [
    product.image,
    product.image.replace(/\d+$/, "2"),
    product.image.replace(/\d+$/, "3"),
    product.image.replace(/\d+$/, "4"),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left side - Gallery Thumbnails */}
          <div className="col-span-1 flex flex-col gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === img ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Center - Main Image */}
          <div className="col-span-6">
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="col-span-5 flex flex-col h-full">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="flex justify-between items-start mt-4">
              <div>
                <p className="text-2xl font-semibold">{product.price}</p>
                {product.tag && (
                  <Badge variant="secondary" className="mt-2">
                    {product.tag}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mt-4">{product.description}</p>

            <div className="mt-6">
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

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="btn-secondary p-3"
              >
                <Heart size={18} />
              </button>
            </div>

            <Link 
              to={`/products/${encodeURIComponent(product.name)}`} 
              className="mt-auto flex items-center text-primary hover:underline"
            >
              Show full details <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};