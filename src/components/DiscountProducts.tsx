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
      discount: "45% OFF",
      description: "Comfortable and stylish everyday sneakers",
      colors: ["White", "Black", "Gray"],
      stock: 12,
      endDate: "2024-03-30"
    },
    {
      name: "Denim Collection",
      price: "$129.99",
      discountPrice: "$79.99",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      discount: "38% OFF",
      description: "Premium quality stretch denim jeans",
      colors: ["Blue", "Black", "Light Blue"],
      stock: 8,
      endDate: "2024-03-25"
    },
    {
      name: "Winter Jacket",
      price: "$199.99",
      discountPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1577744486770-020ab432da65",
      discount: "35% OFF",
      description: "Warm and water-resistant winter jacket",
      colors: ["Navy", "Black", "Green"],
      stock: 5,
      endDate: "2024-03-20"
    },
    {
      name: "Fashion Accessories",
      price: "$79.99",
      discountPrice: "$39.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      discount: "50% OFF",
      description: "Trendy accessories for any outfit",
      colors: ["Gold", "Silver", "Rose Gold"],
      stock: 15,
      endDate: "2024-03-28"
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <button className="w-full btn-primary">
                          Shop Now
                        </button>
                        <div className="text-white text-center text-sm">
                          Offer ends {new Date(product.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-accent font-semibold text-lg">{product.discountPrice}</span>
                        <span className="text-muted-foreground line-through ml-2">{product.price}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.stock} left
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="secondary" className="px-2">{color}</Badge>
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