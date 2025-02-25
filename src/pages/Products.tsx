import { useState } from "react";
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

export interface FiltersResponse {
  categories: string[];
  types: string[];
  colors: Array<{ id: string; name: string; hex: string; }>;
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

const API_URL = "https://your-api-url.com/api"; // Replace with your actual API URL

// Mock data declarations moved to the top
const mockProducts = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  brand: ["Nike", "Adidas", "Puma", "Under Armour"][Math.floor(Math.random() * 4)],
  price: 99.99 + Math.floor(Math.random() * 100),
  image: "/placeholder.svg",
  colors: ["Red", "Blue", "Black"],
  sizes: ["S", "M", "L", "XL"],
  description: "Product description",
  category: "Category",
  rating: 4 + Math.random(),
  reviews: Math.floor(Math.random() * 100)
}));

const mockFilters: FiltersResponse = {
  categories: ["Clothing", "Shoes", "Accessories"],
  types: ["Casual", "Sport", "Formal"],
  colors: [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "white", name: "White", hex: "#FFFFFF" },
    { id: "red", name: "Red", hex: "#FF0000" }
  ],
  sizes: ["S", "M", "L", "XL"],
  priceRange: [0, 1000],
  styles: ["Casual", "Formal", "Sport"],
  occasions: ["Casual", "Formal", "Sport"],
  brands: ["Nike", "Adidas", "Puma"]
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch filters with the current selected filters
  const { data: filtersData = mockFilters } = useQuery<FiltersResponse>({
    queryKey: ['filters', selectedFilters],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/filters`, {
          params: {
            ...selectedFilters,
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching filters:', error);
        return mockFilters;
      }
    },
  });

  // Fetch products with filters
  const { data: productsData, isLoading } = useQuery<ProductResponse>({
    queryKey: ['products', selectedFilters, currentPage],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          params: {
            page: currentPage,
            limit: productsPerPage,
            ...selectedFilters,
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        return {
          products: mockProducts.slice(start, end),
          total: mockProducts.length,
          totalPages: Math.ceil(mockProducts.length / productsPerPage)
        };
      }
    },
  });

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
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
            filters={filtersData}
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
