const fs = require('fs');
const path = require('path');

const getMin = list => {
  const min = list.reduce((a, b) => {
    return Math.min(a, b);
  });
  return min;
}

const getMax = list => {
  const max = list.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  return max;
}

const calculateFuel = (position, dest) => {
  const low = position <= dest ? position : dest;
  const high = position <= dest ? dest : position;
  let sum = 0;
  for (let i = low; i <= high; i++) {
    sum += i - low;
  }
  return sum;
}

const getFuelTotal = (list, dest) => {
  let sum = 0;
  list.forEach(position => {
    sum += calculateFuel(position, dest);
  });
  return sum;
}

const getAnswer = (data) => {
  const list = data.split(',').map(Number);
  const maxPosition = getMax(list);
  const fuel = [];
  for (let i = 0; i <= maxPosition; i++) {
    fuel[i] = getFuelTotal(list, i);
  }
  return getMin(fuel);
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n')[0]);
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
