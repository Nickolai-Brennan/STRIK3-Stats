# Prop Market Exploits

Props offer faster feedback loops than season-long markets, but demand precise projections and
strict risk controls. Combine your custom metrics with market data to expose stale lines.

## Workflow

1. **Sync Markets:** Pull morning openers from your sportsbook API and convert juice to implied odds.
2. **Blend Projections:** Mix STRIK3 model outputs with trusted public projections to hedge noise.
3. **Price Props:** Translate fantasy score distributions into prop-specific expectations (total bases,
   strikeouts, etc.).
4. **Screen Edges:** Flag bets where implied win probability trails your projection by 5 percentage
   points or more.
5. **Stake Sizing:** Apply fractional Kelly or percent-of-bankroll rules tuned to your volatility band.

## Watchouts

- Track closing-line value (CLV) to ensure your model is beating market moves.
- Respect sportsbook limits; scaling requires multiple accounts and timing discipline.
- Document every bet, including the projection snapshot, to audit variance.

The Vue dashboard exposes edge percentages; feed them directly into this workflow for faster decision
making.
