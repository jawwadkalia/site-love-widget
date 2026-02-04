import { 
  Zap, 
  Shield, 
  BarChart3, 
  Palette, 
  Globe, 
  Mail,
  Sparkles,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Magic Link Auth",
    description: "No passwords needed. Voters verify via email in seconds, ensuring authentic reviews from real users.",
    size: "large",
  },
  {
    icon: Shield,
    title: "Bot Protection",
    description: "Built-in rate limiting and IP verification prevents spam and fake votes.",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track votes, views, and conversion rates with beautiful dashboards.",
    size: "small",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Match your brand with custom colors, positions, and CTA text. The widget adapts to your design.",
    size: "medium",
  },
  {
    icon: Globe,
    title: "SEO-Optimized Pages",
    description: "Public profile pages that rank on Google and showcase your social proof.",
    size: "medium",
  },
  {
    icon: Mail,
    title: "Follow-up System",
    description: "Request review updates from voters to keep testimonials fresh and relevant.",
    size: "small",
  },
  {
    icon: Lock,
    title: "Private Reviews",
    description: "Keep sensitive feedback internal with Pro privacy controls.",
    size: "small",
  },
  {
    icon: Sparkles,
    title: "One Line Install",
    description: "Just paste a <script> tag. Works on any website, no code changes needed.",
    size: "large",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to collect{" "}
            <span className="text-gradient">social proof</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete toolkit for gathering, managing, and displaying verified customer feedback.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            const isMedium = feature.size === "medium";
            
            return (
              <div
                key={index}
                className={`bento-card group ${
                  isLarge ? "lg:col-span-2" : ""
                } ${isMedium ? "lg:col-span-2" : ""}`}
              >
                <div className={`flex ${isLarge ? "flex-row items-start gap-6" : "flex-col"}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={isLarge ? "" : "mt-4"}>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
