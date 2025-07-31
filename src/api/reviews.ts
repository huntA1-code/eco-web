import axios from 'axios';

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

// Mock data - similar to products.ts pattern
const mockProductReviews: Record<string, ReviewData[]> = {
  '1': [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "Absolutely love this product! The quality is outstanding.",
      date: "2024-02-15",
      helpfulCount: 8,
      overallFit: "True to Size",
      size: "M",
      color: "Black",
      isVerifiedPurchase: true,
      likes: 5,
      dislikes: 0
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
      color: "Navy",
      isVerifiedPurchase: true,
      likes: 2,
      dislikes: 0
    }
  ]
};

const mockStoreReviews: Record<string, ReviewData[]> = {
  '1': [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      comment: "Amazing store! Great selection of products and excellent customer service.",
      date: "2024-02-15",
      helpfulCount: 24,
      isStoreReview: true,
      userImage: "/placeholder.svg",
      likes: 12,
      dislikes: 1
    },
    {
      id: 2,
      user: "Mike Chen",
      rating: 4,
      comment: "Good experience overall. Products are as described and delivery was on time.",
      date: "2024-02-14",
      helpfulCount: 18,
      isStoreReview: true,
      userImage: "/placeholder.svg",
      likes: 8,
      dislikes: 0
    }
  ]
};

const mockHelpfulReviews: Record<number, boolean> = {};

