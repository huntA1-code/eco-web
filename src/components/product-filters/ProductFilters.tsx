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
import { DropdownFilter } from "@/components/filters/DropdownFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { SleeveFilter } from "@/components/filters/SleeveFilter";
import { fetchNeckOptions, fetchHeightOptions } from "@/data/mockFilters";
import { fetchAllDropdownFilters, DropdownFilterData } from "@/data/mockDropdownFilters";
import { useQuery } from "@tanstack/react-query";

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
  
  // Fetch dynamic dropdown filters
  const { data: dropdownFilters = [], isLoading: isLoadingDropdowns } = useQuery({
    queryKey: ['dropdown-filters'],
    queryFn: fetchAllDropdownFilters,
  });
  
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
    "height",
    ...dropdownFilters.map(filter => filter.id)
  ];

  // Handle delayed filter changes
  useEffect(() => {
    if (pendingFilters) {
      const timer = setTimeout(() => {
        onFilterChange(pendingFilters.type, pendingFilters.value);
        setPendingFilters(null);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [pendingFilters, onFilterChange]);

  const handleDelayedFilterChange = useCallback((type: string, value: any) => {
    setPendingFilters({ type, value });
  }, []);

  // Get the colors filter from dropdown filters
  const colorsFilter = dropdownFilters.find(filter => filter.id === 'colors');

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

            {/* Dynamic Colors Filter */}
            <FilterSection title="Colors" value="colors">
              <DropdownFilter
                title=""
                options={colorsFilter?.options || []}
                selectedOptions={selectedFilters.colors || []}
                onFilterChange={(value) => handleDelayedFilterChange('colors', value)}
                placeholder="Select colors"
                isLoading={isLoadingDropdowns}
                showCounts={true}
                showColors={true}
              />
            </FilterSection>

            <FilterSection title="Sizes" value="sizes">
              <SizeFilter
                sizes={filters.sizes}
                selectedSizes={selectedFilters.sizes}
                onFilterChange={(value) => handleDelayedFilterChange('sizes', value)}
              />
            </FilterSection>

            {/* Dynamic Dropdown Filters (excluding colors since it's handled above) */}
            {dropdownFilters.filter(filter => filter.id !== 'colors').map((dropdownFilter) => (
              <FilterSection 
                key={dropdownFilter.id} 
                title={dropdownFilter.title} 
                value={dropdownFilter.id}
              >
                <DropdownFilter
                  title=""
                  options={dropdownFilter.options}
                  selectedOptions={selectedFilters[dropdownFilter.id] || []}
                  onFilterChange={(value) => handleDelayedFilterChange(dropdownFilter.id, value)}
                  placeholder={`Select ${dropdownFilter.title.toLowerCase()}`}
                  isLoading={isLoadingDropdowns}
                  showCounts={true}
                />
              </FilterSection>
            ))}

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
