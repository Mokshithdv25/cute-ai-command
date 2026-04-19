# Lofty AOS (Agentic Operating System)

Welcome to the **Lofty AOS** repository, built for the GlobeHack Season 1 Case Study.

## Live demo

**[https://cute-ai-command.lovable.app/](https://cute-ai-command.lovable.app/)** — open in your browser (hosted on Lovable).

## The Challenge
To reimagine the AI-Native Lofty Experience. Today, users log into a dashboard of powerful modules but have to do the prioritization themselves. Our goal was to create a new entry point that brings AI front-and-center, turning a static widget dashboard into an active, conversational command center.

## Our Solution
Lofty AOS flips the traditional CRM paradigm. Instead of making agents hunt for what to do, the system synthesizes pipeline data and proactively queues tasks. 

**Key Features:**
- **Morning Briefing:** A multimodal AI-generated summary with voice capabilities to instantly grasp the daily agenda.
- **AI Command Center:** A natural language interface to execute complex CRM tasks.
- **Agentic Workflow Review:** Complete transparency. Agents review the exact steps the AI will take before any action occurs (Execute, Revise, Cancel).
- **Autonomous Log:** Accountability tracking for everything the AI accomplishes in the background.
- **Minimalistic Dashboard:** A consolidated view of the Calendar Agenda, Key Metrics, and Pipeline Grid to prevent cognitive overload.

## Tech Stack & Architecture
This project is built as a modern web application:
- **Frontend Framework:** React with TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **State Management:** React Query, local component state
- **Routing:** React Router
- **Backend (InsForge):** PostgreSQL + PostgREST via [`@insforge/sdk`](https://www.npmjs.com/package/@insforge/sdk). The **Ready to run** queue reads from table `lofty_agent_actions` (seeded via `insforge/schema.sql`). Execute / Cancel update row status in the database.

### InsForge setup
1. Link the project (creates `.insforge/project.json` — **gitignored**, contains your API key):
   ```bash
   npx @insforge/cli login
   npx @insforge/cli link --project-id <YOUR_PROJECT_ID> --org-id <YOUR_ORG_ID> -y
   ```
2. Apply schema (once):
   ```bash
   npx @insforge/cli db import insforge/schema.sql -y
   ```
3. **Local env:** copy `.env.example` → `.env.local` and set `VITE_INSFORGE_BASE_URL` = `oss_host` and `VITE_INSFORGE_ANON_KEY` = `api_key` from `.insforge/project.json`.
4. **Lovable / production:** add the same two variables in the host’s environment settings.

Without env vars, the app falls back to mock data and still runs.

## AI Tools Disclosure
In the spirit of the hackathon's encouragement to use AI tools, this project leveraged the following:
- **Lovable:** Used to rapidly scaffold and generate the working React prototype.
- **Gemini:** Used to generate the mascot animations and video assets.
- **Gamma:** Used to structure and design the presentation slides (PPT).

## Running locally (optional)

To run this project on your machine:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
