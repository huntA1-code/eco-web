import React, { useState, useCallback } from 'react';
import { Star, ThumbsUp, Upload, MessageSquare, User } from 'lucide-react';
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface StoreReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  isHelpful?: boolean;
  avatar?: string;
}

interface StoreReviewsProps {
  storeId: string;
  storeName: string;
}

export const StoreReviews = ({ storeId, storeName }: StoreReviewsProps) => {
  const [reviews, setReviews] = useState<StoreReview[]>([
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      comment: "Amazing store! Great selection of products and excellent customer service. Fast shipping and quality items. Highly recommended!",
      date: "2024-02-15",
      helpfulCount: 24,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      user: "Mike Chen",
      rating: 4,
      comment: "Good experience overall. Products are as described and delivery was on time. Will shop here again.",
      date: "2024-02-14",
      helpfulCount: 18,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      user: "Emma Davis",
      rating: 5,
      comment: "Excellent store with top-notch products. The quality exceeded my expectations and the customer support was very helpful.",
      date: "2024-02-13",
      helpfulCount: 31,
      avatar: "/placeholder.svg"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    userName: ''
  });

  // Calculate overall rating
  const overallRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  // Rating distribution for the progress bars
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const handleRatingFilter = (rating: string) => {
    setSelectedRating(rating);
  };

  const filteredReviews = selectedRating === "all" 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedRating));

  const handleHelpfulClick = useCallback(async (reviewId: number, currentIsHelpful: boolean | undefined) => {
    try {
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? {
                ...review,
                helpfulCount: currentIsHelpful 
                  ? review.helpfulCount - 1 
                  : review.helpfulCount + 1,
                isHelpful: !currentIsHelpful
              }
            : review
        )
      );

      toast({
        title: currentIsHelpful ? "Removed from helpful" : "Marked as helpful",
        description: currentIsHelpful ? "Review unmarked as helpful" : "Thank you for your feedback!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update helpful status",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0 || !newReview.comment.trim() || !newReview.userName.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const review: StoreReview = {
        id: Date.now(),
        user: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        helpfulCount: 0,
        avatar: "/placeholder.svg"
      };

      setReviews(prevReviews => [review, ...prevReviews]);
      setNewReview({ rating: 0, comment: '', userName: '' });
      setDialogOpen(false);
      
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your feedback about this store.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Store Reviews</h2>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Write a Review for {storeName}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Overall Rating</Label>
                <div className="mt-2">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with this store..."
                  className="mt-1 min-h-[120px] resize-none"
                  maxLength={500}
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {newReview.comment.length}/500 characters
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="text-4xl font-bold text-foreground mb-2">{overallRating.toFixed(1)}</div>
          <div className="mb-2">{renderStars(Math.round(overallRating))}</div>
          <div className="text-sm text-muted-foreground">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </div>
              <Progress value={percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Tabs value={selectedRating} onValueChange={handleRatingFilter} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-6 sm:w-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="5" className="text-xs sm:text-sm">5★</TabsTrigger>
            <TabsTrigger value="4" className="text-xs sm:text-sm">4★</TabsTrigger>
            <TabsTrigger value="3" className="text-xs sm:text-sm">3★</TabsTrigger>
            <TabsTrigger value="2" className="text-xs sm:text-sm">2★</TabsTrigger>
            <TabsTrigger value="1" className="text-xs sm:text-sm">1★</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reviews found for the selected rating.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <Card key={review.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium text-foreground">{review.user}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-3 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHelpfulClick(review.id, review.isHelpful)}
                        className={`text-xs h-8 ${
                          review.isHelpful 
                            ? 'text-primary bg-primary/10' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpfulCount})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};