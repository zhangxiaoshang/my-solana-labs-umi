import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { HashRateState, HASH_RATE_STATE_SCHEMA } from './model';
import { deserializeUnchecked } from 'borsh';
import { Row, Col, Card, Statistic } from 'antd';
import moment from 'moment';
import { Area } from '@ant-design/plots';

const HASH_RATE_STATE_PROGRAM_ID = new PublicKey('3ZYMjGLgMQTU5m1Xh4Deg6gzimE5bJw4JJ3muvHvGaeY');

export default () => {
  const { connection } = useConnection();
  const [state, setState] = useState<HashRateState>();

  useEffect(() => {
    initHashRateState();
  }, [connection]);

  const initHashRateState = async () => {
    const context = await connection.getAccountInfo(HASH_RATE_STATE_PROGRAM_ID);
    if (!context) return;

    const data = deserializeUnchecked(HASH_RATE_STATE_SCHEMA, HashRateState, context.data);
    console.log(data);
    setState(data);
  };

  if (!state) return null;

  const config = {
    height: 400,
    xField: 'text',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    smooth: true,
    tooltip: {
      formatter: (datum: any) => {
        return { name: 'Hashrate', value: datum.value + ' TH/s' };
      },
    },
    yAxis: {
      title: {
        text: 'TH/s',
      },
    },
  };

  const dayData: { text: string; value: number }[] = [];
  const hourData: { text: string; value: number }[] = [];

  state.hashrates_days.forEach((value, index) => {
    if (!value) return;
    const millisecond_per_day = 24 * 60 * 60 * 1000;
    const text = moment.utc(state.start_time + index * millisecond_per_day).format('MM-DD');

    dayData.push({
      text,
      value,
    });
  });

  state.hashrates_hours.forEach((value, index) => {
    if (!value) return;

    const millisecond_per_hour = 60 * 60 * 1000;
    const text = moment(state.start_time + index * millisecond_per_hour).format('HH:mm');

    hourData.push({
      text,
      value,
    });
  });

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="state_type" value={state.state_type} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="counter" value={state.counter} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="start_time" value={moment.utc(state.start_time).format('YYYY-MM-DD HH:mm:ss')} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Statistic title="publisher" value={state.publisher.toString()} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Hashrate of last 24 hours">
            <Area {...config} data={hourData} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Hashrate of last 1 year">
            <Area {...config} data={dayData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
