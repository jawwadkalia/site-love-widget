import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronUp, Star } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const [votes, setVotes] = useState(2847);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(v => v + 1);
      setHasVoted(true);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Star className="h-4 w-4 fill-primary" />
              Trusted by 5,000+ businesses
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Turn visitors into a{" "}
              <span className="text-gradient">Wall of Love</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Embed a beautiful upvote widget on any website. Collect verified reviews with magic link authentication. No passwords, just trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline" size="xl" className="group">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> from 2,000+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right - Interactive widget demo */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {/* Mock browser window */}
            <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-lg px-4 py-1.5 text-sm text-muted-foreground text-center">
                    yourwebsite.com
                  </div>
                </div>
              </div>

              {/* Mock website content */}
              <div className="p-8 min-h-[400px] relative bg-gradient-to-br from-background to-muted/30">
                <div className="space-y-4 opacity-40">
                  <div className="h-8 w-48 bg-muted rounded-lg" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                  <div className="h-32 w-full bg-muted rounded-xl mt-6" />
                </div>

                {/* The floating widget */}
                <div className="absolute bottom-6 right-6">
                  <button
                    onClick={handleVote}
                    className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ${
                      hasVoted
                        ? "gradient-primary text-primary-foreground shadow-glow scale-105"
                        : "bg-card border-2 border-border hover:border-primary/50 hover:shadow-xl"
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
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 animate-float">
              <div className="bg-card rounded-2xl shadow-card border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">+127 votes</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 animate-float" style={{ animationDelay: "1s" }}>
              <div className="bg-card rounded-2xl shadow-card border border-border p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold text-sm">"Best tool ever!"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
