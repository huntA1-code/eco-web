
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchProductsWithFilters, handleApiError } from "@/api/products";
import { mockFilters, getMockProductsPage } from "@/data/mockProductData";
import { ProductsWithFiltersResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

export const useProductsData = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { toast } = useToast();

  // Fetch products and filters in one call
  const { 
    data: productsWithFiltersData, 
    isLoading: isLoadingData,
    error: dataError,
    refetch: refetchData,
    isFetching: isFetchingData
  } = useQuery<ProductsWithFiltersResponse, ApiError>({
    queryKey: ['products-with-filters', selectedFilters, currentPage, category],
    queryFn: async () => {
      try {
        console.log('Fetching products with filters in one call:', { selectedFilters, currentPage, category });
        return await fetchProductsWithFilters(currentPage, productsPerPage, category, selectedFilters);
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Products with Filters API Error:', apiError);
        
        if (apiError.code !== 'NETWORK_ERROR' && apiError.code !== 'TIMEOUT') {
          toast({
            title: "فشل في تحميل البيانات",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        // Fallback to mock data
        const mockProductsData = getMockProductsPage(currentPage, productsPerPage);
        return {
          ...mockProductsData,
          filters: mockFilters
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

  // Extract products and filters from combined data
  const productsData = productsWithFiltersData ? {
    products: productsWithFiltersData.products,
    total: productsWithFiltersData.total,
    currentPage: productsWithFiltersData.currentPage,
    totalPages: productsWithFiltersData.totalPages,
    hasNextPage: productsWithFiltersData.hasNextPage,
    hasPreviousPage: productsWithFiltersData.hasPreviousPage,
  } : undefined;

  const filtersData = productsWithFiltersData?.filters || mockFilters;
  const isLoadingProducts = isLoadingData;
  const isLoadingFilters = isLoadingData;
  const isFetchingProducts = isFetchingData;
  const productsError = dataError;
  const filtersError = dataError;

  const handleFilterChange = (filterType: string, value: any) => {
    console.log('Filter changed:', { filterType, value });
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
    
    toast({
      title: "تم تطبيق الفلتر",
      description: `تم تحديث فلتر ${filterType}`,
    });
  };

  const clearFilter = (filterType: string) => {
    console.log('Clearing filter:', filterType);
    
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
    
    toast({
      title: "تم إزالة الفلتر",
      description: `تم حذف فلتر ${filterType}`,
    });
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters');
    setSelectedFilters({});
    setCurrentPage(1);
    
    toast({
      title: "تم إزالة جميع الفلاتر",
      description: "تم حذف جميع الفلاتر المطبقة",
    });
  };

  const handleRetry = () => {
    console.log('Retrying data fetch');
    refetchData();
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
