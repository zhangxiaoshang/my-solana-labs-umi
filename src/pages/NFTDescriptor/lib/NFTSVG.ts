import { encode } from 'js-base64';

export interface SVGParams {
  quoteToken: string;
  baseToken: string;
  poolAddress: string;
  quoteTokenSymbol: string;
  baseTokenSymbol: string;
  feeTier: string;
  tickLower: number;
  tickUpper: number;
  tickSpacing: number;
  overRange: number;
  tokenId: number;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  x3: string;
  y3: string;
}

function generateSVGDefs(params: SVGParams) {
  return [
    '<svg width="290" height="500" viewBox="0 0 290 500" xmlns="http://www.w3.org/2000/svg"',
    " xmlns:xlink='http://www.w3.org/1999/xlink'>",
    '<defs>',
    '<filter id="f1"><feImage result="p0" xlink:href="data:image/svg+xml;base64,',
    encode(
      ["<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><rect width='290px' height='500px' fill='#", params.color0, "'/></svg>"].join(''),
    ),
    '"/><feImage result="p1" xlink:href="data:image/svg+xml;base64,',
    encode(
      [
        "<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='",
        params.x1,
        "' cy='",
        params.y1,
        "' r='120px' fill='#",
        params.color1,
        "'/></svg>",
      ].join(''),
    ),
    '"/><feImage result="p2" xlink:href="data:image/svg+xml;base64,',
    encode(
      [
        "<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='",
        params.x2,
        "' cy='",
        params.y2,
        "' r='120px' fill='#",
        params.color2,
        "'/></svg>",
      ].join(''),
    ),
    '" />',
    '<feImage result="p3" xlink:href="data:image/svg+xml;base64,',
    encode(
      [
        "<svg width='290' height='500' viewBox='0 0 290 500' xmlns='http://www.w3.org/2000/svg'><circle cx='",
        params.x3,
        "' cy='",
        params.y3,
        "' r='100px' fill='#",
        params.color3,
        "'/></svg>",
      ].join(''),
    ),
    '" /><feBlend mode="overlay" in="p0" in2="p1" /><feBlend mode="exclusion" in2="p2" /><feBlend mode="overlay" in2="p3" result="blendOut" /><feGaussianBlur ',
    'in="blendOut" stdDeviation="42" /></filter> <clipPath id="corners"><rect width="290" height="500" rx="42" ry="42" /></clipPath>',
    '<path id="text-path-a" d="M40 12 H250 A28 28 0 0 1 278 40 V460 A28 28 0 0 1 250 488 H40 A28 28 0 0 1 12 460 V40 A28 28 0 0 1 40 12 z" />',
    '<path id="minimap" d="M234 444C234 457.949 242.21 463 253 463" />',
    '<filter id="top-region-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="24" /></filter>',
    '<linearGradient id="grad-up" x1="1" x2="0" y1="1" y2="0"><stop offset="0.0" stop-color="white" stop-opacity="1" />',
    '<stop offset=".9" stop-color="white" stop-opacity="0" /></linearGradient>',
    '<linearGradient id="grad-down" x1="0" x2="1" y1="0" y2="1"><stop offset="0.0" stop-color="white" stop-opacity="1" /><stop offset="0.9" stop-color="white" stop-opacity="0" /></linearGradient>',
    '<mask id="fade-up" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#grad-up)" /></mask>',
    '<mask id="fade-down" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#grad-down)" /></mask>',
    '<mask id="none" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="white" /></mask>',
    '<linearGradient id="grad-symbol"><stop offset="0.7" stop-color="white" stop-opacity="1" /><stop offset=".95" stop-color="white" stop-opacity="0" /></linearGradient>',
    '<mask id="fade-symbol" maskContentUnits="userSpaceOnUse"><rect width="290px" height="200px" fill="url(#grad-symbol)" /></mask></defs>',
    '<g clip-path="url(#corners)">',
    '<rect fill="',
    params.color0,
    '" x="0px" y="0px" width="290px" height="500px" />',
    '<rect style="filter: url(#f1)" x="0px" y="0px" width="290px" height="500px" />',
    ' <g style="filter:url(#top-region-blur); transform:scale(1.5); transform-origin:center top;">',
    '<rect fill="none" x="0px" y="0px" width="290px" height="500px" />',
    '<ellipse cx="50%" cy="0px" rx="180px" ry="120px" fill="#000" opacity="0.85" /></g>',
    '<rect x="0" y="0" width="290" height="500" rx="42" ry="42" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.2)" /></g>',
  ].join('');
}

