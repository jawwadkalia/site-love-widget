import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ChevronUp, 
  Star, 
  Globe, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  Filter,
  ArrowUpDown
} from "lucide-react";

const mockCompany = {
  name: "DesignLab",
  slug: "designlab",
  description: "Beautiful design tools for modern teams. Create, collaborate, and ship faster.",
  domain: "designlab.io",
  totalVotes: 2847,
  totalReviews: 156,
  joinedDate: "January 2024",
  weeklyGrowth: 12,
};

const mockReviews = [
  {
    id: 1,
    author: "Sarah Chen",
    email: "sarah@example.com",
    content: "DesignLab has completely transformed our design workflow. The collaboration features are incredible and the export options save us hours every week. Highly recommend for any design team!",
    votes: 847,
    rating: 5,
    date: "2 days ago",
    verified: true,
    pageUrl: "designlab.io/features",
  },
  {
    id: 2,
    author: "Marcus Johnson",
    email: "marcus@techflow.io",
    content: "Clean interface, powerful features, and excellent customer support. What more could you ask for? Been using it for 6 months and it only gets better.",
    votes: 623,
    rating: 5,
    date: "1 week ago",
    verified: true,
    pageUrl: "designlab.io",
  },
  {
    id: 3,
    author: "Elena Rodriguez",
    email: "elena@growthmetrics.co",
    content: "The template library alone is worth the subscription. We've cut our design time in half since switching to DesignLab.",
    votes: 512,
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    pageUrl: "designlab.io/templates",
  },
  {
    id: 4,
    author: "David Kim",
    email: "david@indie.dev",
    content: "As a solo developer, I was skeptical about needing a full design tool. But DesignLab's simplicity won me over. Perfect balance of power and ease of use.",
    votes: 389,
    rating: 4,
    date: "3 weeks ago",
    verified: true,
    pageUrl: "designlab.io/pricing",
  },
  {
    id: 5,
    author: "Amanda Foster",
    email: "amanda@scaleup.io",
    content: "We evaluated 5 different tools and DesignLab came out on top. The real-time collaboration and version history are game changers for remote teams.",
    votes: 456,
    rating: 5,
    date: "1 month ago",
    verified: true,
    pageUrl: "designlab.io",
  },
  {
    id: 6,
    author: "James Liu",
    email: "james@devtools.com",
    content: "Great API for developers who want to integrate design workflows. Documentation is clear and the support team is responsive. Solid product overall.",
    votes: 298,
    rating: 4,
    date: "1 month ago",
    verified: true,
    pageUrl: "designlab.io/api",
  },
];

type SortOption = "recent" | "top";

export default function PublicProfile() {
  const [sortBy, setSortBy] = useState<SortOption>("top");
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(mockCompany.totalVotes);

  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === "top") return b.votes - a.votes;
    return 0; // Keep original order for "recent"
  });

  const handleVote = () => {
    if (!hasVoted) {
      setTotalVotes(v => v + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Profile Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bento-card relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative flex flex-col md:flex-row gap-8 items-start">
                {/* Company logo placeholder */}
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {mockCompany.name[0]}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {mockCompany.name}
                      </h1>
                      <p className="text-muted-foreground">
                        {mockCompany.description}
                      </p>
                    </div>

                    {/* Vote button */}
                    <button
                      onClick={handleVote}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 shrink-0 ${
                        hasVoted
                          ? "gradient-primary text-primary-foreground shadow-glow"
                          : "bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg"
                      }`}
                    >
                      <ChevronUp className={`h-5 w-5 ${hasVoted ? "animate-bounce" : ""}`} />
                      <span className="font-bold text-xl">{totalVotes.toLocaleString()}</span>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>{mockCompany.domain}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{mockCompany.totalReviews} reviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Since {mockCompany.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{mockCompany.weeklyGrowth}% this week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Verified Reviews
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={sortBy === "top" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("top")}
                  className="gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Top Rated
                </Button>
                <Button
                  variant={sortBy === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("recent")}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Most Recent
                </Button>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-4">
              {sortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bento-card group"
                >
                  <div className="flex gap-4">
                    {/* Vote column */}
                    <div className="flex flex-col items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors group-hover:text-primary">
                        <ChevronUp className="h-5 w-5" />
                      </button>
                      <span className="font-bold text-foreground">{review.votes}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Rating */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Verified
                          </span>
                        )}
                      </div>

                      {/* Review text */}
                      <p className="text-foreground leading-relaxed mb-4">
                        "{review.content}"
                      </p>

                      {/* Author info */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                            {review.author.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <span className="font-medium text-foreground">{review.author}</span>
                            <span className="text-muted-foreground mx-2">•</span>
                            <span className="text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          via {review.pageUrl}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
