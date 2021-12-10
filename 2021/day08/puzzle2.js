const fs = require('fs');
const path = require('path');

const includes = (string, searchString) => {
  let result = true;
  for (let i = 0; i < searchString.length; i++) {
    if (!string.includes(searchString[i])) result = false;
  }
  return result;
}

const subtract = (minuend, subtrahend) => {
  let result = minuend;
  for (let i = 0; i < subtrahend.length; i++) {
    result = result.replace(subtrahend[i], '');
  }
  return result;
}

const matches = (digitA, digitB) => {
  if (digitA.length !== digitB.length) return false;
  return includes(digitA, digitB);
}

const getOne = list => {
  return list.find(digit => digit.length === 2);
}

const getFour = list => {
  return list.find(digit => digit.length === 4);
}

const getSeven = list => {
  return list.find(digit => digit.length === 3);
}

const getEight = list => {
  return list.find(digit => digit.length === 7);
}

const getZeroSixAndNine = (list, one, four) => {
  const shortList = list.filter(digit => digit.length === 6);
  const nine = shortList.find(digit => includes(digit, one) && includes(digit, four));
  const six = shortList.find(digit => !includes(digit, one));
  const zero = shortList.find(digit => digit !== six && digit !== nine);
  return { 0: zero, 6: six, 9: nine };
}

const getTwoThreeAndFive = (list, one, six) => {
  const shortList = list.filter(digit => digit.length === 5);
  const five = shortList.find(digit => includes(six, digit));
  const halfOne = subtract(one, five);
  const two = shortList.find(digit => !includes(digit, one) && includes(digit, halfOne));
  const three = shortList.find(digit => digit !== two && digit !== five);
  return { 2: two, 3: three, 5: five };
}

const getDigits = list => {
  let digits = {};
  digits[1] = getOne(list);
  digits[7] = getSeven(list);
  digits[4] = getFour(list);
  digits[8] = getEight(list);
  digits = { ...digits, ...(getZeroSixAndNine(list, digits[1], digits[4])) };
  digits = { ...digits, ...(getTwoThreeAndFive(list, digits[1], digits[6])) };
  return digits;
}

const getNumber = (digits, list) => {
  let number = '';
  for (let i = 0; i < list.length; i++) {
    digit = Object.entries(digits).find(([key, value]) => matches(value, list[i]))[0]
    number = number.concat('', digit.toString());
  }
  return Number(number);
}

const getAnswer = (data) => {
  let sum = 0;
  data.forEach(line => {
    const [key, list] = line.split(' | ');
    const digits = getDigits(key.split(' '));
    sum += getNumber(digits, list.split(' '));
  });
  return sum;
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