function generateSVGBorderText(quoteToken: string, baseToken: string, quoteTokenSymbol: string, baseTokenSymbol: string): string {
  return [
    '<text text-rendering="optimizeSpeed">',
    '<textPath startOffset="-100%" fill="white" font-family="\'Courier New\', monospace" font-size="10px" xlink:href="#text-path-a">',
    baseToken,
    ' • ',
    baseTokenSymbol,
    ' <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" />',
    '</textPath> <textPath startOffset="0%" fill="white" font-family="\'Courier New\', monospace" font-size="10px" xlink:href="#text-path-a">',
    baseToken,
    ' • ',
    baseTokenSymbol,
    ' <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /> </textPath>',
    '<textPath startOffset="50%" fill="white" font-family="\'Courier New\', monospace" font-size="10px" xlink:href="#text-path-a">',
    quoteToken,
    ' • ',
    quoteTokenSymbol,
    ' <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"',
    ' repeatCount="indefinite" /></textPath><textPath startOffset="-50%" fill="white" font-family="\'Courier New\', monospace" font-size="10px" xlink:href="#text-path-a">',
    quoteToken,
    ' • ',
    quoteTokenSymbol,
    ' <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /></textPath></text>',
  ].join('');
}

function generateSVGCardMantle(quoteTokenSymbol: string, baseTokenSymbol: string, feeTier: string): string {
  return [
    '<g mask="url(#fade-symbol)"><rect fill="none" x="0px" y="0px" width="290px" height="200px" /> <text y="70px" x="32px" fill="white" font-family="\'Courier New\', monospace" font-weight="200" font-size="36px">',
    quoteTokenSymbol,
    '/',
    baseTokenSymbol,
    '</text><text y="115px" x="32px" fill="white" font-family="\'Courier New\', monospace" font-weight="200" font-size="36px">',
    feeTier,
    '</text></g>',
    '<rect x="16" y="16" width="258" height="468" rx="26" ry="26" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.2)" />',
  ].join('');
}

const curve1 = 'M1 1C41 41 105 105 145 145';
const curve2 = 'M1 1C33 49 97 113 145 145';
const curve3 = 'M1 1C33 57 89 113 145 145';
const curve4 = 'M1 1C25 65 81 121 145 145';
const curve5 = 'M1 1C17 73 73 129 145 145';
const curve6 = 'M1 1C9 81 65 137 145 145';
const curve7 = 'M1 1C1 89 57.5 145 145 145';
const curve8 = 'M1 1C1 97 49 145 145 145';
function getCurve(tickLower: number, tickUpper: number, tickSpacing: number): string {
  let curve;
  const tickRange = (tickUpper - tickLower) / tickSpacing;
  if (tickRange <= 4) {
    curve = curve1;
  } else if (tickRange <= 8) {
    curve = curve2;
  } else if (tickRange <= 16) {
    curve = curve3;
  } else if (tickRange <= 32) {
    curve = curve4;
  } else if (tickRange <= 64) {
    curve = curve5;
  } else if (tickRange <= 128) {
    curve = curve6;
  } else if (tickRange <= 256) {
    curve = curve7;
  } else {
    curve = curve8;
  }

  return curve;
}

function generateSVGCurveCircle(overRange: number): string {
  const curvex1 = '73';
  const curvey1 = '190';
  const curvex2 = '217';
  const curvey2 = '334';

  let svg;
  if (overRange == 1 || overRange == -1) {
    svg = [
      '<circle cx="',
      overRange == -1 ? curvex1 : curvex2,
      'px" cy="',
      overRange == -1 ? curvey1 : curvey2,
      'px" r="4px" fill="white" /><circle cx="',
      overRange == -1 ? curvex1 : curvex2,
      'px" cy="',
      overRange == -1 ? curvey1 : curvey2,
      'px" r="24px" fill="none" stroke="white" />',
    ].join('');
  } else {
    svg = ['<circle cx="', curvex1, 'px" cy="', curvey1, 'px" r="4px" fill="white" />', '<circle cx="', curvex2, 'px" cy="', curvey2, 'px" r="4px" fill="white" />'].join('');
  }
  return svg;
}
function generageSvgCurve(tickLower: number, tickUpper: number, tickSpacing: number, overRange: number): string {
  const fade = overRange == 1 ? '#fade-up' : overRange == -1 ? '#fade-down' : '#none';
  const curve = getCurve(tickLower, tickUpper, tickSpacing);
  return [
    '<g mask="url(',
    fade,
    ')"',
    ' style="transform:translate(72px,189px)">',
    '<rect x="-16px" y="-16px" width="180px" height="180px" fill="none" />',
    '<path d="',
    curve,
    '" stroke="rgba(0,0,0,0.3)" stroke-width="32px" fill="none" stroke-linecap="round" />',
    '</g><g mask="url(',
    fade,
    ')"',
    ' style="transform:translate(72px,189px)">',
    '<rect x="-16px" y="-16px" width="180px" height="180px" fill="none" />',
    '<path d="',
    curve,
    '" stroke="rgba(255,255,255,1)" fill="none" stroke-linecap="round" /></g>',
    generateSVGCurveCircle(overRange),
  ].join('');
}

