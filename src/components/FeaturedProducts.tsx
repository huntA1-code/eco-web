import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { QuickView } from "./QuickView";
export const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const products = [{
    name: "Classic White Dress",
    price: "$299.99",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    tag: "Best Seller",
    tagColor: "accent-best",
    rating: 4.8,
    reviews: 128,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A timeless classic white dress perfect for any occasion."
  }, {
    name: "Navy Blue Suit",
    price: "$499.99",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    tag: "New Arrival",
    tagColor: "accent-new",
    rating: 4.9,
    reviews: 86,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Elegant navy blue suit crafted from premium materials."
  }, {
    name: "Silk Evening Gown",
    price: "$399.99",
    image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
    tag: "Trending",
    tagColor: "accent-trending",
    rating: 4.7,
    reviews: 95,
    sizes: ["XS", "S", "M", "L"],
    description: "Luxurious silk evening gown for special occasions."
  }, {
    name: "Casual Blazer",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    tag: "Popular",
    tagColor: "accent",
    rating: 4.6,
    reviews: 154,
    sizes: ["S", "M", "L", "XL"],
    description: "Versatile casual blazer for both formal and casual settings."
  }, {
    name: "Designer Handbag",
    price: "$899.99",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    tag: "Luxury",
    tagColor: "accent-new",
    rating: 4.9,
    reviews: 72,
    sizes: ["One Size"],
    description: "Premium designer handbag made from genuine leather."
  }];
  return;
};