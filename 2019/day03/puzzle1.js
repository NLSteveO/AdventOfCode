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
  // console.log('============================', x, y);
  wire.forEach(move => {
    const dir = move.substring(0, 1);
    const mag = Number(move.substring(1))
    // console.log('=========================================', dir, mag);
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
      // masterArray[x][y] === 2 ? console.log(`x:${x} y:${y}`) : x = x;
    }
  });
}

// test = wire => {
//   let lowestX = 0;
//   let highestX = 0;
//   let lowestY = 0;
//   let highestY = 0;
//   let x = 0;
//   let y = 0;
//   wire.forEach(move => {
//     const dir = move.substring(0, 1);
//     const mag = Number(move.substring(1))
//     if (dir === 'U') {
//       y += mag;
//     }
//     if (dir === 'D') {
//       y -= mag;
//     }
//     if (dir === 'R') {
//       x += mag;
//     }
//     if (dir === 'L') {
//       x -= mag;
//     }
//     if (x < lowestX) lowestX = x;
//     if (x > highestX) highestX = x;
//     if (y < lowestY) lowestY = y;
//     if (y > highestY) highestY = y;
//     console.log('===', dir, mag, '===', x, y)
//   });
//   console.log('x: ', lowestX, highestX)
//   console.log('y: ', lowestY, highestY)
// }

const findCrossedWires = () => {
  let shortestDist = 99999;
  for(let i = 0; i <= 15199; i++) {
    for(let j = 0; j <= 8099; j++) {
      if (masterArray[i][j] === 2) {
        const dist = calculateDistance(i, j);
        if (dist < shortestDist) shortestDist = dist;
        console.log(i, j, '\t\t', dist);
      }
    }
  }
  console.log('\n\n\n\n', shortestDist);
}

const calculateDistance = (x, y) => {
  const startX = 11849;
  const startY = 6409;
  let distX = 0;
  let distY = 0;
  if (x < startX) distX = startX - x;
  else distX = x - startX;
  if (y < startY) distY = startY - y;
  else distY = y - startY;
  return distX + distY;
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
      console.log('\n\n\n\n\n')
      findCrossedWires();
    } else {
      console.error(err);
    }
  });
}

getFile(process.argv[2]);
