# Custom Metrics Primer

Building a competitive fantasy baseball and sports betting model starts with elite contextual stats.
This primer introduces a modular framework for blending tracking data, park adjustments, and betting
market signals.

## Feature Buckets

| Bucket | Inputs | Notes |
| --- | --- | --- |
| Contact Quality | Statcast batted ball data, rolling barrel rate | Weighted by pitch mix suppression. |
| Plate Discipline | Chase %, zone contact, swing decisions | Z-scores vs. positional cohorts. |
| Situation Context | Park factors, umpire zones, weather | Forecasts updated daily from API feeds. |
| Betting Signals | Closing line movement, prop hold | Adds variance control for high-vig markets. |

## Weighted Fantasy Score

Use the weight controls in the Vue dashboard to experiment with the following baseline formula:

$$
\text{FantasyScore} = 0.4 \times CQ + 0.25 \times PD + 0.2 \times BR + 0.15 \times Ctx
$$

Where each component is standardized to league-average and rescaled to the 0-1 range. The weightings
should change depending on the target slate; for props, increase the contact-quality share and lower
context.

## Model Validation

1. Split each season into rolling 14-day windows.
2. Train gradient-boosted trees against the fantasy score target.
3. Backtest the top quartile of projections for both fantasy points and prop hit rate.
4. Overlay your bankroll plan to evaluate Kelly-adjusted exposure.

Cross-validate against league-average baselines and measure incremental ROI and win probability. The
[modeling pipeline article](/engineering/pipeline) shows how to automate this workflow.
