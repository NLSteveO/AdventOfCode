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

const getAnswer = (data) => {
  const heightMap = data.map(line => line.split('').map(Number));
  const mapRowCount = heightMap.length;
  const mapColCount = heightMap[0].length;
  let riskLevelSum = 0;
  heightMap.forEach((row, rowIndex) => {
    row.forEach((height, columnIndex) => {
      if (checkAdjacentHeights(height, heightMap, rowIndex, columnIndex, mapRowCount, mapColCount)) {
        riskLevelSum += 1 + height;
      }
    });
  });
  return riskLevelSum;
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
