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

  const totalVotes = upvotes + downvotes;

  return (
    <>
      <div className={`fixed bottom-6 ${positionClasses} z-50 animate-fade-up`}>
        <div className="bg-card border-2 border-border rounded-2xl shadow-lg px-5 py-4 flex flex-col items-center gap-2">
          {/* Vote Buttons Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVoteClick("upvote")}
              disabled={!!userVote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                userVote === "upvote"
                  ? "bg-primary text-primary-foreground"
                  : userVote
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <ChevronUp className="h-4 w-4" />
              <span>Upvote</span>
            </button>

            <button
              onClick={() => handleVoteClick("downvote")}
              disabled={!!userVote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                userVote === "downvote"
                  ? "bg-destructive text-destructive-foreground"
                  : userVote
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/20"
              }`}
            >
              <ChevronDown className="h-4 w-4" />
              <span>Downvote</span>
            </button>
          </div>

          {/* Vote Count */}
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{totalVotes.toLocaleString()}</span> people have voted
          </p>

          {/* Powered By */}
          <a
            href={brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
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
