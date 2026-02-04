import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { VoteModal } from "@/components/modals/VoteModal";

export type VoteType = "upvote" | "downvote";

interface FloatingWidgetProps {
  initialUpvotes?: number;
  initialDownvotes?: number;
  position?: "bottom-right" | "bottom-left";
  brandName?: string;
  brandUrl?: string;
}

export function FloatingWidget({ 
  initialUpvotes = 2847,
  initialDownvotes = 124,
  position = "bottom-right",
  brandName = "UpvoteFlow",
  brandUrl = "https://upvoteflow.com"
}: FloatingWidgetProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingVote, setPendingVote] = useState<VoteType | null>(null);

  const handleVoteClick = (type: VoteType) => {
    if (userVote) return; // Already voted
    setPendingVote(type);
    setShowModal(true);
  };

  const handleVoteSubmit = (email: string) => {
    if (!pendingVote) return;
    
    console.log(`${pendingVote} submitted for:`, email);
    
    if (pendingVote === "upvote") {
      setUpvotes(v => v + 1);
    } else {
      setDownvotes(v => v + 1);
    }
    
    setUserVote(pendingVote);
    setPendingVote(null);
  };

  const handleModalClose = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      setPendingVote(null);
    }
  };

  const positionClasses = position === "bottom-right" 
    ? "right-6" 
    : "left-6";

  const score = upvotes - downvotes;

  return (
    <>
      <div className={`fixed bottom-6 ${positionClasses} z-50 animate-fade-up`}>
        <div className="flex flex-col items-center gap-2">
          {/* Main Widget */}
          <div className="flex items-center bg-card border-2 border-border rounded-2xl shadow-lg overflow-hidden">
            {/* Upvote Button */}
            <button
              onClick={() => handleVoteClick("upvote")}
              disabled={!!userVote}
              className={`flex flex-col items-center justify-center px-4 py-3 transition-all duration-200 border-r border-border ${
                userVote === "upvote"
                  ? "bg-primary/10 text-primary"
                  : userVote
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <ChevronUp className={`h-5 w-5 ${userVote === "upvote" ? "animate-bounce" : ""}`} />
              <span className="text-xs font-medium mt-0.5">{upvotes.toLocaleString()}</span>
            </button>

            {/* Score Display */}
            <div className="px-4 py-3 flex flex-col items-center justify-center min-w-[60px]">
              <span className={`text-lg font-bold ${score >= 0 ? "text-primary" : "text-destructive"}`}>
                {score >= 0 ? "+" : ""}{score.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Score</span>
            </div>

            {/* Downvote Button */}
            <button
              onClick={() => handleVoteClick("downvote")}
              disabled={!!userVote}
              className={`flex flex-col items-center justify-center px-4 py-3 transition-all duration-200 border-l border-border ${
                userVote === "downvote"
                  ? "bg-destructive/10 text-destructive"
                  : userVote
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-destructive/5 hover:text-destructive"
              }`}
            >
              <ChevronDown className={`h-5 w-5 ${userVote === "downvote" ? "animate-bounce" : ""}`} />
              <span className="text-xs font-medium mt-0.5">{downvotes.toLocaleString()}</span>
            </button>
          </div>

          {/* Powered By Branding */}
          <a
            href={brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            Powered by <span className="font-medium">{brandName}</span>
          </a>
        </div>
      </div>

      <VoteModal 
        open={showModal} 
        onOpenChange={handleModalClose}
        onSubmit={handleVoteSubmit}
        voteType={pendingVote}
      />
    </>
  );
}
