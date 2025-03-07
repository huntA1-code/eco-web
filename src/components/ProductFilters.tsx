
import { FilterState, CategoryNode } from "@/types/filters";
import { ProductFilters as ProductFiltersNew } from "./product-filters/ProductFilters";

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

export const ProductFilters = (props: ProductFiltersProps) => {
  return <ProductFiltersNew {...props} />;
};
