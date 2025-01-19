import { useState } from "react";
import { Header } from '../components/header/Header';
import { ProductFilters } from '../components/ProductFilters';
import { ProductCard } from '../components/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Store = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Changed to 20 products per page

  // Sample products data with more items
  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Sport Running Shoes ${index + 1}`,
    brand: ["Nike", "Adidas", "Puma", "Under Armour"][Math.floor(Math.random() * 4)],
    price: 99.99 + Math.floor(Math.random() * 100),
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    colors: ["Black", "White", "Red"],
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    description: "Premium running shoes with advanced cushioning technology.",
    category: "Footwear",
    rating: 4 + Math.random(),
    reviews: 50 + Math.floor(Math.random() * 200)
  }));

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilter = (filterType: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
              filters={{
                categories: ["Running", "Training", "Basketball"],
                types: ["Shoes", "Clothing", "Accessories"],
                colors: ["Black", "White", "Red", "Blue"],
                sizes: ["S", "M", "L", "XL"],
                priceRange: [0, 200],
                styles: ["Casual", "Athletic", "Professional"],
                occasions: ["Sport", "Casual", "Training"],
                brands: ["Nike", "Adidas", "Puma", "Under Armour"]
              }}
            />
          </aside>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;