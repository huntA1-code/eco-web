import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, fetchFilters, handleApiError } from "@/api/products";
import { mockFilters, getMockProductsPage } from "@/data/mockProductData";
import { ProductResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

// Store-specific API functions (these would call different endpoints)
const fetchStoreProducts = async (
  storeName: string,
  page: number,
  limit: number,
  selectedFilters: Record<string, any>
): Promise<ProductResponse> => {
  // This would be a store-specific API call
  // For now, using the same mock data but filtered by store
  console.log(`Fetching products for store: ${storeName}`);
  return getMockProductsPage(page, limit);
};

const fetchStoreFilters = async (
  storeName: string,
  selectedFilters: Record<string, any>
): Promise<FiltersResponse> => {
  // This would be a store-specific filters API call
  console.log(`Fetching filters for store: ${storeName}`);
  return mockFilters;
};

export const useStoreData = () => {
  const [searchParams] = useSearchParams();
  const storeName = searchParams.get("store") || "athletic-pro-store";
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Store page shows more products per page
  const { toast } = useToast();

  // Fetch store-specific filters
  const { 
    data: filtersData = mockFilters, 
    isLoading: isLoadingFilters,
    error: filtersError,
    refetch: refetchFilters
  } = useQuery<FiltersResponse, ApiError>({
    queryKey: ['store-filters', storeName],
    queryFn: async () => {
      try {
        return await fetchStoreFilters(storeName, selectedFilters);
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Store Filters API Error:', apiError);
        
        if (apiError.code !== 'TIMEOUT') {
          toast({
            title: "Failed to load store filters",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        return mockFilters;
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

  // Fetch store-specific products
  const { 
    data: productsData, 
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts
  } = useQuery<ProductResponse, ApiError>({
    queryKey: ['store-products', storeName, selectedFilters, currentPage],
    queryFn: async () => {
      try {
        return await fetchStoreProducts(storeName, currentPage, productsPerPage, selectedFilters);
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Store Products API Error:', apiError);
        
        if (apiError.code !== 'NETWORK_ERROR' && apiError.code !== 'TIMEOUT') {
          toast({
            title: "Failed to load store products",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
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
    storeName,
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