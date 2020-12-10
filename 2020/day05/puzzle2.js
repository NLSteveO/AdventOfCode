const fs = require('fs');
const path = require('path');

const numberOfRows = 128;
const numberOfColumns = 8;
const keys = {
  F: 0,
  B: 1,
  L: 0,
  R: 1
};

const calculateSeatId = (row, column) => row * 8 + column;

const getHalves = (min, max) => {
  const diff = max - min;
  const middle = min + Math.round(diff/2);
  const lowerHalf = [
    min,
    middle
  ];
  const upperHalf = [
    middle,
    max
  ];
  return [lowerHalf, upperHalf];
};

const getRow = rowPartitions => {
  let rows = [0, numberOfRows - 1];
  rowPartitions.forEach(val => {
    rows = getHalves(rows[0], rows[1])[keys[val]];
  });
  return rows[0];
}

const getColumn = columnPartitions => {
  let columns = [0, numberOfColumns - 1];
  columnPartitions.forEach(val => {
    columns = getHalves(columns[0], columns[1])[keys[val]];
  });
  return columns[0];
}

const findMySeat = seatIds => {
  const maxSeatId = calculateSeatId(numberOfRows-1, numberOfColumns-1);
  for (let i = 0; i < maxSeatId; i++) {
    if (!seatIds.includes(i) && (seatIds.includes(i-1) && seatIds.includes(i+1)))
      return i;
  }
}

const getAnswer = (data) => {
  const seatIds = data.map(boardingPass => {
    const rowPartitions = boardingPass.substring(0, 7);
    const columnPartitions = boardingPass.substring(7, boardingPass.length)
    const row = getRow(rowPartitions.split(''));
    const column = getColumn(columnPartitions.split(''));
    return calculateSeatId(row, column);
  });
  return findMySeat(seatIds);
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
