export function stringTrans(inputStr) {
  if (inputStr === null) {
    return '';
  } else if (inputStr) {
    return inputStr.toString();
  }
}

export function numberTrans(inputNum) {
  if (inputNum === null) {
    return 0;
  } else if (inputNum) {
    return parseFloat(inputNum);
  }
}
