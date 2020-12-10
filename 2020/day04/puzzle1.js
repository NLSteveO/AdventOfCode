const fs = require('fs');
const path = require('path');

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];

const hasRequiredFields = keys => {
  let hasRequired = true;
  requiredFields.forEach(requiredField => {
    if (!keys.includes(requiredField)) hasRequired = false;
  });
  return hasRequired;
};

const formatPassport = passportString => {
  const passport = {};
  passportString.split('\n').forEach(line => {
    line.split(' ').forEach(keyValue => {
      const key = keyValue.split(':')[0];
      const value = keyValue.split(':')[1];
      passport[key] = value;
    });
  });
  return passport;
};

const getAnswer = (data) => {
  let count = 0;
  data.forEach(passportString => {
    const passport = formatPassport(passportString);
    const isValid = hasRequiredFields(Object.keys(passport));
    if (isValid) count++;
  });
  return count;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n\n'));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
