
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { QuickView } from "./QuickView";

export const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const products = [
    {
      name: "Classic White Dress",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      tag: "Best Seller",
      tagColor: "accent-best",
      rating: 4.8,
      reviews: 128
    },
    {
      name: "Navy Blue Suit",
      price: "$499.99",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      tag: "New Arrival",
      tagColor: "accent-new",
      rating: 4.9,
      reviews: 86
    },
    {
      name: "Silk Evening Gown",
      price: "$399.99",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
      tag: "Trending",
      tagColor: "accent-trending",
      rating: 4.7,
      reviews: 95
    },
    {
      name: "Casual Blazer",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      tag: "Popular",
      tagColor: "accent",
      rating: 4.6,
      reviews: 154
    },
    {
      name: "Designer Handbag",
      price: "$899.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      tag: "Luxury",
      tagColor: "accent-new",
      rating: 4.9,
      reviews: 72
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Featured Products</h2>
          <Badge variant="outline" className="bg-accent-new text-white px-4 py-1">New Arrivals</Badge>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <div className="card overflow-hidden group animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="outline" 
                        className={`bg-${product.tagColor} text-white backdrop-blur-sm`}
                      >
                        {product.tag}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <button 
                          className="w-full btn-primary"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Quick View
                        </button>
                        <button className="w-full btn-secondary">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 bg-white">
                    <h3 className="font-medium text-lg text-foreground">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-semibold text-lg">{product.price}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>

        {selectedProduct && (
          <QuickView
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
};
