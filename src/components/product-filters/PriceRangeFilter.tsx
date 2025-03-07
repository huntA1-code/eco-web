
import { Slider } from "@/components/ui/slider";

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
  return (
    <div>
      <Slider
        defaultValue={selectedPriceRange || priceRange}
        min={priceRange[0]}
        max={priceRange[1]}
        step={1}
        onValueChange={onFilterChange}
        showTooltip={true}
        tooltipContent={(value) => `$${value}`}
      />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>${selectedPriceRange?.[0] || priceRange[0]}</span>
        <span>${selectedPriceRange?.[1] || priceRange[1]}</span>
      </div>
    </div>
  );
};
