import { useState, useEffect } from 'react';
import { Card, Statistic } from 'antd';

export default () => {
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    const timer = setInterval(() => {
      updatePrice();
    }, 3000);

    return () => {
      console.log('clear');
      clearInterval(timer);
    };
  }, []);

  const updatePrice = () => {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
      .then((response) => response.json())
      .then((data) => setPrice(data.price));
  };

  return (
    <Card>
      <Statistic title="BTC/USDT(by Binance)" value={price} precision={4} />
    </Card>
  );
};
