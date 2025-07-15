
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, fetchDynamicFilters, handleApiError } from "@/api/products";
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

  // Fetch products first
  const { 
    data: productsData, 
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts
  } = useQuery<ProductResponse, ApiError>({
    queryKey: ['products', selectedFilters, currentPage, category],
    queryFn: async () => {
      try {
        console.log('Fetching products with filters:', { selectedFilters, currentPage, category });
        return await fetchProducts(currentPage, productsPerPage, category, selectedFilters);
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Products API Error:', apiError);
        
        if (apiError.code !== 'NETWORK_ERROR' && apiError.code !== 'TIMEOUT') {
          toast({
            title: "فشل في تحميل المنتجات",
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

  // Fetch dynamic filters based on current products and applied filters
  const { 
    data: filtersData = mockFilters, 
    isLoading: isLoadingFilters,
    error: filtersError,
    refetch: refetchFilters
  } = useQuery<FiltersResponse, ApiError>({
    queryKey: ['dynamic-filters', selectedFilters, category, productsData?.products?.length],
    queryFn: async () => {
      try {
        console.log('Fetching dynamic filters based on current context:', {
          selectedFilters,
          category,
          productsCount: productsData?.products?.length
        });
        
        // Pass current filters and category to get contextual filters
        return await fetchDynamicFilters(selectedFilters, category, productsData?.products);
      } catch (error) {
        const apiError = handleApiError(error);
        console.error('Dynamic Filters API Error:', apiError);
        
        if (apiError.code !== 'TIMEOUT') {
          toast({
            title: "فشل في تحميل الفلاتر",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        return mockFilters;
      }
    },
    // Only fetch filters after we have products data
    enabled: !!productsData,
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
