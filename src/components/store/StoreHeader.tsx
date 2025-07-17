import { Badge } from "@/components/ui/badge";
import { X, RefreshCw } from "lucide-react";

interface StoreHeaderProps {
  storeName: string | null;
  selectedFilters: Record<string, any>;
  isFetchingProducts: boolean;
  onClearFilter: (filterType: string) => void;
}

export const StoreHeader = ({ 
  storeName, 
  selectedFilters, 
  isFetchingProducts, 
  onClearFilter 
}: StoreHeaderProps) => {
  const formatStoreName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <h1 className="text-3xl font-serif font-semibold">
        {storeName ? formatStoreName(storeName) : "Store"}
      </h1>
      
      <div className="flex flex-wrap gap-2">
        {Object.entries(selectedFilters).map(([type, value]) => (
          <Badge
            key={type}
            variant="secondary"
            className="px-3 py-1 flex items-center gap-2"
          >
            {type}: {Array.isArray(value) ? value.join(', ') : value}
            <X
              size={14}
              className="cursor-pointer hover:text-destructive transition-colors"
              onClick={() => onClearFilter(type)}
            />
          </Badge>
        ))}
      </div>
      
      {/* Loading indicator for filters */}
      {isFetchingProducts && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">Updating...</span>
        </div>
      )}
    </div>
  );
};