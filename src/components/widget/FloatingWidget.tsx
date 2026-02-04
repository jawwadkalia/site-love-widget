import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { VoteModal } from "@/components/modals/VoteModal";

interface FloatingWidgetProps {
  initialVotes?: number;
  position?: "bottom-right" | "bottom-left";
}

export function FloatingWidget({ 
  initialVotes = 2847, 
  position = "bottom-right" 
}: FloatingWidgetProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!hasVoted) {
      setShowModal(true);
    }
  };

  const handleVoteSubmit = (email: string) => {
    // In real app, this would be handled after email verification
    console.log("Vote submitted for:", email);
    setVotes(v => v + 1);
    setHasVoted(true);
  };

  const positionClasses = position === "bottom-right" 
    ? "right-6" 
    : "left-6";

  return (
    <>
      <div className={`fixed bottom-6 ${positionClasses} z-50 animate-fade-up`}>
        <button
          onClick={handleClick}
          className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ${
            hasVoted
              ? "gradient-primary text-primary-foreground shadow-glow scale-105"
              : "bg-card border-2 border-border hover:border-primary/50 hover:shadow-xl hover:scale-105"
          }`}
        >
          <ChevronUp className={`h-5 w-5 ${hasVoted ? "animate-bounce" : ""}`} />
          <span className="font-bold text-lg">{votes.toLocaleString()}</span>
          {!hasVoted && (
            <span className="text-sm text-muted-foreground font-medium">Upvote</span>
          )}
          {hasVoted && (
            <span className="text-sm font-medium">Voted!</span>
          )}
        </button>
      </div>

      <VoteModal 
        open={showModal} 
        onOpenChange={setShowModal}
        onSubmit={handleVoteSubmit}
      />
    </>
  );
}
