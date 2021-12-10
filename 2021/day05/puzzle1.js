const fs = require('fs');
const path = require('path');

const SIZE = 1000;
// const SIZE = 10;

const setupChart = () => {
  const chart = [];
  for (let i = 0; i < SIZE; i++) {
    const line = [];
    for (let j = 0; j < SIZE; j++) {
      line.push('.');
    }
    chart.push(line);
  }
  return chart;
}

const getLineCoordinates = (start, end) => {
  const [x1, y1] = start.split(',').map(Number);
  const [x2, y2] = end.split(',').map(Number);
  const coordinates = [];
  let low = 0;
  let high = -1;

  if (x1 === x2) {
    low = y1 <= y2 ? y1 : y2;
    high = y1 <= y2 ? y2 : y1;
    coordinates.push('x', x1, low, high);
  } else if (y1 === y2) {
    low = x1 <= x2 ? x1 : x2;
    high = x1 <= x2 ? x2 : x1;
    coordinates.push('y', y1, low, high);
  }

  return coordinates;
}

const plotLine = (chart, lineCoordinates) => {
  const axis = lineCoordinates.shift();
  const axisValue = lineCoordinates.shift();
  const low = lineCoordinates.shift();
  const high = lineCoordinates.shift();
  if (axis === 'x') {
    for (let y = low; y <= high; y++) {
      const value = chart[y][axisValue];
      let newValue;
      if (value === '.') newValue = 1;
      else newValue = value + 1;
      chart[y][axisValue] = newValue;
    }
  } else if (axis === 'y') {
    for (let x = low; x <= high; x++) {
      const value = chart[axisValue][x];
      let newValue;
      if (value === '.') newValue = 1;
      else newValue = value + 1;
      chart[axisValue][x] = newValue;
    }
  }
  return;
}

const getIntersectionCount = (chart) => {
  let count = 0;
  for (let i = 0; i < SIZE; i++) {
    if (!chart[i].every(cell => cell === '.' || cell === 1)) {
      count += chart[i].filter(cell => cell !== '.' && cell > 1).length;
    }
  }
  return count;
}

const getAnswer = (data) => {
  const chart = setupChart();
  data.forEach(line => {
    const [start, end] = line.split(' -> ');
    const lineCoordinates = getLineCoordinates(start, end);
    plotLine(chart, lineCoordinates);
  });

  if (SIZE <= 10) chart.forEach(line => console.log(line.toString()));

  return getIntersectionCount(chart);
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
