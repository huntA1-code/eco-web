
import { Categories } from "@/components/Categories";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { TrendProducts } from "@/components/TrendProducts";
import { OfferProducts } from "@/components/OfferProducts";
import { DiscountProducts } from "@/components/DiscountProducts";
import { Services } from "@/components/Services";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <TrendProducts />
      <OfferProducts />
      <DiscountProducts />
      <Services />
      <Newsletter />
    </div>
  );
};

export default Index;
