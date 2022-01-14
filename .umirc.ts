import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/my-solana-labs-umi/',
  hash: true,
  history: { type: 'hash' },

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
        { path: '/nft-descriptor', component: '@/pages/NFTDescriptor' },
        { path: '/hash-rate-state', component: '@/pages/hashRateState' },
      ],
    },
  ],
  fastRefresh: {},
});
