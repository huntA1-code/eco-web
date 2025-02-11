
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

interface ProductHeaderProps {
  name: string;
  sku?: string;
  isLiked: boolean;
  onLikeClick: () => void;
}

export function ProductHeader({ name, sku, isLiked, onLikeClick }: ProductHeaderProps) {
  return (
    <DialogHeader className="flex flex-row items-start justify-between">
      <div>
        <DialogTitle className="text-2xl font-serif">{name}</DialogTitle>
        {sku && (
          <p className="text-sm text-muted-foreground">SKU: {sku}</p>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onLikeClick}
        className={cn(
          "h-14 w-14 rounded-full border-2 transition-all",
          isLiked ? "border-primary" : "border-gray-200"
        )}
      >
        <Heart 
          className={cn(
            "h-6 w-6 transition-colors",
            isLiked ? "fill-primary text-primary" : "text-gray-500"
          )} 
        />
      </Button>
    </DialogHeader>
  );
}
