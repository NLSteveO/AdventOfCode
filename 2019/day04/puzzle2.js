
const hasDoubles = value => {
  const list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(let i = 0; i < value.length-1; i++) {
    if (value[i] === value[i+1]) {
      list[value[i]]++;
    }
  }
  return list.findIndex(n => n === 1) !== -1;
}

const digitsDecrease = value => {
  for(let i = 0; i < value.length-1; i++) {
    if (value[i+1] < value[i]) return true;
  }
  return false;
}

const meetsCriteria = value => {
  const array = value.toString().split('').map(Number);
  if (digitsDecrease(array)) return false;
  if (!hasDoubles(array)) return false;
  return true;
}

const puzzleInput = process.argv[2].split('-');
const lowerBound = Number(puzzleInput[0]);
const upperBound = Number(puzzleInput[1]);
let count = 0;

for(let i = lowerBound; i <= upperBound; i++) {
  if (meetsCriteria(i)) count++;
}

console.log(count);
