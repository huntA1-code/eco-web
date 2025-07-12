
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryNode } from "@/types/filters";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types for API responses
interface ProductResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FiltersResponse {
  categories: CategoryNode[];
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

interface ApiError {
  message: string;
  code: string;
  details?: any;
}

const API_URL = process.env.REACT_APP_API_URL || "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data declarations
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
  categories: [
    {
      id: "clothing",
      name: "Clothing",
      children: [
        {
          id: "mens",
          name: "Men's Clothing",
          children: [
            { id: "shirts", name: "Shirts" },
            { id: "pants", name: "Pants" }
          ]
        },
        {
          id: "womens",
          name: "Women's Clothing",
          children: [
            { id: "dresses", name: "Dresses" },
            { id: "tops", name: "Tops" }
          ]
        }
      ]
    },
    {
      id: "shoes",
      name: "Shoes",
      children: [
        { id: "running", name: "Running Shoes" },
        { id: "casual", name: "Casual Shoes" }
      ]
    },
    { id: "accessories", name: "Accessories" }
  ],
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

// Error handling utility
const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    
    if (axiosError.code === 'ECONNABORTED') {
      return { message: 'Request timeout. Please try again.', code: 'TIMEOUT' };
    }
    
    if (axiosError.code === 'ERR_NETWORK') {
      return { message: 'Network error. Please check your connection.', code: 'NETWORK_ERROR' };
    }
    
    return { 
      message: axiosError.message || 'An unexpected error occurred', 
      code: axiosError.code || 'UNKNOWN_ERROR' 
    };
  }
  
  return { 
    message: 'An unexpected error occurred', 
    code: 'UNKNOWN_ERROR',
    details: error 
  };
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { toast } = useToast();

  // Fetch filters with enhanced error handling
  const { 
    data: filtersData = mockFilters, 
    isLoading: isLoadingFilters,
    error: filtersError,
    refetch: refetchFilters
  } = useQuery<FiltersResponse, ApiError>({
    queryKey: ['filters', selectedFilters],
    queryFn: async () => {
      try {
        console.log('Fetching filters with params:', selectedFilters);
        const response = await apiClient.get('/filters', {
          params: selectedFilters
        });
        
        // Validate response structure
        if (!response.data || typeof response.data !== 'object') {
          throw new Error('Invalid filters response format');
        }
        
        return response.data;
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Filters API Error:', apiError);
        
        // Show toast notification for critical errors
        if (apiError.code !== 'TIMEOUT') {
          toast({
            title: "Failed to load filters",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        // Return mock data as fallback
        return mockFilters;
      }
    },
    retry: (failureCount, error) => {
      // Retry up to 3 times for network errors, but not for 4xx errors
      const apiError = handleApiError(error);
      if (apiError.code === '404' || apiError.code?.startsWith('4')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Fetch products with enhanced error handling
  const { 
    data: productsData, 
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts
  } = useQuery<ProductResponse, ApiError>({
    queryKey: ['products', selectedFilters, currentPage],
    queryFn: async () => {
      try {
        console.log('Fetching products:', {
          page: currentPage,
          limit: productsPerPage,
          filters: selectedFilters
        });
        
        const response = await apiClient.get('/products', {
          params: {
            page: currentPage,
            limit: productsPerPage,
            category,
            ...selectedFilters,
          }
        });
        
        // Validate response structure
        if (!response.data || !Array.isArray(response.data.products)) {
          throw new Error('Invalid products response format');
        }
        
        return response.data;
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Products API Error:', apiError);
        
        // Show toast for non-network errors
        if (apiError.code !== 'NETWORK_ERROR' && apiError.code !== 'TIMEOUT') {
          toast({
            title: "Failed to load products",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        // Return mock data as fallback
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        return {
          products: mockProducts.slice(start, end),
          total: mockProducts.length,
          totalPages: Math.ceil(mockProducts.length / productsPerPage),
          currentPage,
          hasNextPage: currentPage < Math.ceil(mockProducts.length / productsPerPage),
          hasPreviousPage: currentPage > 1
        };
      }
    },
    retry: (failureCount, error) => {
      const apiError = handleApiError(error);
      if (apiError.code === '404' || apiError.code?.startsWith('4')) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
    
    // Show success toast for filter application
    toast({
      title: "Filter applied",
      description: `${filterType} filter has been updated`,
    });
  };

  const clearFilter = (filterType: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
    
    toast({
      title: "Filter cleared",
      description: `${filterType} filter has been removed`,
    });
  };

  const handleRetry = () => {
    refetchProducts();
    refetchFilters();
  };

  // Loading state
  if (isLoadingProducts && isLoadingFilters) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span className="text-lg">Loading products...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if ((productsError || filtersError) && !productsData && !filtersData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col gap-4">
              <span>
                {productsError?.message || filtersError?.message || 'Failed to load data'}
              </span>
              <Button onClick={handleRetry} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
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
                  className="cursor-pointer hover:text-destructive transition-colors"
                  onClick={() => clearFilter(type)}
                />
              </Badge>
            ))}
          </div>
          
          {/* Loading indicator for filters */}
          {isFetchingProducts && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">Updating...</span>
            </div>
          )}
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
            {/* Products grid with loading overlay */}
            <div className="relative">
              {isFetchingProducts && (
                <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-background p-4 rounded-lg shadow-lg">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Loading products...</span>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsData?.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {productsData?.products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    No products found matching your criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedFilters({})}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Enhanced pagination */}
            {productsData && productsData.totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={!productsData.hasPreviousPage ? 
                        'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: productsData.totalPages }).map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
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
                      className={!productsData.hasNextPage ? 
                        'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
            
            {/* Results summary */}
            {productsData && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Showing {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, productsData.total)} of {productsData.total} products
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
