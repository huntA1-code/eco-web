import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  filters: {
    categories: string[];
    types: string[];
    colors: string[];
    sizes: string[];
    priceRange: number[];
    styles: string[];
    occasions: string[];
  };
  selectedFilters: Record<string, any>;
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilter: (filterType: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

export const ProductFilters = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilter,
  showMobileFilters,
  setShowMobileFilters,
}: ProductFiltersProps) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div
        className={`
          fixed inset-0 lg:static lg:block
          ${showMobileFilters ? 'block' : 'hidden'}
          lg:w-64 bg-background lg:bg-transparent
          z-50 lg:z-0 overflow-auto
        `}
      >
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

          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {filters.categories.map(cat => (
                  <div key={cat} className="flex items-center gap-2">
                    <Checkbox
                      id={cat}
                      checked={selectedFilters.category === cat}
                      onCheckedChange={() => onFilterChange('category', cat)}
                    />
                    <label htmlFor={cat} className="text-sm cursor-pointer">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {filters.colors.map(color => (
                  <div
                    key={color}
                    onClick={() => onFilterChange('color', color)}
                    className={`
                      w-8 h-8 rounded-full cursor-pointer
                      border-2 transition-all duration-200
                      ${selectedFilters.color === color ? 'ring-2 ring-primary ring-offset-2' : ''}
                    `}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={1}
                onValueChange={(value) => onFilterChange('priceRange', value)}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${selectedFilters.priceRange?.[0] || 0}</span>
                <span>${selectedFilters.priceRange?.[1] || 200}</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {filters.sizes.map(size => (
                  <div
                    key={size}
                    onClick={() => onFilterChange('size', size)}
                    className={`
                      px-3 py-1 border rounded-md cursor-pointer
                      transition-all duration-200
                      ${selectedFilters.size === size
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                      }
                    `}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};