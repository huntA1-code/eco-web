
import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchReviews, addReview, toggleHelpful, toggleReactionReview, type ReviewData } from '@/api/reviews';
import { format } from "date-fns";
import { useLocation } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("product");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [showLocalReviews, setShowLocalReviews] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const productId = location.pathname.split('/').pop() || 'default';

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    images: [] as File[],
  });

  // Calculate average rating and distribution
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter(review => review.rating === i + 1).length;
    return (count / reviews.length) * 100 || 0;
  }).reverse();

  const handleRatingChange = async (rating: string) => {
    setSelectedRating(rating);
    try {
      setIsLoading(true);
      const fetchedReviews = await fetchReviews(productId, {
        isStoreReview: activeTab === "store",
        rating: rating === "all" ? undefined : Number(rating),
        sortBy,
      });
      setReviews(fetchedReviews);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = async (newSortBy: 'recent' | 'highest' | 'lowest') => {
    setSortBy(newSortBy);
    try {
      setIsLoading(true);
      const fetchedReviews = await fetchReviews(productId, {
        isStoreReview: activeTab === "store",
        rating: selectedRating === "all" ? undefined : Number(selectedRating),
        sortBy: newSortBy,
      });
      setReviews(fetchedReviews);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    try {
      setIsLoading(true);
      const fetchedReviews = await fetchReviews(productId, {
        isStoreReview: value === "store",
        rating: selectedRating === "all" ? undefined : Number(selectedRating),
        sortBy,
      });
      setReviews(fetchedReviews);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const handleReactionClick = async (reviewId: number, reaction: 'like' | 'dislike') => {
    try {
      setIsLoading(true);
      const { likes, dislikes } = await toggleReactionReview(reviewId, reaction);
      
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? { ...review, likes, dislikes }
            : review
        )
      );

      toast({
        title: "Thanks for your feedback",
        description: "Your reaction has been recorded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update reaction",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewReview(prev => ({
        ...prev,
        images: [...Array.from(event.target.files || [])],
      }));
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Create FormData with review data and images
      const formData = new FormData();
      formData.append('user', 'Current User');
      formData.append('rating', newReview.rating.toString());
      formData.append('comment', newReview.comment);
      
      // Add images to FormData
      if (newReview.images && newReview.images.length > 0) {
        newReview.images.forEach((file: File) => {
          formData.append('images', file);
        });
      }

      const addedReview = await addReview(productId, formData);
      setReviews(prev => [addedReview, ...prev]);
      
      setNewReview({
        rating: 5,
        comment: '',
        images: [],
      });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold font-serif">Customer Reviews</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="max-w-md mx-auto space-y-2">
              {ratingDistribution.map((percentage, index) => (
                <div key={5 - index} className="flex items-center gap-4">
                  <span className="w-16 text-sm">{5 - index} stars</span>
                  <Progress value={percentage} className="h-2" />
                  <span className="w-16 text-sm text-right">{percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600">Show Local Reviews</span>
              <Switch
                checked={showLocalReviews}
                onCheckedChange={setShowLocalReviews}
              />
            </div>
          </div>

          <Tabs defaultValue="product" className="w-full" onValueChange={handleTabChange}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="product">Product Reviews</TabsTrigger>
                <TabsTrigger value="store">Store Reviews</TabsTrigger>
              </TabsList>
              
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>Write a Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                            className="text-2xl"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                rating <= newReview.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Your Review</label>
                      <Textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Write your review here..."
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Images (optional)</label>
                      <div className="border-2 border-dashed rounded-lg p-4">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <Upload className="w-6 h-6 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Click to upload images
                          </span>
                        </label>
                      </div>
                      {newReview.images.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto">
                          {newReview.images.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Upload ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setNewReview(prev => ({
                                    ...prev,
                                    images: prev.images.filter((_, i) => i !== index),
                                  }));
                                }}
                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      Submit Review
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-4 mb-6">
              <Select value={selectedRating} onValueChange={handleRatingChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by rating" />
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

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.userImage || "/placeholder.svg"}
                        alt={review.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{review.user}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {format(new Date(review.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReactionClick(review.id, 'like')}
                        className="gap-2"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.likes || 0}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReactionClick(review.id, 'dislike')}
                        className="gap-2"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>{review.dislikes || 0}</span>
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {review.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Review ${review.id} image ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleHelpfulClick(review.id, review.isHelpful)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full text-sm
                        ${review.isHelpful
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                        transition-colors duration-200
                      `}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpfulCount})</span>
                    </button>
                    {review.isVerifiedPurchase && (
                      <span className="text-sm text-green-600 font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No reviews yet. Be the first to write a review!
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Reviews;
