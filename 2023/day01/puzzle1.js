const fs = require('fs');
const path = require('path');

const getCalibrationValue = (calibrationLine) => {
  const calibrationArray = calibrationLine.split('');
  if (!calibrationArray.some(character => character.match(/\d/))) {
    return 0;
  }
  const firstDigit = calibrationArray.find(character => character.match(/\d/));
  const lastDigit = calibrationArray.findLast(character => character.match(/\d/));
  return parseInt(firstDigit.concat(lastDigit));
}

const getAnswer = (calibrationDocument) => {
  return calibrationDocument.reduce((accumulator, calibrationLine) => {
    return accumulator + getCalibrationValue(calibrationLine);
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
