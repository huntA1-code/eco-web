
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const TrendStore = () => {
  const stores = [
    {
      name: "Luxury Fashion Store",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
    },
    {
      name: "Designer Boutique",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
    },
    {
      name: "Fashion Gallery",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5"
    },
    {
      name: "Premium Collection",
      image: "https://images.unsplash.com/photo-1507215210622-539686c4bfaa"
    },
    {
      name: "Elite Fashion House",
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Trend Stores</h2>
          <Badge variant="outline" className="bg-primary text-white px-4 py-1">Featured Stores</Badge>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {stores.map((store, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
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
