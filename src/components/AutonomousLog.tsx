import { Sparkles, ScanSearch, Users, Mail, CalendarClock, FileEdit } from "lucide-react";

const items = [
  { icon: ScanSearch, text: "Scanned 1,247 MLS updates", meta: "23 matched your buyers", tone: "ai" },
  { icon: Users, text: "Re-scored 47 leads on behavior", meta: "4 promoted to High Intent", tone: "primary" },
  { icon: FileEdit, text: "Drafted 6 personalized follow-ups", meta: "Awaiting your review", tone: "warning" },
  { icon: CalendarClock, text: "Resolved 2 calendar conflicts", meta: "Sent reschedule options", tone: "success" },
  { icon: Mail, text: "Refreshed 3 listing valuations", meta: "1 needs price update", tone: "destructive" },
];

const toneClass: Record<string, string> = {
  ai: "bg-ai/10 text-ai",
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
};

export const AutonomousLog = () => {
  return (
    <section className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden">
      <header className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b border-border/60 bg-gradient-to-r from-background to-accent/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-ai shadow-glow flex items-center justify-center text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-tight">While you were away</h2>
            <p className="text-xs text-muted-foreground">Last 8 hours · fully autonomous</p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold rounded-full bg-success/10 text-success px-2.5 py-1">
          Live
        </span>
      </header>
      <ul className="divide-y divide-border/60">
        {items.map((it, i) => (
          <li
            key={it.text}
            className="flex items-center gap-3 px-5 md:px-6 py-3 hover:bg-accent/40 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClass[it.tone]}`}>
              <it.icon className="h-4 w-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground/90 truncate">{it.text}</div>
              <div className="text-xs text-muted-foreground truncate">{it.meta}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
