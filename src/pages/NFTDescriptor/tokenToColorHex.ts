const ALPHABET: any = '0123456789abcdef';

/**
 * @input 25982251326782555001525053276356646166175801920, 3
 * @output 59e240
 */
function toHexStringNoPrefix(value: string, length: number): string {
  const array = new Array(2 * length);
  for (let i = array.length; i > 0; i--) {
    const index = (BigInt(value) & BigInt(0xf)).toString();

    array[i - 1] = ALPHABET[index];
    value = (BigInt(value) >> BigInt(4)).toString();
  }

  return array.join('');
}

export default function tokenToColorHex(token: string, offset: number): string {
  const value = (BigInt(token) >> BigInt(offset)).toString();

  return toHexStringNoPrefix(value, 3);
}
