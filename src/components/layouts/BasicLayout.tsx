import React, { useState } from 'react';
import { useHistory, useLocation } from 'umi';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import WalletAdapterProvider from '@/components/WalletAdapterProvider';

export default ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  // const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        headerRender={() => null}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && 'Preview Pro'}
            </a>
          );
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              // setPathname(item.path || '/welcome');
              history.push(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer content={content}>
          <div
            style={{
              height: 'calc(100vh - 168px)',
              overflow: 'auto',
            }}
          >
            <WalletAdapterProvider>{children}</WalletAdapterProvider>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
