export default function getCircleCoord(token: string, offset: number, tokenId: number) {
  // uint8 取值范围：0～255
  // http://netkiller.sourceforge.net/blockchain/ethereum/solidity/solidity.sectury.html
  const sliceTokenHex = (BigInt(token) >> BigInt(offset)) % BigInt(256);

  const coord = (sliceTokenHex * BigInt(tokenId)) % BigInt(255);

  return coord.toString();
}
