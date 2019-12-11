const fs = require('fs');
const path = require('path');

let masterArray = [];

const fillArray = () => {
  for(let i = 0; i <= 15199; i++) {
    const innerArray = [];
    for(let j = 0; j <= 8099; j++) {
      innerArray.push(9);
    }
    masterArray.push(innerArray);
  }
  masterArray[11849][6409] = 0;
}

const mapWire = (wire, second) => {
  let x = 11849;
  let y = 6409;
  wire.forEach(move => {
    const dir = move.substring(0, 1);
    const mag = Number(move.substring(1))
    for(let i = mag; i > 0; i--) {
      if (dir === 'U') {
        y++;
      }
      if (dir === 'D') {
        y--;
      }
      if (dir === 'R') {
        x++;
      }
      if (dir === 'L') {
        x--;
      }
      masterArray[x][y] = masterArray[x][y] === 9 ? (second ? 3 : 1) : (second ? (masterArray[x][y] === 1 ? 2 : 3) : 1);
    }
  });
}

const findCrossedWires = () => {
  const list = [];
  for(let i = 0; i <= 15199; i++) {
    for(let j = 0; j <= 8099; j++) {
      if (masterArray[i][j] === 2) {
        list.push(i);
        list.push(j);
      }
    }
  }
  return list;
}

const findStepCounts = (wireOne, wireTwo, list) => {
  let lowest = 99999;
  for(let i = 0; i < list.length; i += 2) {
    const wireOneSteps = calculateSteps(wireOne, list[i], list[i+1]);
    const wireTwoSteps = calculateSteps(wireTwo, list[i], list[i+1]);
    const total = wireOneSteps + wireTwoSteps;
    // console.log(total);
    if (total < lowest) lowest = total;
  }
  return lowest;
}

const calculateSteps = (wire, a, b) => {
  let steps = 0;
  let x= 11849;
  let y = 6409;
  for(let j = 0; j < wire.length; j++) {
    const dir = wire[j].substring(0, 1);
    const mag = Number(wire[j].substring(1))
    // console.log(steps, mag)
    steps += mag;
    for(let i = mag; i > 0; i--) {
      if (dir === 'U') {
        y++;
      }
      if (dir === 'D') {
        y--;
      }
      if (dir === 'R') {
        x++;
      }
      if (dir === 'L') {
        x--;
      }
      if (x === a && y === b) {
        steps -= i-1;
        return steps;
      }
    }
  }
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      fillArray()
      const splitData = data.split('\n');
      const wireOne = splitData[0].split(',');
      const wireTwo = splitData[1].split(',');
      mapWire(wireOne, false);
      mapWire(wireTwo, true);
      const list = findCrossedWires();
      // console.log(list);
      // masterArray = [];
      const steps = findStepCounts(wireOne, wireTwo, list);
      console.log(steps);
    } else {
      console.error(err);
    }
  });
}

getFile(process.argv[2]);
