export interface PlayerProjection {
  player: string;
  team: string;
  position: string;
  sor: number;
  pa: number;
  woba: number;
  barrelRate: number;
  contactScore: number;
  fantasyPoints: Record<'season' | 'dfs' | 'prop', Record<number, number>>;
  propEdge: Record<'season' | 'dfs' | 'prop', number>;
}

export const players: PlayerProjection[] = [
  {
    player: 'Ronald Acuña Jr.',
    team: 'ATL',
    position: 'OF',
    sor: 112.4,
    pa: 650,
    woba: 0.413,
    barrelRate: 0.165,
    contactScore: 132.5,
    fantasyPoints: {
      season: { 7: 24.8, 14: 49.2, 30: 106.8, 60: 208.4 },
      dfs: { 7: 26.2, 14: 52.4, 30: 110.2, 60: 216.5 },
      prop: { 7: 5.8, 14: 11.5, 30: 24.2, 60: 46.1 }
    },
    propEdge: {
      season: 0.124,
      dfs: 0.148,
      prop: 0.208
    }
  },
  {
    player: 'Shohei Ohtani',
    team: 'LAA',
    position: 'DH',
    sor: 118.7,
    pa: 640,
    woba: 0.427,
    barrelRate: 0.192,
    contactScore: 141.1,
    fantasyPoints: {
      season: { 7: 26.4, 14: 53.6, 30: 115.2, 60: 221.1 },
      dfs: { 7: 28.1, 14: 56.5, 30: 120.3, 60: 229.7 },
      prop: { 7: 6.4, 14: 12.9, 30: 27.3, 60: 51.9 }
    },
    propEdge: {
      season: 0.142,
      dfs: 0.177,
      prop: 0.234
    }
  },
  {
    player: 'Julio Rodríguez',
    team: 'SEA',
    position: 'OF',
    sor: 106.2,
    pa: 620,
    woba: 0.379,
    barrelRate: 0.154,
    contactScore: 118.5,
    fantasyPoints: {
      season: { 7: 22.1, 14: 44.3, 30: 95.4, 60: 181.6 },
      dfs: { 7: 23.4, 14: 46.8, 30: 99.8, 60: 190.3 },
      prop: { 7: 5.1, 14: 10.2, 30: 21.6, 60: 40.5 }
    },
    propEdge: {
      season: 0.108,
      dfs: 0.129,
      prop: 0.182
    }
  },
  {
    player: 'Corey Seager',
    team: 'TEX',
    position: 'SS',
    sor: 101.9,
    pa: 600,
    woba: 0.401,
    barrelRate: 0.153,
    contactScore: 126.3,
    fantasyPoints: {
      season: { 7: 21.5, 14: 43.2, 30: 91.8, 60: 175.2 },
      dfs: { 7: 22.8, 14: 45.9, 30: 96.5, 60: 183.7 },
      prop: { 7: 4.7, 14: 9.4, 30: 20.8, 60: 38.9 }
    },
    propEdge: {
      season: 0.097,
      dfs: 0.119,
      prop: 0.168
    }
  },
  {
    player: 'Spencer Strider',
    team: 'ATL',
    position: 'SP',
    sor: 129.6,
    pa: 0,
    woba: 0.217,
    barrelRate: 0.045,
    contactScore: 162.4,
    fantasyPoints: {
      season: { 7: 32.5, 14: 64.7, 30: 138.2, 60: 271.5 },
      dfs: { 7: 34.9, 14: 69.8, 30: 149.5, 60: 291.8 },
      prop: { 7: 8.3, 14: 16.4, 30: 34.7, 60: 66.9 }
    },
    propEdge: {
      season: 0.183,
      dfs: 0.214,
      prop: 0.287
    }
  }
];
