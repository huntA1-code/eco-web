import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      <DialogContent className="max-w-5xl h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side - Main Image with Gallery */}
          <div className="col-span-7 relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gallery thumbnails on the right */}
            <div className="absolute top-0 right-2 h-full flex flex-col gap-2 py-2">
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
          </div>

          {/* Right side - Product Details */}
          <div className="col-span-5 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
            </DialogHeader>

            <div className="flex justify-between items-start">
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

            <p className="text-muted-foreground">{product.description}</p>

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

            <div className="flex gap-4">
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

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Premium quality materials</li>
                <li>Ethically manufactured</li>
                <li>Free shipping on orders over $100</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};