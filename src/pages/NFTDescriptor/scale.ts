export default function scale(n: string, inMn: number, inMx: number, outMn: number, outMx: number): string {
  return (((BigInt(n) - BigInt(inMn)) * (BigInt(outMx) - BigInt(outMn))) / (BigInt(inMx) - BigInt(inMn)) + BigInt(outMn)).toString();
}
