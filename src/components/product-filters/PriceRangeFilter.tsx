
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  selectedPriceRange?: number[];
  onFilterChange: (value: number[]) => void;
}

export const PriceRangeFilter = ({
  priceRange,
  selectedPriceRange,
  onFilterChange,
}: PriceRangeFilterProps) => {
  const [localValue, setLocalValue] = useState<number[]>(
    selectedPriceRange || priceRange
  );
  
  // Sync with external changes
  useEffect(() => {
    if (selectedPriceRange) {
      setLocalValue(selectedPriceRange);
    }
  }, [selectedPriceRange]);
  
  const handleValueChange = (value: number[]) => {
    setLocalValue(value);
  };
  
  const handleValueCommit = () => {
    if (JSON.stringify(localValue) !== JSON.stringify(selectedPriceRange)) {
      onFilterChange(localValue);
    }
  };

  return (
    <div>
      <Slider
        defaultValue={selectedPriceRange || priceRange}
        value={localValue}
        min={priceRange[0]}
        max={priceRange[1]}
        step={1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        showTooltip={true}
        tooltipContent={(value) => `$${value}`}
        className="cursor-pointer"
      />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>${localValue[0]}</span>
        <span>${localValue[1]}</span>
      </div>
    </div>
  );
};
