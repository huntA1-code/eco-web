
import { Filter } from "lucide-react";

interface MobileFilterHeaderProps {
  onClose: () => void;
}

export const MobileFilterHeader = ({ onClose }: MobileFilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between lg:hidden mb-4">
      <h2 className="text-xl font-semibold">Filters</h2>
      <button
        onClick={onClose}
        className="text-muted-foreground"
      >
        <Filter size={24} />
      </button>
    </div>
  );
};
