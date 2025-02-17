
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

// Mock API function to fetch reviews
export const fetchReviews = async (productId: string): Promise<ReviewData[]> => {
  // This is a mock implementation
  const response = await fetch(`/api/products/${productId}/reviews`);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
};

// Mock API function to add a review
export const addReview = async (productId: string, review: Omit<ReviewData, 'id' | 'helpfulCount' | 'isHelpful'>): Promise<ReviewData> => {
  // This is a mock implementation
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add review');
  }
  return response.json();
};

// Mock API function to mark review as helpful/unhelpful
export const toggleHelpful = async (reviewId: number, helpful: boolean): Promise<{ helpfulCount: number }> => {
  // This is a mock implementation
  const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ helpful }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update helpful status');
  }
  return response.json();
};
