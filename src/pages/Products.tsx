
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types for API responses
interface ProductResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

interface FiltersResponse {
  categories: string[];
  types: string[];
  colors: { id: string; name: string; hex: string; }[];
  sizes: string[];
  priceRange: [number, number];
  styles: string[];
  occasions: string[];
  brands: string[];
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: {
    rate: number;
    type: 'percentage' | 'fixed';
  };
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch available filters
  const { data: filtersData } = useQuery<FiltersResponse>({
    queryKey: ['filters'],
    queryFn: async () => {
      // Replace with your actual API endpoint
      const response = await axios.get('/api/filters');
      return response.data;
    },
  });

  // Fetch products with filters
  const { data: productsData, isLoading } = useQuery<ProductResponse>({
    queryKey: ['products', selectedFilters, currentPage],
    queryFn: async () => {
      // Replace with your actual API endpoint
      const response = await axios.get('/api/products', {
        params: {
          page: currentPage,
          limit: productsPerPage,
          ...selectedFilters,
          category: category || undefined,
        },
      });
      return response.data;
    },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-64">
            Loading products...
          </div>
        </div>
      </div>
    );
  }

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
                {type}: {Array.isArray(value) ? value.join(', ') : value}
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
            filters={filtersData || {
              categories: [],
              types: [],
              colors: [],
              sizes: [],
              priceRange: [0, 1000],
              styles: [],
              occasions: [],
              brands: [],
            }}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilter={clearFilter}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsData?.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {productsData && productsData.totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: productsData.totalPages }).map((_, i) => (
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
                      onClick={() => setCurrentPage(prev => 
                        Math.min(productsData.totalPages, prev + 1)
                      )}
                      className={currentPage === productsData.totalPages ? 
                        'pointer-events-none opacity-50' : ''
                      }
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
