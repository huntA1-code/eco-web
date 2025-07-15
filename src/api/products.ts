import axios, { AxiosError } from "axios";
import { ProductResponse, ApiError, ProductsWithFiltersResponse, FiltersData } from "@/types/products";
import { FiltersResponse } from "@/pages/Products";
import { mockProducts, mockFilters } from "@/data/mockProductData";
import { Product } from "@/types/products";

const API_URL = "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 3000;
const USE_MOCK_DATA = true;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    
    if (axiosError.code === 'ECONNABORTED') {
      return { message: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.', code: 'TIMEOUT' };
    }
    
    if (axiosError.code === 'ERR_NETWORK') {
      return { message: 'خطأ في الشبكة. يتم استخدام البيانات المحلية.', code: 'NETWORK_ERROR' };
    }
    
    return { 
      message: axiosError.message || 'حدث خطأ غير متوقع', 
      code: axiosError.code || 'UNKNOWN_ERROR' 
    };
  }
  
  return { 
    message: 'حدث خطأ غير متوقع', 
    code: 'UNKNOWN_ERROR',
    details: error 
  };
};

// Enhanced mock data function for dynamic filtering
const getMockProducts = (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): ProductResponse => {
  console.log('Generating mock products with dynamic filtering:', {
    currentPage,
    productsPerPage,
    category,
    selectedFilters
  });
  
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Apply dynamic filters
  Object.entries(selectedFilters).forEach(([filterType, value]) => {
    if (value && (Array.isArray(value) ? value.length > 0 : value)) {
      console.log(`Applying ${filterType} filter:`, value);
      
      switch (filterType) {
        case 'brands':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              value.includes(product.brand)
            );
          }
          break;
        case 'colors':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              product.colors.some(color => value.includes(color))
            );
          }
          break;
        case 'sizes':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              product.sizes.some(size => value.includes(size))
            );
          }
          break;
        case 'priceRange':
          if (Array.isArray(value) && value.length === 2) {
            filteredProducts = filteredProducts.filter(product =>
              product.price >= value[0] && product.price <= value[1]
            );
          }
          break;
        default:
          // Handle other dynamic filters
          break;
      }
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

// Combined function to get products and filters in one call
const getMockProductsWithFilters = (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): ProductsWithFiltersResponse => {
  console.log('Generating mock products with filters in one call:', {
    currentPage,
    productsPerPage,
    category,
    selectedFilters
  });
  
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Apply dynamic filters
  Object.entries(selectedFilters).forEach(([filterType, value]) => {
    if (value && (Array.isArray(value) ? value.length > 0 : value)) {
      console.log(`Applying ${filterType} filter:`, value);
      
      switch (filterType) {
        case 'brands':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              value.includes(product.brand)
            );
          }
          break;
        case 'colors':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              product.colors.some(color => value.includes(color))
            );
          }
          break;
        case 'sizes':
          if (Array.isArray(value)) {
            filteredProducts = filteredProducts.filter(product =>
              product.sizes.some(size => value.includes(size))
            );
          }
          break;
        case 'priceRange':
          if (Array.isArray(value) && value.length === 2) {
            filteredProducts = filteredProducts.filter(product =>
              product.price >= value[0] && product.price <= value[1]
            );
          }
          break;
        default:
          // Handle other dynamic filters
          break;
      }
    }
  });
  
  // Generate filters from all filtered products (not just paginated ones)
  const availableBrands = [...new Set(filteredProducts.map(p => p.brand))];
  const availableColors = [...new Set(filteredProducts.flatMap(p => p.colors))];
  const availableSizes = [...new Set(filteredProducts.flatMap(p => p.sizes))];
  const availableCategories = [...new Set(filteredProducts.map(p => p.category))];
  
  // Calculate price range from filtered products
  const prices = filteredProducts.map(p => p.price);
  const priceRange: [number, number] = prices.length > 0 ? [
    Math.min(...prices),
    Math.max(...prices)
  ] : [0, 1000];
  
  // Generate dynamic filters
  const dynamicFilters: FiltersData = {
    categories: availableCategories.map(cat => ({ id: cat, name: cat })),
    types: ['قميص', 'بنطلون', 'فستان', 'جاكيت'].filter(type => 
      filteredProducts.some(p => p.category.includes(type))
    ),
    colors: availableColors.map((color, index) => ({
      id: color,
      name: color,
      hex: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][index % 5] || '#000000'
    })),
    sizes: availableSizes,
    priceRange,
    styles: ['كاجوال', 'رسمي', 'رياضي', 'عصري'].filter(style =>
      filteredProducts.some(p => p.description.includes(style))
    ),
    occasions: ['يومي', 'عمل', 'مناسبات', 'رياضة'].filter(occasion =>
      filteredProducts.some(p => p.description.includes(occasion))
    ),
    brands: availableBrands
  };
  
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
    hasPreviousPage: currentPage > 1,
    filters: dynamicFilters
  };
};

