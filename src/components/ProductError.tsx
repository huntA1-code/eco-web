import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductErrorProps {
  error: Error | unknown;
  onRetry: () => void;
}

export const ProductError = ({ error, onRetry }: ProductErrorProps) => {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  return (
    <div className="container max-w-[1100px] mx-auto px-4 py-8">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="mt-2">
          <div className="space-y-4">
            <p className="font-medium">Failed to load product details</p>
            <p className="text-sm opacity-90">{errorMessage}</p>
            <Button 
              onClick={onRetry} 
              variant="outline" 
              size="sm"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};