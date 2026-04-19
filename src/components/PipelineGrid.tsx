import { Flame, Calendar, Home, FileText, Heart, Zap, ArrowUpRight } from "lucide-react";
import { pipeline } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const iconMap = [Heart, Flame, FileText, Calendar, Home, Zap];

const toneMap: Record<string, string> = {
  warning: "from-warning/20 to-warning/5 text-warning border-warning/30",
  primary: "from-primary/20 to-primary/5 text-primary border-primary/30",
  success: "from-success/20 to-success/5 text-success border-success/30",
  ai: "from-ai/20 to-ai/5 text-ai border-ai/30",
  destructive: "from-destructive/20 to-destructive/5 text-destructive border-destructive/30",
};

export const PipelineGrid = () => {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-xl">Your agentic workspace</h2>
          <p className="text-sm text-muted-foreground">Lead scoring, follow-ups, deals — your AI team is running them in the background.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {pipeline.map((m, i) => {
          const Icon = iconMap[i % iconMap.length];
          return (
            <button
              key={m.label}
              className="group relative text-left rounded-2xl border border-border bg-card p-4 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={cn("absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity", toneMap[m.tone])} />
              <div className="relative">
                <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-xl border bg-card", toneMap[m.tone])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-3xl font-display font-extrabold tracking-tight">{m.count}</div>
                <div className="mt-1 text-sm font-semibold leading-tight">{m.label}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-snug">{m.hint}</div>
                <ArrowUpRight className="absolute top-0 right-0 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
