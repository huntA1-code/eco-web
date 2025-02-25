
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SleeveFilterProps {
  sleeves: string[];
  selectedSleeves?: string[];
  onFilterChange: (sleeves: string[]) => void;
}

export const SleeveFilter = ({
  sleeves,
  selectedSleeves = [],
  onFilterChange,
}: SleeveFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;
  const visibleSleeves = showAll ? sleeves : sleeves.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleSleeveChange = (sleeve: string) => {
    const newSleeves = selectedSleeves.includes(sleeve)
      ? selectedSleeves.filter(s => s !== sleeve)
      : [...selectedSleeves, sleeve];
    onFilterChange(newSleeves);
  };

  return (
    <div className="space-y-2">
      {visibleSleeves.map((sleeve) => (
        <div key={sleeve} className="flex items-center space-x-2">
          <Checkbox
            id={`sleeve-${sleeve}`}
            checked={selectedSleeves.includes(sleeve)}
            onCheckedChange={() => handleSleeveChange(sleeve)}
          />
          <label
            htmlFor={`sleeve-${sleeve}`}
            className="text-sm cursor-pointer"
          >
            {sleeve}
          </label>
        </div>
      ))}
      {sleeves.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${sleeves.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
