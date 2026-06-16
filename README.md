# DevPing

A URL uptime monitor built with Next.js 15. Add websites you want to watch — DevPing pings them every 30 seconds and shows whether they are UP or DOWN.

🔗 **Live:** [devping-nu.vercel.app](https://devping-nu.vercel.app)

---

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Data fetching:** TanStack Query (auto-refresh, optimistic updates)
- **Testing:** Jest, React Testing Library
- **DevOps:** Docker, GitHub Actions CI/CD, Vercel

---

## Features

- Add and remove URLs to monitor
- Ping sites manually or wait for auto-refresh every 30 seconds
- Status shown as UP, DOWN, or PENDING with response time
- Data persists between sessions

---

## Running Locally

```bash
git clone https://github.com/SachiniDIL/devping.git
cd devping
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## Running with Docker

```bash
docker compose up --build
```

Visit `http://localhost:3000`

Data persists between container restarts via a volume mount on `./data`.

---

## Running Tests

```bash
npm run test:ci
```

22 tests across 3 components — StatusBadge, SiteCard, AddSiteForm.

---

## Project Structure

```
src/
  app/
    api/
      sites/route.ts        # GET all sites, POST new site
      sites/[id]/route.ts   # DELETE site
      ping/route.ts         # POST ping a URL
    page.tsx                # Main dashboard
    layout.tsx              # Root layout with QueryClientProvider
  components/
    StatusBadge.tsx         # UP / DOWN / PENDING pill badge
    SiteCard.tsx            # Card showing one monitored site
    AddSiteForm.tsx         # Form to add a new site
  lib/
    types.ts                # Site TypeScript interface
    store.ts                # Read/write helpers for data/sites.json
  __tests__/
    StatusBadge.test.tsx
    SiteCard.test.tsx
    AddSiteForm.test.tsx
data/
  sites.json                # Persisted site data
```

---

## CI/CD Pipeline

Every pull request runs automatically:

```
lint → format check → typecheck → tests → build
```

Merging to main triggers an automatic Vercel production deployment.
