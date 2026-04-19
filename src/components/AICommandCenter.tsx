import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "Show me my hottest leads",
  "Draft a follow-up to everyone who toured this week",
  "Find buyers for my new Maple Ave listing",
  "What should I focus on this morning?",
];

interface AICommandCenterProps {
  onSubmit: (prompt: string) => void;
  thinking?: boolean;
  prefill?: string;
}

export const AICommandCenter = ({ onSubmit, thinking, prefill }: AICommandCenterProps) => {
  const [value, setValue] = useState("");
  const { supported, listening, transcript, start, stop } = useSpeechRecognition();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefill) {
      setValue(prefill);
      inputRef.current?.focus();
    }
  }, [prefill]);

  useEffect(() => {
    if (transcript) setValue(transcript);
  }, [transcript]);

  const handleSubmit = (text?: string) => {
    const t = (text ?? value).trim();
    if (!t) return;
    onSubmit(t);
    setValue("");
  };

  const handleMic = () => {
    if (listening) {
      stop();
    } else {
      start((finalText) => {
        // auto-submit on final voice transcript
        setTimeout(() => handleSubmit(finalText), 300);
      });
    }
  };

  return (
    <div className="relative">
      {/* halo */}
      <div
        className={cn(
          "absolute -inset-1 rounded-3xl bg-gradient-ai opacity-0 blur-xl transition-opacity duration-500",
          (listening || thinking) && "opacity-50 animate-glow-pulse"
        )}
      />
      <div className="relative rounded-3xl bg-card border border-border shadow-elevated overflow-hidden">
        <div className="flex items-start gap-4 p-5">
          <div className="shrink-0">
            <Mascot variant="phone" size={56} animate={!thinking} glow={thinking} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider gradient-text">AI Command Center</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Online · listening to your pipeline
              </span>
            </div>
            <textarea
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={listening ? "Listening…" : "Tell me what to do — e.g. 'follow up with this week's tours'"}
              rows={2}
              className="w-full resize-none bg-transparent outline-none text-base md:text-lg placeholder:text-muted-foreground/70 leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {supported && (
              <Button
                type="button"
                variant={listening ? "default" : "outline"}
                size="icon"
                className={cn(
                  "rounded-full h-11 w-11 relative",
                  listening && "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                )}
                onClick={handleMic}
                aria-label={listening ? "Stop listening" : "Start voice input"}
              >
                {listening && (
                  <span className="absolute inset-0 rounded-full border-2 border-destructive/60 animate-pulse-ring" />
                )}
                {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            )}
            <Button
              type="button"
              size="icon"
              className="rounded-full h-11 w-11 bg-gradient-ai shadow-glow"
              onClick={() => handleSubmit()}
              disabled={thinking || !value.trim()}
              aria-label="Send"
            >
              {thinking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Suggested chips */}
        <div className="border-t border-border/70 bg-secondary/40 px-5 py-3 flex flex-wrap gap-2 items-center">
          <Sparkles className="h-3.5 w-3.5 text-ai" />
          <span className="text-xs text-muted-foreground font-medium mr-1">Try:</span>
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => handleSubmit(s)}
              className="text-xs rounded-full bg-card border border-border/70 px-3 py-1.5 hover:border-primary/40 hover:text-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
