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
  const productsPerPage = 12;

  // Sample products data (similar to Products page)
  const products = [
    {
      id: 1,
      name: "Sport Running Shoes",
      brand: "Nike",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      colors: ["Black", "White", "Red"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      description: "Premium running shoes with advanced cushioning technology.",
      category: "Footwear",
      rating: 4.5,
      reviews: 128
    },
    // ... Add more sample products as needed
  ];

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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Store;