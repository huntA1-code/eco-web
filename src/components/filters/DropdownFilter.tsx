
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DropdownFilterOption {
  id: string;
  name: string;
  count?: number;
  hex?: string; // For color options
}

interface DropdownFilterProps {
  title: string;
  options: DropdownFilterOption[];
  selectedOptions?: string[];
  onFilterChange: (selectedIds: string[]) => void;
  placeholder?: string;
  showCounts?: boolean;
  maxDisplayItems?: number;
  isLoading?: boolean;
  showColors?: boolean; // New prop to enable color display
}

export const DropdownFilter = ({
  title,
  options,
  selectedOptions = [],
  onFilterChange,
  placeholder = "Select options",
  showCounts = true,
  maxDisplayItems = 3,
  isLoading = false,
  showColors = false,
}: DropdownFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleOptionChange = (optionId: string, checked: boolean) => {
    const newSelected = checked
      ? [...selectedOptions, optionId]
      : selectedOptions.filter(id => id !== optionId);
    
    onFilterChange(newSelected);
  };

  const getSelectedNames = () => {
    return options
      .filter(option => selectedOptions.includes(option.id))
      .map(option => option.name);
  };

  const renderTriggerContent = () => {
    const selectedNames = getSelectedNames();
    const selectedOptionsData = options.filter(option => selectedOptions.includes(option.id));
    
    if (selectedNames.length === 0) {
      return (
        <span className="text-muted-foreground">{placeholder}</span>
      );
    }

    if (showColors && selectedOptionsData.length <= maxDisplayItems) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptionsData.map((option) => (
            <div key={option.id} className="flex items-center gap-1">
              {option.hex && (
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: option.hex }}
                />
              )}
              <Badge variant="secondary" className="text-xs">
                {option.name}
              </Badge>
            </div>
          ))}
        </div>
      );
    }

    if (selectedNames.length <= maxDisplayItems) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedNames.map((name, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {name}
            </Badge>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {selectedNames[0]}
        </Badge>
        <span className="text-xs text-muted-foreground">
          +{selectedNames.length - 1} more
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="h-4 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-foreground">
        {title}
        {selectedOptions.length > 0 && (
          <Badge variant="outline" className="ml-2 text-xs">
            {selectedOptions.length}
          </Badge>
        )}
      </label>
      
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto min-h-[40px] p-3 hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1 text-left overflow-hidden">
              {renderTriggerContent()}
            </div>
            <ChevronDown 
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-56 max-h-60 overflow-y-auto bg-background/95 backdrop-blur-sm border shadow-lg"
          align="start"
        >
          {options.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={(checked) => handleOptionChange(option.id, checked)}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {showColors && option.hex && (
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: option.hex }}
                      />
                    )}
                    <span className="truncate">{option.name}</span>
                  </div>
                  {showCounts && option.count !== undefined && (
                    <Badge variant="secondary" className="text-xs ml-2">
                      {option.count}
                    </Badge>
                  )}
                </div>
              </DropdownMenuCheckboxItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
