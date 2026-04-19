import { useEffect, useState } from "react";
import { Check, X, RefreshCw, ChevronDown, Sparkles, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";
import type { AgentAction } from "@/data/dashboardData";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  action: AgentAction;
  onExecute: (id: string) => void;
  onRevise: (id: string) => void;
  onCancel: (id: string) => void;
  index?: number;
}

const categoryStyle: Record<AgentAction["category"], string> = {
  outreach: "bg-primary/10 text-primary",
  listing: "bg-warning/10 text-warning",
  transaction: "bg-success/10 text-success",
  research: "bg-ai/10 text-ai",
};

export const ActionCard = ({ action, onExecute, onRevise, onCancel, index = 0 }: ActionCardProps) => {
  const [open, setOpen] = useState(false);
  const [streamed, setStreamed] = useState("");
  const [status, setStatus] = useState<"pending" | "executing" | "done" | "cancelled">("pending");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setStreamed(action.description.slice(0, i));
      if (i >= action.description.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [action.description]);

  const handleExecute = () => {
    setStatus("executing");
    onExecute(action.id);
    setTimeout(() => setStatus("done"), 1400);
  };

  const handleCancel = () => {
    setStatus("cancelled");
    onCancel(action.id);
  };

  return (
    <article
      className={cn(
        "relative group rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-in-up",
        status === "cancelled" && "opacity-50",
        status === "done" && "border-success/40 bg-success/5"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-ai opacity-60" />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <Mascot variant={action.category === "research" ? "telescope" : action.category === "listing" ? "laptop" : "hero"} size={44} animate={false} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={cn("text-[10px] uppercase tracking-wider font-bold rounded-full px-2 py-0.5", categoryStyle[action.category])}>
                {action.category}
              </span>
              <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {action.estTime}
              </span>
              <span className="text-[11px] text-success inline-flex items-center gap-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                {action.impact}
              </span>
            </div>
            <h3 className="font-display font-bold text-base leading-snug">{action.title}</h3>
          </div>
        </div>

        <p className="text-sm text-foreground/75 leading-relaxed min-h-[2.5rem]">
          {streamed}
          {streamed.length < action.description.length && (
            <span className="inline-block w-0.5 h-4 bg-primary align-middle ml-0.5 animate-pulse" />
          )}
        </p>

        {/* Confidence bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <span>AI confidence</span>
            <span className="text-foreground tabular-nums">{85 + (index * 4) % 12}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-ai rounded-full"
              style={{ width: `${85 + (index * 4) % 12}%` }}
            />
          </div>
        </div>

        {/* Steps disclosure */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-deep transition-colors"
        >
          <Sparkles className="h-3 w-3" />
          {open ? "Hide" : "Show"} {action.steps.length} steps
          <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <ol className="mt-2 space-y-1.5 pl-1">
            {action.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-2 text-xs text-foreground/70 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          {status === "done" ? (
            <div className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-success/10 text-success font-semibold text-sm py-2.5">
              <Check className="h-4 w-4" /> Executed
            </div>
          ) : status === "cancelled" ? (
            <div className="flex-1 text-center text-sm text-muted-foreground py-2.5">Cancelled</div>
          ) : (
            <>
              <Button
                size="sm"
                onClick={handleExecute}
                disabled={status === "executing"}
                className="flex-1 rounded-full bg-gradient-ai shadow-glow hover:shadow-ai-glow font-semibold"
              >
                {status === "executing" ? (
                  <>
                    <span className="flex gap-1 mr-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-current typing-dot" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current typing-dot" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current typing-dot" />
                    </span>
                    Executing
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1.5" /> Execute
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => onRevise(action.id)}>
                <RefreshCw className="h-4 w-4 mr-1.5" /> Revise
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full text-muted-foreground hover:text-destructive" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
