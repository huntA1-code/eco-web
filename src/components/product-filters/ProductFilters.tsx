
import { FilterState } from "@/types/filters";
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

  return (
    <>
      <MobileFilterTrigger onClick={() => setShowMobileFilters(true)} />

      <div className={`fixed inset-0 lg:static lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:w-64 bg-background lg:bg-transparent z-50 lg:z-0 overflow-auto scrollbar-hide`}>
        <div className="p-4 lg:p-0">
          <MobileFilterHeader onClose={() => setShowMobileFilters(false)} />

          <FilterAccordion defaultValues={allAccordionValues}>
            <FilterSection title="Categories" value="categories">
              <CategoriesFilter
                categories={filters.categories}
                selectedCategory={selectedFilters.category}
                onSelect={(categoryId) => onFilterChange('category', categoryId)}
              />
            </FilterSection>

            <FilterSection title="Brands" value="brands">
              <BrandFilter
                brands={filters.brands}
                selectedBrands={selectedFilters.brands}
                onFilterChange={(value) => onFilterChange('brands', value)}
              />
            </FilterSection>

            <FilterSection title="Colors" value="colors">
              <ColorFilter
                colors={filters.colors}
                selectedColors={selectedFilters.colors}
                onFilterChange={(value) => onFilterChange('colors', value)}
              />
            </FilterSection>

            <FilterSection title="Sizes" value="sizes">
              <SizeFilter
                sizes={filters.sizes}
                selectedSizes={selectedFilters.sizes}
                onFilterChange={(value) => onFilterChange('sizes', value)}
              />
            </FilterSection>

            <FilterSection title="Types" value="types">
              <GenericFilter
                queryKey="types"
                fetchFn={async () => filters.types.map(type => ({ id: type, name: type }))}
                selectedOptions={selectedFilters.types}
                onFilterChange={(value) => onFilterChange('types', value)}
              />
            </FilterSection>

            <FilterSection title="Styles" value="styles">
              <GenericFilter
                queryKey="styles"
                fetchFn={async () => filters.styles.map(style => ({ id: style, name: style }))}
                selectedOptions={selectedFilters.styles}
                onFilterChange={(value) => onFilterChange('styles', value)}
              />
            </FilterSection>

            <FilterSection title="Occasions" value="occasions">
              <GenericFilter
                queryKey="occasions"
                fetchFn={async () => filters.occasions.map(occasion => ({ id: occasion, name: occasion }))}
                selectedOptions={selectedFilters.occasions}
                onFilterChange={(value) => onFilterChange('occasions', value)}
              />
            </FilterSection>

            <FilterSection title="Price Range" value="price">
              <PriceRangeFilter
                priceRange={filters.priceRange}
                selectedPriceRange={selectedFilters.priceRange}
                onFilterChange={(value) => onFilterChange('priceRange', value)}
              />
            </FilterSection>

            <FilterSection title="Sleeves" value="sleeves">
              <SleeveFilter
                selectedSleeves={selectedFilters.sleeves}
                onFilterChange={(value) => onFilterChange('sleeves', value)}
              />
            </FilterSection>

            <FilterSection title="Neckline" value="neckline">
              <GenericFilter
                queryKey="neck-options"
                fetchFn={fetchNeckOptions}
                selectedOptions={selectedFilters.neckline}
                onFilterChange={(value) => onFilterChange('neckline', value)}
              />
            </FilterSection>

            <FilterSection title="Height" value="height">
              <GenericFilter
                queryKey="height-options"
                fetchFn={fetchHeightOptions}
                selectedOptions={selectedFilters.height}
                onFilterChange={(value) => onFilterChange('height', value)}
              />
            </FilterSection>
          </FilterAccordion>
        </div>
      </div>
    </>
  );
};
