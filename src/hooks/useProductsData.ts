
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, fetchFilters, handleApiError } from "@/api/products";
import { mockFilters, getMockProductsPage } from "@/data/mockProductData";
import { ProductResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

export const useProductsData = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { toast } = useToast();

  // Fetch filters once on first load only
  const { 
    data: filtersData = mockFilters, 
    isLoading: isLoadingFilters,
    error: filtersError,
    refetch: refetchFilters
  } = useQuery<FiltersResponse, ApiError>({
    queryKey: ['filters'],
    queryFn: async () => {
      try {
        return await fetchFilters(selectedFilters);
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
        return await fetchProducts(currentPage, productsPerPage, category, selectedFilters);
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
        return getMockProductsPage(currentPage, productsPerPage);
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

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const handleRetry = () => {
    refetchProducts();
    refetchFilters();
  };

  return {
    category,
    selectedFilters,
    currentPage,
    productsPerPage,
    filtersData,
    productsData,
    isLoadingFilters,
    isLoadingProducts,
    isFetchingProducts,
    filtersError,
    productsError,
    handleFilterChange,
    clearFilter,
    clearAllFilters,
    setCurrentPage,
    handleRetry,
  };
};
