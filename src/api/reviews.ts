import axios from 'axios';

const API_URL = "https://your-api-url.com/api";
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  
  try {
    const params = new URLSearchParams();
    if (options?.rating) params.append('rating', options.rating.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    if (options?.isStoreReview !== undefined) params.append('isStoreReview', options.isStoreReview.toString());
    
    const response = await apiClient.get(`/products/${productId}/reviews?${params}`);
    console.log('📤 OUTPUT - Reviews fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ ERROR - API request failed for reviews:', error);
    throw error;
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