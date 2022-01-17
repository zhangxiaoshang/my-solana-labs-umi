import { useEffect } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { HASH_RATE_STATE_PROGRAM_ID } from './ids';

export default () => {
  const { connection } = useConnection();
  useEffect(() => {
    init();
  }, [connection]);

  const init = async () => {
    const signatures = await connection.getConfirmedSignaturesForAddress2(HASH_RATE_STATE_PROGRAM_ID, {
      limit: 100,
    });

    console.log('signatures:', signatures);

    const signature = signatures[5].signature;
    console.log('signature: ', signature);

    const transaction = await connection.getConfirmedTransaction(signature);
    console.log('transaction: ', transaction?.transaction.instructions[0]);

    const transaction2 = await connection.getParsedConfirmedTransaction(signature);
    console.log('transaction2: ', transaction2?.transaction.message.instructions[0]);
  };

  return <div>Transaction</div>;
};
