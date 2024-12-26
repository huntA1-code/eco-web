import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const OfferProducts = () => {
  const products = [
    {
      name: "Summer Dress Collection",
      price: "$129.99",
      offerPrice: "$89.99",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      offerText: "Limited Time Offer",
      description: "Light and breezy summer dresses",
      features: ["Breathable fabric", "UV protection", "Easy care"],
      validUntil: "2024-03-25",
      savings: "$40"
    },
    {
      name: "Designer Handbag",
      price: "$299.99",
      offerPrice: "$199.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      offerText: "Special Deal",
      description: "Genuine leather designer handbag",
      features: ["Premium leather", "Spacious design", "Gold hardware"],
      validUntil: "2024-03-20",
      savings: "$100"
    },
    {
      name: "Premium Sunglasses",
      price: "$159.99",
      offerPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1577744486770-020ab432da65",
      offerText: "Flash Sale",
      description: "UV protected premium sunglasses",
      features: ["Polarized", "Scratch resistant", "Lightweight"],
      validUntil: "2024-03-28",
      savings: "$60"
    },
    {
      name: "Luxury Watch",
      price: "$499.99",
      offerPrice: "$349.99",
      image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5",
      offerText: "Today Only",
      description: "Premium automatic watch",
      features: ["Swiss movement", "Sapphire crystal", "Water resistant"],
      validUntil: "2024-03-22",
      savings: "$150"
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Special Offers</h2>
          <Badge variant="secondary" className="text-primary px-4 py-1">Limited Time</Badge>
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
                      <Badge variant="destructive" className="bg-primary">{product.offerText}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <button className="w-full btn-primary">
                          Shop Now
                        </button>
                        <div className="text-white text-center">
                          Save {product.savings}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-primary font-semibold text-lg">{product.offerPrice}</span>
                        <span className="text-muted-foreground line-through ml-2">{product.price}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Until {new Date(product.validUntil).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="px-2 text-xs">{feature}</Badge>
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