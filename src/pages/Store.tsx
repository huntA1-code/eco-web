import { useState } from 'react';
import { Header } from '../components/header/Header';
import { ProductFilters } from '../components/ProductFilters';
import { ProductCard } from '../components/ProductCard';
import { FilterState } from '@/types/filters';

const Store = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilter = (filterType: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterType];
      return newFilters;
    });
  };

  // Sample product data
  const sampleProduct = {
    id: 1,
    name: "Sport Running Shoes",
    brand: "Nike",
    price: 129.99,
    image: "/placeholder.svg",
    colors: ["Black", "White", "Red"],
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    description: "Premium running shoes with advanced cushioning technology.",
    category: "Footwear",
    rating: 4.5,
    reviews: 128
  };

  // Sample filters data
  const filters = {
    categories: ["Running", "Training", "Basketball"],
    types: ["Shoes", "Clothing", "Accessories"],
    colors: ["Black", "White", "Red", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    priceRange: [0, 200],
    styles: ["Casual", "Athletic", "Professional"],
    occasions: ["Sport", "Casual", "Training"],
    brands: ["Nike", "Adidas", "Puma", "Under Armour"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters 
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
              filters={filters}
            />
          </aside>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProductCard product={sampleProduct} />
              <ProductCard product={sampleProduct} />
              <ProductCard product={sampleProduct} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;