// API function to fetch reviews
export const fetchReviews = async (productId: string, options?: { 
  isStoreReview?: boolean,
  rating?: number,
  sortBy?: 'recent' | 'highest' | 'lowest'
}): Promise<ReviewData[]> => {
  console.log('Fetching reviews for product:', productId, 'usingMockData:', USE_MOCK_DATA);
  
  if (USE_MOCK_DATA) {
    // Mock data implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let reviews = [...(mockProductReviews[productId] || [])];
    
    // Filter by review type
    if (options?.isStoreReview !== undefined) {
      reviews = reviews.filter(review => review.isStoreReview === options.isStoreReview);
    }

    // Filter by rating
    if (options?.rating) {
      reviews = reviews.filter(review => review.rating === options.rating);
    }

    // Sort reviews
    if (options?.sortBy) {
      reviews.sort((a, b) => {
        switch (options.sortBy) {
          case 'recent':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'highest':
            return b.rating - a.rating;
          case 'lowest':
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
    }
    
    // Add isHelpful status to each review
    return reviews.map(review => ({
      ...review,
      isHelpful: mockHelpfulReviews[review.id] || false
    }));
  }
  
  // Real API call
  try {
    const params = new URLSearchParams();
    if (options?.rating) params.append('rating', options.rating.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    if (options?.isStoreReview !== undefined) params.append('isStoreReview', options.isStoreReview.toString());
    
    const response = await apiClient.get(`/products/${productId}/reviews?${params}`);
    return response.data;
  } catch (error) {
    console.warn('API request failed for reviews, falling back to mock data:', error);
    // Fallback to mock implementation
    return fetchReviews(productId, options);
  }
};

// API function to add a review with images
export const addReview = async (productId: string, formData: FormData): Promise<ReviewData> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Extract data from FormData for mock
    const comment = formData.get('comment') as string;
    const rating = Number(formData.get('rating'));
    const user = formData.get('user') as string || 'Anonymous User';
    const size = formData.get('size') as string;
    const color = formData.get('color') as string;
    const overallFit = formData.get('overallFit') as string;
    
    // Handle images for mock
    const images: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    for (const file of imageFiles) {
      if (file instanceof File && file.type.startsWith('image/')) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const imageName = `review_${timestamp}_${randomId}.${extension}`;
        images.push(`/api/images/${imageName}`);
      }
    }
    
    const newReview: ReviewData = {
      id: Date.now(),
      user,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      size,
      color,
      overallFit,
      images,
      helpfulCount: 0,
      isHelpful: false,
      likes: 0,
      dislikes: 0,
      isVerifiedPurchase: Math.random() > 0.5
    };
    
    // Add to mock data
    if (!mockProductReviews[productId]) {
      mockProductReviews[productId] = [];
    }
    mockProductReviews[productId].push(newReview);
    
    return newReview;
  }
  
  // Real API call
  try {
    const response = await apiClient.post(`/products/${productId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.warn('API request failed for adding review, falling back to mock:', error);
    return addReview(productId, formData);
  }
};

// API function to mark review as helpful/unhelpful
export const toggleHelpful = async (reviewId: number, helpful: boolean): Promise<{ helpfulCount: number }> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const wasHelpful = mockHelpfulReviews[reviewId] || false;
    
    if (wasHelpful !== helpful) {
      mockHelpfulReviews[reviewId] = helpful;
      
      // Update helpfulCount in mock data
      Object.values(mockProductReviews).forEach(reviews => {
        reviews.forEach(review => {
          if (review.id === reviewId) {
            review.helpfulCount += helpful ? 1 : -1;
          }
        });
      });
      
      Object.values(mockStoreReviews).forEach(reviews => {
        reviews.forEach(review => {
          if (review.id === reviewId) {
            review.helpfulCount += helpful ? 1 : -1;
          }
        });
      });
    }
    
    // Find and return the updated review
    const allReviews = [
      ...Object.values(mockProductReviews).flat(),
      ...Object.values(mockStoreReviews).flat()
    ];
    const review = allReviews.find(r => r.id === reviewId);
    return { helpfulCount: review?.helpfulCount || 0 };
  }
  
  // Real API call
  try {
    const response = await apiClient.put(`/reviews/${reviewId}/helpful`, { helpful });
    return response.data;
  } catch (error) {
    console.warn('API request failed for helpful toggle, falling back to mock:', error);
    return toggleHelpful(reviewId, helpful);
  }
};

// API function to like/dislike a review
export const toggleReactionReview = async (
  reviewId: number, 
  reaction: 'like' | 'dislike'
): Promise<{ likes: number, dislikes: number }> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let updatedReview: ReviewData | undefined;
    
    // Update in mock data
    Object.values(mockProductReviews).forEach(reviews => {
      reviews.forEach(review => {
        if (review.id === reviewId) {
          if (reaction === 'like') {
            review.likes = (review.likes || 0) + 1;
          } else {
            review.dislikes = (review.dislikes || 0) + 1;
          }
          updatedReview = review;
        }
      });
    });
    
    Object.values(mockStoreReviews).forEach(reviews => {
      reviews.forEach(review => {
        if (review.id === reviewId) {
          if (reaction === 'like') {
            review.likes = (review.likes || 0) + 1;
          } else {
            review.dislikes = (review.dislikes || 0) + 1;
          }
          updatedReview = review;
        }
      });
    });
    
    return {
      likes: updatedReview?.likes || 0,
      dislikes: updatedReview?.dislikes || 0
    };
  }
  
  // Real API call
  try {
    const response = await apiClient.put(`/reviews/${reviewId}/reaction`, { reaction });
    return response.data;
  } catch (error) {
    console.warn('API request failed for reaction toggle, falling back to mock:', error);
    return toggleReactionReview(reviewId, reaction);
  }
};

// API function to get image URL by name
export const getImageUrl = (imageName: string): string => {
  if (USE_MOCK_DATA) {
    // Mock implementation - return placeholder for now
    return '/placeholder.svg';
  }
  
  // In real app, this would be the full URL from backend
  return imageName.startsWith('http') ? imageName : `/api/images/${imageName}`;
};

// API function for store reviews
export const fetchStoreReviews = async (storeId: string, options?: {
  rating?: number,
  sortBy?: 'recent' | 'highest' | 'lowest'
}): Promise<ReviewData[]> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let reviews = [...(mockStoreReviews[storeId] || [])];
    
    // Filter by rating
    if (options?.rating) {
      reviews = reviews.filter(review => review.rating === options.rating);
    }
    
    // Sort reviews
    if (options?.sortBy) {
      reviews.sort((a, b) => {
        switch (options.sortBy) {
          case 'recent':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'highest':
            return b.rating - a.rating;
          case 'lowest':
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
    }
    
    // Add isHelpful status to each review
    return reviews.map(review => ({
      ...review,
      isHelpful: mockHelpfulReviews[review.id] || false,
      isStoreReview: true
    }));
  }
  
  // Real API call
  try {
    const params = new URLSearchParams();
    if (options?.rating) params.append('rating', options.rating.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    
    const response = await apiClient.get(`/stores/${storeId}/reviews?${params}`);
    return response.data;
  } catch (error) {
    console.warn('API request failed for store reviews, falling back to mock data:', error);
    return fetchStoreReviews(storeId, options);
  }
};

export const addStoreReview = async (storeId: string, formData: FormData): Promise<ReviewData> => {
  if (USE_MOCK_DATA) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Extract data from FormData for mock
    const comment = formData.get('comment') as string;
    const rating = Number(formData.get('rating'));
    const user = formData.get('user') as string || 'Anonymous User';
    
    // Handle images for mock
    const images: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    for (const file of imageFiles) {
      if (file instanceof File && file.type.startsWith('image/')) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const extension = file.name.split('.').pop();
        const imageName = `store_review_${timestamp}_${randomId}.${extension}`;
        images.push(`/api/images/${imageName}`);
      }
    }
    
    const newReview: ReviewData = {
      id: Date.now(),
      user,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      images,
      helpfulCount: 0,
      isHelpful: false,
      isStoreReview: true,
      likes: 0,
      dislikes: 0,
      isVerifiedPurchase: Math.random() > 0.5
    };
    
    // Add to mock data
    if (!mockStoreReviews[storeId]) {
      mockStoreReviews[storeId] = [];
    }
    mockStoreReviews[storeId].push(newReview);
    
    return newReview;
  }
  
  // Real API call
  try {
    const response = await apiClient.post(`/stores/${storeId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.warn('API request failed for adding store review, falling back to mock:', error);
    return addStoreReview(storeId, formData);
  }
};