
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ApiError } from "@/types/products";

interface ProductsErrorProps {
  productsError?: ApiError | null;
  filtersError?: ApiError | null;
  onRetry: () => void;
}

export const ProductsError = ({ productsError, filtersError, onRetry }: ProductsErrorProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex flex-col gap-4">
            <span>
              {productsError?.message || filtersError?.message || 'Failed to load data'}
            </span>
            <Button onClick={onRetry} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
