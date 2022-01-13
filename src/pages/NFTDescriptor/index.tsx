import tokenToColorHex from './tokenToColorHex';
import getCircleCoord from './getCircleCoord';
import scale from './scale';
import feeToPercentString from './feeToPercentString';
import { ConstructTokenURIParams, generateSVGImage } from './lib/NFTDescriptor';
import { encode } from 'js-base64';

const color1 = tokenToColorHex('0xabcdeabcdefabcdefabcdefabcdefabcdefabcdf', 136);
const color2 = tokenToColorHex('0x1234567890123456789123456789012345678901', 0);
const color3 = tokenToColorHex('0xabcdeabcdefabcdefabcdefabcdefabcdefabcdf', 0);
console.log(color1 === 'abcdea');
console.log(color2 === '678901');
console.log(color3 === 'fabcdf');

//
// ==============

const quoteTokenAddress = '0x1234567890123456789123456789012345678901'; // UNI
const baseTokenAddress = '0xabcdeabcdefabcdefabcdefabcdefabcdefabcdf'; // WETH

const c1 = getCircleCoord(quoteTokenAddress, 16, 123); // 174
const c2 = getCircleCoord(baseTokenAddress, 16, 123); // 150

const c3 = getCircleCoord(quoteTokenAddress, 32, 123); // 225
const c4 = getCircleCoord(baseTokenAddress, 32, 123); // 174

const c5 = getCircleCoord(quoteTokenAddress, 48, 123); // 21
const c6 = getCircleCoord(baseTokenAddress, 48, 123); // 21

console.log(c1, c1 === '174');
console.log(c2, c2 === '150');
console.log(c3, c3 === '225');
console.log(c4, c4 === '174');
console.log(c5, c5 === '21');
console.log(c6, c6 === '21');

//
// ================
const s1 = scale(getCircleCoord(quoteTokenAddress, 16, 123), 0, 255, 16, 274);
// x1 => 192
const s2 = scale(getCircleCoord(quoteTokenAddress, 32, 123), 0, 255, 16, 274);
// x2 => 243
const s3 = scale(getCircleCoord(quoteTokenAddress, 48, 123), 0, 255, 16, 274);
// x3 => 37
const s4 = scale(getCircleCoord(baseTokenAddress, 16, 123), 0, 255, 100, 484);
// y1 => 325
const s5 = scale(getCircleCoord(baseTokenAddress, 32, 123), 0, 255, 100, 484);
// y2 => 362
const s6 = scale(getCircleCoord(baseTokenAddress, 48, 123), 0, 255, 100, 484);
// y3 => 131
console.log(s1 === '192');
console.log(s2 === '243');
console.log(s3 === '37');
console.log(s4 === '325');
console.log(s5 === '362');
console.log(s6 === '131');

//
// =============
const str = feeToPercentString(500);
console.log('str: ', str);

//
// =============
const params: ConstructTokenURIParams = {
  tokenId: 123,
  quoteTokenAddress: '0x1234567890123456789123456789012345678901',
  baseTokenAddress: '0xabcdeabcdefabcdefabcdefabcdefabcdefabcdf',
  quoteTokenSymbol: 'UNI',
  baseTokenSymbol: 'WETH',
  tickLower: -1000,
  tickUpper: 2000,
  tickCurrent: 40,
  fee: 500,
  baseTokenDecimals: 18,
  quoteTokenDecimals: 18,
  flipRatio: false,
  tickSpacing: 60,
  poolAddress: `0x${'b'.repeat(40)}`,
};
const img = generateSVGImage(params);
const image = `data:image/svg+xml;base64, ${encode(img)}`;
console.log(img);

export default function IndexPage() {
  return (
    <div>
      <h1>Page index</h1>
      <img src={image} />
    </div>
  );
}
