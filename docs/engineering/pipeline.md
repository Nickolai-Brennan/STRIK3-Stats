# Modeling Pipeline

The STRIK3 pipeline stitches together Python, SQL, and Vue deliverables so the entire analytics team
can collaborate on a single source of truth.

```mermaid
graph TD
  A[FanGraphs / Statcast CSVs] -->|Ingest| B[dbt Staging]
  B --> C[Postgres Warehouse]
  C --> D[Feature Views]
  D --> E[Python Model Training]
  E --> F[Metrics API]
  F --> G[Vue Dashboard]
  F --> H[VitePress Articles]
```

## Daily Sync

- **Python:** `scripts/query_fantasy_metrics.py` pulls projections and writes them to the warehouse.
- **SQL:** `db/queries/fantasy_metrics.sql` materializes fantasy and prop edges.
- **Orchestration:** Use cron or a lightweight Airflow instance to run the sync pre-lock each day.

## Delivery

1. Publish updated model coefficients via an internal REST endpoint.
2. Trigger the Vue app to refresh TanStack tables and recompute expected fantasy points.
3. Push a changelog article to VitePress so downstream users understand the update.

Document assumptions and validation steps inside the docs site to maintain transparency with bettors
and subscribers.