function tickToString(tick: number): string {
  let sign = '';
  if (tick < 0) {
    tick = tick * -1;
    sign = '-';
  }
  return [sign, tick.toString()].join('');
}
function rangeLocation(tickLower: number, tickUpper: number): [string, string] {
  let midPoint: number = (tickLower + tickUpper) / 2;

  if (midPoint < -125_000) {
    return ['8', '7'];
  } else if (midPoint < -75_000) {
    return ['8', '10.5'];
  } else if (midPoint < -25_000) {
    return ['8', '14.25'];
  } else if (midPoint < -5_000) {
    return ['10', '18'];
  } else if (midPoint < 0) {
    return ['11', '21'];
  } else if (midPoint < 5_000) {
    return ['13', '23'];
  } else if (midPoint < 25_000) {
    return ['15', '25'];
  } else if (midPoint < 75_000) {
    return ['18', '26'];
  } else if (midPoint < 125_000) {
    return ['21', '27'];
  } else {
    return ['24', '27'];
  }
}
function generateSVGPositionDataAndLocationCurve(tokenId: string, tickLower: number, tickUpper: number): string {
  const tickLowerStr: string = tickToString(tickLower);
  const tickUpperStr: string = tickToString(tickUpper);
  const str1length = String(tokenId).length + 4;
  const str2length = String(tickLowerStr).length + 10;
  const str3length = String(tickUpperStr).length + 10;
  const [xCoord, yCoord] = rangeLocation(tickLower, tickUpper);

  return [
    ' <g style="transform:translate(29px, 384px)">',
    '<rect width="',
    (7 * (str1length + 4)).toString(),
    'px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.6)" />',
    '<text x="12px" y="17px" font-family="\'Courier New\', monospace" font-size="12px" fill="white"><tspan fill="rgba(255,255,255,0.6)">ID: </tspan>',
    tokenId,
    '</text></g>',
    ' <g style="transform:translate(29px, 414px)">',
    '<rect width="',
    (7 * (str2length + 4)).toString(),
    'px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.6)" />',
    '<text x="12px" y="17px" font-family="\'Courier New\', monospace" font-size="12px" fill="white"><tspan fill="rgba(255,255,255,0.6)">Min Tick: </tspan>',
    tickLowerStr,
    '</text></g>',
    ' <g style="transform:translate(29px, 444px)">',
    '<rect width="',
    (7 * (str3length + 4)).toString(),
    'px" height="26px" rx="8px" ry="8px" fill="rgba(0,0,0,0.6)" />',
    '<text x="12px" y="17px" font-family="\'Courier New\', monospace" font-size="12px" fill="white"><tspan fill="rgba(255,255,255,0.6)">Max Tick: </tspan>',
    tickUpperStr,
    '</text></g>',
    '<g style="transform:translate(226px, 433px)">',
    '<rect width="36px" height="36px" rx="8px" ry="8px" fill="none" stroke="rgba(255,255,255,0.2)" />',
    '<path stroke-linecap="round" d="M8 9C8.00004 22.9494 16.2099 28 27 28" fill="none" stroke="white" />',
    '<circle style="transform:translate3d(',
    xCoord,
    'px, ',
    yCoord,
    'px, 0px)" cx="0px" cy="0px" r="4px" fill="white"/></g>',
  ].join('');
}

function isRare(): boolean {
  return Math.random() > 0.5;
}
function generateSVGRareSparkle(tokenId: number, poolAddress: string): string {
  if (isRare()) {
    return [
      '<g style="transform:translate(226px, 392px)"><rect width="36px" height="36px" rx="8px" ry="8px" fill="none" stroke="rgba(255,255,255,0.2)" />',
      '<g><path style="transform:translate(6px,6px)" d="M12 0L12.6522 9.56587L18 1.6077L13.7819 10.2181L22.3923 6L14.4341 ',
      '11.3478L24 12L14.4341 12.6522L22.3923 18L13.7819 13.7819L18 22.3923L12.6522 14.4341L12 24L11.3478 14.4341L6 22.39',
      '23L10.2181 13.7819L1.6077 18L9.56587 12.6522L0 12L9.56587 11.3478L1.6077 6L10.2181 10.2181L6 1.6077L11.3478 9.56587L12 0Z" fill="white" />',
      '<animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="10s" repeatCount="indefinite"/></g></g>',
    ].join('');
  } else {
    return '';
  }
}

export function generateSVG(params: SVGParams): string {
  return [
    generateSVGDefs(params),
    generateSVGBorderText(params.quoteToken, params.quoteTokenSymbol, params.baseToken, params.baseTokenSymbol),
    generateSVGCardMantle(params.quoteTokenSymbol, params.baseTokenSymbol, params.feeTier),
    generageSvgCurve(params.tickLower, params.tickUpper, params.tickSpacing, params.overRange),
    generateSVGPositionDataAndLocationCurve(params.tokenId.toString(), params.tickLower, params.tickUpper),
    generateSVGRareSparkle(params.tokenId, params.poolAddress),
    '</svg>',
  ].join('');
}
