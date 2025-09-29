<template>
  <div>
    <header class="table-header">
      <div>
        <h2>Projected Fantasy Value Leaders</h2>
        <p>
          Weighted metrics blend plate discipline, quality-of-contact, and contextual run values
          to surface fantasy and betting edges.
        </p>
      </div>
      <div class="controls">
        <label>
          Projection Horizon
          <select v-model.number="state.horizon">
            <option v-for="option in horizons" :key="option" :value="option">
              {{ option }} games
            </option>
          </select>
        </label>
        <label>
          Slate Type
          <select v-model="state.mode">
            <option value="season">Full Season</option>
            <option value="dfs">DFS Slate</option>
            <option value="prop">Prop Market</option>
          </select>
        </label>
      </div>
    </header>

    <table>
      <thead>
        <tr>
          <th v-for="header in table.getHeaderGroups()[0].headers" :key="header.id">
            <span>{{ header.column.columnDef.header }}</span>
            <button v-if="header.column.getCanSort()" @click="header.column.toggleSorting()">
              {{ header.column.getIsSorted() === 'asc' ? '▲' : header.column.getIsSorted() === 'desc' ? '▼' : '⇵' }}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            {{ flexRender(cell.column.columnDef.cell, cell.getContext()) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { flexRender, getCoreRowModel, getSortedRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table';
import { players, type PlayerProjection } from '../data/fantasyMetrics';

type SlateMode = 'season' | 'dfs' | 'prop';

const horizons = [7, 14, 30, 60];

const state = reactive({
  horizon: 30,
  mode: 'season' as SlateMode
});

type TableProjection = PlayerProjection & {
  fantasyPointsValue: number;
  propEdgeValue: number;
};

const columns: ColumnDef<TableProjection, any>[] = [
  {
    accessorKey: 'player',
    header: 'Player'
  },
  {
    accessorKey: 'team',
    header: 'Team'
  },
  {
    accessorKey: 'position',
    header: 'Pos'
  },
  {
    accessorKey: 'sor',
    header: 'Stuff+ vs. Opp',
    cell: ({ getValue }) => getValue().toFixed(1)
  },
  {
    accessorKey: 'pa',
    header: 'Proj PA'
  },
  {
    accessorKey: 'woba',
    header: 'xwOBA',
    cell: ({ getValue }) => getValue().toFixed(3)
  },
  {
    accessorKey: 'barrelRate',
    header: 'Barrel%',
    cell: ({ getValue }) => `${(getValue() * 100).toFixed(1)}%`
  },
  {
    accessorKey: 'contactScore',
    header: 'Contact Quality',
    cell: ({ getValue }) => getValue().toFixed(1)
  },
  {
    accessorKey: 'propEdgeValue',
    header: 'Prop Edge',
    cell: ({ getValue }) => `${(getValue() * 100).toFixed(1)}%`
  },
  {
    accessorKey: 'fantasyPointsValue',
    header: 'Proj Fantasy Pts',
    cell: ({ getValue }) => getValue().toFixed(1)
  }
];

const tableData = computed<TableProjection[]>(() =>
  players.map((player) => ({
    ...player,
    fantasyPointsValue: player.fantasyPoints[state.mode][state.horizon] ?? 0,
    propEdgeValue: player.propEdge[state.mode]
  }))
);

const table = useVueTable({
  data: tableData,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel()
});
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.table-header h2 {
  margin: 0 0 0.25rem;
}

.controls {
  display: flex;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5a73;
}

select {
  margin-top: 0.25rem;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  border: 1px solid #cfd9ea;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #0a1930;
  color: #fff;
}

thead th {
  text-align: left;
  padding: 0.75rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

thead button {
  margin-left: 0.5rem;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

tbody tr:nth-child(2n) {
  background: #f7f9fc;
}

tbody td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5ecf8;
  font-weight: 500;
}

@media (max-width: 960px) {
  .table-header {
    flex-direction: column;
  }

  .controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
