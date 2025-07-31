
import axios from 'axios';

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK === 'true' || !process.env.REACT_APP_API_URL;

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
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

// Helper function to get reviews from localStorage
const getStoredReviews = (productId: string): ReviewData[] => {
  const storedReviews = localStorage.getItem(`reviews_${productId}`);
  return storedReviews ? JSON.parse(storedReviews) : [];
};

// Helper function to save reviews to localStorage
const saveReviews = (productId: string, reviews: ReviewData[]) => {
  localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
};

// Helper function to get helpful reviews from localStorage
const getHelpfulReviews = (): Record<number, boolean> => {
  const stored = localStorage.getItem('helpful_reviews');
  return stored ? JSON.parse(stored) : {};
};

// Helper function to save helpful reviews to localStorage
const saveHelpfulReviews = (helpfulReviews: Record<number, boolean>) => {
  localStorage.setItem('helpful_reviews', JSON.stringify(helpfulReviews));
};

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
    
    let reviews = getStoredReviews(productId);
    const helpfulReviews = getHelpfulReviews();
    
    // If no stored reviews, add default mock data
    if (reviews.length === 0 && !options?.isStoreReview) {
      const defaultReviews: ReviewData[] = [
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
          likes: 0,
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
          likes: 0,
          dislikes: 0
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
          color: "Hot Pink",
          isVerifiedPurchase: false,
          likes: 0,
          dislikes: 0
        }
      ];
      saveReviews(productId, defaultReviews);
      reviews = defaultReviews;
    }
    
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
      isHelpful: helpfulReviews[review.id] || false
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
    
    const reviews = getStoredReviews(productId);
    
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
        
        // Store image locally for mock
        const reader = new FileReader();
        reader.onload = (e) => {
          localStorage.setItem(`image_${imageName}`, e.target?.result as string);
        };
        reader.readAsDataURL(file);
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
    
    reviews.push(newReview);
    saveReviews(productId, reviews);
    
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
    
    const helpfulReviews = getHelpfulReviews();
    const wasHelpful = helpfulReviews[reviewId] || false;
    
    if (wasHelpful !== helpful) {
      helpfulReviews[reviewId] = helpful;
      saveHelpfulReviews(helpfulReviews);
      
      const allProductKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews_'));
      
      allProductKeys.forEach(key => {
        const reviews = JSON.parse(localStorage.getItem(key) || '[]');
        const updatedReviews = reviews.map((review: ReviewData) => {
          if (review.id === reviewId) {
            return {
              ...review,
              helpfulCount: review.helpfulCount + (helpful ? 1 : -1)
            };
          }
          return review;
        });
        localStorage.setItem(key, JSON.stringify(updatedReviews));
      });
      
      const allReviews = allProductKeys.flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'));
      const updatedReview = allReviews.find((r: ReviewData) => r.id === reviewId);
      
      return { helpfulCount: updatedReview?.helpfulCount || 0 };
    }
    
    const allProductKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews_'));
    const allReviews = allProductKeys.flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'));
    const review = allReviews.find((r: ReviewData) => r.id === reviewId);
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
    
    const allProductKeys = Object.keys(localStorage).filter(key => key.startsWith('reviews_'));
    
    let updatedReview: ReviewData | undefined;
    
    allProductKeys.forEach(key => {
      const reviews = JSON.parse(localStorage.getItem(key) || '[]');
      const updatedReviews = reviews.map((review: ReviewData) => {
        if (review.id === reviewId) {
          const newReview = { ...review };
          if (reaction === 'like') {
            newReview.likes = (newReview.likes || 0) + 1;
          } else {
            newReview.dislikes = (newReview.dislikes || 0) + 1;
          }
          updatedReview = newReview;
          return newReview;
        }
        return review;
      });
      localStorage.setItem(key, JSON.stringify(updatedReviews));
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
    // Mock implementation
    const storedImage = localStorage.getItem(`image_${imageName.replace('/api/images/', '')}`);
    return storedImage || '/placeholder.svg';
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
    
    let reviews = getStoredReviews(`store_${storeId}`);
    const helpfulReviews = getHelpfulReviews();
    
    // إذا لم تكن هناك مراجعات محفوظة، أضف بيانات تجريبية
    if (reviews.length === 0) {
      const defaultStoreReviews: ReviewData[] = [
        {
          id: 1,
          user: "Sarah Johnson",
          rating: 5,
          comment: "Amazing store! Great selection of products and excellent customer service. Fast shipping and quality items. Highly recommended!",
          date: "2024-02-15",
          helpfulCount: 24,
          isStoreReview: true,
          userImage: "/placeholder.svg",
          likes: 0,
          dislikes: 0
        },
        {
          id: 2,
          user: "Mike Chen",
          rating: 4,
          comment: "Good experience overall. Products are as described and delivery was on time. Will shop here again.",
          date: "2024-02-14",
          helpfulCount: 18,
          isStoreReview: true,
          userImage: "/placeholder.svg",
          likes: 0,
          dislikes: 0
        },
        {
          id: 3,
          user: "Emma Davis",
          rating: 5,
          comment: "Excellent store with top-notch products. The quality exceeded my expectations and the customer support was very helpful.",
          date: "2024-02-13",
          helpfulCount: 31,
          isStoreReview: true,
          userImage: "/placeholder.svg",
          likes: 0,
          dislikes: 0
        }
      ];
      saveReviews(`store_${storeId}`, defaultStoreReviews);
      reviews = defaultStoreReviews;
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
      isHelpful: helpfulReviews[review.id] || false,
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
    
    const reviews = getStoredReviews(`store_${storeId}`);
    
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
        
        // Store image locally for mock
        const reader = new FileReader();
        reader.onload = (e) => {
          localStorage.setItem(`image_${imageName}`, e.target?.result as string);
        };
        reader.readAsDataURL(file);
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
    
    reviews.push(newReview);
    saveReviews(`store_${storeId}`, reviews);
    
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
