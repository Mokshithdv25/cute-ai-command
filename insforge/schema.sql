-- Lofty AOS — agent queue backed by InsForge Postgres (PostgREST)
-- Policies allow anon key read/write for demo (tighten for production).

CREATE TABLE IF NOT EXISTS public.lofty_agent_actions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('outreach', 'listing', 'transaction', 'research')),
  est_time TEXT NOT NULL,
  impact TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'executing', 'completed', 'cancelled')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lofty_agent_actions_sort ON public.lofty_agent_actions (sort_order);

ALTER TABLE public.lofty_agent_actions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lofty_actions_select_anon" ON public.lofty_agent_actions;
DROP POLICY IF EXISTS "lofty_actions_insert_anon" ON public.lofty_agent_actions;
DROP POLICY IF EXISTS "lofty_actions_update_anon" ON public.lofty_agent_actions;
DROP POLICY IF EXISTS "lofty_actions_delete_anon" ON public.lofty_agent_actions;

CREATE POLICY "lofty_actions_select_anon" ON public.lofty_agent_actions FOR SELECT USING (true);
CREATE POLICY "lofty_actions_insert_anon" ON public.lofty_agent_actions FOR INSERT WITH CHECK (true);
CREATE POLICY "lofty_actions_update_anon" ON public.lofty_agent_actions FOR UPDATE USING (true);
CREATE POLICY "lofty_actions_delete_anon" ON public.lofty_agent_actions FOR DELETE USING (true);

-- Seed rows (idempotent)
INSERT INTO public.lofty_agent_actions (id, title, description, category, est_time, impact, steps, sort_order)
VALUES
  (
    'a1',
    'Send personalized SMS to Sarah Chen',
    'High-intent buyer. Draft references her 6 visits to 412 Maple Ave and offers a private showing this weekend.',
    'outreach',
    'Auto-send · 2s',
    '+38% reply likelihood',
    '["Pull Sarah''s last 7 days of behavior","Reference 412 Maple Ave specifics","Propose Sat 11am or Sun 2pm","Send via SMS + log in CRM"]'::jsonb,
    0
  ),
  (
    'a2',
    'Price reduction package — 1820 Oak St',
    'Generate the comp report, suggested $15k reduction memo, and email draft to the seller.',
    'listing',
    'Auto-send · 8s',
    'Projected +62% weekly views',
    '["Run comps within 0.5 mi · 30 days","Build PDF memo","Draft seller email","Queue for your approval"]'::jsonb,
    1
  ),
  (
    'a3',
    'Pre-brief: Patel showing at 2:30 PM',
    'Compile family preferences, school ratings, and 3 talking points unique to 88 Elm Ct.',
    'research',
    'Ready in 5s',
    'Higher close confidence',
    '["Pull Patel preference profile","Match to property highlights","Generate 3 talking points","Push to your phone"]'::jsonb,
    2
  )
ON CONFLICT (id) DO NOTHING;
