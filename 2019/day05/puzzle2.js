const fs = require('fs');
const path = require('path');

let input;
let masterArray;
const runOpcode = {
  1: (value1, value2) => value1 + value2,
  2: (value1, value2) => value1 * value2,
  3: (index) => masterArray[index] = input,
  4: (index) => masterArray[index],
  5: (value) => value !== 0,
  6: (value) => value === 0,
  7: (value1, value2) => value1 < value2 ? 1 : 0,
  8: (value1, value2) => value1 === value2 ? 1 : 0
};

const opCodeJump = {
  1: 4,
  2: 4,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 4,
  8: 4
};

const padOpCode = opCode => {
  const padAmount = 5-opCode.length;
  for(let i = padAmount; i > 0; i--) {
    opCode = `0${opCode}`;
  }
  return opCode;
}

const readOpCode = opCode => {
  opCode = opCode.split('');
  opCode = opCode.map(Number);
  opCode = opCode.reverse();

  if (opCode[1] === 0) opCode.splice(1, 1);
  else opCode[0] = Number(opCode.splice(1, 1) + opCode[0]);
  
  return opCode;
}

const runComputer = () => {
  let running = true;
  let index = 0;
  let result;
  while (running) {
    const opCode = readOpCode(padOpCode(masterArray[index].toString()));
    const endIndex = index+opCodeJump[opCode[0]];
    const intcode = masterArray.slice(index, endIndex);
    if (opCode[0] !== 99) {
      if (opCodeJump[opCode[0]] === 4) {
        const param1 = opCode[1] ? intcode[1] : masterArray[intcode[1]];
        const param2 = opCode[2] ? intcode[2] : masterArray[intcode[2]];
        const param3 = opCode[3] ? endIndex : intcode[3];
        masterArray[param3] = runOpcode[opCode[0]](param1, param2);
      } else if (opCodeJump[opCode[0]] === 2) {
        const param = opCode[1] ? endIndex : intcode[1];
        result = runOpcode[opCode[0]](param);
      } else {
        const param1 = opCode[1] ? intcode[1] : masterArray[intcode[1]];
        const param2 = opCode[2] ? intcode[2] : masterArray[intcode[2]];
        if (runOpcode[opCode[0]](param1)) {
          index = param2;
          continue;
        }
      }
      index += opCodeJump[opCode[0]];
    } else {
      console.log(result);
      running = false;
    }
  }
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      masterArray = data.split(',').map(Number);
      runComputer();
    } else {
      console.error(err);
    }
  });
}

input = Number(process.argv[3]);
getFile(process.argv[2]);
