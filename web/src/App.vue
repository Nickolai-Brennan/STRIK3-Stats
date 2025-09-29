<template>
  <div class="app">
    <header class="hero">
      <h1>STRIK3 Stats Lab</h1>
      <p>
        Fantasy baseball and sports betting intelligence built on advanced metrics,
        predictive modeling, and transparent data pipelines.
      </p>
    </header>

    <section class="layout">
      <StatsTable class="layout__table" />
      <ModelConfigurator class="layout__config" />
    </section>

    <section class="resources">
      <h2>Explore the Knowledge Base</h2>
      <ul>
        <li>
          <a href="../docs/index.md" target="_blank" rel="noopener">
            STRIK3 Research Articles (VitePress)
          </a>
        </li>
        <li>
          <a href="../ebooks/fantasy-baseball-handbook.md" target="_blank" rel="noopener">
            Fantasy Baseball Data Handbook (eBook)
          </a>
        </li>
        <li>
          <a href="https://www.tanstack.com/table/v8" target="_blank" rel="noopener">
            Learn more about TanStack Table
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import StatsTable from './components/StatsTable.vue';
import ModelConfigurator from './components/ModelConfigurator.vue';
</script>

<style scoped>
.app {
  font-family: 'Inter', system-ui, sans-serif;
  color: #0a1930;
  background: linear-gradient(180deg, #f3f6fb 0%, #ffffff 100%);
  min-height: 100vh;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.75rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.08em;
}

.hero p {
  font-size: 1.1rem;
  max-width: 48rem;
  margin: 0 auto;
}

.layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.layout__table,
.layout__config {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(10, 25, 48, 0.08);
}

.resources {
  margin-top: 2.5rem;
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(10, 25, 48, 0.08);
}

.resources ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.resources li {
  flex: 1 1 18rem;
}

.resources a {
  color: #0a1930;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
