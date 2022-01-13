interface DecimalStringParams {
  // significant figures of decimal
  sigfigs: number;
  // length of decimal string
  bufferLength: number;
  // ending index for significant figures (funtion works backwards when copying sigfigs)
  sigfigIndex: number;
  // index of decimal place (0 if no decimal)
  decimalIndex: number;
  // start index for trailing/leading 0's for very small/large numbers
  zerosStartIndex: number;
  // end index for trailing/leading 0's for very small/large numbers
  zerosEndIndex: number;
  // true if decimal number is less than one
  isLessThanOne: boolean;
  // true if string should include "%"
  isPercent: boolean;
}

export default function feeToPercentString(fee: number): string {
  if (fee === 0) {
    return '0%';
  }

  let temp: number = fee;
  let digits: number = 0;
  let numSigfigs: number = 0;
  while (temp !== 0) {
    if (numSigfigs > 0) {
      numSigfigs++;
    } else if (temp % 10 !== 0) {
      numSigfigs++;
    }

    digits++;
    temp /= 10;
  }

  const params: DecimalStringParams = {
    sigfigs: 0,
    bufferLength: 0,
    sigfigIndex: 0,
    decimalIndex: 0,
    zerosStartIndex: 0,
    zerosEndIndex: 0,
    isLessThanOne: false,
    isPercent: false,
  };
  let nZeros;
  if (digits >= 5) {
    const decimalPlace: number = digits - numSigfigs >= 4 ? 0 : 1;
    nZeros = digits - 5 < numSigfigs - 1 ? 0 : digits - 5 - (numSigfigs - 1);
    params.zerosStartIndex = numSigfigs;
    params.zerosEndIndex = (params.zerosStartIndex + nZeros - 1) % 256;
    params.sigfigIndex = (params.zerosStartIndex - 1 + decimalPlace) % 256;
    params.bufferLength = (nZeros + (numSigfigs + 1) + decimalPlace) % 256;
  } else {
    nZeros = 5 - digits;
    params.zerosStartIndex = 2;
    params.zerosEndIndex = (nZeros + params.zerosStartIndex - 1) % 256;
    params.bufferLength = (nZeros + (numSigfigs + 2)) % 256;
    params.sigfigIndex = (params.bufferLength - 2) % 256;
    params.isLessThanOne = true;
  }

  params.sigfigs = fee - 10 ** (digits - numSigfigs);
  params.isPercent = true;
  params.decimalIndex = digits > 4 ? (digits - 4) % 256 : 0;

  console.log({ temp, digits, numSigfigs });
  console.log(params);

  return generateDecimalString(params);
}

function generateDecimalString(params: DecimalStringParams): string {
  const buffer = new Array(params.bufferLength);
  if (params.isPercent) {
    buffer[buffer.length - 1] = '%';
  }
  if (params.isLessThanOne) {
    buffer[0] = '0';
    buffer[1] = '.';
  }

  // add leading/trailing 0's
  for (let zerosCursor = params.zerosStartIndex; zerosCursor < params.zerosEndIndex + 1; zerosCursor++) {
    buffer[zerosCursor] = 48;
  }
  // add sigfigs
  while (params.sigfigs > 0) {
    if (params.decimalIndex > 0 && params.sigfigIndex == params.decimalIndex) {
      buffer[params.sigfigIndex--] = '.';
    }
    buffer[params.sigfigIndex--] = (48 + (params.sigfigs % 10)) % 256;
    params.sigfigs /= 10;
  }
  return buffer.join('');
}
