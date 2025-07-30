import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="container max-w-[1100px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Image Section Skeleton */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-12 gap-4">
            <div className="hidden md:block col-span-1 -ml-2">
              <div className="flex flex-col gap-2 sticky top-0">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-12 h-12 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="col-span-11">
              <Skeleton className="aspect-[4/5] max-w-[500px] mx-auto rounded-lg" />
            </div>
          </div>
          
          {/* Reviews Section Skeleton */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-32" />
            {[...Array(2)].map((_, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section Skeleton */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            {/* Badges */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            
            {/* Title and SKU */}
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-32" />
            
            {/* Price */}
            <div className="flex items-baseline gap-2 mt-6">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
            
            {/* Colors */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <div className="flex flex-wrap gap-3">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-10 h-10 rounded-full" />
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <div className="grid grid-cols-2 gap-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-12 rounded" />
                ))}
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-3">
              <Skeleton className="flex-1 h-12 rounded" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
          
          {/* Collapsible Sections */}
          <div className="space-y-4 mt-6 border-t pt-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-b pb-4">
                <Skeleton className="h-6 w-48" />
                <div className="pt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recommended Products Section Skeleton */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};