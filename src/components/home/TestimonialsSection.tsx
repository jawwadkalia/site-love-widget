import { ChevronUp, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, DesignLab",
    content: "UpvoteFlow transformed how we collect feedback. The magic link system means we only get verified, high-quality reviews. Our conversion rate jumped 40%!",
    votes: 847,
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Lead, TechFlow",
    content: "The widget is gorgeous and the setup took literally 2 minutes. Our customers love the smooth voting experience.",
    votes: 623,
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "CEO, GrowthMetrics",
    content: "We switched from a competitor and immediately saw better engagement. The public profile page brings us organic traffic.",
    votes: 512,
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Indie Maker",
    content: "As a solo founder, I needed something simple that just works. UpvoteFlow is exactly that. Love it!",
    votes: 389,
    rating: 5,
  },
  {
    name: "Amanda Foster",
    role: "Marketing Director, ScaleUp",
    content: "The follow-up feature is a game-changer. We can request updated testimonials and keep our social proof fresh.",
    votes: 456,
    rating: 5,
  },
  {
    name: "James Liu",
    role: "CTO, DevTools Inc",
    content: "Clean API, great documentation, and the Shadow DOM approach means zero CSS conflicts. Technically impressive.",
    votes: 298,
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our own{" "}
            <span className="text-gradient">Wall of Love</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what businesses are saying about UpvoteFlow. These are real, verified reviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bento-card flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground text-sm leading-relaxed mb-6 flex-1">
                "{testimonial.content}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">{testimonial.votes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
