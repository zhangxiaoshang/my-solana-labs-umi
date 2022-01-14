import BN from 'bn.js';
import { Buffer } from 'buffer';
import { PublicKey } from '@solana/web3.js';

export class HashRateState {
  state_type: number;
  counter: number;
  publisher: PublicKey;
  start_time: number;
  hashrates_hours: number[];
  hashrates_days: number[];

  constructor(args: { state_type: number; counter: number; publisher: Uint8Array; start_time: BN; hashrates_hours: Uint8Array[]; hashrates_days: Uint8Array[] }) {
    this.state_type = args.state_type;
    this.counter = args.counter;
    this.publisher = new PublicKey(args.publisher);
    this.start_time = args.start_time.mul(new BN('1000')).toNumber();
    this.hashrates_hours = args.hashrates_hours.map((hour) => Buffer.from(hour.buffer).readFloatLE(0));
    this.hashrates_days = args.hashrates_days.map((day) => Buffer.from(day.buffer).readFloatLE(0));
  }
}

export const HASH_RATE_STATE_SCHEMA = new Map([
  [
    HashRateState,
    {
      kind: 'struct',
      fields: [
        ['state_type', 'u8'],
        ['counter', 'u32'],
        ['publisher', [32]],
        ['start_time', 'u64'],
        ['hashrates_hours', [[4]]],
        ['hashrates_days', [[4]]],
      ],
    },
  ],
]);
