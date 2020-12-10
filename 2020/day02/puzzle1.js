const fs = require('fs');
const path = require('path');

const checkPassword = (min, max, letter, password) => {
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === letter) count++;
  }
  if (count >= min && count <= max) return true;
  return false;
}

const numberOfCorrectPasswords = array => {
  let count = 0;
  array.forEach(passwordAndRuleSet => {
    const passwordAndRuleSetSplit = passwordAndRuleSet.split(':');
    const ruleSet = passwordAndRuleSetSplit[0];
    const password = passwordAndRuleSetSplit[1].trim();
    const ruleSetSplit = ruleSet.split(' ');
    const minMax = ruleSetSplit[0];
    const letter = ruleSetSplit[1];
    const minMaxSplit = minMax.split('-').map(Number);
    const min = minMaxSplit[0];
    const max = minMaxSplit[1];
    if (checkPassword(min, max, letter, password)) count++;
  });
  return count;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = numberOfCorrectPasswords(data.split('\n'));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
