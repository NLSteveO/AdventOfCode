const fs = require('fs');
const path = require('path');

const checkAdjacentHeights = (value, heightMap, rowIndex, columnIndex, mapRowCount, mapColCount) => {
  let isLowestHeight = true;
  if (rowIndex > 0) {
    isLowestHeight = value  < heightMap[rowIndex-1][columnIndex];
  }
  if (rowIndex < mapRowCount-1 && isLowestHeight) {
    isLowestHeight = value  < heightMap[rowIndex+1][columnIndex];
  }
  if (columnIndex > 0 && isLowestHeight) {
    isLowestHeight = value  < heightMap[rowIndex][columnIndex-1];
  }
  if (columnIndex < mapColCount-1 && isLowestHeight) {
    isLowestHeight = value  < heightMap[rowIndex][columnIndex+1];
  }
  return isLowestHeight;
}

const getLowPoints = heightMap => {
  const mapRowCount = heightMap.length;
  const mapColCount = heightMap[0].length;
  const lowPoints = [];

  heightMap.forEach((row, rowIndex) => {
    row.forEach((height, columnIndex) => {
      if (checkAdjacentHeights(height, heightMap, rowIndex, columnIndex, mapRowCount, mapColCount)) {
        lowPoints.push([rowIndex, columnIndex]);
      }
    });
  });
  return lowPoints;
}

const getAdjacentHeights = (heightMap, center, oldCenter) => {
  const rowCount = heightMap.length;
  const colCount = heightMap[0].length;
  const [row, column] = center
  const [oldRow, oldColumn] = oldCenter;
  const list = [];
  if (row > 0) {
    if (!(row-1 === oldRow && column === oldColumn) && heightMap[row-1][column] < 9)
      list.push([row-1, column]);
  }
  if (row < rowCount-1) {
    if (!(row+1 === oldRow && column === oldColumn) && heightMap[row+1][column] < 9)
      list.push([row+1, column]);
  }
  if (column > 0) {
    if (!(row === oldRow && column-1 === oldColumn) && heightMap[row][column-1] < 9)
      list.push([row, column-1]);
  }
  if (column < colCount-1) {
    if (!(row === oldRow && column+1 === oldColumn) && heightMap[row][column+1] < 9)
      list.push([row, column+1]);
  }
  return list;
}

const isInList = (list, point) => {
  let inList = false;
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === point[0] && list[i][1] === point[1]) inList = true;
  }
  return inList;
}

const getBasinSize = (heightMap, lowPoint) => {
  const adjacentHeights = [
    ...(getAdjacentHeights(heightMap, lowPoint, [-1, -1])),
    'end'
  ];
  const done = [lowPoint];
  let prevLowPoint = lowPoint;
  let size = 1;

  while (adjacentHeights.length > 1) {
    const point = adjacentHeights.splice(0, 1)[0];
    if (point === 'end') {
      prevLowPoint = adjacentHeights.splice(0, 1)[0];
    } else if (!isInList(done, point)) {
      size++;
      adjacentHeights.push(point);
      adjacentHeights.push(...(getAdjacentHeights(heightMap, point, prevLowPoint)));
      adjacentHeights.push('end');
      done.push(point);
    }
  }
  return size;
}

const getMax = list => {
  const max = list.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  return max;
}

const getTopThree = (list) => {
  const max = getMax(list);
  const maxCount = list.filter(size => size === max).length;
  if (maxCount >= 3) return max * max * max;
  if (maxCount === 2) {
    const maxIndexOne = list.indexOf(max);
    list.splice(maxIndexOne, 1);
    const maxIndexTwo = list.indexOf(max);
    list.splice(maxIndexTwo, 1);
    const secondMax = getMax(list);
    return max * max * secondMax;
  }
  const maxIndex = list.indexOf(max);
  list.splice(maxIndex, 1);
  const secondMax = getMax(list);
  const maxIndexTwo = list.indexOf(secondMax);
  list.splice(maxIndexTwo, 1);
  return max * secondMax * getMax(list);
}

const getAnswer = (data) => {
  const heightMap = data.map(line => line.split('').map(Number));
  const lowPoints = getLowPoints(heightMap);
  const basinSizes = [];
  lowPoints.forEach((lowPoint, index) => {
    basinSizes.push(getBasinSize(heightMap, lowPoint));
  });
  return getTopThree(basinSizes);
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
