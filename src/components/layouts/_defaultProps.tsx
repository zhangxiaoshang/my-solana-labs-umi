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
        path: '/pyth',
        name: 'Pyth',
        component: '@/pages/pyth',
      },
      {
        path: '/nft-descriptor',
        name: 'NFTDescriptor',
        component: '@/pages/NFTDescriptor',
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
