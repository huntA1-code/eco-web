
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductHeaderProps {
  name: string;
  sku?: string;
}

export function ProductHeader({ name, sku }: ProductHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-serif">{name}</DialogTitle>
      {sku && (
        <p className="text-sm text-muted-foreground">SKU: {sku}</p>
      )}
    </DialogHeader>
  );
}
