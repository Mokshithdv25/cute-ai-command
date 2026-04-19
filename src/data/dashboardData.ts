// Mock data shaped around the real-estate agent persona.

export interface BriefingItem {
  id: string;
  type: "lead" | "task" | "listing" | "market" | "appointment";
  text: string;
}

export const morningBriefing: { greeting: string; summary: string; items: BriefingItem[]; suggestedActions: string[] } = {
  greeting: "Good morning, Fred",
  summary:
    "I've reviewed 47 signals across your pipeline overnight. Here's what matters today: 3 leads are showing high intent, 2 listings need a price check, and you have a closing window on the Maple Ave deal.",
  items: [
    { id: "b1", type: "lead", text: "Sarah Chen viewed 412 Maple Ave 6 times this week — ready for outreach." },
    { id: "b2", type: "lead", text: "Marcus Reed downloaded the buyer's guide and saved 3 listings overnight." },
    { id: "b3", type: "listing", text: "1820 Oak St has been on market 14 days with declining views — consider a $15k price reduction." },
    { id: "b4", type: "appointment", text: "Showing at 2:30 PM with the Patels — pre-brief ready in your inbox." },
    { id: "b5", type: "market", text: "3 new listings in the buyer-match zone for Jenna Wu just hit MLS." },
  ],
  suggestedActions: [
    "Draft personalized outreach to Sarah & Marcus",
    "Generate price-reduction memo for 1820 Oak St",
    "Brief me on the Patel showing",
  ],
};

export interface AgentAction {
  id: string;
  title: string;
  description: string;
  category: "outreach" | "listing" | "transaction" | "research";
  estTime: string;
  steps: string[];
  impact: string;
}

export const pendingActions: AgentAction[] = [
  {
    id: "a1",
    title: "Send personalized SMS to Sarah Chen",
    description:
      "High-intent buyer. Draft references her 6 visits to 412 Maple Ave and offers a private showing this weekend.",
    category: "outreach",
    estTime: "Auto-send · 2s",
    impact: "+38% reply likelihood",
    steps: [
      "Pull Sarah's last 7 days of behavior",
      "Reference 412 Maple Ave specifics",
      "Propose Sat 11am or Sun 2pm",
      "Send via SMS + log in CRM",
    ],
  },
  {
    id: "a2",
    title: "Price reduction package — 1820 Oak St",
    description:
      "Generate the comp report, suggested $15k reduction memo, and email draft to the seller.",
    category: "listing",
    estTime: "Auto-send · 8s",
    impact: "Projected +62% weekly views",
    steps: [
      "Run comps within 0.5 mi · 30 days",
      "Build PDF memo",
      "Draft seller email",
      "Queue for your approval",
    ],
  },
  {
    id: "a3",
    title: "Pre-brief: Patel showing at 2:30 PM",
    description:
      "Compile family preferences, school ratings, and 3 talking points unique to 88 Elm Ct.",
    category: "research",
    estTime: "Ready in 5s",
    impact: "Higher close confidence",
    steps: [
      "Pull Patel preference profile",
      "Match to property highlights",
      "Generate 3 talking points",
      "Push to your phone",
    ],
  },
];

export const todayMetrics = {
  leadsHot: 3,
  leadsWarm: 12,
  appointments: 2,
  listings: 5,
  closing: 1,
  newMlsMatches: 7,
};

export const pipeline = [
  { label: "Need Keep In Touch", count: 8, tone: "warning" as const, hint: "Birthdays + 30/60/90 day check-ins" },
  { label: "Today's Opportunities", count: 3, tone: "primary" as const, hint: "AI-flagged high-intent leads" },
  { label: "Transactions", count: 4, tone: "success" as const, hint: "1 near deadline" },
  { label: "Appointments", count: 2, tone: "ai" as const, hint: "Patels 2:30 · Open house Sat" },
  { label: "My Listings", count: 5, tone: "primary" as const, hint: "1 needs price action" },
  { label: "Hot Sheets", count: 7, tone: "destructive" as const, hint: "New MLS matches overnight" },
];
