import { TrendingUp, Users, Calendar, Sparkles, Target, Flame, BellRing } from "lucide-react";
import { todayMetrics, monthlyGoals, type Goal } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

const toneRing: Record<Goal["tone"], string> = {
  primary: "stroke-primary",
  ai: "stroke-ai",
  success: "stroke-success",
  warning: "stroke-warning",
};

const toneText: Record<Goal["tone"], string> = {
  primary: "text-primary",
  ai: "text-ai",
  success: "text-success",
  warning: "text-warning",
};

const ProgressRing = ({ pct, tone }: { pct: number; tone: Goal["tone"] }) => {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-16 -rotate-90">
      <circle cx="36" cy="36" r={r} className="stroke-muted fill-none" strokeWidth="6" />
      <circle
        cx="36"
        cy="36"
        r={r}
        className={cn("fill-none transition-all duration-1000", toneRing[tone])}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export const KeyMetrics = () => {
  const stats = [
    { label: "New leads today", value: todayMetrics.newLeadsToday, icon: Users, tone: "text-primary bg-primary/10" },
    { label: "Hot intent", value: todayMetrics.leadsHot, icon: Flame, tone: "text-destructive bg-destructive/10", pulse: true },
    { label: "Appointments", value: todayMetrics.appointments, icon: Calendar, tone: "text-ai bg-ai/10" },
    { label: "Follow-ups due", value: todayMetrics.followUpsDue, icon: BellRing, tone: "text-warning bg-warning/10" },
    { label: "MLS matches", value: todayMetrics.newMlsMatches, icon: Sparkles, tone: "text-success bg-success/10" },
    { label: "Closings this wk", value: todayMetrics.closing, icon: TrendingUp, tone: "text-primary bg-primary/10" },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display font-bold text-xl flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's pulse
          </h2>
          <p className="text-sm text-muted-foreground">AI-scored lead signals + monthly GCI pacing.</p>
        </div>
        <span className="text-xs font-medium text-muted-foreground hidden md:inline">
          Updated {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </span>
      </div>

      {/* Top stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((m, i) => (
          <button
            key={m.label}
            type="button"
            className="group text-left rounded-2xl border border-border bg-card p-4 cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all animate-fade-in-up relative overflow-hidden"
            style={{ animationDelay: `${i * 50}ms` }}
            aria-label={`Drill into ${m.label}`}
          >
            <div className={cn("inline-flex h-9 w-9 items-center justify-center rounded-xl", m.tone, m.pulse && "animate-pulse")}>
              <m.icon className="h-4 w-4" />
            </div>
            <div className="mt-3 text-3xl font-display font-extrabold tabular-nums">{m.value}</div>
            <div className="text-xs text-muted-foreground font-medium leading-tight">{m.label}</div>
            <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Drill in →
            </span>
          </button>
        ))}
      </div>

      {/* Progress vs target */}
      <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-card to-accent/30 p-5 md:p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-ai" />
            Monthly target progress
          </h3>
          <span className="text-xs text-muted-foreground">11 days remaining</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyGoals.map((g, i) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100));
            return (
              <div
                key={g.label}
                className="flex items-center gap-3 rounded-2xl bg-card border border-border/60 p-3 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative">
                  <ProgressRing pct={pct} tone={g.tone} />
                  <span className={cn("absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums", toneText[g.tone])}>
                    {pct}%
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">{g.label}</div>
                  <div className="font-display font-bold text-lg tabular-nums">
                    {g.current}
                    <span className="text-sm text-muted-foreground font-medium"> / {g.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
