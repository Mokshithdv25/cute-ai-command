import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AgentAction } from "@/data/dashboardData";
import { pendingActions } from "@/data/dashboardData";
import { getInsforgeClient, isInsforgeConfigured } from "@/lib/insforge";

interface ActionRow {
  id: string;
  title: string;
  description: string;
  category: AgentAction["category"];
  est_time: string;
  impact: string;
  steps: string[] | unknown;
  status: string;
  sort_order: number;
}

function rowToAction(row: ActionRow): AgentAction {
  const steps = Array.isArray(row.steps) ? (row.steps as string[]) : [];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    estTime: row.est_time,
    impact: row.impact,
    steps,
  };
}

async function fetchQueuedActions(): Promise<AgentAction[]> {
  const insforge = getInsforgeClient();
  const { data, error } = await insforge.database
    .from("lofty_agent_actions")
    .select("*")
    .in("status", ["queued", "executing"])
    .order("sort_order", { ascending: true });

  if (error) throw error;
  const rows = (data ?? []) as ActionRow[];
  return rows.map(rowToAction);
}

export function useAgentActions() {
  const queryClient = useQueryClient();
  const configured = isInsforgeConfigured();

  const query = useQuery({
    queryKey: ["insforge", "lofty_agent_actions"],
    queryFn: fetchQueuedActions,
    enabled: configured,
    staleTime: 30_000,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "completed" | "cancelled" }) => {
      const insforge = getInsforgeClient();
      const { error } = await insforge.database
        .from("lofty_agent_actions")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["insforge", "lofty_agent_actions"] });
    },
  });

  let actions: AgentAction[] = pendingActions;
  if (configured) {
    if (query.isSuccess && query.data && query.data.length > 0) {
      actions = query.data;
    } else if (query.isError) {
      actions = pendingActions;
    } else if (query.isLoading) {
      actions = pendingActions;
    }
  }

  const isLive = Boolean(configured && query.isSuccess && !query.isError && (query.data?.length ?? 0) > 0);

  return {
    actions,
    isLoading: configured && query.isLoading,
    isLive,
    error: query.error,
    setActionStatus: (id: string, status: "completed" | "cancelled") => updateStatus.mutateAsync({ id, status }),
  };
}
