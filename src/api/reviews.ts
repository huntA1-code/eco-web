
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
export const fetchReviews = async (productId: string): Promise<ReviewData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const reviews = getStoredReviews(productId);
  const helpfulReviews = getHelpfulReviews();
  
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
    id: Date.now(), // Use timestamp as ID
    helpfulCount: 0,
    isHelpful: false
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
  
  // Only update if the state is actually changing
  if (wasHelpful !== helpful) {
    helpfulReviews[reviewId] = helpful;
    saveHelpfulReviews(helpfulReviews);
    
    // Update helpfulCount in all product review lists
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
    
    // Find the review to get its updated helpfulCount
    const allReviews = allProductKeys.flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'));
    const updatedReview = allReviews.find((r: ReviewData) => r.id === reviewId);
    
    return { helpfulCount: updatedReview?.helpfulCount || 0 };
  }
  
  // If no change, return current helpfulCount
  const allReviews = allProductKeys.flatMap(key => JSON.parse(localStorage.getItem(key) || '[]'));
  const review = allReviews.find((r: ReviewData) => r.id === reviewId);
  return { helpfulCount: review?.helpfulCount || 0 };
};
