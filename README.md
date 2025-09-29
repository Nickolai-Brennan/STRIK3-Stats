# STRIK3 Stats Platform

STRIK3 is a modern analytics lab for fantasy baseball and sports betting. The repository now ships a
full-stack toolkit:

- **Vue + Vite dashboard** featuring TanStack Table for interactive leaderboards.
- **VitePress documentation site** for playbooks, change logs, and methodology breakdowns.
- **Postgres schema and SQL queries** that materialize fantasy value metrics.
- **Python automation** to refresh warehouse tables.
- **Markdown eBook** to onboard analysts and premium subscribers.

## Getting Started

### Vue Dashboard (`web/`)

```bash
cd web
npm install
npm run dev
```

The app starts on <http://localhost:5173> and showcases projected fantasy value leaders along with a
model configurator for quick simulations.

### Documentation (`docs/`)

```bash
cd docs
npm install
npx vitepress dev
```

Author long-form research pieces using VitePress. The sidebar organizes analytics and engineering
content for easy navigation.

### Database Assets (`db/`)

- `schema.sql` provisions the core warehouse tables across `raw`, `analytics`, and `marts` schemas.
- `queries/fantasy_metrics.sql` standardizes feature z-scores and returns model-ready fantasy scores.

### Python Automation (`scripts/`)

`scripts/query_fantasy_metrics.py` demonstrates how to upsert projection rows into Postgres. Configure
connection credentials with standard `PG*` environment variables before running the script.

### eBooks (`ebooks/`)

Markdown eBooks provide packaged insights for clients and can be exported to PDF with your preferred
Markdown tooling.

## Legacy Scripts

`fangraphs_leaders.py` remains as a data-ingest helper for capturing FanGraphs leaderboards and can be
wired into the Postgres pipeline above.
