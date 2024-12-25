import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { OfferProducts } from "@/components/OfferProducts";
import { DiscountProducts } from "@/components/DiscountProducts";
import { Services } from "@/components/Services";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <OfferProducts />
      <DiscountProducts />
      <Services />
      <Newsletter />
    </div>
  );
};

export default Index;