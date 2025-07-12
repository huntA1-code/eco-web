
import { useState } from "react";
import { ProductFilters } from "@/components/ProductFilters";
import { CategoryNode } from "@/types/filters";
import { ProductsLoading } from "@/components/products/ProductsLoading";
import { ProductsError } from "@/components/products/ProductsError";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductsPagination } from "@/components/products/ProductsPagination";
import { useProductsData } from "@/hooks/useProductsData";

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

const Products = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
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
  } = useProductsData();

  // Loading state
  if (isLoadingProducts && isLoadingFilters) {
    return <ProductsLoading />;
  }

  // Error state
  if ((productsError || filtersError) && !productsData && !filtersData) {
    return (
      <ProductsError 
        productsError={productsError}
        filtersError={filtersError}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <ProductsHeader
          category={category}
          selectedFilters={selectedFilters}
          isFetchingProducts={isFetchingProducts}
          onClearFilter={clearFilter}
        />

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

export default Products;
