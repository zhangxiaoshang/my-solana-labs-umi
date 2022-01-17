import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { HashRateState, HASH_RATE_STATE_SCHEMA } from './model';
import { deserializeUnchecked } from 'borsh';
import { Row, Col, Card, Statistic } from 'antd';
import moment from 'moment';
import { Area } from '@ant-design/plots';
import Transaction from './Transaction';
import { HASH_RATE_STATE_PROGRAM_ID } from './ids';
import numbro from 'numbro';

export default () => {
  const { connection } = useConnection();
  const [state, setState] = useState<HashRateState>();
  const [poolStatus, setPoolStatus] = useState<any>();

  const initPoolStatus = () => {
    fetch('https://pool.api.btc.com/v1/pool/status/?puid=728545')
      .then((response) => response.json())
      .then((data) => {
        console.log('poolStatus: ', data);
        setPoolStatus(data.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    initHashRateState();
  }, [connection]);

  useEffect(() => {
    initPoolStatus();
  }, []);

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

      // grid: {
      //   line: {
      //     style: {},
      //   },
      // },
    },

    guideLine: [
      {
        type: 'mean',
        lineStyle: {
          stroke: 'red',
          lineDash: [4, 2],
        },
        text: {
          position: 'end',
          content: '平均值',
          style: {
            fill: 'red',
          },
        },
      },
    ],
  };

  const dayData: { text: string; value: number }[] = [];
  const hourData: { text: string; value: number }[] = [];

  // get last 1 year data
  (() => {
    if (!state?.hashrates_days.length) return;
    let start_moment = moment.utc(state.start_time);
    const end_moment = moment.utc();

    const millisecond_per_day = 24 * 60 * 60 * 1000;

    let i = 0;
    do {
      const text = moment.utc(start_moment).format('MM-DD');
      dayData.push({
        text,
        value: state?.hashrates_days[i],
      });

      start_moment.add(millisecond_per_day, 'milliseconds');
      i++;
    } while (start_moment.isBefore(end_moment));
  })();

  // get last 24h data
  (() => {
    if (!state?.hashrates_hours.length) return;
    const start_moment = moment.utc(state.start_time);
    let last_24h_start = moment
      .utc()
      .hour(start_moment.hour())
      .minute(start_moment.minute())
      .second(start_moment.second());
    console.log('last_24h_start:', last_24h_start.format('YYYY-MM-DD HH:mm:ss'));
    const last_24h_end = moment.utc();
    console.log('last_24h_end: ', last_24h_end.format('YYYY-MM-DD HH:mm:ss'));
    const millisecond_per_hour = 60 * 60 * 1000;
    let i = 0;
    do {
      const text = moment.utc(last_24h_start).format('HH:mm');
      hourData.push({
        text,
        value: state?.hashrates_hours[i],
      });
      last_24h_start.add(millisecond_per_hour, 'milliseconds');
      i++;
    } while (last_24h_start.isBefore(last_24h_end));
  })();

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
            <Statistic
              title="start_time"
              value={moment.utc(state.start_time).format('YYYY-MM-DD HH:mm:ss') + ' (UTC)'}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Hashrate"
              value={poolStatus?.network_hashrate}
              suffix={poolStatus?.network_hashrate_unit + 'H/s'}
              formatter={(value) => (
                <a href="https://btc.com/" target="_blank" style={{ textDecoration: 'underline' }}>
                  {value}
                </a>
              )}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Next Difficulty"
              value={poolStatus?.estimated_next_difficulty / 1e12}
              formatter={(value) => (
                <a href="https://btc.com/" target="_blank" style={{ textDecoration: 'underline' }}>
                  {numbro(value).format({ mantissa: 2 })}
                </a>
              )}
              suffix={
                <span>
                  {poolStatus?.mining_earnings_unit}
                  <span style={{ fontSize: '14px' }}>{poolStatus?.difficulty_change}</span>
                </span>
              }
            />
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

        <Col span={24}>
          <Card title="Transaction">
            <Transaction />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
