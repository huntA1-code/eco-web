
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { fetchSleeveOptions } from "@/data/mockSleeves";
import { SleeveOption } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

interface SleeveFilterProps {
  selectedSleeves?: string[];
  onFilterChange: (sleeves: string[]) => void;
}

export const SleeveFilter = ({
  selectedSleeves = [],
  onFilterChange,
}: SleeveFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;

  const { data: sleeveOptions, isLoading } = useQuery({
    queryKey: ['sleeve-options'],
    queryFn: fetchSleeveOptions,
  });

  const visibleSleeves = showAll 
    ? sleeveOptions 
    : sleeveOptions?.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleSleeveChange = (sleeveId: string) => {
    const newSleeves = selectedSleeves.includes(sleeveId)
      ? selectedSleeves.filter(s => s !== sleeveId)
      : [...selectedSleeves, sleeveId];
    onFilterChange(newSleeves);
  };

  if (isLoading) {
    return <div className="p-4">Loading sleeve options...</div>;
  }

  return (
    <div className="space-y-2">
      {visibleSleeves?.map((sleeve: SleeveOption) => (
        <div key={sleeve.id} className="flex items-center space-x-2">
          <Checkbox
            id={`sleeve-${sleeve.id}`}
            checked={selectedSleeves.includes(sleeve.id)}
            onCheckedChange={() => handleSleeveChange(sleeve.id)}
          />
          <label
            htmlFor={`sleeve-${sleeve.id}`}
            className="text-sm cursor-pointer"
          >
            {sleeve.name}
          </label>
        </div>
      ))}
      {sleeveOptions && sleeveOptions.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${sleeveOptions.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
