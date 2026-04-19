import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";
import { useSpeech } from "@/hooks/useSpeech";
import { morningBriefing } from "@/data/dashboardData";
import { cn } from "@/lib/utils";
import mascotVideo from "@/assets/mascot-animated.mp4";

export const MorningBriefing = ({ onAction }: { onAction?: (action: string) => void }) => {
  const { supported, speaking, speak, stop } = useSpeech();
  const [displayText, setDisplayText] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [autoStream, setAutoStream] = useState(false);

  const fullText = morningBriefing.summary;

  // Stream the text in sync with TTS (typewriter effect)
  useEffect(() => {
    if (!autoStream) return;
    setDisplayText("");
    let i = 0;
    const totalDuration = Math.max(2200, fullText.length * 38);
    const intervalMs = totalDuration / fullText.length;
    const id = setInterval(() => {
      i += 1;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoStream, fullText]);

  const play = () => {
    setAutoStream(true);
    setHasPlayed(true);
    if (supported) speak(fullText);
  };

  const handleStop = () => {
    stop();
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-hero border border-border/60 shadow-elevated">
      {/* mesh blobs */}
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-ai/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      {/* Full-width mascot video banner when playing */}
      {hasPlayed && (
        <div
          className="relative w-full overflow-hidden border-b border-border/60 flex items-center justify-center"
          style={{ backgroundColor: "hsl(243 84% 54%)" }}
        >
          {speaking && (
            <span className="pointer-events-none absolute inset-0 ring-2 ring-primary/30 animate-pulse-ring" />
          )}
          <video
            src={mascotVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-auto max-h-[420px] max-w-full object-contain"
          />
        </div>
      )}

      <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 p-6 md:p-8 items-center">
        {/* Static mascot only before playing */}
        {!hasPlayed && (
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[140px] w-[140px] flex items-center justify-center">
              <Mascot variant="hero" size={120} glow animate />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              Morning Briefing · {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            {morningBriefing.greeting}
            <span className="inline-block ml-2 animate-float">👋</span>
          </h1>

          <p
            className={cn(
              "mt-3 text-base md:text-lg text-foreground/80 leading-relaxed min-h-[5rem]",
              !hasPlayed && "italic text-muted-foreground"
            )}
          >
            {hasPlayed ? (
              <>
                {displayText}
                {displayText.length < fullText.length && (
                  <span className="inline-block w-0.5 h-5 bg-primary align-middle ml-0.5 animate-pulse" />
                )}
              </>
            ) : (
              <>Tap play and I'll walk you through everything that matters today.</>
            )}
          </p>

          {/* Inline stat chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {morningBriefing.stats.map((s) => (
              <span
                key={s.label}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur",
                  s.tone === "primary" && "bg-primary/10 text-primary border-primary/20",
                  s.tone === "ai" && "bg-ai/10 text-ai border-ai/20",
                  s.tone === "success" && "bg-success/10 text-success border-success/20",
                  s.tone === "warning" && "bg-warning/10 text-warning border-warning/20",
                  s.tone === "destructive" && "bg-destructive/10 text-destructive border-destructive/20",
                )}
              >
                <span className="font-display font-extrabold tabular-nums text-sm">{s.value}</span>
                <span className="opacity-80">{s.label}</span>
              </span>
            ))}
          </div>

          <p className="mt-3 text-xs font-medium text-muted-foreground italic">
            {morningBriefing.agendaLine}
          </p>

          {/* Suggested actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {morningBriefing.suggestedActions.map((a) => (
              <button
                key={a}
                onClick={() => onAction?.(a)}
                className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 backdrop-blur px-4 py-2 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <Sparkles className="h-3.5 w-3.5 text-ai group-hover:text-primary transition-colors" />
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex lg:flex-col gap-2 justify-center">
          {speaking ? (
            <Button onClick={handleStop} size="lg" variant="outline" className="rounded-full">
              <Pause className="h-4 w-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button onClick={play} size="lg" className="rounded-full bg-gradient-ai shadow-glow hover:shadow-ai-glow">
              {hasPlayed ? <Play className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
              {hasPlayed ? "Replay" : "Play briefing"}
            </Button>
          )}
        </div>
      </div>

      {/* Highlights row */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-px bg-border/50 border-t border-border/60">
        {morningBriefing.items.map((item) => (
          <div key={item.id} className="bg-card/70 backdrop-blur p-4 text-sm hover:bg-card transition-colors">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {item.type}
            </div>
            <div className="text-foreground/90 leading-snug">{item.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
