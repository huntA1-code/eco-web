
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BrandFilterProps {
  brands: string[];
  selectedBrands?: string[];
  onFilterChange: (brands: string[]) => void;
}

export const BrandFilter = ({
  brands,
  selectedBrands = [],
  onFilterChange,
}: BrandFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;
  const visibleBrands = showAll ? brands : brands.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    onFilterChange(newBrands);
  };

  return (
    <div className="space-y-2">
      {visibleBrands.map((brand) => (
        <div key={brand} className="flex items-center space-x-2">
          <Checkbox
            id={`brand-${brand}`}
            checked={selectedBrands.includes(brand)}
            onCheckedChange={() => handleBrandChange(brand)}
          />
          <label
            htmlFor={`brand-${brand}`}
            className="text-sm cursor-pointer"
          >
            {brand}
          </label>
        </div>
      ))}
      {brands.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${brands.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
