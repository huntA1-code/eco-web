
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

export interface FilterOption {
  id: string;
  name: string;
  hex?: string;
}

export interface FiltersData {
  categories: FilterOption[];
  types: string[];
  colors: { id: string; name: string; hex: string; }[];
  sizes: string[];
  priceRange: [number, number];
  styles: string[];
  occasions: string[];
  brands: string[];
}

export interface ProductsWithFiltersResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: FiltersData;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
