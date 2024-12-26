import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const FeaturedProducts = () => {
  const products = [
    {
      name: "Classic White Dress",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      tag: "Best Seller",
      description: "Elegant A-line silhouette with delicate lace details",
      sizes: ["XS", "S", "M", "L", "XL"],
      rating: 4.8,
      reviews: 128
    },
    {
      name: "Navy Blue Suit",
      price: "$499.99",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      tag: "New Arrival",
      description: "Tailored fit with premium Italian wool blend",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.9,
      reviews: 86
    },
    {
      name: "Silk Evening Gown",
      price: "$399.99",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
      tag: "Trending",
      description: "Luxurious silk with hand-beaded embellishments",
      sizes: ["XS", "S", "M", "L"],
      rating: 4.7,
      reviews: 95
    },
    {
      name: "Casual Blazer",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      tag: "Popular",
      description: "Versatile design perfect for any occasion",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.6,
      reviews: 154
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Featured Products</h2>
          <Badge variant="secondary" className="text-muted-foreground px-4 py-1">New Arrivals</Badge>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/3 sm:basis-1/2">
                <div className="card overflow-hidden group animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">{product.tag}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <button className="w-full btn-primary">
                          Quick View
                        </button>
                        <button className="w-full btn-secondary">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-primary font-semibold text-lg">{product.price}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="px-2">{size}</Badge>
                      ))}
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
    </section>
  );
};