import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const DiscountProducts = () => {
  const products = [
    {
      name: "Casual Sneakers",
      price: "$89.99",
      discountPrice: "$49.99",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
      discount: "45% OFF"
    },
    {
      name: "Denim Collection",
      price: "$129.99",
      discountPrice: "$79.99",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      discount: "38% OFF"
    },
    {
      name: "Winter Jacket",
      price: "$199.99",
      discountPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1577744486770-020ab432da65",
      discount: "35% OFF"
    },
    {
      name: "Fashion Accessories",
      price: "$79.99",
      discountPrice: "$39.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      discount: "50% OFF"
    }
  ];

  return (
    <section className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Clearance Sale</h2>
          <Badge variant="secondary" className="text-accent-foreground bg-accent px-4 py-1">Big Savings</Badge>
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
                      <Badge variant="destructive" className="bg-accent text-accent-foreground">{product.discount}</Badge>
                    </div>
                    <button className="absolute bottom-4 left-4 right-4 btn-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-accent font-semibold">{product.discountPrice}</span>
                      <span className="text-muted-foreground line-through">{product.price}</span>
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