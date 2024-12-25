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
      tag: "Best Seller"
    },
    {
      name: "Navy Blue Suit",
      price: "$499.99",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      tag: "New Arrival"
    },
    {
      name: "Silk Evening Gown",
      price: "$399.99",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
      tag: "Trending"
    },
    {
      name: "Casual Blazer",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      tag: "Popular"
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
                    <button className="absolute bottom-4 left-4 right-4 btn-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Quick View
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-primary font-semibold mt-1">{product.price}</p>
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