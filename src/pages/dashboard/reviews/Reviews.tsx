
import { useState, useEffect } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { fetchReviews, type ReviewData } from "@/api/reviews";
import { format } from "date-fns";

const DashboardReviews = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("product");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const { toast } = useToast();

  useEffect(() => {
    fetchReviewData();
  }, [activeTab, selectedRating, sortBy]);

  const fetchReviewData = async () => {
    try {
      setIsLoading(true);
      const fetchedReviews = await fetchReviews('default', {
        isStoreReview: activeTab === "store",
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

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;
  const verifiedReviews = reviews.filter(review => review.isVerifiedPurchase).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Review Management</h2>
        <p className="text-muted-foreground">
          Monitor and manage customer reviews for your products and store.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{totalReviews}</h3>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{verifiedReviews}</h3>
              <p className="text-sm text-muted-foreground">Verified Reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="product" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="product">Product Reviews</TabsTrigger>
                <TabsTrigger value="store">Store Reviews</TabsTrigger>
              </TabsList>

              <div className="flex gap-4">
                <Select value={selectedRating} onValueChange={setSelectedRating}>
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

                <Select value={sortBy} onValueChange={setSortBy}>
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
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No reviews found.
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
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
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.date), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{review.dislikes || 0}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{review.comment}</p>

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

                    {review.isVerifiedPurchase && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReviews;
