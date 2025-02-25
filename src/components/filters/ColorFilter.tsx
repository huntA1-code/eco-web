
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

interface ColorFilterProps {
  colors: ColorOption[];
  selectedColors?: string[];
  onFilterChange: (colors: string[]) => void;
}

export const ColorFilter = ({
  colors,
  selectedColors = [],
  onFilterChange,
}: ColorFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;
  const visibleColors = showAll ? colors : colors.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleColorChange = (colorId: string) => {
    const newColors = selectedColors.includes(colorId)
      ? selectedColors.filter(c => c !== colorId)
      : [...selectedColors, colorId];
    onFilterChange(newColors);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">
        {visibleColors.map((color) => (
          <div key={color.id} className="flex flex-col items-center space-y-1">
            <button
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColors.includes(color.id)
                  ? 'border-primary'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorChange(color.id)}
            />
            <span className="text-xs">{color.name}</span>
          </div>
        ))}
      </div>
      {colors.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${colors.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
