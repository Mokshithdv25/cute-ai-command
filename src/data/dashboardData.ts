// Mock data shaped around the real-estate agent persona.

export interface BriefingItem {
  id: string;
  type: "lead" | "task" | "listing" | "market" | "appointment";
  text: string;
}

export const morningBriefing: {
  greeting: string;
  summary: string;
  agendaLine: string;
  stats: { label: string; value: string; tone: "primary" | "ai" | "success" | "warning" | "destructive" }[];
  items: BriefingItem[];
  suggestedActions: string[];
} = {
  greeting: "Good morning, Fred",
  summary:
    "While you were asleep, 7 new leads came in and 3 are showing high intent. You have 3 appointments today — first one at 10:00 AM with the Patels at 88 Elm Ct. 5 follow-ups are due, 2 are overdue. You're at 62% of your monthly target with 11 days to go. Two listings need a price check, and the Maple Ave deal has a closing window opening this week.",
  agendaLine:
    "Today's agenda: 3 showings, 5 follow-ups, 1 closing prep. First touch at 10:00 AM.",
  stats: [
    { label: "New leads", value: "7", tone: "primary" },
    { label: "Hot intent", value: "3", tone: "destructive" },
    { label: "Appointments", value: "3", tone: "ai" },
    { label: "Follow-ups due", value: "5", tone: "warning" },
    { label: "Target progress", value: "62%", tone: "success" },
  ],
  items: [
    { id: "b1", type: "lead", text: "Sarah Chen viewed 412 Maple Ave 6 times this week — ready for outreach." },
    { id: "b2", type: "lead", text: "Marcus Reed downloaded the buyer's guide and saved 3 listings overnight." },
    { id: "b3", type: "listing", text: "1820 Oak St: 14 days on market, declining views — consider a $15k reduction." },
    { id: "b4", type: "appointment", text: "Showing at 2:30 PM with the Patels — pre-brief ready in your inbox." },
    { id: "b5", type: "market", text: "3 new MLS listings in Jenna Wu's buyer-match zone hit overnight." },
  ],
  suggestedActions: [
    "Draft personalized outreach to Sarah & Marcus",
    "Generate price-reduction memo for 1820 Oak St",
    "Brief me on the Patel showing",
  ],
};

export interface Appointment {
  id: string;
  time: string;
  endTime: string;
  title: string;
  contact: string;
  location: string;
  type: "showing" | "listing" | "closing" | "call" | "open-house";
  status: "confirmed" | "tentative" | "needs-confirm";
  importance: "high" | "medium" | "low";
  note?: string;
}

export const todaysAppointments: Appointment[] = [
  {
    id: "ap1",
    time: "10:00 AM",
    endTime: "10:45 AM",
    title: "Buyer showing · 88 Elm Ct",
    contact: "Patel family",
    location: "88 Elm Ct, Lakeside",
    type: "showing",
    status: "confirmed",
    importance: "high",
    note: "3-bed, kid-friendly. Bring school ratings sheet.",
  },
  {
    id: "ap2",
    time: "12:30 PM",
    endTime: "1:00 PM",
    title: "Listing call · 1820 Oak St",
    contact: "Greg Holloway (seller)",
    location: "Phone · price reduction talk",
    type: "call",
    status: "confirmed",
    importance: "high",
    note: "Pitch the $15k reduction memo.",
  },
  {
    id: "ap3",
    time: "2:30 PM",
    endTime: "3:30 PM",
    title: "Buyer showing · 412 Maple Ave",
    contact: "Sarah Chen",
    location: "412 Maple Ave, Westbrook",
    type: "showing",
    status: "needs-confirm",
    importance: "high",
    note: "6 prior visits — likely ready to write.",
  },
  {
    id: "ap4",
    time: "5:00 PM",
    endTime: "5:30 PM",
    title: "Closing prep · 27 Birch Ln",
    contact: "Title — Cornerstone Escrow",
    location: "Zoom",
    type: "closing",
    status: "confirmed",
    importance: "medium",
  },
];

export interface FollowUp {
  id: string;
  contact: string;
  reason: string;
  due: string;
  overdue?: boolean;
  score: number;
  channel: "call" | "text" | "email";
}

export const followUps: FollowUp[] = [
  { id: "f1", contact: "Jenna Wu", reason: "30-day buyer check-in", due: "2 days overdue", overdue: true, score: 88, channel: "text" },
  { id: "f2", contact: "Mike Alvarez", reason: "Loan pre-approval ping", due: "Due today", score: 74, channel: "call" },
  { id: "f3", contact: "The Lees", reason: "Birthday — Anna turns 40", due: "Today", score: 60, channel: "text" },
  { id: "f4", contact: "Karen Brooks", reason: "Listing anniversary", due: "Tomorrow", score: 52, channel: "email" },
];

export interface NewLead {
  id: string;
  name: string;
  source: string;
  score: number;
  lastActivity: string;
  hot?: boolean;
}

export const newLeads: NewLead[] = [
  { id: "l1", name: "Sarah Chen", source: "Zillow", score: 96, lastActivity: "Viewed 412 Maple Ave · 6x this week", hot: true },
  { id: "l2", name: "Marcus Reed", source: "Website", score: 91, lastActivity: "Saved 3 listings overnight", hot: true },
  { id: "l3", name: "Diana Kapoor", source: "Referral · J. Wu", score: 84, lastActivity: "Requested buyer guide", hot: true },
  { id: "l4", name: "Tom Becker", source: "Open house · Sat", score: 67, lastActivity: "Filled sign-in sheet" },
  { id: "l5", name: "Priya Shah", source: "Facebook ad", score: 58, lastActivity: "Clicked 1820 Oak St" },
  { id: "l6", name: "Ravi Patel", source: "Realtor.com", score: 49, lastActivity: "Browsed search results" },
  { id: "l7", name: "Elise Romero", source: "Walk-in", score: 41, lastActivity: "Asked about Westbrook schools" },
];

export interface Goal {
  label: string;
  current: number;
  target: number;
  unit?: string;
  tone: "primary" | "ai" | "success" | "warning";
}

export const monthlyGoals: Goal[] = [
  { label: "Closings", current: 3, target: 5, tone: "success" },
  { label: "Appointments held", current: 14, target: 22, tone: "ai" },
  { label: "Follow-ups completed", current: 38, target: 60, tone: "primary" },
  { label: "New leads added", current: 27, target: 40, tone: "warning" },
];

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
  appointments: 3,
  listings: 5,
  closing: 1,
  newMlsMatches: 7,
  followUpsDue: 5,
  followUpsOverdue: 2,
  newLeadsToday: 7,
};

export const pipeline = [
  { label: "Lead Scoring", count: 12, tone: "destructive" as const, hint: "12 leads scored 80+ overnight" },
  { label: "Agentic Follow-ups", count: 5, tone: "ai" as const, hint: "AI drafted · awaiting your nod" },
  { label: "Deal Management", count: 4, tone: "success" as const, hint: "1 closing this week" },
  { label: "Smart Plans", count: 6, tone: "primary" as const, hint: "Drip campaigns running" },
  { label: "Property Matching", count: 7, tone: "warning" as const, hint: "New MLS matches for buyers" },
  { label: "Keep In Touch", count: 8, tone: "primary" as const, hint: "Birthdays + check-ins due" },
];
