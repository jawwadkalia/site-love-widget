import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Star, MessageSquare, Lock } from "lucide-react";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReviewData) => void;
}

export interface ReviewData {
  email: string;
  rating: number;
  review: string;
  privateFeedback?: string;
}

export function ReviewModal({ open, onOpenChange, onSubmit }: ReviewModalProps) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [privateFeedback, setPrivateFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !rating || !review) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit({ email, rating, review, privateFeedback });
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setRating(0);
    setReview("");
    setPrivateFeedback("");
    setIsSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary-foreground" />
              </div>
              <DialogTitle className="text-center text-xl">
                Write a Review
              </DialogTitle>
              <DialogDescription className="text-center">
                Share your experience and help others make better decisions.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Star Rating */}
              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="What did you like? What could be better?"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Private Feedback */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="privateFeedback">Private Feedback</Label>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Optional, only visible to the team
                  </span>
                </div>
                <Textarea
                  id="privateFeedback"
                  placeholder="Any private suggestions or concerns..."
                  value={privateFeedback}
                  onChange={(e) => setPrivateFeedback(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send a link to verify your submission.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={isSubmitting || !rating}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-xl mb-2">Check your inbox!</DialogTitle>
            <DialogDescription>
              We've sent a verification link to <strong>{email}</strong>. 
              Click the link to publish your review.
            </DialogDescription>
            <Button variant="outline" className="mt-6" onClick={handleClose}>
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
