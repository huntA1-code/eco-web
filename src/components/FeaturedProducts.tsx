
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Featured Products</h2>
          <Badge variant="outline" className="bg-primary text-white px-4 py-1">New Collection</Badge>
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
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div 
                  className="card overflow-hidden group animate-fade-up cursor-pointer" 
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className={`absolute top-2 right-2 bg-${product.tagColor}`}>
                      {product.tag}
                    </Badge>
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
      </div>
      {selectedProduct && (
        <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};
