const fs = require('fs');
const path = require('path');

const getEasyDigitCount = list => {
  let sum = 0;
  list.forEach(digit => {
    if (
      digit.length === 2 || // 1
      digit.length === 3 || // 7
      digit.length === 4 || // 4
      digit.length === 7 // 8
    ) sum++;
  });
  return sum;
}

const getAnswer = (data) => {
  let sum = 0;
  data.forEach(line => {
    const list = line.split(' | ')[1].split(' ');
    sum += getEasyDigitCount(list);
  });
  return sum;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n'));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
