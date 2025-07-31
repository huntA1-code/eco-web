import axios, { AxiosError } from 'axios';

const API_URL = "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 10000; // 10 seconds
const USE_MOCK_DATA = true; // Always use mock data for now

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling utility
const handleApiError = (error: unknown): any => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
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

// Mock data
const mockReviews: ReviewData[] = [
  {
    id: 1,
    user: "Sarah Johnson",
    rating: 5,
    comment: "Amazing product! Love the quality and design.",
    date: "2024-01-15",
    overallFit: "Perfect fit",
    size: "M",
    color: "Blue",
    helpfulCount: 12,
    isHelpful: false,
    isVerifiedPurchase: true,
    likes: 8,
    dislikes: 1,
    userImage: "/api/placeholder/40/40"
  },
  {
    id: 2,
    user: "Mike Chen",
    rating: 4,
    comment: "Good quality but took a while to arrive.",
    date: "2024-01-10",
    overallFit: "Runs small",
    size: "L", 
    color: "Black",
    helpfulCount: 8,
    isHelpful: true,
    isVerifiedPurchase: true,
    likes: 5,
    dislikes: 0,
    userImage: "/api/placeholder/40/40"
  },
  {
    id: 3,
    user: "Emma Wilson",
    rating: 5,
    comment: "Perfect! Exactly what I was looking for.",
    date: "2024-01-08",
    overallFit: "True to size",
    size: "S",
    color: "Red",
    helpfulCount: 15,
    isHelpful: false,
    isVerifiedPurchase: true,
    likes: 12,
    dislikes: 2,
    userImage: "/api/placeholder/40/40"
  }
];

const getMockReviews = (productId: string, options?: any): ReviewData[] => {
  console.log('📦 Using mock reviews data for product:', productId);
  return mockReviews;
};

export interface ReviewData {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  overallFit?: string;
  size?: string;
  color?: string;
  images?: string[]; // Array of image URLs
  helpfulCount: number;
  isHelpful?: boolean;
  isStoreReview?: boolean;
  isVerifiedPurchase?: boolean;
  likes?: number;
  dislikes?: number;
  userImage?: string;
}

// API function to fetch reviews
export const fetchReviews = async (productId: string, options?: { 
  isStoreReview?: boolean,
  rating?: number,
  sortBy?: 'recent' | 'highest' | 'lowest'
}): Promise<ReviewData[]> => {
  console.log('📥 INPUT - Fetching reviews for product:', productId, 'with options:', options);
  
  if (USE_MOCK_DATA) {
    console.log('📦 Using mock data mode for reviews');
    return getMockReviews(productId, options);
  }
  
  try {
    const params = new URLSearchParams();
    if (options?.rating) params.append('rating', options.rating.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    if (options?.isStoreReview !== undefined) params.append('isStoreReview', options.isStoreReview.toString());
    
    const response = await apiClient.get(`/products/${productId}/reviews?${params}`);
    console.log('📤 OUTPUT - Reviews fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for reviews, falling back to mock data:', error);
    return getMockReviews(productId, options);
  }
};

// API function to add a review with images
export const addReview = async (productId: string, formData: FormData): Promise<ReviewData> => {
  console.log('📥 INPUT - Adding review for product:', productId);
  console.log('📥 INPUT - FormData contents:');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
  
  try {
    const response = await apiClient.post(`/products/${productId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('📤 OUTPUT - Review added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for adding review:', error);
    throw error;
  }
};

// API function to mark review as helpful/unhelpful
export const toggleHelpful = async (reviewId: number, helpful: boolean): Promise<{ helpfulCount: number }> => {
  console.log('📥 INPUT - Toggle helpful for review ID:', reviewId, 'helpful:', helpful);
  
  try {
    const response = await apiClient.put(`/reviews/${reviewId}/helpful`, { helpful });
    console.log('📤 OUTPUT - Helpful status updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for helpful toggle:', error);
    throw error;
  }
};

// API function to like/dislike a review
export const toggleReactionReview = async (
  reviewId: number, 
  reaction: 'like' | 'dislike'
): Promise<{ likes: number, dislikes: number }> => {
  console.log('📥 INPUT - Toggle reaction for review ID:', reviewId, 'reaction:', reaction);
  
  try {
    const response = await apiClient.put(`/reviews/${reviewId}/reaction`, { reaction });
    console.log('📤 OUTPUT - Reaction updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for reaction toggle:', error);
    throw error;
  }
};

// API function to get image URL by name
export const getImageUrl = (imageName: string): string => {
  console.log('📥 INPUT - Getting image URL for:', imageName);
  
  const url = imageName.startsWith('http') ? imageName : `/api/images/${imageName}`;
  console.log('📤 OUTPUT - Image URL:', url);
  return url;
};

// API function for store reviews
export const fetchStoreReviews = async (storeId: string, options?: {
  rating?: number,
  sortBy?: 'recent' | 'highest' | 'lowest'
}): Promise<ReviewData[]> => {
  console.log('📥 INPUT - Fetching store reviews for store:', storeId, 'with options:', options);
  
  try {
    const params = new URLSearchParams();
    if (options?.rating) params.append('rating', options.rating.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    
    const response = await apiClient.get(`/stores/${storeId}/reviews?${params}`);
    console.log('📤 OUTPUT - Store reviews fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for store reviews:', error);
    throw error;
  }
};

export const addStoreReview = async (storeId: string, formData: FormData): Promise<ReviewData> => {
  console.log('📥 INPUT - Adding store review for store:', storeId);
  console.log('📥 INPUT - FormData contents:');
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
  
  try {
    const response = await apiClient.post(`/stores/${storeId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('📤 OUTPUT - Store review added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for adding store review:', error);
    throw error;
  }
};