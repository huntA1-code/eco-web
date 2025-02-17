
import { useState } from "react";
import { Header } from "@/components/header/Header";
import { CustomerReviews } from "@/components/CustomerReviews";
import { BottomNav } from "@/components/header/BottomNav";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "Alice Johnson",
    rating: 5,
    comment: "Absolutely love the quality and style of everything I've purchased! The customer service is exceptional and shipping was faster than expected. Would definitely recommend this store to anyone looking for quality sports gear.",
    date: "2024-02-15",
    overallFit: "True to Size",
    size: "M",
    color: "Black",
    helpfulCount: 12,
    avatar: "/placeholder.svg" // Using local placeholder image
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
    helpfulCount: 8,
    avatar: "/placeholder.svg" // Using local placeholder image
  },
  {
    id: 3,
    user: "Emma Davis",
    rating: 5,
    comment: "Impressive selection and competitive prices. The quality of the products exceeds expectations.",
    date: "2024-02-13",
    overallFit: "True to Size",
    size: "S",
    color: "Red",
    helpfulCount: 15,
    avatar: "/placeholder.svg" // Using local placeholder image
  }
];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = ["Black", "White", "Navy", "Red", "Forest Green", "Hot Pink"];

const StoreReview = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <CustomerReviews
          reviews={mockReviews}
          availableSizes={availableSizes}
          availableColors={availableColors}
        />
      </main>
    </div>
  );
};

export default StoreReview;
