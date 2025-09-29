# STRIK3 Fantasy Baseball Data Handbook

This handbook distills the STRIK3 methodology into a structured reference. Combine it with the Vue
app and VitePress knowledge base to spin up a turnkey analytics lab.

## Part I: Data Foundations

1. **Data Sources**
   - Statcast pitch-by-pitch exports
   - FanGraphs leaderboard scrapes (`fangraphs_leaders.py`)
   - Sportsbook APIs for prop lines and odds
2. **Storage**
   - Normalize raw feeds into Postgres schemas described in `/docs/engineering/postgres-warehouse.md`.
   - Version your transformations with dbt or SQLMesh.
3. **Governance**
   - Track freshness with elementary tests.
   - Document data lineage inside VitePress articles.

## Part II: Modeling Cookbook

- **Feature Engineering:** Rolling averages, platoon splits, and park-context normalization.
- **Model Types:** Gradient boosting for fantasy points, Bayesian hierarchical models for props, and
  simulation-based Monte Carlo for bankroll planning.
- **Validation:** Use time-series cross validation and monitor CLV.

## Part III: Deployment

1. Publish metrics to an internal API consumed by the Vue front-end.
2. Embed TanStack tables for interactive exploration.
3. Export curated reports as PDF eBooks for premium subscribers.

## Appendices

- SQL snippets from `/db/queries`.
- Python automation scripts from `/scripts`.
- Change logs and methodology updates in `/docs`.
