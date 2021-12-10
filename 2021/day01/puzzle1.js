const fs = require('fs');
const path = require('path');

const getAnswer = (data) => {
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i-1] < data[i]) count++;
  }
  return count;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n').map(Number));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
