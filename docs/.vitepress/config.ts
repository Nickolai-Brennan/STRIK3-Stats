import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'STRIK3 Research Notes',
  description: 'Fantasy baseball and sports betting analytics playbook',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Custom Metrics', link: '/analytics/custom-metrics' },
      { text: 'Modeling Pipeline', link: '/engineering/pipeline' }
    ],
    sidebar: {
      '/analytics/': [
        {
          text: 'Analytics',
          items: [
            { text: 'Custom Metrics Primer', link: '/analytics/custom-metrics' },
            { text: 'Prop Market Exploits', link: '/analytics/prop-market-strategy' }
          ]
        }
      ],
      '/engineering/': [
        {
          text: 'Engineering',
          items: [
            { text: 'Modeling Pipeline', link: '/engineering/pipeline' },
            { text: 'Postgres Warehouse', link: '/engineering/postgres-warehouse' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  }
});
