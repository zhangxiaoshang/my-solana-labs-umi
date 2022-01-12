import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/components/layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/airdrop' },
        { path: '/airdrop', component: '@/pages/airdrop' },
        { path: '/pyth', component: '@/pages/pyth' },
      ],
    },
  ],
  fastRefresh: {},
});
