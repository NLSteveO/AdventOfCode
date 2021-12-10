const fs = require('fs');
const path = require('path');

const getAnswer = (data) => {
  let horizontalPosition = 0;
  let depth = 0;

  data.forEach(command => {
    const [direction, amount] = command.split(' ');
    if (direction === 'forward') {
      horizontalPosition += Number(amount);
    } else if (direction === 'up') {
      depth -= Number(amount);
    } else {
      depth += Number(amount);
    }
  });

  return horizontalPosition * depth;
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