// Dynamic filters based on current product results
const getMockDynamicFilters = (
  selectedFilters: Record<string, any>,
  category: string | null,
  currentProducts?: Product[]
): FiltersResponse => {
  console.log('Generating dynamic filters based on:', {
    selectedFilters,
    category,
    productsCount: currentProducts?.length
  });
  
  // If no products provided, get all products with current filters (excluding the filter we're generating)
  if (!currentProducts) {
    const allProducts = getMockProducts(1, 1000, category, selectedFilters).products;
    currentProducts = allProducts;
  }
  
  // Extract unique values from current products for dynamic filtering
  const availableBrands = [...new Set(currentProducts.map(p => p.brand))];
  const availableColors = [...new Set(currentProducts.flatMap(p => p.colors))];
  const availableSizes = [...new Set(currentProducts.flatMap(p => p.sizes))];
  const availableCategories = [...new Set(currentProducts.map(p => p.category))];
  
  // Calculate price range from current products
  const prices = currentProducts.map(p => p.price);
  const priceRange: [number, number] = [
    Math.min(...prices),
    Math.max(...prices)
  ];
  
  // Convert to expected format
  const dynamicFilters: FiltersResponse = {
    categories: availableCategories.map(cat => ({ id: cat, name: cat })),
    types: ['قميص', 'بنطلون', 'فستان', 'جاكيت'].filter(type => 
      currentProducts.some(p => p.category.includes(type))
    ),
    colors: availableColors.map((color, index) => ({
      id: color,
      name: color,
      hex: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][index % 5]
    })),
    sizes: availableSizes,
    priceRange,
    styles: ['كاجوال', 'رسمي', 'رياضي', 'عصري'].filter(style =>
      currentProducts.some(p => p.description.includes(style))
    ),
    occasions: ['يومي', 'عمل', 'مناسبات', 'رياضة'].filter(occasion =>
      currentProducts.some(p => p.description.includes(occasion))
    ),
    brands: availableBrands
  };
  
  console.log('Generated dynamic filters:', dynamicFilters);
  return dynamicFilters;
};

export const fetchProducts = async (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): Promise<ProductResponse> => {
  console.log('Fetching products:', {
    currentPage,
    limit: productsPerPage,
    category,
    filters: selectedFilters,
    usingMockData: USE_MOCK_DATA
  });
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockProducts(currentPage, productsPerPage, category, selectedFilters));
      }, 800);
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
    
    if (!response.data || !Array.isArray(response.data.products)) {
      throw new Error('Invalid products response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return getMockProducts(currentPage, productsPerPage, category, selectedFilters);
  }
};

// New function for fetching dynamic filters
export const fetchDynamicFilters = async (
  selectedFilters: Record<string, any>,
  category: string | null,
  currentProducts?: Product[]
): Promise<FiltersResponse> => {
  console.log('Fetching dynamic filters:', {
    selectedFilters,
    category,
    productsCount: currentProducts?.length,
    usingMockData: USE_MOCK_DATA
  });
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockDynamicFilters(selectedFilters, category, currentProducts));
      }, 400);
    });
  }
  
  try {
    const response = await apiClient.post('/filters/dynamic', {
      filters: selectedFilters,
      category,
      products: currentProducts?.map(p => p.id) // Send product IDs for backend processing
    });
    
    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid filters response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('Dynamic filters API request failed, falling back to mock data:', error);
    return getMockDynamicFilters(selectedFilters, category, currentProducts);
  }
};

// New function for fetching products and filters in one call
export const fetchProductsWithFilters = async (
  currentPage: number,
  productsPerPage: number,
  category: string | null,
  selectedFilters: Record<string, any>
): Promise<ProductsWithFiltersResponse> => {
  console.log('Fetching products with filters in one call:', {
    currentPage,
    limit: productsPerPage,
    category,
    filters: selectedFilters,
    usingMockData: USE_MOCK_DATA
  });
  
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockProductsWithFilters(currentPage, productsPerPage, category, selectedFilters));
      }, 800);
    });
  }
  
  try {
    const response = await apiClient.post('/products/with-filters', {
      page: currentPage,
      limit: productsPerPage,
      category,
      filters: selectedFilters,
    });
    
    if (!response.data || !Array.isArray(response.data.products)) {
      throw new Error('Invalid products with filters response format');
    }
    
    return response.data;
  } catch (error) {
    console.warn('API request failed, falling back to mock data:', error);
    return getMockProductsWithFilters(currentPage, productsPerPage, category, selectedFilters);
  }
};

// Keep the old fetchFilters function for backward compatibility
export const fetchFilters = async (selectedFilters: Record<string, any>): Promise<FiltersResponse> => {
  console.log('Fetching static filters (deprecated):', selectedFilters);
  return fetchDynamicFilters(selectedFilters, null);
};
