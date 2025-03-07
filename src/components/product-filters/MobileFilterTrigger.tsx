
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterTriggerProps {
  onClick: () => void;
}

export const MobileFilterTrigger = ({ onClick }: MobileFilterTriggerProps) => {
  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <Button
        onClick={onClick}
        className="btn-primary flex items-center gap-2"
      >
        <Filter size={20} />
        Filters
      </Button>
    </div>
  );
};
