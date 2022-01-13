import { SVGParams, generateSVG } from './NFTSVG';
import tokenToColorHex from '../tokenToColorHex';
import getCircleCoord from '../getCircleCoord';
import scale from '../scale';

export interface ConstructTokenURIParams {
  tokenId: number;
  quoteTokenAddress: string;
  baseTokenAddress: string;
  quoteTokenSymbol: string;
  baseTokenSymbol: string;
  quoteTokenDecimals: number;
  baseTokenDecimals: number;
  flipRatio: boolean;
  tickLower: number;
  tickUpper: number;
  tickCurrent: number;
  tickSpacing: number;
  fee: number;
  poolAddress: string;
}

function overRange(tickLower: number, tickUpper: number, tickCurrent: number): number {
  if (tickCurrent < tickLower) {
    return -1;
  } else if (tickCurrent > tickUpper) {
    return 1;
  } else {
    return 0;
  }
}
export function generateSVGImage(params: ConstructTokenURIParams): string {
  const svgParams: SVGParams = {
    quoteToken: params.quoteTokenAddress,
    baseToken: params.baseTokenAddress,
    poolAddress: params.poolAddress,
    quoteTokenSymbol: params.quoteTokenSymbol,
    baseTokenSymbol: params.baseTokenSymbol,
    feeTier: '0.05%',
    tickLower: params.tickLower,
    tickUpper: params.tickUpper,
    tickSpacing: params.tickSpacing,
    overRange: overRange(params.tickLower, params.tickUpper, params.tickCurrent),
    tokenId: params.tokenId,
    color0: tokenToColorHex(params.quoteTokenAddress, 136),
    color1: tokenToColorHex(params.baseTokenAddress, 136),
    color2: tokenToColorHex(params.quoteTokenAddress, 0),
    color3: tokenToColorHex(params.baseTokenAddress, 0),
    x1: scale(getCircleCoord(params.quoteTokenAddress, 16, params.tokenId), 0, 255, 16, 274),
    y1: scale(getCircleCoord(params.baseTokenAddress, 16, params.tokenId), 0, 255, 100, 484),
    x2: scale(getCircleCoord(params.quoteTokenAddress, 32, params.tokenId), 0, 255, 16, 274),
    y2: scale(getCircleCoord(params.baseTokenAddress, 32, params.tokenId), 0, 255, 100, 484),
    x3: scale(getCircleCoord(params.quoteTokenAddress, 48, params.tokenId), 0, 255, 16, 274),
    y3: scale(getCircleCoord(params.baseTokenAddress, 48, params.tokenId), 0, 255, 100, 484),
  };

  console.log('svgParams: ', svgParams);

  return generateSVG(svgParams);
}
