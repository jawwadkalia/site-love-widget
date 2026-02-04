import { useState } from "react";
import { Star } from "lucide-react";
import { ReviewModal, ReviewData } from "@/components/modals/ReviewModal";

interface ReviewWidgetProps {
  position?: "bottom-right" | "bottom-left";
  brandName?: string;
  brandUrl?: string;
  onSubmit?: (data: ReviewData) => void;
}

export function ReviewWidget({
  position = "bottom-right",
  brandName = "VoteBox",
  brandUrl = "https://votebox.io",
  onSubmit,
}: ReviewWidgetProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const positionClasses = position === "bottom-right" 
    ? "right-6" 
    : "left-6";

  const handleStarClick = (star: number) => {
    setSelectedRating(star);
    setShowModal(true);
  };

  const handleSubmit = (data: ReviewData) => {
    onSubmit?.(data);
    setSelectedRating(0);
  };

  const handleModalClose = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      setSelectedRating(0);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 ${positionClasses} z-50 animate-fade-up`}>
        <div className="bg-card border-2 border-border rounded-2xl shadow-lg px-5 py-4 flex flex-col items-center gap-2">
          {/* Stars Row */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hoveredStar || selectedRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Label */}
          <p className="text-xs text-muted-foreground">
            Click to leave a review
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

      <ReviewModal
        open={showModal}
        onOpenChange={handleModalClose}
        onSubmit={handleSubmit}
        initialRating={selectedRating}
      />
    </>
  );
}
