
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SizeFilterProps {
  sizes: string[];
  selectedSizes?: string[];
  onFilterChange: (sizes: string[]) => void;
}

export const SizeFilter = ({
  sizes,
  selectedSizes = [],
  onFilterChange,
}: SizeFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;
  const visibleSizes = showAll ? sizes : sizes.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleSizeChange = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    onFilterChange(newSizes);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {visibleSizes.map((size) => (
          <Button
            key={size}
            variant={selectedSizes.includes(size) ? "default" : "outline"}
            className="w-full"
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
      {sizes.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${sizes.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
