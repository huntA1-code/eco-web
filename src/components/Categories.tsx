
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Formal Woman",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      link: "#"
    },
    {
      title: "Casual Style",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      link: "#"
    },
    {
      title: "Formal Men",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      link: "#"
    },
    {
      title: "Summer Collection",
      image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5",
      link: "#"
    },
    {
      title: "Winter Wear",
      image: "https://images.unsplash.com/photo-1577744486770-020ab432da65",
      link: "#"
    },
    {
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      link: "#"
    },
    {
      title: "Streetwear",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      link: "#"
    },
    {
      title: "Athletic Wear",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
      link: "#"
    }
  ];

  const handleCategoryClick = (category: string) => {
    console.log("Navigating to:", `/products?category=${category}`);
    navigate(`/products?category=${category}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Shop by Category</h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <button
                  onClick={() => handleCategoryClick(category.title)}
                  className="w-full text-left"
                >
                  <div className="group relative overflow-hidden rounded-lg aspect-square hover-scale">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white font-serif text-lg">
                      {category.title}
                    </h3>
                  </div>
                </button>
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
