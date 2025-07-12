
import axios, { AxiosError } from "axios";
import { ProductResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";

const API_URL = process.env.REACT_APP_API_URL || "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling utility
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    
    if (axiosError.code === 'ECONNABORTED') {
      return { message: 'Request timeout. Please try again.', code: 'TIMEOUT' };
    }
    
    if (axiosError.code === 'ERR_NETWORK') {
      return { message: 'Network error. Please check your connection.', code: 'NETWORK_ERROR' };
    }
    
    return { 
      message: axiosError.message || 'An unexpected error occurred', 
      code: axiosError.code || 'UNKNOWN_ERROR' 
    };
  }
  
  return { 
    message: 'An unexpected error occurred', 
    code: 'UNKNOWN_ERROR',
    details: error 
  };
};

export const fetchProducts = async (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): Promise<ProductResponse> => {
  console.log('Fetching products:', {
    page: currentPage,
    limit: productsPerPage,
    filters: selectedFilters
  });
  
  const response = await apiClient.get('/products', {
    params: {
      page: currentPage,
      limit: productsPerPage,
      category,
      ...selectedFilters,
    }
  });
  
  // Validate response structure
  if (!response.data || !Array.isArray(response.data.products)) {
    throw new Error('Invalid products response format');
  }
  
  return response.data;
};

export const fetchFilters = async (selectedFilters: Record<string, any>): Promise<FiltersResponse> => {
  console.log('Fetching filters with params:', selectedFilters);
  const response = await apiClient.get('/filters', {
    params: selectedFilters
  });
  
  // Validate response structure
  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid filters response format');
  }
  
  return response.data;
};
