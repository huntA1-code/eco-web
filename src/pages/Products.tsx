import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filters = {
    categories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"],
    types: ["Casual", "Formal", "Party", "Workwear", "Vacation"],
    colors: ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    priceRange: [0, 200],
    styles: ["Bohemian", "Classic", "Streetwear", "Minimalist", "Vintage"],
    occasions: ["Daily", "Work", "Party", "Beach", "Sports"],
  };

  const products = [
    {
      id: 1,
      name: "Floral Summer Dress",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      colors: ["Pink", "Blue"],
      sizes: ["S", "M", "L"],
      description: "Beautiful floral dress perfect for summer days",
      category: "Dresses",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Classic White Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      colors: ["White"],
      sizes: ["XS", "S", "M", "L", "XL"],
      description: "Timeless white shirt for any occasion",
      category: "Tops",
      rating: 4.8,
      reviews: 256,
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      colors: ["Black", "Brown"],
      sizes: ["S", "M", "L", "XL"],
      description: "Classic leather jacket for a bold look",
      category: "Outerwear",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 4,
      name: "Denim Jeans",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      colors: ["Blue", "Black"],
      sizes: ["28", "30", "32", "34"],
      description: "Comfortable and stylish denim jeans",
      category: "Bottoms",
      rating: 4.6,
      reviews: 312,
    },
    // Add more products with the same structure
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilter = (filterType: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    if (selectedFilters.category && product.category !== selectedFilters.category) return false;
    if (selectedFilters.color && !product.colors.includes(selectedFilters.color)) return false;
    if (selectedFilters.size && !product.sizes.includes(selectedFilters.size)) return false;
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-serif font-semibold">
            {category || "All Products"}
          </h1>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([type, value]) => (
              <Badge
                key={type}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-2"
              >
                {type}: {value}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => clearFilter(type)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <ProductFilters
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilter={clearFilter}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>
    </div>
  );
};

export default Products;
