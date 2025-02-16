
import { StoreHeader } from "@/components/header/StoreHeader";
import { StoreStats } from "@/components/header/StoreStats";
import { DiscountProducts } from "@/components/DiscountProducts";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutStore } from "@/components/AboutStore";
import { CustomerReviews } from "@/components/CustomerReviews";

const mockReviews = [
  {
    id: 1,
    user: "Alice Johnson",
    rating: 5,
    comment: "Absolutely love the quality and style of everything I've purchased!",
    date: "2024-02-15",
    overallFit: "True to Size",
    size: "M",
    color: "Black",
    helpfulCount: 12
  },
  {
    id: 2,
    user: "Bob Smith",
    rating: 4,
    comment: "Great store with excellent customer service. Shipping was quick!",
    date: "2024-02-14",
    overallFit: "Runs Small",
    size: "L",
    color: "Navy",
    helpfulCount: 8
  }
];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = ["Black", "White", "Navy", "Red", "Forest Green", "Hot Pink"];

const Store = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader />
      <StoreStats />
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content - 8 columns on desktop */}
          <div className="md:col-span-8 space-y-8">
            <FeaturedProducts />
            <DiscountProducts />
            <CustomerReviews
              reviews={mockReviews}
              availableSizes={availableSizes}
              availableColors={availableColors}
            />
          </div>
          
          {/* Sidebar - 4 columns on desktop */}
          <div className="md:col-span-4 space-y-8">
            <AboutStore 
              storeName="Multi-brand Sports Flagship Store"
              rating={4.91}
              itemCount={5000}
              followerCount={448}
              logo="/placeholder.svg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;
