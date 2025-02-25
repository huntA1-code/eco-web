
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface FilterOption {
  id: string;
  name: string;
}

interface GenericFilterProps {
  queryKey: string;
  fetchFn: () => Promise<FilterOption[]>;
  selectedOptions?: string[];
  onFilterChange: (options: string[]) => void;
}

export const GenericFilter = ({
  queryKey,
  fetchFn,
  selectedOptions = [],
  onFilterChange,
}: GenericFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_ITEMS = 5;

  const { data: options, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
  });

  const visibleOptions = showAll 
    ? options 
    : options?.slice(0, INITIAL_VISIBLE_ITEMS);

  const handleOptionChange = (optionId: string) => {
    const newOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter(o => o !== optionId)
      : [...selectedOptions, optionId];
    onFilterChange(newOptions);
  };

  if (isLoading) {
    return <div className="p-4">Loading options...</div>;
  }

  return (
    <div className="space-y-2">
      {visibleOptions?.map((option: FilterOption) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={`${queryKey}-${option.id}`}
            checked={selectedOptions.includes(option.id)}
            onCheckedChange={() => handleOptionChange(option.id)}
          />
          <label
            htmlFor={`${queryKey}-${option.id}`}
            className="text-sm cursor-pointer"
          >
            {option.name}
          </label>
        </div>
      ))}
      {options && options.length > INITIAL_VISIBLE_ITEMS && (
        <Button
          variant="ghost"
          className="w-full mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `Show More (${options.length - INITIAL_VISIBLE_ITEMS})`}
        </Button>
      )}
    </div>
  );
};
