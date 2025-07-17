import { useState } from "react";
import { Header } from '../components/header/Header';
import { ProductFilters } from '../components/ProductFilters';
import { StoreReviews } from '../components/StoreReviews';
import { ProductsLoading } from '@/components/products/ProductsLoading';
import { ProductsError } from '@/components/products/ProductsError';
import { StoreHeader } from '@/components/store/StoreHeader';
import { ProductsGrid } from '@/components/products/ProductsGrid';
import { ProductsPagination } from '@/components/products/ProductsPagination';
import { useStoreData } from '@/hooks/useStoreData';

const Store = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
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
  } = useStoreData();

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
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <StoreHeader
          storeName={storeName}
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
        
        {/* Store Reviews Section */}
        <StoreReviews 
          storeId={storeName || "store-1"} 
          storeName={storeName ? storeName.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') : "Athletic Pro Store"} 
        />
      </main>
    </div>
  );
};

export default Store;
