import { useQuery } from '@tanstack/react-query';
import { fetchProductDetails, fetchProductReviews, fetchRecommendedProducts } from '@/api/products';

export interface ProductColor {
  name: string;
  hex: string;
  isHot?: boolean;
  price: number;
  originalPrice: number;
  sizes: ProductSize[];
  images: string[];
}

export interface ProductSize {
  label: string;
  dimensions: string;
  quantity: number;
}

export interface ProductSpecifications {
  material: string;
  outsoleMaterial: string;
  upperMaterial: string;
  activityType: string;
  color: string;
  heelHeight: string;
  width: string;
}

export interface ProductStore {
  name: string;
  rating: number;
  itemCount: number;
  followerCount: number;
  logo: string;
}

export interface ProductDetails {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  sku: string;
  isTrending: boolean;
  isBestSeller: boolean;
  colors: ProductColor[];
  specifications: ProductSpecifications;
  store: ProductStore;
  discount?: {
    rate: number;
    type: 'percentage' | 'fixed';
  };
}

export interface ProductReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  overallFit: string;
  size: string;
  color: string;
}

export const useProductDetails = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ['product-details', productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const reviewsQuery = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => fetchProductReviews(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  const recommendedQuery = useQuery({
    queryKey: ['recommended-products', productId],
    queryFn: () => fetchRecommendedProducts(productId),
    enabled: !!productId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });

  return {
    // Product data
    product: productQuery.data as ProductDetails | undefined,
    productLoading: productQuery.isLoading,
    productError: productQuery.error,
    productRefetch: productQuery.refetch,
    
    // Reviews data
    reviews: reviewsQuery.data as ProductReview[] | undefined,
    reviewsLoading: reviewsQuery.isLoading,
    reviewsError: reviewsQuery.error,
    
    // Recommended products data
    recommendedProducts: recommendedQuery.data,
    recommendedLoading: recommendedQuery.isLoading,
    recommendedError: recommendedQuery.error,
    
    // Overall loading states
    isLoading: productQuery.isLoading || reviewsQuery.isLoading || recommendedQuery.isLoading,
    isError: productQuery.isError || reviewsQuery.isError || recommendedQuery.isError,
    error: productQuery.error || reviewsQuery.error || recommendedQuery.error,
    
    // Refetch functions
    refetchAll: () => {
      productQuery.refetch();
      reviewsQuery.refetch();
      recommendedQuery.refetch();
    }
  };
};