
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const BestSeller = () => {
  const products = [
    {
      name: "Premium Leather Bag",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      rating: 4.9,
      reviews: 245,
      sizes: ["One Size"],
      description: "Handcrafted premium leather bag."
    },
    {
      name: "Designer Watch",
      price: "$399.99",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
      rating: 4.8,
      reviews: 189,
      sizes: ["One Size"],
      description: "Luxury designer watch for any occasion."
    },
    {
      name: "Signature Perfume",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
      rating: 4.7,
      reviews: 167,
      sizes: ["100ml"],
      description: "Exclusive signature fragrance."
    },
    {
      name: "Classic Sunglasses",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      rating: 4.6,
      reviews: 143,
      sizes: ["One Size"],
      description: "Timeless classic sunglasses design."
    },
    {
      name: "Luxury Scarf",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      rating: 4.8,
      reviews: 156,
      sizes: ["One Size"],
      description: "Premium silk scarf for elegant style."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Best Sellers</h2>
          <Badge variant="outline" className="bg-accent-best text-white px-4 py-1">Top Rated</Badge>
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
    </section>
  );
};
