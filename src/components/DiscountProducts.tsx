
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const DiscountProducts = () => {
  const products = [{
    name: "Casual Sneakers",
    price: "$89.99",
    discountPrice: "$49.99",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
    discount: "45% OFF",
    stock: 12,
    endDate: "2024-03-30"
  }, {
    name: "Denim Collection",
    price: "$129.99",
    discountPrice: "$79.99",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    discount: "38% OFF",
    stock: 8,
    endDate: "2024-03-25"
  }, {
    name: "Winter Jacket",
    price: "$199.99",
    discountPrice: "$129.99",
    image: "https://images.unsplash.com/photo-1577744486770-020ab432da65",
    discount: "35% OFF",
    stock: 5,
    endDate: "2024-03-20"
  }, {
    name: "Fashion Accessories",
    price: "$79.99",
    discountPrice: "$39.99",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    discount: "50% OFF",
    stock: 15,
    endDate: "2024-03-28"
  }, {
    name: "Designer Scarf",
    price: "$59.99",
    discountPrice: "$29.99",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26",
    discount: "50% OFF",
    stock: 20,
    endDate: "2024-03-26"
  }];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Flash Sale</h2>
          <Badge variant="outline" className="bg-red-500 text-white px-4 py-1">Limited Time</Badge>
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
                <div className="card overflow-hidden group animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {product.discount}
                    </Badge>
                  </div>
                  <div className="p-4 space-y-2 bg-white">
                    <h3 className="font-medium text-lg text-foreground">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <span className="text-primary font-semibold text-lg">{product.discountPrice}</span>
                        <span className="text-muted-foreground line-through text-sm">{product.price}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ends: {new Date(product.endDate).toLocaleDateString()}
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
