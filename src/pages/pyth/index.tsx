import { useEffect, useState } from 'react';
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';
import {
  PythConnection,
  getPythProgramKeyForCluster,
} from '@pythnetwork/client';
import { Card, Statistic, Row, Col } from 'antd';
import BinancePrice from './BinancePrice';

export default () => {
  const [price, setPrice] = useState<number>(); // BTC/USD

  useEffect(() => {
    const SOLANA_CLUSTER_NAME: Cluster = 'devnet';
    const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER_NAME));
    const pythPublicKey = getPythProgramKeyForCluster(SOLANA_CLUSTER_NAME);

    const pythConnection = new PythConnection(connection, pythPublicKey);
    pythConnection.onPriceChange((product, price) => {
      if (product.symbol === 'Crypto.BTC/USD') {
        // sample output:
        // SRM/USD: $8.68725 ±$0.0131
        if (price.price && price.confidence) {
          // tslint:disable-next-line:no-console
          // console.log(
          //   `${product.symbol}: $${price.price} \xB1$${price.confidence}`,
          // );
          setPrice(price.price);
        } else {
          // tslint:disable-next-line:no-console
          // console.log(`${product.symbol}: price currently unavailable`);
        }
      }
    });

    console.log('Reading from Pyth price feed...');
    pythConnection.start();

    return () => {
      pythConnection.stop();
    };
  }, []);

  return (
    <Row gutter={4}>
      <Col span={6}>
        <Card>
          <Statistic
            title="BTC/USD(by Pyth)"
            value={price}
            precision={4}
            prefix="$"
          />
        </Card>
      </Col>

      <Col span={6}>
        <BinancePrice></BinancePrice>
      </Col>
    </Row>
  );
};
