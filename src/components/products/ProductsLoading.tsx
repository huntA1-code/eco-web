
import { RefreshCw } from "lucide-react";

export const ProductsLoading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="text-lg">Loading products...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
