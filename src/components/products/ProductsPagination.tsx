
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductResponse } from "@/types/products";

interface ProductsPaginationProps {
  productsData: ProductResponse;
  currentPage: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
}

export const ProductsPagination = ({ 
  productsData, 
  currentPage, 
  productsPerPage, 
  onPageChange 
}: ProductsPaginationProps) => {
  if (!productsData || productsData.totalPages <= 1) {
    return null;
  }

  return (
    <>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={!productsData.hasPreviousPage ? 
                'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
          
          {Array.from({ length: productsData.totalPages }).map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => onPageChange(i + 1)}
                isActive={currentPage === i + 1}
                className="cursor-pointer"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(
                Math.min(productsData.totalPages, currentPage + 1)
              )}
              className={!productsData.hasNextPage ? 
                'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Results summary */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Showing {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, productsData.total)} of {productsData.total} products
      </div>
    </>
  );
};
