import React from 'react';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      // {
      //   path: '/welcome',
      //   name: 'Welcome',
      //   component: './Welcome',
      // },

      {
        path: '/airdrop',
        name: 'Airdrop',
        component: '@/pages/airdrop',
      },
      {
        path: '/account',
        name: 'Account',
        component: '@/pages/account',
      },
      {
        path: '/pyth',
        name: 'Pyth',
        component: '@/pages/pyth',
      },
      {
        path: '/nft-descriptor',
        name: 'NFTDescriptor',
        component: '@/pages/NFTDescriptor',
      },
      {
        path: '/hash-rate-state',
        name: 'HashRateState',
        component: '@/pages/hashRateState',
      },
      {
        name: '称骨算命',
        routes: [
          {
            path: '/cgsm-nft',
            name: 'NFT',
            component: '@/pages/cgsmnft',
          },
          {
            path: '/cgsm',
            name: '称骨算命',
            component: '@/pages/cgsmnft/cgsm',
          },
        ],
      },

      // {
      //   path: 'https://ant.design',
      //   name: 'Ant Design 官网外链',
      //   icon: <AntDesignOutlined />,
      // },
    ],
  },
  location: {
    pathname: '/',
  },
};
