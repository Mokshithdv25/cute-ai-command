import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { MorningBriefing } from "@/components/MorningBriefing";
import { CalendarAgenda } from "@/components/CalendarAgenda";
import { KeyMetrics } from "@/components/KeyMetrics";
import { AICommandCenter } from "@/components/AICommandCenter";
import { ActionCard } from "@/components/ActionCard";
import { AutonomousLog } from "@/components/AutonomousLog";
import { PipelineGrid } from "@/components/PipelineGrid";
import { pendingActions } from "@/data/dashboardData";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [thinking, setThinking] = useState(false);
  const [prefill, setPrefill] = useState<string>("");
  const [actions, setActions] = useState(pendingActions);

  const handleCommand = (prompt: string) => {
    setThinking(true);
    toast({ title: "On it.", description: `"${prompt}" — drafting an agent plan…` });
    setTimeout(() => {
      setThinking(false);
      toast({
        title: "Plan ready",
        description: "I've added a new action card for your review.",
      });
    }, 1500);
  };

  const handleExecute = (id: string) => {
    toast({ title: "Executing", description: "Action is running. I'll log it in the CRM." });
  };
  const handleRevise = (id: string) => {
    const a = actions.find((x) => x.id === id);
    if (a) setPrefill(`Revise: ${a.title} — `);
  };
  const handleCancel = (id: string) => {
    toast({ title: "Cancelled", description: "No worries. I won't run that one." });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="container py-6 md:py-8 space-y-8">
        {/* 1. AI morning briefing */}
        <MorningBriefing onAction={(a) => setPrefill(a)} />

        {/* 2. Calendar agenda — time + location */}
        <CalendarAgenda />

        {/* 3. Key metrics + monthly target progress */}
        <KeyMetrics />

        {/* 4. AI command center */}
        <AICommandCenter onSubmit={handleCommand} thinking={thinking} prefill={prefill} />

        {/* 5. Ready-to-run AI actions */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai" />
                Ready to run
              </h2>
              <p className="text-sm text-muted-foreground">
                Review, execute, or revise. Nothing happens without your approval.
              </p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{actions.length} actions queued</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {actions.map((a, i) => (
              <ActionCard
                key={a.id}
                action={a}
                index={i}
                onExecute={handleExecute}
                onRevise={handleRevise}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </section>

        {/* 6. Pipeline overview + autonomous log */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <PipelineGrid />
          <AutonomousLog />
        </div>

        <footer className="pt-4 pb-8 text-center text-xs text-muted-foreground">
          Lofty AOS · The first agentic AI operating system for real estate
        </footer>
      </main>
    </div>
  );
};

export default Index;
