import { useState } from "react";
import { Calendar, MapPin, Clock, ChevronRight, Phone, Home, FileSignature, DoorOpen, Video } from "lucide-react";
import { todaysAppointments, type Appointment } from "@/data/dashboardData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const typeIcon = (t: Appointment["type"]) => {
  switch (t) {
    case "showing": return Home;
    case "call": return Phone;
    case "closing": return FileSignature;
    case "open-house": return DoorOpen;
    case "listing": return Home;
    default: return Video;
  }
};

const statusTone: Record<Appointment["status"], string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  tentative: "bg-warning/10 text-warning border-warning/20",
  "needs-confirm": "bg-destructive/10 text-destructive border-destructive/20",
};

const importanceBar: Record<Appointment["importance"], string> = {
  high: "bg-gradient-to-b from-primary to-ai",
  medium: "bg-primary/40",
  low: "bg-muted-foreground/30",
};

export const CalendarAgenda = () => {
  const [view, setView] = useState<"today" | "week">("today");
  const today = new Date();

  return (
    <section className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden">
      <header className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b border-border/60 bg-gradient-to-r from-background to-accent/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-2xl bg-gradient-ai shadow-glow flex items-center justify-center text-primary-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-lg leading-tight">Today's agenda</h2>
            <p className="text-xs text-muted-foreground truncate">
              {today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} ·{" "}
              {todaysAppointments.length} appointments
            </p>
          </div>
        </div>
        <div className="inline-flex rounded-full bg-muted p-0.5 text-xs font-semibold">
          {(["today", "week"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 rounded-full transition-all capitalize",
                view === v ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </header>

      <ol className="divide-y divide-border/60">
        {todaysAppointments.map((ap, i) => {
          const Icon = typeIcon(ap.type);
          return (
            <li
              key={ap.id}
              className="group relative flex items-stretch gap-4 px-5 md:px-6 py-4 hover:bg-accent/40 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className={cn("w-1 rounded-full", importanceBar[ap.importance])} />

              <div className="w-20 shrink-0 pt-0.5">
                <div className="font-display font-bold text-base text-foreground tabular-nums">{ap.time}</div>
                <div className="text-[11px] text-muted-foreground tabular-nums">{ap.endTime}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="font-semibold text-sm truncate">{ap.title}</h3>
                  <span className={cn("ml-auto text-[10px] font-semibold uppercase tracking-wide rounded-full border px-2 py-0.5", statusTone[ap.status])}>
                    {ap.status.replace("-", " ")}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">{ap.contact}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {ap.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {ap.time}
                  </span>
                </div>
                {ap.note && (
                  <p className="mt-1.5 text-xs text-muted-foreground italic line-clamp-1">{ap.note}</p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="self-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                aria-label="Open appointment"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
