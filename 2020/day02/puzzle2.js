const fs = require('fs');
const path = require('path');

const checkPassword = (pos1, pos2, letter, password) => {
  const pos1Check = password[pos1 - 1] === letter;
  const pos2Check = password[pos2 - 1] === letter;
  if (pos1Check && !pos2Check) return true;
  if (!pos1Check && pos2Check) return true;
  return false;
}

const numberOfCorrectPasswords = array => {
  let count = 0;
  array.forEach(passwordAndRuleSet => {
    const passwordAndRuleSetSplit = passwordAndRuleSet.split(':');
    const ruleSet = passwordAndRuleSetSplit[0];
    const password = passwordAndRuleSetSplit[1].trim();
    const ruleSetSplit = ruleSet.split(' ');
    const positions = ruleSetSplit[0];
    const letter = ruleSetSplit[1];
    const positionsSplit = positions.split('-').map(Number);
    const pos1 = positionsSplit[0];
    const pos2 = positionsSplit[1];
    if (checkPassword(pos1, pos2, letter, password)) count++;
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
