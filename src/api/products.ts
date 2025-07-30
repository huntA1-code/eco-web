
import axios, { AxiosError } from "axios";
import { ProductResponse, ApiError } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";
import { mockProducts, mockFilters } from "@/data/mockProductData";

const API_URL = "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 3000; // 3 seconds
const USE_MOCK_DATA = true; // Always use mock data for now

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
    currentPage: currentPage,
    totalPages: Math.ceil(filteredProducts.length / productsPerPage),
    hasNextPage: currentPage < Math.ceil(filteredProducts.length / productsPerPage),
    hasPreviousPage: currentPage > 1
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
    currentPage: currentPage,
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

// Mock search data function
const getMockSearchResults = (
  query: string,
  searchType: string,
  searchImage: string | null,
  currentPage: number,
  productsPerPage: number,
  selectedFilters: Record<string, any>
): { products: ProductResponse; filters: FiltersResponse } => {
  console.log('Using mock search data for:', { query, searchType, searchImage });
  
  let filteredProducts = [...mockProducts];
  
  // Apply search filtering
  if (searchType === 'text' && query) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // For image search, return random subset for demo purposes
  if (searchType === 'image' && searchImage) {
    // In real implementation, this would use image recognition API
    filteredProducts = filteredProducts.slice(0, Math.floor(Math.random() * 10) + 5);
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
  
  const products: ProductResponse = {
    products: paginatedProducts,
    total: filteredProducts.length,
    currentPage: currentPage,
    totalPages: Math.ceil(filteredProducts.length / productsPerPage),
    hasNextPage: currentPage < Math.ceil(filteredProducts.length / productsPerPage),
    hasPreviousPage: currentPage > 1
  };
  
  const filters = getMockFilters();
  
  return { products, filters };
};

export const searchProducts = async (
  query: string,
  searchType: string,
  searchImage: string | null,
  currentPage: number,
  productsPerPage: number,
  selectedFilters: Record<string, any>
): Promise<{ products: ProductResponse; filters: FiltersResponse }> => {
  console.log('Searching products:', {
    query,
    searchType,
    searchImage: !!searchImage,
    currentPage,
    limit: productsPerPage,
    filters: selectedFilters,
    usingMockData: USE_MOCK_DATA
  });
  
  // Use mock data if API is not available or if explicitly configured
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockSearchResults(query, searchType, searchImage, currentPage, productsPerPage, selectedFilters));
      }, 800); // Simulate network delay
    });
  }
  
  try {
    const response = await apiClient.post('/search', {
      query,
      searchType,
      searchImage,
      page: currentPage,
      limit: productsPerPage,
      filters: selectedFilters,
    });
    
    // Validate response structure
    if (!response.data || !response.data.products || !response.data.filters) {
      throw new Error('Invalid search response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return getMockSearchResults(query, searchType, searchImage, currentPage, productsPerPage, selectedFilters);
  }
};

// Product Details API Functions
export const fetchProductDetails = async (productId: string): Promise<any> => {
  console.log('Fetching product details for:', productId, 'usingMockData:', USE_MOCK_DATA);
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find product by ID or name in mock data
        const product = mockProducts.find(p => 
          p.id.toString() === productId || 
          p.name.toLowerCase().replace(/\s+/g, '-') === productId.toLowerCase()
        );
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        // Enhanced product details
        const productDetails = {
          ...product,
          sku: `SK${Math.random().toString(36).substr(2, 8)}`,
          isTrending: Math.random() > 0.5,
          isBestSeller: Math.random() > 0.6,
          colors: [
            {
              name: 'Hot Pink',
              hex: '#FF69B4',
              isHot: true,
              price: product.price * 0.8,
              originalPrice: product.price,
              sizes: [
                { label: '8Y', dimensions: '122-128CM', quantity: 2 },
                { label: '9Y', dimensions: '128-134CM', quantity: 8 },
                { label: '10Y', dimensions: '134-140CM', quantity: 0 },
                { label: '11Y', dimensions: '140-146CM', quantity: 5 },
                { label: '12Y', dimensions: '146-152CM', quantity: 1 }
              ],
              images: [product.image, product.image, product.image, product.image]
            },
            {
              name: 'Navy',
              hex: '#000080',
              isHot: true,
              price: product.price * 0.85,
              originalPrice: product.price,
              sizes: [
                { label: '8Y', dimensions: '122-128CM', quantity: 10 },
                { label: '9Y', dimensions: '128-134CM', quantity: 12 },
                { label: '10Y', dimensions: '134-140CM', quantity: 5 },
                { label: '11Y', dimensions: '140-146CM', quantity: 3 },
                { label: '12Y', dimensions: '146-152CM', quantity: 0 }
              ],
              images: [product.image, product.image, product.image, product.image]
            },
            {
              name: 'Forest Green',
              hex: '#228B22',
              price: product.price * 0.9,
              originalPrice: product.price,
              sizes: [
                { label: '8Y', dimensions: '122-128CM', quantity: 7 },
                { label: '9Y', dimensions: '128-134CM', quantity: 4 },
                { label: '10Y', dimensions: '134-140CM', quantity: 2 },
                { label: '11Y', dimensions: '140-146CM', quantity: 0 },
                { label: '12Y', dimensions: '146-152CM', quantity: 8 }
              ],
              images: [product.image, product.image, product.image, product.image]
            },
            {
              name: 'Black',
              hex: '#000000',
              price: product.price * 1.1,
              originalPrice: product.price * 1.2,
              sizes: [
                { label: '8Y', dimensions: '122-128CM', quantity: 3 },
                { label: '9Y', dimensions: '128-134CM', quantity: 6 },
                { label: '10Y', dimensions: '134-140CM', quantity: 4 },
                { label: '11Y', dimensions: '140-146CM', quantity: 2 },
                { label: '12Y', dimensions: '146-152CM', quantity: 1 }
              ],
              images: [product.image, product.image, product.image, product.image]
            }
          ],
          specifications: {
            material: 'Premium Leather',
            outsoleMaterial: 'Rubber',
            upperMaterial: 'Genuine Leather',
            activityType: 'Casual Wear',
            color: 'Multi-Color',
            heelHeight: '1.5 inches',
            width: 'Standard'
          },
          store: {
            name: 'MIMAOYIGOU',
            rating: 4.86,
            itemCount: 23,
            followerCount: 119,
            logo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc'
          }
        };
        
        resolve(productDetails);
      }, 600); // Simulate network delay
    });
  }
  
  try {
    const response = await apiClient.get(`/products/${productId}`);
    
    if (!response.data) {
      throw new Error('Invalid product response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('API request failed for product details, falling back to mock data:', error);
    throw handleApiError(error);
  }
};

export const fetchProductReviews = async (productId: string): Promise<any[]> => {
  console.log('Fetching reviews for product:', productId, 'usingMockData:', USE_MOCK_DATA);
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockReviews = [
          {
            id: 1,
            user: "Sarah M.",
            rating: 5,
            comment: "Absolutely love this product! The quality is outstanding.",
            date: "2024-02-15",
            helpfulCount: 8,
            overallFit: "True to Size",
            size: "M",
            color: "Black"
          },
          {
            id: 2,
            user: "John D.",
            rating: 4,
            comment: "Great fit and comfortable. Would buy again.",
            date: "2024-02-10",
            helpfulCount: 3,
            overallFit: "Runs Small",
            size: "L",
            color: "Navy"
          },
          {
            id: 3,
            user: "Emma W.",
            rating: 5,
            comment: "Perfect quality and fast shipping!",
            date: "2024-02-08",
            helpfulCount: 12,
            overallFit: "True to Size",
            size: "S",
            color: "Hot Pink"
          }
        ];
        resolve(mockReviews);
      }, 400);
    });
  }
  
  try {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.warn('API request failed for reviews, falling back to mock data:', error);
    return [];
  }
};

export const fetchRecommendedProducts = async (productId: string): Promise<any[]> => {
  console.log('Fetching recommended products for:', productId, 'usingMockData:', USE_MOCK_DATA);
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a subset of mock products as recommendations
        const recommendations = mockProducts
          .filter(p => p.id.toString() !== productId)
          .slice(0, 8)
          .map(product => ({
            ...product,
            isRecommended: true
          }));
        resolve(recommendations);
      }, 500);
    });
  }
  
  try {
    const response = await apiClient.get(`/products/${productId}/recommended`);
    return response.data;
  } catch (error) {
    console.warn('API request failed for recommendations, falling back to mock data:', error);
    return mockProducts.slice(0, 8);
  }
};
