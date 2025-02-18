
export interface ReviewData {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  overallFit?: string;
  size?: string;
  color?: string;
  images?: string[];
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

// Mock API function to fetch reviews
export const fetchReviews = async (productId: string, options?: { 
  isStoreReview?: boolean,
  rating?: number,
  sortBy?: 'recent' | 'highest' | 'lowest'
}): Promise<ReviewData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let reviews = getStoredReviews(productId);
  const helpfulReviews = getHelpfulReviews();
  
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
};

// Mock API function to add a review
export const addReview = async (productId: string, review: Omit<ReviewData, 'id' | 'helpfulCount' | 'isHelpful'>): Promise<ReviewData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const reviews = getStoredReviews(productId);
  
  const newReview: ReviewData = {
    ...review,
    id: Date.now(),
    helpfulCount: 0,
    isHelpful: false,
    likes: 0,
    dislikes: 0
  };
  
  reviews.push(newReview);
  saveReviews(productId, reviews);
  
  return newReview;
};

// Mock API function to mark review as helpful/unhelpful
export const toggleHelpful = async (reviewId: number, helpful: boolean): Promise<{ helpfulCount: number }> => {
  // Simulate network delay
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
};

// Mock API function to like/dislike a review
export const toggleReactionReview = async (
  reviewId: number, 
  reaction: 'like' | 'dislike'
): Promise<{ likes: number, dislikes: number }> => {
  // Simulate network delay
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
};
