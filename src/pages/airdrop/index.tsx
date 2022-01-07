import { useState, useEffect } from 'react';
import { Space, Button, InputNumber, message, Input } from 'antd';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import styles from './index.less';

export default function IndexPage() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(1); // require sol amount and max limit 2

  useEffect(() => {
    if (wallet.publicKey) {
      setAccount(wallet.publicKey?.toString());
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    initBalance();
  }, [account, connection]);

  const initBalance = async () => {
    if (!connection || !account) return;

    try {
      const { value } = await connection.getBalanceAndContext(
        new PublicKey(account),
      );
      setBalance(value);
    } catch (error) {}
  };

  const handleAirdrop = async () => {
    if (!amount || !account) {
      message.error('amount or account invalid');
      return;
    }

    try {
      const lamports = amount * LAMPORTS_PER_SOL;
      const hash = await connection.requestAirdrop(
        new PublicKey(account),
        lamports,
      );

      await connection.confirmTransaction(hash, 'confirmed');
      await initBalance();
      message.success(`hash: ${hash}`);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Space direction="vertical">
      <WalletMultiButton></WalletMultiButton>

      <div>
        <div>Account:</div>
        <Input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          style={{ width: '400px' }}
        />
      </div>

      <div>
        <div>Amount:</div>
        <InputNumber
          addonAfter="SOL"
          defaultValue={1}
          max={2}
          onChange={(val) => setAmount(val)}
        />
      </div>

      <div>Balance: {balance / LAMPORTS_PER_SOL}</div>

      <Button onClick={handleAirdrop}>Require SOL</Button>
    </Space>
  );
}
