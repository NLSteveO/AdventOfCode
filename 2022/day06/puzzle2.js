const fs = require('fs');
const path = require('path');

const hasDuplicates = (sequence) => {
    let hasDuplicate = false;
    for(let i = 0; i < sequence.length; i++) {
        if (sequence.indexOf(sequence[i], i+1) >= 0) {
            hasDuplicate = true;
            break;
        }
    }
    return hasDuplicate;
}

const getAnswer = (data) => {
    let index = 0;
    for (let i = 0; i < data.length - 13; i++) {
        const sequence = data.substring(i, i+14);
        if (!hasDuplicates(sequence)) {
            index = i+14;
            break;
        }
    }
    return index;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n')[0]);
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
