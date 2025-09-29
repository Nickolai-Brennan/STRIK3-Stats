# Postgres Warehouse

A centralized Postgres instance powers STRIK3 data apps. Use the following blueprint to provision and
maintain the warehouse.

## Schema Layout

```sql
CREATE SCHEMA IF NOT EXISTS raw;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS marts;
```

- `raw` stores ingested CSV/API dumps.
- `analytics` contains transformed feature views.
- `marts` is the consumer-facing layer for apps and notebooks.

## Extension Checklist

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

These extensions support time-series rollups, performance tuning, and secure credential storage.

## Operational Tasks

1. Run `VACUUM (ANALYZE)` nightly on high-churn tables.
2. Partition Statcast-level data by month to keep queries fast.
3. Enable logical replication for shipping data to BI tools or downstream databases.
4. Monitor query plans using `pg_stat_statements` and surface slow SQL in docs.

Pair the SQL patterns with the Python automation script to guarantee fresh, accurate projections.
