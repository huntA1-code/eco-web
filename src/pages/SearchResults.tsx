import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ProductFilters } from "@/components/ProductFilters";
import { CategoryNode } from "@/types/filters";
import { ProductsLoading } from "@/components/products/ProductsLoading";
import { ProductsError } from "@/components/products/ProductsError";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductsPagination } from "@/components/products/ProductsPagination";
import { useSearchData } from "@/hooks/useSearchData";
import { Search, Image as ImageIcon } from "lucide-react";

// Types for API responses
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

const SearchResults = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Get search parameters
  const searchQuery = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'text';
  const searchImage = location.state?.searchImage || null;
  
  const {
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
  } = useSearchData(searchQuery, searchType, searchImage);

  // Loading state
  if (isLoadingProducts && isLoadingFilters) {
    return <ProductsLoading />;
  }

  // Error state
  if ((productsError || filtersError) && !productsData && !filtersData) {
    return (
      <ProductsError 
        productsError={productsError ? { message: productsError.message, code: 'SEARCH_ERROR' } : null}
        filtersError={filtersError ? { message: filtersError.message, code: 'SEARCH_ERROR' } : null}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {searchType === 'image' ? (
              <ImageIcon className="w-6 h-6 text-primary" />
            ) : (
              <Search className="w-6 h-6 text-primary" />
            )}
            <h1 className="text-2xl font-bold">
              {searchType === 'image' ? 'Image Search Results' : 'Search Results'}
            </h1>
          </div>
          
          {searchQuery && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground">Searching for:</p>
              <p className="font-medium text-lg">"{searchQuery}"</p>
            </div>
          )}
          
          {searchImage && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Search image:</p>
              <img 
                src={searchImage} 
                alt="Search query" 
                className="max-h-32 max-w-48 object-contain rounded-md border"
              />
            </div>
          )}
          
          {productsData && (
            <p className="text-muted-foreground">
              Found {productsData.total} products
            </p>
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
            <ProductsGrid
              products={productsData?.products || []}
              isFetchingProducts={isFetchingProducts}
              onClearAllFilters={clearAllFilters}
            />

            {productsData && (
              <ProductsPagination
                productsData={productsData}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;