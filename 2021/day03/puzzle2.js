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

const getBitCriteria = (column, most = false) => {
  let zeroCount = 0;
  let oneCount = 0;
  column.forEach(bit => {
    if (bit === 0) {
      zeroCount++;
    } else if (bit === 1) {
      oneCount++;
    }
  });
  console.log(most, zeroCount, oneCount);
  if (most) {
    return (zeroCount > oneCount ? 0 : 1);
  } else {
    return (oneCount >= zeroCount ? 0 : 1);
  }
}

const reduceList = (list, bitCriteria, index) => {
  return list.filter(number => {
    if (number[index] === bitCriteria) return number;
  });
}

const getRatingBinary = (data, columns, most = true) => {
  let count = 0;
  let list = [...data];
  let newColumns = [...columns];
  while (list.length > 1) {
    const bitCriteria = getBitCriteria(newColumns[count], most);
    list = reduceList(list, bitCriteria, count);
    newColumns = getColumns(list);
    console.log(count, list.length, bitCriteria);
    if (list.length > 1) count++;
  }
  return list[0];
}

const convertFromBinary = binary => {
  const binaryString = binary.join('');
  console.log(binaryString);
  return parseInt(binaryString, 2);
}

const getLifeSupportRating = (oxygenGeneratorRate, CO2ScrubberRate) => {
  console.log(oxygenGeneratorRate, CO2ScrubberRate);
  const oxygenGenerator = convertFromBinary(oxygenGeneratorRate);
  const CO2Scrubber = convertFromBinary(CO2ScrubberRate);
  console.log(oxygenGenerator, CO2Scrubber)
  return oxygenGenerator * CO2Scrubber;
}

const getAnswer = data => {
  const columns = getColumns(data);
  const oxygenGeneratorRating = getRatingBinary(data, columns, true);
  const CO2ScrubberRating = getRatingBinary(data, columns, false);
  const lifeSupportRating = getLifeSupportRating(oxygenGeneratorRating, CO2ScrubberRating);
  return lifeSupportRating;
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
