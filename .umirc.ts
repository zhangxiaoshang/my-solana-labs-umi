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
        { path: '/home', component: '@/pages/index' },
        { path: '/airdrop', component: '@/pages/airdrop' },
      ],
    },
  ],
  fastRefresh: {},
});
