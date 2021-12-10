const fs = require('fs');
const path = require('path');

const getColumns = data => {
  const numberOfColumns = data[0].length;
  const columns = [];
  for(let i = 0; i < numberOfColumns; i++) {
    columns[i] = data.map(line => {
      return line[i];
    });
  }
  return columns;
}

const getMostOrLeastCommonBit = (column, most = false) => {
  let zeroCount = 0;
  let oneCount = 0;
  column.forEach(bit => {
    if (bit === 0) {
      zeroCount++;
    } else if (bit === 1) {
      oneCount++;
    }
  });
  if (most) {
    return (zeroCount > oneCount ? 0 : 1);
  } else {
    return (zeroCount < oneCount ? 0 : 1);
  }
}

const getGammaOrEpsilonRateBinary = (columns, gamma = true) => {
  let binary = '';
  columns.forEach(column => {
    binary = binary.concat('', getMostOrLeastCommonBit(column, gamma));
  });
  return binary;
}

const convertFromBinary = binary => {
  return parseInt(binary, 2);
}

const getPowerConsumption = (gammaRate, epsilonRate) => {
  const gamma = convertFromBinary(gammaRate);
  const epsilon = convertFromBinary(epsilonRate);
  return gamma * epsilon;
}

const getAnswer = data => {
  const columns = getColumns(data);
  const gammaRate = getGammaOrEpsilonRateBinary(columns, true);
  const epsilonRate = getGammaOrEpsilonRateBinary(columns, false);
  const powerConsumption = getPowerConsumption(gammaRate, epsilonRate);
  return powerConsumption;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n').map(line => {
        return line.split('').map(Number);
      }));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
