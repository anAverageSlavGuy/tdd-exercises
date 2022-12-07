export default function Add(strNumbers) {

  let regExp = /\-*\d+/g; //Matches only digits characters 
  let strNumbersArray = strNumbers.match(regExp) ?? [];

  strNumbersArray = strNumbersArray.filter(ignoreNumbersBiggerThan);
  let negativeNumbersArray = strNumbersArray.filter(checkNegativeValues);
  if (negativeNumbersArray.length) {
    throw new Error('Negatives not allowed: ' + negativeNumbersArray.join(', '));
  }

  let sum = strNumbersArray.reduce((partialSum, a) => partialSum + Number(a), 0);
  return sum;
}

function ignoreNumbersBiggerThan(value) {
  return Number(value) <= 1000
}

function checkNegativeValues(value) {
  return Number(value) < 0
}
