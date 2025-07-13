
import axios, { AxiosError } from "axios";
import { ProductResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";
import { mockProducts } from "@/data/mockProducts";
import { mockFilters } from "@/data/mockFilters";

const API_URL = process.env.REACT_APP_API_URL || "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 5000; // 5 seconds
const USE_MOCK_DATA = !process.env.REACT_APP_API_URL || process.env.REACT_APP_USE_MOCK === 'true';

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
      return { message: 'Network error. Using offline mode.', code: 'NETWORK_ERROR' };
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

// Mock data functions
const getMockProducts = (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): ProductResponse => {
  console.log('Using mock products data');
  
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Apply other filters
  Object.entries(selectedFilters).forEach(([filterType, value]) => {
    if (value && value.length > 0) {
      // Apply basic filtering logic for demonstration
      filteredProducts = filteredProducts.filter(product => {
        // This is a simplified filter - you can enhance based on your needs
        return true;
      });
    }
  });
  
  // Pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page: currentPage,
    limit: productsPerPage,
    totalPages: Math.ceil(filteredProducts.length / productsPerPage)
  };
};

const getMockFilters = (): FiltersResponse => {
  console.log('Using mock filters data');
  return mockFilters;
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
    filters: selectedFilters,
    usingMockData: USE_MOCK_DATA
  });
  
  // Use mock data if API is not available or if explicitly configured
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockProducts(currentPage, productsPerPage, category, selectedFilters));
      }, 500); // Simulate network delay
    });
  }
  
  try {
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
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return getMockProducts(currentPage, productsPerPage, category, selectedFilters);
  }
};

export const fetchFilters = async (selectedFilters: Record<string, any>): Promise<FiltersResponse> => {
  console.log('Fetching filters with params:', selectedFilters, 'usingMockData:', USE_MOCK_DATA);
  
  // Use mock data if API is not available or if explicitly configured
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockFilters());
      }, 300); // Simulate network delay
    });
  }
  
  try {
    const response = await apiClient.get('/filters', {
      params: selectedFilters
    });
    
    // Validate response structure
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid filters response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return getMockFilters();
  }
};
