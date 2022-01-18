import { useState } from 'react';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Card, Input, Typography, Button, Space, Switch } from 'antd';

const { Text, Paragraph } = Typography;

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let stop = false;
export default () => {
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState('^mrc|^soL');

  const [account, setAccount] = useState<Keypair>();
  const [count, setCount] = useState(0);
  const [ignoreUppercase, setIgnoreUppercase] = useState(true);

  const generateKeypair = async () => {
    setLoading(true);
    stop = false;

    try {
      let keypair;
      let finded = false;
      let count = 0;

      const regexp = ignoreUppercase ? new RegExp(pattern, 'i') : new RegExp(pattern);
      console.log('regexp: ', regexp);

      do {
        count++;
        keypair = new Keypair();

        console.log(keypair.publicKey.toBase58());

        if (regexp.test(keypair.publicKey.toBase58())) {
          finded = true;

          console.log(keypair);

          const data = {
            publicKey: keypair.publicKey.toBase58(),
            secretKey: `[${keypair.secretKey.toString()}]`,
          };

          console.log('secretKey:', data.secretKey);
          localStorage.setItem('keypair', JSON.stringify(data));
          setAccount(keypair);
        }

        if (count % 100 === 0) {
          setCount(count);
          await sleep(50);
        }

        if (stop) {
          setLoading(false);
          break;
        }
      } while (!finded);
    } catch (error) {
      console.error(error);
    }

    console.log('done');

    setLoading(false);
  };

  return (
    <>
      <Paragraph>Base58编码介绍： Base64是很多人熟知的一种编码，在URL传输领域，还有类似的Base32编码。</Paragraph>

      <Paragraph>Base58编码去掉了一些特殊字符及容易混淆的字母和数字</Paragraph>

      <Paragraph>
        <ul>
          <li>1、Base_58 主要是用于“比特币”中使用的一种独特的编码方式，主要用于产生“比特币”的钱包地址。</li>
          <li>
            2、相比Base_64，Base_58 不使用<Text mark> 数字 0 </Text>，<Text mark> 字母大写 O </Text>，
            <Text mark> 字母大写 I (i的大写) </Text>，和
            <Text mark> 字母小写 l (L的小写) </Text>，以及 “+“ 和 “/“ 符号，比Base64共减少6个字符，故称着Base58。
          </li>
        </ul>
      </Paragraph>

      <Paragraph>
        Base58编码字符：
        <ul>
          <li>123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz</li>
        </ul>
      </Paragraph>

      <Paragraph>
        Base58编码优势：
        <ul>
          <li>1、易读，没有混淆的字母和数字。</li>
          <li>2、此编码是一个混淆编码，看上去像Base64，但是其实不是；同时编码效率又高于Base32</li>
        </ul>
      </Paragraph>

      <Card>
        <Space direction="vertical">
          <Input
            placeholder={`input regexp e.g. ${pattern}`}
            style={{ width: '460px' }}
            disabled={loading}
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
          <Switch
            checkedChildren="不区分大小写"
            unCheckedChildren="区分大小写"
            checked={ignoreUppercase}
            onChange={() => setIgnoreUppercase(!ignoreUppercase)}
          />
          <a
            href={`https://regexper.com/#${ignoreUppercase ? new RegExp(pattern, 'i') : new RegExp(pattern)}`}
            target="_blank"
            style={{ textDecoration: 'underline' }}
          >
            regexper
          </a>
          <Button type="primary" onClick={generateKeypair} loading={loading}>
            开始 {count}
          </Button>

          <Button onClick={() => (stop = true)} disabled={!loading}>
            停止
          </Button>

          <p>{account?.publicKey.toBase58()}</p>
        </Space>
      </Card>
    </>
  );
};
