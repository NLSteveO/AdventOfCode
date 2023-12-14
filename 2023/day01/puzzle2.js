const fs = require('fs');
const path = require('path');

const spelledNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const compareNumbers = (a, b) => {
  return a - b;
}

const getAllIndexes = (calibrationLine, spelledNumber, startingIndex = 0) => {
  const indexes = [];
  const index = calibrationLine.indexOf(spelledNumber, startingIndex);
  if (index === -1) {
    return [];
  }
  indexes.push(index);
  return (indexes.concat(getAllIndexes(calibrationLine, spelledNumber, index + 1))).sort(compareNumbers);
}

const findNumberWithMinIndex = (indexes) => {
  let minIndex = indexes[0][1];
  let minIndexNumber = indexes[0][0];
  indexes.forEach(index => {
    if (index[1] < minIndex) {
      minIndex = index[1];
      minIndexNumber = index[0];
    }
  });
  return minIndexNumber;
}

const findNumberWithMaxIndex = (indexes) => {
  let maxIndex = indexes[0][indexes[0].length - 1];
  let maxIndexNumber = indexes[0][0];
  indexes.forEach(index => {
    const lastIndex = index.length - 1;
    if (index[lastIndex] > maxIndex) {
      maxIndex = index[lastIndex];
      maxIndexNumber = index[0];
    }
  });
  return maxIndexNumber;
}

const combineDigits = (firstDigit, lastDigit) => {
  let combinedDigits = '';
  if (spelledNumbers.includes(firstDigit)) {
    const index = spelledNumbers.indexOf(firstDigit);
    combinedDigits = combinedDigits.concat(index + 1);
  } else {
    combinedDigits = combinedDigits.concat(firstDigit);
  }
  if (spelledNumbers.includes(lastDigit)) {
    const index = spelledNumbers.indexOf(lastDigit);
    combinedDigits = combinedDigits.concat(index + 1);
  } else {
    combinedDigits = combinedDigits.concat(lastDigit);
  }
  return parseInt(combinedDigits);
};

const getIndexes = (calibrationLine, numberArray) => {
  return numberArray.map(number => {
    const indexes = getAllIndexes(calibrationLine, number.toString());
    if (indexes.length === 0) {
      return [];
    }
    return [number.toString(), ...indexes];
  });
};

const getFirstAndLastDigits = (spelledNumbersIndexes, numberIndexes) => {
  const combinedDigits = [...spelledNumbersIndexes, ...numberIndexes].filter(indexes => {
    return indexes.length > 0;
  });
  const firstDigit = findNumberWithMinIndex(combinedDigits);
  const lastDigit = findNumberWithMaxIndex(combinedDigits);
  return [firstDigit, lastDigit];
};

const getCalibrationValue = (calibrationLine) => {
  const spelledNumbersIndexes = getIndexes(calibrationLine, spelledNumbers);
  const numberIndexes = getIndexes(calibrationLine, numbers);
  const [firstDigit, lastDigit] = getFirstAndLastDigits(spelledNumbersIndexes, numberIndexes);
  const calibrationValue = combineDigits(firstDigit, lastDigit);
  return calibrationValue;
}

const getAnswer = (calibrationDocument) => {
  return calibrationDocument.reduce((accumulator, calibrationLine) => {
    if (calibrationLine === '') {
      return accumulator;
    }
    const calibrationValue = getCalibrationValue(calibrationLine);
    return accumulator + calibrationValue;
  }, 0);
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
