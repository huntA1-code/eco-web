
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: {
    rate: number;
    type: 'percentage' | 'fixed';
  };
}

export interface ProductResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
