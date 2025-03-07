
import { FilterState, CategoryNode } from "@/types/filters";
import { useEffect, useState, useCallback } from "react";
import { MobileFilterTrigger } from "./MobileFilterTrigger";
import { MobileFilterHeader } from "./MobileFilterHeader";
import { FilterAccordion, FilterSection } from "./FilterAccordion";
import { CategoriesFilter } from "./CategoriesFilter";
import { BrandFilter } from "@/components/filters/BrandFilter";
import { ColorFilter } from "@/components/filters/ColorFilter";
import { SizeFilter } from "@/components/filters/SizeFilter";
import { GenericFilter } from "@/components/filters/GenericFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { SleeveFilter } from "@/components/filters/SleeveFilter";
import { fetchNeckOptions, fetchHeightOptions } from "@/data/mockFilters";

interface ProductFiltersProps {
  selectedFilters: FilterState;
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilter: (filterType: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  filters: {
    categories: CategoryNode[];
    types: string[];
    colors: Array<{ id: string; name: string; hex: string; }>;
    sizes: string[];
    priceRange: [number, number];
    styles: string[];
    occasions: string[];
    brands: string[];
  };
}

export const ProductFilters = ({
  selectedFilters,
  onFilterChange,
  onClearFilter,
  showMobileFilters,
  setShowMobileFilters,
  filters,
}: ProductFiltersProps) => {
  const [pendingFilters, setPendingFilters] = useState<{type: string, value: any} | null>(null);
  
  const allAccordionValues = [
    "categories",
    "brands",
    "colors",
    "sizes",
    "types",
    "styles",
    "occasions",
    "price",
    "sleeves",
    "neckline",
    "height"
  ];

  // Handle delayed filter changes
  useEffect(() => {
    if (pendingFilters) {
      const timer = setTimeout(() => {
        onFilterChange(pendingFilters.type, pendingFilters.value);
        setPendingFilters(null);
      }, 300); // 300ms delay for a professional feel
      
      return () => clearTimeout(timer);
    }
  }, [pendingFilters, onFilterChange]);

  const handleDelayedFilterChange = useCallback((type: string, value: any) => {
    setPendingFilters({ type, value });
  }, []);

  return (
    <>
      <MobileFilterTrigger onClick={() => setShowMobileFilters(true)} />

      <div 
        className={`fixed inset-0 lg:static lg:block ${
          showMobileFilters ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full lg:opacity-100 lg:translate-x-0'
        } lg:w-64 bg-background lg:bg-transparent z-50 lg:z-0 overflow-auto scrollbar-hide transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 lg:p-0 h-full">
          <MobileFilterHeader onClose={() => setShowMobileFilters(false)} />

          <FilterAccordion defaultValues={allAccordionValues}>
            <FilterSection title="Categories" value="categories">
              <CategoriesFilter
                categories={filters.categories}
                selectedCategory={selectedFilters.category}
                onSelect={(categoryId) => handleDelayedFilterChange('category', categoryId)}
              />
            </FilterSection>

            <FilterSection title="Brands" value="brands">
              <BrandFilter
                brands={filters.brands}
                selectedBrands={selectedFilters.brands}
                onFilterChange={(value) => handleDelayedFilterChange('brands', value)}
              />
            </FilterSection>

            <FilterSection title="Colors" value="colors">
              <ColorFilter
                colors={filters.colors}
                selectedColors={selectedFilters.colors}
                onFilterChange={(value) => handleDelayedFilterChange('colors', value)}
              />
            </FilterSection>

            <FilterSection title="Sizes" value="sizes">
              <SizeFilter
                sizes={filters.sizes}
                selectedSizes={selectedFilters.sizes}
                onFilterChange={(value) => handleDelayedFilterChange('sizes', value)}
              />
            </FilterSection>

            <FilterSection title="Types" value="types">
              <GenericFilter
                queryKey="types"
                fetchFn={async () => filters.types.map(type => ({ id: type, name: type }))}
                selectedOptions={selectedFilters.types}
                onFilterChange={(value) => handleDelayedFilterChange('types', value)}
              />
            </FilterSection>

            <FilterSection title="Styles" value="styles">
              <GenericFilter
                queryKey="styles"
                fetchFn={async () => filters.styles.map(style => ({ id: style, name: style }))}
                selectedOptions={selectedFilters.styles}
                onFilterChange={(value) => handleDelayedFilterChange('styles', value)}
              />
            </FilterSection>

            <FilterSection title="Occasions" value="occasions">
              <GenericFilter
                queryKey="occasions"
                fetchFn={async () => filters.occasions.map(occasion => ({ id: occasion, name: occasion }))}
                selectedOptions={selectedFilters.occasions}
                onFilterChange={(value) => handleDelayedFilterChange('occasions', value)}
              />
            </FilterSection>

            <FilterSection title="Price Range" value="price">
              <PriceRangeFilter
                priceRange={filters.priceRange}
                selectedPriceRange={selectedFilters.priceRange}
                onFilterChange={(value) => handleDelayedFilterChange('priceRange', value)}
              />
            </FilterSection>

            <FilterSection title="Sleeves" value="sleeves">
              <SleeveFilter
                selectedSleeves={selectedFilters.sleeves}
                onFilterChange={(value) => handleDelayedFilterChange('sleeves', value)}
              />
            </FilterSection>

            <FilterSection title="Neckline" value="neckline">
              <GenericFilter
                queryKey="neck-options"
                fetchFn={fetchNeckOptions}
                selectedOptions={selectedFilters.neckline}
                onFilterChange={(value) => handleDelayedFilterChange('neckline', value)}
              />
            </FilterSection>

            <FilterSection title="Height" value="height">
              <GenericFilter
                queryKey="height-options"
                fetchFn={fetchHeightOptions}
                selectedOptions={selectedFilters.height}
                onFilterChange={(value) => handleDelayedFilterChange('height', value)}
              />
            </FilterSection>
          </FilterAccordion>
        </div>
      </div>
    </>
  );
};
