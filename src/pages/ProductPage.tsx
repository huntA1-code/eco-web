import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ProductPage() {
  const { productName } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

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
    reviews: 128
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
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
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
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === image ? "border-primary" : "border-transparent"
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
        <div className="col-span-6">
          <div className="aspect-[3/4] rounded-xl overflow-hidden">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
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
                  ({product.reviews} reviews)
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

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button className="btn-secondary p-3">
              <Heart size={18} />
            </button>
            <button className="btn-secondary p-3">
              <Share2 size={18} />
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Product Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}