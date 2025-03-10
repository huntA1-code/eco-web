import React, { useState, useCallback } from 'react';
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchReviews, addReview, toggleHelpful, type ReviewData } from '@/api/reviews';
import { useLocation } from 'react-router-dom';

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
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const productId = decodeURIComponent(location.pathname.split('/').pop() || '');

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    size: '',
    color: '',
    overallFit: 'True to Size',
  });
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const colorHexMap: Record<string, string> = {
    'Hot Pink': '#FF69B4',
    'Navy': '#000080',
    'Forest Green': '#228B22',
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      setSelectedImages(e.target.files);
    }
  };

  const handleHelpfulClick = async (reviewId: number, currentIsHelpful: boolean | undefined) => {
    try {
      setIsLoading(true);
      const { helpfulCount } = await toggleHelpful(reviewId, !currentIsHelpful);
      
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? { ...review, helpfulCount, isHelpful: !currentIsHelpful }
            : review
        )
      );

      toast({
        title: currentIsHelpful ? "Removed helpful mark" : "Marked as helpful",
        description: currentIsHelpful ? "Your feedback has been removed" : "Thank you for your feedback!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update helpful status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const reviewData = {
        user: "Current User",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
        size: newReview.size,
        color: newReview.color,
        overallFit: newReview.overallFit,
        images: selectedImages ? Array.from(selectedImages).map(file => URL.createObjectURL(file)) : [],
      };

      const addedReview = await addReview(productId, reviewData);
      setReviews(prev => [...prev, addedReview]);
      
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const overallRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2);

  const fitDistribution = {
    small: 4,
    trueToSize: 94,
    large: 2
  };

  const handleRatingFilter = (rating: string) => {
    setSelectedRating(rating);
    if (rating === "all") {
      setReviews(initialReviews);
    } else {
      const filteredReviews = initialReviews.filter(review => 
        review.rating === parseInt(rating)
      );
      setReviews(filteredReviews);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'color') {
      setSelectedColor(value);
    } else if (filterType === 'size') {
      setSelectedSize(value);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (selectedTab === "images" && (!review.images || review.images.length === 0)) {
      return false;
    }
    if (selectedColor !== "all" && review.color !== selectedColor) {
      return false;
    }
    if (selectedSize !== "all" && review.size !== selectedSize) {
      return false;
    }
    if (selectedRating !== "all" && review.rating !== parseInt(selectedRating)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold">Customer Reviews</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{overallRating}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
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
                      onChange={handleImageChange}
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

        <div className="space-y-3">
          <h4 className="font-medium">Fit Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm">Small</span>
              <Progress value={fitDistribution.small} className="flex-1" />
              <span className="text-sm w-12">{fitDistribution.small}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm">True to Size</span>
              <Progress value={fitDistribution.trueToSize} className="flex-1 bg-gray-200 [&>div]:bg-black" />
              <span className="text-sm w-12">{fitDistribution.trueToSize}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 text-sm">Large</span>
              <Progress value={fitDistribution.large} className="flex-1" />
              <span className="text-sm w-12">{fitDistribution.large}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Tabs 
            defaultValue="all" 
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                All Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="images"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Images
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-3">
              <Select value={selectedRating} onValueChange={handleRatingFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedColor} onValueChange={(value) => handleFilterChange('color', value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSize} onValueChange={(value) => handleFilterChange('size', value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      Size {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Tabs>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
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
                    onClick={() => handleHelpfulClick(review.id, review.isHelpful)}
                    disabled={isLoading}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                      transition-all duration-200 text-sm font-medium
                      ${review.isHelpful 
                        ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    <ThumbsUp 
                      size={14} 
                      className={`transition-transform duration-200 ${
                        review.isHelpful 
                          ? 'fill-primary transform scale-110' 
                          : 'transform scale-100'
                      }`}
                    />
                    <span>
                      {review.isHelpful ? 'Helpful' : 'Helpful'} ({review.helpfulCount})
                    </span>
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews match your selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
