const fs = require('fs');
const path = require('path');

const getGroupAnswers = group => {
  const answers = {};
  group.forEach(groupMember => {
    groupMember.split('').forEach(answer => {
      if (!(answer in answers)) {
        answers[answer] = 1
      } else {
        answers[answer]++;
      }
    });
  });
  let sum = 0;
  Object.keys(answers).forEach(key => {
    if (answers[key] === group.length) sum++;
  });
  return sum;
}

const getAnswer = groups => {
  let sum = 0;
  groups.forEach(group => {
    sum += getGroupAnswers(group.split('\n'));
  });
  return sum;
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
