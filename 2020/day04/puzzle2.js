const fs = require('fs');
const path = require('path');

const requiredFields = {
  byr: {
    length: 4,
    min: 1920,
    max: 2002
  },
  iyr: {
    length: 4,
    min: 2010,
    max: 2020
  },
  eyr: {
    length: 4,
    min: 2020,
    max: 2030
  },
  hgt: {
    suffix: ['in', 'cm'],
    min: [59, 150],
    max: [76, 193]
  },
  hcl: {
    prefix: '#',
    length: 6,
    allowedValues: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  },
  ecl: {
    allowedValues: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  },
  pid: {
    length: 9,
    allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
};

const yrCheck = (key, yr) => {
  if (yr.length !== requiredFields[key].length) return false;
  if (yr >= requiredFields[key].min && yr <= requiredFields[key].max) return true;
  return false;
};

const hgtCheck = hgt => {
  const { suffix, min, max } = requiredFields.hgt;
  if (!hgt.endsWith(suffix[0]) && !hgt.endsWith(suffix[1])) return false;
  const index = hgt.endsWith(suffix[0]) ? 0 : 1;
  const value = Number(hgt.substring(0, hgt.length - 2));
  if (value >= min[index] && value <= max[index]) return true;
  return false;
}

const hclCheck = hcl => {
  if (!hcl.startsWith(requiredFields.hcl.prefix)) return false;
  const hclMinusPrefix = hcl.slice(1);
  if (hclMinusPrefix.length !== requiredFields.hcl.length) return false;
  let valid = true;
  for(let i = 0; i < hclMinusPrefix.length; i++) {
    if (!requiredFields.hcl.allowedValues.includes(hclMinusPrefix[i])) valid = false;
  }
  return valid;
};

const eclCheck = ecl => requiredFields.ecl.allowedValues.includes(ecl);

const pidCheck = pid => {
  let valid = true;
  if (pid.length !== requiredFields.pid.length) return false;
  for(let i = 0; i < pid.length; i++) {
    if (!requiredFields.pid.allowedValues.includes(Number(pid[i]))) valid = false;
  };
  return valid;
};

const validate = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
    if (!yrCheck('byr', byr)) return false;
    if (!yrCheck('iyr', iyr)) return false;
    if (!yrCheck('eyr', eyr)) return false;
    if (!hgtCheck(hgt)) return false;
    if (!hclCheck(hcl)) return false;
    if (!eclCheck(ecl)) return false;
    if (!pidCheck(pid)) return false;
  return true;
}

const hasRequiredFields = keys => {
  let hasRequired = true;
  Object.keys(requiredFields).forEach(requiredField => {
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
    if (isValid) {
      if (validate(passport)) count++;
    }
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
