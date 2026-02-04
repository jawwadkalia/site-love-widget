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
import { Mail, ChevronUp, ChevronDown } from "lucide-react";
import type { VoteType } from "@/components/widget/FloatingWidget";

interface VoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (email: string) => void;
  voteType?: VoteType | null;
}

export function VoteModal({ open, onOpenChange, onSubmit, voteType = "upvote" }: VoteModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isUpvote = voteType === "upvote";
  const VoteIcon = isUpvote ? ChevronUp : ChevronDown;
  const voteLabel = isUpvote ? "upvote" : "downvote";
  const accentClass = isUpvote ? "gradient-primary" : "bg-destructive";
  const iconBgClass = isUpvote ? "bg-primary/10" : "bg-destructive/10";
  const iconTextClass = isUpvote ? "text-primary" : "text-destructive";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit(email);
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <div className={`mx-auto w-16 h-16 rounded-full ${accentClass} flex items-center justify-center mb-4`}>
                <VoteIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <DialogTitle className="text-center text-xl">
                Verify your {voteLabel}
              </DialogTitle>
              <DialogDescription className="text-center">
                We'll send you a magic link to verify your {voteLabel}. No password needed!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                variant={isUpvote ? "hero" : "destructive"}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Verification Link"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By voting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className={`mx-auto w-16 h-16 rounded-full ${iconBgClass} flex items-center justify-center mb-4`}>
              <Mail className={`h-8 w-8 ${iconTextClass}`} />
            </div>
            <DialogTitle className="text-xl mb-2">Check your inbox!</DialogTitle>
            <DialogDescription>
              We've sent a verification link to <strong>{email}</strong>. 
              Click the link to confirm your {voteLabel}.
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
