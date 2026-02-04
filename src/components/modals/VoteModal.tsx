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
import { Mail, ChevronUp } from "lucide-react";

interface VoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (email: string) => void;
}

export function VoteModal({ open, onOpenChange, onSubmit }: VoteModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
              <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                <ChevronUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <DialogTitle className="text-center text-xl">
                Verify your vote
              </DialogTitle>
              <DialogDescription className="text-center">
                We'll send you a magic link to verify your vote. No password needed!
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
                variant="hero"
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
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-xl mb-2">Check your inbox!</DialogTitle>
            <DialogDescription>
              We've sent a verification link to <strong>{email}</strong>. 
              Click the link to confirm your vote.
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
