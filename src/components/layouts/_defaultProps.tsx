import React from 'react';
import {
  SmileOutlined,
  CrownOutlined,
  TabletOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: 'Welcome',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
      {
        path: '/airdrop',
        name: 'Airdrop',
        icon: <SmileOutlined />,
        component: '@/pages/airdrop',
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
