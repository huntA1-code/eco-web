import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const recentReviews = [
  {
    id: 1,
    customer: "John Doe",
    product: "Premium T-Shirt",
    rating: 5,
    comment: "Excellent quality and perfect fit!",
    date: "2024-02-05",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "Designer Jeans",
    rating: 4,
    comment: "Great jeans, but slightly longer than expected.",
    date: "2024-02-04",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    product: "Running Shoes",
    rating: 5,
    comment: "Best running shoes I've ever owned!",
    date: "2024-02-03",
  },
];

const customerQuestions = [
  {
    id: 1,
    customer: "Alice Brown",
    product: "Premium T-Shirt",
    question: "Does this come in other colors?",
    date: "2024-02-05",
  },
  {
    id: 2,
    customer: "Bob Wilson",
    product: "Designer Jeans",
    question: "What's the inseam length for size 32?",
    date: "2024-02-04",
  },
];

export const CustomerFeedback = () => {
  console.log("Rendering CustomerFeedback component");
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Reviews</CardTitle>
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-3 bg-secondary/5 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.customer}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{review.product}</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Customer Questions</CardTitle>
            <Badge variant="secondary">{customerQuestions.length} Unanswered</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {customerQuestions.map((question) => (
                <div
                  key={question.id}
                  className="p-3 bg-secondary/5 rounded-lg space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">{question.customer}</span>
                  </div>
                  <p className="text-sm">{question.question}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{question.product}</span>
                    <span>{new Date(question.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};