import React, { useState } from 'react';
import { Star, ThumbsUp, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Review {
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
}

interface CustomerReviewsProps {
  reviews: Review[];
}

export const CustomerReviews = ({ reviews: initialReviews }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    size: '',
    color: '',
    overallFit: 'True to Size',
  });
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const handleHelpfulClick = (reviewId: number) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? { ...review, helpfulCount: review.helpfulCount + 1 }
          : review
      )
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReviewObj = {
      id: reviews.length + 1,
      user: "Current User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      size: newReview.size,
      color: newReview.color,
      overallFit: newReview.overallFit,
      helpfulCount: 0,
      images: selectedImages ? Array.from(selectedImages).map(file => URL.createObjectURL(file)) : [],
    };

    setReviews(prev => [...prev, newReviewObj]);
    setNewReview({
      rating: 5,
      comment: '',
      size: '',
      color: '',
      overallFit: 'True to Size',
    });
    setSelectedImages(null);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif font-semibold">Customer Reviews</h3>
      
      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-neutral-light rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{review.user}</p>
                <div className="flex items-center gap-1 text-sm text-neutral">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleHelpfulClick(review.id)}
                className="flex items-center gap-1 text-sm text-neutral hover:text-neutral-dark"
              >
                <ThumbsUp size={14} />
                <span>Helpful ({review.helpfulCount})</span>
              </button>
            </div>
            
            {review.overallFit && (
              <div className="text-sm text-neutral mb-2">
                Fit: {review.overallFit}
              </div>
            )}
            
            <p className="text-neutral-dark mb-3">{review.comment}</p>
            
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {review.images.map((image, idx) => (
                  <img 
                    key={idx}
                    src={image} 
                    alt={`Review ${review.id} image ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleSubmitReview} className="space-y-4 bg-white p-4 rounded-lg">
        <h4 className="font-medium">Write a Review</h4>
        
        <div>
          <label className="block text-sm mb-1">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setNewReview(prev => ({ ...prev, rating: idx + 1 }))}
                className={`text-2xl ${
                  idx < newReview.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Your Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Size</label>
            <input
              type="text"
              value={newReview.size}
              onChange={(e) => setNewReview(prev => ({ ...prev, size: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Color</label>
            <input
              type="text"
              value={newReview.color}
              onChange={(e) => setNewReview(prev => ({ ...prev, color: e.target.value }))}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Fit</label>
            <select
              value={newReview.overallFit}
              onChange={(e) => setNewReview(prev => ({ ...prev, overallFit: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option>True to Size</option>
              <option>Runs Small</option>
              <option>Runs Large</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Images</label>
          <div className="border-2 border-dashed rounded p-4 text-center">
            <input
              type="file"
              multiple
              onChange={(e) => setSelectedImages(e.target.files)}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center gap-2">
              <Upload size={20} />
              <span>Upload Images</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};