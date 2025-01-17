import React, { useState } from 'react';
import { Star, ThumbsUp, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  availableSizes: string[];
  availableColors: string[];
}

export const CustomerReviews = ({ reviews: initialReviews, availableSizes, availableColors }: CustomerReviewsProps) => {
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
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif font-semibold">Customer Reviews</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Write a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4">
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
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Size</label>
                  <Select 
                    value={newReview.size} 
                    onValueChange={(value) => setNewReview(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Color</label>
                  <Select 
                    value={newReview.color} 
                    onValueChange={(value) => setNewReview(prev => ({ ...prev, color: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Fit</label>
                  <Select 
                    value={newReview.overallFit} 
                    onValueChange={(value) => setNewReview(prev => ({ ...prev, overallFit: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True to Size">True to Size</SelectItem>
                      <SelectItem value="Runs Small">Runs Small</SelectItem>
                      <SelectItem value="Runs Large">Runs Large</SelectItem>
                    </SelectContent>
                  </Select>
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

              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
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
    </div>
  );
};