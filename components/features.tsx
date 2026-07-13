import { TrendingDown, Zap, Gauge } from "lucide-react";

const features = [
  {
    icon: TrendingDown,
    title: "90% Savings",
    description: "Drastically reduce overhead by bypassing retail markups.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Prompt Caching",
    description: "Lower data costs instantly.",
    color: "text-primary",
  },
  {
    icon: Gauge,
    title: "Daily Limits",
    description: "Control your budget.",
    color: "text-primary",
  },
];

export function Features() {
  return (
    <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid sm:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, description, color }) => (
          <div
            key={title}
            className="group rounded-xl border border-border bg-surface p-6 hover:bg-surface-hover hover:border-foreground/20 transition-colors"
          >
            <Icon className={`h-6 w-6 ${color} mb-4`} />
            <h3 className="font-medium mb-1.5">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
