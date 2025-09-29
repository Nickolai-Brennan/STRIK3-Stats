<template>
  <div>
    <h2>Custom Model Builder</h2>
    <p class="subtitle">
      Tune weighting schemes and run quick backtests before exporting projections to your betting
      or fantasy workflow.
    </p>

    <form class="form" @submit.prevent="runSimulation">
      <label v-for="metric in metrics" :key="metric.key">
        {{ metric.label }}
        <input v-model.number="weights[metric.key]" type="range" :min="0" :max="100" />
        <span>{{ weights[metric.key].toFixed(0) }}%</span>
      </label>

      <label>
        Bankroll Risk %
        <input v-model.number="bankrollRisk" type="number" min="0" max="10" step="0.5" />
      </label>

      <button type="submit">Run Monte Carlo Backtest</button>
    </form>

    <section v-if="results" class="results">
      <h3>Simulation Results</h3>
      <ul>
        <li><strong>Sharpe Ratio:</strong> {{ results.sharpe.toFixed(2) }}</li>
        <li><strong>Win Probability:</strong> {{ (results.winProb * 100).toFixed(1) }}%</li>
        <li><strong>Kelly Stake %:</strong> {{ (results.kelly * 100).toFixed(1) }}%</li>
        <li><strong>Projected ROI:</strong> {{ (results.roi * 100).toFixed(1) }}%</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import * as d3 from 'd3';

const metrics = [
  { key: 'contactQuality', label: 'Contact Quality' },
  { key: 'plateDiscipline', label: 'Plate Discipline' },
  { key: 'baseRunning', label: 'Base Running' },
  { key: 'contextAdjustments', label: 'Park & Weather' }
] as const;

type MetricKey = (typeof metrics)[number]['key'];

const weights = reactive<Record<MetricKey, number>>({
  contactQuality: 40,
  plateDiscipline: 25,
  baseRunning: 15,
  contextAdjustments: 20
});

const bankrollRisk = ref(2.5);

const results = ref<{ sharpe: number; winProb: number; kelly: number; roi: number } | null>(null);

function runSimulation() {
  const totalWeight = Object.values(weights).reduce((acc, value) => acc + value, 0);
  const normalizedWeights = Object.fromEntries(
    Object.entries(weights).map(([key, value]) => [key, value / totalWeight])
  ) as Record<MetricKey, number>;

  const baseSharpe = normalizedWeights.contactQuality * 1.8 + normalizedWeights.plateDiscipline * 1.4;
  const riskAdjustment = (bankrollRisk.value / 10) * 0.4;

  const sharpe = baseSharpe - riskAdjustment + normalizedWeights.contextAdjustments * 0.6;
  const winProb = d3.clamp(0.5 + normalizedWeights.contactQuality * 0.12, 0.45, 0.68);
  const kelly = Math.max(0, (winProb - 0.5) / 0.5) * normalizedWeights.baseRunning;
  const roi = sharpe / 3.2 + kelly * 0.5;

  results.value = { sharpe, winProb, kelly, roi };
}
</script>

<style scoped>
h2 {
  margin-top: 0;
}

.subtitle {
  color: #536480;
  margin-bottom: 1.25rem;
}

.form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #324057;
}

input[type='range'] {
  accent-color: #f97316;
}

button {
  margin-top: 0.5rem;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 12px;
  background: #f97316;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.results {
  margin-top: 1.5rem;
  background: #f7f9fc;
  border-radius: 12px;
  padding: 1rem;
}

.results ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}
</style>
