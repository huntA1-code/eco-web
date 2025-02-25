import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CategoryTree } from "@/components/CategoryTree";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryNode, FilterState } from "@/types/filters";
import { BrandFilter } from "./filters/BrandFilter";
import { ColorFilter } from "./filters/ColorFilter";
import { SleeveFilter } from "./filters/SleeveFilter";
import { SizeFilter } from "./filters/SizeFilter";
import { GenericFilter } from "./filters/GenericFilter";
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
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className={`fixed inset-0 lg:static lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:w-64 bg-background lg:bg-transparent z-50 lg:z-0 overflow-auto scrollbar-hide`}>
        <div className="p-4 lg:p-0">
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-muted-foreground"
            >
              <Filter size={24} />
            </button>
          </div>

          <Accordion 
            type="multiple" 
            className="space-y-4"
            defaultValue={allAccordionValues}
          >
            <AccordionItem value="categories">
              <AccordionTrigger className="text-base font-medium">
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  {filters.categories.map((node) => (
                    <CategoryTree
                      key={node.id}
                      node={node}
                      selectedCategory={selectedFilters.category}
                      onSelect={(categoryId) => onFilterChange('category', categoryId)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brands">
              <AccordionTrigger className="text-base font-medium">
                Brands
              </AccordionTrigger>
              <AccordionContent>
                <BrandFilter
                  brands={filters.brands}
                  selectedBrands={selectedFilters.brands}
                  onFilterChange={(value) => onFilterChange('brands', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors">
              <AccordionTrigger className="text-base font-medium">
                Colors
              </AccordionTrigger>
              <AccordionContent>
                <ColorFilter
                  colors={filters.colors}
                  selectedColors={selectedFilters.colors}
                  onFilterChange={(value) => onFilterChange('colors', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sizes">
              <AccordionTrigger className="text-base font-medium">
                Sizes
              </AccordionTrigger>
              <AccordionContent>
                <SizeFilter
                  sizes={filters.sizes}
                  selectedSizes={selectedFilters.sizes}
                  onFilterChange={(value) => onFilterChange('sizes', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="types">
              <AccordionTrigger className="text-base font-medium">
                Types
              </AccordionTrigger>
              <AccordionContent>
                <GenericFilter
                  queryKey="types"
                  fetchFn={async () => filters.types.map(type => ({ id: type, name: type }))}
                  selectedOptions={selectedFilters.types}
                  onFilterChange={(value) => onFilterChange('types', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="styles">
              <AccordionTrigger className="text-base font-medium">
                Styles
              </AccordionTrigger>
              <AccordionContent>
                <GenericFilter
                  queryKey="styles"
                  fetchFn={async () => filters.styles.map(style => ({ id: style, name: style }))}
                  selectedOptions={selectedFilters.styles}
                  onFilterChange={(value) => onFilterChange('styles', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="occasions">
              <AccordionTrigger className="text-base font-medium">
                Occasions
              </AccordionTrigger>
              <AccordionContent>
                <GenericFilter
                  queryKey="occasions"
                  fetchFn={async () => filters.occasions.map(occasion => ({ id: occasion, name: occasion }))}
                  selectedOptions={selectedFilters.occasions}
                  onFilterChange={(value) => onFilterChange('occasions', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-medium">
                Price Range
              </AccordionTrigger>
              <AccordionContent>
                <Slider
                  defaultValue={filters.priceRange}
                  min={filters.priceRange[0]}
                  max={filters.priceRange[1]}
                  step={1}
                  onValueChange={(value) => onFilterChange('priceRange', value)}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${selectedFilters.priceRange?.[0] || filters.priceRange[0]}</span>
                  <span>${selectedFilters.priceRange?.[1] || filters.priceRange[1]}</span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sleeves">
              <AccordionTrigger className="text-base font-medium">
                Sleeves
              </AccordionTrigger>
              <AccordionContent>
                <SleeveFilter
                  selectedSleeves={selectedFilters.sleeves}
                  onFilterChange={(value) => onFilterChange('sleeves', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="neckline">
              <AccordionTrigger className="text-base font-medium">
                Neckline
              </AccordionTrigger>
              <AccordionContent>
                <GenericFilter
                  queryKey="neck-options"
                  fetchFn={fetchNeckOptions}
                  selectedOptions={selectedFilters.neckline}
                  onFilterChange={(value) => onFilterChange('neckline', value)}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="height">
              <AccordionTrigger className="text-base font-medium">
                Height
              </AccordionTrigger>
              <AccordionContent>
                <GenericFilter
                  queryKey="height-options"
                  fetchFn={fetchHeightOptions}
                  selectedOptions={selectedFilters.height}
                  onFilterChange={(value) => onFilterChange('height', value)}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};
