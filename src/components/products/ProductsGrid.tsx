
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Product } from "@/types/products";

interface ProductsGridProps {
  products: Product[];
  isFetchingProducts: boolean;
  onClearAllFilters: () => void;
}

export const ProductsGrid = ({ products, isFetchingProducts, onClearAllFilters }: ProductsGridProps) => {
  return (
    <div className="relative">
      {isFetchingProducts && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-background p-4 rounded-lg shadow-lg">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading products...</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No products found matching your criteria
          </p>
          <Button 
            variant="outline" 
            onClick={onClearAllFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};
