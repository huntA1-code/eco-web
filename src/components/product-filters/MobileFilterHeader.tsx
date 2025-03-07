
import { X } from "lucide-react";

interface MobileFilterHeaderProps {
  onClose: () => void;
}

export const MobileFilterHeader = ({ onClose }: MobileFilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b">
      <h2 className="text-xl font-semibold">Filters</h2>
      <button
        onClick={onClose}
        className="rounded-full p-2 hover:bg-muted transition-colors"
        aria-label="Close filters"
      >
        <X size={20} />
      </button>
    </div>
  );
};
