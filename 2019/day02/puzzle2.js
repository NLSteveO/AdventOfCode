const fs = require('fs');
const path = require('path');

let masterArray;
const runOpcode = {
  1: (value1, value2) => value1 + value2,
  2: (value1, value2) => value1 * value2
};

const runComputer = () => {
  let running = true;
  let index = 0;
  while (running) {
    const intcode = masterArray.slice(index, index+4);
    if (intcode[0] !== 99) {
      const result = runOpcode[intcode[0]](masterArray[intcode[1]], masterArray[intcode[2]]);
      masterArray[intcode[3]] = result;
      index += 4;
    } else {
      running = false;
    }
  }
  return masterArray[0];
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
          masterArray = data.split(',').map(num => Number(num));
          masterArray[1] = i;
          masterArray[2] = j;
          const result = runComputer();
          if (result === 19690720) {
            console.log(100 * i + j);
            return;
          }
        }
      }
    } else {
      console.error(err);
    }
  });
}

getFile(process.argv[2]);
