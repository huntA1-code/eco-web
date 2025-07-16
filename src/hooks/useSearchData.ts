import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/api/products";
import { ProductResponse } from "@/types/products";
import { FiltersResponse } from "@/pages/SearchResults";

export const useSearchData = (
  searchQuery: string,
  searchType: string,
  searchImage: string | null
) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Reset page when search parameters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchType, searchImage]);

  // Search products query
  const {
    data: searchData,
    isLoading: isLoadingProducts,
    isFetching: isFetchingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery<{ products: ProductResponse; filters: FiltersResponse }>({
    queryKey: ['searchProducts', searchQuery, searchType, searchImage, currentPage, productsPerPage, selectedFilters],
    queryFn: () => searchProducts(
      searchQuery,
      searchType,
      searchImage,
      currentPage,
      productsPerPage,
      selectedFilters
    ),
    enabled: !!(searchQuery || searchImage),
  });

  const productsData = searchData?.products;
  const filtersData = searchData?.filters;

  const handleFilterChange = useCallback((filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const clearFilter = useCallback((filterType: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterType];
      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedFilters({});
    setCurrentPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    refetchProducts();
  }, [refetchProducts]);

  return {
    selectedFilters,
    currentPage,
    productsPerPage,
    filtersData,
    productsData,
    isLoadingFilters: isLoadingProducts, // Same loading state for both
    isLoadingProducts,
    isFetchingProducts,
    filtersError: productsError, // Same error for both
    productsError,
    handleFilterChange,
    clearFilter,
    clearAllFilters,
    setCurrentPage,
    handleRetry,
  };
};